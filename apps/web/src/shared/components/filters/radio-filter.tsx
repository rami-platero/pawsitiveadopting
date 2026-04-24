import { RadioGroup, RadioGroupItem } from "@pawsitiveadopting/ui/components/radio-group"
import Collapsible from "@pawsitiveadopting/ui/components/collapsible"
import { Label } from "@pawsitiveadopting/ui/components/label"

type FilterOption = {
    value: string;
    label: string;
    count?: number;
}

type Props = {
    name: string;
    options: FilterOption[];
    selectedValue: string;
    onChange: (value: string) => void;
    defaultOpen?: boolean;
}

const RadioFilter = ({ name, options, selectedValue, onChange, defaultOpen = true }: Props) => {

    if (!options || options.length === 0) return null;

    return (
        <Collapsible name={name} defaultOpen={defaultOpen}>
            <RadioGroup value={selectedValue} onValueChange={onChange}>
                <div className="flex flex-col gap-2">
                    {options.map((option) => (
                        <div key={option.value} className="flex items-center justify-between group">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem
                                    id={`${name}-${option.value}`}
                                    value={option.value}
                                />
                                <Label
                                    htmlFor={`${name}-${option.value}`}
                                    className="text-sm font-normal cursor-pointer text-gray-700 group-hover:text-black"
                                >
                                    {option.label}
                                </Label>
                            </div>

                            {option.count !== undefined && (
                                <span className="text-xs text-gray-400 font-mono">
                                    ({option.count})
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </RadioGroup>
        </Collapsible>
    )
}

export default RadioFilter