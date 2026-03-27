// frontend/api/chat.js
// Vercel serverless function — runs natively, no Python needed

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
        max_tokens: 1024,
        system: `You are a helpful assistant for Optimis AI. You help visitors understand 
our AI consulting services, answer questions about pricing and capabilities, 
and guide them toward booking a discovery call. Be concise, friendly, and professional.`,
        messages,
      }),
    });

    const data = await anthropicRes.json();

    // Log full response for debugging
    console.log("Anthropic response:", JSON.stringify(data));

    if (data.error) {
      console.error("Anthropic API error:", data.error);
      return res.status(502).json({ error: data.error.message });
    }

    assistantMessage = data.content?.[0]?.text || "";

    if (!assistantMessage) {
      console.error("Empty response from Claude:", JSON.stringify(data));
      return res.status(502).json({ error: "Empty response from Claude" });
    }

  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(502).json({ error: "Failed to reach Claude" });
  }

  // Log to Supabase (non-blocking)
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