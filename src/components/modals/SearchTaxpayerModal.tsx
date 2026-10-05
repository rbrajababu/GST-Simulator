import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { Search, Building2, CheckCircle2, AlertCircle, X, ShieldCheck } from 'lucide-react';

interface SearchTaxpayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchTaxpayerModal: React.FC<SearchTaxpayerModalProps> = ({ isOpen, onClose }) => {
  const { companies } = useGstPortal();
  const [searchGstin, setSearchGstin] = useState('10ABCDE1234F1Z5');
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchGstin.trim().toUpperCase();

    // Check preloaded companies
    const found = companies.find((c) => c.gstin.toUpperCase() === cleaned);
    if (found) {
      setResult({
        gstin: found.gstin,
        legalName: found.legalName,
        tradeName: found.tradeName,
        state: found.state,
        stateCode: found.stateCode,
        taxpayerType: found.taxpayerType,
        status: found.status,
        regDate: found.registrationDate,
        constitution: found.constitution,
        address: `${found.principalAddress.buildingNo}, ${found.principalAddress.city}, ${found.principalAddress.state} - ${found.principalAddress.pinCode}`,
      });
      return;
    }

    // Realistic fallback generator for any entered GSTIN
    if (cleaned.length === 15) {
      const stateCode = cleaned.substring(0, 2);
      const pan = cleaned.substring(2, 12);
      const stateNames: { [code: string]: string } = {
        '10': 'Bihar',
        '27': 'Maharashtra',
        '29': 'Karnataka',
        '07': 'Delhi',
        '09': 'Uttar Pradesh',
        '19': 'West Bengal',
        '24': 'Gujarat',
        '33': 'Tamil Nadu',
        '36': 'Telangana',
      };

      setResult({
        gstin: cleaned,
        legalName: `ENTERPRISE ${pan} PRIVATE LIMITED`,
        tradeName: `Trading Solutions (${stateNames[stateCode] || 'India'})`,
        state: stateNames[stateCode] || 'State ' + stateCode,
        stateCode: stateCode,
        taxpayerType: 'Regular',
        status: 'Active',
        regDate: '2017-07-01',
        constitution: 'Private Limited Company',
        address: `Commercial Plot, State ${stateCode}, India`,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Search Taxpayer by GSTIN / UIN
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Enter 15-Digit GSTIN / UIN
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchGstin}
                onChange={(e) => setSearchGstin(e.target.value.toUpperCase())}
                placeholder="e.g. 10ABCDE1234F1Z5"
                maxLength={15}
                required
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition"
              >
                Search
              </button>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Try demo GSTIN: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-bold">10ABCDE1234F1Z5</code> or <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-bold">27AACCA1234M1Z2</code>
            </div>
          </div>
        </form>

        {hasSearched && result && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Trade Name</span>
                <div className="font-bold text-sm text-slate-900">{result.tradeName}</div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {result.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500">Legal Name:</span>
                <div className="font-semibold text-slate-800">{result.legalName}</div>
              </div>
              <div>
                <span className="text-slate-500">GSTIN:</span>
                <div className="font-mono font-bold text-blue-900">{result.gstin}</div>
              </div>
              <div>
                <span className="text-slate-500">Taxpayer Type:</span>
                <div className="font-semibold text-slate-800">{result.taxpayerType}</div>
              </div>
              <div>
                <span className="text-slate-500">State:</span>
                <div className="font-semibold text-slate-800">{result.state} ({result.stateCode})</div>
              </div>
              <div>
                <span className="text-slate-500">Registration Date:</span>
                <div className="font-mono text-slate-800">{result.regDate}</div>
              </div>
              <div>
                <span className="text-slate-500">Constitution:</span>
                <div className="font-semibold text-slate-800">{result.constitution}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 text-[11px]">
              <span className="text-slate-500">Principal Place of Business:</span>
              <div className="text-slate-700 mt-0.5">{result.address}</div>
            </div>
          </div>
        )}

        {hasSearched && !result && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-center font-semibold">
            Invalid GSTIN format. Please enter a valid 15-digit alphanumeric Indian GSTIN.
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
