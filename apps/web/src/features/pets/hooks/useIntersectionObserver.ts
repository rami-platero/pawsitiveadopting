"use client";

import { useEffect } from "react";

export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  onIntersect: () => void,
  options: IntersectionObserverInit = { rootMargin: "200px" },
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) onIntersect();
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);
}
