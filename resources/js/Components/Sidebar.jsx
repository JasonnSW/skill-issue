import React from "react";
import { FaFileAlt, FaGlobe } from "react-icons/fa";

export default function Sidebar({ activeTab, handleTabClick }) {
    return (
        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg w-full md:w-60 flex md:flex-col flex-row">
            <ul className="flex justify-between md:flex-col flex-row w-full">
                <li
                    className={`flex items-center gap-3 px-4 py-3 font-semibold cursor-pointer ${
                        activeTab === "lapor"
                            ? "bg-[#F6EAD0] text-black"
                            : "text-white hover:bg-[#2A2A2A]"
                    }`}
                    onClick={() => handleTabClick("lapor")}
                >
                    <FaFileAlt className="text-lg" />
                    <span>Lapor Hoax</span>
                </li>
                <li
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                        activeTab === "anti"
                            ? "bg-[#F6EAD0] text-black"
                            : "text-white hover:bg-[#2A2A2A]"
                    }`}
                    onClick={() => handleTabClick("anti")}
                >
                    <FaFileAlt className="text-lg" />
                    <span>Anti Hoax</span>
                </li>
                <li
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                        activeTab === "web"
                            ? "bg-[#F6EAD0] text-black"
                            : "text-white hover:bg-[#2A2A2A]"
                    }`}
                    onClick={() => handleTabClick("web")}
                >
                    <FaGlobe className="text-lg" />
                    <span>Web Terpercaya</span>
                </li>
            </ul>
        </div>
    );
}
