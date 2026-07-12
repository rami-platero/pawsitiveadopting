"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type BreadcrumbLabelContextValue = {
    label: string | null;
    setLabel: (label: string | null) => void;
};

const BreadcrumbLabelContext = createContext<BreadcrumbLabelContextValue | null>(null);

export function BreadcrumbLabelProvider({ children }: { children: ReactNode }) {
    const [label, setLabel] = useState<string | null>(null);

    return (
        <BreadcrumbLabelContext.Provider value={{ label, setLabel }}>
            {children}
        </BreadcrumbLabelContext.Provider>
    );
}

export function useBreadcrumbLabel() {
    const ctx = useContext(BreadcrumbLabelContext);
    if (!ctx) {
        throw new Error("useBreadcrumbLabel must be used within a BreadcrumbLabelProvider");
    }
    return ctx;
}
