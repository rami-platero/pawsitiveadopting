import Container from "@/shared/components/Container";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { Home } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <Container className="full-screen-center">
      <Image alt="" src={"/assets/img/cat.png"} width={500} height={500} />
      <div className="flex flex-col gap-4 items-center text-center">
        <h1 className="md:text-5xl text-4xl font-medium max-w-xl">
          {t("title")}
        </h1>
        <p className="text-gray-600 text-lg">{t("description")}</p>
        <Link className={cn(buttonVariants({ size: "lg" }), "mt-4")} href={"/"}>
          <Home className="h-4 w-4" />
          {t("button")}
        </Link>
      </div>
    </Container>
  );
}
