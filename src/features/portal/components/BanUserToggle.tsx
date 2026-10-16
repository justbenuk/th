import { Button } from "@/components/ui/button";
import type { User } from "@prisma/client";
import { Unlock } from "lucide-react";
import BanUserForm from "../forms/BanUserForm";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UnbanUserAction } from "../PortalActions";
import { toast } from "sonner";

export default function BanUserToggle({ row }: { row: User }) {
  async function handleUnBan() {
    const response = await UnbanUserAction(row.id);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  }

  return (
    <>
      {row.banned ? (
        <Tooltip>
          <TooltipTrigger className="flex items-center" asChild>
            <Button
              type="button"
              variant={"outline"}
              size={"icon-xs"}
              className="bg-red-200/50"
              onClick={() => handleUnBan()}
            >
              <Unlock />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{row.banReason}</TooltipContent>
        </Tooltip>
      ) : (
        <BanUserForm id={row.id} />
      )}
    </>
  );
}
