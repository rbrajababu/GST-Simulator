import React from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white text-xs py-1.5 px-4 shadow-sm border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 font-medium">
          <span className="bg-amber-950/70 text-amber-200 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase border border-amber-300/30">
            GST PRACTICE &amp; EDUCATIONAL SIMULATOR
          </span>
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <strong className="tracking-wide">Educational Practice Portal – This is a Demo/Simulator and is NOT the official GST Portal.</strong>
          </span>
        </div>
        <div className="flex items-center gap-2 text-amber-100 text-[11px] font-bold">
          <span className="bg-amber-900/80 text-amber-200 px-2 py-0.5 rounded border border-amber-400/40 text-[10px] tracking-wide">
            NOT AN OFFICIAL GOVERNMENT WEBSITE
          </span>
          <span className="bg-white/20 text-white px-2 py-0.5 rounded font-mono text-[10px] tracking-wide font-extrabold">
            USE DEMO DATA ONLY
          </span>
        </div>
      </div>
    </div>
  );
};
