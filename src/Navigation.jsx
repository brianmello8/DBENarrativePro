import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, Sparkles, HelpCircle, Shield } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/uca-form', label: 'Free UCA Form', icon: FileText },
    { path: '/narrative', label: 'Narrative Pro ($149)', icon: Sparkles },
    { path: '/faq', label: 'FAQ', icon: HelpCircle }
  ];

  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl border-b-2 border-blue-500/20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand - Enhanced with gradients */}
          <div 
            onClick={() => navigate('/home')}
            className="group flex items-center gap-3 cursor-pointer transition-all"
          >
            <div className="relative">
              {/* Glow effect behind icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-xl shadow-lg shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-all transform group-hover:scale-105">
                <Shield size={28} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                DBE Narrative Pro
              </h1>
              <p className="text-xs text-blue-300">Certification Made Simple</p>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'text-blue-100 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  {/* Glow effect on active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-50 -z-10"></div>
                  )}
                  <Icon 
                    size={18} 
                    className={isActive ? '' : 'group-hover:rotate-12 transition-transform'} 
                  />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Mobile Navigation - Enhanced */}
          <div className="md:hidden flex items-center gap-2">
            {navItems.map(({ path, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`group relative p-3 rounded-xl transition-all transform ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/50 scale-110'
                      : 'text-blue-100 hover:text-white hover:bg-white/10 hover:scale-105'
                  }`}
                >
                  {/* Glow effect on active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-50 -z-10"></div>
                  )}
                  <Icon 
                    size={22} 
                    className={isActive ? '' : 'group-hover:rotate-12 transition-transform'} 
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
