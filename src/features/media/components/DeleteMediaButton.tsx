import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { DeleteMediaById } from "../MediaActions";

export default function DeleteMediaButton({ id }: { id: string }) {
  async function handleDelete() {
    const response = await DeleteMediaById(id);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }
  return (
    <Button
      variant={"outline"}
      size={"icon-xs"}
      className="bg-red-300/50"
      onClick={() => handleDelete()}
    >
      <TrashIcon />
    </Button>
  );
}
