import React, { useState } from 'react';
import {
  Building2,
  Users,
  UserCheck,
  MapPin,
  PlusCircle,
  Package,
  Fingerprint,
  Upload,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  FileCheck2,
  Sparkles,
  Printer,
  Copy,
  Info,
} from 'lucide-react';

export const RegistrationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedArn, setSubmittedArn] = useState<string | null>(null);
  const [copiedArn, setCopiedArn] = useState(false);

  // Form State
  const [businessDetails, setBusinessDetails] = useState({
    legalName: 'MAA SHARDA ENTERPRISES PRIVATE LIMITED',
    tradeName: 'Maa Sharda Enterprises',
    pan: 'AABCM1234F',
    constitution: 'Private Limited Company',
    state: 'Bihar',
    district: 'Patna',
    reasonForReg: 'Crossing the turnover threshold limit',
    commenceDate: '2024-08-01',
    liabilityDate: '2024-09-01',
  });

  const [promoterDetails, setPromoterDetails] = useState({
    firstName: 'Alok',
    lastName: 'Kumar',
    fatherName: 'Ram Nath Singh',
    dob: '1984-06-15',
    mobile: '9876543210',
    email: 'alok.patna@demo.in',
    gender: 'Male',
    designation: 'Managing Director',
    din: '08123456',
    pan: 'ABCDE9988K',
    aadhaar: 'XXXX-XXXX-8921',
    address: 'Road No. 4, Rajendra Nagar, Patna - 800016',
    isPrimaryAuthorizedSignatory: true,
  });

  const [authorizedSignatory, setAuthorizedSignatory] = useState({
    sameAsPromoter: true,
    signatoryName: 'Alok Kumar',
    designation: 'Managing Director',
  });

  const [principalPlace, setPrincipalPlace] = useState({
    buildingNo: 'Shop No. 12, Ground Floor',
    buildingName: 'Maurya Lok Commercial Complex',
    street: 'Dak Bungalow Road',
    city: 'Patna',
    district: 'Patna',
    pinCode: '800001',
    possessionNature: 'Rented',
    businessActivity: 'Wholesale Business & Retail Business',
    electricityConsumerNo: 'SBPDCL-987123412',
  });

  const [goodsServices, setGoodsServices] = useState([
    { code: '8471', desc: 'Automatic data processing machines (Laptops/Computers)', type: 'Goods', rate: 18 },
    { code: '8528', desc: 'Monitors and projectors', type: 'Goods', rate: 18 },
    { code: '998314', desc: 'Information technology (IT) support and consulting services', type: 'Services', rate: 18 },
  ]);

  const [newHsnCode, setNewHsnCode] = useState('');
  const [newHsnDesc, setNewHsnDesc] = useState('');

  // Aadhaar Authentication Simulation
  const [aadhaarStatus, setAadhaarStatus] = useState<'pending' | 'otp_sent' | 'verified'>('pending');
  const [simulatedOtp, setSimulatedOtp] = useState('');

  // Documents
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({
    panCard: true,
    electricityBill: true,
    rentAgreement: true,
    boardResolution: true,
    promoterPhoto: true,
  });

  // Verification
  const [verification, setVerification] = useState({
    declarationAgreed: true,
    authorizedName: 'Alok Kumar',
    place: 'Patna',
    date: new Date().toISOString().split('T')[0],
    method: 'EVC (Aadhaar OTP)',
  });

  const steps = [
    { num: 1, title: 'Business Details', icon: Building2 },
    { num: 2, title: 'Promoters/Partners', icon: Users },
    { num: 3, title: 'Authorized Signatory', icon: UserCheck },
    { num: 4, title: 'Principal Place', icon: MapPin },
    { num: 5, title: 'Goods & Services', icon: Package },
    { num: 6, title: 'Aadhaar Auth (Sim)', icon: Fingerprint },
    { num: 7, title: 'Documents Upload', icon: Upload },
    { num: 8, title: 'Application Preview', icon: FileCheck2 },
    { num: 9, title: 'Verification & Submit', icon: CheckCircle },
  ];

  const handleSendAadhaarOtp = () => {
    setAadhaarStatus('otp_sent');
    setSimulatedOtp('882910'); // Pre-fill mock OTP
  };

  const handleVerifyAadhaarOtp = () => {
    setAadhaarStatus('verified');
  };

  const handleAddHsn = () => {
    if (!newHsnCode) return;
    setGoodsServices([
      ...goodsServices,
      {
        code: newHsnCode,
        desc: newHsnDesc || 'Commercial Goods Item',
        type: 'Goods',
        rate: 18,
      },
    ]);
    setNewHsnCode('');
    setNewHsnDesc('');
  };

  const handleSubmitApplication = () => {
    const generatedArn = `AA100924${Math.floor(100000 + Math.random() * 900000)}M`;
    setSubmittedArn(generatedArn);
  };

  return (
    <div className="space-y-6">
      {/* Educational Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                New GST Registration Simulator (Form GST REG-01)
              </h2>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                Practice Mode
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Practice completing the statutory 9-step registration application required under Section 25 of the CGST Act.
            </p>
          </div>

          <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Form: <span className="font-bold text-blue-900">GST REG-01 (Part B)</span>
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="mt-6 overflow-x-auto scrollbar-none pb-2">
          <div className="flex items-center min-w-[700px]">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isCurrent = currentStep === s.num;
              const isDone = currentStep > s.num || submittedArn !== null;
              return (
                <React.Fragment key={s.num}>
                  <button
                    onClick={() => setCurrentStep(s.num)}
                    className="flex flex-col items-center gap-1.5 focus:outline-none group text-left"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100'
                          : isDone
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500 border border-slate-300'
                      }`}
                    >
                      {isDone && !isCurrent ? <CheckCircle className="w-4 h-4" /> : s.num}
                    </div>
                    <span
                      className={`text-[10px] font-semibold text-center whitespace-nowrap max-w-[80px] ${
                        isCurrent ? 'text-blue-900 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 transition ${
                        currentStep > s.num ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* ARN Acknowledgement Receipt View if Submitted */}
      {submittedArn ? (
        <div className="bg-white rounded-xl shadow-md border-2 border-emerald-500 p-6 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Registration Application Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your application has been digitally authenticated via simulated EVC. The Application Reference Number (ARN) has been generated.
            </p>
          </div>

          {/* Acknowledgement Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-2xl mx-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-slate-400 font-medium">Application Reference Number (ARN)</span>
                <div className="text-lg font-mono font-extrabold text-blue-900 flex items-center gap-2 mt-0.5">
                  <span>{submittedArn}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(submittedArn);
                      setCopiedArn(true);
                      setTimeout(() => setCopiedArn(false), 2000);
                    }}
                    className="p-1 text-slate-400 hover:text-blue-600 transition"
                    title="Copy ARN"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedArn && <span className="text-[10px] text-emerald-600 font-sans font-bold">Copied!</span>}
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-400 font-medium">Status</span>
                <div className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] mt-0.5">
                  Pending Verification
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400">Legal Name</span>
                <div className="font-semibold text-slate-800">{businessDetails.legalName}</div>
              </div>
              <div>
                <span className="text-slate-400">Trade Name</span>
                <div className="font-semibold text-slate-800">{businessDetails.tradeName}</div>
              </div>
              <div>
                <span className="text-slate-400">Entity PAN</span>
                <div className="font-mono font-semibold text-slate-800">{businessDetails.pan}</div>
              </div>
              <div>
                <span className="text-slate-400">Jurisdiction</span>
                <div className="font-semibold text-slate-800">State: Bihar | Center: Patna Division 1</div>
              </div>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-900 text-[11px] leading-relaxed">
              <strong>Simulated Next Steps (Form GST REG-03 / REG-06):</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-blue-800">
                <li>Tax officer scrutinizes application within 7 working days.</li>
                <li>If clarifications are required, Notice in Form GST REG-03 will be issued.</li>
                <li>Upon approval, Form GST REG-06 (Certificate of Registration) containing 15-digit GSTIN will be granted.</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setSubmittedArn(null);
                setCurrentStep(1);
              }}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Start New Registration Practice
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Simulated Acknowledgement
            </button>
          </div>
        </div>
      ) : (
        /* Wizard Steps Content */
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-6">
          {/* STEP 1: Business Details */}
          {currentStep === 1 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">1. Business Details</h3>
                <p className="text-slate-500 text-[11px]">
                  Provide official PAN and constitutional details as registered with the Ministry of Corporate Affairs or Registrar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Legal Name of the Business (As per PAN)
                  </label>
                  <input
                    type="text"
                    value={businessDetails.legalName}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, legalName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Trade Name</label>
                  <input
                    type="text"
                    value={businessDetails.tradeName}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, tradeName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Permanent Account Number (PAN)</label>
                  <input
                    type="text"
                    value={businessDetails.pan}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, pan: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Constitution of Business</label>
                  <select
                    value={businessDetails.constitution}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, constitution: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Private Limited Company">Private Limited Company</option>
                    <option value="Public Limited Company">Public Limited Company</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Limited Liability Partnership">Limited Liability Partnership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Reason to obtain Registration</label>
                  <select
                    value={businessDetails.reasonForReg}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, reasonForReg: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Crossing the turnover threshold limit">Crossing the turnover threshold limit</option>
                    <option value="Inter-State taxable supply">Inter-State taxable supply</option>
                    <option value="Voluntary Basis">Voluntary Basis</option>
                    <option value="Liable under Reverse Charge Mechanism">Liable under Reverse Charge Mechanism</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Date of Commencement of Business</label>
                  <input
                    type="date"
                    value={businessDetails.commenceDate}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, commenceDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Promoters / Partners */}
          {currentStep === 2 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">2. Promoter / Partner / Director Details</h3>
                <p className="text-slate-500 text-[11px]">
                  Enter personal credentials, identification numbers, and residential address of managing partners or directors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">First Name</label>
                  <input
                    type="text"
                    value={promoterDetails.firstName}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    value={promoterDetails.lastName}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Father's Full Name</label>
                  <input
                    type="text"
                    value={promoterDetails.fatherName}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, fatherName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile Number</label>
                  <input
                    type="text"
                    value={promoterDetails.mobile}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, mobile: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    value={promoterDetails.email}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Designation / Status</label>
                  <input
                    type="text"
                    value={promoterDetails.designation}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, designation: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Director Identification Number (DIN)</label>
                  <input
                    type="text"
                    value={promoterDetails.din}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, din: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Individual PAN</label>
                  <input
                    type="text"
                    value={promoterDetails.pan}
                    onChange={(e) => setPromoterDetails({ ...promoterDetails, pan: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Aadhaar (Masked)</label>
                  <input
                    type="text"
                    value={promoterDetails.aadhaar}
                    disabled
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg font-mono text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Residential Address</label>
                <input
                  type="text"
                  value={promoterDetails.address}
                  onChange={(e) => setPromoterDetails({ ...promoterDetails, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Authorized Signatory */}
          {currentStep === 3 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">3. Authorized Signatory</h3>
                <p className="text-slate-500 text-[11px]">
                  Select whether the promoter above is the Primary Authorized Signatory empowered to file returns.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    checked={authorizedSignatory.sameAsPromoter}
                    onChange={(e) =>
                      setAuthorizedSignatory({ ...authorizedSignatory, sameAsPromoter: e.target.checked })
                    }
                    className="rounded text-blue-600 focus:ring-0 w-4 h-4"
                  />
                  <span>Primary Authorized Signatory is same as Promoter (Alok Kumar)</span>
                </label>

                {authorizedSignatory.sameAsPromoter && (
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                    <div>
                      <span className="text-slate-400">Name</span>
                      <div className="font-semibold text-slate-800">{promoterDetails.firstName} {promoterDetails.lastName}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Designation</span>
                      <div className="font-semibold text-slate-800">{promoterDetails.designation}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Mobile for OTP verification</span>
                      <div className="font-mono font-semibold text-slate-800">+91 {promoterDetails.mobile}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Email for notices</span>
                      <div className="font-semibold text-slate-800">{promoterDetails.email}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Principal Place of Business */}
          {currentStep === 4 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">4. Principal Place of Business</h3>
                <p className="text-slate-500 text-[11px]">
                  Physical address where the key books of accounts are maintained and management decisions take place.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Building No / Flat No</label>
                  <input
                    type="text"
                    value={principalPlace.buildingNo}
                    onChange={(e) => setPrincipalPlace({ ...principalPlace, buildingNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Building Name / Complex</label>
                  <input
                    type="text"
                    value={principalPlace.buildingName}
                    onChange={(e) => setPrincipalPlace({ ...principalPlace, buildingName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Street / Road</label>
                  <input
                    type="text"
                    value={principalPlace.street}
                    onChange={(e) => setPrincipalPlace({ ...principalPlace, street: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">PIN Code</label>
                  <input
                    type="text"
                    value={principalPlace.pinCode}
                    onChange={(e) => setPrincipalPlace({ ...principalPlace, pinCode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nature of Possession of Premises</label>
                  <select
                    value={principalPlace.possessionNature}
                    onChange={(e) => setPrincipalPlace({ ...principalPlace, possessionNature: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Rented">Rented</option>
                    <option value="Owned">Owned</option>
                    <option value="Leased">Leased</option>
                    <option value="Consent">Consent</option>
                    <option value="Shared">Shared</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Electricity Bill / Consumer No</label>
                  <input
                    type="text"
                    value={principalPlace.electricityConsumerNo}
                    onChange={(e) => setPrincipalPlace({ ...principalPlace, electricityConsumerNo: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Goods & Services (HSN) */}
          {currentStep === 5 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">5. Goods and Services Supplied</h3>
                <p className="text-slate-500 text-[11px]">
                  Specify the top 5 goods or services supplied by HSN / SAC codes.
                </p>
              </div>

              {/* Add HSN Bar */}
              <div className="flex flex-wrap gap-2 items-end bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="w-36">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">HSN / SAC Code</label>
                  <input
                    type="text"
                    value={newHsnCode}
                    onChange={(e) => setNewHsnCode(e.target.value)}
                    placeholder="e.g. 8471"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-mono text-xs"
                  />
                </div>
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={newHsnDesc}
                    onChange={(e) => setNewHsnDesc(e.target.value)}
                    placeholder="Goods / Services item description"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddHsn}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded text-xs transition"
                >
                  Add HSN
                </button>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
                {goodsServices.map((g, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between hover:bg-slate-50">
                    <div>
                      <div className="font-mono font-bold text-blue-900 flex items-center gap-2">
                        {g.code}
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-sans font-normal">
                          {g.type} • {g.rate}% Rate
                        </span>
                      </div>
                      <div className="text-slate-600 text-[11px] mt-0.5">{g.desc}</div>
                    </div>
                    <button
                      onClick={() => setGoodsServices(goodsServices.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: Aadhaar Authentication Simulation */}
          {currentStep === 6 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  6. Aadhaar Authentication (Simulated Sandbox)
                </h3>
                <p className="text-slate-500 text-[11px]">
                  Under Rule 8(4A), opting for Aadhaar authentication grants fast-track registration within 7 working days without mandatory physical site visit.
                </p>
              </div>

              <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-xl space-y-3">
                <div className="flex items-start gap-3">
                  <Fingerprint className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">
                      Promoter / Signatory: {promoterDetails.firstName} {promoterDetails.lastName}
                    </div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      Aadhaar: {promoterDetails.aadhaar} • Mobile: +91 {promoterDetails.mobile}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-blue-200/60">
                  {aadhaarStatus === 'pending' && (
                    <button
                      type="button"
                      onClick={handleSendAadhaarOtp}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Send Simulated Aadhaar OTP
                    </button>
                  )}

                  {aadhaarStatus === 'otp_sent' && (
                    <div className="space-y-3">
                      <div className="text-emerald-700 font-semibold text-xs flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Simulated OTP sent to registered mobile +91 {promoterDetails.mobile}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={simulatedOtp}
                          onChange={(e) => setSimulatedOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          className="px-3 py-1.5 border border-slate-300 rounded font-mono font-bold tracking-widest text-sm w-36 text-center"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyAadhaarOtp}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded text-xs transition"
                        >
                          Verify OTP
                        </button>
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        (Demo OTP &quot;882910&quot; is pre-filled for simulator training)
                      </span>
                    </div>
                  )}

                  {aadhaarStatus === 'verified' && (
                    <div className="bg-emerald-100 text-emerald-800 p-3 rounded-lg font-bold flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>Aadhaar Successfully Authenticated! Fast-track clearance active.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: Document Upload */}
          {currentStep === 7 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">7. Documents Upload (Simulated Attachments)</h3>
                <p className="text-slate-500 text-[11px]">
                  In the simulator, realistic dummy files are pre-attached for educational review.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { key: 'panCard', title: 'PAN Card of Business Entity', filename: 'Entity_PAN_Card.pdf', size: '240 KB' },
                  { key: 'electricityBill', title: 'Proof of Principal Place of Business (Electricity Bill)', filename: 'SBPDCL_Bill_Aug2024.pdf', size: '480 KB' },
                  { key: 'rentAgreement', title: 'Rent Agreement / NOC from Owner', filename: 'Notarized_Rent_Agreement.pdf', size: '1.2 MB' },
                  { key: 'boardResolution', title: 'Board Resolution for Authorized Signatory', filename: 'Board_Resolution_Authorizing.pdf', size: '320 KB' },
                  { key: 'promoterPhoto', title: 'Photograph of Managing Director', filename: 'Photo_Alok_Kumar.jpg', size: '150 KB' },
                ].map((doc) => (
                  <div
                    key={doc.key}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{doc.title}</div>
                      <div className="text-[11px] text-blue-600 font-mono mt-0.5 flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        {doc.filename} ({doc.size})
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Uploaded &amp; Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: Application Preview */}
          {currentStep === 8 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">8. Application Summary Preview</h3>
                  <p className="text-slate-500 text-[11px]">
                    Carefully review all declarations before final digital submission.
                  </p>
                </div>
                <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[11px]">
                  Draft Review
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                <div className="p-3 bg-slate-50 font-bold text-slate-700">Entity Details</div>
                <div className="p-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div><span className="text-slate-400">Legal Name:</span> {businessDetails.legalName}</div>
                  <div><span className="text-slate-400">Trade Name:</span> {businessDetails.tradeName}</div>
                  <div><span className="text-slate-400">PAN:</span> {businessDetails.pan}</div>
                  <div><span className="text-slate-400">Constitution:</span> {businessDetails.constitution}</div>
                </div>

                <div className="p-3 bg-slate-50 font-bold text-slate-700">Principal Place of Business</div>
                <div className="p-3 text-[11px] text-slate-700">
                  {principalPlace.buildingNo}, {principalPlace.buildingName}, {principalPlace.street}, {principalPlace.city} - {principalPlace.pinCode} ({principalPlace.possessionNature})
                </div>

                <div className="p-3 bg-slate-50 font-bold text-slate-700">Signatory &amp; Authentication</div>
                <div className="p-3 text-[11px] text-slate-700 flex justify-between">
                  <span>Signatory: {promoterDetails.firstName} {promoterDetails.lastName} ({promoterDetails.designation})</span>
                  <span className="font-bold text-emerald-700">
                    Aadhaar Status: {aadhaarStatus === 'verified' ? 'Authenticated' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 9: Verification & Submit */}
          {currentStep === 9 && (
            <div className="space-y-4 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">9. Verification &amp; Final Submission</h3>
                <p className="text-slate-500 text-[11px]">
                  Statutory declaration under the Goods and Services Tax Act.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 leading-relaxed font-medium">
                  <input
                    type="checkbox"
                    checked={verification.declarationAgreed}
                    onChange={(e) => setVerification({ ...verification, declarationAgreed: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0 mt-0.5 w-4 h-4"
                  />
                  <span>
                    I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-200 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1">Name of Authorized Signatory</label>
                    <div className="font-bold text-slate-800">{promoterDetails.firstName} {promoterDetails.lastName}</div>
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Place</label>
                    <input
                      type="text"
                      value={verification.place}
                      onChange={(e) => setVerification({ ...verification, place: e.target.value })}
                      className="px-2.5 py-1.5 border border-slate-300 rounded w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Date</label>
                    <div className="font-mono text-slate-700">{verification.date}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <label className="block font-semibold text-slate-700 mb-1.5">Submission Method</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="method"
                        checked={verification.method === 'EVC (Aadhaar OTP)'}
                        onChange={() => setVerification({ ...verification, method: 'EVC (Aadhaar OTP)' })}
                        className="text-blue-600"
                      />
                      <span>Submit with EVC (Electronic Verification Code)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="method"
                        checked={verification.method === 'DSC (Digital Signature)'}
                        onChange={() => setVerification({ ...verification, method: 'DSC (Digital Signature)' })}
                        className="text-blue-600"
                      />
                      <span>Submit with DSC (Class 3 Token)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous
            </button>

            {currentStep < 9 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(9, prev + 1))}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitApplication}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-md transition"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Application &amp; Generate ARN
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
