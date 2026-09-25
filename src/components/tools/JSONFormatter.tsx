import { useState } from 'react';
import { Copy, Check, FileCode2, Play } from 'lucide-react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
            Input JSON
            <button onClick={() => setInput('')} className="text-xs text-red-500 hover:underline">Clear</button>
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"hello": "world"}'
            className="w-full h-96 p-4 font-mono text-sm border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <label className="font-bold text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
            Formatted Output
            <button onClick={copyToClipboard} className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Copied' : 'Copy'}
            </button>
          </label>
          <div className={`w-full h-96 p-4 font-mono text-sm border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-xl bg-gray-50 dark:bg-gray-950 overflow-auto`}>
            {error ? (
              <div className="text-red-500 break-all">{error}</div>
            ) : (
              <pre className="text-gray-800 dark:text-gray-200">{output}</pre>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={formatJSON}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition"
        >
          <FileCode2 size={20} /> Format & Validate JSON
        </button>
      </div>
    </div>
  );
}
