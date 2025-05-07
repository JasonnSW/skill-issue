import React from "react";
import background from "../../assets/background.svg"

export default function Hero() {
    return (
        <div className="relative h-dvh w-screen overflow-x-hidden bg-black">
                <img
                    id="background"
                    className="max-w-full "
                    src={background}
                />
        </div>
    );
}
