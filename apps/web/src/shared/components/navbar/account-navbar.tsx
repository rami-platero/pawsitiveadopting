import Image from "next/image"
import Link from "next/link"
import { signOut } from "@/features/auth/actions/auth.actions"
import { LayoutDashboard, LogOutIcon, Settings } from "lucide-react"
import { cn } from "@pawsitiveadopting/ui/lib/utils";
import { Button, buttonVariants } from "@pawsitiveadopting/ui/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@pawsitiveadopting/ui/components/dropdown-menu"

type User = {
  name?: string
  email?: string
  image?: string | null | undefined;
}

export default function AccountNavbar({
  user,
}: {
  user: User
}) {

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Image
          src={user.image ?? "/assets/img/default-avatar.png"}
          alt={user.name ?? "avatar"}
          width={40}
          height={40}
          className="object-cover cursor-pointer rounded-full"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-72 mr-2">
        <div className="px-2 py-1 flex gap-2 items-center">
          <Image
            src={user.image ?? "/assets/img/default-avatar.png"}
            alt={user.name ?? "avatar"}
            width={32}
            height={32}
            className="object-cover rounded-full"
          />
          <div>
            <h3 className="text-sm font-medium">{user.name ?? user.email}</h3>
            <h4 className="text-xs text-muted-foreground">{user.email}</h4>
          </div>

        </div>
        <DropdownMenuSeparator />

        <div className="flex flex-col gap-1">
          <Link href="/dashboard" className={cn(buttonVariants({ variant: "item" }))}><LayoutDashboard />Dashboard</Link>
          <Link href="/settings" className={cn(buttonVariants({ variant: "item" }))}><Settings />Settings</Link>
          <Button onClick={signOut} size={"sm"} className="w-full font-regular"><LogOutIcon className="text-white" />Sign Out</Button>
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
