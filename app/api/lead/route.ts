import { NextResponse } from "next/server";
import crypto from "crypto";
import { appendLead } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string);

async function notifyTelegram(name: string, phone: string, city: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  // TELEGRAM_CHAT_ID может содержать несколько получателей через запятую/пробел.
  const chatIds = (process.env.TELEGRAM_CHAT_ID || "")
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!token || chatIds.length === 0) {
    console.warn("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured — skipping notification");
    return;
  }

  const text = [
    "🌸 <b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
    city ? `<b>Город:</b> ${escapeHtml(city)}` : null,
    "",
    `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })} МСК</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  // Шлём каждому получателю независимо: ошибка по одному не мешает остальным.
  await Promise.all(
    chatIds.map(async (chatId) => {
      try {
        const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
          cache: "no-store",
        });
        if (!tg.ok) {
          console.error(`[lead] telegram sendMessage failed for ${chatId}:`, tg.status, await tg.text());
        }
      } catch (err) {
        console.error(`[lead] telegram request error for ${chatId}:`, err);
      }
    }),
  );
}

export async function POST(req: Request) {
  // Принимаем как FormData, так и JSON
  let data: Record<string, unknown> = {};
  try {
    const ct = req.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      data = await req.json();
    } else {
      const form = await req.formData();
      data = Object.fromEntries(form.entries());
    }
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const str = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
  const name = str(data.name, 200);
  const phone = str(data.phone, 50);
  const city = str(data.city, 200);

  // Ловушка для ботов: скрытое поле, которое люди не заполняют
  if (str(data.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || undefined;

  // Источник истины — файл с заявками для админки. Сохраняем в первую очередь.
  try {
    appendLead({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      phone,
      city: city || undefined,
      ip,
    });
  } catch (err) {
    console.error("[lead] failed to persist lead:", err);
    return NextResponse.json({ ok: false, error: "storage" }, { status: 500 });
  }

  // Telegram-уведомление — best-effort, не влияет на успех заявки.
  await notifyTelegram(name, phone, city);

  return NextResponse.json({ ok: true });
}
