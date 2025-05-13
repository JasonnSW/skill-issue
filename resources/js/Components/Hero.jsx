import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import background from "../../assets/background.svg";
import network from "../../assets/network.svg";
import { CardData } from "@/Data/CardData";
import { useHeadingAnimation } from "@/Hooks/useHeadingAnimation";

export default function Hero() {
    const headingRef = useRef();
    useHeadingAnimation(headingRef);

    return (
        <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white">
            <img
                src={background}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="relative z-10 flex flex-col justify-center min-h-screen">
                <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-x-4 h-screen">
                    <div className="md:max-w-lg space-y-6 p-4 md:p-0">
                        <h1
                            ref={headingRef}
                            className="text-xl md:text-2xl lg:text-6xl font-general uppercase text-white"
                        >
                            I<b>n</b>formatio<b>n</b>
                        </h1>
                        <p className="md:text-base lg:text-xl text-justify leading-relaxed text-white">
                            Kredibilitas informasi adalah informasi yang bisa
                            dipercaya oleh setiap pengguna informasi. Jika
                            terdapat kesalahan pada informasi tersebut dapat
                            dipertanggung jawabkan secara hukum.
                        </p>
                        <button className="bg-[#E3872A] text-white font-semibold px-6 py-3 rounded-xl uppercase hover:bg-[#cf731c] transition">
                            Our Services
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src={network}
                            alt="Network Illustration"
                            className="w-full max-w-lg h-full"
                        />
                    </div>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 px-6 md:px-0 max-w-screen-lg mx-auto md:-translate-y-16">
                    {CardData.map((item, index) => (
                        <Card key={index} icon={item.icon} text={item.text} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Card({ icon: Icon, text }) {
    return (
        <div className="bg-[#E3872A] text-white rounded-lg p-4 flex items-center gap-4">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Icon className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-semibold">{text}</p>
        </div>
    );
}
