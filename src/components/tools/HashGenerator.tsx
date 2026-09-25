import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({ md5: '', sha1: '', sha256: '', sha512: '' });
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }
    
    // We use subtle crypto for SHA
    const generateHashes = async () => {
      const msgBuffer = new TextEncoder().encode(input);
      
      const hashBuffer256 = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      const sha256 = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

      const hashBuffer512 = await crypto.subtle.digest('SHA-512', msgBuffer);
      const hashArray512 = Array.from(new Uint8Array(hashBuffer512));
      const sha512 = hashArray512.map(b => b.toString(16).padStart(2, '0')).join('');
      
      const hashBuffer1 = await crypto.subtle.digest('SHA-1', msgBuffer);
      const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
      const sha1 = hashArray1.map(b => b.toString(16).padStart(2, '0')).join('');

      setHashes({ md5: 'MD5 not supported natively in Web Crypto', sha1, sha256, sha512 });
    };

    generateHashes();
  }, [input]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const HashRow = ({ label, value, type }: any) => (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <input 
          type="text" 
          readOnly 
          value={value} 
          className="flex-grow p-4 bg-transparent outline-none font-mono text-sm text-gray-800 dark:text-gray-200"
        />
        <button 
          onClick={() => copyToClipboard(value, type)}
          disabled={!value || value.includes('not supported')}
          className={`px-4 flex items-center justify-center transition border-l border-gray-200 dark:border-gray-700 ${copied === type ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
        >
          {copied === type ? <Check size={20} /> : <Copy size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      <div className="flex flex-col">
        <label className="font-bold text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none resize-y"
          placeholder="Type or paste the text you want to hash..."
        />
      </div>

      <div className="flex flex-col gap-6">
        <HashRow label="SHA-1" value={hashes.sha1} type="sha1" />
        <HashRow label="SHA-256" value={hashes.sha256} type="sha256" />
        <HashRow label="SHA-512" value={hashes.sha512} type="sha512" />
      </div>
    </div>
  );
}
