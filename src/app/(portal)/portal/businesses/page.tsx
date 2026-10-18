import Link from "next/link";

export default function BusinessesPage() {
  return (
    <div>
      <Link href={"/portal/businesses/new"}>New</Link>
    </div>
  );
}
