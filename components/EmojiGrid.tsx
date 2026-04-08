"use client";

import { useState } from 'react';

interface Emoji {
  id: number;
  emoji: string;
  name: string;
  keywords: string[];
  category: string;
}

export default function EmojiGrid({ emojis }: { emojis: Emoji[] }) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (emoji: string, id: number) => {
    navigator.clipboard.writeText(emoji);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {emojis.map((item) => (
        <button
          key={item.id}
          onClick={() => copyToClipboard(item.emoji, item.id)}
          className="relative bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-110 flex flex-col items-center gap-2"
        >
          <span className="text-4xl">{item.emoji}</span>
          <span className="text-xs text-gray-500">{item.name}</span>
          {copiedId === item.id && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] px-2 py-1 rounded-full animate-bounce">
              ✅ Copied!
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
