import { Media, } from '@/db/schema';
import { AdoptionPostExtended } from '@/features/pets/data-access/getPosts';
import { Heart, Calendar } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { BsGenderMale } from 'react-icons/bs';

type Props = {
    id: AdoptionPostExtended['id']
    name: AdoptionPostExtended['name']
    media: Media[]
    ageGroup: AdoptionPostExtended['animalDetails']['ageGroup']
    sex: AdoptionPostExtended['animalDetails']['sex']
}

const PostItem = async ({ id, name, media, ageGroup, sex }: Props) => {
    const t = await getTranslations('Pets.PostItem');
    const mainImage = media.find((m) => m.isMain)?.url || media[0]?.url;

    return (
        <Link
            key={id}
            href={`/pet/${id}`}
            className="group block overflow-hidden rounded-lg border bg-card transition-all h-full flex-col"
        >
            <div className="relative aspect-square overflow-hidden bg-muted shrink-0">
                {mainImage ? (
                    <Image
                        src={mainImage}
                        alt={name || 'Pet photo'}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        No image
                    </div>
                )}

                <button
                    className="absolute top-2 left-2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                >
                    <Heart className="h-4 w-4 text-gray-600" />
                </button>
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
            </div>
        </Link>
    )
}

export default PostItem