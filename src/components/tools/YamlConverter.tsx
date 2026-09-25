import React, { useState } from 'react';
import * as yaml from 'js-yaml';
import { Copy, ArrowRightLeft } from 'lucide-react';

export default function YamlConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'yaml2json' | 'json2yaml'>('yaml2json');
  const [error, setError] = useState('');

  const processText = (text: string, currentMode: 'yaml2json' | 'json2yaml') => {
    setInput(text);
    if (!text.trim()) {
      setOutput('');
      setError('');
      return;
    }
    
    try {
      if (currentMode === 'yaml2json') {
        const obj = yaml.load(text);
        if (typeof obj === 'string') throw new Error('Invalid YAML object');
        setOutput(JSON.stringify(obj, null, 2));
      } else {
        const obj = JSON.parse(text);
        setOutput(yaml.dump(obj, { indent: 2 }));
      }
      setError('');
    } catch (e: any) {
      setError(e.message || 'Parsing error');
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'yaml2json' ? 'json2yaml' : 'yaml2json';
    setMode(newMode);
    setInput(output);
    processText(output, newMode);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-3">
          {mode === 'yaml2json' ? 'YAML Input' : 'JSON Input'}
        </div>
        <button 
          onClick={toggleMode}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-colors"
        >
          <ArrowRightLeft size={16} /> 
          Switch to {mode === 'yaml2json' ? 'JSON to YAML' : 'YAML to JSON'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => processText(e.target.value, mode)}
          className="w-full h-80 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
          placeholder={mode === 'yaml2json' ? 'Paste YAML here...' : 'Paste JSON here...'}
        />

        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="w-full h-80 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y text-gray-800 dark:text-gray-300"
            placeholder="Result will appear here..."
          />
          {output && !error && (
            <button
              onClick={copyOutput}
              className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-700 rounded-md shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 font-mono text-sm whitespace-pre-wrap">
          {error}
        </div>
      )}
    </div>
  );
}
