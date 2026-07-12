"use client"
import { Media, Temperament } from '@/db/schema';
import { AdoptionPostExtended } from '@/features/pets/data-access/getPosts';
import { Calendar, MapPin, Baby, Dog, Cat, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link'
import React from 'react'
import { BsGenderMale } from 'react-icons/bs';
import FavoriteButton from '../singular/favorite-button';
import PetImage from '../pet-image';

type Props = {
    id: AdoptionPostExtended['id']
    name: AdoptionPostExtended['name']
    media: Media[]
    ageGroup: AdoptionPostExtended['animalDetails']['ageGroup']
    sex: AdoptionPostExtended['animalDetails']['sex']
    city: AdoptionPostExtended['city']
    state: AdoptionPostExtended['state']
    temperament: Temperament | null
    associationSlug?: string
    associationName?: string
}

const PostItem = ({ id, name, media, ageGroup, sex, city, state, temperament, associationSlug, associationName }: Props) => {
    const t = useTranslations('Pets.PostItem');
    const mainImage = media.find((m) => m.isMain)?.url || media[0]?.url;

    const href = associationSlug && associationName
        ? `/pet/${id}?from=${encodeURIComponent(associationSlug)}&fromName=${encodeURIComponent(associationName)}`
        : `/pet/${id}`;

    const compatibilityItems = [
        { key: 'goodWithKids', value: temperament?.goodWithKids, icon: Baby },
        { key: 'goodWithDogs', value: temperament?.goodWithDogs, icon: Dog },
        { key: 'goodWithCats', value: temperament?.goodWithCats, icon: Cat },
        { key: 'goodWithOtherAnimals', value: temperament?.goodWithOtherAnimals, icon: Users },
    ].filter(item => item.value !== null && item.value !== undefined);

    return (
        <Link
            key={id}
            href={href}
            className="group block overflow-hidden rounded-lg border bg-card transition-all h-full flex-col hover:shadow-lg hover:from-secondary/25 hover:to-muted/80"
        >
            <div className="relative aspect-square overflow-hidden bg-muted shrink-0">
                <PetImage
                    src={mainImage}
                    alt={name || 'Pet photo'}
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />

                <div className="absolute top-3 right-3">
                    <FavoriteButton postId={id} />
                </div>
            </div>

            <div className="p-4 space-y-3 grow flex flex-col">
                <h3 className="font-bold text-xl line-clamp-1">{name || 'Unknown'}</h3>

                <div className="flex items-center gap-4 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{t("ageGroup." + ageGroup || 'unknown')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BsGenderMale className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{t("sex." + sex || 'unknown')}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                    {(city || state) && (
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground line-clamp-1">
                                {[city, state].filter(Boolean).join(', ')}
                            </span>
                        </div>
                    )}

                    {compatibilityItems.length > 0 && (
                        <div className="flex items-center gap-2 shrink-0">
                            {compatibilityItems.map((item) => {
                                const Icon = item.icon;
                                const isCompatible = item.value === true;
                                return (
                                    <Icon
                                        key={item.key}
                                        className={`h-4 w-4 ${isCompatible ? 'text-green-700' : 'text-red-500'}`}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default PostItem