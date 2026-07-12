"use client";

import { useQueryState } from "nuqs";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@pawsitiveadopting/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@pawsitiveadopting/ui/components/dropdown-menu";

type Country = {
    value: string;
    count: number;
};

type AssociationCountryFilterProps = {
    countries: Country[];
    label: string;
    allLabel: string;
};

export default function AssociationCountryFilter({ countries, label, allLabel }: AssociationCountryFilterProps) {
    const [country, setCountry] = useQueryState("country", { shallow: false });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2" aria-label={label}>
                    <Globe className="h-4 w-4" />
                    {country || allLabel}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                    value={country ?? ""}
                    onValueChange={(value) => setCountry(value || null)}
                >
                    <DropdownMenuRadioItem value="">{allLabel}</DropdownMenuRadioItem>
                    {countries.map((c) => (
                        <DropdownMenuRadioItem key={c.value} value={c.value}>
                            {c.value} ({c.count})
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
