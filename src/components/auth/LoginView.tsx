import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { DEMO_USERS } from '../../data/initialDemoData';
import {
  ShieldAlert,
  Lock,
  User,
  KeyRound,
  Building,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  ArrowLeft,
} from 'lucide-react';

interface LoginViewProps {
  onBackToHome?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onBackToHome }) => {
  const { loginAs, setActiveTab } = useGstPortal();
  const [selectedUser, setSelectedUser] = useState(DEMO_USERS[0]);
  const [username, setUsername] = useState(DEMO_USERS[0].username);
  const [password, setPassword] = useState('demo12345');
  const [captchaInput, setCaptchaInput] = useState('849120');
  const [captchaCode, setCaptchaCode] = useState('849120');
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [newRegUsername, setNewRegUsername] = useState('');
  const [newRegGstin, setNewRegGstin] = useState('10AABCE9999P1Z8');
  const [showAudioHint, setShowAudioHint] = useState(false);

  const handleAudioCaptcha = () => {
    setShowAudioHint(true);
    setTimeout(() => setShowAudioHint(false), 4000);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(captchaCode.split('').join(' '));
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRefreshCaptcha = () => {
    const codes = ['849120', '392817', '614209', '751842', '204918'];
    const next = codes[Math.floor(Math.random() * codes.length)];
    setCaptchaCode(next);
    setCaptchaInput(next);
  };

  const handleSelectPreset = (user: (typeof DEMO_USERS)[0]) => {
    setSelectedUser(user);
    setUsername(user.username);
    setPassword('demo12345');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedUser);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F5F8FA] flex flex-col justify-between font-sans">
      <div>
        {/* Top Accessibility Bar */}
        <div className="bg-[#051C33] text-slate-300 text-[11px] py-1 px-4 border-b border-blue-950">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  if (onBackToHome) onBackToHome();
                  else setActiveTab('home');
                }}
                className="hover:text-white flex items-center gap-1 font-bold text-amber-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Portal Home (gst.gov.in)
              </button>
            </div>
            <div className="text-slate-400">
              <span className="hidden sm:inline">GST Portal Login Simulator • </span>
              <span className="bg-amber-400/20 text-amber-300 px-2 py-0.2 rounded font-bold text-[10px]">
                SANDBOX
              </span>
            </div>
          </div>
        </div>

        {/* Navy Header matching screenshot */}
        <header className="bg-[#00274D] text-white py-3.5 px-4 shadow-sm border-b border-[#031c36]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else setActiveTab('home');
              }}
            >
              {/* Ashoka Emblem */}
              <div className="w-10 h-12 shrink-0 flex flex-col items-center justify-center">
                <svg viewBox="0 0 100 120" className="w-8 h-10 fill-current text-amber-100/90">
                  <path d="M50 5 C45 5 40 10 40 18 C40 22 43 25 46 27 C42 29 38 33 38 38 C38 45 44 50 50 50 C56 50 62 45 62 38 C62 33 58 29 54 27 C57 25 60 22 60 18 C60 10 55 5 50 5 Z" />
                  <path d="M28 20 C24 20 20 24 20 30 C20 34 23 37 26 39 C23 42 20 46 20 52 C20 59 26 64 32 64 C36 64 40 61 42 58 C40 54 39 49 39 44 C39 36 43 30 48 26 C45 22 40 20 35 20 Z" />
                  <path d="M72 20 C67 20 62 22 59 26 C64 30 68 36 68 44 C68 49 67 54 65 58 C67 61 71 64 75 64 C81 64 87 59 87 52 C87 46 84 42 81 39 C84 37 87 34 87 30 C87 24 83 20 79 20 Z" />
                  <rect x="22" y="68" width="56" height="8" rx="2" fill="currentColor" opacity="0.9" />
                  <circle cx="50" cy="84" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <rect x="15" y="96" width="70" height="7" rx="1.5" fill="currentColor" />
                  <rect x="10" y="106" width="80" height="5" rx="1" fill="currentColor" />
                </svg>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
                  Goods and Services Tax
                </h1>
                <p className="text-xs text-blue-200">
                  Government of India, States and Union Territories
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (onBackToHome) onBackToHome();
                else setActiveTab('home');
              }}
              className="bg-white hover:bg-slate-100 text-[#00274D] font-bold text-xs px-4 py-2 rounded-xs border border-white shadow-xs transition uppercase"
            >
              Portal Home
            </button>
          </div>
        </header>

        {/* Educational Safety Banner */}
        <div className="bg-[#FFF4E5] border-b border-[#FFE2B8] py-2 px-4 text-xs">
          <div className="max-w-4xl mx-auto flex items-center gap-2.5 text-amber-950 font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Educational Practice Simulator:</strong> This login is purely a simulated practice
              interface. Never enter real taxpayer passwords, Aadhaar, or bank details. Use the 1-click
              demo accounts provided below.
            </span>
          </div>
        </div>

        {/* Main Login Card Area */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left: Official-style Log in Form (7 cols) */}
            <div className="md:col-span-7 bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
              <div className="bg-[#082F57] text-white px-5 py-3 font-bold text-sm tracking-wide">
                Log in
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
                {/* Username */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Username <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter username"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-600 focus:outline-none text-slate-800"
                  />
                </div>

                {/* Captcha Box matching official GST portal */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Type the characters you see in the image below <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-3 mb-2">
                    {/* Simulated Captcha Image */}
                    <div className="bg-slate-100 border border-slate-300 px-4 py-2 rounded font-mono text-base font-black tracking-widest select-none text-slate-800 italic transform -rotate-1 relative overflow-hidden shadow-inner">
                      <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:6px_6px] opacity-20"></div>
                      <span className="relative z-10">{captchaCode}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleRefreshCaptcha}
                      className="p-2 border border-slate-300 rounded hover:bg-slate-100 text-slate-600 transition"
                      title="Reload Captcha"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleAudioCaptcha}
                      className="p-2 border border-slate-300 rounded hover:bg-slate-100 text-slate-600 transition"
                      title="Audio Captcha"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  {showAudioHint && (
                    <div className="text-[11px] text-blue-800 bg-blue-50 border border-blue-200 rounded px-2 py-1 flex items-center gap-1.5 animate-fadeIn">
                      <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>Audio playback: <strong>{captchaCode.split('').join(' ')}</strong></span>
                    </div>
                  )}
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                    placeholder="Enter characters"
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono font-semibold"
                  />
                </div>

                {/* Links */}
                <div className="flex items-center justify-between text-[11px] text-blue-700 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Remember me</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="hover:underline"
                    >
                      Forgot Username?
                    </button>
                    <span>|</span>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#1E40AF] hover:bg-blue-700 text-white font-extrabold py-2.5 rounded shadow-sm text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>LOGIN</span>
                </button>

                <div className="pt-2 text-center text-[11px] text-slate-600 border-t border-slate-100">
                  First time login?{' '}
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(true)}
                    className="text-blue-700 hover:underline font-bold"
                  >
                    If you are logging in for the first time, click here to log in.
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Quick 1-Click Practice Accounts (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-800 uppercase tracking-wide">
                    Preloaded Practice Accounts
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    1-Click Load
                  </span>
                </div>

                <p className="text-slate-500 text-[11px]">
                  Select any fictional taxpayer scenario to auto-populate credentials and test returns.
                </p>

                <div className="space-y-2">
                  {DEMO_USERS.map((user) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleSelectPreset(user)}
                      className={`w-full text-left p-3 rounded border transition flex items-center justify-between text-xs ${
                        selectedUser.id === user.id
                          ? 'border-blue-600 bg-blue-50/70 font-semibold'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                          {user.demoGstin}
                        </div>
                        <div className="text-[10px] text-blue-700">{user.companyName}</div>
                      </div>
                      {selectedUser.id === user.id && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                  Default password for all demo accounts: <code className="bg-slate-100 px-1 py-0.5 font-mono font-bold text-slate-800">demo12345</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Simulator Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-2xl text-xs space-y-3">
            <div className="font-bold text-sm text-slate-900">Forgot Credentials (Simulator)</div>
            <p className="text-slate-600 leading-relaxed text-xs">
              In this educational environment, all demo accounts use:
              <br />
              <strong>Username:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">{selectedUser.username}</code>
              <br />
              <strong>Password:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">demo12345</code>
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Demo Account Simulator Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-2xl text-xs space-y-3">
            <div className="font-bold text-sm text-slate-900">First Time Demo User Setup</div>
            <p className="text-slate-600">
              Create a personalized fictional account to practice your return filings and quizzes.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={newRegUsername}
                  onChange={(e) => setNewRegUsername(e.target.value)}
                  placeholder="e.g. Anjali Sharma"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Assign Fictional GSTIN</label>
                <input
                  type="text"
                  value={newRegGstin}
                  onChange={(e) => setNewRegGstin(e.target.value.toUpperCase())}
                  placeholder="10AABCE9999P1Z8"
                  className="w-full px-3 py-2 border border-slate-300 rounded text-xs font-mono uppercase"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const newUser = {
                    id: `user-${Date.now()}`,
                    name: newRegUsername || 'Demo Trainee',
                    username: (newRegUsername || 'trainee').toLowerCase().replace(/\s+/g, '_'),
                    email: 'trainee@demo-practice.in',
                    role: 'student' as const,
                    demoGstin: newRegGstin || '10ABCDE1234F1Z5',
                    companyName: 'Custom Practice Entity',
                  };
                  loginAs(newUser);
                  setShowRegisterModal(false);
                  setActiveTab('dashboard');
                }}
                className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded"
              >
                Create &amp; Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#00274D] text-slate-400 py-4 px-4 border-t border-blue-900 text-center text-[11px]">
        GST PRACTICE &amp; EDUCATIONAL SIMULATOR • NOT AN OFFICIAL GOVERNMENT WEBSITE • USE DEMO DATA ONLY
      </footer>
    </div>
  );
};
