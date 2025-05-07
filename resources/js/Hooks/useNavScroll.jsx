import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

export const useNavScroll = () => {
    const navRef = useRef(null);
    const { y: currentScrollY } = useWindowScroll();
    const [isVisible, setIsVisible] = useState(true);
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsVisible(true);
            navRef.current?.classList.remove("floating-nav");
        } else if (currentScrollY > lastY) {
            setIsVisible(false);
            navRef.current?.classList.add("floating-nav");
        } else if (currentScrollY < lastY) {
            setIsVisible(true);
            navRef.current?.classList.add("floating-nav");
        }

        setLastY(currentScrollY);
    }, [currentScrollY, lastY]);

    useEffect(() => {
        gsap.to(navRef.current, {
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isVisible]);

    return navRef;
};
