import React, { useState } from 'react';
import { format } from 'sql-formatter';
import { Copy, Code2 } from 'lucide-react';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [dialect, setDialect] = useState('sql'); // Default standard SQL

  const formatSql = (text: string, currentDialect: string) => {
    setInput(text);
    if (!text.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      const formatted = format(text, {
        language: currentDialect as any,
        tabWidth: 2,
        keywordCase: 'upper',
        linesBetweenQueries: 2,
      });
      setOutput(formatted);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Error formatting SQL.');
      setOutput('');
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Code2 size={18} className="text-gray-500" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">SQL Formatter</span>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Dialect</label>
          <select 
            value={dialect} 
            onChange={(e) => {
              setDialect(e.target.value);
              formatSql(input, e.target.value);
            }}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="sql">Standard SQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mariadb">MariaDB</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <textarea
          value={input}
          onChange={(e) => formatSql(e.target.value, dialect)}
          className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y whitespace-pre"
          placeholder="SELECT * FROM users WHERE active = 1"
          spellCheck={false}
        />

        <div className="relative">
          <textarea
            readOnly
            value={output}
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y text-gray-800 dark:text-gray-300 whitespace-pre"
            placeholder="Formatted SQL will appear here..."
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
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg border border-red-200 dark:border-red-800 font-mono text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
