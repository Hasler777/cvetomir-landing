#!/usr/bin/env bash
# Подготовка Ubuntu/Debian-сервера под Next.js-лендинг "ЦветоМир".
# Запускать ОДИН РАЗ от root. После выполнения:
#   - Node 20, npm, PM2
#   - Nginx :80 -> :3000
#   - firewall разрешает 22/80/443
#   - bare git-репозиторий /srv/git/cvetomir.git с post-receive хуком
#   - рабочая директория /var/www/cvetomir/current
#
# Использование (с локальной машины):
#   ssh root@<HOST> 'bash -s' < scripts/server-bootstrap.sh
#
# Переменные окружения (опциональные):
#   APP_DOMAIN  — server_name в Nginx (по умолчанию _)
#   APP_PORT    — порт приложения (по умолчанию 3000)

set -euo pipefail

APP_NAME="cvetomir"
APP_USER="deploy"
APP_PORT="${APP_PORT:-3000}"
APP_DOMAIN="${APP_DOMAIN:-_}"
APP_DIR="/var/www/${APP_NAME}"
REPO_DIR="/srv/git/${APP_NAME}.git"

log() { printf "\n\033[1;32m▶ %s\033[0m\n" "$*"; }

log "1/8 apt update + базовые пакеты"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl ca-certificates gnupg git ufw nginx rsync sudo build-essential

log "2/8 Node.js 20 (NodeSource)"
if ! command -v node >/dev/null 2>&1 || [ "$(node -v | cut -c2-3)" != "20" ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node -v; npm -v

log "3/8 PM2 + автозапуск"
npm install -g pm2@latest
pm2 startup systemd -u root --hp /root >/dev/null

log "4/8 deploy-пользователь + директории"
id -u "$APP_USER" >/dev/null 2>&1 || adduser --disabled-password --gecos "" "$APP_USER"
mkdir -p "${APP_DIR}/releases" "${APP_DIR}/shared"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

log "5/8 SSH-ключи deploy-пользователя"
mkdir -p "/home/${APP_USER}/.ssh"
touch "/home/${APP_USER}/.ssh/authorized_keys"
chmod 700 "/home/${APP_USER}/.ssh"
chmod 600 "/home/${APP_USER}/.ssh/authorized_keys"
chown -R "${APP_USER}:${APP_USER}" "/home/${APP_USER}/.ssh"
# Если уже есть root authorized_keys — копируем, чтобы заходить тем же ключом
if [ -f /root/.ssh/authorized_keys ]; then
  cat /root/.ssh/authorized_keys >> "/home/${APP_USER}/.ssh/authorized_keys"
  sort -u "/home/${APP_USER}/.ssh/authorized_keys" -o "/home/${APP_USER}/.ssh/authorized_keys"
fi

log "6/8 bare git-репозиторий + post-receive"
mkdir -p "$REPO_DIR"
chown -R "${APP_USER}:${APP_USER}" /srv/git
sudo -u "$APP_USER" git init --bare "$REPO_DIR" >/dev/null

cat > "${REPO_DIR}/hooks/post-receive" <<EOF
#!/usr/bin/env bash
set -euo pipefail

APP_NAME="${APP_NAME}"
APP_DIR="${APP_DIR}"
APP_PORT="${APP_PORT}"
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
  if pm2 describe "\$APP_NAME" >/dev/null 2>&1; then
    pm2 reload ecosystem.config.js --update-env
  else
    pm2 start ecosystem.config.js
  fi
  pm2 save

  echo "▶ prune old releases (keep last 5)"
  ls -1dt "\${APP_DIR}/releases/"*/ | tail -n +6 | xargs -r rm -rf

  echo "✓ deploy done: \$TS"
done
EOF
chmod +x "${REPO_DIR}/hooks/post-receive"
chown -R "${APP_USER}:${APP_USER}" "$REPO_DIR"

log "7/8 Nginx → 127.0.0.1:${APP_PORT}"
cat > "/etc/nginx/sites-available/${APP_NAME}" <<EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name ${APP_DOMAIN};

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;

    # Long-cache для статики Next.js
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

log "8/8 firewall"
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
yes | ufw enable || true
ufw status

log "Готово."
echo
echo "Добавь свой публичный SSH-ключ для пользователя 'deploy':"
echo "  ssh root@<HOST> \"echo 'ssh-ed25519 AAAA... your@laptop' >> /home/${APP_USER}/.ssh/authorized_keys\""
echo
echo "Затем на локальной машине:"
echo "  git remote add server ${APP_USER}@<HOST>:${REPO_DIR}"
echo "  git push server main"
echo
echo "После первого пуша приложение поднимется на http://<HOST>/"
