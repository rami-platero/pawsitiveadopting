import { Badge } from '@pawsitiveadopting/ui/components/badge';
import InfoRow from './info-row';
import InfoField from './info-field';

type Temperament = {
    energyLevel?: string | null;
    playfulness?: string | null;
    trainingLevel?: string | null;
    reactionToStrangers?: string | null;
    temperamentTags?: string[] | null;
    fears?: string[] | null;
};

type HealthInfo = {
    spayedNeutered?: boolean | null;
    vaccinated?: boolean | null;
    identification?: boolean | null;
    specialNeeds?: boolean | null;
    healthIssues?: string | null;
    specialNeedsDesc?: string | null;
    disability?: string | null;
};

type AdoptionRequirements = {
    feeIncludes?: string | null;
    homeCheckRequired?: boolean | null;
    fencedYardRequired?: boolean | null;
    indoorOnly?: boolean | null;
    experienceRequired?: boolean | null;
    adoptionContract?: boolean | null;
    documentsRequired?: string | null;
};

type PetDetailedSectionsProps = {
    temperament?: Temperament | null;
    healthInfo?: HealthInfo | null;
    adoptionRequirements?: AdoptionRequirements | null;
    translations: {
        temperament: {
            title: string;
            energyLevel: string;
            energyLevelValues: Record<string, string>;
            playfulness: string;
            trainingLevel: string;
            reactionToStrangers: string;
            tags: string;
            fears: string;
        };
        health: {
            title: string;
            spayedNeutered: string;
            vaccinated: string;
            identification: string;
            specialNeeds: string;
            healthIssues: string;
            specialNeedsDescription: string;
            disability: string;
            yes: string;
            no: string;
        };
        requirements: {
            title: string;
            feeIncludes: string;
            homeCheckRequired: string;
            fencedYardRequired: string;
            indoorOnly: string;
            experienceRequired: string;
            adoptionContract: string;
            documentsRequired: string;
            yes: string;
            no: string;
        };
    };
};

/**
 * Detailed sections for pet information:
 * Temperament details, health information, and adoption requirements.
 */
export default function PetDetailedSections({ temperament, healthInfo, adoptionRequirements, translations }: PetDetailedSectionsProps) {
    return (
        <div className="space-y-6">
            {/* Temperament Details */}
            {temperament && (
                <div className="p-4 bg-background">
                    <h3 className="text-base font-semibold mb-3">{translations.temperament.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {temperament.energyLevel && (
                            <InfoField
                                label={translations.temperament.energyLevel}
                                value={translations.temperament.energyLevelValues[temperament.energyLevel] ?? temperament.energyLevel}
                                capitalize
                            />
                        )}
                        {temperament.playfulness && (
                            <InfoField
                                label={translations.temperament.playfulness}
                                value={temperament.playfulness}
                                capitalize
                            />
                        )}
                        {temperament.trainingLevel && (
                            <InfoField
                                label={translations.temperament.trainingLevel}
                                value={temperament.trainingLevel}
                                capitalize
                            />
                        )}
                        {temperament.reactionToStrangers && (
                            <InfoField
                                label={translations.temperament.reactionToStrangers}
                                value={temperament.reactionToStrangers}
                                capitalize
                            />
                        )}
                    </div>
                    {temperament.temperamentTags && temperament.temperamentTags.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground mb-2">{translations.temperament.tags}</p>
                            <div className="flex flex-wrap gap-2">
                                {temperament.temperamentTags.map((tag, index) => (
                                    <Badge key={index} variant="secondary">{tag.charAt(0).toUpperCase() + tag.slice(1)}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {temperament.fears && temperament.fears.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-muted-foreground">{translations.temperament.fears}</p>
                            <p className="font-medium">{temperament.fears.join(', ')}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Health Information */}
            {healthInfo && (
                <div className="p-4 bg-background">
                    <h3 className="text-base font-semibold mb-3">{translations.health.title}</h3>
                    <div className="space-y-3">
                        {healthInfo.spayedNeutered !== null && (
                            <InfoRow
                                label={translations.health.spayedNeutered}
                                value={healthInfo.spayedNeutered!}
                                yesText={translations.health.yes}
                                noText={translations.health.no}
                            />
                        )}
                        {healthInfo.vaccinated !== null && (
                            <InfoRow
                                label={translations.health.vaccinated}
                                value={healthInfo.vaccinated!}
                                yesText={translations.health.yes}
                                noText={translations.health.no}
                            />
                        )}
                        {healthInfo.identification !== null && (
                            <InfoRow
                                label={translations.health.identification}
                                value={healthInfo.identification!}
                                yesText={translations.health.yes}
                                noText={translations.health.no}
                            />
                        )}
                        {healthInfo.specialNeeds !== null && (
                            <InfoRow
                                label={translations.health.specialNeeds}
                                value={healthInfo.specialNeeds!}
                                yesText={translations.health.yes}
                                noText={translations.health.no}
                            />
                        )}
                        {healthInfo.healthIssues && (
                            <InfoField
                                label={translations.health.healthIssues}
                                value={healthInfo.healthIssues}
                            />
                        )}
                        {healthInfo.specialNeedsDesc && (
                            <InfoField
                                label={translations.health.specialNeedsDescription}
                                value={healthInfo.specialNeedsDesc}
                            />
                        )}
                        {healthInfo.disability && (
                            <InfoField
                                label={translations.health.disability}
                                value={healthInfo.disability}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Adoption Requirements */}
            {adoptionRequirements && (
                <div className="p-4 bg-background">
                    <h3 className="text-base font-semibold mb-3">{translations.requirements.title}</h3>
                    <div className="space-y-3">
                        {adoptionRequirements.feeIncludes && (
                            <InfoField
                                label={translations.requirements.feeIncludes}
                                value={adoptionRequirements.feeIncludes}
                            />
                        )}
                        {adoptionRequirements.homeCheckRequired !== null && (
                            <InfoRow
                                label={translations.requirements.homeCheckRequired}
                                value={adoptionRequirements.homeCheckRequired!}
                                yesText={translations.requirements.yes}
                                noText={translations.requirements.no}
                            />
                        )}
                        {adoptionRequirements.fencedYardRequired !== null && (
                            <InfoRow
                                label={translations.requirements.fencedYardRequired}
                                value={adoptionRequirements.fencedYardRequired!}
                                yesText={translations.requirements.yes}
                                noText={translations.requirements.no}
                            />
                        )}
                        {adoptionRequirements.indoorOnly !== null && (
                            <InfoRow
                                label={translations.requirements.indoorOnly}
                                value={adoptionRequirements.indoorOnly!}
                                yesText={translations.requirements.yes}
                                noText={translations.requirements.no}
                            />
                        )}
                        {adoptionRequirements.experienceRequired !== null && (
                            <InfoRow
                                label={translations.requirements.experienceRequired}
                                value={adoptionRequirements.experienceRequired!}
                                yesText={translations.requirements.yes}
                                noText={translations.requirements.no}
                            />
                        )}
                        {adoptionRequirements.adoptionContract !== null && (
                            <InfoRow
                                label={translations.requirements.adoptionContract}
                                value={adoptionRequirements.adoptionContract!}
                                yesText={translations.requirements.yes}
                                noText={translations.requirements.no}
                            />
                        )}
                        {adoptionRequirements.documentsRequired && (
                            <InfoField
                                label={translations.requirements.documentsRequired}
                                value={adoptionRequirements.documentsRequired}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
