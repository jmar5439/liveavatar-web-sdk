"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Link {
  id: string;
  url: string;
  faq: string | null;
}

interface Context {
  id: string;
  name: string;
  opening_text?: string | null;
  links?: Link[] | null;
  created_at: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default function CreateContextForm() {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [result, setResult] = useState<ApiResponse<Context> | null>(null);
  const [contexts, setContexts] = useState<Context[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addLink = () => {
    setLinks([...links, { id: uuidv4(), url: "", faq: null }]);
  };

  const removeLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const updateLink = (id: string, field: "url" | "faq", value: string) => {
    setLinks(
      links.map((link) =>
        link.id === id
          ? { ...link, [field]: field === "faq" ? value || null : value }
          : link,
      ),
    );
  };

  const validateLinks = (): boolean => {
    for (const link of links) {
      if (!link.url.trim()) {
        setError("All links must have a URL before submitting.");
        return false;
      }
    }
    setError(null);
    return true;
  };

  async function createContext() {
    // Validate required fields
    if (!name.trim() || !prompt.trim() || !openingText.trim()) {
      setError("Name, Prompt, and Opening Text are required.");
      return;
    }

    if (!validateLinks()) return;

    if (!validateLinks()) return;

    try {
      const res = await fetch("/api/context", {
        method: "POST",
        //headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          prompt,
          opening_text: openingText || null,
          links: links.length > 0 ? links : null,
        }),
      });

      const json = await res.json();
      setResult(json);
    } catch (err) {
      console.error("Error creating context:", err);
      setResult({
        success: false,
        error: "Failed to create context",
        data: undefined,
      });
    }
  }

  async function listContexts() {
    try {
      const res = await fetch("/api/context");
      const json = await res.json();

      if (res.ok) {
        if (
          json.success &&
          json.contexts &&
          Array.isArray(json.contexts.results)
        ) {
          setContexts(json.contexts.results);
          setError(null);
        } else {
          // API returned ok but without expected data
          setError(`Unexpected API response: ${JSON.stringify(json, null, 2)}`);
        }
      } else {
        // API returned an error
        setError(
          `API Error (status ${res.status}): ${json.error || JSON.stringify(json)}`,
        );
      }
    } catch (err) {
      console.error("Error listing contexts:", err);
      setError(`Network or unexpected error: ${(err as Error).message || err}`);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-gray-900 rounded-lg shadow-lg text-white">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Create a New Context
      </h1>

      <div className="grid gap-4 sm:gap-6">
        <input
          className="w-full text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Context name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full text-black p-3 rounded-md h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <textarea
          className="w-full text-black p-3 rounded-md h-24 sm:h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Opening text (optional)"
          value={openingText}
          onChange={(e) => setOpeningText(e.target.value)}
        />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Links</h2>
          {links.map((link) => (
            <div
              key={link.id}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end"
            >
              <input
                className={`text-black p-2 rounded-md focus:outline-none focus:ring-2 ${
                  !link.url.trim() ? "ring-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateLink(link.id, "url", e.target.value)}
              />
              <input
                className="text-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="FAQ (optional)"
                value={link.faq || ""}
                onChange={(e) => updateLink(link.id, "faq", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-white font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLink}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-white font-semibold"
          >
            Add Link
          </button>
        </div>

        {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

        <button
          onClick={createContext}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-md font-semibold text-lg"
        >
          Create Context
        </button>

        {result && (
          <pre className="bg-gray-800 p-4 rounded-md text-sm sm:text-base overflow-x-auto mt-4">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
      <button
        onClick={listContexts}
        className="w-full bg-purple-600 hover:bg-purple-700 transition-colors py-3 rounded-md font-semibold text-lg mt-2"
      >
        List Contexts
      </button>

      {result && (
        <pre className="bg-gray-800 p-4 rounded-md text-sm sm:text-base overflow-x-auto mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {contexts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">User Contexts</h2>
          <ul className="list-disc pl-5 space-y-1">
            {contexts.map((ctx) => (
              <li key={ctx.id}>
                <strong>{ctx.name}</strong> — created at{" "}
                {new Date(ctx.created_at).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
