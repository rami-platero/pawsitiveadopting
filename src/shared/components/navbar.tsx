import { buttonVariants } from "./ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { cn } from "@/shared/lib/utils"
import Image from "next/image"
import { Kotta_One } from "next/font/google"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/components/ui/accordion"
import { Menu } from "lucide-react"

const kottaOne = Kotta_One({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
})

const Navbar = () => {
  const t = useTranslations("NavbarLinks")
  const items = [
    {
      title: t("browse.title"),
      link: t("browse.link"),
    },
    {
      title: t("associations.title"),
      link: t("associations.link"),
    },
    {
      title: t("about.title"),
      link: t("about.link"),
    },
  ]

  const renderNavItems = (className = "") => (
    <ul className={className}>
      {items.map((item) => (
        <Link className={cn(buttonVariants({ variant: "ghost" }))} href={item.link} key={item.title}>
          {item.title}
        </Link>
      ))}
    </ul>
  )

  return (
    <nav className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <Accordion type="single" collapsible>
        <AccordionItem value="nav">
          <div className="flex flex-col lg:flex-row gap-2 max-w-7xl mx-auto">
            <div className="flex flex-row justify-between w-full p-4">
              {/* logo */}
              <Link href={"/"} className="flex items-center gap-4">
                <Image src={"/assets/logo.png"} alt="logo" width={35} height={35} />
                <span className="font-bold text-sm">
                  Pawsitive <span className={kottaOne.className}>Adopting</span>
                </span>
              </Link>
              {/* desktop nav items */}
              <div className="hidden lg:block">{renderNavItems()}</div>
              <div className="flex items-center gap-2">
                <Link href={"/login"} className={cn(buttonVariants({ variant: "ghost" }))}>
                  Login
                </Link>
                <Link href={"/register"} className={cn(buttonVariants())}>
                  Get Started
                </Link>
                {/* mobile trigger button */}
                <AccordionTrigger className="lg:hidden">
                  <Menu />
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="lg:hidden bg-black/1 p-2">
              {renderNavItems("flex flex-col items-start gap-4")}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </nav>
  )
}

export default Navbar
