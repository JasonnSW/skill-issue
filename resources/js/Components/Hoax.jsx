import React, { useState } from "react";
import backgroundHoax from "../../assets/backgroundHoax.svg";

import Sidebar from "./Sidebar";
import LaporHoaxForm from "./LaporHoaxForm";
import CekInformasi from "./CekInformasiForm";
import WebTerpecaya from "./WebTerpecayaForm";

export default function Hoax() {
    const [activeTab, setActiveTab] = useState("lapor");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white">
            <img
                src={backgroundHoax}
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-10 flex flex-col md:flex-row justify-center min-h-screen mt-12">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-start justify-center gap-6 min-h-screen my-12">
                    <Sidebar
                        activeTab={activeTab}
                        handleTabClick={handleTabClick}
                    />

                    <div className="animated-border rounded-2xl p-[2px] w-full max-w-3xl">
                        <div className="bg-[#1E1E1E] rounded-2xl p-6 space-y-4">
                            {activeTab === "lapor" && <LaporHoaxForm />}
                            {activeTab === "anti" && <CekInformasi />}
                            {activeTab === "web" && <WebTerpecaya />}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
