import React from 'react';

const GlobalNavbar = ({ role }) => {
  return (
    <nav className="w-full bg-purple-950 text-white px-6 py-4 shadow-md shadow-black/20">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <span className="text-2xl font-bold uppercase tracking-wide">🌱 EarlyBloom</span>
          <div className="hidden md:flex gap-6 ml-10">
            {role === 'parent' && (
              <>
                <a href="#" className="text-white transition-colors duration-200 hover:text-purple-300">Dashboard</a>
                <a href="#" className="text-white transition-colors duration-200 hover:text-purple-300">My Children</a>
              </>
            )}
            {role === 'volunteer' && (
              <>
                <a href="#" className="text-white transition-colors duration-200 hover:text-purple-300">Visits</a>
                <a href="#" className="text-white transition-colors duration-200 hover:text-purple-300">Reports</a>
              </>
            )}
            {role === 'admin' && (
              <>
                <a href="#" className="text-white transition-colors duration-200 hover:text-purple-300">System Metrics</a>
                <a href="#" className="text-white transition-colors duration-200 hover:text-purple-300">Global Alerts</a>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-black/25 px-3 py-1 rounded-full text-xs uppercase tracking-[0.15em] text-white">
            Active: {role}
          </span>
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden">
            <img
              src="https://via.placeholder.com/40"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
