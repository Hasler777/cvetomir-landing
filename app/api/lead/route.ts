import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const escapeHtml = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string);

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not configured");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

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
      console.error("[lead] telegram sendMessage failed:", tg.status, await tg.text());
      return NextResponse.json({ ok: false, error: "telegram" }, { status: 502 });
    }
  } catch (err) {
    console.error("[lead] telegram request error:", err);
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
