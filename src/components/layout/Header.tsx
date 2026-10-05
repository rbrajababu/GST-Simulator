import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import {
  Building2,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Sparkles,
  BookOpen,
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Sliders,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeCompany,
    companies,
    switchCompany,
    currentUser,
    logout,
    currentFY,
    currentPeriod,
    setCurrentFY,
    setCurrentPeriod,
    notices,
    setActiveTab,
    cashLedger,
    creditLedger,
    resetSimulatorState,
  } = useGstPortal();

  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const pendingNotices = notices.filter((n) => n.status === 'Pending Reply').length;

  return (
    <header className="bg-[#0B3B60] text-white border-b border-[#082d4b] select-none">
      {/* Top Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-blue-900/60">
        <div className="flex items-center space-x-3 text-blue-200">
          <span className="font-semibold text-white tracking-wide">
            GSTIN: <span className="font-mono text-amber-300 font-bold">{activeCompany.gstin}</span>
          </span>
          <span className="text-blue-400">|</span>
          <span className="hidden sm:inline">State: <strong className="text-white">{activeCompany.state} ({activeCompany.stateCode})</strong></span>
          <span className="hidden md:inline text-blue-400">|</span>
          <span className="hidden md:inline">Type: <span className="bg-blue-800 text-blue-200 px-1.5 py-0.5 rounded text-[11px] font-medium">{activeCompany.taxpayerType} Taxpayer</span></span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Quick Period Selector */}
          <div className="flex items-center gap-1.5 bg-blue-900/80 px-2.5 py-1 rounded border border-blue-700/50">
            <span className="text-blue-300 text-[11px]">FY:</span>
            <select
              value={currentFY}
              onChange={(e) => setCurrentFY(e.target.value)}
              className="bg-transparent text-white font-medium text-xs focus:outline-none cursor-pointer"
            >
              <option value="2024-25" className="bg-slate-900 text-white">2024-25</option>
              <option value="2023-24" className="bg-slate-900 text-white">2023-24</option>
            </select>
            <span className="text-blue-400">|</span>
            <span className="text-blue-300 text-[11px]">Period:</span>
            <select
              value={currentPeriod}
              onChange={(e) => setCurrentPeriod(e.target.value)}
              className="bg-transparent text-amber-200 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              <option value="September 2024" className="bg-slate-900 text-white">September 2024</option>
              <option value="August 2024" className="bg-slate-900 text-white">August 2024</option>
              <option value="July 2024" className="bg-slate-900 text-white">July 2024</option>
            </select>
          </div>

          {/* Reset Demo button */}
          {showResetConfirm ? (
            <div className="flex items-center gap-1.5 bg-blue-950 px-2 py-0.5 rounded border border-amber-400/60 text-[11px]">
              <span className="text-amber-200">Reset sandbox data?</span>
              <button
                onClick={() => {
                  resetSimulatorState();
                  setShowResetConfirm(false);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-1.5 py-0.5 rounded text-[10px]"
              >
                Yes
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="text-slate-300 hover:text-white px-1 text-[10px]"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowResetConfirm(true)}
              title="Reset Simulator Data"
              className="flex items-center gap-1 text-blue-200 hover:text-white bg-blue-900/40 hover:bg-blue-800/80 px-2 py-1 rounded border border-blue-700/40 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span className="hidden lg:inline text-[11px]">Reset Sandbox</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Portal Title & Emblem Logo */}
        <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          {/* Ashoka Lion Emblem silhouette */}
          <div className="w-10 h-12 shrink-0 flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 120" className="w-8 h-10 fill-current text-amber-100/90 drop-shadow">
              <path d="M50 5 C45 5 40 10 40 18 C40 22 43 25 46 27 C42 29 38 33 38 38 C38 45 44 50 50 50 C56 50 62 45 62 38 C62 33 58 29 54 27 C57 25 60 22 60 18 C60 10 55 5 50 5 Z" />
              <path d="M28 20 C24 20 20 24 20 30 C20 34 23 37 26 39 C23 42 20 46 20 52 C20 59 26 64 32 64 C36 64 40 61 42 58 C40 54 39 49 39 44 C39 36 43 30 48 26 C45 22 40 20 35 20 Z" />
              <path d="M72 20 C67 20 62 22 59 26 C64 30 68 36 68 44 C68 49 67 54 65 58 C67 61 71 64 75 64 C81 64 87 59 87 52 C87 46 84 42 81 39 C84 37 87 34 87 30 C87 24 83 20 79 20 Z" />
              <rect x="22" y="68" width="56" height="8" rx="2" fill="currentColor" opacity="0.9" />
              <circle cx="50" cy="84" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
              <rect x="15" y="96" width="70" height="7" rx="1.5" fill="currentColor" />
              <rect x="10" y="106" width="80" height="5" rx="1" fill="currentColor" />
            </svg>
            <span className="text-[6.5px] text-amber-200 tracking-wider font-serif uppercase font-bold mt-0.5">
              सत्यमेव जयते
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-tight">
                Goods and Services Tax
              </h1>
              <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.2 rounded tracking-wide uppercase">
                SIMULATOR
              </span>
            </div>
            <p className="text-[11px] text-blue-200">
              Government of India, States and Union Territories • Taxpayer Portal
            </p>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick AI Tutor Pill */}
          <button
            onClick={() => setActiveTab('tutor')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold shadow-sm border border-indigo-400/40 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">AI GST Tutor</span>
          </button>

          {/* Practice Scenarios Pill */}
          <button
            onClick={() => setActiveTab('practice')}
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded-md text-xs font-medium border border-emerald-500/40 transition"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Practice Lab</span>
          </button>

          {/* Learning Center Pill */}
          <button
            onClick={() => setActiveTab('learning')}
            className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-md text-xs font-medium border border-blue-600/40 transition"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Lessons &amp; Quiz</span>
          </button>

          {/* Notices Bell */}
          <button
            onClick={() => setActiveTab('notices')}
            className="relative p-2 text-blue-200 hover:text-white hover:bg-blue-800/60 rounded-md transition"
            title="Statutory Notices"
          >
            <Bell className="w-4 h-4" />
            {pendingNotices > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {pendingNotices}
              </span>
            )}
          </button>

          {/* Company Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
              className="flex items-center gap-2 bg-blue-900/90 hover:bg-blue-800 px-3 py-1.5 rounded-md border border-blue-600/60 text-xs font-medium transition text-left"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-300" />
              <div className="max-w-[130px] sm:max-w-[170px] truncate">
                <span className="block font-bold truncate text-white leading-tight">{activeCompany.tradeName}</span>
                <span className="block text-[10px] text-blue-300 font-mono">{activeCompany.state}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-blue-300" />
            </button>

            {companyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Switch Practice Business
                  </span>
                </div>
                {companies.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      switchCompany(comp.id);
                      setCompanyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 text-xs hover:bg-blue-50 transition border-b border-slate-50 flex items-start justify-between ${
                      comp.id === activeCompany.id ? 'bg-blue-50/80 font-bold text-blue-800 border-l-4 border-l-blue-600' : ''
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-900">{comp.tradeName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{comp.gstin}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{comp.state} • {comp.taxpayerType}</div>
                    </div>
                    {comp.id === activeCompany.id && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold">Active</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 p-1.5 bg-blue-900/60 hover:bg-blue-800 rounded-md border border-blue-700/50 text-xs"
            >
              <div className="w-6 h-6 rounded-full bg-blue-400/20 text-amber-300 flex items-center justify-center font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <ChevronDown className="w-3 h-3 text-blue-300" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 py-1.5 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-slate-500 text-[11px] capitalize">{currentUser.role} Role</div>
                  <div className="text-slate-400 text-[10px] font-mono mt-0.5 truncate">{currentUser.email}</div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  Taxpayer Profile
                </button>
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-100 flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-slate-500" />
                  Simulator Admin Panel
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-500" />
                  Logout from Simulator
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
