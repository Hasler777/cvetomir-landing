import fs from "fs";
import path from "path";

export type Lead = {
  id: string;
  createdAt: string; // ISO
  name: string;
  phone: string;
  city?: string;
  source?: string;
  ip?: string;
};

/**
 * Каталог для хранения заявок. На сервере задаётся DATA_DIR=/var/www/cvetomir/shared
 * (переживает редеплои). Локально — папка .data в корне проекта.
 */
function dataDir(): string {
  return process.env.DATA_DIR || path.join(process.cwd(), ".data");
}

function leadsFile(): string {
  return path.join(dataDir(), "leads.jsonl");
}

export function appendLead(lead: Lead): void {
  const dir = dataDir();
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(leadsFile(), JSON.stringify(lead) + "\n", "utf8");
}

export function readLeads(): Lead[] {
  let raw: string;
  try {
    raw = fs.readFileSync(leadsFile(), "utf8");
  } catch {
    return [];
  }
  const out: Lead[] = [];
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    try {
      out.push(JSON.parse(t) as Lead);
    } catch {
      // битую строку пропускаем
    }
  }
  return out.reverse(); // новые сверху
}
