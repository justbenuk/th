"use client";
import { UploadButton } from "@/lib/uploadthing";

export default function MediaUploadButton({
  label = "Upload  File",
}: {
  label?: string;
}) {
  return (
    <UploadButton
      endpoint="mediaUploader"
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
        console.log("Uploaded:", res);
      }}
      onUploadError={(error) => {
        console.error(error);
      }}
    />
  );
}
