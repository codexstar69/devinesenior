import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
}

export function useScrollReveal({
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  once = true
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, root, rootMargin, once]);

  return { ref, isVisible };
}
