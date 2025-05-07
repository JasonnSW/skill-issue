import React, { useState } from "react";
import logo from "../../assets/Group.svg";
import { useNavScroll } from "../Hooks/useNavScroll";

const navItems = ["Knowledge", "Services", "About us", "Contact us"];

const NavBar = () => {
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const navContainerRef = useNavScroll();

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-around p-2">
                    <div className="flex items-center gap-7">
                        <img src={logo} alt="logo" className="w-10" />
                        <h1 className="invisible sm:visible font-bold text-2xl text-white">
                            CrediTion
                        </h1>
                    </div>

                    <div className="flex h-full items-center">
                        <div className="hidden md:block">
                            {navItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setIsIndicatorActive(true);
                                    }}
                                    className={`nav-hover-btn ${
                                        activeIndex === index &&
                                        isIndicatorActive
                                            ? "text-[#E3872A] font-semibold"
                                            : "text-white"
                                    }`}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NavBar;
