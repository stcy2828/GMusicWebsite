
import React, { useState, useEffect } from 'react';
import { getStoredInfo, saveInfo } from '../constants';
import { InfoItem } from '../types';

interface Props {
  onComplete: () => void;
}

const AdminCodePage: React.FC<Props> = ({ onComplete }) => {
  const [jsonCode, setJsonCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const items = getStoredInfo();
    setJsonCode(JSON.stringify(items, null, 2));
  }, []);

  const handleSave = () => {
    try {
      const parsed = JSON.parse(jsonCode);
      if (!Array.isArray(parsed)) {
        throw new Error('Data must be an array of objects.');
      }
      
      // Basic validation for InfoItem structure
      parsed.forEach((item: any, index: number) => {
        if (!item.id || !item.date || !item.title || !item.category) {
          throw new Error(`Item at index ${index} is missing required fields (id, date, title, category).`);
        }
      });

      saveInfo(parsed);
      setError(null);
      alert('Code updated successfully.');
      onComplete();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end border-b border-[#D4AF37]/20 pb-4">
        <h2 className="text-xl font-serif gold-text tracking-[0.3em] uppercase">RAW DATA CODE</h2>
        <span className="text-[9px] text-gray-500 tracking-widest uppercase">JSON Editor</span>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-500 text-[10px] tracking-widest uppercase leading-relaxed">
          Manage all Information items directly in JSON format. Use this to bulk-edit or backup your data.
        </p>
        
        <div className="relative">
          <textarea
            value={jsonCode}
            onChange={(e) => {
              setJsonCode(e.target.value);
              if (error) setError(null);
            }}
            spellCheck={false}
            className="w-full h-[500px] bg-black border border-[#D4AF37]/20 p-8 text-xs font-mono gold-text focus:outline-none focus:border-[#D4AF37] transition-all duration-300 resize-none leading-relaxed"
          />
          <div className="absolute top-4 right-4 text-[10px] text-gray-700 pointer-events-none">
            {jsonCode.length} chars
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 p-4">
            <p className="text-red-400 text-[10px] tracking-widest uppercase font-bold mb-1">Invalid JSON Format</p>
            <p className="text-red-300/70 text-[10px] font-mono">{error}</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          onClick={onComplete}
          className="flex-1 py-4 border border-white text-white font-bold tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all duration-300"
        >
          BACK
        </button>
        <button 
          onClick={handleSave}
          className="flex-1 py-4 bg-[#D4AF37] text-black font-bold tracking-[0.4em] text-[10px] hover:bg-white transition-all duration-300"
        >
          APPLY CODE
        </button>
      </div>
      
      <div className="pt-6">
        <p className="text-gray-600 text-[9px] tracking-widest leading-loose uppercase italic text-center">
          * Warning: Modifying the structure may cause application errors. Ensure the JSON follows the correct schema.
        </p>
      </div>
    </div>
  );
};

export default AdminCodePage;
