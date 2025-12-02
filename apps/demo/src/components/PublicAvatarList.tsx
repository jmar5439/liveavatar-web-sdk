"use client";

import { useEffect, useState } from "react";
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
        setLoading(false); // ✅ important!
      }
    };

    fetchAvatars();
  }, []);

  if (loading) return <div>Loading public avatars...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (avatars.length === 0) return <div>No public avatars found</div>;

  return (
    <div className="flex flex-wrap gap-4">
      {avatars.map((avatar) => (
        <div
          key={avatar.id}
          className="border p-2 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectAvatar(avatar)}
        >
          {avatar.preview_url && (
            <Image
              src={avatar.preview_url}
              alt={avatar.name}
              width={96}
              height={96}
              className="mb-2 rounded object-cover"
            />
          )}
          <div className="font-bold">{avatar.name}</div>
          <div className="text-sm">
            Status: {avatar.status} {avatar.is_expired ? "(Expired)" : ""}
          </div>
        </div>
      ))}
    </div>
  );
};
