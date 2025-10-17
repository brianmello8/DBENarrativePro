import React, { useState } from 'react';
import HomePage from './HomePage';
import DBENarrativePro from './DBENarrativePro';

function App() {
  const [showApp, setShowApp] = useState(false);

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
          <DBENarrativePro />
        </div>
      </div>
    );
  }

  return <HomePage onStartApp={() => setShowApp(true)} />;
}

export default App;