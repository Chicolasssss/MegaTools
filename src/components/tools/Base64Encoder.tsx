import { useState, useEffect } from 'react';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }
    
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError('');
    } catch (e) {
      setError('Invalid input for decoding');
      setOutput('');
    }
  }, [input, mode]);

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-center mb-2">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex gap-1">
          <button 
            onClick={() => {setMode('encode'); setInput('');}}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition ${mode === 'encode' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
          >
            Encode
          </button>
          <button 
            onClick={() => {setMode('decode'); setInput('');}}
            className={`px-6 py-2 rounded-md font-semibold text-sm transition ${mode === 'decode' ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}
          >
            Decode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-bold text-gray-700 dark:text-gray-300 mb-2">Input {mode === 'encode' ? 'Text' : 'Base64'}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            placeholder={mode === 'encode' ? 'Type text to encode...' : 'Paste Base64 to decode...'}
          />
        </div>
        
        <div className="flex flex-col">
          <label className="font-bold text-gray-700 dark:text-gray-300 mb-2 flex justify-between items-center">
            Output {mode === 'encode' ? 'Base64' : 'Text'}
            <button onClick={copyToClipboard} disabled={!output} className="text-blue-500 hover:underline text-sm font-semibold flex items-center gap-1 disabled:text-gray-400">
              {copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Copied' : 'Copy'}
            </button>
          </label>
          <div className={`w-full h-64 p-4 border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-xl bg-gray-50 dark:bg-gray-950 overflow-auto break-all`}>
            {error ? <span className="text-red-500">{error}</span> : <span className="text-gray-800 dark:text-gray-200">{output}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
