import { useEffect } from "react";
import gsap from "gsap";

export function useHeadingAnimation(ref) {
  useEffect(() => {
    if (!ref.current) return;
    
    const heading = ref.current;
    const text = heading.textContent;
    heading.innerHTML = "";

    const chars = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = 0;
      span.style.transform = "translateY(20px)";
      heading.appendChild(span);
      return span;
    });

    gsap.to(chars, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [ref]);
}
