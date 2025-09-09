// app/api/chat/route.js
import OpenAI from "openai";

export const runtime = "nodejs"; // clearer logs + stable fetch

export async function POST(req) {
  try {
    const { message } = await req.json().catch(() => ({}));

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "Missing OPENAI_API_KEY in Vercel env vars." },
        { status: 500 }
      );
    }
    if (!message || typeof message !== "string") {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a concise, helpful assistant." },
        { role: "user", content: message }
      ]
    });

    // Defensive parsing (some SDK/model variants can differ)
    const choice = completion?.choices?.[0];
    const content =
      choice?.message?.content ??
      (Array.isArray(choice?.message?.content)
        ? choice.message.content.map(p => (typeof p === "string" ? p : p?.text || "")).join("\n")
        : "");

    const reply = (content || "").toString().trim();

    if (!reply) {
      // Log the entire completion for debugging (shows up in Vercel function logs)
      console.error("Empty reply; raw completion:", JSON.stringify(completion, null, 2));
      return Response.json(
        { error: "Model returned empty content. Check logs." },
        { status: 502 }
      );
    }

    return Response.json({ reply });
  } catch (e) {
    console.error("API error:", e);
    return Response.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
