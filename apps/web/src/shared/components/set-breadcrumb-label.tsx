"use client";

import { useEffect, useLayoutEffect } from "react";
import { useBreadcrumbLabel } from "@/shared/context/breadcrumb-label-context";

// useLayoutEffect applies the label before the browser paints, so the
// breadcrumb never visibly flashes its loading state on the client. It's a
// no-op during SSR, so fall back to useEffect there to avoid React's warning.
const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SetBreadcrumbLabel({ label }: { label: string }) {
    const { setLabel } = useBreadcrumbLabel();

    useIsomorphicLayoutEffect(() => {
        setLabel(label);
        return () => setLabel(null);
    }, [label, setLabel]);

    return null;
}
