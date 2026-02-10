
import React, { useState } from 'react';
import { getStoredInfo, saveInfo } from '../constants';
import { InfoItem } from '../types';

interface Props {
  onComplete: () => void;
}

const AdminAddPage: React.FC<Props> = ({ onComplete }) => {
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<'NEWS' | 'INFO' | 'EVENT' | 'REPORT'>('NEWS');
  const [content, setContent] = useState('');

  const handleReset = () => {
    setDate('');
    setCategory('NEWS');
    setContent('');
  };

  const handleConfirm = () => {
    if (!date || !content) {
      alert('Please fill in all fields.');
      return;
    }

    const newItem: InfoItem = {
      id: Date.now().toString(),
      date,
      title: content,
      category
    };

    const currentItems = getStoredInfo();
    saveInfo([newItem, ...currentItems]);
    onComplete();
  };

  return (
    <div className="space-y-12">
      <h2 className="text-xl font-serif gold-text tracking-[0.3em] uppercase border-b border-[#D4AF37]/20 pb-4">Add New Information</h2>
      
      <div className="grid grid-cols-1 gap-10">
        <div className="space-y-4">
          <label className="block text-gray-500 text-[10px] tracking-[0.2em] uppercase">1. Select Date</label>
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-black border border-[#D4AF37]/20 px-6 py-4 gold-text focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-gray-500 text-[10px] tracking-[0.2em] uppercase">2. Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full bg-black border border-[#D4AF37]/20 px-6 py-4 gold-text focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="NEWS">NEWS</option>
            <option value="INFO">INFO</option>
            <option value="EVENT">EVENT</option>
            <option value="REPORT">REPORT</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <label className="block text-gray-500 text-[10px] tracking-[0.2em] uppercase">3. Content (Max 50 characters)</label>
            <span className="text-[10px] text-gray-600">{content.length}/50</span>
          </div>
          <input 
            type="text"
            maxLength={50}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter text here..."
            className="w-full bg-black border border-[#D4AF37]/20 px-6 py-4 gold-text focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-10">
        <button 
          onClick={handleReset}
          className="flex-1 py-4 border border-gray-600 text-gray-500 font-bold tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all duration-300"
        >
          RESET
        </button>
        <button 
          onClick={handleConfirm}
          className="flex-1 py-4 bg-[#D4AF37] text-black font-bold tracking-[0.4em] text-[10px] hover:bg-white transition-all duration-300"
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default AdminAddPage;
