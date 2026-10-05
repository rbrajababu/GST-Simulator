import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import {
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Scale,
  Calendar,
} from 'lucide-react';

export const Gstr2bView: React.FC = () => {
  const { gstr2bInvoices, currentPeriod, currentFY, activeCompany, setActiveTab } = useGstPortal();

  const [supplierGstinFilter, setSupplierGstinFilter] = useState('');
  const [eligibilityFilter, setEligibilityFilter] = useState<'All' | 'Eligible' | 'Ineligible'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = gstr2bInvoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.supplierGstin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGstin = supplierGstinFilter === '' || inv.supplierGstin === supplierGstinFilter;
    const matchesEligibility = eligibilityFilter === 'All' || inv.itcEligibility === eligibilityFilter;

    return matchesSearch && matchesGstin && matchesEligibility;
  });

  const totalTaxable = filteredInvoices.reduce((a, b) => a + b.taxableValue, 0);
  const totalEligibleItc = filteredInvoices.reduce(
    (a, b) => a + (b.itcEligibility === 'Eligible' ? b.igst + b.cgst + b.sgst : 0),
    0
  );
  const totalIneligibleItc = filteredInvoices.reduce(
    (a, b) => a + (b.itcEligibility === 'Ineligible' ? b.igst + b.cgst + b.sgst : 0),
    0
  );

  const handleDownloadDemoJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(gstr2bInvoices, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `GSTR2B_Demo_${currentPeriod.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Form GSTR-2B: Auto-Drafted ITC Statement
              </h2>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Static Statement
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Generated on <strong>14th October 2024</strong> for period{' '}
              <strong className="text-blue-700">{currentPeriod}</strong> ({currentFY})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reconciliation')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              Reconcile with Books
            </button>
            <button
              onClick={handleDownloadDemoJson}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              Download Demo JSON
            </button>
          </div>
        </div>

        {/* Totals Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400">Total Invoices</span>
            <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
              {filteredInvoices.length}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Total Taxable Value</span>
            <div className="text-base font-extrabold text-slate-900 font-mono mt-0.5">
              ₹{totalTaxable.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Total Eligible ITC</span>
            <div className="text-base font-extrabold text-emerald-700 font-mono mt-0.5">
              ₹{totalEligibleItc.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400">Ineligible / Blocked ITC (17(5))</span>
            <div className="text-base font-extrabold text-rose-700 font-mono mt-0.5">
              ₹{totalIneligibleItc.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search invoice or supplier..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs w-56"
            />
          </div>

          {/* Eligibility Filter */}
          <select
            value={eligibilityFilter}
            onChange={(e) => setEligibilityFilter(e.target.value as any)}
            className="px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-xs"
          >
            <option value="All">All ITC Status</option>
            <option value="Eligible">Eligible ITC Only</option>
            <option value="Ineligible">Ineligible (17(5)) Only</option>
          </select>
        </div>

        <div className="text-slate-500 text-xs">
          Showing <strong>{filteredInvoices.length}</strong> of {gstr2bInvoices.length} invoices
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Date</th>
                <th className="p-3">Supplier GSTIN &amp; Name</th>
                <th className="p-3 text-center">Filing Date</th>
                <th className="p-3 text-right">Taxable (₹)</th>
                <th className="p-3 text-right">IGST (₹)</th>
                <th className="p-3 text-right">CGST (₹)</th>
                <th className="p-3 text-right">SGST (₹)</th>
                <th className="p-3 text-center">ITC Eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-900">{inv.invoiceNo}</td>
                  <td className="p-3 font-mono text-slate-600">{inv.invoiceDate}</td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{inv.supplierName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{inv.supplierGstin}</div>
                  </td>
                  <td className="p-3 text-center font-mono text-slate-500">{inv.supplierFilingDate || '-'}</td>
                  <td className="p-3 text-right font-mono font-medium">
                    {inv.taxableValue.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-right font-mono text-blue-700">
                    {inv.igst.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-right font-mono text-slate-700">
                    {inv.cgst.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-right font-mono text-slate-700">
                    {inv.sgst.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.itcEligibility === 'Eligible'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {inv.itcEligibility === 'Eligible' ? 'Eligible' : 'Ineligible (17(5))'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
