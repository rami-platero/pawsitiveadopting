import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
  defaultOpen?: boolean;
  name: string;
} & React.HTMLAttributes<HTMLDivElement>

export default function Collapsible({ children, defaultOpen = false, name, className }: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 rounded-lg text-left flex justify-between items-center cursor-pointer text-sm"
      >
        {name} 
        <ChevronDown 
          size={20} 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}>
        <div className="min-h-0 flex flex-col gap-2 p-2">
          {children}
        </div>
      </div>
    </div>
  );
}