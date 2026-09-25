import { useState, useMemo } from 'react';
import { Copy, Check, Link } from 'lucide-react';

export default function UTMBuilder() {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const generatedUrl = useMemo(() => {
    if (!url) return '';
    try {
      const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      const params = new URLSearchParams(parsedUrl.search);
      
      if (source) params.set('utm_source', source);
      if (medium) params.set('utm_medium', medium);
      if (campaign) params.set('utm_campaign', campaign);
      if (term) params.set('utm_term', term);
      if (content) params.set('utm_content', content);

      const searchString = params.toString();
      return `${parsedUrl.origin}${parsedUrl.pathname}${searchString ? '?' + searchString : ''}${parsedUrl.hash}`;
    } catch (e) {
      return 'Invalid URL';
    }
  }, [url, source, medium, campaign, term, content]);

  const copyToClipboard = () => {
    if (!generatedUrl || generatedUrl === 'Invalid URL') return;
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Base URL *</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://ejemplo.com"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Campaign Source (utm_source) *</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="google, newsletter, facebook"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Campaign Medium (utm_medium)</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc, email, social"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Campaign Name (utm_campaign)</label>
          <input
            type="text"
            value={campaign}
            onChange={(e) => setCampaign(e.target.value)}
            placeholder="rebajas_verano, lanzamiento"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Campaign Term (utm_term)</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="keyword de pago"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Campaign Content (utm_content)</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="logolink, textlink (para test A/B)"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
          <Link size={18} /> Generated URL:
        </label>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-300 dark:border-gray-600 break-all font-mono text-sm">
            {generatedUrl || 'Your URL will appear here...'}
          </div>
          <button
            onClick={copyToClipboard}
            disabled={!generatedUrl || generatedUrl === 'Invalid URL'}
            className={`px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition text-white whitespace-nowrap ${
              copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed'
            }`}
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            {copied ? 'Copied' : 'Copy URL'}
          </button>
        </div>
      </div>
    </div>
  );
}
