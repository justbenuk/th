import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import SiteLogo from "../Shared/SiteLogo";
import { MAINMENUITEMS } from "@/data/Menus";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <SiteLogo size="small" />
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 px-8">
          {MAINMENUITEMS.map((item) => (
            <Button asChild key={item.link}>
              <Link href={item.link}>{item.name}</Link>
            </Button>
          ))}
        </nav>
        <SheetFooter>
          <div className="flex flex-col items-center gap-2 w-full">
            <Button asChild variant={"default"} className="w-full">
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button asChild variant={"secondary"} className="w-full">
              <Link href={"/register"}>Register</Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
