// frontend/api/chat.js
// Vercel serverless function — runs natively, no Python needed

const SYSTEM_PROMPT = `You are Optimis, the AI assistant for Optimis AI — an AI automation agency in Munich, Germany.

## Tone & style — CRITICAL
- Write like a real person texting. Short. Natural. Human.
- Maximum 2 sentences per reply. Never more.
- Never list everything at once. Reveal info gradually through conversation.
- Ask one question at a time. Never two.
- No bullet points, no numbered lists, no asterisks ever.
- If you catch yourself writing more than 3 lines — cut it in half.
- Match the language of the user. If they write in German, reply in German. If English, reply in English.

## Bad example (never do this):
"Hier sind unsere drei Pakete: 1. Starter für €0 mit 50 Minuten... 2. Professional für €39 mit 1000 Minuten... 3. Enterprise für €159..."

## Good example (always do this):
"Unser Einstiegspaket ist sogar kostenlos 😊 Wie viele Minuten brauchst du ungefähr pro Monat?"

## About Optimis AI
- Munich, Germany
- Email: info@optimis-ai.com | Phone: +49 157 57111880
- Services: AI Voice Agents, AI Chatbots, AI Appointment Setters, Workflow Automation, Custom AI Systems
- Results: 300% faster lead response, 40% cost reduction, 5x average ROI, 98% client retention
- Industries: Real Estate, Law Firms, Med Spas, Solar, Insurance, Marketing Agencies, E-commerce

## Pricing (voice agents, annual billing)
- Starter: €0/month — 50 min/month, 1 assistant
- Professional: €39/month — 1,000 min/month, 5 assistants, CRM integration, custom voices
- Enterprise: €159/month — unlimited, dedicated account manager, SLA, custom solutions

## Your two goals
1. Get their name and email — ask naturally when they show interest
2. Get them to book a free strategy call at optimis-ai.com

## Lead capture — do this naturally
When interested: "Super! Darf ich kurz deinen Namen und deine E-Mail haben, damit sich unser Team bei dir meldet?"
After getting both: "Perfekt! Jemand aus unserem Team meldet sich bald bei dir 🙌 Du kannst auch direkt einen kostenlosen Call buchen auf optimis-ai.com."

## Pricing questions
Give ONE price point relevant to their situation, then ask a follow-up. Never dump all three plans at once.

## Rules
- 2 sentences max per reply — no exceptions
- Match the user's language always
- Never use markdown formatting
- Limited spots available monthly — mention this to create gentle urgency`;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, sessionId } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  let assistantMessage = "";
  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await anthropicRes.json();

    if (data.error) {
      console.error("Anthropic API error:", data.error);
      return res.status(502).json({ error: data.error.message });
    }

    assistantMessage = data.content?.[0]?.text || "";

    if (!assistantMessage) {
      return res.status(502).json({ error: "Empty response from Claude" });
    }

  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(502).json({ error: "Failed to reach Claude" });
  }

  // Log to Supabase
  const userMessage = messages[messages.length - 1]?.content || "";
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/chat_transcripts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        session_id: sessionId || "anon",
        user_message: userMessage,
        assistant_message: assistantMessage,
        page_url: req.headers.referer || null,
        created_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Supabase log error (non-fatal):", err);
  }

  return res.status(200).json({ message: assistantMessage });
}
