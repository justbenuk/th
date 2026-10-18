import ErrorCard from "@/components/Shared/ErrorCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MediaUploadButton from "@/features/media/components/MediaUploadButton";
import { FetchAllMedia } from "@/features/media/MediaActions";
import AllMediaTable from "@/features/media/tables/AllMediaTable";
import { PlaySquareIcon } from "lucide-react";

export default async function MediaPage() {
  const media = await FetchAllMedia();
  if (!media)
    return (
      <ErrorCard
        title="Media"
        description="Failed to load media"
        icon={PlaySquareIcon}
      />
    );
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Media</CardTitle>
          <CardDescription>Manage all media</CardDescription>
        </div>
        <MediaUploadButton />
      </CardHeader>
      <CardContent>
        <AllMediaTable media={media} />
      </CardContent>
    </Card>
  );
}
