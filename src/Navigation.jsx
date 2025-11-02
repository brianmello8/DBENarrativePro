import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sparkles, HelpCircle, Shield, Menu, X, Download } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // NEW: Check if user has paid for documents
  const [isPaid, setIsPaid] = useState(false);

  // NEW: Check payment status on mount and when storage changes
  useEffect(() => {
    const checkPaymentStatus = () => {
      const paidStatus = localStorage.getItem('dbeNarrativePaid');
      setIsPaid(paidStatus === 'true');
    };
    
    checkPaymentStatus();
    
    // Listen for storage changes (if payment happens in another tab/window)
    window.addEventListener('storage', checkPaymentStatus);
    window.addEventListener('paymentSuccess', checkPaymentStatus); // Custom event from payment success
    
    return () => {
      window.removeEventListener('storage', checkPaymentStatus);
      window.removeEventListener('paymentSuccess', checkPaymentStatus);
    };
  }, []);

  // Detect scroll for subtle effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/narrative', label: 'Narrative Pro ($149)', icon: Sparkles },
    { path: '/faq', label: 'FAQ', icon: HelpCircle }
  ];

  // NEW: Add download link conditionally
  const allNavItems = isPaid 
    ? [...navItems, { path: '/download', label: 'My Downloads', icon: Download, isDownload: true }]
    : navItems;

  return (
    <nav className={`sticky top-0 z-50 relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-2xl border-b-4 border-blue-500/30 overflow-hidden transition-all duration-300 ${
      scrolled ? 'shadow-3xl border-blue-400/50' : ''
    }`}>
      {/* Enhanced decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand - ENHANCED with better effects */}
          <div 
            onClick={() => navigate('/home')}
            className="group flex items-center gap-3 cursor-pointer transition-all"
          >
            <div className="relative">
              {/* Multi-layer glow effect behind icon */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur-xl opacity-50 group-hover:opacity-90 transition-opacity animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-purple-500 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 text-white p-3 rounded-xl shadow-2xl shadow-blue-500/60 group-hover:shadow-blue-500/90 transition-all transform group-hover:scale-110 group-hover:rotate-3 border border-blue-400/20">
                <Shield size={28} strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg group-hover:scale-105 transition-transform">
                DBE Narrative Pro
              </h1>
              <p className="text-xs text-blue-300 font-semibold group-hover:text-blue-200 transition-colors">
                Certification Made Simple
              </p>
            </div>
          </div>

          {/* Navigation Links - Desktop ENHANCED */}
          <div className="hidden md:flex items-center gap-3">
            {allNavItems.map(({ path, label, icon: Icon, isDownload }) => {
              const isActive = location.pathname === path;
              const isNarrative = path === '/narrative';
              
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all transform ${
                    isActive
                      ? isDownload
                        ? 'bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white shadow-2xl shadow-emerald-500/50 scale-105 border-2 border-emerald-400/30'
                        : isNarrative
                        ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-2xl shadow-green-500/50 scale-105 border-2 border-green-400/30'
                        : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-2xl shadow-blue-500/50 scale-105 border-2 border-blue-400/30'
                      : isDownload
                      ? 'text-emerald-200 hover:text-white hover:bg-emerald-500/20 hover:scale-105 border-2 border-emerald-400/20 hover:border-emerald-400/40'
                      : 'text-blue-100 hover:text-white hover:bg-white/15 hover:scale-105 border-2 border-transparent hover:border-white/20'
                  }`}
                >
                  {/* Enhanced multi-layer glow effect on active */}
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 ${
                        isDownload
                          ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                          : isNarrative 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                          : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                      } rounded-xl blur-lg opacity-50 -z-10 animate-pulse`}></div>
                      <div className={`absolute inset-0 ${
                        isDownload
                          ? 'bg-gradient-to-r from-emerald-300 to-teal-400'
                          : isNarrative 
                          ? 'bg-gradient-to-r from-green-300 to-teal-400' 
                          : 'bg-gradient-to-r from-blue-300 to-purple-400'
                      } rounded-xl blur-2xl opacity-25 -z-10`}></div>
                    </>
                  )}
                  
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  </div>
                  
                  <Icon 
                    size={18} 
                    strokeWidth={2.5}
                    className={isActive ? 'animate-bounce-subtle' : 'group-hover:rotate-12 group-hover:scale-110 transition-all'} 
                  />
                  <span className="relative">
                    {label}
                    {/* NEW: Pulse indicator on download link when active */}
                    {isDownload && isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-300 rounded-full animate-ping"></span>
                    )}
                    {isNarrative && isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button - ENHANCED */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="group relative p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all transform hover:scale-110 border-2 border-white/20 shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></div>
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform duration-300" />
              ) : (
                <Menu size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - ENHANCED */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in-down">
            <div className="space-y-2">
              {allNavItems.map(({ path, label, icon: Icon, isDownload }) => {
                const isActive = location.pathname === path;
                const isNarrative = path === '/narrative';
                
                return (
                  <button
                    key={path}
                    onClick={() => {
                      navigate(path);
                      setMobileMenuOpen(false);
                    }}
                    className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all transform ${
                      isActive
                        ? isDownload
                          ? 'bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white shadow-xl shadow-emerald-500/40 scale-102 border-2 border-emerald-400/30'
                          : isNarrative
                          ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white shadow-xl shadow-green-500/40 scale-102 border-2 border-green-400/30'
                          : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-500/40 scale-102 border-2 border-blue-400/30'
                        : isDownload
                        ? 'bg-emerald-500/10 text-emerald-100 hover:text-white hover:bg-emerald-500/20 hover:scale-102 border-2 border-emerald-400/20 hover:border-emerald-400/40'
                        : 'bg-white/10 text-blue-100 hover:text-white hover:bg-white/20 hover:scale-102 border-2 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {/* Enhanced glow effect */}
                    {isActive && (
                      <div className={`absolute inset-0 ${
                        isDownload
                          ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                          : isNarrative 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                          : 'bg-gradient-to-r from-blue-400 to-indigo-500'
                      } rounded-xl blur-lg opacity-40 -z-10 animate-pulse`}></div>
                    )}
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                    </div>
                    
                    <Icon 
                      size={20} 
                      strokeWidth={2.5}
                      className={isActive ? '' : 'group-hover:rotate-12 group-hover:scale-110 transition-all'} 
                    />
                    <span className="relative flex-1 text-left">
                      {label}
                      {/* NEW: Pulse indicators */}
                      {isDownload && isActive && (
                        <span className="absolute -top-1 left-full ml-2 w-2 h-2 bg-emerald-300 rounded-full animate-ping"></span>
                      )}
                      {isNarrative && isActive && (
                        <span className="absolute -top-1 left-full ml-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Custom animations CSS */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s ease-in-out infinite;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.5);
        }

        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </nav>
  );
};

export default Navigation;