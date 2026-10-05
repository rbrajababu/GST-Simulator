import React from 'react';
import { Building, CheckCircle2, Info, X, ExternalLink } from 'lucide-react';

interface MultiStateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRegistration: () => void;
}

export const MultiStateModal: React.FC<MultiStateModalProps> = ({
  isOpen,
  onClose,
  onStartRegistration,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl text-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-700" />
            <h3 className="text-base font-bold text-slate-900">
              Facility for Multi-State Registration
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-slate-700 leading-relaxed">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-950 font-medium">
            <strong>Advisory (Oct 1st, 2026):</strong> Taxpayers operating in multiple States or Union
            Territories under a single PAN can now initiate concurrent applications across multiple jurisdictions
            using standardized promoter and PAN profile credentials.
          </div>

          <div className="space-y-1.5 text-[11px]">
            <div className="font-bold text-slate-900">Key Features of Multi-State Facility:</div>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Common Part-A validation across all requested State jurisdictions.</li>
              <li>Single Aadhaar authentication for primary authorized signatories.</li>
              <li>Separate Form GST REG-06 and distinct 15-digit GSTINs generated per State.</li>
              <li>Synchronized profile details reducing duplication for enterprises.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onStartRegistration();
            }}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm"
          >
            Launch Registration Simulator (REG-01)
          </button>
        </div>
      </div>
    </div>
  );
};
