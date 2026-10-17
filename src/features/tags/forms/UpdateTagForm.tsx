import { Tag } from "@prisma/client";
import TagForm from "./TagForm";

export default function UpdateTagForm({ tag }: { tag: Tag }) {
  return <TagForm tag={tag} mode="edit" />;
}
