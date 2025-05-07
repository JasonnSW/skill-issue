import { useState } from "react";

export default function FactChecker() {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = "http://127.0.0.1:8001/";

    const checkFact = async () => {
        if (!inputText.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}api/verify-fact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: 'omit',
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) {
                throw new Error("Failed to verify fact");
            }

            const data = await response.json();
            setResult(data.isTrue);
        } catch (err) {
            setError(err.message);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6 border">
            <h1 className="text-2xl font-bold mb-6 text-center">
                Fact Checker
            </h1>

            <div className="mb-4">
                <label
                    htmlFor="factInput"
                    className="block text-sm font-medium mb-2"
                >
                    Enter a statement to verify:
                </label>
                <textarea
                    id="factInput"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows="4"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Example: The Earth is flat"
                />
            </div>

            <button
                onClick={checkFact}
                disabled={loading || !inputText.trim()}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
                {loading ? "Checking..." : "Verify Fact"}
            </button>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {result !== null && !error && (
                <div
                    className={`mt-4 p-4 rounded-md text-center ${
                        result
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                >
                    <p className="font-bold text-lg">
                        {result ? "TRUE" : "FALSE"}
                    </p>
                    <p className="text-sm">According to our AI verification</p>
                </div>
            )}
        </div>
    );
}
