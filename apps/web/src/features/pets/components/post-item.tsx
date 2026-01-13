import { AdoptionPostWithMedia } from '@/features/pets/data-access/getPosts';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

type Props = {
    post: AdoptionPostWithMedia
}

const PostItem = ({ post }: Props) => {
    const mainImage = post.media.find((m) => m.isMain)?.url || post.media[0]?.url;

    return (
        <Link
            key={post.id}
            href={`/pet/${post.id}`}
            className="group block overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg hover:-translate-y-1"
        >
            <div className="relative aspect-square overflow-hidden bg-muted">
                {mainImage ? (
                    <Image
                        src={mainImage}
                        alt={post.name || 'Pet photo'}
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

            <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg line-clamp-1">{post.name || 'Unknown'}</h3>

                {post.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.description}
                    </p>
                )}

            </div>
        </Link>
    )
}

export default PostItem