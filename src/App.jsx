import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import UCAFormFiller from './UCAFormFiller';
import DBENarrativePro from './DBENarrativePro';
import FAQPage from './FAQPage';
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
            <Route path="/uca-form" element={<UCAFormFiller />} />
            <Route path="/narrative" element={<DBENarrativePro />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;