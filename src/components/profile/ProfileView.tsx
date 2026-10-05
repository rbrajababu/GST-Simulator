import React from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import {
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShieldCheck,
  User,
  FileCheck,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { activeCompany, currentFY, currentPeriod } = useGstPortal();

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{activeCompany.tradeName}</h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {activeCompany.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Legal Entity: <strong className="text-slate-800">{activeCompany.legalName}</strong>
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-400">GSTIN</span>
            <div className="font-mono font-extrabold text-blue-900 text-base">
              {activeCompany.gstin}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core Business Information */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Taxpayer Profile &amp; Registration Particulars
          </h3>

          <div className="space-y-3">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Constitution of Business:</span>
              <span className="font-semibold text-slate-800">{activeCompany.constitution}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Taxpayer Type:</span>
              <span className="font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                {activeCompany.taxpayerType}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">State Jurisdiction:</span>
              <span className="font-semibold text-slate-800">
                {activeCompany.state} (State Code: {activeCompany.stateCode})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Date of Registration:</span>
              <span className="font-mono font-semibold text-slate-800">
                {activeCompany.registrationDate}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Aggregate Annual Turnover Range:</span>
              <span className="font-semibold text-slate-800">{activeCompany.turnoverRange}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Authorized Signatory:</span>
              <span className="font-semibold text-slate-800">
                {activeCompany.authorizedSignatory}
              </span>
            </div>
          </div>
        </div>

        {/* Address and Contacts */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Principal Place of Business &amp; Contact Channels
          </h3>

          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Principal Address
              </div>
              <div className="text-slate-600 text-[11px] leading-relaxed">
                {activeCompany.principalAddress.buildingNo},{' '}
                {activeCompany.principalAddress.street},{' '}
                {activeCompany.principalAddress.city},{' '}
                {activeCompany.principalAddress.district},{' '}
                {activeCompany.principalAddress.state} - {activeCompany.principalAddress.pinCode}
              </div>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address:
              </span>
              <span className="font-mono font-semibold text-slate-800">{activeCompany.email}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number:
              </span>
              <span className="font-mono font-semibold text-slate-800">{activeCompany.phone}</span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950 text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aadhaar Authenticated Taxpayer Profile • Active in Demo Sandbox</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
