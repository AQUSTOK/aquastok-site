export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, message } = body ?? {};

    const text =
      `📩 Нова заявка AQUASTOK\n\n` +
      `👤 Ім'я: ${name || "-"}\n` +
      `📞 Телефон: ${phone || "-"}\n` +
      `🏙️ Місто: ${city || "-"}\n` +
      `💬 Повідомлення: ${message || "-"}`;

    const token = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_CHAT_ID!;

    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    if (!tg.ok) {
      const err = await tg.text();
      return new Response(JSON.stringify({ ok: false, error: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), { status: 500 });
  }
}
