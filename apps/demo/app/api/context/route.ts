import { API_URL, API_KEY } from "../secrets";

interface Link {
  url: string;
  faq?: string | null;
  id?: string | null;
}

interface RequestBody {
  name: string;
  prompt: string;
  opening_text: string;
  links?: Link[];
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { name, prompt, opening_text, links } = body;

    if (!name || !prompt || opening_text === undefined) {
      return new Response(
        JSON.stringify({ error: "name, prompt and opening_text are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    // Ensure links are correctly structured
    const payload = {
      name,
      prompt,
      opening_text,
      links: Array.isArray(links)
        ? links.map((link) => ({
            url: link.url,
            faq: link.faq ?? null,
            id: link.id ?? null,
          }))
        : null,
    };

    let res;
    try {
      res = await fetch(`${API_URL}/v1/contexts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_KEY ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (fetchError) {
      console.error("Network or fetch error:", fetchError);
      return new Response(
        JSON.stringify({ error: "Network error", details: fetchError }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    let data;
    try {
      data = await res.json();
    } catch (jsonError) {
      console.error("Error parsing JSON from API response:", jsonError);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON response from API",
          details: jsonError,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!res.ok) {
      console.error("API returned error:", data);
      return new Response(
        JSON.stringify({
          error:
            data.data?.message || data.message || "Failed to create context",
          status: res.status,
          details: data,
        }),
        { status: res.status, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true, context: data.data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: (error as Error).message || error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

// -------------------- GET method --------------------
export async function GET(request: Request) {
  try {
    // Optional: read query params page and page_size
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const page_size = searchParams.get("page_size") || "20";

    const res = await fetch(
      `${API_URL}/v1/contexts?page=${page}&page_size=${page_size}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-API-KEY": API_KEY ?? "",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error:
            data.data?.message || data.message || "Failed to list contexts",
          status: res.status,
          details: data,
        }),
        { status: res.status, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true, contexts: data.data }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Unexpected server error in GET:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: (error as Error).message || error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
