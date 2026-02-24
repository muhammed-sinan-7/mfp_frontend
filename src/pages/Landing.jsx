import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    /* Main Container: Fixed height to prevent scrolling, matching your app's deep background */
    <div className="h-screen w-screen bg-[#0d0d12] text-white overflow-hidden flex flex-col font-sans">
      
      {/* 1. Minimal Header */}
      <nav className="flex justify-between items-center px-12 py-8 relative z-20">
        <div className="flex items-center gap-3">
          {/* Your exact Logo from the Login/Register screens */}
          <div className="w-10 h-10 bg-[#7c5dfa] rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 border-[3px] border-white rotate-45" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">MFP</span>
        </div>
        
        <button 
          onClick={() => navigate('/login')}
          className="text-xs font-bold tracking-[0.2em] text-[#7c5dfa] hover:text-blue-400 transition-all uppercase"
        >
          Access Workspace
        </button>
      </nav>

      {/* 2. Hero Content: Centered perfectly in the viewport */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative">
        
        {/* Background Radial Glows using your exact Blue/Purple mix */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full -z-10" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-4xl text-center space-y-10">
          {/* Unique Professional Headline: Using tracked-out uppercase for a "Luxury Tech" feel */}
          <h1 className="text-5xl md:text-7xl font-light tracking-[-0.04em] leading-[1.1]">
            Orchestrate the <br />
            <span className="font-black italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-[#7c5dfa]">
              Social Universe.
            </span>
          </h1>

          <p className="text-[#9494b8] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Connect, automate, and scale with the world’s most advanced 
            AI-driven management platform. Built for elite growth teams.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => navigate('/register')}
              className="px-14 py-5 bg-[#7c5dfa] hover:bg-blue-600 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(124,93,250,0.3)] hover:scale-[1.02] active:scale-95 flex items-center gap-4 mx-auto"
            >
              START FREE SETUP
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* 3. Static Trust Elements (No scrolling required) */}
        <div className="absolute bottom-12 flex items-center gap-12 border-t border-white/5 pt-8 w-full max-w-3xl justify-center">
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase">BANK-GRADE SECURITY</span>
          </div>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase">GDPR COMPLIANT</span>
          </div>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest uppercase">SOC2 READY</span>
          </div>
        </div>
      </main>

      {/* 4. Fixed Small Footer */}
      <footer className="px-12 py-6 flex justify-between items-center border-t border-white/5 bg-[#0d0d12]/50 backdrop-blur-md">
        <span className="text-[9px] font-bold text-[#4a4a68] tracking-[0.3em] uppercase">
          © 2026 MFP PLATFORM. GLOBAL AUTOMATION STANDARDS.
        </span>
        <div className="flex gap-6 text-[9px] font-bold text-[#4a4a68] tracking-widest uppercase">
          <a href="#" className="hover:text-blue-400">Privacy</a>
          <a href="#" className="hover:text-blue-400">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;