"use client";
import { UploadButton } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

export default function ProfileImageUploadButton({
  label = "Upload  File",
}: {
  label?: string;
}) {
  const router = useRouter();
  return (
    <UploadButton
      endpoint="profileUploader"
      appearance={{
        button: "h-10 rounded-md bg-green-300/50 px-6",
        allowedContent: "text-xs text-muted-foreground",
      }}
      content={{
        button({ ready, isUploading }) {
          if (!ready) return "Preparing...";
          if (isUploading) return "Uploading...";
          return label;
        },
      }}
      onClientUploadComplete={(res) => {
        router.refresh();
      }}
      onUploadError={(error) => {
        console.error(error);
      }}
    />
  );
}
