"use client"

import { usePathname } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useBreadcrumbLabel } from "@/shared/context/breadcrumb-label-context";

type Crumb = {
    label: string;
    href?: string;
};

const Breadcrumb = () => {

    const pathname = usePathname()
    const { label: dynamicLabel } = useBreadcrumbLabel();
    const tBreadcrumb = useTranslations("Breadcrumb");
    const tBrowse = useTranslations("Browse");
    const tAssociations = useTranslations("Associations");

    if (pathname === "/") {
        return null;
    }

    const browsePetsCrumb: Crumb = { label: tBrowse("title"), href: "/browse" };

    const crumbs: Record<string, Crumb> = {
        "/": { label: tBreadcrumb("home"), href: "/" },
        "browse": browsePetsCrumb,
        "associations": { label: tAssociations("title"), href: "/associations" },
        // "pet" itself has no listing page, so it shares the browse page's label/link
        "pet": browsePetsCrumb,
    };

    const breadcrumb = ["/", ...pathname.split("/").splice(1, 2)]

    return (
        <div className="flex gap-2 mt-4">
            {breadcrumb.map((path, index) => {
                const isLast = index === breadcrumb.length - 1;
                const crumb = crumbs[path];
                const isDynamic = !crumb && isLast;
                const label = crumb?.label ?? dynamicLabel ?? path;
                const href = !isLast ? crumb?.href : undefined;

                return <div key={path} className="flex items-center justify-center gap-2">

                    {isDynamic && !dynamicLabel ? (
                        <span className="inline-block h-4 w-24 rounded bg-black/10 animate-pulse" />
                    ) : href ? (
                        <Link className="text-black/60" href={href}>{label}</Link>
                    ) : (
                        <span className={isLast ? undefined : "text-black/60"}>{label}</span>
                    )}

                    {!isLast && <ChevronRight size={14} className="text-black/50" />}
                </div>
            })}
        </div>
    )
}

export default Breadcrumb