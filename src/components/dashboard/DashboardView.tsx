import React from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { PortalBreadcrumb } from '../layout/PortalBreadcrumb';
import {
  Building2,
  FileSpreadsheet,
  AlertTriangle,
  Scale,
  CreditCard,
  FileCheck,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  Search,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    activeCompany,
    currentFY,
    currentPeriod,
    gstr1,
    gstr3b,
    gstr2bInvoices,
    cashLedger,
    creditLedger,
    notices,
    setActiveTab,
  } = useGstPortal();

  // Summary calculations
  const pendingNotices = notices.filter((n) => n.status === 'Pending Reply');
  const filedReturnsCount = (gstr1.status === 'Filed' ? 1 : 0) + (gstr3b.status === 'Filed' ? 1 : 0);
  const pendingReturnsCount = (gstr1.status !== 'Filed' ? 1 : 0) + (gstr3b.status !== 'Filed' ? 1 : 0);

  // Eligible ITC in 2B
  const total2bItc = gstr2bInvoices.reduce(
    (acc, cur) => acc + (cur.itcEligibility === 'Eligible' ? cur.igst + cur.cgst + cur.sgst : 0),
    0
  );

  // Current liability from 3B Table 3.1
  const totalLiability =
    gstr3b.table3_1.outwardTaxable.igst +
    gstr3b.table3_1.outwardTaxable.cgst +
    gstr3b.table3_1.outwardTaxable.sgst;

  return (
    <div className="space-y-4">
      {/* Official Breadcrumb & Taxpayer Bar */}
      <PortalBreadcrumb items={[{ label: 'Dashboard' }]} />

      {/* Official Quick Action Buttons Bar matching real GST Portal */}
      <div className="bg-[#00274D] rounded p-3 text-white flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-amber-300 font-bold text-xs uppercase tracking-wider">Quick Actions:</span>
          <button
            onClick={() => setActiveTab('returns-hub')}
            className="bg-[#0B3B60] hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded text-xs border border-blue-400/30 transition shadow-2xs flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
            <span>FILE RETURNS</span>
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className="bg-[#0B3B60] hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded text-xs border border-blue-400/30 transition shadow-2xs flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-300" />
            <span>PAY TAX (CHALLAN)</span>
          </button>
          <button
            onClick={() => setActiveTab('reconciliation')}
            className="bg-[#0B3B60] hover:bg-blue-800 text-white font-bold px-3 py-1.5 rounded text-xs border border-blue-400/30 transition shadow-2xs flex items-center gap-1.5"
          >
            <Scale className="w-3.5 h-3.5 text-amber-300" />
            <span>2B RECONCILIATION</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-300 text-[11px]">AATO (Turnover):</span>
          <span className="bg-blue-950 font-mono font-bold text-amber-300 px-2 py-0.5 rounded border border-blue-800">
            ₹{activeCompany.turnoverRange}
          </span>
        </div>
      </div>
      {/* Top Banner Alert / Notices Ticker */}
      {pendingNotices.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <div className="text-xs font-bold text-amber-950">
                Action Required: {pendingNotices.length} Statutory Educational Notice(s) Pending
              </div>
              <div className="text-[11px] text-amber-800">
                {pendingNotices[0].noticeType} ({pendingNotices[0].sectionReference}) — Due Date:{' '}
                {pendingNotices[0].dueDate}
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('notices')}
            className="text-xs bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1.5 rounded shadow-xs transition"
          >
            Review &amp; Reply
          </button>
        </div>
      )}

      {/* Taxpayer Information Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {activeCompany.tradeName}
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {activeCompany.status}
              </span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {activeCompany.taxpayerType} Taxpayer
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Legal Name: <strong className="text-slate-700">{activeCompany.legalName}</strong> • Constitution:{' '}
              {activeCompany.constitution}
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-500">GSTIN</div>
            <div className="text-base font-mono font-extrabold text-[#0B3B60] tracking-wider">
              {activeCompany.gstin}
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <div className="text-slate-400 font-medium">State &amp; Code</div>
            <div className="font-semibold text-slate-800 mt-0.5">
              {activeCompany.state} ({activeCompany.stateCode})
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-medium">Financial Year</div>
            <div className="font-semibold text-slate-800 mt-0.5">{currentFY}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium">Current Tax Period</div>
            <div className="font-semibold text-blue-700 mt-0.5">{currentPeriod}</div>
          </div>
          <div>
            <div className="text-slate-400 font-medium">Authorized Signatory</div>
            <div className="font-semibold text-slate-800 mt-0.5 truncate">
              {activeCompany.authorizedSignatory}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row: Ledgers & Tax Liability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cash Ledger */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Electronic Cash Ledger</span>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
              Available
            </span>
          </div>
          <div className="text-xl font-extrabold text-slate-900 font-mono">
            ₹{cashLedger.totalBalance.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
            <span>IGST: ₹{cashLedger.igst.total.toLocaleString('en-IN')}</span>
            <span>CGST+SGST: ₹{(cashLedger.cgst.total + cashLedger.sgst.total).toLocaleString('en-IN')}</span>
          </div>
          <button
            onClick={() => setActiveTab('ledgers')}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 mt-2 block"
          >
            View Cash Passbook &rarr;
          </button>
        </div>

        {/* Credit Ledger */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Electronic Credit Ledger</span>
            <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">
              ITC Balance
            </span>
          </div>
          <div className="text-xl font-extrabold text-blue-900 font-mono">
            ₹{creditLedger.total.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
            <span>IGST: ₹{creditLedger.igst.toLocaleString('en-IN')}</span>
            <span>CGST+SGST: ₹{(creditLedger.cgst + creditLedger.sgst).toLocaleString('en-IN')}</span>
          </div>
          <button
            onClick={() => setActiveTab('ledgers')}
            className="text-[11px] font-bold text-blue-600 hover:text-blue-800 mt-2 block"
          >
            View Credit Ledger &rarr;
          </button>
        </div>

        {/* Tax Liability */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Gross Tax Liability ({currentPeriod})</span>
            <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded">
              3B Payable
            </span>
          </div>
          <div className="text-xl font-extrabold text-amber-900 font-mono">
            ₹{totalLiability.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
            <span>IGST: ₹{gstr3b.table3_1.outwardTaxable.igst.toLocaleString('en-IN')}</span>
            <span>
              CGST+SGST: ₹
              {(
                gstr3b.table3_1.outwardTaxable.cgst + gstr3b.table3_1.outwardTaxable.sgst
              ).toLocaleString('en-IN')}
            </span>
          </div>
          <button
            onClick={() => setActiveTab('gstr-3b')}
            className="text-[11px] font-bold text-amber-700 hover:text-amber-900 mt-2 block"
          >
            Offset in GSTR-3B &rarr;
          </button>
        </div>

        {/* GSTR-2B Auto ITC */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>GSTR-2B Statement ITC</span>
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">
              Auto Drafted
            </span>
          </div>
          <div className="text-xl font-extrabold text-indigo-900 font-mono">
            ₹{total2bItc.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
            <span>Invoices: {gstr2bInvoices.length}</span>
            <span>Generated: 14th of month</span>
          </div>
          <button
            onClick={() => setActiveTab('reconciliation')}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 mt-2 block"
          >
            Reconcile with Books &rarr;
          </button>
        </div>
      </div>

      {/* Return Filing Status Matrix */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Return Filing Calendar &amp; Status Matrix ({currentPeriod})
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Statutory timeline for monthly compliance • All returns marked SIMULATED
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
              {filedReturnsCount} Filed
            </span>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
              {pendingReturnsCount} Pending
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Form</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Statutory Due Date</th>
                <th className="py-3 px-4">Filing Status</th>
                <th className="py-3 px-4">Simulated ARN</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* GSTR-1 */}
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-blue-900">GSTR-1</td>
                <td className="py-3 px-4 text-slate-600">
                  Details of Outward Supplies of Goods or Services
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">11th Oct 2024</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      gstr1.status === 'Filed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {gstr1.status === 'Filed' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {gstr1.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-700">
                  {gstr1.arn || <span className="text-slate-400 italic">Not Filed</span>}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setActiveTab('gstr-1')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded text-xs transition"
                  >
                    {gstr1.status === 'Filed' ? 'View Summary' : 'Prepare GSTR-1'}
                  </button>
                </td>
              </tr>

              {/* GSTR-2B */}
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-indigo-900">GSTR-2B</td>
                <td className="py-3 px-4 text-slate-600">
                  Auto-drafted ITC Statement (Based on supplier filings)
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">14th Oct 2024</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                    <CheckCircle2 className="w-3 h-3" />
                    Generated
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-500">Auto-Statement</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setActiveTab('gstr-2b')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1 rounded text-xs transition"
                  >
                    View ITC Data
                  </button>
                </td>
              </tr>

              {/* GSTR-3B */}
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-amber-900">GSTR-3B</td>
                <td className="py-3 px-4 text-slate-600">
                  Monthly Summary Return &amp; Net Tax Payment
                </td>
                <td className="py-3 px-4 font-mono text-slate-600">20th Oct 2024</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      gstr3b.status === 'Filed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {gstr3b.status === 'Filed' ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {gstr3b.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-700">
                  {gstr3b.arn || <span className="text-slate-400 italic">Not Filed</span>}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setActiveTab('gstr-3b')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-1 rounded text-xs transition"
                  >
                    {gstr3b.status === 'Filed' ? 'View 3B Receipt' : 'File GSTR-3B'}
                  </button>
                </td>
              </tr>

              {/* Form PMT-06 */}
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-800">PMT-06</td>
                <td className="py-3 px-4 text-slate-600">Payment Challan for Cash Deposit</td>
                <td className="py-3 px-4 font-mono text-slate-600">Before filing 3B</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    On-Demand
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-500">CPIN / CIN</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-3 py-1 rounded text-xs transition"
                  >
                    Create Challan
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Launchpad Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Practice Scenarios */}
        <div
          onClick={() => setActiveTab('practice')}
          className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
              Interactive Lab
            </span>
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h4 className="text-base font-bold">GST Practice Scenarios</h4>
          <p className="text-xs opacity-90 mt-1 leading-relaxed">
            Practice real accountant cases: enter 10 invoices in GSTR-1, reconcile GSTR-2B, set-off
            tax under Rule 88A, and get instant auto-grading!
          </p>
        </div>

        {/* AI GST Tutor */}
        <div
          onClick={() => setActiveTab('tutor')}
          className="bg-gradient-to-br from-indigo-600 to-blue-800 text-white rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              AI Assistant
            </span>
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h4 className="text-base font-bold">Ask AI GST Tutor</h4>
          <p className="text-xs opacity-90 mt-1 leading-relaxed">
            Get instant statutory guidance on GSTR tables, verify tax calculations, understand
            Section 17(5) blocked credits, and clarify doubts.
          </p>
        </div>

        {/* Learning Center */}
        <div
          onClick={() => setActiveTab('learning')}
          className="bg-gradient-to-br from-blue-700 to-slate-800 text-white rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
              Academy
            </span>
            <ArrowUpRight className="w-5 h-5 opacity-80" />
          </div>
          <h4 className="text-base font-bold">15 Comprehensive Lessons</h4>
          <p className="text-xs opacity-90 mt-1 leading-relaxed">
            Learn from structured modules: GST Basics, Registration, Tax Invoices, E-Invoicing,
            E-Way Bills, GSTR-1, GSTR-3B, RCM, and take 5-question quizzes!
          </p>
        </div>
      </div>
    </div>
  );
};
