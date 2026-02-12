
import React, { useState, useEffect } from 'react';
import { getStoredInfo, saveInfo } from '../constants';
import { InfoItem } from '../types';

interface Props {
  onComplete: () => void;
}

const AdminDeletePage: React.FC<Props> = ({ onComplete }) => {
  const [items, setItems] = useState<InfoItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setItems(getStoredInfo());
  }, []);

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleDelete = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Delete ${selectedIds.size} item(s)?`)) {
      const remaining = items.filter(item => !selectedIds.has(item.id));
      saveInfo(remaining);
      onComplete();
    }
  };

  return (
    <div className="space-y-12">
      <h2 className="text-xl font-serif gold-text tracking-[0.3em] uppercase border-b border-[#D4AF37]/20 pb-4">Delete Information</h2>
      
      <div className="space-y-2">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            className={`p-4 border cursor-pointer transition-all duration-300 flex justify-between items-center ${selectedIds.has(item.id) ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 hover:bg-white/5'}`}
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-600">{item.date}</span>
              <span className="text-[9px] border border-[#D4AF37]/30 gold-text px-2 py-0.5">{item.category}</span>
              <span className="text-sm text-gray-400">{item.title}</span>
            </div>
            <div className={`w-5 h-5 border flex items-center justify-center ${selectedIds.has(item.id) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-600'}`}>
              {selectedIds.has(item.id) && <span className="text-black text-xs font-bold">✓</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-10 border-t border-[#D4AF37]/10">
        <button 
          onClick={handleDelete}
          className="flex-1 py-4 bg-red-800 text-white font-bold tracking-[0.4em] text-[10px] hover:bg-red-600 transition-all duration-300 disabled:opacity-30"
          disabled={selectedIds.size === 0}
        >
          DELETE ({selectedIds.size})
        </button>
        <button 
          onClick={onComplete}
          className="flex-1 py-4 border border-white text-white font-bold tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all duration-300"
        >
          BACK
        </button>
      </div>
    </div>
  );
};

export default AdminDeletePage;
