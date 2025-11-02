import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import DBENarrativePro from './DBENarrativePro';
import FAQPage from './FAQPage';
import DownloadPage from './components/DownloadPage';
import Analytics from './Analytics';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App">
          <Analytics />
          
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/narrative" element={<DBENarrativePro />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/download" element={<DownloadPage />} /> {/* NEW: Download page route */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;