import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";

export function useSmartScroll(offset = 80) {
    const { pathname, hash } = useLocation();
    const navType = useNavigationType(); // Describes how we got here (PUSH, POP, REPLACE)

    useEffect(() => {
        // 1. Only run if there is a hash
        if (!hash) return;

        // 2. IMPORTANT: If the user hit 'Back' (POP), let the browser/ScrollRestoration 
        // handle the scroll. Don't trigger the smooth scroll.
        if (navType === "POP") return;

        const id = hash.replace("#", "");

        const timer = setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                const top = (element.getBoundingClientRect().top + window.scrollY )- offset;

                window.scrollTo({
                    top,
                    behavior: "smooth"
                });

                // Accessibility: Move focus to the section
                element.setAttribute('tabindex', '-1');
                element.focus({ preventScroll: true });
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [pathname, hash, offset, navType]); // Added navType to dependencies
}
