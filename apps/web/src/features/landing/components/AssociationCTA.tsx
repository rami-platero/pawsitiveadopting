import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, LayoutDashboard, PawPrint, Users, Zap } from 'lucide-react';
import { type Locale } from 'next-intl';
import { Button } from '@pawsitiveadopting/ui/components/button';

type Props = {
    locale: Locale;
};

/**
 * Association Call-to-Action Section
 * Encourages associations to sign up and explains the benefits
 */
export default async function AssociationCTA({ locale }: Props) {
    const t = await getTranslations({ locale, namespace: 'HomePage.associationCTA' });

    const features = [
        {
            icon: Zap,
            title: t('features.easy.title'),
            description: t('features.easy.description'),
        },
        {
            icon: LayoutDashboard,
            title: t('features.dashboard.title'),
            description: t('features.dashboard.description'),
        },
        {
            icon: PawPrint,
            title: t('features.manage.title'),
            description: t('features.manage.description'),
        },
        {
            icon: Users,
            title: t('features.reach.title'),
            description: t('features.reach.description'),
        },
    ];

    return (
        <section className="w-full py-16 px-4 bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Content */}
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
                            {t('badge')}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight">
                            {t('title')}
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t('description')}
                        </p>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="shrink-0 w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                                            <Icon className="h-5 w-5 text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm mb-1">
                                                {feature.title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link href="/association-signup">
                                <Button size="lg" className="gap-2">
                                    {t('cta')}
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Placeholder for Dashboard Images */}
                    <div className="relative">
                        <div className="aspect-square bg-linear-to-br from-secondary/20 to-muted rounded-2xl p-8 flex items-center justify-center border-2 border-dashed border-secondary/30">
                            <div className="text-center space-y-4">
                                <LayoutDashboard className="h-24 w-24 text-secondary/40 mx-auto" />
                                <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                                    {t('imagePlaceholder')}
                                </p>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/5 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
