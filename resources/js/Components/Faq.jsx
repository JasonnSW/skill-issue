import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lines from "../../assets/lines.svg";
import ask from "../../assets/ask.svg";
import dataa from "../../assets/dataa.svg";
import search from "../../assets/search.svg";
import useScrollFadeIn from "@/Hooks/useScrollFadeIn";

gsap.registerPlugin(ScrollTrigger);

export default function Faq() {
    
    useScrollFadeIn({ selector: ".section-content", direction: "y" });
    useScrollFadeIn({ selector: ".section-img", direction: "x" });

    return (
        <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white space-y-10 pb-10">
            <img
                src={lines}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <section className="relative z-10 container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12 rounded-xl bg-[#262626] max-w-4xl min-h-max lg:translate-x-[-60px]">
                <div className="section-content">
                    <h1 className="text-[#E3872A] font-bold text-xl">
                        Knowledge #1
                    </h1>
                    <h2 className="text-2xl font-bold mb-4 pb-2 inline-block">
                        FACT or FAKE
                    </h2>
                    <p className="text-gray-300 mt-4 text-lg text-justify">
                        Hoaks adalah Informasi yang sengaja direkayasa atau
                        informasi bohong. Hoaks bisa digunakan untuk tujuan
                        lelucon, tetapi hoaks juga sering dipakai untuk tujuan
                        yang serius. Bagaimana cara kita mengetahui bahwa
                        informasi tersebut adalah fakta atau bukan? Lalu
                        bagaimana kita menyikapi berita bohong atau hoaks yang
                        semakin marak tersebar di dunia maya?
                    </p>
                </div>
                <img
                    className="section-img"
                    src={ask}
                    alt="Fact or Fake Illustration"
                />
            </section>

            <section className="relative z-10 container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12 rounded-xl bg-[#262626] max-w-4xl min-h-max lg:translate-x-[60px]">
                <img
                    className="section-img"
                    src={search}
                    alt="Fact or Fake Illustration"
                />
                <div className="section-content">
                    <h1 className="text-[#E3872A] font-bold text-xl">
                        Knowledge #2
                    </h1>
                    <h2 className="text-2xl font-bold mb-4 pb-2 inline-block">
                        Seberapa Penting Kredibilitas?
                    </h2>
                    <p className="text-gray-300 mt-4 text-lg text-justify">
                        Kredibilitas informasi adalah tingkat kepercayaan pada
                        suatu informasi. Kredibilitas sangat penting untuk
                        setiap informasi yang tersebar. Setiap informasi bisa
                        memiliki sumber yang berbeda, lalu bagaimana sumber
                        tersebut dapat dipercaya? Selanjutnya akan kami jawab
                        pada halaman tips & trick mendapatkan informasi
                        terpercaya di internet
                    </p>
                </div>
            </section>

            <section className="relative z-10 container mx-auto p-10 grid grid-cols-1 md:grid-cols-2 gap-12 rounded-xl bg-[#262626] max-w-4xl min-h-max lg:translate-x-[-60px] mb-10">
                <div className="section-content">
                    <h1 className="text-[#E3872A] font-bold text-xl">
                        Knowledge #3
                    </h1>
                    <h2 className="text-2xl font-bold mb-4 pb-2 inline-block">
                        Berita Bohong di Dunia
                    </h2>
                    <p className="text-gray-300 mt-4 text-lg text-justify">
                        Negara dengan kekhawatiran tertinggi terhadap hoaks di
                        internet adalah Brasil, diikuti oleh Inggris, Spanyol,
                        dan Amerika Serikat, dengan lebih dari 80% penduduk
                        Brasil merasa khawatir. Sementara itu, di Indonesia,
                        jenis berita bohong yang paling sering diterima mencakup
                        isu sosial-politik, diskriminasi, dan kesehatan.
                    </p>
                </div>
                <img
                    className="section-img w-full max-w-md md:max-w-lg lg:max-w-xl object-contain h-full"
                    src={dataa}
                    alt="Fact or Fake Illustration"
                />
            </section>
        </div>
    );
}
