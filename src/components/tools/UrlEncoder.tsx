import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function UrlEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleProcess = (text: string, currentMode: 'encode' | 'decode') => {
    setInput(text);
    try {
      if (currentMode === 'encode') {
        setOutput(encodeURIComponent(text));
      } else {
        setOutput(decodeURIComponent(text));
      }
    } catch (e) {
      setOutput('Invalid input for decoding.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => { setMode('encode'); handleProcess(input, 'encode'); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Encode URL
        </button>
        <button
          onClick={() => { setMode('decode'); handleProcess(input, 'decode'); }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Decode URL
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input String</label>
        <textarea
          value={input}
          onChange={(e) => handleProcess(e.target.value, mode)}
          className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows={4}
          placeholder={mode === 'encode' ? 'Enter text to URL encode...' : 'Enter URL encoded text to decode...'}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Result</label>
        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            rows={4}
          />
          {output && (
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
