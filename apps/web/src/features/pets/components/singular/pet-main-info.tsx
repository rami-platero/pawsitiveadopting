import { Button } from '@pawsitiveadopting/ui/components/button';
import { Badge } from '@pawsitiveadopting/ui/components/badge';
import { MapPin, Calendar, Baby, Dog, Cat, PawPrint } from 'lucide-react';
import { cn } from '@pawsitiveadopting/ui/lib/utils';
import FavoriteButton from './favorite-button';
import CompatibilityBadge from './compatibility-badge';
import StatItem from './stat-item';

type PetMainInfoProps = {
    post: {
        id: number;
        status: string | null;
        name: string | null;
        animalType: string;
        city?: string | null;
        state?: string | null;
        country?: string | null;
        description?: string | null;
    };
    animalDetails: {
        estimatedAgeYrs?: number | null;
        breed?: string | null;
        mixedBreed?: boolean | null;
        sex?: string | null;
        size?: string | null;
        coatLength?: string | null;
        coatColorPrimary?: string | null;
        coatColorSecondary?: string | null;
        ageGroup?: string | null;
    };
    temperament?: {
        goodWithKids?: boolean | null;
        goodWithDogs?: boolean | null;
        goodWithCats?: boolean | null;
        goodWithOtherAnimals?: boolean | null;
    } | null;
    translations: {
        badge: {
            available: string;
            pending: string;
            adopted: string;
        };
        description: string;
        contactButton: string;
        details: {
            years: (count: number) => string;
            breed: string;
            mixedBreed: string;
            sex: string;
            size: string;
            coatLength: string;
            coatColor: string;
            ageGroup: string;
        };
        temperament: {
            goodWith: string;
            kids: string;
            dogs: string;
            cats: string;
            otherAnimals: string;
        };
    };
};

/**
 * Main pet information section (right column):
 * Status, name, location, age, description, stats, compatibility, and contact button.
 */
export default function PetMainInfo({ post, animalDetails, temperament, translations }: PetMainInfoProps) {
    const hasCompatibilityInfo =
        temperament?.goodWithKids !== null ||
        temperament?.goodWithDogs !== null ||
        temperament?.goodWithCats !== null ||
        temperament?.goodWithOtherAnimals !== null;

    return (
        <div className="space-y-5">
            {/* Status Badge */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    {post.status === 'available' && (
                        <Badge className={cn("mb-3 bg-green-600 hover:bg-green-700 border-green-600")}>
                            {translations.badge.available}
                        </Badge>
                    )}
                    {post.status === 'pending' && (
                        <Badge variant="secondary" className="mb-3">
                            {translations.badge.pending}
                        </Badge>
                    )}
                    {post.status === 'adopted' && (
                        <Badge variant="outline" className="mb-3">
                            {translations.badge.adopted}
                        </Badge>
                    )}
                </div>
                <FavoriteButton postId={post.id} />
            </div>

            {/* Pet Name & Basic Info */}
            <div>
                <h1 className="text-4xl font-bold">{post.name || 'Unknown'}</h1>
                <p className="text-lg text-muted-foreground mt-1 capitalize">{post.animalType}</p>
            </div>

            {/* Location & Age */}
            <div className="flex flex-wrap gap-4 text-sm">
                {(post.city || post.state) && (
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>
                            {[post.city, post.state, post.country].filter(Boolean).join(', ')}
                        </span>
                    </div>
                )}
                {animalDetails.estimatedAgeYrs !== null && animalDetails.estimatedAgeYrs !== undefined && (
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{translations.details.years(animalDetails.estimatedAgeYrs)}</span>
                    </div>
                )}
            </div>

            {/* Description */}
            {post.description && (
                <div>
                    <h3 className="font-semibold mb-2">{translations.description}</h3>
                    <p className="text-muted-foreground leading-relaxed">{post.description}</p>
                </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 bg-muted/30 rounded-lg">
                {animalDetails.breed && (
                    <StatItem
                        label={translations.details.breed}
                        value={`${animalDetails.breed}${animalDetails.mixedBreed ? ` (${translations.details.mixedBreed})` : ''}`}
                    />
                )}
                {animalDetails.sex && (
                    <StatItem
                        label={translations.details.sex}
                        value={animalDetails.sex.charAt(0).toUpperCase() + animalDetails.sex.slice(1)}
                    />
                )}
                {animalDetails.size && (
                    <StatItem
                        label={translations.details.size}
                        value={animalDetails.size.charAt(0).toUpperCase() + animalDetails.size.slice(1)}
                    />
                )}
                {animalDetails.coatLength && (
                    <StatItem
                        label={translations.details.coatLength}
                        value={animalDetails.coatLength.charAt(0).toUpperCase() + animalDetails.coatLength.slice(1)}
                    />
                )}
                {(animalDetails.coatColorPrimary || animalDetails.coatColorSecondary) && (
                    <StatItem
                        label={translations.details.coatColor}
                        value={[animalDetails.coatColorPrimary, animalDetails.coatColorSecondary]
                            .filter(Boolean)
                            .map(color => color!.charAt(0).toUpperCase() + color!.slice(1))
                            .join(', ')}
                    />
                )}
                {animalDetails.ageGroup && (
                    <StatItem
                        label={translations.details.ageGroup}
                        value={animalDetails.ageGroup.replace('/', ' / ').split(' ').map(word =>
                            word === '/' ? word : word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                    />
                )}
            </div>

            {/* Temperament - Good With */}
            {temperament && hasCompatibilityInfo && (
                <div className="space-y-3">
                    <h3 className="font-semibold">{translations.temperament.goodWith}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {temperament.goodWithKids !== null && (
                            <CompatibilityBadge
                                icon={Baby}
                                label={translations.temperament.kids}
                                isCompatible={temperament.goodWithKids!}
                            />
                        )}
                        {temperament.goodWithDogs !== null && (
                            <CompatibilityBadge
                                icon={Dog}
                                label={translations.temperament.dogs}
                                isCompatible={temperament.goodWithDogs!}
                            />
                        )}
                        {temperament.goodWithCats !== null && (
                            <CompatibilityBadge
                                icon={Cat}
                                label={translations.temperament.cats}
                                isCompatible={temperament.goodWithCats!}
                            />
                        )}
                        {temperament.goodWithOtherAnimals !== null && (
                            <CompatibilityBadge
                                icon={PawPrint}
                                label={translations.temperament.otherAnimals}
                                isCompatible={temperament.goodWithOtherAnimals!}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Contact Button */}
            <Button size="lg" className="w-full">
                {translations.contactButton}
            </Button>
        </div>
    );
}
