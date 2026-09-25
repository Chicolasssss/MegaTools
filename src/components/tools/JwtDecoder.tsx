import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const decodeJWT = (input: string) => {
    setToken(input);
    if (!input.trim()) {
      setHeader('');
      setPayload('');
      setSignature('');
      setError('');
      return;
    }

    try {
      const parts = input.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected 3 parts separated by dots.');
      }

      // Base64Url decode function
      const b64DecodeUnicode = (str: string) => {
        // Convert Base64Url to Base64
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        // Decode base64 to percent-encoded string, then to decodeURIComponent for Unicode
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const parsedHeader = JSON.parse(b64DecodeUnicode(parts[0]));
      const parsedPayload = JSON.parse(b64DecodeUnicode(parts[1]));

      setHeader(JSON.stringify(parsedHeader, null, 2));
      setPayload(JSON.stringify(parsedPayload, null, 2));
      setSignature(parts[2]);
      setError('');
    } catch (e: any) {
      setError(e.message || 'Error decoding token.');
      setHeader('');
      setPayload('');
      setSignature('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-lg flex items-start gap-3 border border-blue-200 dark:border-blue-800">
        <ShieldCheck size={20} className="mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <strong>100% Secure.</strong> This JWT is parsed entirely within your browser. 
          No tokens or signatures are ever sent to our servers.
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Encoded JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => decodeJWT(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y leading-relaxed break-all"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">
          <AlertTriangle size={16} /> {error}
        </div>
      )}

      {(header || payload) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-red-600 dark:text-red-400 mb-2 font-mono">HEADER: ALGORITHM & TOKEN TYPE</label>
            <textarea
              readOnly
              value={header}
              className="w-full h-40 p-4 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-900/10 font-mono text-sm text-red-800 dark:text-red-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-600 dark:text-purple-400 mb-2 font-mono">PAYLOAD: DATA</label>
            <textarea
              readOnly
              value={payload}
              className="w-full h-40 p-4 border border-purple-200 dark:border-purple-900/50 rounded-lg bg-purple-50 dark:bg-purple-900/10 font-mono text-sm text-purple-800 dark:text-purple-200"
            />
          </div>
        </div>
      )}

      {signature && (
        <div>
          <label className="block text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-2 font-mono">VERIFY SIGNATURE</label>
          <div className="w-full p-4 border border-cyan-200 dark:border-cyan-900/50 rounded-lg bg-cyan-50 dark:bg-cyan-900/10 font-mono text-sm text-cyan-800 dark:text-cyan-200 break-all">
            {signature}
          </div>
          <p className="text-xs text-gray-500 mt-2">* Note: We only decode the payload. We do not cryptographically verify the signature, as that requires the secret key.</p>
        </div>
      )}
    </div>
  );
}
