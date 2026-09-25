import { useState, useEffect } from 'react';
import { Copy, RefreshCw, Check, List } from 'lucide-react';

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const generateMultiple = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  useEffect(() => {
    generateMultiple();
  }, [count]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <label className="font-bold text-gray-700 dark:text-gray-300">Generate multiple:</label>
        <input 
          type="range" 
          min="1" max="50" 
          value={count} 
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="flex-grow accent-blue-600"
        />
        <span className="font-mono bg-white dark:bg-gray-900 px-3 py-1 rounded border border-gray-200 dark:border-gray-700">{count}</span>
        <button 
          onClick={generateMultiple}
          className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          <RefreshCw size={18} /> Regenerate
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {uuids.map((uuid, idx) => (
          <div key={uuid} className="flex justify-between items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm hover:border-blue-500 transition">
            <span className="font-mono text-lg text-gray-800 dark:text-gray-200 break-all">{uuid}</span>
            <button 
              onClick={() => copyToClipboard(uuid, idx)}
              className={`p-2 rounded-lg transition ${copiedIndex === idx ? 'bg-green-100 text-green-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30'}`}
            >
              {copiedIndex === idx ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
