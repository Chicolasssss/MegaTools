import React, { useState } from 'react';
import { Copy } from 'lucide-react';

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const generateSlug = (text: string) => {
    setInput(text);
    const slug = text
      .toString()
      .normalize('NFD')                   // split an accented letter in the base letter and the acent
      .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, '')        // remove all chars not letters, numbers and spaces
      .replace(/\s+/g, '-');             // replace spaces with dashes
    
    setOutput(slug);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Post Title or Text</label>
        <textarea
          value={input}
          onChange={(e) => generateSlug(e.target.value)}
          className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-sans text-sm"
          rows={3}
          placeholder="Enter your blog post title or text here..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Slug</label>
        <div className="relative">
          <input
            type="text"
            readOnly
            value={output}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
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
