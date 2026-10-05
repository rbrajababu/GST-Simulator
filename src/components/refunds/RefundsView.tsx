import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { RefundClaim } from '../../types/gst';
import {
  RotateCcw,
  Plus,
  CheckCircle2,
  Clock,
  Building,
  Upload,
  FileCheck2,
  ArrowRight,
  Eye,
  Info,
  AlertTriangle,
} from 'lucide-react';

export const RefundsView: React.FC = () => {
  const { refundClaims, submitRefundClaim, currentPeriod, activeCompany } = useGstPortal();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedClaimForTracking, setSelectedClaimForTracking] = useState<RefundClaim | null>(null);
  const [formError, setFormError] = useState<string>('');

  // Refund Form State
  const [form, setForm] = useState({
    refundType: 'Export of Goods / Services with payment of tax' as RefundClaim['refundType'],
    taxPeriod: currentPeriod,
    igst: 45000,
    cgst: 0,
    sgst: 0,
    cess: 0,
    bankName: 'HDFC Bank Limited',
    accountNo: '50200088192341',
    ifscCode: 'HDFC0000123',
    declarationAgreed: true,
  });

  const totalClaim = form.igst + form.cgst + form.sgst + form.cess;

  const handleSubmitRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalClaim <= 0) {
      setFormError('Total refund amount must be greater than zero.');
      return;
    }
    setFormError('');

    const created = submitRefundClaim({
      refundType: form.refundType,
      taxPeriod: form.taxPeriod,
      claimAmount: {
        igst: form.igst,
        cgst: form.cgst,
        sgst: form.sgst,
        cess: form.cess,
        total: totalClaim,
      },
      bankAccount: {
        bankName: form.bankName,
        accountNo: form.accountNo,
        ifscCode: form.ifscCode,
      },
    });

    setShowApplyModal(false);
    setSelectedClaimForTracking(created);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                GST Refund Practice (Form GST RFD-01)
              </h2>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Section 54 Sandbox
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice applying for refunds on account of exports under LUT, inverted duty structure, or excess cash ledger balance.
            </p>
          </div>

          <button
            onClick={() => setShowApplyModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Apply for Refund (RFD-01)
          </button>
        </div>
      </div>

      {/* Refunds History Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-xs">Refund Applications &amp; ARN Tracking</h3>
          <span className="text-[11px] text-slate-500">Form RFD-01 Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">ARN Reference</th>
                <th className="p-3">Filing Date</th>
                <th className="p-3">Refund Grounds</th>
                <th className="p-3">Tax Period</th>
                <th className="p-3 text-right">Claim Amount (₹)</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {refundClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-900">{claim.arn}</td>
                  <td className="p-3 font-mono text-slate-600">{claim.filingDate}</td>
                  <td className="p-3 font-medium text-slate-800">{claim.refundType}</td>
                  <td className="p-3 font-semibold text-slate-700">{claim.taxPeriod}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    ₹{claim.claimAmount.total.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        claim.status === 'Refund Credited'
                          ? 'bg-emerald-100 text-emerald-800'
                          : claim.status === 'Under Scrutiny'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {claim.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedClaimForTracking(claim)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-xs flex items-center gap-1 mx-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Track Stages
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Refund Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Application for Refund (Form GST RFD-01)
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Fictional application for claiming refund under Section 54.
                </p>
              </div>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmitRefund} className="space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{formError}</span>
                </div>
              )}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Reason / Type of Refund</label>
                <select
                  value={form.refundType}
                  onChange={(e) => setForm({ ...form, refundType: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Export of Goods / Services with payment of tax">
                    Export of Goods / Services with payment of tax
                  </option>
                  <option value="Export without payment of tax (under LUT)">
                    Export without payment of tax (under LUT)
                  </option>
                  <option value="Excess Balance in Electronic Cash Ledger">
                    Excess Balance in Electronic Cash Ledger
                  </option>
                  <option value="On account of Inverted Duty Structure">
                    On account of Inverted Duty Structure
                  </option>
                </select>
              </div>

              {/* Tax Amounts */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="font-semibold text-slate-800">Claim Amount Breakdown</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">IGST (₹)</label>
                    <input
                      type="number"
                      value={form.igst}
                      onChange={(e) => setForm({ ...form, igst: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">CGST (₹)</label>
                    <input
                      type="number"
                      value={form.cgst}
                      onChange={(e) => setForm({ ...form, cgst: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">SGST (₹)</label>
                    <input
                      type="number"
                      value={form.sgst}
                      onChange={(e) => setForm({ ...form, sgst: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Total Claim (₹)</label>
                    <div className="px-2.5 py-1.5 bg-slate-200 text-blue-900 rounded font-mono font-extrabold text-sm">
                      ₹{totalClaim.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Dummy Bank Details */}
              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg space-y-2">
                <div className="font-bold text-blue-900">Validated Bank Account for Credit (Dummy)</div>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500">Bank:</span>
                    <div className="font-semibold">{form.bankName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Account No:</span>
                    <div className="font-mono font-semibold">{form.accountNo}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">IFSC:</span>
                    <div className="font-mono font-semibold">{form.ifscCode}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Submit Form RFD-01 &amp; Generate ARN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Simulated Tracking Drawer Modal */}
      {selectedClaimForTracking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Refund Application Stages</h3>
                <p className="text-slate-500 text-[11px] font-mono">ARN: {selectedClaimForTracking.arn}</p>
              </div>
              <button
                onClick={() => setSelectedClaimForTracking(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            {/* Stages Timeline */}
            <div className="space-y-4 relative pl-6 border-l-2 border-blue-500 my-2">
              <div className="relative">
                <div className="w-3 h-3 bg-emerald-500 rounded-full absolute -left-[31px] top-0.5"></div>
                <div className="font-bold text-slate-800">Form GST RFD-01 Filed</div>
                <div className="text-[11px] text-slate-500">{selectedClaimForTracking.filingDate}</div>
              </div>

              <div className="relative">
                <div className="w-3 h-3 bg-blue-500 rounded-full absolute -left-[31px] top-0.5 animate-pulse"></div>
                <div className="font-bold text-blue-900">Acknowledgement Form GST RFD-02 Issued</div>
                <div className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  {selectedClaimForTracking.currentStageNote}
                </div>
              </div>

              <div className="relative opacity-60">
                <div className="w-3 h-3 bg-slate-300 rounded-full absolute -left-[31px] top-0.5"></div>
                <div className="font-bold text-slate-600">Sanction Order Form GST RFD-06</div>
                <div className="text-[11px] text-slate-400">Within 60 days under Section 54(7)</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedClaimForTracking(null)}
                className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-lg"
              >
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
