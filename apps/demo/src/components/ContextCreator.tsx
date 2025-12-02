// components/ContextCreator.tsx
"use client";

import { useState } from "react";

interface ContextCreatorProps {
  sessionToken: string;
  avatarId: string;
}

export const ContextCreator = ({
  sessionToken,
  avatarId,
}: ContextCreatorProps) => {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [links, setLinks] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateContext = async () => {
    const linksArray = links
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url) => ({ url }));

    try {
      const res = await fetch("/api/avatar-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar_id: avatarId,
          session_token: sessionToken,
          name,
          prompt,
          opening_text: openingText || null,
          links: linksArray.length > 0 ? linksArray : null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      setSuccess(true);
      setError(null);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="mt-4 w-full max-w-md flex flex-col gap-2 p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-bold">Add Context to Avatar</h3>
      <input
        type="text"
        placeholder="Context Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Opening Text (optional)"
        value={openingText}
        onChange={(e) => setOpeningText(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Links (comma-separated URLs)"
        value={links}
        onChange={(e) => setLinks(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleCreateContext}
        className="w-fit bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
      >
        Create Context
      </button>
      {success && (
        <div className="text-green-600 mt-2">Context created successfully!</div>
      )}
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};
