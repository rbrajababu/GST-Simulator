import React, { useState } from 'react';
import {
  Calculator,
  Percent,
  Clock,
  RotateCcw,
  Copy,
  Printer,
  Sparkles,
  Info,
  Scale,
} from 'lucide-react';

export const GstCalculatorView: React.FC = () => {
  const [calcMode, setCalcMode] = useState<'standard' | 'interest' | 'latefee'>('standard');

  // Standard GST Calculator State
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(18);
  const [calcType, setCalcType] = useState<'exclusive' | 'inclusive'>('exclusive');
  const [supplyType, setSupplyType] = useState<'intra' | 'inter'>('intra');
  const [isRcm, setIsRcm] = useState(false);
  const [copiedBreakdown, setCopiedBreakdown] = useState(false);

  // Interest Calculator State (Section 50)
  const [taxCashAmount, setTaxCashAmount] = useState(50000);
  const [daysDelayed, setDaysDelayed] = useState(25);
  const [interestRate, setInterestRate] = useState(18);

  // Late Fee Calculator State (Section 47)
  const [lateDays, setLateDays] = useState(12);
  const [isNilReturn, setIsNilReturn] = useState(false);

  // Computations
  let taxableValue = 0;
  let totalGst = 0;
  let cgst = 0;
  let sgst = 0;
  let igst = 0;
  let totalInvoice = 0;

  if (calcType === 'exclusive') {
    taxableValue = amount;
    totalGst = (taxableValue * rate) / 100;
    totalInvoice = taxableValue + totalGst;
  } else {
    // Inclusive: Amount = Taxable * (1 + rate/100)
    taxableValue = (amount * 100) / (100 + rate);
    totalGst = amount - taxableValue;
    totalInvoice = amount;
  }

  if (supplyType === 'intra') {
    cgst = totalGst / 2;
    sgst = totalGst / 2;
    igst = 0;
  } else {
    igst = totalGst;
    cgst = 0;
    sgst = 0;
  }

  // Interest under Section 50: (Tax * 18% * Days) / 365
  const interestAmount = Math.round((taxCashAmount * (interestRate / 100) * daysDelayed) / 365);

  // Late fee under Section 47: Normal ₹50/day (₹25 CGST + ₹25 SGST) max ₹10,000; Nil ₹20/day max ₹500
  const dailyFee = isNilReturn ? 20 : 50;
  const maxCap = isNilReturn ? 500 : 10000;
  const rawLateFee = lateDays * dailyFee;
  const lateFeeAmount = Math.min(rawLateFee, maxCap);
  const lateFeeCgst = lateFeeAmount / 2;
  const lateFeeSgst = lateFeeAmount / 2;

  const handleCopyBreakdown = () => {
    const text = `Taxable Value: ₹${taxableValue.toFixed(2)} | GST Rate: ${rate}% | ${supplyType === 'intra' ? `CGST: ₹${cgst.toFixed(2)}, SGST: ₹${sgst.toFixed(2)}` : `IGST: ₹${igst.toFixed(2)}`} | Total Invoice: ₹${totalInvoice.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopiedBreakdown(true);
    setTimeout(() => setCopiedBreakdown(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Statutory GST Calculators
              </h2>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                CGST &amp; IGST Act Formulas
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive tools for computing forward/inclusive GST, Section 50 Interest, and Section 47 Late Fees.
            </p>
          </div>

          {/* Calculator Mode Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setCalcMode('standard')}
              className={`px-3 py-1.5 rounded-md transition ${
                calcMode === 'standard' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              GST Value &amp; Split
            </button>
            <button
              onClick={() => setCalcMode('interest')}
              className={`px-3 py-1.5 rounded-md transition ${
                calcMode === 'interest' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interest (Sec 50)
            </button>
            <button
              onClick={() => setCalcMode('latefee')}
              className={`px-3 py-1.5 rounded-md transition ${
                calcMode === 'latefee' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Late Fee (Sec 47)
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: Standard GST Calculator */}
      {calcMode === 'standard' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Inputs Column */}
          <div className="md:col-span-6 bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              Calculator Parameters
            </h3>

            {/* Exclusive vs Inclusive */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Calculation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalcType('exclusive')}
                  className={`py-2 px-3 rounded-lg border font-semibold text-center transition ${
                    calcType === 'exclusive'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  GST Exclusive (Taxable + GST)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcType('inclusive')}
                  className={`py-2 px-3 rounded-lg border font-semibold text-center transition ${
                    calcType === 'inclusive'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  GST Inclusive (Back-calculation)
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                {calcType === 'exclusive' ? 'Taxable Base Amount (₹)' : 'Total Gross Invoice Amount (₹)'}
              </label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono font-bold"
              />
            </div>

            {/* GST Rate Preset Chips */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">GST Slab Rate (%)</label>
              <div className="grid grid-cols-5 gap-2">
                {[0, 5, 12, 18, 28].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRate(r)}
                    className={`py-2 rounded-lg border font-bold text-center transition ${
                      rate === r
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Supply Type */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Supply Nature (Place of Supply)</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSupplyType('intra')}
                  className={`py-2 px-3 rounded-lg border font-semibold text-center transition ${
                    supplyType === 'intra'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Intra-State (CGST + SGST)
                </button>
                <button
                  type="button"
                  onClick={() => setSupplyType('inter')}
                  className={`py-2 px-3 rounded-lg border font-semibold text-center transition ${
                    supplyType === 'inter'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Inter-State (IGST)
                </button>
              </div>
            </div>

            {/* Reverse Charge Toggle */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={isRcm}
                  onChange={(e) => setIsRcm(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span>Reverse Charge Mechanism (RCM) applies (Tax paid by Recipient)</span>
              </label>
            </div>
          </div>

          {/* Results Output Column */}
          <div className="md:col-span-6 bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 text-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-bold text-slate-900 text-sm">Calculated Invoice Tax Breakup</h3>
                <span className="font-mono text-xs text-blue-700 font-bold">Rate: {rate}%</span>
              </div>

              {/* Summary Cards */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-600 font-sans">Taxable Value:</span>
                  <span className="font-bold text-slate-900">₹{taxableValue.toFixed(2)}</span>
                </div>

                {supplyType === 'intra' ? (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-200/80">
                      <span className="text-slate-600 font-sans">CGST ({rate / 2}%):</span>
                      <span className="font-bold text-blue-800">₹{cgst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/80">
                      <span className="text-slate-600 font-sans">SGST ({rate / 2}%):</span>
                      <span className="font-bold text-blue-800">₹{sgst.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-600 font-sans">IGST ({rate}%):</span>
                    <span className="font-bold text-blue-800">₹{igst.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-200/80">
                  <span className="text-slate-600 font-sans">Total Tax Component:</span>
                  <span className="font-bold text-amber-900">₹{totalGst.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-2 text-base font-extrabold text-slate-900">
                  <span className="font-sans">Total Invoice Value:</span>
                  <span className="text-emerald-700">₹{totalInvoice.toFixed(2)}</span>
                </div>
              </div>

              {isRcm && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px] leading-relaxed">
                  <strong>RCM Notice:</strong> Tax of ₹{totalGst.toFixed(2)} is payable by the recipient in cash
                  through Electronic Cash Ledger under Table 3.1(d) of GSTR-3B.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleCopyBreakdown}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedBreakdown ? 'Copied to Clipboard!' : 'Copy Tax Slip'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: Interest Calculator (Section 50) */}
      {calcMode === 'interest' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 max-w-2xl mx-auto space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Section 50 Interest Calculator (Delayed Payment of Tax)
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Under the proviso to Section 50(1), interest at 18% p.a. is calculated ONLY on the net tax liability
              paid in cash through the Electronic Cash Ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Net Cash Tax Due (₹)</label>
              <input
                type="number"
                value={taxCashAmount}
                onChange={(e) => setTaxCashAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Number of Days Delayed</label>
              <input
                type="number"
                value={daysDelayed}
                onChange={(e) => setDaysDelayed(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Interest Rate (% p.a.)</label>
              <input
                type="number"
                disabled
                value={interestRate}
                className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg font-mono font-bold text-slate-500"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2 font-mono">
            <div className="text-xs text-amber-900 font-sans font-bold">
              Interest Calculation Formula:
            </div>
            <div className="text-[11px] text-slate-700">
              ₹{taxCashAmount.toLocaleString('en-IN')} × 18% × {daysDelayed} days ÷ 365 =
            </div>
            <div className="text-xl font-extrabold text-amber-950 pt-1">
              ₹{interestAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-500 font-sans">
              To be reported under Table 6.1 (Interest column) in Form GSTR-3B.
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: Late Fee Calculator (Section 47) */}
      {calcMode === 'latefee' && (
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6 max-w-2xl mx-auto space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">
              Section 47 Late Fee Calculator (Delayed Return Filing)
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Normal returns: ₹50/day (₹25 CGST + ₹25 SGST) max ₹10,000. Nil returns: ₹20/day (₹10 CGST + ₹10 SGST) max ₹500.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Number of Days Delayed</label>
              <input
                type="number"
                value={lateDays}
                onChange={(e) => setLateDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={isNilReturn}
                  onChange={(e) => setIsNilReturn(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span>Nil Tax Liability Return (Reduced Cap of ₹500)</span>
              </label>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2 font-mono">
            <div className="text-xs text-blue-900 font-sans font-bold">
              Late Fee Computation:
            </div>
            <div className="text-[11px] text-slate-700">
              {lateDays} days × ₹{dailyFee}/day = ₹{rawLateFee.toLocaleString('en-IN')}{' '}
              {rawLateFee > maxCap && `(Statutory cap of ₹${maxCap.toLocaleString('en-IN')} applied)`}
            </div>
            <div className="text-xl font-extrabold text-blue-950 pt-1">
              ₹{lateFeeAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-slate-600 font-sans">
              Split: CGST = ₹{lateFeeCgst.toLocaleString('en-IN')} | SGST = ₹{lateFeeSgst.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
