type InfoFieldProps = {
    label: string;
    value: string;
    capitalize?: boolean;
};

/**
 * A reusable component for displaying descriptive text fields with a label.
 * Used for multi-line or longer text information in pet detail sections.
 */
export default function InfoField({ label, value, capitalize = false }: InfoFieldProps) {
    return (
        <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className={`font-medium ${capitalize ? 'capitalize' : ''}`}>{value}</p>
        </div>
    );
}
