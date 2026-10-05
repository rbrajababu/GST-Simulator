import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import {
  Layers,
  CreditCard,
  PlusCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  CheckCircle2,
  DollarSign,
  Info,
} from 'lucide-react';

export const LedgersView: React.FC = () => {
  const { cashLedger, creditLedger, ledgerTransactions, depositCashLedger, setActiveTab } =
    useGstPortal();

  const [activeTab, setActiveTabLocal] = useState<'cash' | 'credit' | 'liability'>('cash');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositHead, setDepositHead] = useState<'igst' | 'cgst' | 'sgst' | 'cess'>('cgst');
  const [depositSubHead, setDepositSubHead] = useState<'tax' | 'interest' | 'fee'>('tax');
  const [depositAmount, setDepositAmount] = useState(5000);

  const handleExecuteDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) return;
    depositCashLedger(depositHead, depositSubHead, depositAmount);
    setShowDepositModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Electronic Digital Ledgers Practice
              </h2>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Simulated Balances
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory accounting registers maintained on the GST portal under Section 49 of the CGST Act.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowDepositModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Simulate Cash Deposit
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Generate PMT-06 Challan
            </button>
          </div>
        </div>

        {/* Top Ledgers Summary Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400">Electronic Cash Ledger</span>
            <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
              ₹{cashLedger.totalBalance.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Electronic Credit Ledger</span>
            <div className="text-base font-extrabold text-blue-800 font-mono mt-0.5">
              ₹{creditLedger.total.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Electronic Liability Register</span>
            <div className="text-base font-extrabold text-emerald-700 font-mono mt-0.5">
              ₹0 (Discharged)
            </div>
          </div>
        </div>
      </div>

      {/* Ledgers Tabs */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveTabLocal('cash')}
            className={`px-5 py-3 border-b-2 transition ${
              activeTab === 'cash'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            Electronic Cash Ledger (Major &amp; Minor Heads)
          </button>
          <button
            onClick={() => setActiveTabLocal('credit')}
            className={`px-5 py-3 border-b-2 transition ${
              activeTab === 'credit'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            Electronic Credit Ledger (ITC Passbook)
          </button>
          <button
            onClick={() => setActiveTabLocal('liability')}
            className={`px-5 py-3 border-b-2 transition ${
              activeTab === 'liability'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            Electronic Liability Register
          </button>
        </div>

        {/* Tab 1: Cash Ledger Matrix */}
        {activeTab === 'cash' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Cash Balance Available under Major and Minor Heads
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Funds in cash ledger can be deposited via Form PMT-06 challans or adjusted across heads via Form PMT-09.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Major Head</th>
                    <th className="p-3 text-right">Tax (₹)</th>
                    <th className="p-3 text-right">Interest (₹)</th>
                    <th className="p-3 text-right">Penalty (₹)</th>
                    <th className="p-3 text-right">Fees (₹)</th>
                    <th className="p-3 text-right">Other (₹)</th>
                    <th className="p-3 text-right font-bold text-slate-900">Total (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="p-3 font-sans font-bold text-blue-900">Integrated Tax (IGST)</td>
                    <td className="p-3 text-right font-medium">{cashLedger.igst.tax.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right font-bold text-blue-800">
                      {cashLedger.igst.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-bold text-slate-800">Central Tax (CGST)</td>
                    <td className="p-3 text-right font-medium">{cashLedger.cgst.tax.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right font-bold text-slate-800">
                      {cashLedger.cgst.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-bold text-slate-800">State Tax (SGST)</td>
                    <td className="p-3 text-right font-medium">{cashLedger.sgst.tax.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right font-bold text-slate-800">
                      {cashLedger.sgst.total.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-bold text-slate-800">Cess</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right font-bold text-slate-400">0</td>
                  </tr>
                  <tr className="bg-slate-50 font-bold">
                    <td className="p-3 font-sans">Total Balance Available</td>
                    <td className="p-3 text-right">
                      {(cashLedger.igst.tax + cashLedger.cgst.tax + cashLedger.sgst.tax).toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-slate-400">0</td>
                    <td className="p-3 text-right text-base text-emerald-700">
                      ₹{cashLedger.totalBalance.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Credit Ledger */}
        {activeTab === 'credit' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Electronic Credit Ledger (Available Input Tax Credit)
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Accumulated credit from purchase invoices (GSTR-2B) available to set off outward tax.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-slate-500 text-[11px]">IGST Credit</span>
                <div className="text-base font-bold text-blue-900 font-mono mt-0.5">
                  ₹{creditLedger.igst.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 text-[11px]">CGST Credit</span>
                <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  ₹{creditLedger.cgst.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 text-[11px]">SGST Credit</span>
                <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  ₹{creditLedger.sgst.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 text-[11px]">Total Available</span>
                <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">
                  ₹{creditLedger.total.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Passbook Transactions */}
            <div className="border border-slate-200 rounded-lg overflow-hidden mt-4">
              <div className="p-3 bg-slate-50 font-bold text-slate-700 border-b border-slate-200">
                Ledger Transaction History (Passbook)
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Reference No</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Head</th>
                    <th className="p-3 text-right">Type</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                    <th className="p-3 text-right">Balance After (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {ledgerTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="p-3">{tx.date}</td>
                      <td className="p-3 font-semibold text-blue-900">{tx.referenceNo}</td>
                      <td className="p-3 font-sans text-slate-700">{tx.description}</td>
                      <td className="p-3 font-sans">{tx.majorHead}</td>
                      <td className="p-3 text-right font-sans">
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          {tx.transactionType}
                        </span>
                      </td>
                      <td className="p-3 text-right font-bold text-emerald-700">
                        ₹{tx.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-bold">
                        ₹{tx.balanceAfter.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Liability Register */}
        {activeTab === 'liability' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Electronic Liability Register (Part I &amp; Part II)
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Maintains return-related liabilities, demand orders under Sections 73/74, and late fees.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold">No Outstanding Demands</div>
                <div className="text-[11px] text-emerald-800">
                  All previous return liabilities and demands have been fully discharged.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Deposit Simulation Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Simulate Direct Cash Deposit
              </h3>
              <button
                onClick={() => setShowDepositModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleExecuteDeposit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Major Head</label>
                <select
                  value={depositHead}
                  onChange={(e) => setDepositHead(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="igst">Integrated Tax (IGST)</option>
                  <option value="cgst">Central Tax (CGST)</option>
                  <option value="sgst">State Tax (SGST)</option>
                  <option value="cess">Cess</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Minor Head</label>
                <select
                  value={depositSubHead}
                  onChange={(e) => setDepositSubHead(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="tax">Tax</option>
                  <option value="interest">Interest</option>
                  <option value="fee">Fee</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Amount (₹)</label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
                  required
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-[11px]">
                This action simulates immediate remittance to the Reserve Bank of India and credits your
                Electronic Cash Ledger instantly.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
