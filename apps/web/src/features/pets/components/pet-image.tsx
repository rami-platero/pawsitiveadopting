'use client';

import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useState } from 'react';

interface PetImageProps {
    src?: string | null;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    sizes?: string;
    priority?: boolean;
    placeholderText?: string;
}

export default function PetImage({
    src,
    alt,
    fill = true,
    width,
    height,
    className = '',
    sizes,
    priority = false,
    placeholderText = 'No image available',
}: PetImageProps) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted to-muted/50">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <ImageIcon className="h-12 w-12 opacity-40" />
                    <span className="text-sm font-medium opacity-70">{placeholderText}</span>
                </div>
            </div>
        );
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            className={className}
            sizes={sizes}
            priority={priority}
            onError={() => setHasError(true)}
        />
    );
}
