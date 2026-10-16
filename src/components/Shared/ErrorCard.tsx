import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../ui/empty";

type ErrorCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export default function ErrorCard({
  title,
  description,
  icon: Icon,
  action,
}: ErrorCardProps) {
  return (
    <Empty className="border-2 border-red-500 bg-red-500/10">
      <EmptyHeader className="text-red-500 font-semibold text-xl">
        <EmptyMedia variant="icon" className="bg-red-500/20">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && (
        <EmptyContent>
          <Button onClick={action?.onClick}>{action?.label}</Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
