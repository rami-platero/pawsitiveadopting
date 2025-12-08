import { Kotta_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@pawsitiveadopting/ui/lib/utils";

const kottaOne = Kotta_One({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Logo = ({ size = "md", className }: Props) => {
  const config = {
    sm: {
      img: 24,
      gap: "gap-2",
      text: "text-sm",
      brandText: "text-sm",
    },
    md: {
      img: 35,
      gap: "gap-2",
      text: "text-base",
      brandText: "text-base",
    },
    lg: {
      img: 48,
      gap: "gap-3",
      text: "text-xl",
      brandText: "text-xl",
    },
  } as const;

  const { img, gap, text, brandText } = config[size];

  return (
    <Link href={"/"} className={cn("flex items-center", gap, className)}>
      <Image src={"/assets/logo.png"} alt="logo" width={img} height={img} />
      <span className={`font-bold ${text}`}>
        Pawsitive{" "}
        <span className={`${kottaOne.className} ${brandText}`}>Adopting</span>
      </span>
    </Link>
  );
};

export default Logo;
