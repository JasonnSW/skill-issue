import React from "react";
import { useForm } from "@inertiajs/react";

export default function LaporHoaxForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        tema: "",
        tautan: "",
        bukti_konten: null,
        alasan: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/hoax", {
            forceFormData: true,
            onSuccess: () => {
                alert("Laporan hoax berhasil dikirim!");
                reset();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-white">Lapor Hoax</h2>

            <div className="space-y-1">
                <label className="text-sm text-gray-300">Tema Konten</label>
                <input
                    type="text"
                    value={data.tema}
                    onChange={(e) => setData("tema", e.target.value)}
                    placeholder="Masukkan tema konten"
                    className="w-full rounded-md bg-[#2C2C2C] text-white px-4 py-2 border border-white"
                />
                {errors.tema && (
                    <p className="text-red-500 text-sm">{errors.tema}</p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm text-gray-300">Tautan Website</label>
                <input
                    type="text"
                    value={data.tautan}
                    onChange={(e) => setData("tautan", e.target.value)}
                    placeholder="Masukkan tautan website"
                    className="w-full rounded-md bg-[#2C2C2C] text-white px-4 py-2 border border-white"
                />
                {errors.tautan && (
                    <p className="text-red-500 text-sm">{errors.tautan}</p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm text-gray-300">
                    Bukti Konten (Gambar)
                </label>
                <input
                    type="file"
                    onChange={(e) => setData("bukti_konten", e.target.files[0])}
                    className="w-full rounded-md bg-[#2C2C2C] text-white px-4 py-2 border border-white"
                />
                {errors.bukti_konten && (
                    <p className="text-red-500 text-sm">
                        {errors.bukti_konten}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm text-gray-300">
                    Bukti atau Alasan
                </label>
                <textarea
                    value={data.alasan}
                    onChange={(e) => setData("alasan", e.target.value)}
                    placeholder="Masukkan bukti atau alasan"
                    className="w-full h-32 resize-none rounded-md bg-[#2C2C2C] text-white px-4 py-2 border border-white"
                />
                {errors.alasan && (
                    <p className="text-red-500 text-sm">{errors.alasan}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
            >
                {processing ? "Mengirim..." : "Kirim"}
            </button>
        </form>
    );
}
