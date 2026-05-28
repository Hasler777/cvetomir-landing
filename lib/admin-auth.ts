import crypto from "crypto";

export const ADMIN_COOKIE = "cvm_admin";

function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "";
}

export function adminConfigured(): boolean {
  return adminPassword().length > 0;
}

/** Значение сессионной куки — производное от пароля. Подделать нельзя, не зная пароль. */
export function sessionToken(): string {
  return crypto
    .createHmac("sha256", adminPassword())
    .update("cvm-admin-session-v1")
    .digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function checkPassword(input: string): boolean {
  const pw = adminPassword();
  if (!pw) return false;
  return safeEqual(input, pw);
}

export function checkSession(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  return safeEqual(token, sessionToken());
}
