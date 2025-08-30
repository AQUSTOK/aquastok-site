// app/api/telegram/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, city, message } = body || {};

    const token = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_CHAT_ID!;
    if (!token || !chatId) {
      return NextResponse.json({ ok: false, error: "Missing env vars" }, { status: 500 });
    }

    const text =
      `🆕 Новий запит з сайту AQUASTOK\n` +
      `👤 Ім'я: ${name || "-"}\n` +
      `📞 Телефон: ${phone || "-"}\n` +
      `🏙️ Місто/Об'єкт: ${city || "-"}\n` +
      `📝 Повідомлення: ${message || "-"}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const tgResp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    const data = await tgResp.json();
    if (!data.ok) {
      return NextResponse.json({ ok: false, error: data.description }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Unknown error" }, { status: 500 });
  }
}
