import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useScrollFadeIn({
    selector,
    direction = "y",
    distance = 50,
    duration = 1,
}) {
    useEffect(() => {
        const elements = gsap.utils.toArray(selector);
        elements.forEach((el) => {
            const config = {
                opacity: 0,
                duration,
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "top 30%",
                    scrub: true,
                },
            };
            if (direction === "y") {
                config.y = distance;
            } else if (direction === "x") {
                config.x = distance;
            }
            gsap.from(el, config);
        });
    }, [selector, direction, distance, duration]);
}
