#!/usr/bin/env bash
# Bootstrap для IPv6-only сервера. Запускать ОДИН РАЗ от root.
# Можно запускать прямо из web-консоли хостинга:
#   curl -fsSL https://raw.githubusercontent.com/Hasler777/cvetomir-landing/main/scripts/server-bootstrap.sh | bash
#
# После выполнения:
#   - Node 20, npm, PM2 (autostart)
#   - Nginx :80 -> :3000
#   - ufw 22/80/443
#   - сайт уже задеплоен из tarball'а через raw.githubusercontent.com (IPv6 OK)
#   - bare git-репо /srv/git/cvetomir.git с post-receive хуком (для будущих push'ей)
#
# Опциональные ENV перед запуском:
#   SSH_KEY      — публичный SSH-ключ для deploy-пользователя (рекомендуется)
#   APP_DOMAIN   — server_name в Nginx (по умолчанию _)
#   GITHUB_REPO  — Hasler777/cvetomir-landing (по умолчанию)

set -euo pipefail

APP_NAME="cvetomir"
APP_USER="deploy"
APP_PORT="${APP_PORT:-3000}"
APP_DOMAIN="${APP_DOMAIN:-_}"
APP_DIR="/var/www/${APP_NAME}"
REPO_DIR="/srv/git/${APP_NAME}.git"
GITHUB_REPO="${GITHUB_REPO:-Hasler777/cvetomir-landing}"
TARBALL_URL="https://raw.githubusercontent.com/${GITHUB_REPO}/main/initial-release.tar.gz"

log() { printf "\n\033[1;32m▶ %s\033[0m\n" "$*"; }

log "0/9 проверка IPv6 + DNS"
getent ahosts raw.githubusercontent.com | head -1 || {
  echo "Нет резолвинга raw.githubusercontent.com. Настрой DNS (например, 2001:4860:4860::8888)."; exit 1; }

log "1/9 apt + базовые пакеты"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl ca-certificates gnupg git ufw nginx rsync sudo build-essential

log "2/9 Node.js 20 (NodeSource через Cloudflare CDN, IPv6 OK)"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -c2-3)" != "20" ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v; npm -v

log "3/9 PM2 + автозапуск"
npm install -g pm2@latest
pm2 startup systemd -u root --hp /root >/dev/null || true

log "4/9 deploy-пользователь + директории"
id -u "$APP_USER" >/dev/null 2>&1 || adduser --disabled-password --gecos "" "$APP_USER"
mkdir -p "${APP_DIR}/releases" "${APP_DIR}/shared"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

mkdir -p "/home/${APP_USER}/.ssh"
touch "/home/${APP_USER}/.ssh/authorized_keys"
chmod 700 "/home/${APP_USER}/.ssh"
chmod 600 "/home/${APP_USER}/.ssh/authorized_keys"
if [ -n "${SSH_KEY:-}" ]; then
  echo "$SSH_KEY" >> "/home/${APP_USER}/.ssh/authorized_keys"
  sort -u "/home/${APP_USER}/.ssh/authorized_keys" -o "/home/${APP_USER}/.ssh/authorized_keys"
fi
if [ -f /root/.ssh/authorized_keys ]; then
  cat /root/.ssh/authorized_keys >> "/home/${APP_USER}/.ssh/authorized_keys"
  sort -u "/home/${APP_USER}/.ssh/authorized_keys" -o "/home/${APP_USER}/.ssh/authorized_keys"
fi
chown -R "${APP_USER}:${APP_USER}" "/home/${APP_USER}/.ssh"

log "5/9 первичный релиз: качаем tarball из ${TARBALL_URL} (raw.gh — IPv6)"
TS=$(date +%Y%m%d-%H%M%S)
RELEASE="${APP_DIR}/releases/${TS}"
mkdir -p "$RELEASE"
curl -fsSL "$TARBALL_URL" | tar -xz -C "$RELEASE"
chown -R "$APP_USER:$APP_USER" "$RELEASE"

log "6/9 npm ci + build (npm registry — IPv6)"
sudo -u "$APP_USER" bash -lc "cd '$RELEASE' && npm ci --no-audit --no-fund && npm run build"

ln -sfn "$RELEASE" "${APP_DIR}/current"

log "7/9 PM2 start"
sudo -u "$APP_USER" bash -lc "cd '${APP_DIR}/current' && pm2 start ecosystem.config.js && pm2 save"
# Также включаем autostart от имени deploy-пользователя
env PATH=$PATH:/usr/bin pm2 startup systemd -u "$APP_USER" --hp "/home/$APP_USER" >/dev/null || true

log "8/9 Nginx 80 -> 127.0.0.1:${APP_PORT}"
cat > "/etc/nginx/sites-available/${APP_NAME}" <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name ${APP_DOMAIN};

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    location /_next/static/ {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 60s;
    }
}
EOF
ln -sfn "/etc/nginx/sites-available/${APP_NAME}" "/etc/nginx/sites-enabled/${APP_NAME}"
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

log "9/9 firewall + bare repo с post-receive"
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
yes | ufw enable || true

mkdir -p "$REPO_DIR"
sudo -u "$APP_USER" git init --bare "$REPO_DIR" >/dev/null

cat > "${REPO_DIR}/hooks/post-receive" <<EOF
#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME}"
APP_DIR="${APP_DIR}"
REPO_DIR="${REPO_DIR}"

while read -r oldrev newrev refname; do
  branch="\${refname#refs/heads/}"
  [ "\$branch" != "main" ] && { echo "skip branch \$branch"; continue; }

  TS=\$(date +%Y%m%d-%H%M%S)
  RELEASE="\${APP_DIR}/releases/\${TS}"
  mkdir -p "\$RELEASE"

  echo "▶ checkout \$newrev -> \$RELEASE"
  git --work-tree="\$RELEASE" --git-dir="\$REPO_DIR" checkout -f "\$newrev"

  cd "\$RELEASE"
  echo "▶ npm ci"
  npm ci --no-audit --no-fund

  echo "▶ npm run build"
  npm run build

  echo "▶ switch symlink"
  ln -sfn "\$RELEASE" "\${APP_DIR}/current"

  echo "▶ pm2 reload"
  cd "\${APP_DIR}/current"
  if pm2 describe "\$APP_NAME" >/dev/null 2>&1; then
    pm2 reload ecosystem.config.js --update-env
  else
    pm2 start ecosystem.config.js
  fi
  pm2 save

  echo "▶ prune (keep 5)"
  ls -1dt "\${APP_DIR}/releases/"*/ | tail -n +6 | xargs -r rm -rf

  echo "✓ deploy \$TS"
done
EOF
chmod +x "${REPO_DIR}/hooks/post-receive"
chown -R "${APP_USER}:${APP_USER}" "$REPO_DIR"

# Удобный кросс-ссылочный симлинк
ln -sfn "${APP_DIR}/current" "/home/${APP_USER}/app" 2>/dev/null || true

IPV6=$(ip -6 addr show scope global 2>/dev/null | awk '/inet6/ {print $2; exit}' | cut -d/ -f1)

cat <<DONE

==================== ✓ DEPLOY DONE ====================
Сайт работает: http://[${IPV6:-<v6>}]/
PM2 статус:    pm2 ls
Логи:          pm2 logs cvetomir --lines 100

Дальше — настрой автодеплой по push (со своей машины):
  ssh-copy-id deploy@${IPV6:-<v6>}                   # положить ключ
  git remote add server deploy@[${IPV6:-<v6>}]:${REPO_DIR}
  git push server main                                # любой push = redeploy

И смени root-пароль:
  passwd
========================================================
DONE
