import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState('rgb(59, 130, 246)');
  const [hsl, setHsl] = useState('hsl(217, 91%, 60%)');
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16);
      g = parseInt(h[2] + h[2], 16);
      b = parseInt(h[3] + h[3], 16);
    } else if (h.length === 7) {
      r = parseInt(h.slice(1, 3), 16);
      g = parseInt(h.slice(3, 5), 16);
      b = parseInt(h.slice(5, 7), 16);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (h: string) => {
    let r = 0, g = 0, b = 0;
    if (h.length === 4) {
      r = parseInt(h[1] + h[1], 16) / 255;
      g = parseInt(h[2] + h[2], 16) / 255;
      b = parseInt(h[3] + h[3], 16) / 255;
    } else if (h.length === 7) {
      r = parseInt(h.slice(1, 3), 16) / 255;
      g = parseInt(h.slice(3, 5), 16) / 255;
      b = parseInt(h.slice(5, 7), 16) / 255;
    }

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let hVal = 0, sVal = 0, lVal = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      sVal = lVal > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: hVal = (g - b) / d + (g < b ? 6 : 0); break;
        case g: hVal = (b - r) / d + 2; break;
        case b: hVal = (r - g) / d + 4; break;
      }
      hVal /= 6;
    }

    return `hsl(${Math.round(hVal * 360)}, ${Math.round(sVal * 100)}%, ${Math.round(lVal * 100)}%)`;
  };

  useEffect(() => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      setRgb(hexToRgb(hex));
      setHsl(hexToHsl(hex));
    }
  }, [hex]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto">
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <label className="font-bold text-gray-700 dark:text-gray-300 mb-2 block">Pick a Color</label>
          <div className="flex gap-4">
            <input 
              type="color" 
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-16 h-16 rounded cursor-pointer border-0 p-0"
            />
            <input 
              type="text" 
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="flex-grow p-4 font-mono text-lg border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {[
            { label: 'HEX', value: hex.toUpperCase(), type: 'hex' },
            { label: 'RGB', value: rgb, type: 'rgb' },
            { label: 'HSL', value: hsl, type: 'hsl' }
          ].map((fmt) => (
            <div key={fmt.type} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-sm">
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">{fmt.label}</span>
                <span className="font-mono text-lg text-gray-800 dark:text-gray-200">{fmt.value}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(fmt.value, fmt.type)}
                className={`p-3 rounded-lg transition ${copied === fmt.type ? 'bg-green-100 text-green-600' : 'bg-white dark:bg-gray-900 text-gray-500 border border-gray-200 dark:border-gray-700 hover:text-blue-600'}`}
              >
                {copied === fmt.type ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full md:w-1/3 flex items-center justify-center">
        <div 
          className="w-full aspect-square rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200"
          style={{ backgroundColor: hex }}
        ></div>
      </div>
    </div>
  );
}
