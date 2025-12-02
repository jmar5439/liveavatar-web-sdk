"use client";

import { useState } from "react";
import { LiveAvatarSession } from "./LiveAvatarSession";
import { ContextCreator } from "./ContextCreator";
import { PublicAvatarList, Avatar } from "./PublicAvatarList";

export const LiveAvatarDemo = () => {
  const [sessionToken, setSessionToken] = useState("");
  const [mode, setMode] = useState<"FULL" | "CUSTOM">("FULL");
  const [error, setError] = useState<string | null>(null);

  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleStart = async () => {
    try {
      const res = await fetch("/api/start-session", { method: "POST" });
      if (!res.ok) {
        const error = await res.json();
        setError(error.error);
        return;
      }
      const { session_token } = await res.json();
      setSessionToken(session_token);
      setMode("FULL");
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const handleStartCustom = async () => {
    try {
      const res = await fetch("/api/start-custom-session", { method: "POST" });
      if (!res.ok) {
        const error = await res.json();
        setError(error.error);
        return;
      }
      const { session_token } = await res.json();
      setSessionToken(session_token);
      setMode("CUSTOM");
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const onSessionStopped = () => {
    setSessionToken("");
    setSelectedAvatar(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {!sessionToken ? (
        <>
          {error && <div className="text-red-500">{"Error: " + error}</div>}

          <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center">
            {/* Avatar List */}
            <PublicAvatarList
              onSelectAvatar={(avatar) => setSelectedAvatar(avatar)}
            />

            {/* Context Creator */}
            {selectedAvatar && (
              <ContextCreator
                sessionToken={sessionToken}
                avatarId={selectedAvatar.id}
              />
            )}
          </div>
          <button
            onClick={handleStart}
            className="w-fit bg-white text-black px-4 py-2 rounded-md"
          >
            Start Full Avatar Session
          </button>

          <button
            onClick={handleStartCustom}
            className="w-fit bg-white text-black px-4 py-2 rounded-md"
          >
            Start Custom Avatar Session
          </button>
        </>
      ) : (
        <>
          <LiveAvatarSession
            mode={mode}
            sessionAccessToken={sessionToken}
            onSessionStopped={onSessionStopped}
          />

          {error && <div className="text-red-500 mt-2">{error}</div>}
        </>
      )}
    </div>
  );
};
