import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { DEMO_USERS } from '../../data/initialDemoData';
import {
  Settings,
  Users,
  Building2,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Database,
  Sliders,
  Award,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    companies,
    activeCompany,
    switchCompany,
    gstr1,
    gstr3b,
    purchaseRegister,
    gstr2bInvoices,
    notices,
    quizScores,
    scenarioResults,
    resetSimulatorState,
  } = useGstPortal();

  const [adminTab, setAdminTab] = useState<'overview' | 'companies' | 'users' | 'returns' | 'progress'>('overview');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const handleReset = () => {
    resetSimulatorState();
    setConfirmResetOpen(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Simulator Administration &amp; Content Management
              </h2>
              <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Instructor Dashboard
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Control demo companies, examine user return entries, inspect quiz scores, and manage sandbox datasets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {confirmResetOpen ? (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 p-1.5 rounded-lg text-xs">
                <span className="text-rose-900 font-semibold px-1">Reset all data to defaults?</span>
                <button
                  onClick={handleReset}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setConfirmResetOpen(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmResetOpen(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Entire Simulator
              </button>
            )}
          </div>
        </div>
      </div>

      {resetSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Simulator database restored to pristine initial practice state!
        </div>
      )}

      {/* Admin Tabs */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Sandbox Overview' },
            { id: 'companies', label: 'Demo Companies' },
            { id: 'users', label: 'Demo Users' },
            { id: 'returns', label: 'Returns Data Store' },
            { id: 'progress', label: 'Student Progress & Scores' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setAdminTab(t.id as any)}
              className={`px-5 py-3 border-b-2 transition ${
                adminTab === t.id
                  ? 'border-blue-600 text-blue-900 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {adminTab === 'overview' && (
          <div className="p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Simulator Health &amp; Entities Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-400">Preloaded Companies</span>
                <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">{companies.length}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-400">Preloaded Users</span>
                <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">{DEMO_USERS.length}</div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-400">GSTR-1 Invoices</span>
                <div className="text-lg font-bold text-blue-800 font-mono mt-0.5">
                  {gstr1.b2bInvoices.length} B2B Invoices
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-400">GSTR-2B Purchases</span>
                <div className="text-lg font-bold text-indigo-800 font-mono mt-0.5">
                  {gstr2bInvoices.length} Purchase Invoices
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-1.5 text-blue-950">
              <div className="font-bold text-xs">Sandbox Environment Safeguards:</div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-blue-900">
                <li>Strict client/server isolation with fictional GSTINs and PANs.</li>
                <li>Zero connection to government APIs or real taxpayer credentials.</li>
                <li>All submissions generate simulated ARNs for learning verification.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Companies */}
        {adminTab === 'companies' && (
          <div className="p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Demo Companies Directory</h3>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {companies.map((comp) => (
                <div key={comp.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
                  <div>
                    <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                      {comp.tradeName}
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-normal font-mono">
                        {comp.gstin}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">
                      {comp.legalName} • {comp.state} ({comp.stateCode}) • {comp.taxpayerType} Taxpayer
                    </div>
                  </div>
                  <button
                    onClick={() => switchCompany(comp.id)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      comp.id === activeCompany.id
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {comp.id === activeCompany.id ? 'Currently Active' : 'Switch to This'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Users */}
        {adminTab === 'users' && (
          <div className="p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Preloaded Practice Accounts</h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">User Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Assigned GSTIN</th>
                    <th className="p-3">Associated Company</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {DEMO_USERS.map((u) => (
                    <tr key={u.id}>
                      <td className="p-3 font-sans font-semibold text-slate-800">{u.name}</td>
                      <td className="p-3 font-sans capitalize">{u.role}</td>
                      <td className="p-3 text-blue-900 font-bold">{u.demoGstin}</td>
                      <td className="p-3 font-sans">{u.companyName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Progress */}
        {adminTab === 'progress' && (
          <div className="p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Student Progress &amp; Practice Scores</h3>
            <div className="space-y-3">
              <div className="font-semibold text-slate-700">Practice Scenario Submissions:</div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {Object.keys(scenarioResults).length === 0 ? (
                  <div className="p-4 text-slate-400 italic">
                    No scenarios completed yet in this session. Visit Practice Scenarios tab to solve cases.
                  </div>
                ) : (
                  Object.keys(scenarioResults).map((scenId) => (
                    <div key={scenId} className="p-3 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{scenId}</span>
                      <span className="font-mono font-bold text-emerald-700">
                        Score: {scenarioResults[scenId].score}%
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="font-semibold text-slate-700 pt-3">Quiz Results:</div>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {Object.keys(quizScores).length === 0 ? (
                  <div className="p-4 text-slate-400 italic">
                    No quizzes taken yet. Visit Learning Center to take 5-question module quizzes.
                  </div>
                ) : (
                  Object.keys(quizScores).map((lesId) => (
                    <div key={lesId} className="p-3 flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{lesId}</span>
                      <span className="font-mono font-bold text-emerald-700">
                        Score: {quizScores[lesId]}%
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
