import { useState, useMemo } from 'react';
import { Search, FileText, Database, Wrench } from 'lucide-react';

interface SearchItem {
  id: string;
  name: string;
  slug?: string;
  url?: string;
  description: string;
  category: string;
  type?: 'tool' | 'guide' | 'reference';
}

export function SearchIsland({ tools }: { tools: SearchItem[] }) {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return tools.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 6); // Max 6 results
  }, [query, tools]);

  return (
    <div className="relative w-full z-10 text-left">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-6 h-6 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools, guides, or references (e.g. JSON, Subnet, DNS)..."
          className="w-full h-16 pl-14 pr-4 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
        />
      </div>

      {filteredItems.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden text-left z-50">
          {filteredItems.map((item) => {
            const link = item.url || (item.type === 'guide' ? `/guides/${item.slug}` : `/tools/${item.slug}`);
            const itemType = item.type || 'tool';
            
            return (
              <a
                key={item.id}
                href={link}
                className="flex items-start gap-4 p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
              >
                <div className="flex-shrink-0 mt-1 text-blue-600 dark:text-blue-400">
                    {itemType === 'tool' && <Wrench size={20} />}
                    {itemType === 'guide' && <FileText size={20} />}
                    {itemType === 'reference' && <Database size={20} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      {itemType}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                </div>
              </a>
            );
          })}
        </div>
      )}
      
      {query && filteredItems.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-8 text-gray-500 text-center z-50">
          No results found for "{query}". Try checking our <a href="/developers" className="text-blue-600 hover:underline">Developer Hub</a>.
        </div>
      )}
    </div>
  );
}
