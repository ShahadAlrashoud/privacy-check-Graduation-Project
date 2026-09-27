"use client";
import { FormEvent, useState } from "react"; import { useRouter } from "next/navigation";
export default function Home() { const router = useRouter();
const [url, setUrl] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
const validateUrl = (value: string) => { try { const parsedUrl = new URL(value);
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return false;
  }

  return true;
} catch {
  return false;
}
};
const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault();
setError("");

const trimmedUrl = url.trim();

if (!trimmedUrl) {
  setError("Please enter a website URL.");
  return;
}

if (!validateUrl(trimmedUrl)) {
  setError("Please enter a valid URL, for example: https://example.com");
  return;
}

setLoading(true);

router.push(`/results?url=${encodeURIComponent(trimmedUrl)}`);
};
return ( <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6"> <div className="w-full max-w-2xl text-center"> <div className="mb-8"> <h1 className="text-4xl font-bold text-gray-900 mb-4"> Privacy Check </h1>
      <p className="text-lg text-gray-600">
        Analyze Terms of Service and Privacy Policies and understand
        important clauses and potential risks.
      </p>
    </div>

    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md"
    >
      <label
        htmlFor="website-url"
        className="block text-left text-sm font-medium text-gray-700 mb-2"
      >
        Website URL
      </label>

      <input
        id="website-url"
        type="text"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com"
        disabled={loading}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
      />

      {error && (
        <p className="text-left text-sm text-red-600 mt-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-5 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Preparing analysis..." : "Analyze Website"}
      </button>
    </form>

    <p className="text-sm text-gray-500 mt-6">
      Enter a website URL to start the analysis.
    </p>
  </div>
</main>
); }