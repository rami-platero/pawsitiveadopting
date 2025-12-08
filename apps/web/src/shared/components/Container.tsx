import { cn } from "@pawsitiveadopting/ui/lib/utils";

type Props = {
    children: React.ReactNode;
    className?: string;
}

const Container = ({children, className}: Props) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-4", className)}>
        {children}
    </div>
  )
}

export default Container