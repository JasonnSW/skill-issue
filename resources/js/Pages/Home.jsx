import Navbar from "@/Components/Navbar";
import React from "react";
import Hero from "../Components/Hero";
import Faq from "../Components/Faq";
import Footer from "@/Components/Footer";

export default function Home() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar />
            <Hero />
            <Faq />
            <Footer />
        </main>
    );
}
