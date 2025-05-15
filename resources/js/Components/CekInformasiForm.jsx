import React, { useState } from "react";

export default function CekInformasi() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [explanation, setExplanation] = useState('');


  const checkFact = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8001/api/verify-fact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        credentials: 'same-origin',
        body: JSON.stringify({ text: inputText })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to verify fact');
      }

      const data = await response.json();
      setResult(data.isTrue);
      setExplanation(
        data.message?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Tidak ada penjelasan.'
      );
      console.log('API Response:', JSON.stringify(data, null, 2));

    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h2 className="text-xl font-bold text-white">
        {" "}
        Cek Informasi Terpercaya
      </h2>
      <div className="space-y-4">
        <label className="text-sm text-gray-300">
          {" "}
          Masukkan informasi
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Contoh: 'Bumi itu bulat'"
          className="w-full rounded-md bg-[#2C2C2C] text-white px-4 py-2 border border-white"
        />
      </div>

      <button onClick={checkFact} disabled={loading || !inputText.trim()} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
        {loading ? 'Sedang berpikir... 🤔' : 'Kirim'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result !== null && !error && (
        <div className={`mt-4 p-4 rounded-md text-center ${result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="font-bold text-lg">{result ? 'TRUE' : 'FALSE'}</p>
          <p className="text-sm">According to our AI verification</p>
          {/* <p className="mt-2 text-sm text-left">{explanation}</p> */}
        </div>
      )}

    </>
  );
}
