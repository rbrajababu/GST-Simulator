import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { PortalBreadcrumb } from '../layout/PortalBreadcrumb';
import {
  FileSpreadsheet,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Send,
  HelpCircle,
  CreditCard,
  Layers,
  Scale,
  DollarSign,
  Info,
  Grid,
  FileText,
  ShieldCheck,
  KeyRound,
} from 'lucide-react';

export const Gstr3bView: React.FC = () => {
  const {
    gstr3b,
    gstr1,
    activeCompany,
    currentPeriod,
    currentFY,
    cashLedger,
    creditLedger,
    autoDraftGstr3bFromReturns,
    simulateGstr3bOffset,
    fileGstr3b,
    setActiveTab,
  } = useGstPortal();

  const [viewMode, setViewMode] = useState<'tiles' | 'section'>('tiles');
  const [activeSection, setActiveSection] = useState<'3.1' | '3.2' | '4' | '5' | '6.1'>('3.1');
  const [offsetResult, setOffsetResult] = useState<{ message: string; cashShortfall: number } | null>(null);
  const [autoDraftNotice, setAutoDraftNotice] = useState<string | null>(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [evcOtp, setEvcOtp] = useState('849120');
  const [declarationAgreed, setDeclarationAgreed] = useState(false);
  const [filingArn, setFilingArn] = useState('');

  const handleAutoDraft = () => {
    autoDraftGstr3bFromReturns();
    setAutoDraftNotice('Values successfully auto-drafted from GSTR-1 (Outward Supplies) and GSTR-2B (Eligible ITC)!');
  };

  const handleSimulateOffset = () => {
    const res = simulateGstr3bOffset();
    setOffsetResult(res);
  };

  const handleFileReturn = () => {
    const res = fileGstr3b();
    if (res.success) {
      setFilingArn(res.arn);
      setShowFileModal(false);
    }
  };

  // Section totals
  const totalOutwardTaxable = gstr3b.table3_1.outwardTaxable.taxable;
  const totalOutwardTax =
    gstr3b.table3_1.outwardTaxable.igst +
    gstr3b.table3_1.outwardTaxable.cgst +
    gstr3b.table3_1.outwardTaxable.sgst;

  const totalEligibleItc =
    gstr3b.table4.itcAvailable.allOtherItc.igst +
    gstr3b.table4.itcAvailable.allOtherItc.cgst +
    gstr3b.table4.itcAvailable.allOtherItc.sgst;

  const cashRequired =
    gstr3b.taxPayment.paidInCash.igst +
    gstr3b.taxPayment.paidInCash.cgst +
    gstr3b.taxPayment.paidInCash.sgst;

  const cashDeficit = Math.max(0, cashRequired - cashLedger.totalBalance);

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('returns-hub')}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition"
              title="Back to Returns Hub"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  Form GSTR-3B: Monthly Summary Return
                </h2>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    gstr3b.status === 'Filed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {gstr3b.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Financial Year: <strong>{currentFY}</strong> • Return Period:{' '}
                <strong className="text-blue-700">{currentPeriod}</strong> • Taxpayer:{' '}
                <strong>{activeCompany.tradeName}</strong> ({activeCompany.gstin})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleAutoDraft}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg font-semibold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Auto-Draft from 1 &amp; 2B
            </button>

            {gstr3b.status !== 'Filed' ? (
              <button
                onClick={() => setShowFileModal(true)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                Proceed to File
              </button>
            ) : (
              <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                ARN: {gstr3b.arn}
              </span>
            )}
          </div>
        </div>

        {/* Key Figures Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400">Total Tax Payable (3.1)</span>
            <div className="text-base font-extrabold text-amber-900 font-mono mt-0.5">
              ₹{totalOutwardTax.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Eligible ITC (Table 4)</span>
            <div className="text-base font-extrabold text-blue-800 font-mono mt-0.5">
              ₹{totalEligibleItc.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Paid in Cash</span>
            <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
              ₹{cashRequired.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Cash Ledger Balance</span>
            <div className="text-base font-extrabold text-emerald-700 font-mono mt-0.5">
              ₹{cashLedger.totalBalance.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {autoDraftNotice && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{autoDraftNotice}</span>
            </div>
            <button
              onClick={() => setAutoDraftNotice(null)}
              className="text-blue-700 hover:text-blue-900 font-bold text-xs"
            >
              &times;
            </button>
          </div>
        )}
      </div>

      {/* GSTR-3B Table Sections */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        {/* Sub-navigation tabs */}
        <div className="flex overflow-x-auto scrollbar-none border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          {[
            { id: '3.1', label: '3.1 Outward & RCM Inward Supplies' },
            { id: '3.2', label: '3.2 Inter-State Supplies (Unregistered)' },
            { id: '4', label: '4. Eligible Input Tax Credit (ITC)' },
            { id: '5', label: '5. Exempt / Nil Inward Supplies' },
            { id: '6.1', label: '6.1 Payment of Tax (Rule 88A Offset)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-4 py-3 whitespace-nowrap transition border-b-2 ${
                activeSection === tab.id
                  ? 'border-blue-600 text-blue-900 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section 3.1 */}
        {activeSection === '3.1' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                3.1 Details of Outward Supplies and inward supplies liable to reverse charge
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Summary of all taxable, zero-rated, exempt, and reverse charge inward supplies.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Nature of Supplies</th>
                    <th className="p-3 text-right">Total Taxable Value (₹)</th>
                    <th className="p-3 text-right">IGST (₹)</th>
                    <th className="p-3 text-right">CGST (₹)</th>
                    <th className="p-3 text-right">SGST (₹)</th>
                    <th className="p-3 text-right">Cess (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-3 font-sans font-medium text-slate-800">
                      (a) Outward taxable supplies (other than zero rated, nil rated and exempted)
                    </td>
                    <td className="p-3 text-right font-bold">
                      {gstr3b.table3_1.outwardTaxable.taxable.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-blue-800">
                      {gstr3b.table3_1.outwardTaxable.igst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-800">
                      {gstr3b.table3_1.outwardTaxable.cgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-800">
                      {gstr3b.table3_1.outwardTaxable.sgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-500">0</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-slate-800">
                      (b) Outward taxable supplies (zero rated)
                    </td>
                    <td className="p-3 text-right">
                      {gstr3b.table3_1.zeroRated.taxable.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-blue-800">
                      {gstr3b.table3_1.zeroRated.igst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right text-slate-500">0</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-slate-800">
                      (c) Other outward supplies (Nil rated, exempted)
                    </td>
                    <td className="p-3 text-right">
                      {gstr3b.table3_1.otherOutward.taxable.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                    <td className="p-3 text-right text-slate-400">-</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-slate-800">
                      (d) Inward supplies (liable to reverse charge)
                    </td>
                    <td className="p-3 text-right">
                      {gstr3b.table3_1.inwardRcm.taxable.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-blue-800">
                      {gstr3b.table3_1.inwardRcm.igst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-800">
                      {gstr3b.table3_1.inwardRcm.cgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-800">
                      {gstr3b.table3_1.inwardRcm.sgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-500">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 4: ITC */}
        {activeSection === '4' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Table 4 - Eligible Input Tax Credit (ITC)
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Report ITC available from GSTR-2B, reversals under Rules 42/43, and ineligible ITC under Section 17(5).
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-200">
              {/* 4(A) ITC Available */}
              <div className="p-3 bg-slate-50 font-bold text-slate-800">
                (A) ITC Available (whether in full or part)
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Category</th>
                    <th className="p-2.5 text-right">IGST (₹)</th>
                    <th className="p-2.5 text-right">CGST (₹)</th>
                    <th className="p-2.5 text-right">SGST (₹)</th>
                    <th className="p-2.5 text-right">Cess (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">(1) Import of goods</td>
                    <td className="p-2.5 text-right">{gstr3b.table4.itcAvailable.importGoods.igst}</td>
                    <td className="p-2.5 text-right text-slate-400">-</td>
                    <td className="p-2.5 text-right text-slate-400">-</td>
                    <td className="p-2.5 text-right">0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">(3) Inward supplies liable to RCM</td>
                    <td className="p-2.5 text-right">{gstr3b.table4.itcAvailable.inwardRcm.igst}</td>
                    <td className="p-2.5 text-right">{gstr3b.table4.itcAvailable.inwardRcm.cgst}</td>
                    <td className="p-2.5 text-right">{gstr3b.table4.itcAvailable.inwardRcm.sgst}</td>
                    <td className="p-2.5 text-right">0</td>
                  </tr>
                  <tr className="bg-blue-50/40">
                    <td className="p-2.5 font-sans font-bold text-blue-900">
                      (5) All other ITC (From GSTR-2B Statement)
                    </td>
                    <td className="p-2.5 text-right text-blue-800 font-bold">
                      {gstr3b.table4.itcAvailable.allOtherItc.igst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-slate-800 font-bold">
                      {gstr3b.table4.itcAvailable.allOtherItc.cgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-slate-800 font-bold">
                      {gstr3b.table4.itcAvailable.allOtherItc.sgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right">0</td>
                  </tr>
                </tbody>
              </table>

              {/* 4(D) Ineligible ITC */}
              <div className="p-3 bg-slate-50 font-bold text-slate-800">
                (D) Ineligible ITC (Information Purpose)
              </div>
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-slate-700">
                      (1) As per Section 17(5) (Blocked credits - e.g. motor vehicles, catering)
                    </td>
                    <td className="p-2.5 text-right text-rose-700 font-bold">
                      {gstr3b.table4.ineligibleItc.section17_5.igst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-rose-700 font-bold">
                      {gstr3b.table4.ineligibleItc.section17_5.cgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-rose-700 font-bold">
                      {gstr3b.table4.ineligibleItc.section17_5.sgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 6.1: Payment of Tax & Set-Off */}
        {activeSection === '6.1' && (
          <div className="p-5 space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Table 6.1 Payment of Tax &amp; Credit Set-off (Rule 88A)
                </h3>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  IGST credit must be completely utilized first against IGST, then CGST/SGST.
                  Cross-utilization between CGST and SGST is strictly prohibited.
                </p>
              </div>

              <button
                onClick={handleSimulateOffset}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <Scale className="w-4 h-4 text-amber-300" />
                Simulate Rule 88A Set-Off
              </button>
            </div>

            {/* Set-off Results Alert */}
            {offsetResult && (
              <div
                className={`p-3 rounded-lg border flex items-center justify-between gap-2 ${
                  offsetResult.cashShortfall > 0
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{offsetResult.message}</span>
                </div>
                {offsetResult.cashShortfall > 0 && (
                  <button
                    onClick={() => setActiveTab('payments')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded text-xs shrink-0"
                  >
                    Generate PMT-06 Challan
                  </button>
                )}
              </div>
            )}

            {/* Set-Off Matrix Table */}
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Tax Head</th>
                    <th className="p-2.5 text-right">Tax Payable (₹)</th>
                    <th className="p-2.5 text-right">Paid via IGST ITC</th>
                    <th className="p-2.5 text-right">Paid via CGST ITC</th>
                    <th className="p-2.5 text-right">Paid via SGST ITC</th>
                    <th className="p-2.5 text-right font-bold text-amber-900">Paid in Cash (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {/* IGST */}
                  <tr>
                    <td className="p-2.5 font-sans font-bold text-blue-900">Integrated Tax (IGST)</td>
                    <td className="p-2.5 text-right font-bold">
                      {gstr3b.taxPayment.payable.igst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-blue-700 font-semibold">
                      {gstr3b.taxPayment.paidThroughItc.igstPaidFromIgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-slate-400">
                      {gstr3b.taxPayment.paidThroughItc.igstPaidFromCgst}
                    </td>
                    <td className="p-2.5 text-right text-slate-400">
                      {gstr3b.taxPayment.paidThroughItc.igstPaidFromSgst}
                    </td>
                    <td className="p-2.5 text-right font-bold text-amber-800">
                      {gstr3b.taxPayment.paidInCash.igst.toLocaleString('en-IN')}
                    </td>
                  </tr>

                  {/* CGST */}
                  <tr>
                    <td className="p-2.5 font-sans font-bold text-slate-800">Central Tax (CGST)</td>
                    <td className="p-2.5 text-right font-bold">
                      {gstr3b.taxPayment.payable.cgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-blue-700 font-semibold">
                      {gstr3b.taxPayment.paidThroughItc.cgstPaidFromIgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-slate-800 font-semibold">
                      {gstr3b.taxPayment.paidThroughItc.cgstPaidFromCgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-rose-300 font-sans italic" title="Not Allowed by Law">
                      Blocked
                    </td>
                    <td className="p-2.5 text-right font-bold text-amber-800">
                      {gstr3b.taxPayment.paidInCash.cgst.toLocaleString('en-IN')}
                    </td>
                  </tr>

                  {/* SGST */}
                  <tr>
                    <td className="p-2.5 font-sans font-bold text-slate-800">State Tax (SGST)</td>
                    <td className="p-2.5 text-right font-bold">
                      {gstr3b.taxPayment.payable.sgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-blue-700 font-semibold">
                      {gstr3b.taxPayment.paidThroughItc.sgstPaidFromIgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right text-rose-300 font-sans italic" title="Not Allowed by Law">
                      Blocked
                    </td>
                    <td className="p-2.5 text-right text-slate-800 font-semibold">
                      {gstr3b.taxPayment.paidThroughItc.sgstPaidFromSgst.toLocaleString('en-IN')}
                    </td>
                    <td className="p-2.5 text-right font-bold text-amber-800">
                      {gstr3b.taxPayment.paidInCash.sgst.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cash Shortfall Warning */}
            {cashDeficit > 0 && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between gap-3 text-amber-950">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <div className="font-bold">Insufficient Electronic Cash Ledger Balance</div>
                    <div className="text-[11px] text-amber-900 mt-0.5">
                      Required Cash Payment: ₹{cashRequired.toLocaleString('en-IN')} | Available in Ledger: ₹
                      {cashLedger.totalBalance.toLocaleString('en-IN')} | Shortfall: ₹
                      {cashDeficit.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('payments')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded text-xs shadow-xs"
                >
                  Create Challan PMT-06
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* File GSTR-3B Modal */}
      {showFileModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                File GSTR-3B with Simulated EVC
              </h3>
              <button
                onClick={() => setShowFileModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              You are about to file the monthly return for <strong>{currentPeriod}</strong>. Net tax paid
              in cash will be debited from your Electronic Cash Ledger.
            </p>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Gross Liability:</span>
                <span className="font-bold">₹{totalOutwardTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Paid from ITC:</span>
                <span className="font-bold text-blue-700">
                  ₹{(totalOutwardTax - cashRequired).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Paid in Cash:</span>
                <span className="font-bold text-amber-800">₹{cashRequired.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowFileModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleFileReturn}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Confirm &amp; File GSTR-3B
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {filingArn && (
        <div className="bg-emerald-50 border-2 border-emerald-400 p-5 rounded-xl text-center space-y-2">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">GSTR-3B Filed Successfully!</h4>
          <p className="text-xs text-slate-600">
            Simulated Filing Reference ARN: <strong className="font-mono text-blue-900">{filingArn}</strong>
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="bg-blue-600 text-white font-semibold px-4 py-1.5 rounded text-xs"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
