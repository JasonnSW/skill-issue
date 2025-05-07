import Navbar from "@/Components/Navbar";
import React from "react";
import Hero from "./Hero";

export default function Home() {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar />
            <Hero />
        </main>
    );
}
