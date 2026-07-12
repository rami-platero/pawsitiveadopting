"use client"

import { usePathname } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const crumbs: Record<string, string> = {
    "browse": "Browse Pets",
    "associations": "Associations",
    "/": "Home",
};

const Breadcrumb = () => {

    const pathname = usePathname()
    const breadcrumb = ["/", ...pathname.split("/").splice(1, 2)]

    return (
        <div className="flex gap-2 mt-4">
            {breadcrumb.map((path, index) => {
                return <div key={path} className="flex items-center justify-center gap-2">

                    {!(index === breadcrumb.length - 1) ? <Link className="text-black/60" href={path ? `/${path}` : "/"} >{crumbs[path] || path}</Link> : <span>{crumbs[path] || path}</span>}

                    {index !== breadcrumb.length - 1 && <ChevronRight size={14} className="text-black/50" />}
                </div>
            })}
        </div>
    )
}

export default Breadcrumb