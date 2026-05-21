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
      },
      max_memory_restart: "400M",
    },
  ],
};
