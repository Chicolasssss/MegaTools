import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Link, Type, Phone, Mail } from 'lucide-react';

export default function QRGenerator() {
  const [value, setValue] = useState('https://megatools-hub.vercel.app');
  const [qrType, setQrType] = useState('url'); // url, text, email, phone
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = () => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mx-auto">
      {/* Controls */}
      <div className="flex-1 space-y-6">
        <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
          <button onClick={() => {setQrType('url'); setValue('https://')}} className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 ${qrType === 'url' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}>
            <Link size={16}/> URL
          </button>
          <button onClick={() => {setQrType('text'); setValue('')}} className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 ${qrType === 'text' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}>
            <Type size={16}/> Text
          </button>
          <button onClick={() => {setQrType('email'); setValue('mailto:')}} className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 ${qrType === 'email' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}>
            <Mail size={16}/> Email
          </button>
          <button onClick={() => {setQrType('phone'); setValue('tel:')}} className={`px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 ${qrType === 'phone' ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}>
            <Phone size={16}/> Phone
          </button>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Content to encode</label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[120px]"
            placeholder="Enter your content here..."
          />
        </div>
      </div>

      {/* QR Output */}
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <QRCodeSVG 
            value={value || 'https://megatools-hub.vercel.app'} 
            size={200} 
            level="H"
            includeMargin={true}
            ref={svgRef}
          />
        </div>
        <button
          onClick={handleDownload}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex justify-center items-center gap-2 transition"
        >
          <Download size={20} /> Download PNG
        </button>
      </div>
    </div>
  );
}
