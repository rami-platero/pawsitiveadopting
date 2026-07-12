import Link from "next/link";
import { MapPin } from "lucide-react";
import Avatar from "@pawsitiveadopting/ui/components/avatar";

type AssociationCardProps = {
    association: {
        slug: string | null;
        name: string;
        logo?: string | null;
        city?: string | null;
        state?: string | null;
        country?: string | null;
        description?: string | null;
    };
};

export default function AssociationCard({ association }: AssociationCardProps) {
    if (!association.slug) return null;

    return (
        <Link
            href={`/associations/${association.slug}`}
            className="group block overflow-hidden rounded-lg border bg-card transition-all h-full hover:shadow-lg"
        >
            <div className="p-4 space-y-3 flex flex-col h-full">
                <div className="flex items-center gap-3">
                    <Avatar image={association.logo} alt={association.name} size={56} />
                    <div className="min-w-0">
                        <p className="font-bold text-lg truncate">{association.name}</p>
                        {(association.city || association.country) && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">
                                    {[association.city, association.state, association.country].filter(Boolean).join(", ")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {association.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {association.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
