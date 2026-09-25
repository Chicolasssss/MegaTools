import React, { useState, useEffect } from 'react';

export default function ChmodCalculator() {
  const [octal, setOctal] = useState('755');
  const [perms, setPerms] = useState({
    owner: { r: true, w: true, x: true },
    group: { r: true, w: false, x: true },
    public: { r: true, w: false, x: true }
  });

  const handleCheckbox = (entity: 'owner'|'group'|'public', perm: 'r'|'w'|'x', checked: boolean) => {
    const newPerms = { ...perms, [entity]: { ...perms[entity], [perm]: checked } };
    setPerms(newPerms);
    
    // Calculate new octal
    const calcDigit = (e: typeof perms.owner) => (e.r ? 4 : 0) + (e.w ? 2 : 0) + (e.x ? 1 : 0);
    setOctal(`${calcDigit(newPerms.owner)}${calcDigit(newPerms.group)}${calcDigit(newPerms.public)}`);
  };

  const handleOctalChange = (val: string) => {
    // Only allow up to 3 digits between 0 and 7
    if (!/^[0-7]{0,3}$/.test(val)) return;
    setOctal(val);

    if (val.length === 3) {
      const getBools = (digit: string) => {
        const n = parseInt(digit, 10);
        return { r: (n & 4) > 0, w: (n & 2) > 0, x: (n & 1) > 0 };
      };
      setPerms({
        owner: getBools(val[0]),
        group: getBools(val[1]),
        public: getBools(val[2])
      });
    }
  };

  const symbolic = `-${perms.owner.r?'r':'-'}${perms.owner.w?'w':'-'}${perms.owner.x?'x':'-'}${perms.group.r?'r':'-'}${perms.group.w?'w':'-'}${perms.group.x?'x':'-'}${perms.public.r?'r':'-'}${perms.public.w?'w':'-'}${perms.public.x?'x':'-'}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-gray-50 dark:bg-gray-800/50 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Octal</label>
          <input
            type="text"
            value={octal}
            onChange={(e) => handleOctalChange(e.target.value)}
            className="w-32 text-center text-4xl font-mono font-bold bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg py-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-4xl font-light text-gray-300 dark:text-gray-600 hidden md:block">=</div>
        <div className="text-center">
          <label className="block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Symbolic</label>
          <div className="w-64 text-center text-3xl font-mono font-bold text-gray-800 dark:text-gray-200 py-4">
            {symbolic}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-3 border-b-2 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider">Permission</th>
              <th className="p-3 border-b-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-lg">Owner</th>
              <th className="p-3 border-b-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-lg">Group</th>
              <th className="p-3 border-b-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-lg">Public</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {/* Read */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-left pl-6">Read (4)</td>
              {['owner', 'group', 'public'].map(ent => (
                <td key={`${ent}-r`} className="p-4">
                  <input type="checkbox" checked={(perms as any)[ent].r} onChange={(e) => handleCheckbox(ent as any, 'r', e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                </td>
              ))}
            </tr>
            {/* Write */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-left pl-6">Write (2)</td>
              {['owner', 'group', 'public'].map(ent => (
                <td key={`${ent}-w`} className="p-4">
                  <input type="checkbox" checked={(perms as any)[ent].w} onChange={(e) => handleCheckbox(ent as any, 'w', e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                </td>
              ))}
            </tr>
            {/* Execute */}
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <td className="p-4 font-semibold text-gray-700 dark:text-gray-300 text-left pl-6">Execute (1)</td>
              {['owner', 'group', 'public'].map(ent => (
                <td key={`${ent}-x`} className="p-4">
                  <input type="checkbox" checked={(perms as any)[ent].x} onChange={(e) => handleCheckbox(ent as any, 'x', e.target.checked)} className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
