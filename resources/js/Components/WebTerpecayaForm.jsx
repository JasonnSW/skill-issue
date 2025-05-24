import React, { useState } from "react";

export default function CekWebsite() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState('');

  const validateUrl = (url) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  const checkWebsiteSafety = async () => {
    if (!websiteUrl.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Format the URL properly
      const formattedUrl = validateUrl(websiteUrl.trim());
      
      const response = await fetch('/api/check-website-safety', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        credentials: 'same-origin',
        body: JSON.stringify({ url: formattedUrl })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to check website safety');
      }

      const data = await response.json();
      setResult(data.isSafe);
      setDetails(data.details || '');
      console.log('API Response:', JSON.stringify(data, null, 2));

    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold text-white">
        Cek Website
      </h2>
      <div className="space-y-4">
        <label className="text-sm text-gray-300">
          Masukkan URL website
        </label>
        <input
          type="text"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full rounded-md bg-[#2C2C2C] text-white px-4 py-2 border border-white"
        />
      </div>

      <button 
        onClick={checkWebsiteSafety} 
        disabled={loading || !websiteUrl.trim()} 
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md"
      >
        {loading ? 'Sedang berpikir... 🤔' : 'Kirim'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result !== null && !error && (
        <div className={`mt-4 p-4 rounded-md text-center ${result ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <p className="font-bold text-lg">{result ? 'SAFE' : 'UNSAFE'}</p>
          <p className="text-sm">According to Google Safe Browsing</p>
          {details && <p className="mt-2 text-sm text-center">{details}</p>}
        </div>
      )}
    </>
  );
}