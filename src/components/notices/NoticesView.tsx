import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { NoticeRecord } from '../../types/gst';
import {
  AlertCircle,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Send,
  Eye,
  ArrowRight,
  Info,
} from 'lucide-react';

export const NoticesView: React.FC = () => {
  const { notices, submitNoticeReply } = useGstPortal();

  const [selectedNotice, setSelectedNotice] = useState<NoticeRecord | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [payViaDrc03, setPayViaDrc03] = useState(false);
  const [replySuccessMessage, setReplySuccessMessage] = useState('');

  const handleOpenNotice = (n: NoticeRecord) => {
    setSelectedNotice(n);
    setReplyText(
      `In response to notice ${n.noticeNo} for ${n.taxPeriod}, the difference has arisen due to timing differences of supplier GSTR-1 filings. Necessary reconciliations are attached for your verification.`
    );
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNotice) return;

    submitNoticeReply(selectedNotice.id, replyText, ['Reconciliation_Statement.pdf', 'Challan_DRC03.pdf']);
    setReplySuccessMessage('Reply successfully submitted! Acknowledgement generated and status updated to "Reply Submitted".');
    setTimeout(() => {
      setReplySuccessMessage('');
      setShowReplyModal(false);
      setSelectedNotice(null);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Notices &amp; Orders Practice Center
              </h2>
              <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Statutory Communications
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice reviewing automated intimations (DRC-01B, DRC-01C), scrutiny notices (ASMT-10), and drafting legal explanations.
            </p>
          </div>
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Notice Reference</th>
                <th className="p-3">Type</th>
                <th className="p-3">Title &amp; Statutory Section</th>
                <th className="p-3">Tax Period</th>
                <th className="p-3">Due Date</th>
                <th className="p-3 text-right">Demand (₹)</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notices.map((n) => (
                <tr key={n.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-900">{n.noticeNo}</td>
                  <td className="p-3">
                    <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                      {n.noticeType}
                    </span>
                  </td>
                  <td className="p-3 max-w-xs">
                    <div className="font-semibold text-slate-800">{n.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{n.sectionReference}</div>
                  </td>
                  <td className="p-3 font-medium text-slate-700">{n.taxPeriod}</td>
                  <td className="p-3 font-mono text-rose-700 font-semibold">{n.dueDate}</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">
                    ₹{n.demandAmount.total.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        n.status === 'Pending Reply'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {n.status === 'Pending Reply' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                      {n.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleOpenNotice(n)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-2.5 py-1 rounded text-xs transition"
                    >
                      Open &amp; Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notice Detail View / Reply Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedNotice.title}</h3>
                <p className="text-slate-500 text-[11px] font-mono">
                  Notice No: {selectedNotice.noticeNo} • Period: {selectedNotice.taxPeriod}
                </p>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            {/* Statutory Details Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-slate-700 leading-relaxed">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Statutory Authority: Proper Officer, Patna Division 1</span>
                <span>Due Date: {selectedNotice.dueDate} (7 Days)</span>
              </div>
              <div className="pt-1 text-slate-800 font-medium">
                <strong>Discrepancy Allegation:</strong> {selectedNotice.discrepancyDetails}
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-mono font-bold text-slate-900">
                <span>Total Demand under Section 75(12) / Rule 88:</span>
                <span className="text-rose-700 text-sm">
                  ₹{selectedNotice.demandAmount.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Reply Submission Area */}
            {replySuccessMessage ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center font-bold text-sm">
                {replySuccessMessage}
              </div>
            ) : (
              <form onSubmit={handleSubmitReply} className="space-y-3 pt-2">
                <div className="font-bold text-slate-900 text-xs">Submit Response / Clarification</div>

                <div className="flex gap-4 text-[11px]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="replyAction"
                      checked={!payViaDrc03}
                      onChange={() => setPayViaDrc03(false)}
                      className="text-blue-600"
                    />
                    <span className="font-semibold">Explain Differences with Supporting Documents</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="replyAction"
                      checked={payViaDrc03}
                      onChange={() => setPayViaDrc03(true)}
                      className="text-blue-600"
                    />
                    <span className="font-semibold">Pay Differential Tax via Form DRC-03</span>
                  </label>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">
                    Detailed Legal / Accounting Explanation
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono leading-relaxed"
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 text-[11px] flex items-center justify-between">
                  <span>Attached Demo Evidence: Reconciliation_Statement.pdf (340 KB)</span>
                  <span className="text-emerald-700 font-bold">Ready</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedNotice(null)}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Reply to Notice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
