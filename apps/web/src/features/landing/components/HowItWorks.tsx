import { getTranslations } from 'next-intl/server';
import { type Locale } from 'next-intl';
import { Globe2, FileCheck, Zap, MessageCircle } from 'lucide-react';

type Props = {
    locale: Locale;
};

/**
 * How It Works Section
 * Explains the simple adoption process to potential adopters
 */
export default async function HowItWorks({ locale }: Props) {
    const t = await getTranslations({ locale, namespace: 'HomePage.howItWorks' });

    const steps = [
        {
            icon: Globe2,
            step: '01',
            title: t('steps.browse.title'),
            description: t('steps.browse.description'),
        },
        {
            icon: FileCheck,
            step: '02',
            title: t('steps.profile.title'),
            description: t('steps.profile.description'),
        },
        {
            icon: Zap,
            step: '03',
            title: t('steps.apply.title'),
            description: t('steps.apply.description'),
        },
        {
            icon: MessageCircle,
            step: '04',
            title: t('steps.connect.title'),
            description: t('steps.connect.description'),
        },
    ];

    return (
        <section className="w-full py-20 px-4 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-block px-4 py-2 border text-secondary rounded-full text-sm font-semibold mb-4">
                        {t('badge')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lg text-foreground/70">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((stepItem, index) => {
                        const Icon = stepItem.icon;
                        return (
                            <div
                                key={index}
                                className="relative group"
                            >
                                {/* Connecting Line (hidden on mobile and last item) */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-16 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-linear-to-r from-secondary/50 to-secondary/20" />
                                )}

                                <div className="relative bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-secondary/50">
                                    {/* Step Number Badge */}
                                    <div className="absolute -top-3 -left-3 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                        {stepItem.step}
                                    </div>

                                    {/* Icon */}
                                    <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/70 transition-colors">
                                        <Icon className="w-8 h-8 text-secondary" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-secondary mb-2">
                                        {stepItem.title}
                                    </h3>
                                    <p className="text-foreground/70 leading-relaxed">
                                        {stepItem.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-lg text-foreground/80 font-medium">
                        {t('cta')}
                    </p>
                </div>
            </div>
        </section>
    );
}
