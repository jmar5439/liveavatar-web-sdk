"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

export interface Avatar {
  id: string;
  name: string;
  status: string;
  preview_url: string;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
}

interface Props {
  onSelectAvatar: (avatar: Avatar) => void;
}

export const PublicAvatarList = ({ onSelectAvatar }: Props) => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  useEffect(() => {
    const fetchAvatars = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/avatars");
        const data = await res.json();

        if (res.ok) {
          setAvatars(data.avatars || []);
        } else {
          setError(data.error || "Failed to fetch avatars");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  const filteredAvatars = useMemo(() => {
    if (!searchQuery.trim()) return avatars;

    const query = searchQuery.toLowerCase();
    return avatars.filter((avatar) =>
      avatar.name.toLowerCase().includes(query),
    );
  }, [avatars, searchQuery]);

  const handleSelectAvatar = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    onSelectAvatar(avatar);
  };

  if (loading) return <div>Loading public avatars...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (avatars.length === 0) return <div>No public avatars found</div>;

  return (
    <div className="space-y-4">
      {/* Input stays at the top */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search avatars by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Scrollable avatar list */}
      <div className="h-[400px] overflow-auto">
        {filteredAvatars.length === 0 ? (
          <div className="text-gray-500 text-center py-8 animate-fade-in">
            No avatars match &quot;{searchQuery}&quot;
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAvatars.map((avatar, index) => (
              <div
                key={avatar.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-lg animate-fade-in ${
                  selectedAvatar?.id === avatar.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
                onClick={() => handleSelectAvatar(avatar)}
              >
                {avatar.preview_url && (
                  <div className="aspect-square relative mb-2 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={avatar.preview_url}
                      alt={avatar.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className="font-semibold text-sm truncate"
                  title={avatar.name}
                >
                  {avatar.name}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {avatar.status}
                  {avatar.is_expired && (
                    <span className="text-red-500"> (Expired)</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `,
        }}
      />
    </div>
  );
};
