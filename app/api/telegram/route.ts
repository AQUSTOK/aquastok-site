// app/api/telegram/route.ts
import { NextResponse } from "next/server";

// (необов'язково) можеш лишити на Node runtime
export const runtime = "nodejs"; // або "edge" якщо бажаєш

type Payload = {
  name?: string;
  phone?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const { name = "", phone = "", message = "" } = (await req.json()) as Payload;

    // Мінімальна валідація
    if (!name.trim() || !phone.trim()) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION", message: "Name and phone are required" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { ok: false, error: "MISCONFIG", message: "Telegram env vars are missing" },
        { status: 500 }
      );
    }

    const text =
      `🆕 Запит із сайту AQUASTOK\n` +
      `👤 Ім’я: ${name}\n` +
      `📞 Телефон: ${phone}\n` +
      (message?.trim() ? `📝 Повідомлення: ${message.trim()}\n` : "");

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!tgRes.ok) {
      const body = await tgRes.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: "TELEGRAM", message: body || "Telegram request failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "SERVER", message: "Unexpected server error" },
      { status: 500 }
    );
  }
}
