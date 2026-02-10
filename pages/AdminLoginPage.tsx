
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '20KHcisuMG') {
      sessionStorage.setItem('is_admin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('密碼錯誤');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 border border-[#D4AF37]/30 p-12 backdrop-blur-sm">
        <h1 className="text-3xl font-serif gold-text tracking-[0.2em] mb-12 text-center uppercase">Backend Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-gray-500 text-[10px] tracking-[0.2em] mb-4 uppercase">Enter Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-[#D4AF37]/20 px-6 py-4 gold-text focus:outline-none focus:border-[#D4AF37] transition-all duration-300 tracking-widest"
              autoFocus
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-4 bg-[#D4AF37] text-black font-bold tracking-[0.4em] text-xs hover:bg-white transition-all duration-300"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
