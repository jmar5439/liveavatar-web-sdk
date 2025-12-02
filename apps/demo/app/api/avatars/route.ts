// app/api/avatar-context/route.ts
import { API_URL, API_KEY } from "../secrets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { avatar_id, name, prompt, opening_text, links } = body;

    if (!avatar_id) {
      return new Response(JSON.stringify({ error: "avatar_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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
      avatar_id, // asociamos el contexto al avatar
    };

    const res = await fetch(`${API_URL}/v1/contexts`, {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY ?? "",
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

    return new Response(JSON.stringify({ success: true, context: data.data }), {
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

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/v1/avatars/public`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: data.message || "Failed to fetch avatars" }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        avatars: Array.isArray(data.data?.results) ? data.data.results : [],
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error fetching avatars:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
