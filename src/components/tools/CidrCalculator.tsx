import React, { useState } from 'react';

export default function CidrCalculator() {
  const [ip, setIp] = useState('192.168.1.0');
  const [cidr, setCidr] = useState('24');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    try {
      const parts = ip.split('.');
      if (parts.length !== 4) throw new Error('Invalid IPv4 address');
      const ipNum = parts.reduce((acc, octet) => {
        const val = parseInt(octet, 10);
        if (isNaN(val) || val < 0 || val > 255) throw new Error('Invalid octet');
        return (acc << 8) + val;
      }, 0) >>> 0;

      const maskBits = parseInt(cidr, 10);
      if (isNaN(maskBits) || maskBits < 0 || maskBits > 32) throw new Error('Invalid CIDR (must be 0-32)');

      const mask = maskBits === 0 ? 0 : (~0 << (32 - maskBits)) >>> 0;
      const network = (ipNum & mask) >>> 0;
      const broadcast = (network | ~mask) >>> 0;
      
      const numHosts = maskBits >= 31 ? 0 : Math.pow(2, 32 - maskBits) - 2;
      const totalAddrs = Math.pow(2, 32 - maskBits);

      const num2ip = (num: number) => [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');

      setResult({
        network: num2ip(network),
        broadcast: num2ip(broadcast),
        mask: num2ip(mask),
        wildcard: num2ip((~mask) >>> 0),
        firstHost: maskBits >= 31 ? 'N/A' : num2ip(network + 1),
        lastHost: maskBits >= 31 ? 'N/A' : num2ip(broadcast - 1),
        totalAddresses: totalAddrs.toLocaleString(),
        usableHosts: numHosts.toLocaleString(),
      });
      setError('');
    } catch (e: any) {
      setError(e.message);
      setResult(null);
    }
  };

  React.useEffect(() => {
    calculate();
  }, [ip, cidr]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CIDR (/mask)</label>
          <input
            type="number"
            min="0"
            max="32"
            value={cidr}
            onChange={(e) => setCidr(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          />
        </div>
      </div>

      {error && <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      {result && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Network Address</span>
              <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">{result.network}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Broadcast Address</span>
              <span className="font-mono text-lg font-bold text-gray-900 dark:text-white">{result.broadcast}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Subnet Mask</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{result.mask}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Wildcard Mask</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{result.wildcard}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">First Usable Host</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{result.firstHost}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Last Usable Host</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{result.lastHost}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Addresses</span>
              <span className="font-mono text-gray-800 dark:text-gray-200">{result.totalAddresses}</span>
            </div>
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Usable Hosts</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{result.usableHosts}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
