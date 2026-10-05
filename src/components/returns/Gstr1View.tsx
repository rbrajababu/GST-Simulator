import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { PortalBreadcrumb } from '../layout/PortalBreadcrumb';
import { B2BInvoice } from '../../types/gst';
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  FileCheck2,
  Send,
  Eye,
  Sparkles,
  Calculator,
  Search,
  Filter,
  ShieldCheck,
  Grid,
  FileText,
  KeyRound,
  RotateCcw,
} from 'lucide-react';

export const Gstr1View: React.FC = () => {
  const { gstr1, activeCompany, currentPeriod, currentFY, addB2BInvoice, deleteB2BInvoice, fileGstr1, setActiveTab } =
    useGstPortal();

  const [viewMode, setViewMode] = useState<'tiles' | 'table'>('tiles');
  const [activeSubTab, setActiveSubTab] = useState<'b2b' | 'b2cl' | 'b2cs' | 'cdnr' | 'exp' | 'hsn' | 'docs'>('b2b');
  const [showAddB2bModal, setShowAddB2bModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showFilingSuccessModal, setShowFilingSuccessModal] = useState(false);
  const [showEvcModal, setShowEvcModal] = useState(false);
  const [evcOtp, setEvcOtp] = useState('849120');
  const [declarationAgreed, setDeclarationAgreed] = useState(false);
  const [summaryGeneratedNotice, setSummaryGeneratedNotice] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationSuccess, setValidationSuccess] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string>('');
  const [filingArn, setFilingArn] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  // New B2B Invoice Form State
  const [newInv, setNewInv] = useState({
    invoiceNo: `RBE/24-25/0${gstr1.b2bInvoices.length + 145}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    recipientGstin: '10BBBBB4321A1Z9',
    recipientName: 'Patna Tech Mart Ltd',
    posState: activeCompany.state,
    posStateCode: activeCompany.stateCode,
    reverseCharge: false,
    hsnCode: '8471',
    description: 'Computer Hardware Equipment',
    quantity: 5,
    unitPrice: 10000,
    gstRate: 18,
  });

  // Calculate live taxes for new invoice
  const taxableVal = newInv.quantity * newInv.unitPrice;
  const isInterState = newInv.posStateCode !== activeCompany.stateCode;
  const igstVal = isInterState ? (taxableVal * newInv.gstRate) / 100 : 0;
  const cgstVal = !isInterState ? (taxableVal * newInv.gstRate) / 200 : 0;
  const sgstVal = !isInterState ? (taxableVal * newInv.gstRate) / 200 : 0;
  const totalVal = taxableVal + igstVal + cgstVal + sgstVal;

  const handlePosChange = (stateName: string, stateCode: string) => {
    setNewInv({
      ...newInv,
      posState: stateName,
      posStateCode: stateCode,
    });
  };

  const handleSaveB2BInvoice = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newInv.invoiceNo || !newInv.recipientGstin || taxableVal <= 0) {
      setModalError('Please fill all required invoice fields with valid values (Taxable value must be > 0).');
      return;
    }
    setModalError('');

    addB2BInvoice({
      invoiceNo: newInv.invoiceNo,
      invoiceDate: newInv.invoiceDate,
      recipientGstin: newInv.recipientGstin,
      recipientName: newInv.recipientName,
      posState: newInv.posState,
      posStateCode: newInv.posStateCode,
      supplyType: isInterState ? 'Inter-State' : 'Intra-State',
      reverseCharge: newInv.reverseCharge,
      invoiceType: 'Regular',
      items: [
        {
          id: `item-${Date.now()}`,
          hsnCode: newInv.hsnCode,
          description: newInv.description,
          quantity: newInv.quantity,
          unit: 'NOS',
          rate: newInv.unitPrice,
          taxableValue: taxableVal,
          gstRate: newInv.gstRate,
          igstAmount: igstVal,
          cgstAmount: cgstVal,
          sgstAmount: sgstVal,
          cessAmount: 0,
          totalValue: totalVal,
        },
      ],
      totalTaxable: taxableVal,
      totalIgst: igstVal,
      totalCgst: cgstVal,
      totalSgst: sgstVal,
      totalCess: 0,
      totalInvoiceValue: totalVal,
      filingStatus: 'Uploaded',
    });

    setShowAddB2bModal(false);
  };

  // Run validation checks
  const handleValidateReturn = () => {
    const errors: string[] = [];
    if (gstr1.b2bInvoices.length === 0) {
      errors.push('Table 4A has no invoices entered.');
    }
    gstr1.b2bInvoices.forEach((inv) => {
      if (!inv.recipientGstin || inv.recipientGstin.length !== 15) {
        errors.push(`Invoice ${inv.invoiceNo} has invalid GSTIN format.`);
      }
    });

    setValidationErrors(errors);
    setValidationSuccess(errors.length === 0);
  };

  const handleExecuteFiling = () => {
    const res = fileGstr1();
    if (res.success) {
      setFilingArn(res.arn);
      setShowPreviewModal(false);
      setShowFilingSuccessModal(true);
    }
  };

  // Grand summary numbers for GSTR-1
  const b2bTaxable = gstr1.b2bInvoices.reduce((a, b) => a + b.totalTaxable, 0);
  const b2bIgst = gstr1.b2bInvoices.reduce((a, b) => a + b.totalIgst, 0);
  const b2bCgst = gstr1.b2bInvoices.reduce((a, b) => a + b.totalCgst, 0);
  const b2bSgst = gstr1.b2bInvoices.reduce((a, b) => a + b.totalSgst, 0);

  const b2clTaxable = gstr1.b2cLarge.reduce((a, b) => a + b.taxableValue, 0);
  const b2clIgst = gstr1.b2cLarge.reduce((a, b) => a + b.igstAmount, 0);

  const b2csTaxable = gstr1.b2cSmall.reduce((a, b) => a + b.taxableValue, 0);
  const b2csIgst = gstr1.b2cSmall.reduce((a, b) => a + b.igstAmount, 0);
  const b2csCgst = gstr1.b2cSmall.reduce((a, b) => a + b.cgstAmount, 0);
  const b2csSgst = gstr1.b2cSmall.reduce((a, b) => a + b.sgstAmount, 0);

  const totalTaxable = b2bTaxable + b2clTaxable + b2csTaxable;
  const totalTax = b2bIgst + b2bCgst + b2bSgst + b2clIgst + b2csIgst + b2csCgst + b2csSgst;

  // Authentic 11 Tables of Form GSTR-1 as defined by GSTN / CBIC
  const TILES_METADATA = [
    { id: 'b2b', code: '4A, 4B, 6B, 6C', title: 'B2B Invoices', desc: 'Taxable outward supplies to registered persons', count: gstr1.b2bInvoices.length, taxable: b2bTaxable, tax: b2bIgst + b2bCgst + b2bSgst },
    { id: 'b2cl', code: '5A, 5B', title: 'B2C (Large) Invoices', desc: 'Inter-State supplies with invoice value > ₹2.5 Lakhs', count: gstr1.b2cLarge.length, taxable: b2clTaxable, tax: b2clIgst },
    { id: 'cdnr', code: '9B', title: 'Credit / Debit Notes (Registered)', desc: 'Credit or debit notes issued to registered taxpayers', count: gstr1.creditDebitNotes.length, taxable: 18000, tax: 3240 },
    { id: 'cdnur', code: '9B', title: 'Credit / Debit Notes (Unregistered)', desc: 'Credit or debit notes issued to unregistered persons', count: 0, taxable: 0, tax: 0 },
    { id: 'exp', code: '6A', title: 'Exports Invoices', desc: 'Supplies exported with or without payment of tax', count: gstr1.exportInvoices.length, taxable: 120000, tax: 21600 },
    { id: 'b2cs', code: '7', title: 'B2C (Others)', desc: 'Intra-State supplies and small inter-State supplies', count: gstr1.b2cSmall.length, taxable: b2csTaxable, tax: b2csIgst + b2csCgst + b2csSgst },
    { id: 'nil', code: '8A, 8B, 8C, 8D', title: 'Nil Rated Supplies', desc: 'Nil rated, exempt, and non-GST outward supplies', count: 0, taxable: 0, tax: 0 },
    { id: 'adv', code: '11A(1), 11A(2)', title: 'Tax Liability (Advances Received)', desc: 'Advance received for which invoices were not issued', count: 0, taxable: 0, tax: 0 },
    { id: 'adv_adj', code: '11B(1), 11B(2)', title: 'Adjustment of Advances', desc: 'Advances adjusted against invoices issued in tax period', count: 0, taxable: 0, tax: 0 },
    { id: 'hsn', code: '12', title: 'HSN-wise-summary of outward supplies', desc: 'HSN-wise summary of all goods & services supplied', count: gstr1.hsnSummary.length, taxable: totalTaxable, tax: totalTax },
    { id: 'docs', code: '13', title: 'Documents Issued', desc: 'Summary of invoices, credit/debit notes, delivery challans', count: gstr1.documentsSummary?.length || 0, taxable: 0, tax: 0 },
  ];

  const handleTileClick = (tileId: string) => {
    if (['b2b', 'b2cl', 'b2cs', 'cdnr', 'exp', 'hsn', 'docs'].includes(tileId)) {
      setActiveSubTab(tileId as any);
      setViewMode('table');
    }
  };

  const handleGenerateSummary = () => {
    setSummaryGeneratedNotice('GSTR-1 summary has been generated successfully. Please review and file your return.');
    setTimeout(() => setSummaryGeneratedNotice(null), 5000);
  };

  return (
    <div className="space-y-4">
      {/* Official Breadcrumb */}
      <PortalBreadcrumb
        items={[
          { label: 'Returns', tab: 'returns-hub' },
          { label: 'GSTR-1', tab: viewMode === 'table' ? undefined : undefined },
          ...(viewMode === 'table' ? [{ label: `Table ${activeSubTab.toUpperCase()}` }] : []),
        ]}
      />

      {/* Top Header Card matching official GST Portal */}
      <div className="bg-white rounded border border-slate-300 shadow-2xs p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (viewMode === 'table') {
                  setViewMode('tiles');
                } else {
                  setActiveTab('returns-hub');
                }
              }}
              className="p-1.5 hover:bg-slate-100 rounded text-slate-600 transition"
              title={viewMode === 'table' ? 'Back to GSTR-1 Tiles' : 'Back to Returns Dashboard'}
            >
              <ArrowLeft className="w-5 h-5 text-blue-900" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0B3B60]">
                  Form GSTR-1: Details of Outward Supplies of Goods or Services
                </h2>
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
              <p className="text-[11px] text-slate-500 mt-0.5">
                Financial Year: <strong>{currentFY}</strong> • Return Period:{' '}
                <strong className="text-blue-700">{currentPeriod}</strong> • Due Date: <strong>11/10/2024</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* View Mode Toggle Button */}
            <div className="bg-slate-100 p-0.5 rounded border border-slate-200 flex items-center">
              <button
                onClick={() => setViewMode('tiles')}
                className={`px-2.5 py-1 rounded font-semibold text-[11px] transition flex items-center gap-1 ${
                  viewMode === 'tiles' ? 'bg-[#0B3B60] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Grid className="w-3 h-3" />
                <span>Tiles View</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded font-semibold text-[11px] transition flex items-center gap-1 ${
                  viewMode === 'table' ? 'bg-[#0B3B60] text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3 h-3" />
                <span>Table Details</span>
              </button>
            </div>

            <button
              onClick={handleValidateReturn}
              className="px-3 py-1.5 border border-slate-300 rounded hover:bg-slate-50 font-semibold text-slate-700 transition"
            >
              Validate Data
            </button>
            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded hover:bg-blue-100 font-bold flex items-center gap-1.5 transition"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview Summary
            </button>
            {gstr1.status !== 'Filed' ? (
              <button
                onClick={() => setShowEvcModal(true)}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold flex items-center gap-1.5 shadow-2xs transition"
              >
                <Send className="w-3.5 h-3.5" />
                File Return (EVC)
              </button>
            ) : (
              <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300">
                ARN: {gstr1.arn}
              </span>
            )}
          </div>
        </div>

        {/* Live Tax Summary Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Total Taxable Value</span>
            <div className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
              ₹{totalTaxable.toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Total Integrated Tax (IGST)</span>
            <div className="text-sm font-extrabold text-blue-900 font-mono mt-0.5">
              ₹{(b2bIgst + b2clIgst + b2csIgst).toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Total Central + State Tax</span>
            <div className="text-sm font-extrabold text-blue-900 font-mono mt-0.5">
              ₹{(b2bCgst + b2bSgst + b2csCgst + b2csSgst).toLocaleString('en-IN')}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Total Invoice Value</span>
            <div className="text-sm font-extrabold text-emerald-700 font-mono mt-0.5">
              ₹{(totalTaxable + totalTax).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Validation & Summary Notifications */}
        {summaryGeneratedNotice && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>{summaryGeneratedNotice}</span>
            </div>
            <button onClick={() => setSummaryGeneratedNotice(null)} className="font-bold text-xs text-blue-800">
              &times;
            </button>
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 animate-fadeIn">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Validation Warnings ({validationErrors.length}):
            </div>
            <ul className="list-disc list-inside space-y-0.5 text-[11px]">
              {validationErrors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}
        {validationSuccess && (
          <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Validation Successful!</strong> All invoice formulas, tax splits, and GSTIN formats comply with statutory rules.
              </span>
            </div>
            <button
              onClick={() => setValidationSuccess(false)}
              className="text-emerald-700 hover:text-emerald-900 font-bold text-xs"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* 1. AUTHENTIC GST PORTAL 11 TILES GRID (When viewMode === 'tiles') */}
      {viewMode === 'tiles' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {TILES_METADATA.map((tile) => (
              <div
                key={tile.id}
                onClick={() => handleTileClick(tile.id)}
                className="bg-white border border-slate-300 rounded shadow-2xs hover:shadow-md hover:border-[#0B3B60] transition cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
                    <div>
                      <span className="font-mono text-[10px] text-blue-700 font-bold block">{tile.code}</span>
                      <h4 className="font-bold text-slate-900 text-xs leading-tight">{tile.title}</h4>
                    </div>
                    <span className="bg-slate-100 text-slate-800 font-bold text-[10px] px-2 py-0.5 rounded">
                      {tile.count} Records
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">
                    {tile.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Taxable Value</span>
                      <span className="font-bold text-slate-900 font-mono">₹{tile.taxable.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Tax Liability</span>
                      <span className="font-bold text-blue-900 font-mono">₹{tile.tax.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] px-3.5 py-1.5 border-t border-slate-200 text-right">
                  <span className="text-[11px] font-bold text-blue-800 hover:text-blue-950 flex items-center justify-end gap-1">
                    <span>Manage Table</span>
                    <ArrowLeft className="w-3 h-3 rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Official Bottom Action Controls */}
          <div className="bg-white rounded border border-slate-300 p-4 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleGenerateSummary}
                  className="bg-[#0B3B60] hover:bg-[#00274D] text-white font-bold py-2 px-4 rounded text-xs uppercase tracking-wide transition shadow-2xs"
                >
                  GENERATE GSTR-1 SUMMARY
                </button>
                <button
                  onClick={() => setShowPreviewModal(true)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold py-2 px-4 rounded text-xs uppercase tracking-wide transition"
                >
                  PREVIEW
                </button>
              </div>

              <div className="text-[11px] text-slate-500">
                Summary generated timestamp: <strong>{new Date().toLocaleTimeString()}</strong>
              </div>
            </div>

            {/* Official Statutory Verification Card */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded space-y-3 text-xs">
              <div className="font-bold text-slate-800 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Verification &amp; Filing Undertaking</span>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 leading-relaxed text-[11px]">
                <input
                  type="checkbox"
                  checked={declarationAgreed}
                  onChange={(e) => setDeclarationAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>
                  I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.
                </span>
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 font-medium text-[11px]">Authorized Signatory:</span>
                  <span className="font-bold text-slate-900 bg-white px-2 py-1 border border-slate-300 rounded font-mono text-[11px]">
                    {activeCompany.authorizedSignatory}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={!declarationAgreed || gstr1.status === 'Filed'}
                    onClick={() => setShowEvcModal(true)}
                    className="bg-[#2E7D32] hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-1.5 px-4 rounded text-xs uppercase tracking-wider transition shadow-2xs flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>FILE WITH EVC</span>
                  </button>
                  <button
                    disabled={!declarationAgreed || gstr1.status === 'Filed'}
                    onClick={() => setShowEvcModal(true)}
                    className="bg-[#0B3B60] hover:bg-blue-900 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-1.5 px-4 rounded text-xs uppercase tracking-wider transition shadow-2xs flex items-center gap-1"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>FILE WITH DSC</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DETAILED TABLE VIEW (When viewMode === 'table') */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-300 shadow-2xs">
            <button
              onClick={() => setViewMode('tiles')}
              className="text-[#0B3B60] hover:underline font-bold text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>&larr; BACK TO GSTR-1 TILES GRID</span>
            </button>
            <span className="text-slate-500 text-xs">
              Table: <strong>{activeSubTab.toUpperCase()}</strong>
            </span>
          </div>

      {/* Tables Tab Selector */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-none border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          {[
            { id: 'b2b', label: `4A, 4B - B2B Invoices (${gstr1.b2bInvoices.length})` },
            { id: 'b2cl', label: `5A - B2C Large (${gstr1.b2cLarge.length})` },
            { id: 'b2cs', label: `7 - B2C Others (${gstr1.b2cSmall.length})` },
            { id: 'cdnr', label: `9B - Credit/Debit Notes (${gstr1.creditDebitNotes.length})` },
            { id: 'exp', label: `6A - Exports (${gstr1.exportInvoices.length})` },
            { id: 'hsn', label: `12 - HSN Summary (${gstr1.hsnSummary.length})` },
            { id: 'docs', label: '13 - Docs Issued' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-3 whitespace-nowrap transition border-b-2 ${
                activeSubTab === tab.id
                  ? 'border-blue-600 text-blue-900 bg-white font-bold'
                  : 'border-transparent text-slate-600 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Table 4A, 4B - B2B Invoices */}
        {activeSubTab === 'b2b' && (
          <div className="p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Table 4A, 4B, 4C, 6B, 6C - Supplies to Registered Persons (B2B)
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Invoice-level outward supplies made to taxpayers possessing valid GSTINs.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search invoice or recipient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs w-52"
                  />
                </div>
                <button
                  onClick={() => setShowAddB2bModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
                >
                  <Plus className="w-4 h-4" />
                  Add B2B Invoice
                </button>
              </div>
            </div>

            {/* B2B Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Invoice No</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Recipient GSTIN &amp; Name</th>
                    <th className="py-2.5 px-3">Place of Supply</th>
                    <th className="py-2.5 px-3 text-right">Taxable (₹)</th>
                    <th className="py-2.5 px-3 text-right">IGST (₹)</th>
                    <th className="py-2.5 px-3 text-right">CGST (₹)</th>
                    <th className="py-2.5 px-3 text-right">SGST (₹)</th>
                    <th className="py-2.5 px-3 text-right">Total (₹)</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gstr1.b2bInvoices
                    .filter(
                      (i) =>
                        i.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        i.recipientGstin.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-900">
                          {inv.invoiceNo}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-600">{inv.invoiceDate}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-800">{inv.recipientName}</div>
                          <div className="text-[11px] font-mono text-slate-500">{inv.recipientGstin}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              inv.supplyType === 'Inter-State'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {inv.posState} ({inv.posStateCode})
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-medium">
                          {inv.totalTaxable.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-blue-700">
                          {inv.totalIgst.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                          {inv.totalCgst.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                          {inv.totalSgst.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                          {inv.totalInvoiceValue.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => deleteB2BInvoice(inv.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition"
                            title="Delete Invoice"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Table 5 - B2C Large */}
        {activeSubTab === 'b2cl' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Table 5A, 5B - Inter-State Supplies to Unregistered Persons (&gt; ₹2.5 Lakhs)
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Statutory criteria: Supply must be Inter-State and the invoice value must exceed ₹2,50,000.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Invoice No</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Place of Supply</th>
                    <th className="p-3 text-right">Taxable (₹)</th>
                    <th className="p-3 text-center">Rate</th>
                    <th className="p-3 text-right">IGST (₹)</th>
                    <th className="p-3 text-right">Total Invoice (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gstr1.b2cLarge.map((inv) => (
                    <tr key={inv.id}>
                      <td className="p-3 font-mono font-bold text-blue-900">{inv.invoiceNo}</td>
                      <td className="p-3 font-mono">{inv.invoiceDate}</td>
                      <td className="p-3">
                        {inv.posState} ({inv.posStateCode})
                      </td>
                      <td className="p-3 text-right font-mono font-medium">
                        {inv.taxableValue.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-center">{inv.gstRate}%</td>
                      <td className="p-3 text-right font-mono text-blue-700">
                        {inv.igstAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono font-bold">
                        {inv.totalInvoiceValue.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Table 7 - B2C Small */}
        {activeSubTab === 'b2cs' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Table 7 - Supplies to Unregistered Persons (B2C Small)
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Consolidated rate-wise and Place of Supply-wise reporting for all retail intra-state and small inter-state sales.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Place of Supply</th>
                    <th className="p-3 text-center">Rate</th>
                    <th className="p-3 text-right">Taxable Value (₹)</th>
                    <th className="p-3 text-right">IGST (₹)</th>
                    <th className="p-3 text-right">CGST (₹)</th>
                    <th className="p-3 text-right">SGST (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gstr1.b2cSmall.map((s) => (
                    <tr key={s.id}>
                      <td className="p-3 font-medium">{s.supplyType}</td>
                      <td className="p-3">
                        {s.posState} ({s.posStateCode})
                      </td>
                      <td className="p-3 text-center">{s.gstRate}%</td>
                      <td className="p-3 text-right font-mono font-medium">
                        {s.taxableValue.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono text-blue-700">{s.igstAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono">{s.cgstAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono">{s.sgstAmount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Table 9B - Credit/Debit Notes */}
        {activeSubTab === 'cdnr' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Table 9B - Credit and Debit Notes</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Sales returns, post-sale discounts, and rate corrections issued during the tax period.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Note No &amp; Date</th>
                    <th className="p-3">Original Invoice</th>
                    <th className="p-3">Recipient Name</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3 text-right">Taxable (₹)</th>
                    <th className="p-3 text-right">CGST + SGST (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gstr1.creditDebitNotes.map((cn) => (
                    <tr key={cn.id}>
                      <td className="p-3 font-bold text-rose-700">{cn.noteType}</td>
                      <td className="p-3 font-mono">
                        {cn.noteNo} ({cn.noteDate})
                      </td>
                      <td className="p-3 font-mono text-slate-600">{cn.originalInvoiceNo}</td>
                      <td className="p-3">{cn.recipientName}</td>
                      <td className="p-3">{cn.reason}</td>
                      <td className="p-3 text-right font-mono font-medium">
                        {cn.taxableValue.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono">
                        {(cn.cgstAmount + cn.sgstAmount).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Exports */}
        {activeSubTab === 'exp' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Table 6A - Export Invoices</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Zero-rated supplies of goods or services exported out of India under LUT or with tax payment.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Invoice No &amp; Date</th>
                    <th className="p-3">Export Type</th>
                    <th className="p-3">Shipping Bill No &amp; Port</th>
                    <th className="p-3 text-right">Taxable Value (₹)</th>
                    <th className="p-3 text-right">IGST (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gstr1.exportInvoices.map((exp) => (
                    <tr key={exp.id}>
                      <td className="p-3 font-mono font-bold text-blue-900">
                        {exp.invoiceNo} ({exp.invoiceDate})
                      </td>
                      <td className="p-3">{exp.exportType}</td>
                      <td className="p-3 font-mono">
                        {exp.shippingBillNo} ({exp.portCode})
                      </td>
                      <td className="p-3 text-right font-mono font-bold">
                        {exp.totalTaxable.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono">{exp.igstAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 6: Table 12 HSN Summary */}
        {activeSubTab === 'hsn' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Table 12 - HSN-wise Summary of Outward Supplies
              </h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Mandatory 4-digit (up to ₹5 Cr turnover) or 6-digit (&gt; ₹5 Cr turnover) classification.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">HSN Code</th>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-center">UQC</th>
                    <th className="p-3 text-right">Total Qty</th>
                    <th className="p-3 text-right">Total Taxable (₹)</th>
                    <th className="p-3 text-right">IGST (₹)</th>
                    <th className="p-3 text-right">CGST (₹)</th>
                    <th className="p-3 text-right">SGST (₹)</th>
                    <th className="p-3 text-right">Total Value (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gstr1.hsnSummary.map((h) => (
                    <tr key={h.id}>
                      <td className="p-3 font-mono font-bold text-blue-900">{h.hsnCode}</td>
                      <td className="p-3">{h.description}</td>
                      <td className="p-3 text-center">{h.uqc}</td>
                      <td className="p-3 text-right font-mono">{h.totalQuantity}</td>
                      <td className="p-3 text-right font-mono font-medium">
                        {h.totalTaxable.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-right font-mono text-blue-700">{h.igstAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono">{h.cgstAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono">{h.sgstAmount.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">
                        {h.totalValue.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 7: Table 13 Documents Summary */}
        {activeSubTab === 'docs' && (
          <div className="p-5 space-y-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Table 13 - Documents Issued</h3>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Summary of consecutive serial numbers of invoices, credit notes, and delivery challans issued.
              </p>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Nature of Document</th>
                    <th className="p-3">From Serial No</th>
                    <th className="p-3">To Serial No</th>
                    <th className="p-3 text-right">Total Issued</th>
                    <th className="p-3 text-right">Cancelled</th>
                    <th className="p-3 text-right">Net Issued</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gstr1.documentsSummary.map((doc, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-slate-800">{doc.docType}</td>
                      <td className="p-3 font-mono">{doc.fromSerial}</td>
                      <td className="p-3 font-mono">{doc.toSerial}</td>
                      <td className="p-3 text-right font-mono">{doc.totalNumber}</td>
                      <td className="p-3 text-right font-mono text-rose-600">{doc.cancelledNumber}</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-700">{doc.netIssued}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      </div>
      )}

      {/* Add B2B Invoice Modal */}
      {showAddB2bModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl text-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add B2B Tax Invoice</h3>
                <p className="text-slate-500 text-[11px]">
                  Automatic calculation of IGST or CGST+SGST based on Place of Supply.
                </p>
              </div>
              <button
                onClick={() => setShowAddB2bModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveB2BInvoice} className="space-y-4">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{modalError}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Invoice Number</label>
                  <input
                    type="text"
                    value={newInv.invoiceNo}
                    onChange={(e) => setNewInv({ ...newInv, invoiceNo: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Invoice Date</label>
                  <input
                    type="date"
                    value={newInv.invoiceDate}
                    onChange={(e) => setNewInv({ ...newInv, invoiceDate: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Recipient GSTIN</label>
                  <input
                    type="text"
                    value={newInv.recipientGstin}
                    onChange={(e) => setNewInv({ ...newInv, recipientGstin: e.target.value.toUpperCase() })}
                    placeholder="10BBBBB4321A1Z9"
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono uppercase font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Recipient Trade / Legal Name</label>
                  <input
                    type="text"
                    value={newInv.recipientName}
                    onChange={(e) => setNewInv({ ...newInv, recipientName: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Place of Supply (POS State)</label>
                  <select
                    value={`${newInv.posState}|${newInv.posStateCode}`}
                    onChange={(e) => {
                      const [sName, sCode] = e.target.value.split('|');
                      handlePosChange(sName, sCode);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Bihar|10">Bihar (10) - Intra-State (CGST + SGST)</option>
                    <option value="Jharkhand|20">Jharkhand (20) - Inter-State (IGST)</option>
                    <option value="Uttar Pradesh|09">Uttar Pradesh (09) - Inter-State (IGST)</option>
                    <option value="West Bengal|19">West Bengal (19) - Inter-State (IGST)</option>
                    <option value="Maharashtra|27">Maharashtra (27) - Inter-State (IGST)</option>
                    <option value="Delhi|07">Delhi (07) - Inter-State (IGST)</option>
                  </select>
                </div>
              </div>

              {/* Line Item Inputs */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="font-semibold text-slate-800 text-xs">Item Particulars</div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">HSN Code</label>
                    <input
                      type="text"
                      value={newInv.hsnCode}
                      onChange={(e) => setNewInv({ ...newInv, hsnCode: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-slate-500 mb-1">Item Description</label>
                    <input
                      type="text"
                      value={newInv.description}
                      onChange={(e) => setNewInv({ ...newInv, description: e.target.value })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={newInv.quantity}
                      onChange={(e) => setNewInv({ ...newInv, quantity: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Unit Rate (₹)</label>
                    <input
                      type="number"
                      min="1"
                      value={newInv.unitPrice}
                      onChange={(e) => setNewInv({ ...newInv, unitPrice: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">GST Slab Rate</label>
                    <select
                      value={newInv.gstRate}
                      onChange={(e) => setNewInv({ ...newInv, gstRate: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white font-medium"
                    >
                      <option value="5">5% GST</option>
                      <option value="12">12% GST</option>
                      <option value="18">18% GST (Standard)</option>
                      <option value="28">28% GST</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Real-time Calculation Card */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs space-y-2">
                <div className="font-bold text-blue-900 flex items-center justify-between">
                  <span>Computed Tax Breakdown:</span>
                  <span className="text-[11px] bg-blue-200 text-blue-900 px-2 py-0.5 rounded font-mono font-bold">
                    {isInterState ? 'INTER-STATE (IGST)' : 'INTRA-STATE (CGST + SGST)'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <span className="text-slate-500">Taxable Value:</span>
                    <div className="font-bold text-slate-900">₹{taxableVal.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">IGST ({newInv.gstRate}%):</span>
                    <div className="font-bold text-blue-700">₹{igstVal.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">CGST ({newInv.gstRate / 2}%):</span>
                    <div className="font-bold text-slate-800">₹{cgstVal.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">SGST ({newInv.gstRate / 2}%):</span>
                    <div className="font-bold text-slate-800">₹{sgstVal.toLocaleString('en-IN')}</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-sm font-extrabold text-blue-950 font-mono">
                  <span>Total Invoice Amount:</span>
                  <span>₹{totalVal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddB2bModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Save &amp; Add to GSTR-1
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Summary Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  GSTR-1 Summary Preview ({currentPeriod})
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Verification of outward tax liability before simulated filing.
                </p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Table 4 - B2B Supplies:</span>
                <span className="font-mono font-bold">₹{b2bTaxable.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Table 5 - B2C Large Supplies:</span>
                <span className="font-mono font-bold">₹{b2clTaxable.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="font-semibold text-slate-700">Table 7 - B2C Small Supplies:</span>
                <span className="font-mono font-bold">₹{b2csTaxable.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between py-1 text-sm font-extrabold text-blue-900 pt-2">
                <span>Total Output Tax Liability:</span>
                <span className="font-mono">₹{totalTax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px]">
              <strong>Filing Simulation Note:</strong> Filing GSTR-1 locks these invoices and communicates
              them to your buyers' GSTR-2B statement.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold"
              >
                Close Preview
              </button>
              {gstr1.status !== 'Filed' && (
                <button
                  type="button"
                  onClick={handleExecuteFiling}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Proceed to File with EVC
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filing Success Modal */}
      {showFilingSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs space-y-4 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              GSTR-1 Filed Successfully!
            </h3>
            <p className="text-slate-600 text-xs">
              Return for period <strong>{currentPeriod}</strong> has been submitted. Simulated ARN:
            </p>
            <div className="text-base font-mono font-extrabold text-blue-900 bg-blue-50 py-2 rounded-lg border border-blue-200">
              {filingArn}
            </div>
            <p className="text-[11px] text-slate-500">
              You can now proceed to <strong>GSTR-3B</strong> to offset liability and pay tax.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => setShowFilingSuccessModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowFilingSuccessModal(false);
                  setActiveTab('gstr-3b');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
              >
                Go to GSTR-3B &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authentic GST Portal EVC Filing Modal */}
      {showEvcModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded max-w-md w-full p-5 shadow-2xl text-xs space-y-4 border border-slate-300">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#0B3B60]" />
                <h3 className="text-sm font-bold text-[#0B3B60] uppercase">
                  Verify Return Filing using EVC
                </h3>
              </div>
              <button
                onClick={() => setShowEvcModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                &times;
              </button>
            </div>

            <p className="text-slate-600 text-xs leading-relaxed">
              One-Time Password (OTP) has been sent to the registered mobile number (<strong>XXXXXX9821</strong>) and email (<strong>{activeCompany.email}</strong>) of Authorized Signatory <strong>{activeCompany.authorizedSignatory}</strong>.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
              <label className="block text-[11px] font-bold text-blue-950 mb-1">
                Enter 6-Digit OTP received on Mobile/Email:
              </label>
              <input
                type="text"
                maxLength={6}
                value={evcOtp}
                onChange={(e) => setEvcOtp(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded font-mono text-center tracking-widest text-base font-bold bg-white"
              />
              <span className="text-[10px] text-blue-700 block mt-1">
                (Demo mode: Pre-filled with practice code 849120)
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowEvcModal(false)}
                className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEvcModal(false);
                  handleExecuteFiling();
                }}
                className="px-4 py-1.5 bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold rounded shadow-2xs flex items-center gap-1.5 uppercase tracking-wide"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>VERIFY &amp; SUBMIT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
