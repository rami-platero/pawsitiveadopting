"use client"
import { AdoptionPostWithMedia } from '@/features/pets/data-access/getPosts';
import PostItem from './post-item';

export default function PostsList({ posts }: { posts: AdoptionPostWithMedia[] }) {

    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No pets found</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
                return <PostItem key={post.id} post={post}/>
            })}
        </div>
    );
}