// app/api/send/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // без кешу у Vercel
// export const runtime = "nodejs";    // опціонально

type Body = {
  name?: string;
  phone?: string;
  city?: string;
  message?: string;
};

const escapeHtml = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { ok: false, error: "TELEGRAM_BOT_TOKEN/CHAT_ID не задані" },
        { status: 500 }
      );
    }

    const body = (await req.json().catch(() => null)) as Body | null;
    if (!body) {
      return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
    }

    const name = (body.name || "").trim();
    const phone = (body.phone || "").trim();
    const city = (body.city || "").trim();
    const msg = (body.message || "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Ім'я та телефон — обов'язкові" },
        { status: 400 }
      );
    }

    const referer = req.headers.get("referer") || "-";
    const when = new Date().toLocaleString("uk-UA");

    const text =
      `<b>Нова заявка AQUASTOK</b>\n` +
      `<b>Ім'я:</b> ${escapeHtml(name)}\n` +
      `<b>Телефон:</b> ${escapeHtml(phone)}\n` +
      (city ? `<b>Місто/об'єкт:</b> ${escapeHtml(city)}\n` : "") +
      (msg ? `<b>Повідомлення:</b> ${escapeHtml(msg)}\n` : "") +
      `<b>Звідки:</b> ${escapeHtml(referer)}\n` +
      `<b>Коли:</b> ${escapeHtml(when)}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const tgJson = await tgRes.json().catch(() => ({}));
    if (!tgRes.ok || tgJson?.ok !== true) {
      return NextResponse.json(
        { ok: false, error: tgJson?.description || "Telegram error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
