import React, { useState } from 'react';
import GlobalNavbar from './components/GlobalNavbar';
import Landing from './pages/Landing';
import LoginForm from './pages/Login';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans block relative">
      
      {!showLogin ? (
        <div className="scroll-smooth">
          <GlobalNavbar onLogin={() => setShowLogin(true)} />
          
          <div className="pt-20 block">
            <Landing onGetStarted={() => setShowLogin(true)} />
          </div>
          
        </div>
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center bg-purple-50 p-6 relative">
          
          <button 
            onClick={() => setShowLogin(false)}
            className="absolute top-6 right-6 bg-purple-700 hover:bg-purple-900 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md cursor-pointer"
          >
            ← Back to Homepage
          </button>

          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100">
            <LoginForm />
          </div>

        </div>
      )}

    </div>
  );
}
