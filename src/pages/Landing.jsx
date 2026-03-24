import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers3, MessageSquareText, BarChart3, Clock3, Search, Bell } from 'lucide-react';

const ModernLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      {/* 1. NAVIGATION HEADER - Matches Dashboard Layout */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
              <Layers3 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111827]">MFP</span>
          </div>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-lg mx-12">
            <Search className="text-[#94A3B8] w-5 h-5" />
            <input 
              type="search" 
              placeholder="Search features, documentation..." 
              className="w-full bg-[#F1F5F9] px-4 py-2 rounded-full text-sm border-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>

          <div className="flex items-center gap-6 text-sm font-medium">
            <Bell className="text-[#94A3B8] cursor-pointer hover:text-blue-600 transition" />
            <button 
              onClick={() => navigate('/login')}
              className="text-[#1E293B] hover:text-blue-600 transition font-semibold"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="px-5 py-2.5 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1D4ED8] transition shadow-md shadow-blue-100"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* 2. MAIN HERO SECTION */}
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">
          
          {/* LEFT SIDE: Mission-Aligned Content & Access */}
          <div className="space-y-10 animate-fade-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#2563EB] rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
              <Zap size={14} className="animate-pulse" /> Unified Social Orchestration
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#111827]">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#4F46E5]">
                Social Flow.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#64748B] max-w-2xl leading-relaxed font-medium">
              MFP is the complete command center for growth teams. Seamlessly connect LinkedIn, Instagram, Meta, and YouTube to orchestrate scheduling, maximize engagement, and unlock AI-driven channel insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <button 
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto px-10 py-4 bg-[#2563EB] text-white rounded-2xl font-bold text-lg hover:bg-[#1D4ED8] transition shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group active:scale-95"
              >
                Access Your Workspace
                <ArrowRight className="group-hover:translate-x-1.5 transition-transform" size={20} />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-[#475569] border border-[#E2E8F0] rounded-2xl font-bold text-lg hover:bg-slate-50 transition shadow-sm">
                Watch Demo
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Dynamic 3D Social Preview */}
          <div className="relative animate-fade-in-right">
            {/* Main Center Image - Represents Unified Control */}
            <div className="bg-white p-6 rounded-[32px] border border-[#F1F5F9] shadow-2xl shadow-blue-50/50 aspect-video flex flex-col items-center justify-center transform group hover:rotate-[-1deg] transition-all duration-500">
                <Layers3 className="w-24 h-24 text-blue-100 mb-6" />
                <h4 className="text-xl font-bold text-center">Unified Social Dashboard</h4>
                <p className="text-sm text-slate-400 text-center">One view, all platforms.</p>
            </div>

            {/* Orbiting Platform Icons with 3D Depth */}
            <SocialIcon3D icon="Li" platform="LinkedIn" offset="top-[-40px] left-[-20px]" color="#0A66C2" />
            <SocialIcon3D icon="In" platform="Instagram" offset="top-[10px] right-[-30px]" color="#E1306C" delay="delay-100" />
            <SocialIcon3D icon="Me" platform="Meta" offset="bottom-[-30px] left-[50px]" color="#1877F2" delay="delay-200" />
            <SocialIcon3D icon="Yo" platform="YouTube" offset="bottom-[60px] right-[-50px]" color="#FF0000" delay="delay-300" />
          </div>
        </div>

        {/* 3. VALUE PROP GRID - Echoes Dashboard Card Style */}
        <div className="max-w-7xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<Clock3 className="text-blue-600" />}
            title="Intelligent Scheduling"
            desc="Predict perfect posting times across all channels."
          />
          <FeatureCard 
            icon={<MessageSquareText className="text-blue-600" />}
            title="Unified Engagement"
            desc="Manage comments and messages from one inbox."
          />
          <FeatureCard 
            icon={<Zap className="text-blue-600" />}
            title="AI Optimization"
            desc="Get actionable insights to boost visibility and growth."
          />
          <FeatureCard 
            icon={<CheckCircle2 className="text-blue-600" />}
            title="Compliance Engine"
            desc="Automate SOC2 compliance checks on every post."
          />
        </div>
      </main>

      {/* 4. MINIMAL FOOTER - Matching your Dashboard Footer */}
      <footer className="mt-20 border-t border-[#E2E8F0] bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#2563EB] rounded flex items-center justify-center">
              <Layers3 className="text-white w-4 h-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-[#111827]">Marketing Fusion Platform</span>
          </div>
          <p className="text-xs font-bold text-[#94A3B8] tracking-widest uppercase">
            © 2026 MFP PLATFORM. GLOBAL AUTOMATION STANDARDS.
          </p>
          <div className="flex gap-6 text-xs font-bold text-[#64748B] uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Reusable 3D Icon Component
const SocialIcon3D = ({ icon, platform, offset, color, delay = "" }) => (
  <div className={`absolute ${offset} ${delay} bg-white p-4 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100 flex items-center gap-3 w-40 hover:scale-110 hover:-translate-y-2 transition-all duration-300 transform`}>
    <div style={{ backgroundColor: color }} className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-inner">
      {icon}
    </div>
    <span className="text-sm font-semibold text-slate-800">{platform}</span>
  </div>
);

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl border border-[#F1F5F9] shadow-sm hover:shadow-lg transition-shadow duration-300 group">
    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 text-[#111827]">{title}</h3>
    <p className="text-[#64748B] leading-relaxed text-sm font-medium">{desc}</p>
  </div>
);

// Necessary tailwind config addition for custom animations
// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         fadeInLeft: {
//           '0%': { opacity: 0, transform: 'translateX(-20px)' },
//           '100%': { opacity: 1, transform: 'translateX(0)' },
//         },
//         fadeInRight: {
//           '0%': { opacity: 0, transform: 'translateX(20px)' },
//           '100%': { opacity: 1, transform: 'translateX(0)' },
//         },
//       },
//       animation: {
//         'fade-in-left': 'fadeInLeft 0.7s ease-out forwards',
//         'fade-in-right': 'fadeInRight 0.7s ease-out forwards 0.2s',
//       },
//     },
//   },
// }

import { Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
export default ModernLandingPage;