# Деплой и автодеплой

**Сервер:** `2a03:6f00:a::2:2be6` (IPv6-only, нода `kvmnvm-634`).
**Контекст:** IPv4 пока нет → GitHub Actions выключен (раннеры не имеют IPv6).
Поэтому автодеплой делаем через bare-репо на сервере. UX тот же: `git push server main` → собирается и перезапускается. Когда появится IPv4 / Tailscale — включим Actions (workflow уже лежит).

---

## Шаг 1. Поднять сервер (один раз)

Со своей машины (у тебя IPv6 работает, раз пришёл этот сервер) выполни:

```bash
cd /Users/admin/Desktop/flowersland
ssh root@2a03:6f00:a::2:2be6 'bash -s' < scripts/server-bootstrap.sh
```

Пароль — `x1cU-kXREQuhRg` (его потом смени, см. ниже).

Скрипт делает:
- Node 20, npm, PM2 (с автозапуском через systemd)
- Nginx :80 → 127.0.0.1:3000
- ufw открывает 22/80/443
- создаёт пользователя `deploy`
- bare git-репо `/srv/git/cvetomir.git` + `post-receive` хук, который собирает релиз в `/var/www/cvetomir/releases/<timestamp>` и переключает симлинк `current`
- хранит последние 5 релизов (старые удаляет)

## Шаг 2. Безопасность — сменить root-пароль и поставить SSH-ключ

```bash
# создать ключ локально (если ещё нет)
ssh-keygen -t ed25519 -C "a.platya@gmail.com" -f ~/.ssh/cvetomir_ed25519

# положить публичный ключ для пользователя deploy
ssh-copy-id -i ~/.ssh/cvetomir_ed25519.pub deploy@2a03:6f00:a::2:2be6

# сменить root-пароль (он уже утёк в чате)
ssh root@2a03:6f00:a::2:2be6 'passwd'
```

Чтобы каждый раз не указывать ключ, добавь в `~/.ssh/config`:

```
Host cvetomir
  HostName 2a03:6f00:a::2:2be6
  User deploy
  IdentityFile ~/.ssh/cvetomir_ed25519
```

## Шаг 3. Подключить ремоут и запушить

```bash
cd /Users/admin/Desktop/flowersland
git remote add server cvetomir:/srv/git/cvetomir.git
git push server main
```

На push прилетят логи `npm ci`, `npm run build`, `pm2 reload`. После — открой `http://[2a03:6f00:a::2:2be6]/` (в браузере IPv6-адрес в квадратных скобках).

Дальше любые `git push server main` = автодеплой.

## Шаг 4. (опционально) GitHub как зеркало

```bash
gh repo create cvetomir-landing --private --source=. --remote=github
git push -u github main
```

Чтобы пушить сразу в оба:
```bash
git remote set-url --add --push server cvetomir:/srv/git/cvetomir.git   # уже есть
git remote set-url --add --push server git@github.com:USERNAME/cvetomir-landing.git
# теперь git push server main → летит и на сервер, и на GitHub
```

## Шаг 5. (опционально) Подключить домен и HTTPS

Когда укажешь A/AAAA на сервер:

```bash
ssh root@cvetomir 'apt-get install -y certbot python3-certbot-nginx && \
  certbot --nginx -d cvetomir-franchise.ru --non-interactive --agree-tos -m a.platya@gmail.com --redirect'
```

И поправь `server_name` в `/etc/nginx/sites-available/cvetomir`.

## Шаг 6. (когда появится IPv4 или Tailscale) — переключить на GitHub Actions

В `.github/workflows/deploy.yml` workflow готов. Понадобится:

1. Создать репозиторий на GitHub: `gh repo create cvetomir-landing --private --source=. --push`.
2. Добавить секреты в `Settings → Secrets`:
   - `SSH_HOST` — IPv4 или `cvetomir.tailnet.ts.net`
   - `SSH_USER` = `deploy`
   - `SSH_PORT` = `22`
   - `SSH_PRIVATE_KEY` — содержимое `~/.ssh/cvetomir_ed25519`
3. Любой push в `main` → пересборка + sync rsync’ом + `pm2 reload`.

Для Tailscale ещё `TS_OAUTH_CLIENT_ID` и `TS_OAUTH_SECRET` (в workflow закомментировано).

---

## Полезные команды на сервере

```bash
ssh cvetomir
pm2 ls                                  # статус процесса
pm2 logs cvetomir --lines 100           # логи
pm2 reload cvetomir                     # ручной рестарт
ls -lt /var/www/cvetomir/releases       # история релизов
sudo nginx -t && sudo systemctl reload nginx
sudo tail -f /var/log/nginx/access.log
```

## Откат

```bash
ssh cvetomir
ls -1 /var/www/cvetomir/releases       # выбрать нужный timestamp
ln -sfn /var/www/cvetomir/releases/<TS> /var/www/cvetomir/current
pm2 reload cvetomir
```
