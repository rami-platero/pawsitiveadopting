import { getPostById } from '@/features/pets/data-access/getPostById';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import PetImageGallery from '@/features/pets/components/singular/pet-image-gallery';
import PetMainInfo from '@/features/pets/components/singular/pet-main-info';
import PetDetailedSections from '@/features/pets/components/singular/pet-detailed-sections';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
    params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const t = await getTranslations('Metadata.PetPage');
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        return {
            title: t('notFound'),
        };
    }

    return {
        title: t('title', { name: post.name || 'Pet' }),
        description: post.description || t('description', { name: post.name || 'Pet' }),
    }
}

export default async function PetDetailPage({ params }: Props) {
    const { id, locale } = await params;
    const post = await getPostById(id);
    const t = await getTranslations({ locale, namespace: 'Pets.PetDetail' });

    if (!post) {
        notFound();
    }

    const { animalDetails, temperament, healthInfo, adoptionRequirements } = post;

    return (
        <div className="py-8 max-w-7xl mx-auto px-4">
            {/* Back Button */}
            <Link
                href="/browse"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                {t('backToHome')}
            </Link>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Left Column - Image Gallery */}
                <div className="w-full">
                    <PetImageGallery media={post.media} petName={post.name || 'Pet'} />
                </div>

                {/* Right Column - Main Pet Information */}
                <PetMainInfo
                    post={{
                        id: post.id,
                        status: post.status,
                        name: post.name,
                        animalType: post.animalType,
                        city: post.city,
                        state: post.state,
                        country: post.country,
                        description: post.description,
                    }}
                    animalDetails={animalDetails}
                    temperament={temperament}
                    translations={{
                        badge: {
                            available: t('badge.available'),
                            pending: t('badge.pending'),
                            adopted: t('badge.adopted'),
                        },
                        description: t('aboutSection.description'),
                        contactButton: t('contactButton'),
                        details: {
                            years: (count: number) => t('aboutSection.details.years', { count }),
                            breed: t('aboutSection.details.breed'),
                            mixedBreed: t('aboutSection.details.mixedBreed'),
                            sex: t('aboutSection.details.sex'),
                            size: t('aboutSection.details.size'),
                            coatLength: t('aboutSection.details.coatLength'),
                            coatColor: t('aboutSection.details.coatColor'),
                            ageGroup: t('aboutSection.details.ageGroup'),
                        },
                        temperament: {
                            goodWith: t('aboutSection.temperament.goodWith'),
                            kids: t('aboutSection.temperament.kids'),
                            dogs: t('aboutSection.temperament.dogs'),
                            cats: t('aboutSection.temperament.cats'),
                            otherAnimals: t('aboutSection.temperament.otherAnimals'),
                        },
                    }}
                />
            </div>

            {/* Separator */}
            <div className="w-full h-px bg-border my-12" />

            {/* Detailed Information Sections */}
            <PetDetailedSections
                temperament={temperament}
                healthInfo={healthInfo}
                adoptionRequirements={adoptionRequirements}
                translations={{
                    temperament: {
                        title: t('aboutSection.temperament.title'),
                        energyLevel: t('aboutSection.temperament.energyLevel'),
                        playfulness: t('aboutSection.temperament.playfulness'),
                        trainingLevel: t('aboutSection.temperament.trainingLevel'),
                        reactionToStrangers: t('aboutSection.temperament.reactionToStrangers'),
                        tags: t('aboutSection.temperament.tags'),
                        fears: t('aboutSection.temperament.fears'),
                    },
                    health: {
                        title: t('healthSection.title'),
                        spayedNeutered: t('healthSection.spayedNeutered'),
                        vaccinated: t('healthSection.vaccinated'),
                        identification: t('healthSection.identification'),
                        specialNeeds: t('healthSection.specialNeeds'),
                        healthIssues: t('healthSection.healthIssues'),
                        specialNeedsDescription: t('healthSection.specialNeedsDescription'),
                        disability: t('healthSection.disability'),
                        yes: t('healthSection.yes'),
                        no: t('healthSection.no'),
                    },
                    requirements: {
                        title: t('requirementsSection.title'),
                        feeIncludes: t('requirementsSection.feeIncludes'),
                        homeCheckRequired: t('requirementsSection.homeCheckRequired'),
                        fencedYardRequired: t('requirementsSection.fencedYardRequired'),
                        indoorOnly: t('requirementsSection.indoorOnly'),
                        experienceRequired: t('requirementsSection.experienceRequired'),
                        adoptionContract: t('requirementsSection.adoptionContract'),
                        documentsRequired: t('requirementsSection.documentsRequired'),
                        yes: t('requirementsSection.yes'),
                        no: t('requirementsSection.no'),
                    },
                }}
            />
        </div>
    );
}
