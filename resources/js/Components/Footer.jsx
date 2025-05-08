import React from "react";
import logo from "../../assets/Group.svg";
import background from "../../assets/background.svg";
import { FaInstagram, FaLine } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="relative w-full bg-black text-white pt-16 pb-6 overflow-hidden">
            <img
                src={background}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
            />

            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="flex flex-col items-center gap-5">
                    <img
                        src={logo}
                        alt="Logo"
                        className="absolute left-[10%] top-1/2 -translate-y-1/2 w-32 invisible md:visible"
                    />

                    <p className="text-[#E3872A] text-sm md:text-2xl font-medium">
                        Design and Development by Skill Issue
                    </p>

                    <div className="text-center">
                        <p className="text-[#848484] text-base mb-2">
                            Our Social Media
                        </p>

                        <div className="flex flex-col md:items-center md:justify-center gap-3 text-white text-lg">
                            <div className="flex-center gap-x-2">
                                <div className="flex items-center gap-x-2">
                                    <FaInstagram title="credition" />
                                    <h1>credition_</h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <FaInstagram title="skill_issue" />
                                    <h1>skill_issue</h1>
                                </div>
                            </div>
                            <div className="flex-center gap-x-2">
                                <div className="flex items-center gap-x-2">
                                    <FaLine title="than" />
                                    <h1>than</h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <FaLine title="sonjeaon" />
                                    <h1 className="text-xs sm:text-base font-normal">
                                        sonjeaon
                                    </h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <FaLine title="sejose" />
                                    <h1>sejose</h1>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <FaLine title="vitco" />
                                    <h1 className="text-xs sm:text-base font-normal">
                                        vitco
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 text-center text-sm text-gray-500">
                            Copyright © CrediTion 2022 | All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
