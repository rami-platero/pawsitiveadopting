"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@pawsitiveadopting/ui/components/dropdown-menu";
import { Check, ChevronDown } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Button } from "@pawsitiveadopting/ui/components/button";
import ReactCountryFlag from "react-country-flag";

type Locale = "en" | "es" | "fr";

const languages: Record<Locale, { name: string; code: string }> = {
    en: { name: "English", code: "US" },
    es: { name: "Español", code: "ES" },
    fr: { name: "Français", code: "FR" },
};

export default function LanguageSwitcher() {
    const locale = useLocale() as Locale;
    const router = useRouter();
    const pathname = usePathname();

    const handleLanguageChange = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
        router.refresh();
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-primary/35"
                    aria-label="Select language"
                    variant={"outline"}
                >

                    <div className="flex gap-2 justify-center items-center text-sm"><ReactCountryFlag svg countryCode={languages[locale].code} /> {languages[locale].name} <ChevronDown className="size-4" /></div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="min-w-40">
                {routing.locales.map((loc) => {
                    const typedLocale = loc as Locale;
                    const isActive = locale === typedLocale;
                    return (
                        <DropdownMenuItem
                            key={typedLocale}
                            onClick={() => handleLanguageChange(typedLocale)}
                            className="flex items-center justify-between cursor-pointer px-2 focus:bg-primary/35"
                            disabled={isActive}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <ReactCountryFlag svg countryCode={languages[typedLocale].code} />
                                <span className="text-sm">{languages[typedLocale].name}</span>
                            </div>
                            {isActive && <Check className="size-4 text-secondary" />}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
