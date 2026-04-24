type StatItemProps = {
    label: string;
    value: string;
};

/**
 * A reusable component for displaying quick stat items in a compact grid.
 * Used for pet details like breed, sex, size, coat length, etc.
 */
export default function StatItem({ label, value }: StatItemProps) {
    return (
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}
