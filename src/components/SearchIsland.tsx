import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  icon: string;
}

export function SearchIsland({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 5); // Max 5 results
  }, [query, tools]);

  return (
    <div className="relative w-full z-10">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-6 h-6 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a tool... (e.g., password, pdf, SEO)"
          className="w-full h-16 pl-14 pr-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
        />
      </div>

      {filteredTools.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden text-left">
          {filteredTools.map((tool) => (
            <a
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="block p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="font-bold text-gray-900 dark:text-white">{tool.name}</div>
              <div className="text-sm text-gray-500 truncate">{tool.description}</div>
            </a>
          ))}
        </div>
      )}
      
      {query && filteredTools.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-6 text-gray-500 text-center">
          No tools found for "{query}"
        </div>
      )}
    </div>
  );
}
