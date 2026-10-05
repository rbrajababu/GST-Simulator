import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { ReconciliationItem } from '../../types/gst';
import {
  Scale,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Search,
  Filter,
  ArrowRight,
  Send,
  MessageSquare,
  FileCheck2,
  Sparkles,
  Info,
} from 'lucide-react';

export const ReconciliationView: React.FC = () => {
  const { reconciliationData, updateReconciliationAction, currentPeriod, currentFY, setActiveTab } =
    useGstPortal();

  const [statusFilter, setStatusFilter] = useState<'All' | 'Matched' | 'Partially Matched' | 'Mismatch' | 'Missing in Books' | 'Missing in 2B'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItemForAction, setSelectedItemForAction] = useState<ReconciliationItem | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState('');

  const filteredData = reconciliationData.filter((item) => {
    const matchesSearch =
      item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierGstin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Summaries
  const matchedCount = reconciliationData.filter((i) => i.status === 'Matched').length;
  const partialCount = reconciliationData.filter((i) => i.status === 'Partially Matched').length;
  const mismatchCount = reconciliationData.filter((i) => i.status === 'Mismatch').length;
  const missing2bCount = reconciliationData.filter((i) => i.status === 'Missing in 2B').length;
  const missingBooksCount = reconciliationData.filter((i) => i.status === 'Missing in Books').length;

  const totalBooksTax = reconciliationData.reduce(
    (acc, cur) => acc + (cur.booksData ? cur.booksData.igst + cur.booksData.cgst + cur.booksData.sgst : 0),
    0
  );

  const totalPortalTax = reconciliationData.reduce(
    (acc, cur) => acc + (cur.portalData ? cur.portalData.igst + cur.portalData.cgst + cur.portalData.sgst : 0),
    0
  );

  const handleApplyAction = (action: ReconciliationItem['actionTaken']) => {
    if (!selectedItemForAction) return;
    updateReconciliationAction(selectedItemForAction.id, action);
    setActionSuccessMessage(`Action "${action}" recorded for invoice ${selectedItemForAction.invoiceNo}!`);
    setTimeout(() => {
      setActionSuccessMessage('');
      setSelectedItemForAction(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                GST ITC Reconciliation Practice Engine
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Scale className="w-3 h-3" />
                Books vs GSTR-2B
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Compare purchase registers from accounts books against GSTR-2B statement to determine
              eligible ITC and comply with Section 16(2)(aa).
            </p>
          </div>

          <button
            onClick={() => setActiveTab('gstr-3b')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <span>Proceed to Avail in GSTR-3B</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Status Counters Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
          <div
            onClick={() => setStatusFilter('Matched')}
            className="cursor-pointer p-2.5 rounded-lg border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 transition"
          >
            <div className="flex items-center justify-between text-emerald-800 font-semibold">
              <span>🟢 Matched</span>
              <span className="font-bold font-mono text-sm">{matchedCount}</span>
            </div>
            <div className="text-[10px] text-emerald-700 mt-0.5">Eligible for Table 4(A)(5)</div>
          </div>

          <div
            onClick={() => setStatusFilter('Partially Matched')}
            className="cursor-pointer p-2.5 rounded-lg border border-amber-200 bg-amber-50/60 hover:bg-amber-100 transition"
          >
            <div className="flex items-center justify-between text-amber-800 font-semibold">
              <span>🟡 Partially Matched</span>
              <span className="font-bold font-mono text-sm">{partialCount}</span>
            </div>
            <div className="text-[10px] text-amber-700 mt-0.5">Value/Tax discrepancy</div>
          </div>

          <div
            onClick={() => setStatusFilter('Missing in 2B')}
            className="cursor-pointer p-2.5 rounded-lg border border-rose-200 bg-rose-50/60 hover:bg-rose-100 transition"
          >
            <div className="flex items-center justify-between text-rose-800 font-semibold">
              <span>⚪ Missing in 2B</span>
              <span className="font-bold font-mono text-sm">{missing2bCount}</span>
            </div>
            <div className="text-[10px] text-rose-700 mt-0.5">Supplier has not filed</div>
          </div>

          <div
            onClick={() => setStatusFilter('Missing in Books')}
            className="cursor-pointer p-2.5 rounded-lg border border-purple-200 bg-purple-50/60 hover:bg-purple-100 transition"
          >
            <div className="flex items-center justify-between text-purple-800 font-semibold">
              <span>⚪ Missing in Books</span>
              <span className="font-bold font-mono text-sm">{missingBooksCount}</span>
            </div>
            <div className="text-[10px] text-purple-700 mt-0.5">Unrecorded purchase</div>
          </div>

          <div
            onClick={() => setStatusFilter('All')}
            className="cursor-pointer p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
          >
            <div className="flex items-center justify-between text-slate-800 font-semibold">
              <span>Total Invoices</span>
              <span className="font-bold font-mono text-sm">{reconciliationData.length}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">View all records</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by invoice no, GSTIN or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-xs font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Matched">🟢 Matched</option>
            <option value="Partially Matched">🟡 Partially Matched</option>
            <option value="Missing in 2B">⚪ Missing in 2B</option>
            <option value="Missing in Books">⚪ Missing in Books</option>
            <option value="Mismatch">🔴 Mismatch</option>
          </select>
        </div>

        <div className="text-xs text-slate-500">
          Books Total: <strong className="font-mono text-slate-800">₹{totalBooksTax.toLocaleString('en-IN')}</strong> | 2B Total:{' '}
          <strong className="font-mono text-blue-800">₹{totalPortalTax.toLocaleString('en-IN')}</strong>
        </div>
      </div>

      {/* Detailed Side-by-Side Reconciliation Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Invoice Details</th>
                <th className="p-3">Supplier (GSTIN)</th>
                <th className="p-3 text-right bg-blue-50/50">Books Tax (₹)</th>
                <th className="p-3 text-right bg-indigo-50/50">2B Portal Tax (₹)</th>
                <th className="p-3 text-right">Tax Diff (₹)</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3">Audit Finding &amp; Recommendation</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => {
                const booksTax = item.booksData
                  ? item.booksData.igst + item.booksData.cgst + item.booksData.sgst
                  : 0;
                const portalTax = item.portalData
                  ? item.portalData.igst + item.portalData.cgst + item.portalData.sgst
                  : 0;
                const diff = booksTax - portalTax;

                return (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono">
                      <div className="font-bold text-blue-900">{item.invoiceNo}</div>
                      <div className="text-[11px] text-slate-500">{item.invoiceDate}</div>
                    </td>

                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{item.supplierName}</div>
                      <div className="text-[11px] font-mono text-slate-500">{item.supplierGstin}</div>
                    </td>

                    <td className="p-3 text-right font-mono bg-blue-50/20 font-medium">
                      {item.booksData ? `₹${booksTax.toLocaleString('en-IN')}` : <span className="text-slate-400 italic">Not in Books</span>}
                    </td>

                    <td className="p-3 text-right font-mono bg-indigo-50/20 font-medium text-blue-800">
                      {item.portalData ? `₹${portalTax.toLocaleString('en-IN')}` : <span className="text-rose-500 italic">Missing in 2B</span>}
                    </td>

                    <td className="p-3 text-right font-mono font-bold">
                      {diff === 0 ? (
                        <span className="text-slate-400">0</span>
                      ) : (
                        <span className={diff > 0 ? 'text-rose-600' : 'text-blue-600'}>
                          {diff > 0 ? `+₹${diff.toLocaleString('en-IN')}` : `-₹${Math.abs(diff).toLocaleString('en-IN')}`}
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Matched'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'Partially Matched'
                            ? 'bg-amber-100 text-amber-800'
                            : item.status === 'Missing in 2B'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-3 text-[11px] text-slate-600 max-w-xs leading-relaxed">
                      {item.differenceExplanation}
                      {item.actionTaken && (
                        <div className="mt-1 font-semibold text-blue-700">
                          Tagged: {item.actionTaken}
                        </div>
                      )}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedItemForAction(item)}
                        className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-semibold px-2.5 py-1 rounded border border-slate-300 text-xs transition"
                      >
                        Action
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Drawer Modal */}
      {selectedItemForAction && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Reconciliation Action</h3>
                <p className="text-slate-500 text-[11px]">
                  Invoice: {selectedItemForAction.invoiceNo} • {selectedItemForAction.supplierName}
                </p>
              </div>
              <button
                onClick={() => setSelectedItemForAction(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            {actionSuccessMessage ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-center font-bold">
                {actionSuccessMessage}
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => handleApplyAction('Claimed in 3B')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition"
                >
                  <div className="font-bold text-emerald-800">Claim in GSTR-3B Table 4(A)(5)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Include full amount in current period Input Tax Credit.
                  </div>
                </button>

                <button
                  onClick={() => handleApplyAction('Accepted Portal Value')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <div className="font-bold text-blue-800">Accept 2B Portal Value (Lower Amount)</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Restrict credit to portal amount to prevent Section 16(2)(aa) notices.
                  </div>
                </button>

                <button
                  onClick={() => handleApplyAction('Pending Supplier Query')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-amber-50 transition"
                >
                  <div className="font-bold text-amber-800">Send Query / Hold Payment to Supplier</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Notify supplier to upload missing invoice in their next GSTR-1.
                  </div>
                </button>

                <button
                  onClick={() => handleApplyAction('Deferred')}
                  className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition"
                >
                  <div className="font-bold text-purple-800">Defer Credit to Next Month</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Hold claim until invoice reflects in subsequent month’s GSTR-2B.
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
