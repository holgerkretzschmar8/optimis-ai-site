// frontend/api/chat.js
// Vercel serverless function for the Optimis AI chat widget.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   ANTHROPIC_API_KEY          required
//   SUPABASE_URL               optional – transcript logging
//   SUPABASE_SERVICE_ROLE_KEY  optional – transcript logging
//   FORMSPREE_URL              optional – where chat leads are sent (defaults to the
//                              same Formspree form the contact modal uses)
//   BOOKING_URL                optional – Calendly / Cal.com link. If set, the bot
//                              shows a "pick a time" button prefilled with name + email.

const MODEL = "claude-sonnet-4-6";
const FORMSPREE_URL = process.env.FORMSPREE_URL || "https://formspree.io/f/mqedjvzr";
const BOOKING_URL = process.env.BOOKING_URL || "";

function buildSystemPrompt(lang) {
  const bookingRule = BOOKING_URL
    ? "After the tool succeeds, tell them the request is in and that they can pick a time slot right away with the button below your message. Do not write any URL yourself."
    : "After the tool succeeds, confirm the request is in and that the team will get back to them within one business day with appointment options. Do not write any URL yourself.";

  return `You are the Optimis Assistant, the website chat assistant of Optimis AI, an AI automation agency in Munich, Germany.

## Tone & style
- Short, natural, human. Maximum 2 sentences per reply.
- Ask one question at a time.
- No bullet points, numbered lists, markdown or asterisks.
- Reply in the user's language. The website language is "${lang === "en" ? "English" : "German"}".
- In German, always use the formal "Sie" (never "du"), consistent with the website.

## About Optimis AI
- Munich, Germany. Email: info@optimis-ai.com, Phone: +49 157 57111880
- Services: AI voice agents, AI chatbot agents, AI appointment setters, workflow automation, custom AI systems.
- Risk-free partnership model: it starts with a free consultation / strategy call, and clients only invest after proven value.

## Your main goal: get the visitor a free strategy call
When someone wants an appointment, a call, a consultation, or shows clear buying interest:
1. Ask for their name and email address (in one short question). Mention briefly that the details are only used to arrange the appointment.
2. Optionally ask in one question what it is about (company / use case) if they have not said it yet. Do not insist; if they skip it, continue.
3. As soon as you have name and a valid-looking email, call the tool request_strategy_call. Never claim a call is booked without calling the tool.
4. ${bookingRule}

If the tool returns an error, apologise briefly and give them info@optimis-ai.com or +49 157 57111880.
Never send people to the homepage or tell them to "book on optimis-ai.com". You handle the request right here in the chat.

## Rules
- 2 sentences max per reply.
- Never invent prices, availability or appointment times.
- If you do not know something, offer the strategy call instead.`;
}

const TOOLS = [
  {
    name: "request_strategy_call",
    description:
      "Submit a request for a free strategy call with the Optimis AI team. Call this as soon as you have the visitor's name and email address.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name of the visitor" },
        email: { type: "string", description: "Email address of the visitor" },
        company: { type: "string", description: "Company name, if mentioned" },
        phone: { type: "string", description: "Phone number, if mentioned" },
        topic: { type: "string", description: "What the call should be about, one sentence, if known" },
      },
      required: ["name", "email"],
    },
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildBookingUrl(name, email) {
  if (!BOOKING_URL) return null;
  try {
    const url = new URL(BOOKING_URL);
    if (name) url.searchParams.set("name", name);
    if (email) url.searchParams.set("email", email);
    return url.toString();
  } catch {
    return BOOKING_URL;
  }
}

async function submitLead(input, { sessionId, pageUrl, lang }) {
  const name = (input.name || "").trim();
  const email = (input.email || "").trim();
  if (!name || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Name or email missing or invalid. Ask the visitor again." };
  }

  const res = await fetch(FORMSPREE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email,
      _replyto: email,
      phone: input.phone || "",
      company: input.company || "",
      message: input.topic || "Terminanfrage über den Website-Chat",
      source: "chatbot",
      _subject: `Neue Terminanfrage (Chatbot): ${name}`,
      language: lang,
      session_id: sessionId || "anon",
      page_url: pageUrl || "",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Formspree error:", res.status, text);
    return { ok: false, error: "Submission failed." };
  }
  return { ok: true, name, email };
}

async function callClaude(system, messages) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 400, system, tools: TOOLS, messages }),
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error.message || "Anthropic API error");
  return data;
}

function textOf(content) {
  return (content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join(" ")
    .trim();
}

// Only plain text turns from the browser are accepted.
function sanitizeHistory(messages) {
  return messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim()
    )
    .slice(-30)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, sessionId, lang: rawLang } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  const lang = rawLang === "en" ? "en" : "de";
  const pageUrl = req.headers.referer || null;
  const system = buildSystemPrompt(lang);
  const convo = sanitizeHistory(messages);
  if (!convo.length || convo[convo.length - 1].role !== "user") {
    return res.status(400).json({ error: "last message must be from the user" });
  }

  let assistantMessage = "";
  let action = null;
  let leadSubmitted = false;

  try {
    // Up to 3 rounds: reply, or tool call → tool result → reply.
    for (let round = 0; round < 3; round++) {
      const data = await callClaude(system, convo);
      const toolUses = (data.content || []).filter((b) => b.type === "tool_use");

      if (data.stop_reason !== "tool_use" || toolUses.length === 0) {
        assistantMessage = textOf(data.content);
        break;
      }

      convo.push({ role: "assistant", content: data.content });
      const results = [];
      for (const tu of toolUses) {
        let result;
        if (tu.name === "request_strategy_call") {
          try {
            result = await submitLead(tu.input || {}, { sessionId, pageUrl, lang });
          } catch (e) {
            console.error("Lead submit error:", e);
            result = { ok: false, error: "Submission failed." };
          }
          if (result.ok) {
            leadSubmitted = true;
            const bookingUrl = buildBookingUrl(result.name, result.email);
            if (bookingUrl) {
              action = {
                type: "link",
                url: bookingUrl,
                label: lang === "en" ? "📅 Pick a time slot" : "📅 Termin auswählen",
              };
              result.booking_button_shown = true;
            }
          }
        } else {
          result = { ok: false, error: "Unknown tool" };
        }
        results.push({ type: "tool_result", tool_use_id: tu.id, content: JSON.stringify(result) });
      }
      convo.push({ role: "user", content: results });
    }
  } catch (err) {
    console.error("Chat error:", err);
    return res.status(502).json({ error: "Failed to reach Claude" });
  }

  if (!assistantMessage) {
    assistantMessage =
      lang === "en"
        ? "Sorry, something went wrong. You can reach us at info@optimis-ai.com."
        : "Entschuldigung, da ist etwas schiefgelaufen. Sie erreichen uns unter info@optimis-ai.com.";
  }

  // Log to Supabase (non-fatal)
  const userMessage = messages[messages.length - 1]?.content || "";
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/chat_transcripts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          session_id: sessionId || "anon",
          user_message: userMessage,
          assistant_message: leadSubmitted ? `[LEAD SUBMITTED] ${assistantMessage}` : assistantMessage,
          page_url: pageUrl,
          created_at: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Supabase log error (non-fatal):", err);
    }
  }

  return res.status(200).json({ message: assistantMessage, action, leadSubmitted });
}
