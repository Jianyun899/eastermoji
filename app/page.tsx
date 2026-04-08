import Link from 'next/link';
import EmojiGrid from '@/components/EmojiGrid';
import emojis from '@/data/emojis.json';

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <nav className="flex justify-between items-center mb-12">
        <h1 className="font-pacifico text-3xl text-pink-500">EasterHub</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-pink-600 font-bold underline">Emoji</Link>
          <Link href="/tattoo-generator" className="text-gray-600 hover:text-pink-500">Tattoo Generator</Link>
        </div>
      </nav>
      
      <header className="text-center mb-12">
        <h2 className="font-pacifico text-5xl text-gray-800 mb-4">Easter Emoji Copy & Paste 🐰🥚</h2>
        <p className="text-gray-600">The cutest collection for your holiday messages!</p>
      </header>

      <EmojiGrid emojis={emojis} />
    </main>
  );
}
