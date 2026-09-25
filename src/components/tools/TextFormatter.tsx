import { useState } from 'react';
import { Copy, Check, Type, ArrowDownUp } from 'lucide-react';

export default function TextFormatter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = (type: 'uppercase' | 'lowercase' | 'capitalize' | 'sentence') => {
    if (!text) return;

    let newText = text;
    switch (type) {
      case 'uppercase':
        newText = text.toUpperCase();
        break;
      case 'lowercase':
        newText = text.toLowerCase();
        break;
      case 'capitalize':
        newText = text.replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case 'sentence':
        newText = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (char) => char.toUpperCase());
        break;
    }
    setText(newText);
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 md:gap-4 mb-2">
        <button
          onClick={() => handleFormat('uppercase')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition"
        >
          MAYÚSCULAS
        </button>
        <button
          onClick={() => handleFormat('lowercase')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition"
        >
          minúsculas
        </button>
        <button
          onClick={() => handleFormat('capitalize')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition"
        >
          Capitalizar Palabras
        </button>
        <button
          onClick={() => handleFormat('sentence')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition"
        >
          Formato oración.
        </button>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe o pega tu texto aquí..."
          className="w-full h-64 p-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-0 focus:border-blue-500 outline-none resize-y"
        />
        <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-mono">
          {text.length} caracteres | {text.split(/\s+/).filter(w => w.length > 0).length} palabras
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setText('')}
          className="px-4 py-2 text-slate-500 hover:text-red-500 transition"
        >
          Limpiar texto
        </button>
        <button
          onClick={copyToClipboard}
          disabled={!text}
          className={`px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition text-white ${
            copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed'
          }`}
        >
          {copied ? <Check size={20} /> : <Copy size={20} />}
          {copied ? 'Copiado' : 'Copiar Texto'}
        </button>
      </div>
    </div>
  );
}
