import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthMenu() {
  return (
    <div className="hidden lg:flex flex-row items-center gap-2">
      <Button asChild variant={"outline"} className="bg-primary">
        <Link href={"/login"}>Login</Link>
      </Button>
      <Button asChild variant={"secondary"}>
        <Link href={"/onboarding/register"}>Register</Link>
      </Button>
    </div>
  );
}
