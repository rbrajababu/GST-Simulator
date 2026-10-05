import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { PortalBreadcrumb } from '../layout/PortalBreadcrumb';
import {
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  AlertTriangle,
  Download,
  Eye,
  FileCheck2,
  Scale,
  Search,
} from 'lucide-react';

export const ReturnsHub: React.FC = () => {
  const { currentFY, setCurrentFY, currentPeriod, setCurrentPeriod, gstr1, gstr3b, gstr2bInvoices, setActiveTab } =
    useGstPortal();

  const [selectedQuarter, setSelectedQuarter] = useState('Quarter 2 (Jul - Sep)');
  const [searched, setSearched] = useState(true);

  // Eligible ITC in 2B
  const total2bItc = gstr2bInvoices.reduce(
    (acc, cur) => acc + (cur.itcEligibility === 'Eligible' ? cur.igst + cur.cgst + cur.sgst : 0),
    0
  );

  return (
    <div className="space-y-4">
      {/* Official Breadcrumb & Taxpayer Ribbon */}
      <PortalBreadcrumb items={[{ label: 'Returns', tab: 'returns-hub' }, { label: 'File Returns' }]} />

      {/* Official GST Portal File Returns Search Card */}
      <div className="bg-white rounded border border-slate-300 shadow-2xs overflow-hidden">
        <div className="bg-[#0B3B60] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-between">
          <span>File Returns</span>
          <span className="text-[11px] text-amber-300 font-normal">Fields marked with asterisk (*) are mandatory</span>
        </div>

        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Financial Year <span className="text-red-600">*</span>
              </label>
              <select
                value={currentFY}
                onChange={(e) => setCurrentFY(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
              >
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Quarter <span className="text-red-600">*</span>
              </label>
              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600"
              >
                <option value="Quarter 1 (Apr - Jun)">Quarter 1 (Apr - Jun)</option>
                <option value="Quarter 2 (Jul - Sep)">Quarter 2 (Jul - Sep)</option>
                <option value="Quarter 3 (Oct - Dec)">Quarter 3 (Oct - Dec)</option>
                <option value="Quarter 4 (Jan - Mar)">Quarter 4 (Jan - Mar)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Period <span className="text-red-600">*</span>
              </label>
              <select
                value={currentPeriod}
                onChange={(e) => setCurrentPeriod(e.target.value)}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-bold text-blue-900 focus:outline-none focus:border-blue-600"
              >
                <option value="September 2024">September</option>
                <option value="August 2024">August</option>
                <option value="July 2024">July</option>
              </select>
            </div>

            <div>
              <button
                onClick={() => setSearched(true)}
                className="w-full bg-[#0B3B60] hover:bg-[#00274D] text-white font-bold py-1.5 px-4 rounded text-xs uppercase tracking-wider transition shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>SEARCH</span>
              </button>
            </div>
          </div>
        </div>

        {/* Portal Advisory Ribbon */}
        <div className="bg-[#FFF9E6] border-l-4 border-amber-400 p-3 text-xs text-amber-950 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong>Taxpayer Advisory:</strong> GSTR-1 for period {currentPeriod} is due on 11th Oct 2024. GSTR-2B will be generated on 14th Oct 2024. Monthly summary return GSTR-3B must be filed by 20th Oct 2024 after exhausting IGST ITC under Rule 88A.
          </div>
        </div>
      </div>

      {/* Official Return Tiles Grid matching real GST Portal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Tile 1: GSTR-1 */}
        <div className="bg-white rounded border border-slate-300 shadow-2xs flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span className="text-[11px] font-bold text-blue-900 block leading-tight">
                  Details of outward supplies of goods or services
                </span>
                <span className="text-base font-extrabold text-[#0B3B60]">GSTR-1</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  gstr1.status === 'Filed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {gstr1.status}
              </span>
            </div>

            <div className="text-[11px] space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className="font-bold text-slate-900">11/10/2024</span>
              </div>
              <div className="flex justify-between">
                <span>Total B2B Records:</span>
                <span className="font-bold text-slate-900">{gstr1.b2bInvoices.length}</span>
              </div>
              <div className="flex justify-between">
                <span>ARN:</span>
                <span className="font-mono text-slate-800">{gstr1.arn || '-'}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
            <button
              onClick={() => setActiveTab('gstr-1')}
              className="flex-1 bg-[#0B3B60] hover:bg-[#00274D] text-white font-bold py-1.5 px-2 rounded text-xs text-center uppercase tracking-wide transition shadow-2xs"
            >
              PREPARE ONLINE
            </button>
            <button
              onClick={() => setActiveTab('gstr-1')}
              className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold py-1.5 px-2 rounded text-xs transition"
            >
              PREPARE OFFLINE
            </button>
          </div>
        </div>

        {/* Tile 2: GSTR-2B */}
        <div className="bg-white rounded border border-slate-300 shadow-2xs flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span className="text-[11px] font-bold text-blue-900 block leading-tight">
                  Auto-drafted ITC Statement for the month
                </span>
                <span className="text-base font-extrabold text-[#0B3B60]">GSTR-2B</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                View Only
              </span>
            </div>

            <div className="text-[11px] space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Generated On:</span>
                <span className="font-bold text-slate-900">14/10/2024</span>
              </div>
              <div className="flex justify-between">
                <span>Eligible ITC in 2B:</span>
                <span className="font-bold text-emerald-700 font-mono">₹{total2bItc.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Supplier Invoices:</span>
                <span className="font-bold text-slate-900">{gstr2bInvoices.length} Invoices</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
            <button
              onClick={() => setActiveTab('gstr-2b')}
              className="flex-1 bg-[#0B3B60] hover:bg-[#00274D] text-white font-bold py-1.5 px-2 rounded text-xs text-center uppercase tracking-wide transition shadow-2xs flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>VIEW</span>
            </button>
            <button
              onClick={() => setActiveTab('reconciliation')}
              className="flex-1 bg-[#00A389] hover:bg-[#008f77] text-white font-bold py-1.5 px-2 rounded text-xs text-center uppercase tracking-wide transition shadow-2xs flex items-center justify-center gap-1"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>RECONCILE</span>
            </button>
          </div>
        </div>

        {/* Tile 3: GSTR-3B */}
        <div className="bg-white rounded border border-slate-300 shadow-2xs flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span className="text-[11px] font-bold text-blue-900 block leading-tight">
                  Monthly Return
                </span>
                <span className="text-base font-extrabold text-[#0B3B60]">GSTR-3B</span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  gstr3b.status === 'Filed'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {gstr3b.status}
              </span>
            </div>

            <div className="text-[11px] space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className="font-bold text-slate-900">20/10/2024</span>
              </div>
              <div className="flex justify-between">
                <span>Tax Payable in Cash:</span>
                <span className="font-bold text-slate-900 font-mono">
                  ₹{(gstr3b.taxPayment.paidInCash.igst + gstr3b.taxPayment.paidInCash.cgst + gstr3b.taxPayment.paidInCash.sgst).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ARN:</span>
                <span className="font-mono text-slate-800">{gstr3b.arn || '-'}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
            <button
              onClick={() => setActiveTab('gstr-3b')}
              className="flex-1 bg-[#0B3B60] hover:bg-[#00274D] text-white font-bold py-1.5 px-2 rounded text-xs text-center uppercase tracking-wide transition shadow-2xs"
            >
              PREPARE ONLINE
            </button>
          </div>
        </div>

        {/* Tile 4: Comparison Report */}
        <div className="bg-white rounded border border-slate-300 shadow-2xs flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span className="text-[11px] font-bold text-blue-900 block leading-tight">
                  Comparison of liability declared and ITC claimed
                </span>
                <span className="text-base font-extrabold text-[#0B3B60]">ITC &amp; Tax Comparison</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                Analysis
              </span>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Compare outward tax liability in GSTR-1 vs GSTR-3B and Input Tax Credit claimed in GSTR-3B vs GSTR-2B.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <button
              onClick={() => setActiveTab('reconciliation')}
              className="w-full bg-[#0B3B60] hover:bg-[#00274D] text-white font-bold py-1.5 px-2 rounded text-xs text-center uppercase tracking-wide transition shadow-2xs"
            >
              VIEW COMPARISON REPORT
            </button>
          </div>
        </div>

        {/* Tile 5: Annual Return GSTR-9 */}
        <div className="bg-white rounded border border-slate-300 shadow-2xs flex flex-col justify-between overflow-hidden">
          <div className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
              <div>
                <span className="text-[11px] font-bold text-blue-900 block leading-tight">
                  Annual Return for Regular Taxpayers
                </span>
                <span className="text-base font-extrabold text-[#0B3B60]">GSTR-9</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                Annual
              </span>
            </div>

            <div className="text-[11px] space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className="font-bold text-slate-900">31/12/2025</span>
              </div>
              <div className="flex justify-between">
                <span>Applicability:</span>
                <span className="text-slate-800 font-semibold">Turnover &gt; ₹2 Crore</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200">
            <button
              onClick={() => setActiveTab('learning')}
              className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-1.5 px-2 rounded text-xs text-center uppercase tracking-wide transition"
            >
              STUDY GSTR-9 LESSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
