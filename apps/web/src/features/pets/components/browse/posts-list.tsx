import { AdoptionPostExtended } from '@/features/pets/data-access/getPosts';
import PostItem from './post-item';

export default async function PostsList({ posts }: { posts: AdoptionPostExtended[] }) {

    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No pets found</p>
            </div>
        );
    }

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => {
                return <PostItem key={post.id} id={post.id} name={post.name} media={post.media} ageGroup={post.animalDetails.ageGroup} sex={post.animalDetails.sex} city={post.city} state={post.state} temperament={post.temperament} />
            })}
        </div>
    );
}