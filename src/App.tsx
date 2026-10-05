import React, { useState } from 'react';
import { GstPortalProvider, useGstPortal } from './context/GstPortalContext';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { Header } from './components/layout/Header';
import { TopNavigation } from './components/layout/TopNavigation';
import { PortalHomeView } from './components/home/PortalHomeView';
import { LoginView } from './components/auth/LoginView';
import { DashboardView } from './components/dashboard/DashboardView';
import { RegistrationWizard } from './components/registration/RegistrationWizard';
import { ReturnsHub } from './components/returns/ReturnsHub';
import { Gstr1View } from './components/returns/Gstr1View';
import { Gstr2bView } from './components/returns/Gstr2bView';
import { Gstr3bView } from './components/returns/Gstr3bView';
import { ReconciliationView } from './components/reconciliation/ReconciliationView';
import { LedgersView } from './components/ledgers/LedgersView';
import { PaymentsView } from './components/payments/PaymentsView';
import { RefundsView } from './components/refunds/RefundsView';
import { NoticesView } from './components/notices/NoticesView';
import { GstCalculatorView } from './components/calculator/GstCalculatorView';
import { PracticeLabView } from './components/practice/PracticeLabView';
import { LearningCenterView } from './components/learning/LearningCenterView';
import { AIGstTutorView } from './components/tutor/AIGstTutorView';
import { AdminView } from './components/admin/AdminView';
import { ProfileView } from './components/profile/ProfileView';

const AppContent: React.FC = () => {
  const { isLoggedIn, activeTab, setActiveTab } = useGstPortal();

  // 1. If activeTab is 'home', show the authentic GST Portal homepage matching user screenshot
  if (activeTab === 'home') {
    return (
      <div className="flex flex-col min-h-screen">
        <DisclaimerBanner />
        <PortalHomeView onOpenLogin={() => setActiveTab('login')} />
        <PortalFooter />
      </div>
    );
  }

  // 2. If activeTab is 'login', show the authentic GST Login Page
  if (activeTab === 'login' || !isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <DisclaimerBanner />
        <LoginView onBackToHome={() => setActiveTab('home')} />
        <PortalFooter />
      </div>
    );
  }

  // 3. Taxpayer Portal Workspace (Dashboard, Returns, Ledgers, Reconciliation, Registration, etc.)
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans">
      <div>
        {/* Prominent Educational Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Portal Header */}
        <Header />

        {/* Familiar Portal Style Navigation */}
        <TopNavigation />

        {/* Main Workspace Area */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'registration' && <RegistrationWizard />}
          {activeTab === 'returns-hub' && <ReturnsHub />}
          {activeTab === 'gstr-1' && <Gstr1View />}
          {activeTab === 'gstr-2b' && <Gstr2bView />}
          {activeTab === 'gstr-3b' && <Gstr3bView />}
          {activeTab === 'reconciliation' && <ReconciliationView />}
          {activeTab === 'ledgers' && <LedgersView />}
          {activeTab === 'payments' && <PaymentsView />}
          {activeTab === 'refunds' && <RefundsView />}
          {activeTab === 'notices' && <NoticesView />}
          {activeTab === 'calculator' && <GstCalculatorView />}
          {activeTab === 'practice' && <PracticeLabView />}
          {activeTab === 'learning' && <LearningCenterView />}
          {activeTab === 'tutor' && <AIGstTutorView />}
          {activeTab === 'admin' && <AdminView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>
      </div>

      <PortalFooter />
    </div>
  );
};

// Official-style GST Portal Footer
const PortalFooter: React.FC = () => {
  return (
    <footer className="bg-[#00274D] text-slate-300 py-8 border-t-4 border-[#00A389] text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Columns Grid matching official GST Portal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-6 border-b border-blue-900/80 text-[11px]">
          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-2.5">About GST</div>
            <ul className="space-y-1.5 text-slate-400">
              <li className="hover:text-white cursor-pointer">GST Council Structure</li>
              <li className="hover:text-white cursor-pointer">GST History &amp; Implementation</li>
              <li className="hover:text-white cursor-pointer">GST Systems Overview</li>
              <li className="hover:text-white cursor-pointer">GST Act &amp; Statutory Rules</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-2.5">GST Sites</div>
            <ul className="space-y-1.5 text-slate-400">
              <li className="hover:text-white cursor-pointer">Central Board of Indirect Taxes (CBIC)</li>
              <li className="hover:text-white cursor-pointer">e-Way Bill Portal Simulator</li>
              <li className="hover:text-white cursor-pointer">e-Invoice Trial Portal</li>
              <li className="hover:text-white cursor-pointer">GST Statistics Portal</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-2.5">Help &amp; Support</div>
            <ul className="space-y-1.5 text-slate-400">
              <li className="hover:text-white cursor-pointer">Help Desk &amp; FAQs</li>
              <li className="hover:text-white cursor-pointer">Grievance Redressal Portal</li>
              <li className="hover:text-white cursor-pointer">System Requirements</li>
              <li className="hover:text-white cursor-pointer">GST Suvidha Provider (GSP)</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider mb-2.5">Related Links</div>
            <ul className="space-y-1.5 text-slate-400">
              <li className="hover:text-white cursor-pointer">National Portal of India (india.gov.in)</li>
              <li className="hover:text-white cursor-pointer">Income Tax e-Filing Portal</li>
              <li className="hover:text-white cursor-pointer">Ministry of Corporate Affairs (MCA)</li>
              <li className="hover:text-white cursor-pointer">Digital India Initiative</li>
            </ul>
          </div>
        </div>

        {/* Safety & Compliance Notice */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-900/60 pb-4">
          <div>
            <div className="font-extrabold text-white text-sm tracking-wide">
              GST PRACTICE &amp; EDUCATIONAL SIMULATOR
            </div>
            <div className="text-[11px] text-blue-200 mt-0.5">
              Educational Practice Portal – This is a Demo/Simulator and is NOT the official GST Portal.
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="bg-amber-400 text-slate-900 font-extrabold px-2.5 py-1 rounded">
              NOT AN OFFICIAL GOVERNMENT WEBSITE
            </span>
            <span className="bg-blue-800 text-white font-bold px-2.5 py-1 rounded">
              USE DEMO DATA ONLY
            </span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span>
            © 2026 Goods and Services Tax Practice Simulator • Designed for Training, Accounts Students &amp; Tax Practitioners
          </span>
          <span>
            Built strictly for training without connection to live government servers or actual taxpayer accounts.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <GstPortalProvider>
      <AppContent />
    </GstPortalProvider>
  );
}
