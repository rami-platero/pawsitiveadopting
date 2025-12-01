import { buttonVariants } from "./ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { Menu } from "lucide-react";
import Logo from "./Logo";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const items = [
    {
      title: t("links.browse.title"),
      link: t("links.browse.link"),
    },
    {
      title: t("links.associations.title"),
      link: t("links.associations.link"),
    },
    {
      title: t("links.about.title"),
      link: t("links.about.link"),
    },
  ];

  const renderNavItems = (className = "") => (
    <ul className={className}>
      {items.map((item) => (
        <Link
          className={cn(buttonVariants({ variant: "ghost" }))}
          href={item.link}
          key={item.title}
        >
          {item.title}
        </Link>
      ))}
    </ul>
  );

  return (
    <nav className="w-full sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <Accordion type="single" collapsible>
        <AccordionItem value="nav">
          <div className="flex flex-col lg:flex-row gap-2 max-w-7xl mx-auto">
            <div className="flex flex-row justify-between items-center w-full px-4 h-(--navbar-h)">
              <Logo size="sm"/>
              {/* desktop nav items */}
              <div className="hidden lg:block">{renderNavItems()}</div>
              <div className="flex items-center gap-2">
                <Link
                  href={"/login"}
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  {t("auth.login")}
                </Link>
                <Link href={"/sign-up"} className={cn(buttonVariants())}>
                  {t("auth.getStarted")}
                </Link>
                {/* mobile trigger button */}
                <AccordionTrigger className="lg:hidden">
                  <Menu />
                </AccordionTrigger>
              </div>
            </div>
            <AccordionContent className="lg:hidden bg-background/1 p-2">
              {renderNavItems("flex flex-col items-start gap-4")}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </nav>
  );
};

export default Navbar;
