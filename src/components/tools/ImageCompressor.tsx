import { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon } from 'lucide-react';

export default function ImageCompressor() {
  const [image, setImage] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        compressImage(event.target?.result as string, quality);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = (dataUrl: string, q: number) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const newDataUrl = canvas.toDataURL('image/jpeg', q);
        setCompressed(newDataUrl);
        // Estimate size
        const base64Length = newDataUrl.length - 'data:image/jpeg;base64,'.length;
        const sizeInBytes = Math.ceil((base64Length * 3) / 4);
        setCompressedSize(sizeInBytes);
      }
    };
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = parseFloat(e.target.value);
    setQuality(q);
    if (image) compressImage(image, q);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition text-gray-500"
        >
          <Upload size={48} className="mb-4 text-blue-500" />
          <p className="font-bold text-lg">Click to Upload Image</p>
          <p className="text-sm">JPG, PNG, or WebP</p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <label className="font-bold text-gray-700 dark:text-gray-300">Compression Quality:</label>
            <input 
              type="range" 
              min="0.1" max="1" step="0.1"
              value={quality} 
              onChange={handleQualityChange}
              className="flex-grow accent-blue-600"
            />
            <span className="font-mono bg-white dark:bg-gray-900 px-3 py-1 rounded border border-gray-200 dark:border-gray-700">{Math.round(quality * 100)}%</span>
            
            <button 
              onClick={() => {setImage(null); setCompressed(null);}}
              className="ml-auto text-sm text-gray-500 hover:text-red-500 underline"
            >
              Upload New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-gray-700 dark:text-gray-300">Original ({formatSize(originalSize)})</span>
              <img src={image} className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700 dark:text-gray-300">Compressed ({formatSize(compressedSize)})</span>
                <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-1 rounded">-{Math.round((1 - compressedSize/originalSize)*100)}%</span>
              </div>
              <img src={compressed!} className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700" />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <a 
              href={compressed!} 
              download="compressed-image.jpg"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-2 transition"
            >
              <Download size={20} /> Download Compressed JPG
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
