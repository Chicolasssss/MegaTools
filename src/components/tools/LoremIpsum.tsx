import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

const LOREM_WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"];

export default function LoremIpsum() {
  const [paragraphs, setParagraphs] = useState(3);
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const generateWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 8) + 5; // 5 to 12 words
    let sentence = Array.from({ length: wordCount }, generateWord).join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateParagraph = (isFirst: boolean) => {
    const sentenceCount = Math.floor(Math.random() * 5) + 4; // 4 to 8 sentences
    let p = Array.from({ length: sentenceCount }, generateSentence).join(' ');
    if (isFirst) {
      p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + p;
    }
    return p;
  };

  const generateText = () => {
    const newText = Array.from({ length: paragraphs }, (_, i) => generateParagraph(i === 0)).join('\n\n');
    setText(newText);
    setCopied(false);
  };

  useState(() => {
    generateText();
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <label className="font-bold text-gray-700 dark:text-gray-300">Paragraphs:</label>
        <input 
          type="range" 
          min="1" max="20" 
          value={paragraphs} 
          onChange={(e) => setParagraphs(parseInt(e.target.value))}
          className="flex-grow accent-blue-600"
        />
        <span className="font-mono bg-white dark:bg-gray-900 px-3 py-1 rounded border border-gray-200 dark:border-gray-700">{paragraphs}</span>
        
        <button 
          onClick={generateText}
          className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          <RefreshCw size={18} /> Generate
        </button>
      </div>

      <div className="relative">
        <textarea
          value={text}
          readOnly
          className="w-full h-96 p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none resize-y text-lg leading-relaxed text-gray-700 dark:text-gray-300"
        />
        <div className="absolute top-4 right-4">
            <button 
              onClick={copyToClipboard}
              className={`p-3 rounded-lg shadow-sm transition ${copied ? 'bg-green-500 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
        </div>
      </div>
    </div>
  );
}
