import Link from 'next/link';
import Avatar from '@pawsitiveadopting/ui/components/avatar';

type PostedByProps = {
    association?: {
        name: string;
        slug: string | null;
        logo?: string | null;
    } | null;
    user?: {
        name: string;
    } | null;
    label: string;
};

export default function PostedBy({ association, user, label }: PostedByProps) {
    if (!association && !user) return null;

    const name = association?.name ?? user?.name;
    if (!name) return null;

    const content = (
        <div className="flex items-center gap-3">
            <Avatar image={association?.logo} alt={name} size={40} />
            <span className="font-medium">{name}</span>
        </div>
    );

    return (
        <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            {association?.slug ? (
                <Link href={`/associations/${association.slug}`} className="inline-flex hover:opacity-80 transition-opacity">
                    {content}
                </Link>
            ) : (
                content
            )}
        </div>
    );
}
