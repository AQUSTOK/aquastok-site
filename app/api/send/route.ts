export async function POST(request: Request) {
  const { name, phone, city, message } = await request.json();

  const text = `
  📩 Нова заявка AQUASTOK
  👤 Ім'я: ${name}
  📞 Телефон: ${phone}
  🏙 Місто: ${city}
  💬 Повідомлення: ${message}
  `;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

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
    return new Response("Помилка при відправці", { status: 500 });
  }

  return new Response("Успішно відправлено", { status: 200 });
}
