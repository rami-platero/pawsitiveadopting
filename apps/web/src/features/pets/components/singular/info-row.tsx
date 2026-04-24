type InfoRowProps = {
    label: string;
    value: string | boolean;
    yesText?: string;
    noText?: string;
};

/**
 * A reusable component for displaying label-value pairs in a row format.
 * Primarily used for yes/no boolean values in pet detail sections.
 */
export default function InfoRow({ label, value, yesText = 'Yes', noText = 'No' }: InfoRowProps) {
    const displayValue = typeof value === 'boolean'
        ? (value ? yesText : noText)
        : value;

    return (
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{displayValue}</span>
        </div>
    );
}
