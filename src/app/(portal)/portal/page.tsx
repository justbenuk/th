"use client";
import MediaPicker from "@/features/media/components/MediaPicker";
import { Media } from "@prisma/client";
import { useState } from "react";

export default function PortalPage() {
  const [image, setImage] = useState<Media | null>(null);
  return (
    <div>
      <MediaPicker
        onSelect={(media) => {
          setImage(media);
        }}
      />
      <h1>Portal page</h1>
      {image && <p>Selected image: {image.name}</p>}
    </div>
  );
}
