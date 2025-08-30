import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, phone, city, message } = req.body;

  const text = `📩 Нова заявка AQUASTOK\n\n👤 Ім'я: ${name}\n📞 Телефон: ${phone}\n🏙️ Місто: ${city}\n💬 Повідомлення: ${message}`;

  try {
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML"
      }),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message" });
  }
}
