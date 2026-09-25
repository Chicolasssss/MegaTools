import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('Contact us at support@example.com or sales@test.com!');
  const [error, setError] = useState('');
  const [matches, setMatches] = useState<{ match: string, index: number }[]>([]);
  const [highlightedHtml, setHighlightedHtml] = useState('');

  const evaluateRegex = () => {
    if (!pattern) {
      setMatches([]);
      setError('');
      setHighlightedHtml(testString);
      return;
    }

    try {
      // Ensure 'g' flag is present for multiple matches if we want to highlight all
      let safeFlags = flags;
      if (!safeFlags.includes('g')) {
        safeFlags += 'g';
      }

      const regex = new RegExp(pattern, safeFlags);
      const foundMatches: { match: string, index: number }[] = [];
      let match;
      
      // Reset lastIndex just in case
      regex.lastIndex = 0;
      
      let html = testString;
      let offset = 0;

      while ((match = regex.exec(testString)) !== null) {
        // Prevent infinite loops with zero-width matches
        if (match.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        
        foundMatches.push({ match: match[0], index: match.index });
      }

      setMatches(foundMatches);
      setError('');

      // Create highlight HTML safely
      if (foundMatches.length > 0) {
        let result = '';
        let lastIdx = 0;
        
        foundMatches.forEach((m, i) => {
          // Add text before match
          result += escapeHtml(testString.substring(lastIdx, m.index));
          // Add highlighted match (alternate colors for adjacent matches)
          const colorClass = i % 2 === 0 ? 'bg-blue-200 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100' : 'bg-green-200 dark:bg-green-900/50 text-green-900 dark:text-green-100';
          result += `<mark class="rounded-sm px-0.5 font-medium ${colorClass}">${escapeHtml(m.match)}</mark>`;
          lastIdx = m.index + m.match.length;
        });
        // Add remaining text
        result += escapeHtml(testString.substring(lastIdx));
        setHighlightedHtml(result);
      } else {
        setHighlightedHtml(escapeHtml(testString));
      }

    } catch (e: any) {
      setError(e.message);
      setMatches([]);
      setHighlightedHtml(escapeHtml(testString));
    }
  };

  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  useEffect(() => {
    evaluateRegex();
  }, [pattern, flags, testString]);

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Regular Expression</label>
          <div className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
            <span className="px-4 text-gray-500 font-mono text-lg border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full p-3 font-mono text-sm bg-transparent border-none focus:ring-0"
              placeholder="pattern"
            />
            <span className="px-4 text-gray-500 font-mono text-lg border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">/</span>
          </div>
        </div>
        
        <div className="w-full md:w-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Flags</label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value.toLowerCase().replace(/[^gimsuy]/g, ''))}
            className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="gmi"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800/50">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
          placeholder="Enter text to test your regex against..."
        />
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Match Results</label>
          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
            {matches.length} {matches.length === 1 ? 'match' : 'matches'}
          </span>
        </div>
        
        <div 
          className="w-full min-h-[8rem] p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 font-mono text-sm whitespace-pre-wrap break-words leading-relaxed text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: highlightedHtml || '<em>No matches found or empty test string.</em>' }}
        />
      </div>

    </div>
  );
}
