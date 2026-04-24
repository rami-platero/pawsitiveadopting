import { Skeleton } from "@pawsitiveadopting/ui/components/skeleton";

const FooterSkeleton = () => {
    return (
        <footer className="w-full border-t bg-background">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4 lg:max-w-sm">
                        {/* Logo skeleton */}
                        <Skeleton className="h-8 w-32" />
                        {/* Description skeleton */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                        {/* Column 1 */}
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-20" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-20" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>

                        {/* Column 3 */}
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-20" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <Skeleton className="h-4 w-40" />

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <Skeleton className="size-5 rounded-full" />
                            <Skeleton className="size-5 rounded-full" />
                            <Skeleton className="size-5 rounded-full" />
                        </div>

                        {/* Language Switcher */}
                        <Skeleton className="h-9 w-32" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSkeleton;
