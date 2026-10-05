import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CompanyProfile,
  DemoUser,
  B2BInvoice,
  B2CLargeInvoice,
  B2CSmallSummary,
  CreditDebitNote,
  ExportInvoice,
  HsnSummaryItem,
  DocumentSummary,
  Gstr1State,
  Gstr3bState,
  PurchaseInvoice,
  ReconciliationItem,
  LedgerBalance,
  CreditLedgerBalance,
  LedgerTransaction,
  PaymentChallan,
  RefundClaim,
  NoticeRecord,
  PracticeScenario,
} from '../types/gst';
import {
  DEMO_COMPANIES,
  DEMO_USERS,
  INITIAL_B2B_INVOICES,
  INITIAL_B2C_LARGE,
  INITIAL_B2C_SMALL,
  INITIAL_CREDIT_NOTES,
  INITIAL_EXPORT_INVOICES,
  INITIAL_HSN_SUMMARY,
  INITIAL_DOCUMENTS_SUMMARY,
  INITIAL_PURCHASE_REGISTER,
  INITIAL_GSTR2B_INVOICES,
  INITIAL_RECONCILIATION_DATA,
  INITIAL_CASH_LEDGER,
  INITIAL_CREDIT_LEDGER,
  INITIAL_LEDGER_TRANSACTIONS,
  INITIAL_NOTICES,
  PRACTICE_SCENARIOS,
} from '../data/initialDemoData';

interface GstPortalContextType {
  // Auth & Session
  isLoggedIn: boolean;
  currentUser: DemoUser;
  companies: CompanyProfile[];
  activeCompany: CompanyProfile;
  currentFY: string;
  currentPeriod: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setCurrentFY: (fy: string) => void;
  setCurrentPeriod: (period: string) => void;
  switchCompany: (companyId: string) => void;
  loginAs: (user: DemoUser) => void;
  logout: () => void;

  // GSTR-1
  gstr1: Gstr1State;
  addB2BInvoice: (inv: Omit<B2BInvoice, 'id'>) => void;
  deleteB2BInvoice: (id: string) => void;
  addCreditNote: (cn: Omit<CreditDebitNote, 'id'>) => void;
  fileGstr1: () => { success: boolean; arn: string; message: string };

  // GSTR-3B
  gstr3b: Gstr3bState;
  updateGstr3bTable3_1: (data: Partial<Gstr3bState['table3_1']>) => void;
  updateGstr3bTable4: (data: Partial<Gstr3bState['table4']>) => void;
  autoDraftGstr3bFromReturns: () => void;
  simulateGstr3bOffset: () => { success: boolean; message: string; cashShortfall: number };
  fileGstr3b: () => { success: boolean; arn: string; message: string };

  // GSTR-2B & Reconciliation
  purchaseRegister: PurchaseInvoice[];
  gstr2bInvoices: PurchaseInvoice[];
  reconciliationData: ReconciliationItem[];
  addPurchaseInvoice: (inv: Omit<PurchaseInvoice, 'id'>) => void;
  updateReconciliationAction: (id: string, action: ReconciliationItem['actionTaken']) => void;

  // Ledgers
  cashLedger: LedgerBalance;
  creditLedger: CreditLedgerBalance;
  ledgerTransactions: LedgerTransaction[];
  depositCashLedger: (head: 'igst' | 'cgst' | 'sgst' | 'cess', subHead: 'tax' | 'interest' | 'fee', amount: number) => void;

  // Payments & Challans
  challans: PaymentChallan[];
  createChallan: (c: Omit<PaymentChallan, 'id' | 'cpin' | 'challanDate' | 'expiryDate' | 'status'>) => PaymentChallan;
  payChallan: (challanId: string, bank: string) => { success: boolean; cin: string };

  // Refunds
  refundClaims: RefundClaim[];
  submitRefundClaim: (claim: Omit<RefundClaim, 'id' | 'arn' | 'filingDate' | 'status' | 'currentStageNote'>) => RefundClaim;

  // Notices
  notices: NoticeRecord[];
  submitNoticeReply: (noticeId: string, replyText: string, docs: string[]) => void;

  // Practice & Quiz
  practiceScenarios: PracticeScenario[];
  scenarioResults: { [id: string]: { completed: boolean; score: number; feedback: string } };
  submitScenarioEvaluation: (id: string, userAnswers: any) => { passed: boolean; score: number; breakdown: any };
  quizScores: { [lessonId: string]: number };
  recordQuizScore: (lessonId: string, score: number) => void;

  // Global Simulator Reset
  resetSimulatorState: () => void;
}

const GstPortalContext = createContext<GstPortalContextType | undefined>(undefined);

export const GstPortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState<DemoUser>(DEMO_USERS[0]);
  const [companies, setCompanies] = useState<CompanyProfile[]>(DEMO_COMPANIES);
  const [activeCompany, setActiveCompany] = useState<CompanyProfile>(DEMO_COMPANIES[0]);
  const [currentFY, setCurrentFY] = useState('2024-25');
  const [currentPeriod, setCurrentPeriod] = useState('September 2024');
  const [activeTab, setActiveTab] = useState('home');

  // GSTR-1
  const [gstr1, setGstr1] = useState<Gstr1State>({
    financialYear: '2024-25',
    returnPeriod: 'September 2024',
    status: 'Ready to File',
    b2bInvoices: INITIAL_B2B_INVOICES,
    b2cLarge: INITIAL_B2C_LARGE,
    b2cSmall: INITIAL_B2C_SMALL,
    creditDebitNotes: INITIAL_CREDIT_NOTES,
    exportInvoices: INITIAL_EXPORT_INVOICES,
    nilRatedSupplies: { nilRated: 25000, exempted: 0, nonGst: 0 },
    advancesReceived: 0,
    advancesAdjusted: 0,
    hsnSummary: INITIAL_HSN_SUMMARY,
    documentsSummary: INITIAL_DOCUMENTS_SUMMARY,
  });

  // GSTR-3B
  const [gstr3b, setGstr3b] = useState<Gstr3bState>({
    financialYear: '2024-25',
    returnPeriod: 'September 2024',
    status: 'Generated',
    table3_1: {
      outwardTaxable: { taxable: 585000, igst: 77400, cgst: 11850, sgst: 11850, cess: 0 },
      zeroRated: { taxable: 350000, igst: 0, cess: 0 },
      otherOutward: { taxable: 25000 },
      inwardRcm: { taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 },
      nonGst: { taxable: 0 },
    },
    table3_2: [
      { state: 'Jharkhand', stateCode: '20', taxable: 280000, igst: 50400, recipientType: 'Unregistered' },
      { state: 'Uttar Pradesh', stateCode: '09', taxable: 80000, igst: 14400, recipientType: 'Unregistered' },
    ],
    table4: {
      itcAvailable: {
        importGoods: { igst: 0, cess: 0 },
        importServices: { igst: 0, cess: 0 },
        inwardRcm: { igst: 0, cgst: 0, sgst: 0, cess: 0 },
        isd: { igst: 0, cgst: 0, sgst: 0, cess: 0 },
        allOtherItc: { igst: 88200, cgst: 7875, sgst: 7875, cess: 0 },
      },
      itcReversed: {
        rule42_43: { igst: 0, cgst: 0, sgst: 0, cess: 0 },
        others: { igst: 0, cgst: 0, sgst: 0, cess: 0 },
      },
      ineligibleItc: {
        section17_5: { igst: 0, cgst: 112000, sgst: 112000, cess: 0 },
        others: { igst: 0, cgst: 0, sgst: 0, cess: 0 },
      },
    },
    table5: {
      interState: 0,
      intraState: 0,
    },
    taxPayment: {
      payable: { igst: 77400, cgst: 11850, sgst: 11850, cess: 0 },
      paidThroughItc: {
        igstPaidFromIgst: 77400,
        igstPaidFromCgst: 0,
        igstPaidFromSgst: 0,
        cgstPaidFromIgst: 10800,
        cgstPaidFromCgst: 1050,
        sgstPaidFromIgst: 0,
        sgstPaidFromSgst: 7875,
        cessPaidFromCess: 0,
      },
      paidInCash: { igst: 0, cgst: 0, sgst: 3975, cess: 0 },
      interestPaid: { igst: 0, cgst: 0, sgst: 0, cess: 0 },
      lateFeePaid: { cgst: 0, sgst: 0 },
    },
  });

  // Purchases & 2B
  const [purchaseRegister, setPurchaseRegister] = useState<PurchaseInvoice[]>(INITIAL_PURCHASE_REGISTER);
  const [gstr2bInvoices, setGstr2bInvoices] = useState<PurchaseInvoice[]>(INITIAL_GSTR2B_INVOICES);
  const [reconciliationData, setReconciliationData] = useState<ReconciliationItem[]>(INITIAL_RECONCILIATION_DATA);

  // Ledgers
  const [cashLedger, setCashLedger] = useState<LedgerBalance>(INITIAL_CASH_LEDGER);
  const [creditLedger, setCreditLedger] = useState<CreditLedgerBalance>(INITIAL_CREDIT_LEDGER);
  const [ledgerTransactions, setLedgerTransactions] = useState<LedgerTransaction[]>(INITIAL_LEDGER_TRANSACTIONS);

  // Challans
  const [challans, setChallans] = useState<PaymentChallan[]>([
    {
      id: 'ch-01',
      cpin: '10240915009182',
      cin: 'SBI1024091500918201',
      challanDate: '2024-09-15',
      expiryDate: '2024-09-30',
      reason: 'Monthly Return (PMT-06)',
      taxAmounts: {
        igst: { tax: 15000, interest: 0, penalty: 0, fee: 0, other: 0 },
        cgst: { tax: 5000, interest: 0, penalty: 0, fee: 0, other: 0 },
        sgst: { tax: 5000, interest: 0, penalty: 0, fee: 0, other: 0 },
        cess: { tax: 0, interest: 0, penalty: 0, fee: 0, other: 0 },
      },
      totalAmount: 25000,
      paymentMode: 'E-Payment',
      bankName: 'State Bank of India',
      status: 'Paid',
      paidDate: '2024-09-15 14:32:00',
    },
  ]);

  // Refunds
  const [refundClaims, setRefundClaims] = useState<RefundClaim[]>([
    {
      id: 'ref-01',
      arn: 'AA100824009182R',
      filingDate: '2024-08-20',
      refundType: 'Export without payment of tax (under LUT)',
      taxPeriod: 'July 2024',
      claimAmount: { igst: 63000, cgst: 0, sgst: 0, cess: 0, total: 63000 },
      bankAccount: { bankName: 'HDFC Bank', accountNo: '50200088192341', ifscCode: 'HDFC0000123' },
      status: 'Under Scrutiny',
      currentStageNote: 'Acknowledgement RFD-02 issued. Verification of shipping bills in progress.',
    },
  ]);

  // Notices
  const [notices, setNotices] = useState<NoticeRecord[]>(INITIAL_NOTICES);

  // Practice & Quiz
  const [practiceScenarios] = useState<PracticeScenario[]>(PRACTICE_SCENARIOS);
  const [scenarioResults, setScenarioResults] = useState<{ [id: string]: { completed: boolean; score: number; feedback: string } }>({});
  const [quizScores, setQuizScores] = useState<{ [lessonId: string]: number }>({});

  const switchCompany = (companyId: string) => {
    const comp = companies.find((c) => c.id === companyId) || companies[0];
    setActiveCompany(comp);
  };

  const loginAs = (user: DemoUser) => {
    setCurrentUser(user);
    const targetComp = companies.find((c) => c.gstin === user.demoGstin) || companies[0];
    setActiveCompany(targetComp);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  // Add B2B Invoice to GSTR-1
  const addB2BInvoice = (inv: Omit<B2BInvoice, 'id'>) => {
    const newInv: B2BInvoice = {
      ...inv,
      id: `inv-${Date.now()}`,
    };
    setGstr1((prev) => ({
      ...prev,
      b2bInvoices: [newInv, ...prev.b2bInvoices],
      status: 'Ready to File',
    }));
  };

  const deleteB2BInvoice = (id: string) => {
    setGstr1((prev) => ({
      ...prev,
      b2bInvoices: prev.b2bInvoices.filter((i) => i.id !== id),
    }));
  };

  const addCreditNote = (cn: Omit<CreditDebitNote, 'id'>) => {
    const newCn: CreditDebitNote = {
      ...cn,
      id: `cn-${Date.now()}`,
    };
    setGstr1((prev) => ({
      ...prev,
      creditDebitNotes: [newCn, ...prev.creditDebitNotes],
    }));
  };

  const fileGstr1 = () => {
    const randomArn = `AA100924${Math.floor(100000 + Math.random() * 900000)}R`;
    const today = new Date().toISOString().split('T')[0];
    setGstr1((prev) => ({
      ...prev,
      status: 'Filed',
      arn: randomArn,
      filedDate: today,
    }));
    return {
      success: true,
      arn: randomArn,
      message: `GSTR-1 for ${currentPeriod} has been filed successfully with simulated ARN: ${randomArn}`,
    };
  };

  // GSTR-3B Updates
  const updateGstr3bTable3_1 = (data: Partial<Gstr3bState['table3_1']>) => {
    setGstr3b((prev) => ({
      ...prev,
      table3_1: { ...prev.table3_1, ...data },
    }));
  };

  const updateGstr3bTable4 = (data: Partial<Gstr3bState['table4']>) => {
    setGstr3b((prev) => ({
      ...prev,
      table4: { ...prev.table4, ...data },
    }));
  };

  const autoDraftGstr3bFromReturns = () => {
    // Computes outward from GSTR-1
    let totalTaxable = 0;
    let totalIgst = 0;
    let totalCgst = 0;
    let totalSgst = 0;

    gstr1.b2bInvoices.forEach((i) => {
      totalTaxable += i.totalTaxable;
      totalIgst += i.totalIgst;
      totalCgst += i.totalCgst;
      totalSgst += i.totalSgst;
    });

    gstr1.b2cLarge.forEach((i) => {
      totalTaxable += i.taxableValue;
      totalIgst += i.igstAmount;
    });

    gstr1.b2cSmall.forEach((i) => {
      totalTaxable += i.taxableValue;
      totalIgst += i.igstAmount;
      totalCgst += i.cgstAmount;
      totalSgst += i.sgstAmount;
    });

    // Deduct credit notes
    gstr1.creditDebitNotes.forEach((cn) => {
      if (cn.noteType === 'Credit Note') {
        totalTaxable -= cn.taxableValue;
        totalIgst -= cn.igstAmount;
        totalCgst -= cn.cgstAmount;
        totalSgst -= cn.sgstAmount;
      }
    });

    // Eligible ITC from GSTR-2B
    let eligibleIgst = 0;
    let eligibleCgst = 0;
    let eligibleSgst = 0;

    gstr2bInvoices.forEach((i) => {
      if (i.itcEligibility === 'Eligible') {
        eligibleIgst += i.igst;
        eligibleCgst += i.cgst;
        eligibleSgst += i.sgst;
      }
    });

    setGstr3b((prev) => ({
      ...prev,
      table3_1: {
        ...prev.table3_1,
        outwardTaxable: {
          taxable: Math.max(0, totalTaxable),
          igst: Math.max(0, totalIgst),
          cgst: Math.max(0, totalCgst),
          sgst: Math.max(0, totalSgst),
          cess: 0,
        },
      },
      table4: {
        ...prev.table4,
        itcAvailable: {
          ...prev.table4.itcAvailable,
          allOtherItc: {
            igst: eligibleIgst,
            cgst: eligibleCgst,
            sgst: eligibleSgst,
            cess: 0,
          },
        },
      },
      taxPayment: {
        ...prev.taxPayment,
        payable: {
          igst: Math.max(0, totalIgst),
          cgst: Math.max(0, totalCgst),
          sgst: Math.max(0, totalSgst),
          cess: 0,
        },
      },
    }));
  };

  const simulateGstr3bOffset = () => {
    const payable = gstr3b.taxPayment.payable;
    // Available ITC = Credit ledger balance + current period 3B ITC
    const availIgst = creditLedger.igst + gstr3b.table4.itcAvailable.allOtherItc.igst;
    const availCgst = creditLedger.cgst + gstr3b.table4.itcAvailable.allOtherItc.cgst;
    const availSgst = creditLedger.sgst + gstr3b.table4.itcAvailable.allOtherItc.sgst;

    // Rule 88A: IGST credit used first against IGST liability
    let remIgstCredit = availIgst;
    const igstFromIgst = Math.min(payable.igst, remIgstCredit);
    remIgstCredit -= igstFromIgst;
    const remIgstLiability = payable.igst - igstFromIgst;

    // Remaining IGST credit can pay CGST, then SGST
    let remCgstLiability = payable.cgst;
    const cgstFromIgst = Math.min(remCgstLiability, remIgstCredit);
    remIgstCredit -= cgstFromIgst;
    remCgstLiability -= cgstFromIgst;

    let remSgstLiability = payable.sgst;
    const sgstFromIgst = Math.min(remSgstLiability, remIgstCredit);
    remIgstCredit -= sgstFromIgst;
    remSgstLiability -= sgstFromIgst;

    // CGST credit pays CGST liability
    const cgstFromCgst = Math.min(remCgstLiability, availCgst);
    remCgstLiability -= cgstFromCgst;

    // SGST credit pays SGST liability
    const sgstFromSgst = Math.min(remSgstLiability, availSgst);
    remSgstLiability -= sgstFromSgst;

    const cashShortfall = remIgstLiability + remCgstLiability + remSgstLiability;

    setGstr3b((prev) => ({
      ...prev,
      taxPayment: {
        ...prev.taxPayment,
        paidThroughItc: {
          igstPaidFromIgst: igstFromIgst,
          igstPaidFromCgst: 0,
          igstPaidFromSgst: 0,
          cgstPaidFromIgst: cgstFromIgst,
          cgstPaidFromCgst: cgstFromCgst,
          sgstPaidFromIgst: sgstFromIgst,
          sgstPaidFromSgst: sgstFromSgst,
          cessPaidFromCess: 0,
        },
        paidInCash: {
          igst: remIgstLiability,
          cgst: remCgstLiability,
          sgst: remSgstLiability,
          cess: 0,
        },
      },
    }));

    return {
      success: true,
      message:
        cashShortfall > 0
          ? `Rule 88A offset calculated. Net cash payment required: ₹${cashShortfall.toLocaleString('en-IN')}`
          : 'Rule 88A offset complete! Entire tax liability offset with available ITC.',
      cashShortfall,
    };
  };

  const fileGstr3b = () => {
    const randomArn = `AA100924${Math.floor(200000 + Math.random() * 800000)}B`;
    const today = new Date().toISOString().split('T')[0];

    // Deduct cash from Cash Ledger
    const cashReq = gstr3b.taxPayment.paidInCash;
    setCashLedger((prev) => ({
      ...prev,
      igst: { ...prev.igst, tax: Math.max(0, prev.igst.tax - cashReq.igst), total: Math.max(0, prev.igst.total - cashReq.igst) },
      cgst: { ...prev.cgst, tax: Math.max(0, prev.cgst.tax - cashReq.cgst), total: Math.max(0, prev.cgst.total - cashReq.cgst) },
      sgst: { ...prev.sgst, tax: Math.max(0, prev.sgst.tax - cashReq.sgst), total: Math.max(0, prev.sgst.total - cashReq.sgst) },
      totalBalance: Math.max(0, prev.totalBalance - (cashReq.igst + cashReq.cgst + cashReq.sgst)),
    }));

    setGstr3b((prev) => ({
      ...prev,
      status: 'Filed',
      arn: randomArn,
      filedDate: today,
    }));

    return {
      success: true,
      arn: randomArn,
      message: `GSTR-3B for ${currentPeriod} has been successfully filed! Simulated ARN: ${randomArn}`,
    };
  };

  // Purchases & Reconciliation
  const addPurchaseInvoice = (inv: Omit<PurchaseInvoice, 'id'>) => {
    const newInv: PurchaseInvoice = { ...inv, id: `pur-${Date.now()}` };
    setPurchaseRegister((prev) => [newInv, ...prev]);
  };

  const updateReconciliationAction = (id: string, action: ReconciliationItem['actionTaken']) => {
    setReconciliationData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, actionTaken: action } : item))
    );
  };

  // Deposit cash in ledger
  const depositCashLedger = (
    head: 'igst' | 'cgst' | 'sgst' | 'cess',
    subHead: 'tax' | 'interest' | 'fee',
    amount: number
  ) => {
    setCashLedger((prev) => {
      const targetHead = prev[head];
      const updatedHead = {
        ...targetHead,
        [subHead]: targetHead[subHead] + amount,
        total: targetHead.total + amount,
      };
      return {
        ...prev,
        [head]: updatedHead,
        totalBalance: prev.totalBalance + amount,
      };
    });

    const newTx: LedgerTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      referenceNo: `DEP/${Math.floor(100000 + Math.random() * 900000)}`,
      description: `Simulated Cash Deposit under ${head.toUpperCase()} - ${subHead.toUpperCase()}`,
      transactionType: 'Credit',
      majorHead: head.toUpperCase() as any,
      amount,
      balanceAfter: cashLedger.totalBalance + amount,
      ledgerType: 'Cash',
    };

    setLedgerTransactions((prev) => [newTx, ...prev]);
  };

  // Challans
  const createChallan = (c: Omit<PaymentChallan, 'id' | 'cpin' | 'challanDate' | 'expiryDate' | 'status'>) => {
    const cpin = `1024${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const today = new Date().toISOString().split('T')[0];
    const expDate = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

    const newChallan: PaymentChallan = {
      ...c,
      id: `ch-${Date.now()}`,
      cpin,
      challanDate: today,
      expiryDate: expDate,
      status: 'Generated',
    };

    setChallans((prev) => [newChallan, ...prev]);
    return newChallan;
  };

  const payChallan = (challanId: string, bank: string) => {
    const target = challans.find((c) => c.id === challanId);
    if (!target) return { success: false, cin: '' };

    const bankCode = bank.includes('SBI') ? 'SBI' : bank.includes('HDFC') ? 'HDF' : 'ICIC';
    const cin = `${bankCode}${target.cpin}01`;
    const today = new Date().toISOString();

    setChallans((prev) =>
      prev.map((c) =>
        c.id === challanId
          ? { ...c, status: 'Paid', cin, bankName: bank, paidDate: today }
          : c
      )
    );

    // Credit Cash Ledger with challan amounts
    setCashLedger((prev) => ({
      igst: {
        ...prev.igst,
        tax: prev.igst.tax + target.taxAmounts.igst.tax,
        total: prev.igst.total + target.taxAmounts.igst.tax,
      },
      cgst: {
        ...prev.cgst,
        tax: prev.cgst.tax + target.taxAmounts.cgst.tax,
        total: prev.cgst.total + target.taxAmounts.cgst.tax,
      },
      sgst: {
        ...prev.sgst,
        tax: prev.sgst.tax + target.taxAmounts.sgst.tax,
        total: prev.sgst.total + target.taxAmounts.sgst.tax,
      },
      cess: {
        ...prev.cess,
        tax: prev.cess.tax + target.taxAmounts.cess.tax,
        total: prev.cess.total + target.taxAmounts.cess.tax,
      },
      totalBalance: prev.totalBalance + target.totalAmount,
    }));

    const newTx: LedgerTransaction = {
      id: `tx-${Date.now()}`,
      date: today.split('T')[0],
      referenceNo: cin,
      description: `Payment against Challan CPIN ${target.cpin} via ${bank}`,
      transactionType: 'Credit',
      majorHead: 'Combined',
      amount: target.totalAmount,
      balanceAfter: cashLedger.totalBalance + target.totalAmount,
      ledgerType: 'Cash',
    };

    setLedgerTransactions((prev) => [newTx, ...prev]);

    return { success: true, cin };
  };

  // Refunds
  const submitRefundClaim = (
    claim: Omit<RefundClaim, 'id' | 'arn' | 'filingDate' | 'status' | 'currentStageNote'>
  ) => {
    const arn = `AA100924${Math.floor(500000 + Math.random() * 500000)}R`;
    const newClaim: RefundClaim = {
      ...claim,
      id: `ref-${Date.now()}`,
      arn,
      filingDate: new Date().toISOString().split('T')[0],
      status: 'Filed',
      currentStageNote: 'Application filed successfully in Form RFD-01. Awaiting scrutiny acknowledgment in RFD-02.',
    };
    setRefundClaims((prev) => [newClaim, ...prev]);
    return newClaim;
  };

  // Notices
  const submitNoticeReply = (noticeId: string, replyText: string, docs: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    setNotices((prev) =>
      prev.map((n) =>
        n.id === noticeId
          ? {
              ...n,
              status: 'Reply Submitted',
              replies: [
                ...(n.replies || []),
                {
                  date: today,
                  explanation: replyText,
                  attachedDocs: docs,
                  drc03Arn: `DRC03-${Math.floor(100000 + Math.random() * 900000)}`,
                },
              ],
            }
          : n
      )
    );
  };

  // Scenario Evaluation
  const submitScenarioEvaluation = (scenarioId: string, userAnswers: any) => {
    const scenario = practiceScenarios.find((s) => s.id === scenarioId);
    if (!scenario) return { passed: false, score: 0, breakdown: {} };

    const expected = scenario.expectedAnswers;
    let correctCount = 0;
    let totalKeys = Object.keys(expected).length;
    const breakdown: any = {};

    Object.keys(expected).forEach((key) => {
      const userVal = Number(userAnswers[key]);
      const expVal = Number(expected[key]);
      if (Math.abs(userVal - expVal) <= 1) {
        correctCount++;
        breakdown[key] = { status: 'Correct', user: userVal, expected: expVal };
      } else {
        breakdown[key] = {
          status: userAnswers[key] === undefined || userAnswers[key] === '' ? 'Missing' : 'Incorrect',
          user: userAnswers[key],
          expected: expVal,
        };
      }
    });

    const score = Math.round((correctCount / totalKeys) * 100);
    const passed = score >= 75;

    setScenarioResults((prev) => ({
      ...prev,
      [scenarioId]: {
        completed: true,
        score,
        feedback: passed
          ? `Excellent work! You achieved ${score}%. All critical return entries and calculations match statutory rules.`
          : `Score: ${score}%. Some values had discrepancies. Review the explanation notes below and retry.`,
      },
    }));

    return { passed, score, breakdown };
  };

  const recordQuizScore = (lessonId: string, score: number) => {
    setQuizScores((prev) => ({ ...prev, [lessonId]: score }));
  };

  const resetSimulatorState = () => {
    setGstr1({
      financialYear: '2024-25',
      returnPeriod: 'September 2024',
      status: 'Ready to File',
      b2bInvoices: INITIAL_B2B_INVOICES,
      b2cLarge: INITIAL_B2C_LARGE,
      b2cSmall: INITIAL_B2C_SMALL,
      creditDebitNotes: INITIAL_CREDIT_NOTES,
      exportInvoices: INITIAL_EXPORT_INVOICES,
      nilRatedSupplies: { nilRated: 25000, exempted: 0, nonGst: 0 },
      advancesReceived: 0,
      advancesAdjusted: 0,
      hsnSummary: INITIAL_HSN_SUMMARY,
      documentsSummary: INITIAL_DOCUMENTS_SUMMARY,
    });
    setPurchaseRegister(INITIAL_PURCHASE_REGISTER);
    setGstr2bInvoices(INITIAL_GSTR2B_INVOICES);
    setReconciliationData(INITIAL_RECONCILIATION_DATA);
    setCashLedger(INITIAL_CASH_LEDGER);
    setCreditLedger(INITIAL_CREDIT_LEDGER);
    setLedgerTransactions(INITIAL_LEDGER_TRANSACTIONS);
    setNotices(INITIAL_NOTICES);
    setScenarioResults({});
    setQuizScores({});
  };

  return (
    <GstPortalContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        companies,
        activeCompany,
        currentFY,
        currentPeriod,
        activeTab,
        setActiveTab,
        setCurrentFY,
        setCurrentPeriod,
        switchCompany,
        loginAs,
        logout,
        gstr1,
        addB2BInvoice,
        deleteB2BInvoice,
        addCreditNote,
        fileGstr1,
        gstr3b,
        updateGstr3bTable3_1,
        updateGstr3bTable4,
        autoDraftGstr3bFromReturns,
        simulateGstr3bOffset,
        fileGstr3b,
        purchaseRegister,
        gstr2bInvoices,
        reconciliationData,
        addPurchaseInvoice,
        updateReconciliationAction,
        cashLedger,
        creditLedger,
        ledgerTransactions,
        depositCashLedger,
        challans,
        createChallan,
        payChallan,
        refundClaims,
        submitRefundClaim,
        notices,
        submitNoticeReply,
        practiceScenarios,
        scenarioResults,
        submitScenarioEvaluation,
        quizScores,
        recordQuizScore,
        resetSimulatorState,
      }}
    >
      {children}
    </GstPortalContext.Provider>
  );
};

export const useGstPortal = () => {
  const context = useContext(GstPortalContext);
  if (!context) {
    throw new Error('useGstPortal must be used within a GstPortalProvider');
  }
  return context;
};
