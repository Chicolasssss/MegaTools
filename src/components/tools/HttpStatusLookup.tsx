import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface StatusCode {
  code: number;
  message: string;
  category: string;
  description: string;
}

export default function HttpStatusLookup() {
  const [query, setQuery] = useState('');
  const [codes, setCodes] = useState<StatusCode[]>([]);
  const [filtered, setFiltered] = useState<StatusCode[]>([]);

  useEffect(() => {
    // In Astro, we can fetch from our public static data or bundle it.
    // For this client component, we'll fetch the JSON file we created.
    fetch('/data/networking/http-codes.json')
      .then(res => {
         if(!res.ok) throw new Error('Not found');
         return res.json();
      })
      .then(data => {
        setCodes(data);
        setFiltered(data);
      })
      .catch(e => {
        // Fallback for static build if fetch fails during dev
        import('../../data/networking/http-codes.json').then(module => {
            setCodes(module.default);
            setFiltered(module.default);
        });
      });
  }, []);

  useEffect(() => {
    const lowerQuery = query.toLowerCase();
    setFiltered(codes.filter(c => 
      c.code.toString().includes(lowerQuery) || 
      c.message.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery)
    ));
  }, [query, codes]);

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code (e.g. 404) or message (e.g. Not Found)..."
          className="w-full pl-10 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-sans text-sm"
        />
      </div>

      <div className="space-y-4">
        {filtered.map(status => (
          <div key={status.code} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0">
              <span className={`inline-flex items-center justify-center px-4 py-2 rounded-lg font-mono font-bold text-lg
                ${status.code >= 200 && status.code < 300 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                ${status.code >= 300 && status.code < 400 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                ${status.code >= 400 && status.code < 500 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500' : ''}
                ${status.code >= 500 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
              `}>
                {status.code}
              </span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{status.message}</h4>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{status.category}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{status.description}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-500">No HTTP status codes found for "{query}".</div>
        )}
      </div>
    </div>
  );
}
