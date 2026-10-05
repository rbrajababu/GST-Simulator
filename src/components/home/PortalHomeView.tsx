import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { HoneycombBanner } from './HoneycombBanner';
import { SearchTaxpayerModal } from '../modals/SearchTaxpayerModal';
import { MultiStateModal } from '../modals/MultiStateModal';
import {
  Bell,
  ChevronRight,
  ChevronDown,
  Building2,
  FileSpreadsheet,
  CreditCard,
  RotateCcw,
  Search,
  Calculator,
  Sparkles,
  BookOpen,
  FileCheck2,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface PortalHomeViewProps {
  onOpenLogin: () => void;
}

export const PortalHomeView: React.FC<PortalHomeViewProps> = ({ onOpenLogin }) => {
  const { setActiveTab } = useGstPortal();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [multiStateModalOpen, setMultiStateModalOpen] = useState(false);
  const [activeHelpIndex, setActiveHelpIndex] = useState<number | null>(null);
  const [showAllNews, setShowAllNews] = useState(false);

  // Help topic accordion items
  const helpTopics = [
    {
      title: 'How do I register with GST?',
      content:
        'To register, click on "REGISTER" or go to Services > Registration > New Registration. Complete the 9-step Form GST REG-01 with PAN, business details, promoter information, principal place of business, and submit with simulated Aadhaar OTP or DSC to generate an ARN.',
      actionTab: 'registration',
      actionLabel: 'Launch REG-01 Simulator',
    },
    {
      title: 'How do I apply for refund?',
      content:
        'Taxpayers can apply for refund under Section 54 using Form GST RFD-01 on grounds such as exports under LUT without payment of tax, inverted duty structure, or excess cash ledger balance. Track your ARN timeline through scrutiny to sanction.',
      actionTab: 'refunds',
      actionLabel: 'Open Refund Practice',
    },
    {
      title: 'How do I file returns?',
      content:
        'Monthly compliance involves uploading sales in GSTR-1 by the 11th, reviewing auto-drafted ITC in GSTR-2B on the 14th, and filing GSTR-3B by the 20th with tax payment through cash/credit set-off under Rule 88A.',
      actionTab: 'returns-hub',
      actionLabel: 'Go to Returns Hub',
    },
    {
      title: 'What is Rule 88A set-off order?',
      content:
        'Rule 88A mandates that the entire IGST credit balance must be exhausted first before using CGST or SGST credits. CGST and SGST can never be cross-utilized against each other.',
      actionTab: 'gstr-3b',
      actionLabel: 'Practice Rule 88A Set-off',
    },
    {
      title: 'How to reconcile GSTR-2B with Books?',
      content:
        'Under Section 16(2)(aa), ITC can only be claimed if reflected in GSTR-2B. Compare your accounting purchase register against portal GSTR-2B to identify Matched, Missing in 2B, or Partial value discrepancies.',
      actionTab: 'reconciliation',
      actionLabel: 'Open ITC Reconciliation',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex flex-col justify-between font-sans">
      <div>
        {/* Top Accessibility Bar matching official GST portal */}
        <div className="bg-[#051C33] text-slate-300 text-[11px] py-1 px-4 border-b border-blue-950">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <a href="#main-content" className="hover:text-white transition">
                Skip to Main Content
              </a>
              <span className="text-slate-600">|</span>
              <button
                className="hover:text-white flex items-center gap-1"
                title="Toggle Contrast"
                onClick={() => {
                  document.documentElement.classList.toggle('contrast-more');
                }}
              >
                <span className="w-3 h-3 rounded-full border border-slate-400 bg-gradient-to-r from-white to-transparent inline-block"></span>
                <span>Contrast</span>
              </button>
              <span className="text-slate-600">|</span>
              <div className="flex items-center space-x-1.5 font-bold">
                <button className="px-1 hover:text-white" title="Decrease font size">A-</button>
                <button className="px-1 text-white font-bold" title="Default font size">A</button>
                <button className="px-1 hover:text-white" title="Increase font size">A+</button>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-slate-400">
              <span className="hidden sm:inline">Official GST Portal Design &amp; Layout Simulator</span>
              <span className="bg-amber-400/20 text-amber-300 px-2 py-0.2 rounded font-bold text-[10px]">
                SANDBOX
              </span>
            </div>
          </div>
        </div>

        {/* Main Navy Header matching screenshot */}
        <header className="bg-[#00274D] text-white py-3.5 px-4 shadow-sm border-b border-[#031c36]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            {/* National Emblem & Title */}
            <div className="flex items-center space-x-3.5">
              {/* Ashoka Lion Emblem silhouette */}
              <div className="w-12 h-14 shrink-0 flex flex-col items-center justify-center">
                <svg viewBox="0 0 100 120" className="w-10 h-12 fill-current text-amber-100/90 drop-shadow">
                  {/* Stylized Indian National Emblem Ashoka Capital */}
                  <path d="M50 5 C45 5 40 10 40 18 C40 22 43 25 46 27 C42 29 38 33 38 38 C38 45 44 50 50 50 C56 50 62 45 62 38 C62 33 58 29 54 27 C57 25 60 22 60 18 C60 10 55 5 50 5 Z" />
                  <path d="M28 20 C24 20 20 24 20 30 C20 34 23 37 26 39 C23 42 20 46 20 52 C20 59 26 64 32 64 C36 64 40 61 42 58 C40 54 39 49 39 44 C39 36 43 30 48 26 C45 22 40 20 35 20 Z" />
                  <path d="M72 20 C67 20 62 22 59 26 C64 30 68 36 68 44 C68 49 67 54 65 58 C67 61 71 64 75 64 C81 64 87 59 87 52 C87 46 84 42 81 39 C84 37 87 34 87 30 C87 24 83 20 79 20 Z" />
                  <rect x="22" y="68" width="56" height="8" rx="2" fill="currentColor" opacity="0.9" />
                  <circle cx="50" cy="84" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="15" y="96" width="70" height="7" rx="1.5" fill="currentColor" />
                  <rect x="10" y="106" width="80" height="5" rx="1" fill="currentColor" />
                </svg>
                <span className="text-[7px] text-amber-200 tracking-wider font-serif uppercase font-bold mt-0.5">
                  सत्यमेव जयते
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                    Goods and Services Tax
                  </h1>
                </div>
                <p className="text-xs sm:text-sm text-blue-200 font-normal">
                  Government of India, States and Union Territories
                </p>
                <div className="text-[10px] text-amber-300 font-semibold tracking-wide flex items-center gap-1.5 mt-0.5">
                  <span>Educational Simulator &amp; Practice Laboratory</span>
                  <span className="bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.2 rounded text-[9px] uppercase">
                    Demo Mode
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action Buttons matching screenshot */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setActiveTab('registration')}
                className="bg-white hover:bg-slate-100 text-[#00274D] font-bold text-xs px-3.5 py-2 rounded-xs border border-white shadow-xs transition uppercase tracking-wider"
              >
                REGISTER
              </button>

              <button
                onClick={() => setMultiStateModalOpen(true)}
                className="bg-white hover:bg-slate-100 text-[#00274D] font-bold text-xs px-3.5 py-2 rounded-xs border border-white shadow-xs transition uppercase tracking-wider hidden md:inline-block"
              >
                MULTI-STATE REGISTRATION
              </button>

              <button
                onClick={onOpenLogin}
                className="bg-white hover:bg-slate-100 text-[#00274D] font-extrabold text-xs px-5 py-2 rounded-xs border border-white shadow-md transition uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>LOGIN</span>
              </button>
            </div>
          </div>
        </header>

        {/* Navigation Bar matching screenshot */}
        <nav className="bg-[#082F57] text-white text-xs border-b border-blue-900 sticky top-0 z-40 shadow-sm select-none">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between">
            <div className="flex items-center overflow-x-auto scrollbar-none py-0">
              {/* Home Tab (Teal Green as shown in screenshot) */}
              <button
                onClick={() => setActiveTab('home')}
                className="bg-[#00A389] hover:bg-[#008f78] text-white font-bold px-5 py-2.5 whitespace-nowrap transition flex items-center gap-1 shadow-inner"
              >
                <span>Home</span>
              </button>

              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setActiveTab('returns-hub')}
                  className="px-4 py-2.5 text-blue-100 hover:text-white hover:bg-[#00274D] font-semibold whitespace-nowrap flex items-center gap-1 transition"
                >
                  <span>Services</span>
                  <ChevronDown className="w-3 h-3 opacity-80" />
                </button>
                <div className="absolute left-0 mt-0 w-64 bg-white text-slate-800 rounded-b-md shadow-2xl border border-slate-200 py-1 hidden group-hover:block z-50 text-xs">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Registration &amp; Filings
                  </div>
                  <button
                    onClick={() => setActiveTab('registration')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    Registration &rarr; New Registration (REG-01)
                  </button>
                  <button
                    onClick={() => setActiveTab('returns-hub')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    Returns &rarr; Returns Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    Payments &rarr; Create Challan (PMT-06)
                  </button>
                  <button
                    onClick={() => setActiveTab('refunds')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    Refunds &rarr; Application for Refund (RFD-01)
                  </button>
                  <button
                    onClick={() => setSearchModalOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium text-blue-700 font-bold"
                  >
                    Search Taxpayer &rarr; By GSTIN / PAN
                  </button>
                </div>
              </div>

              {/* GST Law */}
              <button
                onClick={() => setActiveTab('learning')}
                className="px-4 py-2.5 text-blue-100 hover:text-white hover:bg-[#00274D] font-semibold whitespace-nowrap transition"
              >
                GST Law
              </button>

              {/* Downloads */}
              <div className="relative group">
                <button
                  onClick={() => setActiveTab('gstr-2b')}
                  className="px-4 py-2.5 text-blue-100 hover:text-white hover:bg-[#00274D] font-semibold whitespace-nowrap flex items-center gap-1 transition"
                >
                  <span>Downloads</span>
                  <ChevronDown className="w-3 h-3 opacity-80" />
                </button>
                <div className="absolute left-0 mt-0 w-56 bg-white text-slate-800 rounded-b-md shadow-2xl border border-slate-200 py-1 hidden group-hover:block z-50 text-xs">
                  <button
                    onClick={() => setActiveTab('gstr-2b')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    GSTR-2B Statement (Excel/JSON)
                  </button>
                  <button
                    onClick={() => setActiveTab('gstr-1')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    GSTR-1 Excel Template
                  </button>
                </div>
              </div>

              {/* Search Taxpayer */}
              <div className="relative group">
                <button
                  onClick={() => setSearchModalOpen(true)}
                  className="px-4 py-2.5 text-blue-100 hover:text-white hover:bg-[#00274D] font-semibold whitespace-nowrap flex items-center gap-1 transition"
                >
                  <span>Search Taxpayer</span>
                  <ChevronDown className="w-3 h-3 opacity-80" />
                </button>
                <div className="absolute left-0 mt-0 w-56 bg-white text-slate-800 rounded-b-md shadow-2xl border border-slate-200 py-1 hidden group-hover:block z-50 text-xs">
                  <button
                    onClick={() => setSearchModalOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    Search by GSTIN / UIN
                  </button>
                  <button
                    onClick={() => setSearchModalOpen(true)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 font-medium"
                  >
                    Search by PAN
                  </button>
                </div>
              </div>

              {/* Help and Taxpayer Facilities */}
              <button
                onClick={() => setActiveTab('learning')}
                className="px-4 py-2.5 text-blue-100 hover:text-white hover:bg-[#00274D] font-semibold whitespace-nowrap transition"
              >
                Help and Taxpayer Facilities
              </button>

              {/* e-Invoice */}
              <button
                onClick={() => setActiveTab('calculator')}
                className="px-4 py-2.5 text-blue-100 hover:text-white hover:bg-[#00274D] font-semibold whitespace-nowrap transition"
              >
                e-Invoice
              </button>

              {/* News and Updates */}
              <a
                href="#news-section"
                className="px-4 py-2.5 text-blue-100 hover:text-white hover:bg-[#00274D] font-semibold whitespace-nowrap transition"
              >
                News and Updates
              </a>
            </div>

            {/* Quick Fast Jump into Simulator Features */}
            <div className="flex items-center space-x-2 pl-3">
              <button
                onClick={() => setActiveTab('practice')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded text-[11px] font-bold shadow-xs whitespace-nowrap hidden lg:flex items-center gap-1"
              >
                <FileCheck2 className="w-3 h-3" />
                Practice Lab
              </button>
              <button
                onClick={() => setActiveTab('tutor')}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded text-[11px] font-bold shadow-xs whitespace-nowrap hidden lg:flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
                AI Tutor
              </button>
            </div>
          </div>
        </nav>

        {/* Iconic Hexagonal Photo Mosaic Hero Banner matching user's screenshot */}
        <HoneycombBanner />

        {/* Ticker / Running Advisory Bar matching screenshot */}
        <div className="bg-[#FFF4E5] border-y border-[#FFE2B8] py-2 px-4 text-xs shadow-inner">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <Bell className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-amber-950 font-medium truncate sm:whitespace-normal">
                <span className="font-bold text-red-700 mr-2">Advisory:</span>
                We shall be enhancing services... Educational Practice Portal – This is a Demo/Simulator and is NOT the official GST Portal. Use demo taxpayer accounts to practice GSTR-1, GSTR-3B, GSTR-2B, and PMT-06 challans safely.
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area matching screenshot: Left News, Right Help Topics */}
        <main id="main-content" className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: News and Updates (7 cols) */}
            <div id="news-section" className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2">
                <h2 className="text-base font-bold text-[#00274D] uppercase tracking-wide">
                  News and Updates
                </h2>
                <button
                  onClick={() => setShowAllNews(!showAllNews)}
                  className="text-xs font-bold text-blue-700 hover:underline uppercase tracking-wider"
                >
                  {showAllNews ? 'SHOW LESS' : 'VIEW ALL'}
                </button>
              </div>

              {/* News Items matching screenshot */}
              <div className="space-y-3 text-xs">
                {/* News 1 - Exactly as seen in screenshot */}
                <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        onClick={() => setMultiStateModalOpen(true)}
                        className="font-bold text-sm text-blue-900 hover:underline cursor-pointer leading-snug"
                      >
                        Advisory on &ldquo;Multistate Registration&rdquo; Facility for GST Registration
                      </h3>
                      <div className="text-slate-400 text-[11px] mt-1 font-mono">Oct 1st, 2026</div>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                      REGISTRATION
                    </span>
                  </div>
                  <p className="text-slate-600 mt-2 text-[11px] leading-relaxed">
                    Taxpayers seeking concurrent registrations across multiple states under a common PAN
                    can now benefit from unified Part-A verification in Form GST REG-01.
                  </p>
                </div>

                {/* News 2 */}
                <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        onClick={() => setActiveTab('returns-hub')}
                        className="font-bold text-sm text-blue-900 hover:underline cursor-pointer leading-snug"
                      >
                        Advisory on Biometric-Based Aadhaar Authentication for GST Registration
                      </h3>
                      <div className="text-slate-400 text-[11px] mt-1 font-mono">Sep 28th, 2026</div>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                      REGISTRATION
                    </span>
                  </div>
                  <p className="text-slate-600 mt-2 text-[11px] leading-relaxed">
                    Applicants selected based on data analytics risk parameters may be prompted for biometric verification at designated GST Suvidha Kendras.
                  </p>
                </div>

                {/* News 3 */}
                <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-xs hover:shadow-md transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        onClick={() => setActiveTab('gstr-3b')}
                        className="font-bold text-sm text-blue-900 hover:underline cursor-pointer leading-snug"
                      >
                        Advisory on Hard-locking of Auto-Populated Liability in Form GSTR-3B
                      </h3>
                      <div className="text-slate-400 text-[11px] mt-1 font-mono">Sep 15th, 2026</div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                      RETURNS
                    </span>
                  </div>
                  <p className="text-slate-600 mt-2 text-[11px] leading-relaxed">
                    Auto-populated figures from GSTR-1 into Table 3.1 of GSTR-3B will highlight downward variances in red to ensure tax compliance with Rule 88C.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Popular Help Topics (5 cols) matching screenshot */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border-b-2 border-slate-200 pb-2">
                <h2 className="text-base font-bold text-[#00274D] uppercase tracking-wide">
                  Popular Help Topics
                </h2>
              </div>

              {/* Accordion Box */}
              <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden text-xs">
                {helpTopics.map((topic, idx) => {
                  const isOpen = activeHelpIndex === idx;

                  return (
                    <div key={idx} className="transition">
                      <button
                        onClick={() => setActiveHelpIndex(isOpen ? null : idx)}
                        className="w-full text-left p-3.5 flex items-center justify-between hover:bg-slate-50 font-semibold text-slate-800 transition"
                      >
                        <span className="pr-2">{topic.title}</span>
                        <ChevronRight
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-90 text-blue-600' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-slate-600 text-[11px] leading-relaxed bg-slate-50/60 space-y-2 border-t border-slate-100">
                          <p>{topic.content}</p>
                          <button
                            onClick={() => setActiveTab(topic.actionTab)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded text-[11px] flex items-center gap-1 shadow-xs transition"
                          >
                            <span>{topic.actionLabel}</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quick 1-Click Practice Login Box */}
              <div className="bg-gradient-to-br from-blue-900 to-[#00274D] text-white rounded-xl p-5 shadow-md space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Interactive GST Practice Simulator</span>
                </div>
                <p className="text-xs text-blue-200 leading-relaxed">
                  Ready to test your skills? Log in to your simulated taxpayer account with preloaded invoices, ledgers, and return filing tools.
                </p>
                <div className="pt-1 flex flex-wrap gap-2">
                  <button
                    onClick={onOpenLogin}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold px-4 py-2 rounded-lg text-xs shadow-sm transition"
                  >
                    Open Simulator Login &rarr;
                  </button>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-2 rounded-lg text-xs border border-white/20 transition"
                  >
                    View Taxpayer Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Taxpayer Services Cards */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-base font-bold text-[#00274D] uppercase tracking-wide">
              Quick Taxpayer Services (Practice Modules)
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
              <button
                onClick={() => setSearchModalOpen(true)}
                className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl shadow-xs transition flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition">
                  <Search className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-800">Search Taxpayer</span>
                <span className="text-[10px] text-slate-500">By GSTIN or PAN</span>
              </button>

              <button
                onClick={() => setActiveTab('registration')}
                className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl shadow-xs transition flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-800">New Registration</span>
                <span className="text-[10px] text-slate-500">Form REG-01</span>
              </button>

              <button
                onClick={() => setActiveTab('returns-hub')}
                className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl shadow-xs transition flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-800">File Returns</span>
                <span className="text-[10px] text-slate-500">GSTR-1, 2B, 3B</span>
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl shadow-xs transition flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-800">Create Challan</span>
                <span className="text-[10px] text-slate-500">Form PMT-06</span>
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl shadow-xs transition flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs text-slate-800">GST Calculator</span>
                <span className="text-[10px] text-slate-500">Tax, Interest, Late fee</span>
              </button>

              <button
                onClick={() => setActiveTab('tutor')}
                className="p-4 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 rounded-xl shadow-xs transition flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-110 transition">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-bold text-xs text-slate-800">AI GST Tutor</span>
                <span className="text-[10px] text-slate-500">Instant Rule Help</span>
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <SearchTaxpayerModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <MultiStateModal
        isOpen={multiStateModalOpen}
        onClose={() => setMultiStateModalOpen(false)}
        onStartRegistration={() => setActiveTab('registration')}
      />
    </div>
  );
};
