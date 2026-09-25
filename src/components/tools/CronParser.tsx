import React, { useState, useEffect } from 'react';
import cronstrue from 'cronstrue';
import { Clock, Info } from 'lucide-react';

export default function CronParser() {
  const [cronExp, setCronExp] = useState('0 9 * * 1');
  const [humanReadable, setHumanReadable] = useState('');
  const [error, setError] = useState('');

  const parseCron = (val: string) => {
    setCronExp(val);
    try {
      if (!val.trim()) {
        setHumanReadable('');
        setError('');
        return;
      }
      const desc = cronstrue.toString(val, { throwExceptionOnParseError: true });
      setHumanReadable(desc);
      setError('');
    } catch (e: any) {
      setHumanReadable('');
      setError(e.toString());
    }
  };

  useEffect(() => {
    parseCron(cronExp);
  }, []);

  return (
    <div className="space-y-6">
      
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 text-center shadow-sm">
        <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Cron Expression</label>
        <input
          type="text"
          value={cronExp}
          onChange={(e) => parseCron(e.target.value)}
          className="w-full max-w-lg mx-auto text-center p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 font-mono text-2xl tracking-widest text-gray-900 dark:text-white"
          placeholder="* * * * *"
        />
        
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Human Readable</label>
          {error ? (
            <div className="inline-flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg font-medium">
               Invalid Cron Expression
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-xl font-medium border border-blue-100 dark:border-blue-800">
               <Clock size={24} /> {humanReadable}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-4">
          <Info size={18} /> Cron Syntax Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 font-mono text-sm text-center">
          <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <strong className="block text-gray-900 dark:text-white mb-1">Minute</strong>
            <span className="text-gray-500">0-59</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <strong className="block text-gray-900 dark:text-white mb-1">Hour</strong>
            <span className="text-gray-500">0-23</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <strong className="block text-gray-900 dark:text-white mb-1">Day (Month)</strong>
            <span className="text-gray-500">1-31</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <strong className="block text-gray-900 dark:text-white mb-1">Month</strong>
            <span className="text-gray-500">1-12</span>
          </div>
          <div className="p-3 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <strong className="block text-gray-900 dark:text-white mb-1">Day (Week)</strong>
            <span className="text-gray-500">0-6 (Sun-Sat)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
