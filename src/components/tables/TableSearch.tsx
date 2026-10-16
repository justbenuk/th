import { Input } from "../ui/input";

type TableSearchProps = {
  title: string;
  search: string;
  setSearch: (value: string) => void;
};

export default function TableSearch({
  title,
  search,
  setSearch,
}: TableSearchProps) {
  return (
    <Input
      placeholder={title}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
