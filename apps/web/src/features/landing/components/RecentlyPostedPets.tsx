import { getRecentPosts } from '@/features/pets/data-access/getRecentPosts';
import PostItem from '@/features/pets/components/browse/post-item';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type Locale } from 'next-intl';

type Props = {
    locale: Locale;
};

export default async function RecentlyPostedPets({ locale }: Props) {
    const posts = await getRecentPosts(4);
    const t = await getTranslations({ locale, namespace: 'HomePage.recentPets' });

    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold text-balance">
                            {t('title')}
                        </h2>
                        <p className="text-muted-foreground mt-2 text-lg">
                            {t('description')}
                        </p>
                    </div>
                    <Link
                        href="/browse"
                        className="hidden md:flex items-center gap-2 text-secondary hover:gap-3 transition-all font-semibold"
                    >
                        {t('viewAll')}
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>

                {/* Pets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <PostItem
                            key={post.id}
                            id={post.id}
                            name={post.name}
                            media={post.media}
                            ageGroup={post.animalDetails.ageGroup}
                            sex={post.animalDetails.sex}
                            city={post.city}
                            state={post.state}
                            temperament={post.temperament}
                        />
                    ))}
                </div>

                {/* Mobile View All Link */}
                <div className="md:hidden mt-8 flex justify-center">
                    <Link
                        href="/browse"
                        className="flex items-center gap-2 text-secondary hover:gap-3 transition-all font-semibold px-6 py-3 border border-secondary rounded-full"
                    >
                        {t('viewAll')}
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
