
import React, { useState, useEffect } from 'react';
import { getStoredInfo, saveInfo } from '../constants';
import { InfoItem } from '../types';

interface Props {
  onComplete: () => void;
}

const AdminUpdatePage: React.FC<Props> = ({ onComplete }) => {
  const [items, setItems] = useState<InfoItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<any>('NEWS');
  const [editDate, setEditDate] = useState('');

  useEffect(() => {
    setItems(getStoredInfo());
  }, []);

  const handleItemClick = (item: InfoItem) => {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditCategory(item.category);
    setEditDate(item.date);
  };

  const handleUpdate = () => {
    if (editingId) {
      const updatedItems = items.map(item => 
        item.id === editingId 
          ? { ...item, title: editTitle, category: editCategory, date: editDate } 
          : item
      );
      saveInfo(updatedItems);
      onComplete();
    }
  };

  return (
    <div className="space-y-12">
      <h2 className="text-xl font-serif gold-text tracking-[0.3em] uppercase border-b border-[#D4AF37]/20 pb-4">Update Information</h2>
      
      {editingId ? (
        <div className="space-y-8 bg-black/40 p-8 border border-[#D4AF37]/10 animate-fade-in">
          <div className="space-y-4">
            <label className="text-gray-500 text-[9px] tracking-widest uppercase">Date</label>
            <input 
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
              className="w-full bg-black border border-[#D4AF37]/20 p-3 gold-text focus:outline-none"
            />
          </div>
          <div className="space-y-4">
            <label className="text-gray-500 text-[9px] tracking-widest uppercase">Category</label>
            <select 
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full bg-black border border-[#D4AF37]/20 p-3 gold-text focus:outline-none"
            >
              <option value="NEWS">NEWS</option>
              <option value="INFO">INFO</option>
              <option value="EVENT">EVENT</option>
              <option value="REPORT">REPORT</option>
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-gray-500 text-[9px] tracking-widest uppercase">Content</label>
            <input 
              type="text"
              maxLength={50}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-black border border-[#D4AF37]/20 p-3 gold-text focus:outline-none"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={() => setEditingId(null)} className="flex-1 border border-gray-600 py-3 text-xs text-gray-500">CANCEL</button>
            <button onClick={handleUpdate} className="flex-1 bg-[#D4AF37] text-black font-bold py-3 text-xs">APPLY CHANGE</button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-gray-500 text-[10px] tracking-widest mb-6 uppercase">Click an item to edit:</p>
          {items.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="p-4 border border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/5 cursor-pointer transition-all duration-300 flex justify-between items-center group"
            >
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-gray-600 font-mono">{item.date}</span>
                <span className="text-[9px] border border-[#D4AF37]/30 gold-text px-2 py-0.5">{item.category}</span>
                <span className="text-sm text-gray-400 truncate max-w-[400px]">{item.title}</span>
              </div>
              <span className="gold-text opacity-0 group-hover:opacity-100 transition-opacity">EDIT</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-4 pt-10 border-t border-[#D4AF37]/10">
        <button 
          onClick={handleUpdate}
          className="flex-1 py-4 bg-[#D4AF37] text-black font-bold tracking-[0.4em] text-[10px] hover:bg-white transition-all duration-300"
        >
          UPDATE
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

export default AdminUpdatePage;
