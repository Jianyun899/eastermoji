"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function TattooGenerator() {
  const [prompt, setPrompt] = useState('Easter bunny');
  const [style, setStyle] = useState('Minimalist Line Art');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (e) {
      alert('Generation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <nav className="flex justify-between items-center mb-12">
        <h1 className="font-pacifico text-3xl text-pink-500">EasterHub</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-gray-600 hover:text-pink-500">Emoji</Link>
          <Link href="/tattoo-generator" className="text-pink-600 font-bold underline">Tattoo Generator</Link>
        </div>
      </nav>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100">
        <h2 className="text-3xl font-pacifico text-gray-800 mb-6">AI Tattoo Generator</h2>
        
        <div className="space-y-4 mb-6">
          <input 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200"
            placeholder="Describe your tattoo..."
          />
          <select 
            value={style} 
            onChange={(e) => setStyle(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200"
          >
            <option>Minimalist Line Art</option>
            <option>Watercolor</option>
            <option>Traditional Tattoo</option>
          </select>
          <button 
            onClick={generate}
            disabled={loading}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 rounded-xl transition"
          >
            {loading ? '✨ Creating your design...' : 'Generate'}
          </button>
        </div>

        {imageUrl && (
          <div className="mt-8">
            <img src={imageUrl} alt="Result" className="w-full rounded-2xl shadow-md" />
            <a href={imageUrl} download className="block text-center mt-4 text-pink-500 underline">Download PNG</a>
          </div>
        )}
      </div>
    </main>
  );
}
