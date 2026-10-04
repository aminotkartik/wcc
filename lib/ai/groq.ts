/**
 * Groq AI Client & Inference Engine
 * Backend-only integration isolating Groq API requests.
 * Uses configurable GROQ_MODEL (default: llama-3.3-70b-versatile or llama-3.1-8b-instant).
 * Implements graceful fallback when GROQ_API_KEY is unset or API is unreachable.
 */

export interface GroqChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export function getGroqApiKey(): string | undefined {
  return process.env.GROQ_API_KEY;
}

export function getGroqModel(): string {
  return process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
}

export async function callGroqChat(
  messages: GroqChatMessage[],
  options: { jsonMode?: boolean; temperature?: number } = {}
): Promise<{ success: boolean; content: string; error?: string }> {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    return {
      success: false,
      content: "",
      error: "GROQ_API_KEY is not configured. Falling back to deterministic offline rules."
    };
  }

  const model = getGroqModel();

  try {
    const payload: any = {
      model,
      messages,
      temperature: options.temperature ?? 0.2,
      max_tokens: 1500
    };

    if (options.jsonMode) {
      payload.response_format = { type: "json_object" };
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errBody = await res.text();
      return {
        success: false,
        content: "",
        error: `Groq API responded with status ${res.status}: ${errBody}`
      };
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || "";
    return { success: true, content };
  } catch (err: any) {
    return {
      success: false,
      content: "",
      error: err.message || "Network error contacting Groq"
    };
  }
}
