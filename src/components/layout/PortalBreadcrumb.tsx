import React from 'react';
import { Home, ChevronRight, Building2, Calendar, FileText } from 'lucide-react';
import { useGstPortal } from '../../context/GstPortalContext';

interface BreadcrumbItem {
  label: string;
  tab?: string;
}

interface PortalBreadcrumbProps {
  items: BreadcrumbItem[];
  showTaxpayerBar?: boolean;
}

export const PortalBreadcrumb: React.FC<PortalBreadcrumbProps> = ({
  items,
  showTaxpayerBar = true,
}) => {
  const { activeCompany, currentFY, currentPeriod, setActiveTab } = useGstPortal();

  return (
    <div className="mb-4 space-y-2">
      {/* Official GST Portal Breadcrumbs Bar */}
      <div className="bg-[#EAEFF5] border-b border-slate-300/80 px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] text-slate-700 shadow-2xs">
        <div className="flex items-center space-x-1.5 font-medium">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="text-blue-800 hover:text-blue-950 flex items-center gap-1 font-semibold"
            title="Go to Dashboard"
          >
            <Home className="w-3.5 h-3.5 text-blue-700" />
            <span>Home</span>
          </button>

          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              {item.tab ? (
                <button
                  onClick={() => setActiveTab(item.tab as any)}
                  className="text-blue-800 hover:text-blue-950 hover:underline"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-slate-900 font-bold">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Quick FY & Period indicator */}
        <div className="flex items-center gap-3 text-slate-600 font-mono text-[10px]">
          <span>Financial Year: <strong className="text-slate-900">{currentFY}</strong></span>
          <span className="text-slate-300">|</span>
          <span>Return Period: <strong className="text-blue-900 font-bold">{currentPeriod}</strong></span>
        </div>
      </div>

      {/* Official Taxpayer Context Ribbon matching real GST portal forms */}
      {showTaxpayerBar && (
        <div className="bg-white border border-slate-300 rounded-sm px-4 py-2 text-xs text-slate-800 shadow-2xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">GSTIN of Taxpayer</span>
              <span className="font-mono font-bold text-blue-900 text-xs">{activeCompany.gstin}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Legal &amp; Trade Name</span>
              <span className="font-bold text-slate-900 truncate block text-xs" title={activeCompany.tradeName}>
                {activeCompany.tradeName} <span className="text-slate-500 font-normal">({activeCompany.legalName})</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">State &amp; Code</span>
              <span className="font-medium text-slate-800 text-xs">{activeCompany.state} ({activeCompany.stateCode})</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Taxpayer Type</span>
              <span className="font-semibold text-slate-800 text-xs">{activeCompany.taxpayerType}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Status</span>
              <span className="text-emerald-700 font-bold text-xs">● Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
