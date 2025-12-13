import Image from "next/image"
import Link from "next/link"
import { LayoutDashboard, Settings } from "lucide-react"
import { cn } from "@pawsitiveadopting/ui/lib/utils";
import { buttonVariants } from "@pawsitiveadopting/ui/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@pawsitiveadopting/ui/components/dropdown-menu"
import { getSession } from "@/features/auth/actions/server";
import { getTranslations } from "next-intl/server";
import SignOutButton from "@/features/auth/components/SignOutButton";

export default async function AccountNavbar() {
  const session = await getSession()
  const t = await getTranslations("Navbar")

  if (!session) {
    return <div className="flex items-center gap-2">
      <Link
        href={"/login"}
        className={cn(buttonVariants({ variant: "ghost" }))}
      >
        {t("auth.login")}
      </Link>
      <Link href={"/sign-up"} className={cn(buttonVariants())}>
        {t("auth.getStarted")}
      </Link>
    </div>
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {session.user.image ?
          <Image
            src={session.user.image ?? "/assets/img/default-avatar.png"}
            alt={session.user.name ?? "avatar"}
            width={40}
            height={40}
            className="object-cover rounded-full"
          /> :
          <div className="w-10 h-10 bg-secondary rounded-full cursor-pointer" />
        }
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 mr-2">
        <div className="px-2 py-1 flex gap-2 items-center">
          {session.user.image ?
            <Image
              src={session.user.image ?? "/assets/img/default-avatar.png"}
              alt={session.user.name ?? "avatar"}
              width={32}
              height={32}
              className="object-cover rounded-full"
            /> :
            <div className="w-8 h-8 bg-secondary rounded-full" />
          }
          <div>
            <h3 className="text-sm font-medium">{session.user.name ?? session.user.email}</h3>
            <h4 className="text-xs text-muted-foreground">{session.user.email}</h4>
          </div>

        </div>
        <DropdownMenuSeparator />

        <div className="flex flex-col gap-1">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "item" }))}><LayoutDashboard />Dashboard</Link>
          <Link href="/settings" className={cn(buttonVariants({ variant: "item" }))}><Settings />Settings</Link>
          <SignOutButton />
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
