import OpenAI from "openai";

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }]
    });

    const reply = completion.choices?.[0]?.message?.content ?? "";
    return Response.json({ reply });
  } catch (e) {
    return Response.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
