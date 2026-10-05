export type TaxpayerType = 'Regular' | 'Composition' | 'SEZ' | 'ISD' | 'Casual';

export type UserRole = 'student' | 'accountant' | 'practitioner' | 'admin';

export interface DemoUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  demoGstin: string;
  companyName: string;
}

export interface CompanyProfile {
  id: string;
  gstin: string;
  legalName: string;
  tradeName: string;
  constitution: string;
  taxpayerType: TaxpayerType;
  state: string;
  stateCode: string;
  principalAddress: {
    buildingNo: string;
    street: string;
    city: string;
    district: string;
    state: string;
    pinCode: string;
  };
  registrationDate: string;
  status: 'Active' | 'Suspended' | 'Cancelled';
  turnoverRange: string;
  authorizedSignatory: string;
  email: string;
  phone: string;
}

export interface InvoiceItem {
  id: string;
  hsnCode: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number; // unit price
  taxableValue: number;
  gstRate: number; // 0, 5, 12, 18, 28
  igstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  cessAmount: number;
  totalValue: number;
}

export interface B2BInvoice {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  recipientGstin: string;
  recipientName: string;
  posState: string;
  posStateCode: string;
  supplyType: 'Inter-State' | 'Intra-State';
  reverseCharge: boolean;
  invoiceType: 'Regular' | 'SEZ with payment' | 'SEZ without payment' | 'Deemed Export';
  items: InvoiceItem[];
  totalTaxable: number;
  totalIgst: number;
  totalCgst: number;
  totalSgst: number;
  totalCess: number;
  totalInvoiceValue: number;
  filingStatus?: 'Draft' | 'Uploaded' | 'Filed';
  amended?: boolean;
}

export interface B2CLargeInvoice {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  posState: string;
  posStateCode: string;
  gstRate: number;
  taxableValue: number;
  igstAmount: number;
  cessAmount: number;
  totalInvoiceValue: number;
}

export interface B2CSmallSummary {
  id: string;
  posState: string;
  posStateCode: string;
  gstRate: number;
  taxableValue: number;
  igstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  cessAmount: number;
  supplyType: 'Inter-State' | 'Intra-State';
}

export interface CreditDebitNote {
  id: string;
  noteType: 'Credit Note' | 'Debit Note';
  noteNo: string;
  noteDate: string;
  originalInvoiceNo: string;
  originalInvoiceDate: string;
  recipientType: 'Registered' | 'Unregistered';
  recipientGstin?: string;
  recipientName: string;
  posState: string;
  posStateCode: string;
  gstRate: number;
  taxableValue: number;
  igstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  reason: 'Sales Return' | 'Post Sale Discount' | 'Deficiency in Service' | 'Correction in Invoice' | 'Other';
}

export interface ExportInvoice {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  exportType: 'With Payment of Tax' | 'Without Payment of Tax (LUT/Bond)';
  shippingBillNo: string;
  shippingBillDate: string;
  portCode: string;
  totalTaxable: number;
  igstAmount: number;
  totalInvoiceValue: number;
}

export interface HsnSummaryItem {
  id: string;
  hsnCode: string;
  description: string;
  uqc: string;
  totalQuantity: number;
  totalTaxable: number;
  igstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  cessAmount: number;
  totalValue: number;
}

export interface DocumentSummary {
  docType: string;
  fromSerial: string;
  toSerial: string;
  totalNumber: number;
  cancelledNumber: number;
  netIssued: number;
}

export interface Gstr1State {
  financialYear: string;
  returnPeriod: string; // e.g. "September 2024"
  status: 'Not Filed' | 'Ready to File' | 'Filed';
  filedDate?: string;
  arn?: string;
  b2bInvoices: B2BInvoice[];
  b2cLarge: B2CLargeInvoice[];
  b2cSmall: B2CSmallSummary[];
  creditDebitNotes: CreditDebitNote[];
  exportInvoices: ExportInvoice[];
  nilRatedSupplies: {
    nilRated: number;
    exempted: number;
    nonGst: number;
  };
  advancesReceived: number;
  advancesAdjusted: number;
  hsnSummary: HsnSummaryItem[];
  documentsSummary: DocumentSummary[];
}

export interface Gstr3bState {
  financialYear: string;
  returnPeriod: string;
  status: 'Not Filed' | 'Generated' | 'Ready to File' | 'Filed';
  filedDate?: string;
  arn?: string;
  // Table 3.1
  table3_1: {
    outwardTaxable: { taxable: number; igst: number; cgst: number; sgst: number; cess: number };
    zeroRated: { taxable: number; igst: number; cess: number };
    otherOutward: { taxable: number }; // nil / exempt
    inwardRcm: { taxable: number; igst: number; cgst: number; sgst: number; cess: number };
    nonGst: { taxable: number };
  };
  // Table 3.2
  table3_2: Array<{
    state: string;
    stateCode: string;
    taxable: number;
    igst: number;
    recipientType: 'Unregistered' | 'Composition' | 'UIN';
  }>;
  // Table 4: ITC
  table4: {
    itcAvailable: {
      importGoods: { igst: number; cess: number };
      importServices: { igst: number; cess: number };
      inwardRcm: { igst: number; cgst: number; sgst: number; cess: number };
      isd: { igst: number; cgst: number; sgst: number; cess: number };
      allOtherItc: { igst: number; cgst: number; sgst: number; cess: number };
    };
    itcReversed: {
      rule42_43: { igst: number; cgst: number; sgst: number; cess: number };
      others: { igst: number; cgst: number; sgst: number; cess: number };
    };
    ineligibleItc: {
      section17_5: { igst: number; cgst: number; sgst: number; cess: number };
      others: { igst: number; cgst: number; sgst: number; cess: number };
    };
  };
  // Table 5: Inward exempt/nil
  table5: {
    interState: number;
    intraState: number;
  };
  // Table 6.1: Payment of Tax & Set off
  taxPayment: {
    payable: { igst: number; cgst: number; sgst: number; cess: number };
    paidThroughItc: {
      igstPaidFromIgst: number;
      igstPaidFromCgst: number;
      igstPaidFromSgst: number;
      cgstPaidFromIgst: number;
      cgstPaidFromCgst: number;
      sgstPaidFromIgst: number;
      sgstPaidFromSgst: number;
      cessPaidFromCess: number;
    };
    paidInCash: { igst: number; cgst: number; sgst: number; cess: number };
    interestPaid: { igst: number; cgst: number; sgst: number; cess: number };
    lateFeePaid: { cgst: number; sgst: number };
  };
}

export interface PurchaseInvoice {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  supplierGstin: string;
  supplierName: string;
  posState: string;
  posStateCode: string;
  taxableValue: number;
  gstRate: number;
  igst: number;
  cgst: number;
  sgst: number;
  cess: number;
  totalValue: number;
  itcEligibility: 'Eligible' | 'Ineligible';
  itcCategory?: 'Input' | 'Capital Goods' | 'Input Service' | 'Ineligible 17(5)';
  matchedStatus?: 'Matched' | 'Partially Matched' | 'Missing in 2B' | 'Missing in Books' | 'Mismatch';
  supplierFilingDate?: string;
  itcAvailableDate?: string;
}

export interface ReconciliationItem {
  id: string;
  invoiceNo: string;
  invoiceDate: string;
  supplierGstin: string;
  supplierName: string;
  booksData?: {
    taxable: number;
    igst: number;
    cgst: number;
    sgst: number;
    total: number;
  };
  portalData?: {
    taxable: number;
    igst: number;
    cgst: number;
    sgst: number;
    total: number;
    filingDate: string;
  };
  status: 'Matched' | 'Partially Matched' | 'Mismatch' | 'Missing in Books' | 'Missing in 2B';
  differenceExplanation?: string;
  actionTaken?: 'Claimed in 3B' | 'Deferred' | 'Pending Supplier Query' | 'Accepted Portal Value';
}

export interface LedgerBalance {
  igst: { tax: number; interest: number; penalty: number; fee: number; other: number; total: number };
  cgst: { tax: number; interest: number; penalty: number; fee: number; other: number; total: number };
  sgst: { tax: number; interest: number; penalty: number; fee: number; other: number; total: number };
  cess: { tax: number; interest: number; penalty: number; fee: number; other: number; total: number };
  totalBalance: number;
}

export interface CreditLedgerBalance {
  igst: number;
  cgst: number;
  sgst: number;
  cess: number;
  total: number;
}

export interface LedgerTransaction {
  id: string;
  date: string;
  referenceNo: string;
  description: string;
  transactionType: 'Credit' | 'Debit';
  majorHead: 'IGST' | 'CGST' | 'SGST' | 'Cess' | 'Combined';
  amount: number;
  balanceAfter: number;
  ledgerType: 'Cash' | 'Credit' | 'Liability';
}

export interface PaymentChallan {
  id: string;
  cpin: string; // 14 digit CPIN
  cin?: string; // 17 digit CIN
  challanDate: string;
  expiryDate: string;
  reason: 'Monthly Return (PMT-06)' | 'Voluntary (DRC-03)' | 'Demand (DRC-07)' | 'Other';
  taxAmounts: {
    igst: { tax: number; interest: number; penalty: number; fee: number; other: number };
    cgst: { tax: number; interest: number; penalty: number; fee: number; other: number };
    sgst: { tax: number; interest: number; penalty: number; fee: number; other: number };
    cess: { tax: number; interest: number; penalty: number; fee: number; other: number };
  };
  totalAmount: number;
  paymentMode: 'E-Payment' | 'Over the Counter (OTC)' | 'NEFT/RTGS';
  bankName?: string;
  status: 'Generated' | 'Paid' | 'Expired';
  paidDate?: string;
}

export interface RefundClaim {
  id: string;
  arn: string;
  filingDate: string;
  refundType:
    | 'Excess Balance in Electronic Cash Ledger'
    | 'Export of Goods / Services with payment of tax'
    | 'Export without payment of tax (under LUT)'
    | 'On account of Inverted Duty Structure'
    | 'On account of Assessment / Provisional assessment / Appeal';
  taxPeriod: string;
  claimAmount: {
    igst: number;
    cgst: number;
    sgst: number;
    cess: number;
    total: number;
  };
  bankAccount: {
    bankName: string;
    accountNo: string;
    ifscCode: string;
  };
  status: 'Filed' | 'Under Scrutiny' | 'Deficiency Memo' | 'Order Sanctioned' | 'Refund Credited';
  currentStageNote: string;
}

export interface NoticeRecord {
  id: string;
  noticeNo: string;
  noticeType: 'DRC-01B' | 'DRC-01C' | 'ASMT-10' | 'GSTR-3A' | 'REG-17';
  title: string;
  sectionReference: string;
  issueDate: string;
  dueDate: string;
  taxPeriod: string;
  demandAmount: {
    tax: number;
    interest: number;
    penalty: number;
    total: number;
  };
  discrepancyDetails: string;
  status: 'Pending Reply' | 'Reply Submitted' | 'Closed' | 'Overdue';
  replies?: Array<{
    date: string;
    explanation: string;
    drc03Arn?: string;
    attachedDocs: string[];
  }>;
}

export interface PracticeScenario {
  id: string;
  title: string;
  category: 'GSTR-1' | 'GSTR-3B' | 'Reconciliation' | 'Notices' | 'Complete Workflow';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  tasks: string[];
  providedData: any;
  expectedAnswers: {
    [key: string]: any;
  };
  explanationNotes: string;
}

export interface LearningLesson {
  id: string;
  title: string;
  slug: string;
  estimatedMinutes: number;
  category: string;
  summary: string;
  content: {
    introduction: string;
    keyProvisions: string[];
    practicalExample: {
      title: string;
      scenario: string;
      breakdown: Array<{ step: string; calculation: string; note: string }>;
    };
    commonErrors: string[];
  };
  quiz: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }>;
}
