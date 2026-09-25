import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [error, setError] = useState('');

  const updateFromTimestamp = (val: string) => {
    setTimestamp(val);
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setDatetime('');
      setError('Invalid timestamp');
      return;
    }
    
    // Auto detect ms vs seconds (heuristic: ms is usually > 10^12)
    const isMs = num > 10000000000;
    const date = new Date(isMs ? num : num * 1000);
    
    if (date.toString() === 'Invalid Date') {
      setDatetime('');
      setError('Invalid Date');
    } else {
      setDatetime(date.toISOString());
      setError('');
    }
  };

  const updateFromDatetime = (val: string) => {
    setDatetime(val);
    const date = new Date(val);
    if (date.toString() === 'Invalid Date') {
      setTimestamp('');
      setError('Invalid Date format. Use ISO 8601 (e.g. 2026-01-01T00:00:00Z)');
    } else {
      setTimestamp(Math.floor(date.getTime() / 1000).toString());
      setError('');
    }
  };

  const setNow = () => {
    const now = new Date();
    setTimestamp(Math.floor(now.getTime() / 1000).toString());
    setDatetime(now.toISOString());
    setError('');
  };

  useEffect(() => {
    setNow();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button 
          onClick={setNow}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors"
        >
          <RefreshCw size={14} /> Current Time
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp (Seconds)</label>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => updateFromTimestamp(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="e.g. 1704067200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ISO 8601 Date Time (UTC)</label>
          <input
            type="text"
            value={datetime}
            onChange={(e) => updateFromDatetime(e.target.value)}
            className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="YYYY-MM-DDThh:mm:ssZ"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
