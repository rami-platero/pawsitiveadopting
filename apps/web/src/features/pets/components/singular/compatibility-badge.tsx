import { LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@pawsitiveadopting/ui/components/tooltip';

type CompatibilityBadgeProps = {
    icon: LucideIcon;
    label: string;
    positivePrefix: string;
    negativePrefix: string;
    isCompatible: boolean;
};

/**
 * A reusable icon-only indicator (good with kids, dogs, etc.).
 * Shows a colored icon button; hovering reveals "Okay With"/"Not Okay With" (or "In") + the label via a tooltip.
 */
export default function CompatibilityBadge({ icon: Icon, label, positivePrefix, negativePrefix, isCompatible }: CompatibilityBadgeProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    className={`flex items-center justify-center cursor-default ${isCompatible
                        ? 'text-success-foreground'
                        : 'text-destructive'
                        }`}
                >
                    <Icon className="h-8 w-8 shrink-0" />
                </div>
            </TooltipTrigger>
            <TooltipContent>
                {isCompatible ? positivePrefix : negativePrefix} {label}
            </TooltipContent>
        </Tooltip>
    );
}
