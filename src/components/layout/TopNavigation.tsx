import React, { useState, useRef, useEffect } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import {
  LayoutDashboard,
  UserCheck,
  FileSpreadsheet,
  CreditCard,
  RotateCcw,
  BookOpenCheck,
  FileCheck,
  AlertCircle,
  Calculator,
  GraduationCap,
  Sparkles,
  Settings,
  Scale,
  ChevronDown,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const TopNavigation: React.FC = () => {
  const { activeTab, setActiveTab, notices, gstr1, gstr3b, activeCompany } = useGstPortal();
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeServicesCategory, setActiveServicesCategory] = useState<
    'registration' | 'ledgers' | 'returns' | 'payments' | 'userServices' | 'refunds'
  >('returns');

  const servicesRef = useRef<HTMLDivElement>(null);
  const pendingNoticesCount = notices.filter((n) => n.status === 'Pending Reply').length;

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#0B3B60] text-white border-b-2 border-[#00A389] sticky top-0 z-40 shadow-md font-sans text-xs">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-none py-0.5">
          {/* Main Navigation Links matching real GST portal */}
          <div className="flex items-center space-x-1">
            {/* 1. Portal Home */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-1 px-3 py-2.5 font-bold transition ${
                activeTab === 'home'
                  ? 'bg-[#00274D] text-amber-300 border-b-2 border-amber-400'
                  : 'text-slate-200 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <span>🏛️ PORTAL HOME</span>
            </button>

            {/* 2. Dashboard */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-2.5 font-bold uppercase tracking-wider transition ${
                activeTab === 'dashboard'
                  ? 'bg-[#00274D] text-white border-b-2 border-[#00A389]'
                  : 'text-slate-200 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>DASHBOARD</span>
            </button>

            {/* 3. Official Cascading SERVICES Mega-Menu */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                onMouseEnter={() => setServicesMenuOpen(true)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 font-bold uppercase tracking-wider transition ${
                  servicesMenuOpen ||
                  [
                    'registration',
                    'ledgers',
                    'returns-hub',
                    'gstr-1',
                    'gstr-2b',
                    'gstr-3b',
                    'reconciliation',
                    'payments',
                    'refunds',
                    'notices',
                  ].includes(activeTab)
                    ? 'bg-[#00274D] text-white border-b-2 border-[#00A389]'
                    : 'text-slate-200 hover:bg-[#082D4B] hover:text-white'
                }`}
              >
                <span>SERVICES</span>
                <ChevronDown className="w-3 h-3 text-slate-300" />
              </button>

              {/* Real GST Portal Cascading Dropdown */}
              {servicesMenuOpen && (
                <div
                  onMouseLeave={() => setServicesMenuOpen(false)}
                  className="absolute left-0 mt-0 w-[580px] bg-white text-slate-800 rounded-b shadow-2xl border border-slate-300 z-50 flex overflow-hidden animate-fadeIn"
                >
                  {/* Left Column: Categories */}
                  <div className="w-48 bg-[#F0F4F8] border-r border-slate-200 py-2">
                    {[
                      { id: 'registration', label: 'Registration' },
                      { id: 'ledgers', label: 'Ledgers' },
                      { id: 'returns', label: 'Returns' },
                      { id: 'payments', label: 'Payments' },
                      { id: 'userServices', label: 'User Services' },
                      { id: 'refunds', label: 'Refunds' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onMouseEnter={() => setActiveServicesCategory(cat.id as any)}
                        onClick={() => setActiveServicesCategory(cat.id as any)}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition ${
                          activeServicesCategory === cat.id
                            ? 'bg-white text-blue-900 border-l-4 border-l-[#0B3B60] font-bold shadow-2xs'
                            : 'text-slate-700 hover:bg-slate-200/70'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <ChevronRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>

                  {/* Right Column: Sub-services */}
                  <div className="flex-1 p-4 bg-white space-y-3">
                    {/* Category: Registration */}
                    {activeServicesCategory === 'registration' && (
                      <div>
                        <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                          Registration Services (Form GST REG)
                        </div>
                        <ul className="space-y-1 text-xs">
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('registration');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded font-medium flex items-center justify-between"
                            >
                              <span>New Registration (Form GST REG-01)</span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Simulator</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('dashboard');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded"
                            >
                              Track Application Status (ARN)
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('notices');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded"
                            >
                              Application for Filing Clarifications (REG-03/REG-04)
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Category: Ledgers */}
                    {activeServicesCategory === 'ledgers' && (
                      <div>
                        <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                          Electronic Ledgers &amp; Registers
                        </div>
                        <ul className="space-y-1 text-xs">
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('ledgers');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded font-medium flex items-center justify-between"
                            >
                              <span>Electronic Cash Ledger (Form GST PMT-05)</span>
                              <span className="text-[10px] text-slate-400 font-mono">₹{activeCompany.stateCode}</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('ledgers');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded font-medium"
                            >
                              Electronic Credit Ledger (Form GST PMT-02)
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('ledgers');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded font-medium"
                            >
                              Electronic Liability Register (Form GST PMT-01)
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Category: Returns */}
                    {activeServicesCategory === 'returns' && (
                      <div>
                        <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                          GST Returns Filing
                        </div>
                        <ul className="space-y-1 text-xs">
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('returns-hub');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-900 font-bold rounded flex items-center justify-between"
                            >
                              <span>Returns Dashboard</span>
                              <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded font-normal">Hub</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('gstr-1');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded flex items-center justify-between"
                            >
                              <span>Details of Outward Supplies (GSTR-1)</span>
                              <span className={`text-[10px] px-1 rounded ${gstr1.status === 'Filed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                {gstr1.status}
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('gstr-2b');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded flex items-center justify-between"
                            >
                              <span>Auto-drafted ITC Statement (GSTR-2B)</span>
                              <span className="text-[10px] bg-slate-100 text-slate-600 px-1 rounded">Monthly</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('gstr-3b');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded flex items-center justify-between"
                            >
                              <span>Monthly Return (GSTR-3B)</span>
                              <span className={`text-[10px] px-1 rounded ${gstr3b.status === 'Filed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                {gstr3b.status}
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('reconciliation');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-blue-700 hover:text-blue-900 rounded font-semibold flex items-center justify-between"
                            >
                              <span>ITC Comparison &amp; Reconciliation (2B vs Books)</span>
                              <Scale className="w-3.5 h-3.5 text-amber-500" />
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Category: Payments */}
                    {activeServicesCategory === 'payments' && (
                      <div>
                        <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                          Payment of GST
                        </div>
                        <ul className="space-y-1 text-xs">
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('payments');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-900 font-bold rounded flex items-center justify-between"
                            >
                              <span>Create Challan (Form GST PMT-06)</span>
                              <span className="text-[10px] bg-blue-100 text-blue-800 px-1 rounded">Deposit</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('payments');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded"
                            >
                              Track Payment Status (CPIN / CIN)
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('payments');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded"
                            >
                              Payment History
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Category: User Services */}
                    {activeServicesCategory === 'userServices' && (
                      <div>
                        <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                          User Services &amp; Compliance Notices
                        </div>
                        <ul className="space-y-1 text-xs">
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('notices');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded flex items-center justify-between font-medium"
                            >
                              <span>View Notices and Orders</span>
                              {pendingNoticesCount > 0 && (
                                <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded-full">
                                  {pendingNoticesCount} Pending
                                </span>
                              )}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('calculator');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded"
                            >
                              GST &amp; Interest Calculator
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('profile');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded"
                            >
                              Search Taxpayer / My Profile
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* Category: Refunds */}
                    {activeServicesCategory === 'refunds' && (
                      <div>
                        <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider mb-2 border-b border-slate-100 pb-1">
                          Refunds Application (Section 54)
                        </div>
                        <ul className="space-y-1 text-xs">
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('refunds');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-900 font-bold rounded flex items-center justify-between"
                            >
                              <span>Application for Refund (Form GST RFD-01)</span>
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded">Apply</span>
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setActiveTab('refunds');
                                setServicesMenuOpen(false);
                              }}
                              className="w-full text-left py-1.5 px-2 hover:bg-blue-50 text-slate-700 hover:text-blue-900 rounded"
                            >
                              Track Application Status
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Returns Dashboard (Direct Portal Tab) */}
            <button
              onClick={() => setActiveTab('returns-hub')}
              className={`flex items-center gap-1.5 px-3 py-2.5 font-bold uppercase tracking-wider transition ${
                ['returns-hub', 'gstr-1', 'gstr-2b', 'gstr-3b'].includes(activeTab)
                  ? 'bg-[#00274D] text-white border-b-2 border-[#00A389]'
                  : 'text-slate-200 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>RETURNS DASHBOARD</span>
            </button>

            {/* 5. GSTR-1 Direct Tab */}
            <button
              onClick={() => setActiveTab('gstr-1')}
              className={`flex items-center gap-1 px-2.5 py-2.5 font-semibold transition ${
                activeTab === 'gstr-1'
                  ? 'bg-[#00274D] text-amber-300 border-b-2 border-amber-400'
                  : 'text-slate-300 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <span>GSTR-1</span>
              {gstr1.status === 'Filed' ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* 6. GSTR-2B Direct Tab */}
            <button
              onClick={() => setActiveTab('gstr-2b')}
              className={`flex items-center gap-1 px-2.5 py-2.5 font-semibold transition ${
                activeTab === 'gstr-2b'
                  ? 'bg-[#00274D] text-amber-300 border-b-2 border-amber-400'
                  : 'text-slate-300 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <span>GSTR-2B</span>
            </button>

            {/* 7. GSTR-3B Direct Tab */}
            <button
              onClick={() => setActiveTab('gstr-3b')}
              className={`flex items-center gap-1 px-2.5 py-2.5 font-semibold transition ${
                activeTab === 'gstr-3b'
                  ? 'bg-[#00274D] text-amber-300 border-b-2 border-amber-400'
                  : 'text-slate-300 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <span>GSTR-3B</span>
              {gstr3b.status === 'Filed' ? (
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              ) : (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </button>

            {/* 8. ITC Reconciliation */}
            <button
              onClick={() => setActiveTab('reconciliation')}
              className={`flex items-center gap-1 px-2.5 py-2.5 font-semibold transition ${
                activeTab === 'reconciliation'
                  ? 'bg-[#00274D] text-amber-300 border-b-2 border-amber-400'
                  : 'text-slate-300 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>2B RECON</span>
            </button>

            {/* 9. Ledgers */}
            <button
              onClick={() => setActiveTab('ledgers')}
              className={`flex items-center gap-1 px-2.5 py-2.5 font-semibold transition ${
                activeTab === 'ledgers'
                  ? 'bg-[#00274D] text-white border-b-2 border-[#00A389]'
                  : 'text-slate-300 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>LEDGERS</span>
            </button>

            {/* 10. Payments */}
            <button
              onClick={() => setActiveTab('payments')}
              className={`flex items-center gap-1 px-2.5 py-2.5 font-semibold transition ${
                activeTab === 'payments'
                  ? 'bg-[#00274D] text-white border-b-2 border-[#00A389]'
                  : 'text-slate-300 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>PAYMENTS</span>
            </button>

            {/* 11. Notices */}
            <button
              onClick={() => setActiveTab('notices')}
              className={`flex items-center gap-1 px-2.5 py-2.5 font-semibold transition ${
                activeTab === 'notices'
                  ? 'bg-[#00274D] text-white border-b-2 border-[#00A389]'
                  : 'text-slate-300 hover:bg-[#082D4B] hover:text-white'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-rose-300" />
              <span>NOTICES</span>
              {pendingNoticesCount > 0 && (
                <span className="bg-rose-500 text-white font-bold text-[9px] px-1 py-0.2 rounded-full">
                  {pendingNoticesCount}
                </span>
              )}
            </button>
          </div>

          {/* Educational & Practical Training Tools for Students */}
          <div className="flex items-center space-x-1 pl-2 border-l border-blue-800">
            {/* Practice Scenarios */}
            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-bold transition ${
                activeTab === 'practice'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100'
              }`}
            >
              <BookOpenCheck className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">PRACTICE LAB</span>
            </button>

            {/* Learning Center */}
            <button
              onClick={() => setActiveTab('learning')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-bold transition ${
                activeTab === 'learning'
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-blue-800/80 hover:bg-blue-700 text-blue-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">15 LESSONS</span>
            </button>

            {/* AI GST Tutor */}
            <button
              onClick={() => setActiveTab('tutor')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-bold transition ${
                activeTab === 'tutor'
                  ? 'bg-indigo-700 text-amber-200 border border-amber-300/40 shadow-2xs'
                  : 'bg-indigo-900/90 hover:bg-indigo-800 text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>AI TUTOR</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
