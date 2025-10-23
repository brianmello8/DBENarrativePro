import React, { useState } from 'react';
import HomePage from './HomePage';
import DBENarrativePro from './DBENarrativePro';
import Analytics from './Analytics';
import FAQPage from './FAQPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'app', or 'faq'

  const handleStartApp = () => {
    setCurrentPage('app');
    window.scrollTo(0, 0);
  };

  const handleNavigateToFAQ = () => {
    setCurrentPage('faq');
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Analytics />
      
      {currentPage === 'app' && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <button
              onClick={handleNavigateHome}
              className="mb-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
            >
              ← Back to Home
            </button>
            <DBENarrativePro />
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <HomePage 
          onStartApp={handleStartApp}
          onNavigateToFAQ={handleNavigateToFAQ}
        />
      )}

      {currentPage === 'faq' && (
        <FAQPage 
          onNavigateHome={handleNavigateHome}
          onStartApp={handleStartApp}
        />
      )}
    </>
  );
}

export default App;