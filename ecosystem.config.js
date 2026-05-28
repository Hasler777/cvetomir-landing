const fs = require("fs");

// Серверные секреты (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID и т. п.) лежат вне
// релизов — в /var/www/cvetomir/shared/.env. Так они переживают каждый деплой
// и НЕ попадают в git. Формат файла: KEY=VALUE по строке.
function loadSharedEnv() {
  const out = {};
  try {
    const raw = fs.readFileSync("/var/www/cvetomir/shared/.env", "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
    }
  } catch {
    // файла нет (локальная разработка) — секреты берутся из .env.local
  }
  return out;
}

module.exports = {
  apps: [
    {
      name: "cvetomir",
      cwd: "/var/www/cvetomir/current",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        NEXT_PUBLIC_SITE_URL: "https://cvetomir-franchise.ru",
        ...loadSharedEnv(),
      },
      max_memory_restart: "400M",
    },
  ],
};
