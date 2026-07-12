"use client";

import { useEffect, useRef } from "react";

export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  onIntersect: () => void,
  options: IntersectionObserverInit = { rootMargin: "200px" },
) {
  const onIntersectRef = useRef(onIntersect);
  onIntersectRef.current = onIntersect;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) onIntersectRef.current();
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);
}
