import { LucideIcon } from 'lucide-react';

type CompatibilityBadgeProps = {
    icon: LucideIcon;
    label: string;
    isCompatible: boolean;
};

/**
 * A reusable component for displaying compatibility indicators (good with kids, dogs, etc.).
 * Shows an icon with conditional styling based on compatibility status.
 */
export default function CompatibilityBadge({ icon: Icon, label, isCompatible }: CompatibilityBadgeProps) {
    return (
        <div className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors ${isCompatible
                ? 'bg-green-50 dark:bg-green-950/30'
                : 'bg-red-200/40'
            }`}>
            <Icon className={`h-5 w-5 shrink-0 ${isCompatible
                    ? 'text-green-600 dark:text-green-500'
                    : 'text-red-500/50'
                }`} />
            <span className={`text-sm font-medium ${isCompatible
                    ? 'text-green-900 dark:text-green-100'
                    : 'text-red-500/60'
                }`}>
                {label}
            </span>
        </div>
    );
}
