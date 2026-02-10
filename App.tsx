
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import TopPage from './pages/TopPage';
import AboutPage from './pages/AboutPage';
import OurBrandPage from './pages/OurBrandPage';
import EventPage from './pages/EventPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import BackendMain from './pages/BackendMain';

const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Don't show header/footer on login or backend pages to keep focus
  const isAdminView = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      {!isAdminView && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/brand" element={<OurBrandPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<BackendMain />} />
        </Routes>
      </div>
      {!isAdminView && <Footer />}
    </div>
  );
};

export default App;
