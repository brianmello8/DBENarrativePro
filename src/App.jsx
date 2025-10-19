import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import DBENarrativePro from './DBENarrativePro';

function App() {
  const [showApp, setShowApp] = useState(false);
  const [redirectLicenseKey, setRedirectLicenseKey] = useState(null);

  // Check for Gumroad redirect on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const licenseKey = urlParams.get('license_key');
    
    if (licenseKey) {
      // User was redirected from Gumroad after purchase
      setRedirectLicenseKey(licenseKey);
      setShowApp(true); // Automatically go to the app
      
      // Clean up URL (remove query parameters)
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  if (showApp) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => setShowApp(false)}
            className="mb-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <DBENarrativePro redirectLicenseKey={redirectLicenseKey} />
        </div>
      </div>
    );
  }

  return <HomePage onStartApp={() => setShowApp(true)} />;
}

export default App;