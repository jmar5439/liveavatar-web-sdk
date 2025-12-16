// src/components/AvatarSlider.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export interface Avatar {
  id: string;
  name: string;
  status: string;
  preview_url: string;
}

export const AvatarSlider = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const res = await fetch("/api/avatars"); // endpoint de tus avatares
        const data = await res.json();
        setAvatars(data.avatars || []);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    };
    fetchAvatars();
  }, []);

  if (!avatars.length) return <div>Loading avatars...</div>;

  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      navigation
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {avatars.map((avatar) => (
        <SwiperSlide key={avatar.id}>
          <div className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-md">
            <div className="w-[321px] h-[321px] relative mb-3">
              <Image
                src={avatar.preview_url}
                alt={avatar.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <h3 className="font-semibold text-lg text-center">{avatar.name}</h3>
            <p className="text-sm text-gray-500 text-center">{avatar.status}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
