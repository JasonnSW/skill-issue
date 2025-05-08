import React from "react";

export default function CekInformasi() {
    return (
        <>
            <h2 className="text-xl font-bold text-white">
                {" "}
                Cek informasi terpercaya
            </h2>
            <div className="space-y-4">
                <label className="text-sm text-gray-300">
                    {" "}
                    Cek informasi terpercaya
                </label>
                <input
                    type="text"
                    placeholder="Masukkan nama website"
                    className="w-full rounded-md bg-[#2C2C2C] text-white px-4 py-2 border border-white"
                />
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
                Cari
            </button>
        </>
    );
}
