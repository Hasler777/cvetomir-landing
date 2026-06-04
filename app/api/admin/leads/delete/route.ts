import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkSession } from "@/lib/admin-auth";
import { deleteLead } from "@/lib/leads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!checkSession(token)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let id = "";
  try {
    const form = await req.formData();
    id = String(form.get("id") ?? "").trim();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (!id) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  deleteLead(id);

  // После удаления возвращаемся к списку заявок
  return new NextResponse(null, {
    status: 303,
    headers: { Location: "/admin" },
  });
}
