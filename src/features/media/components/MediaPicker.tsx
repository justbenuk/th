"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UploadButton } from "@/lib/uploadthing";
import { Media } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GetMediaImage } from "../MediaActions";

type Props = {
  onSelect: (media: Media) => void;
  triggerLabel?: string;
};

export default function MediaPicker({
  onSelect,
  triggerLabel = "Choose image",
}: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"library" | "upload">("library");
  const [images, setImages] = useState<Media[]>([]);
  const [selected, setSelected] = useState<Media | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!open) return;
    let active = true;

    async function loadMedia() {
      setLoading(true);
      setError(null);
      try {
        const response = await GetMediaImage(page);

        if (active && response.success) {
          setImages(response.images);
          setTotalPages(response.totalPages);
        }
      } catch {
        if (active) setError("Failed to fetch images");
      } finally {
        if (active) setLoading(false);
      }
    }
    loadMedia();
    return () => {
      active = false;
    };
  }, [open, page, refresh]);

  function confirmSelection() {
    if (!selected) return;
    onSelect(selected);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button">{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        {/* Header */}
        <DialogHeader className="border-b p-5">
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>
            Choose an image from your library or upload a new one.
          </DialogDescription>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex gap-4 border-b p-4">
          <button
            type="button"
            onClick={() => setTab("library")}
            className={
              tab === "library"
                ? "font-semibold text-blue-600"
                : "text-gray-500"
            }
          >
            Media Library
          </button>

          <button
            type="button"
            onClick={() => setTab("upload")}
            className={
              tab === "upload" ? "font-semibold text-blue-600" : "text-gray-500"
            }
          >
            Upload New
          </button>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          {tab === "library" ? (
            <>
              {loading && <p>Loading images...</p>}

              {error && <p className="text-red-600">{error}</p>}
              {!loading && !error && images.length === 0 && (
                <p>No images yet. Upload an image to get started.</p>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {images.map((image) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => setSelected(image)}
                      aria-pressed={selected?.id === image.id}
                      className={`overflow-hidden rounded-lg border-2 ${
                        selected?.id === image.id
                          ? "border-blue-600"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.name}
                        className="aspect-square w-full object-cover"
                        width={500}
                        height={500}
                      />

                      <p className="truncate p-2 text-xs">{image.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="py-10">
              <UploadButton
                endpoint="mediaUploader"
                appearance={{
                  button: "h-10 rounded-md bg-primary px-6 text-gray-950",
                  allowedContent: "text-xs text-muted-foreground",
                }}
                onClientUploadComplete={() => {
                  setPage(1);
                  setRefresh((r) => r + 1);
                  setTab("library");
                }}
                onUploadError={(error) => {
                  setError(error.message);
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t p-4">
          {tab === "library" ? (
            <Pagination className="mx-0 w-auto" aria-label="Media library pages">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    aria-disabled={page <= 1 || loading}
                    tabIndex={page <= 1 || loading ? -1 : undefined}
                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                    onClick={(event) => {
                      event.preventDefault();
                      if (!loading && page > 1) setPage((p) => p - 1);
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-2 text-sm" aria-live="polite">
                    Page {page} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    aria-disabled={page >= totalPages || loading}
                    tabIndex={page >= totalPages || loading ? -1 : undefined}
                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                    onClick={(event) => {
                      event.preventDefault();
                      if (!loading && page < totalPages) setPage((p) => p + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : (
            <div />
          )}

          <Button type="button" disabled={!selected} onClick={confirmSelection}>
            Use Selected Image
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
