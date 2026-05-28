import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminConfigured,
  checkPassword,
  sessionToken,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Относительный Location: браузер резолвит его от исходного домена.
// new URL(path, req.url) за nginx даёт внутренний localhost:3000 — нельзя.
function seeOther(path: string) {
  return new NextResponse(null, { status: 303, headers: { Location: path } });
}

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  let password = "";
  const ct = req.headers.get("content-type") || "";
  try {
    if (ct.includes("application/json")) {
      password = String((await req.json()).password ?? "");
    } else {
      const fd = await req.formData();
      password = String(fd.get("password") ?? "");
    }
  } catch {
    password = "";
  }

  if (!checkPassword(password)) {
    return seeOther("/admin/login?e=1");
  }

  const res = seeOther("/admin");
  res.cookies.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 дней
  });
  return res;
}
