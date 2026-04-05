export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GROQ_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: { message: "Serverda GROQ API kaliti topilmadi. Iltimos, Vercel Environment Variables'ga GROQ_KEY ni qo'shing." } });
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await groqResponse.json();
    return res.status(groqResponse.status).json(data);
  } catch (error) {
    console.error("Vercel Function Error:", error);
    return res.status(500).json({ error: { message: "Serverda xatolik yuz berdi" } });
  }
}
