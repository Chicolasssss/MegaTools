import { useState, useMemo } from 'react';
import { FileText, Type, Clock, AlignLeft, Hash } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter((p) => p.trim() !== '').length : 0;
    
    // Promedio de lectura: ~250 palabras por minuto
    const readingTimeMinutes = Math.ceil(words / 250);

    return { chars, charsNoSpaces, words, paragraphs, readingTimeMinutes };
  }, [text]);

  const StatCard = ({ icon: Icon, label, value, colorClass }: any) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
      <div className={`p-3 rounded-full mb-3 ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
      </div>
      <span className="text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</span>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      
      {/* Panel de Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={Type} label="Palabras" value={stats.words} colorClass="bg-blue-500 text-blue-500" />
        <StatCard icon={Hash} label="Caracteres" value={stats.chars} colorClass="bg-purple-500 text-purple-500" />
        <StatCard icon={FileText} label="Sin Espacios" value={stats.charsNoSpaces} colorClass="bg-pink-500 text-pink-500" />
        <StatCard icon={AlignLeft} label="Párrafos" value={stats.paragraphs} colorClass="bg-amber-500 text-amber-500" />
        <StatCard icon={Clock} label="Lectura (Min)" value={stats.readingTimeMinutes} colorClass="bg-emerald-500 text-emerald-500" />
      </div>

      {/* Área de Texto */}
      <div className="relative mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe o pega tu texto aquí para analizarlo al instante..."
          className="w-full h-80 p-6 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-0 focus:border-blue-500 outline-none resize-y text-lg leading-relaxed text-slate-700 dark:text-slate-300 transition-colors shadow-inner"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setText('')}
          className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
        >
          Limpiar todo
        </button>
      </div>
    </div>
  );
}
