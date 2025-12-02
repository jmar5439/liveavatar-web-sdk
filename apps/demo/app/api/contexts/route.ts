// app/api/contexts/route.ts
import { API_URL } from "../secrets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_token, name, prompt, opening_text, links } = body;

    if (!session_token) {
      return new Response(
        JSON.stringify({ error: "session_token is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (!name || !prompt) {
      return new Response(
        JSON.stringify({ error: "name and prompt are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const payload = {
      name,
      prompt,
      opening_text: opening_text || null,
      links: links || null,
    };

    const res = await fetch(`${API_URL}/v1/contexts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: data.data?.message || "Failed to create context",
        }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(JSON.stringify({ success: true, context: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating context:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
