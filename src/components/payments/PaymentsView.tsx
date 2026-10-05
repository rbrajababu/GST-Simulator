import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import {
  CreditCard,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Building,
  ArrowRight,
  Printer,
  Sparkles,
  ShieldCheck,
  Clock,
  Info,
} from 'lucide-react';

export const PaymentsView: React.FC = () => {
  const { challans, createChallan, payChallan, gstr3b, activeCompany, setActiveTab } = useGstPortal();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChallanForPayment, setSelectedChallanForPayment] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState('State Bank of India (SBI)');
  const [paymentSuccessCin, setPaymentSuccessCin] = useState<string | null>(null);
  const [formError, setFormError] = useState<string>('');

  // Form State for New Challan PMT-06
  const [challanForm, setChallanForm] = useState({
    reason: 'Monthly Return (PMT-06)' as const,
    igstTax: gstr3b.taxPayment.paidInCash.igst || 0,
    cgstTax: gstr3b.taxPayment.paidInCash.cgst || 0,
    sgstTax: gstr3b.taxPayment.paidInCash.sgst || 0,
    cessTax: 0,
    interest: 0,
    penalty: 0,
    fee: 0,
    paymentMode: 'E-Payment' as const,
  });

  const totalChallanAmount =
    challanForm.igstTax +
    challanForm.cgstTax +
    challanForm.sgstTax +
    challanForm.cessTax +
    challanForm.interest +
    challanForm.penalty +
    challanForm.fee;

  const handleCreateChallan = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalChallanAmount <= 0) {
      setFormError('Total challan amount must be greater than zero.');
      return;
    }
    setFormError('');

    const created = createChallan({
      reason: challanForm.reason,
      taxAmounts: {
        igst: { tax: challanForm.igstTax, interest: 0, penalty: 0, fee: 0, other: 0 },
        cgst: { tax: challanForm.cgstTax, interest: 0, penalty: 0, fee: 0, other: 0 },
        sgst: { tax: challanForm.sgstTax, interest: 0, penalty: 0, fee: 0, other: 0 },
        cess: { tax: challanForm.cessTax, interest: 0, penalty: 0, fee: 0, other: 0 },
      },
      totalAmount: totalChallanAmount,
      paymentMode: challanForm.paymentMode,
    });

    setShowCreateModal(false);
    setSelectedChallanForPayment(created.id);
  };

  const handleSimulatePayment = () => {
    if (!selectedChallanForPayment) return;
    const res = payChallan(selectedChallanForPayment, selectedBank);
    if (res.success) {
      setPaymentSuccessCin(res.cin);
      setSelectedChallanForPayment(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                GST Payment Practice &amp; Challan Generation (PMT-06)
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Simulated Gateway
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice the official workflow: Tax Liability &rarr; Form PMT-06 &rarr; CPIN (14 Digits) &rarr;
              E-Payment Simulation &rarr; CIN (17 Digits) &rarr; Auto-Credit to Cash Ledger.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Create Form PMT-06 Challan
          </button>
        </div>
      </div>

      {/* Payment Success Banner */}
      {paymentSuccessCin && (
        <div className="bg-emerald-50 border-2 border-emerald-400 p-5 rounded-xl space-y-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <div className="font-bold text-sm text-slate-900">
                Payment Successful! Challan Identification Number (CIN) Generated
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                CIN: <strong className="font-mono text-blue-900">{paymentSuccessCin}</strong> • Funds
                immediately credited to your Electronic Cash Ledger!
              </div>
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => setActiveTab('ledgers')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3 py-1.5 rounded text-xs transition"
            >
              Verify Cash Ledger Balance &rarr;
            </button>
            <button
              onClick={() => setPaymentSuccessCin(null)}
              className="bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Challans History Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-xs">Payment Challan History</h3>
          <span className="text-[11px] text-slate-500">Every transaction marked SIMULATED</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">CPIN (14 Digits)</th>
                <th className="p-3">Date Generated</th>
                <th className="p-3">Reason</th>
                <th className="p-3 text-right">Amount (₹)</th>
                <th className="p-3">Payment Mode</th>
                <th className="p-3">Status</th>
                <th className="p-3 font-mono">CIN</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {challans.map((ch) => (
                <tr key={ch.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-900">{ch.cpin}</td>
                  <td className="p-3 font-mono text-slate-600">{ch.challanDate}</td>
                  <td className="p-3">{ch.reason}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    ₹{ch.totalAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3">{ch.paymentMode}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        ch.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ch.status === 'Paid' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {ch.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-700">{ch.cin || '-'}</td>
                  <td className="p-3 text-center">
                    {ch.status === 'Generated' ? (
                      <button
                        onClick={() => setSelectedChallanForPayment(ch.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded text-xs shadow-xs"
                      >
                        Make Payment
                      </button>
                    ) : (
                      <span className="text-slate-400 font-medium">Paid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Challan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Generate Payment Challan (Form GST PMT-06)
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Fictional challan creation to simulate deposit into Electronic Cash Ledger.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateChallan} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Reason for Challan</label>
                <select
                  value={challanForm.reason}
                  onChange={(e) => setChallanForm({ ...challanForm, reason: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Monthly Return (PMT-06)">Monthly Return (PMT-06)</option>
                  <option value="Voluntary (DRC-03)">Voluntary (DRC-03)</option>
                  <option value="Demand (DRC-07)">Demand (DRC-07)</option>
                </select>
              </div>

              {/* Tax Breakup Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Major Head</th>
                      <th className="p-2.5">Tax (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr>
                      <td className="p-2.5 font-sans font-medium">Integrated Tax (IGST)</td>
                      <td className="p-2.5">
                        <input
                          type="number"
                          value={challanForm.igstTax}
                          onChange={(e) => setChallanForm({ ...challanForm, igstTax: Number(e.target.value) })}
                          className="px-2 py-1 border border-slate-300 rounded w-full font-mono font-bold"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium">Central Tax (CGST)</td>
                      <td className="p-2.5">
                        <input
                          type="number"
                          value={challanForm.cgstTax}
                          onChange={(e) => setChallanForm({ ...challanForm, cgstTax: Number(e.target.value) })}
                          className="px-2 py-1 border border-slate-300 rounded w-full font-mono font-bold"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-sans font-medium">State Tax (SGST)</td>
                      <td className="p-2.5">
                        <input
                          type="number"
                          value={challanForm.sgstTax}
                          onChange={(e) => setChallanForm({ ...challanForm, sgstTax: Number(e.target.value) })}
                          className="px-2 py-1 border border-slate-300 rounded w-full font-mono font-bold"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Total Calculation */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="font-bold text-slate-700">Total Challan Amount:</span>
                <span className="text-base font-extrabold text-blue-900 font-mono">
                  ₹{totalChallanAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Generate CPIN &amp; Challan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Payment Gateway Modal */}
      {selectedChallanForPayment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">
                  Simulated Bank Gateway
                </h3>
              </div>
              <button
                onClick={() => setSelectedChallanForPayment(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 space-y-1">
              <div className="font-bold">GST Payment Gateway Simulator</div>
              <div className="text-[11px] text-blue-800">
                This is a mock training workflow. No actual banking credentials or money transfers are involved.
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Select Authorized Bank</label>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                <option value="HDFC Bank Corporate">HDFC Bank Corporate</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Punjab National Bank">Punjab National Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedChallanForPayment(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSimulatePayment}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Simulate Successful Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
