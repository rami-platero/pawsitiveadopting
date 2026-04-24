'use client';

import { Media } from '@/db/schema';
import PetImage from '@/features/pets/components/pet-image';
import { useState } from 'react';
import { cn } from '@pawsitiveadopting/ui/lib/utils';

interface PetImageGalleryProps {
    media: Media[];
    petName: string;
}

export default function PetImageGallery({ media, petName }: PetImageGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Sort media to have main image first
    const sortedMedia = [...media].sort((a, b) => {
        if (a.isMain) return -1;
        if (b.isMain) return 1;
        return 0;
    });

    const currentImage = sortedMedia[selectedIndex];

    if (sortedMedia.length === 0) {
        return (
            <div className="w-full">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <PetImage src={null} alt={petName} />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border">
                <PetImage
                    src={currentImage?.url}
                    alt={`${petName} - Image ${selectedIndex + 1}`}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                />
            </div>

            {/* Thumbnail Gallery */}
            {sortedMedia.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                    {sortedMedia.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                "relative aspect-square rounded-md overflow-hidden border-2 transition-all hover:opacity-100",
                                selectedIndex === index
                                    ? "border-primary opacity-100 ring-2 ring-primary/20"
                                    : "border-transparent opacity-60"
                            )}
                        >
                            <PetImage
                                src={item.url}
                                alt={`${petName} thumbnail ${index + 1}`}
                                className="object-cover"
                                sizes="100px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
