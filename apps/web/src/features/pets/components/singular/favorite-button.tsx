'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

interface FavoriteButtonProps {
    postId: number;
    initialFavorited?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FavoriteButton({ postId: _postId, initialFavorited = false }: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(initialFavorited);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAnimating(true);
        setIsFavorited(!isFavorited);

        // TODO: Add API call to save favorite status
        // await fetch('/api/favorites', { method: 'POST', body: JSON.stringify({ postId: _postId }) });

        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <button
            onClick={handleClick}
            className="cursor-pointer group/heart relative p-2.5 rounded-full hover:bg-muted/50 transition-all duration-200  z-10"
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
            <Heart
                className={`h-5 w-5 transition-all duration-200 ${isFavorited
                    ? 'fill-red-500 text-red-500'
                    : 'text-foreground group-hover/heart:text-red-400'
                    } ${isAnimating ? 'scale-125' : 'scale-100'}`}
            />
        </button>
    );
}
