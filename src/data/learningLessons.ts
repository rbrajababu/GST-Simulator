import { LearningLesson } from '../types/gst';

export const ALL_LEARNING_LESSONS: LearningLesson[] = [
  {
    id: 'les-01',
    title: '1. GST Basics & Dual GST Framework',
    slug: 'gst-basics-dual-structure',
    category: 'Fundamentals',
    estimatedMinutes: 8,
    summary: 'Understand the concept of Goods and Services Tax, destination-based taxation, and CGST, SGST, IGST dual model.',
    content: {
      introduction:
        'Goods and Services Tax (GST) is a comprehensive, multi-stage, destination-based consumption tax levied on every value addition in India. Under the dual GST framework, both the Central Government and State Governments concurrently levy tax on a common base.',
      keyProvisions: [
        'Destination-Based Principle: Tax accrues to the State where goods or services are consumed, rather than where they originate.',
        'Intra-State Supply: Location of supplier and place of supply are in the SAME state -> CGST (Central Tax) + SGST (State Tax) apply equally.',
        'Inter-State Supply: Location of supplier and place of supply are in DIFFERENT states -> IGST (Integrated Tax) applies.',
        'Standard GST Rate Slabs: 0% (Essential goods), 5%, 12%, 18% (Standard services/goods), 28% (Luxury & sin goods).',
      ],
      practicalExample: {
        title: 'Intra-State vs Inter-State Calculation',
        scenario: 'A dealer in Patna (Bihar) sells computer monitors for ₹50,000 at 18% GST.',
        breakdown: [
          {
            step: 'Sale to a customer in Gaya (Bihar)',
            calculation: 'CGST 9% (₹4,500) + SGST 9% (₹4,500) = Total ₹59,000',
            note: 'Both supplier and buyer are in Bihar (Intra-State)',
          },
          {
            step: 'Sale to a customer in Ranchi (Jharkhand)',
            calculation: 'IGST 18% (₹9,000) = Total ₹59,000',
            note: 'Supplier in Bihar, Buyer in Jharkhand (Inter-State)',
          },
        ],
      },
      commonErrors: [
        'Charging IGST on intra-state supplies or CGST+SGST on inter-state supplies (results in interest & wrong tax payment under Section 77).',
        'Confusing location of delivery with Place of Supply (POS).',
      ],
    },
    quiz: [
      {
        question: 'When a supplier in Maharashtra sells goods to a buyer in Gujarat, what tax is levied?',
        options: ['CGST + SGST', 'IGST', 'UTGST', 'Only CGST'],
        correctIndex: 1,
        explanation: 'Inter-State supplies (between two different states) attract Integrated GST (IGST) under the IGST Act, 2017.',
      },
      {
        question: 'What is the GST rate breakdown for an 18% item sold within the same state?',
        options: ['18% IGST', '9% CGST + 9% SGST', '12% CGST + 6% SGST', '18% CGST'],
        correctIndex: 1,
        explanation: 'For intra-state supplies, the total tax rate is divided equally between the Central Government (CGST 9%) and the State Government (SGST 9%).',
      },
      {
        question: 'GST is which type of tax?',
        options: ['Origin-based tax', 'Destination-based consumption tax', 'Direct income tax', 'Property tax'],
        correctIndex: 1,
        explanation: 'GST is a destination-based consumption tax; tax revenue goes to the consuming state.',
      },
      {
        question: 'Which constitutional amendment introduced GST in India?',
        options: ['100th Amendment', '101st Amendment', '103rd Amendment', '99th Amendment'],
        correctIndex: 1,
        explanation: 'The Constitution (One Hundred and First Amendment) Act, 2016 paved the way for GST implementation on July 1, 2017.',
      },
      {
        question: 'Which authority governs GST policy and rate decisions in India?',
        options: ['Reserve Bank of India', 'GST Council (headed by Union Finance Minister)', 'Income Tax Department', 'NITI Aayog'],
        correctIndex: 1,
        explanation: 'The GST Council, created under Article 279A, comprises the Union Finance Minister and State Finance Ministers.',
      },
    ],
  },
  {
    id: 'les-02',
    title: '2. GST Registration & Threshold Limits',
    slug: 'gst-registration-rules',
    category: 'Registration',
    estimatedMinutes: 10,
    summary: 'Master Section 22 and Section 24 criteria, mandatory registration, thresholds, and documents required.',
    content: {
      introduction:
        'Registration in GST is legally mandatory once turnover crosses prescribed statutory limits or upon undertaking specific transactions such as inter-state taxable supplies or e-commerce operations.',
      keyProvisions: [
        'Turnover Limit for Goods: ₹40 Lakhs in normal states (₹20 Lakhs in Special Category states).',
        'Turnover Limit for Services: ₹20 Lakhs in normal states (₹10 Lakhs in Special Category states).',
        'Section 24 Mandatory Registration: Inter-state taxable suppliers, casual taxable persons, persons paying RCM, e-commerce operators.',
        'Form REG-01: Application form containing Part A (PAN, Mobile, Email validation) and Part B (Business, Promoters, Place of business details).',
        'ARN (Application Reference Number): 15-digit tracking number issued upon successful submission.',
      ],
      practicalExample: {
        title: 'Determining Registration Requirement',
        scenario: 'A freelance web designer in Bangalore earns ₹24 Lakhs annually from clients within Karnataka.',
        breakdown: [
          { step: 'Nature of Supply', calculation: 'Service Provider', note: 'Threshold for services is ₹20 Lakhs' },
          { step: 'Turnover Comparison', calculation: '₹24 Lakhs > ₹20 Lakhs threshold', note: 'Crosses statutory limit' },
          { step: 'Legal Verdict', calculation: 'Mandatory GST Registration within 30 days', note: 'Liable under Section 22(1)' },
        ],
      },
      commonErrors: [
        'Applying the ₹40 Lakh threshold to service providers (services threshold is strictly ₹20 Lakhs).',
        'Supplying goods inter-state without registration (Section 24 mandates registration regardless of turnover).',
      ],
    },
    quiz: [
      {
        question: 'What is the GST turnover threshold for mandatory registration for a service provider in Delhi?',
        options: ['₹40 Lakhs', '₹20 Lakhs', '₹10 Lakhs', '₹1.5 Crore'],
        correctIndex: 1,
        explanation: 'For service providers in normal states, the turnover limit for registration is ₹20 Lakhs under Section 22.',
      },
      {
        question: 'Is GST registration mandatory for a trader making inter-state taxable supplies of ₹50,000?',
        options: ['No, turnover is below threshold', 'Yes, compulsory under Section 24', 'Only if buyer requests', 'Only after 6 months'],
        correctIndex: 1,
        explanation: 'Section 24 specifies persons making any inter-state taxable supply of goods must compulsorily register regardless of turnover.',
      },
      {
        question: 'What document is generated immediately upon filing Form GST REG-01?',
        options: ['GST Certificate', 'ARN (Application Reference Number)', 'PAN Card', 'Challan'],
        correctIndex: 1,
        explanation: 'An Application Reference Number (ARN) is generated for tracking the registration application status.',
      },
      {
        question: 'Within how many days of becoming liable must a person apply for GST registration?',
        options: ['15 days', '30 days', '60 days', '90 days'],
        correctIndex: 1,
        explanation: 'Under Section 25(1), the application must be submitted within 30 days from the date on which liability arises.',
      },
      {
        question: 'Which form is issued by the tax officer as the GST Registration Certificate?',
        options: ['Form GST REG-01', 'Form GST REG-06', 'Form GST REG-17', 'Form GST PMT-06'],
        correctIndex: 1,
        explanation: 'Form GST REG-06 is the official Certificate of Registration containing the GSTIN.',
      },
    ],
  },
  {
    id: 'les-03',
    title: '3. Anatomy of GSTIN & Taxpayer Types',
    slug: 'gstin-structure-types',
    category: 'Fundamentals',
    estimatedMinutes: 8,
    summary: 'Deconstruct the 15-digit GSTIN, state codes, PAN mapping, entity codes, and taxpayer categories.',
    content: {
      introduction:
        'Every registered person in GST is allocated a unique 15-digit alphanumeric Goods and Services Tax Identification Number (GSTIN) based on their Permanent Account Number (PAN).',
      keyProvisions: [
        'Digits 1-2: 2-digit State Code based on the Census 2011 (e.g. 10 for Bihar, 27 for Maharashtra, 29 for Karnataka).',
        'Digits 3-12: 10-character PAN of the business entity (e.g. ABCDE1234F).',
        'Digit 13: Entity code representing number of registrations the entity holds in that state (1 to 9, then A to Z).',
        'Digit 14: Default alphabet "Z" by statutory design.',
        'Digit 15: Check digit for error detection generated by algorithm.',
      ],
      practicalExample: {
        title: 'Decoding 10ABCDE1234F1Z5',
        scenario: 'Analyzing the demo GSTIN of RB Enterprises',
        breakdown: [
          { step: '10', calculation: 'State Code', note: 'Bihar' },
          { step: 'ABCDE1234F', calculation: 'PAN', note: 'Permanent Account Number of RB Enterprises' },
          { step: '1', calculation: 'Entity Number', note: 'First business vertical in this State' },
          { step: 'Z', calculation: 'Default Letter', note: 'Static character' },
          { step: '5', calculation: 'Checksum', note: 'Validation digit' },
        ],
      },
      commonErrors: [
        'Entering wrong state code leading to invalid GSTIN validation errors.',
        'Confusing Composition taxpayers with Regular taxpayers (Composition taxpayers cannot issue tax invoices or claim ITC).',
      ],
    },
    quiz: [
      {
        question: 'How many alphanumeric characters are there in a standard GSTIN?',
        options: ['10', '12', '15', '16'],
        correctIndex: 2,
        explanation: 'A GSTIN is exactly 15 characters long, starting with 2 state digits and followed by the 10-digit PAN.',
      },
      {
        question: 'What do the first 2 digits of a GSTIN represent?',
        options: ['Year of registration', 'State Code', 'Business vertical', 'Industry code'],
        correctIndex: 1,
        explanation: 'The first two digits represent the State/UT code as per the Indian Census code listing.',
      },
      {
        question: 'What is the 14th character of all standard GSTINs?',
        options: ['Always 1', 'Always X', 'Always Z', 'Random letter'],
        correctIndex: 2,
        explanation: 'The 14th character is defaulted to "Z" by design in the GSTIN algorithm.',
      },
      {
        question: 'Can a Composition Taxpayer collect GST from their customers?',
        options: ['Yes, at 18%', 'No, they cannot charge GST to customers', 'Yes, but only 5%', 'Yes, only on inter-state sales'],
        correctIndex: 1,
        explanation: 'Under Section 10, composition dealers pay tax out of their pocket and cannot collect any tax from purchasers.',
      },
      {
        question: 'What is the aggregate turnover limit for opting into the Composition Scheme for goods manufacturers/traders?',
        options: ['₹50 Lakhs', '₹1 Crore', '₹1.5 Crore', '₹5 Crore'],
        correctIndex: 2,
        explanation: 'The eligibility turnover limit for Composition Scheme under Section 10 is ₹1.5 Crore in most states.',
      },
    ],
  },
  {
    id: 'les-04',
    title: '4. Tax Invoice, Credit Note & Debit Note Rules',
    slug: 'tax-invoice-credit-debit-notes',
    category: 'Documentation',
    estimatedMinutes: 10,
    summary: 'Learn Section 31 rules, mandatory invoice fields, time limits for issuance, and debit/credit note mechanics.',
    content: {
      introduction:
        'A Tax Invoice is the primary commercial document evidencing supply of goods or services and serves as the essential basis for the recipient to claim Input Tax Credit under Section 16.',
      keyProvisions: [
        'Mandatory Invoice Particulars: Supplier GSTIN & Name, Consecutive Serial Number (max 16 characters), Date, Recipient GSTIN & Name, HSN code, Description, Taxable Value, Tax rate & Amount, Place of Supply.',
        'Time of Issuance for Goods: On or before removal/delivery of goods.',
        'Time of Issuance for Services: Within 30 days of service completion (45 days for banking/insurance).',
        'Credit Note (Section 34(1)): Issued when taxable value or tax charged in invoice exceeds actual value, or goods returned, or post-sale discount given.',
        'Debit Note (Section 34(3)): Issued when taxable value or tax charged in original invoice is found to be less than actual value.',
      ],
      practicalExample: {
        title: 'Issuing a Credit Note for Damaged Goods',
        scenario: 'Customer returns ₹10,000 worth of damaged goods originally billed at 18% GST.',
        breakdown: [
          { step: 'Taxable Reduction', calculation: '₹10,000', note: 'Reduces supplier taxable turnover' },
          { step: 'Tax Reduction', calculation: '₹900 CGST + ₹900 SGST = ₹1,800', note: 'Reduces supplier output liability' },
          { step: 'Recipient Impact', calculation: 'Customer must reverse ₹1,800 ITC in GSTR-3B', note: 'Reversal required under Section 34(2)' },
        ],
      },
      commonErrors: [
        'Issuing invoices with duplicate or non-sequential serial numbers exceeding 16 alphanumeric characters.',
        'Not referencing original invoice number on Credit or Debit notes.',
      ],
    },
    quiz: [
      {
        question: 'What is the maximum allowed length of an invoice serial number in GST?',
        options: ['12 characters', '16 characters', '20 characters', 'Unlimited'],
        correctIndex: 1,
        explanation: 'Under Rule 46 of CGST Rules, an invoice serial number must not exceed 16 alphanumeric characters.',
      },
      {
        question: 'When should a Credit Note be issued by a supplier?',
        options: [
          'When invoice value needs to be increased',
          'When goods are returned or post-sale discount is granted',
          'Only when buyer fails to pay',
          'When generating an E-way bill',
        ],
        correctIndex: 1,
        explanation: 'A Credit Note is issued under Section 34(1) when taxable value or tax in invoice exceeds actual value or goods are returned.',
      },
      {
        question: 'What is the statutory deadline for issuing an invoice for taxable services?',
        options: ['Within 7 days', 'Within 15 days', 'Within 30 days from provision of service', 'End of the quarter'],
        correctIndex: 2,
        explanation: 'Under Section 31(2) read with Rule 47, invoice for services must be issued within 30 days of completion.',
      },
      {
        question: 'Can a buyer claim ITC without possessing a valid tax invoice or debit note?',
        options: ['Yes, if payment is made', 'No, physical or electronic tax invoice is mandatory under Section 16(2)(a)', 'Yes, with bank statement', 'Yes, if authorized by CA'],
        correctIndex: 1,
        explanation: 'Possession of a tax invoice or debit note is a non-negotiable statutory requirement under Section 16(2)(a).',
      },
      {
        question: 'What does a Debit Note signify in GST?',
        options: ['Reduction in tax liability', 'Increase in tax liability / additional value charged', 'Cancellation of registration', 'Nil return'],
        correctIndex: 1,
        explanation: 'A Debit Note is issued under Section 34(3) when original invoice had a shortfall in taxable value or tax charged.',
      },
    ],
  },
  {
    id: 'les-05',
    title: '5. E-Invoicing System & IRN Generation',
    slug: 'e-invoicing-irn-rules',
    category: 'Documentation',
    estimatedMinutes: 9,
    summary: 'Understand electronic invoicing, Invoice Registration Portal (IRP), IRN, QR code, and turnover thresholds.',
    content: {
      introduction:
        'Electronic Invoicing (E-Invoicing) is a system where B2B invoices and credit/debit notes are electronically authenticated by the Invoice Registration Portal (IRP) with a unique Invoice Reference Number (IRN) and digitally signed QR code.',
      keyProvisions: [
        'Applicability: Mandatory for registered persons whose aggregate turnover in ANY preceding financial year from 2017-18 exceeds ₹5 Crore.',
        'Invoice Reference Number (IRN): Unique 64-character hash generated by SHA-256 algorithm based on supplier GSTIN, invoice number, and financial year.',
        'Signed QR Code: Must be printed on the invoice copy provided to the buyer.',
        'Non-Applicability: Banking companies, NBFCs, Goods Transport Agencies (GTA), Passenger transport services, Cinema multiplexes, SEZ units.',
        'Auto-Population: Data reported on IRP flows automatically into GSTR-1 and E-Way Bill portals.',
      ],
      practicalExample: {
        title: 'Verifying E-Invoice Validity',
        scenario: 'A company with ₹12 Crore turnover issues a B2B invoice without an IRN or QR code.',
        breakdown: [
          { step: 'Applicability Check', calculation: 'Turnover > ₹5 Cr threshold', note: 'E-invoicing is legally mandatory' },
          { step: 'Document Status', calculation: 'Invalid Invoice under Rule 48(5)', note: 'Invoice without IRN is null & void' },
          { step: 'Consequences', calculation: 'Recipient CANNOT claim ITC; Supplier liable to penalty under Section 122', note: 'Heavy penalty up to ₹25,000' },
        ],
      },
      commonErrors: [
        'Believing e-invoice means generating an invoice directly on the GST portal (it must be generated on ERP and registered on IRP).',
        'Generating e-invoices for B2C transactions (e-invoicing is ONLY applicable to B2B and Exports).',
      ],
    },
    quiz: [
      {
        question: 'What is the current aggregate turnover threshold for mandatory E-Invoicing in India?',
        options: ['₹50 Crore', '₹20 Crore', '₹5 Crore', '₹1 Crore'],
        correctIndex: 2,
        explanation: 'E-Invoicing is mandatory for taxpayers whose aggregate turnover exceeds ₹5 Crore in any preceding financial year.',
      },
      {
        question: 'How many characters long is an Invoice Reference Number (IRN)?',
        options: ['15 characters', '32 characters', '64 characters', '128 characters'],
        correctIndex: 2,
        explanation: 'An IRN is a unique 64-character cryptographic hash generated by the IRP system.',
      },
      {
        question: 'Is E-Invoicing applicable to B2C (Business to Consumer) invoices?',
        options: ['Yes, for all sales', 'No, only B2B and Export supplies', 'Yes, if above ₹50,000', 'Only for luxury items'],
        correctIndex: 1,
        explanation: 'E-Invoicing under Rule 48(4) is strictly applicable to B2B supplies, Exports, and SEZ supplies, not B2C.',
      },
      {
        question: 'What happens if an invoice required to have an IRN is issued without one?',
        options: [
          'It is treated as valid with warning',
          'It is deemed invalid under Rule 48(5) and buyer cannot claim ITC',
          'Recipient pays 5% extra tax',
          'Nothing happens',
        ],
        correctIndex: 1,
        explanation: 'Rule 48(5) states that any invoice issued without complying with e-invoicing shall not be treated as an invoice.',
      },
      {
        question: 'Which of the following entities is exempt from mandatory E-Invoicing regardless of turnover?',
        options: ['Manufacturing companies', 'SEZ Developer', 'SEZ Unit', 'IT Consulting LLP'],
        correctIndex: 2,
        explanation: 'Special Economic Zone (SEZ) Units are specifically exempt from mandatory e-invoicing provisions.',
      },
    ],
  },
  {
    id: 'les-06',
    title: '6. E-Way Bill Mechanics & Part A / Part B Rules',
    slug: 'e-way-bill-rules',
    category: 'Documentation',
    estimatedMinutes: 10,
    summary: 'Learn Section 68 and Rule 138 rules, ₹50,000 consignment threshold, validity periods, and transporter rules.',
    content: {
      introduction:
        'An E-Way Bill (Electronic Way Bill) is a compliance document generated electronically on the portal for the movement of goods of consignment value exceeding ₹50,000.',
      keyProvisions: [
        'Consignment Value Threshold: Mandatory for movement of goods where consignment value exceeds ₹50,000 (including GST, excluding exempt supplies).',
        'Part A: Consists of GSTIN of supplier & recipient, Place of delivery, Invoice/Challan number, Date, Value of goods, HSN code, Reason for transportation.',
        'Part B: Vehicle number / Transporter document number (RR/LR/Airway Bill).',
        'Validity Period: 1 day for every 200 km (or part thereof) for normal cargo; 1 day for every 20 km for Over Dimensional Cargo (ODC).',
        'Mandatory Without Threshold: Inter-state movement of goods by principal to job-worker, and inter-state movement of handicraft goods by exempt persons.',
      ],
      practicalExample: {
        title: 'Calculating E-Way Bill Validity',
        scenario: 'Goods dispatched from Patna to Kolkata covering a road distance of 580 km on 10th September at 11:00 AM.',
        breakdown: [
          { step: 'Distance Rate', calculation: '200 km per day for normal cargo', note: 'Standard cargo speed rule' },
          { step: 'Days Calculation', calculation: '580 / 200 = 2.9 days -> Rounded up to 3 days', note: 'Every 200 km or fraction gives 1 day' },
          { step: 'Expiry Time', calculation: 'Expires at midnight of 13th September', note: 'Valid for 3 calendar days up to midnight' },
        ],
      },
      commonErrors: [
        'Moving goods with Part A generated but Part B blank (invalid for movement beyond 50 km).',
        'Letting E-Way bill expire before goods reach destination without extending validity within 8 hours.',
      ],
    },
    quiz: [
      {
        question: 'What is the standard consignment value threshold for mandatory generation of an E-Way Bill?',
        options: ['₹20,000', '₹50,000', '₹1,00,000', '₹2,50,000'],
        correctIndex: 1,
        explanation: 'Under Rule 138(1), an e-way bill is required for movement of goods with consignment value exceeding ₹50,000.',
      },
      {
        question: 'What does Part B of an E-Way Bill contain?',
        options: ['Invoice details', 'Buyer GSTIN', 'Vehicle number or transporter document number', 'HSN codes'],
        correctIndex: 2,
        explanation: 'Part B contains transport details, specifically the vehicle registration number or transport receipt number.',
      },
      {
        question: 'For normal cargo, what is the validity of an E-Way bill per 200 kilometers of distance?',
        options: ['12 hours', '1 day (24 hours)', '2 days', '7 days'],
        correctIndex: 1,
        explanation: 'Rule 138(10) specifies a validity of 1 day for every 200 km or part thereof.',
      },
      {
        question: 'Within what time frame before or after expiry can an E-Way bill validity be extended?',
        options: ['Within 8 hours before or after expiry', 'Within 24 hours', 'Only after expiry', 'Cannot be extended'],
        correctIndex: 0,
        explanation: 'An e-way bill can be extended within 8 hours before expiry and up to 8 hours after expiry.',
      },
      {
        question: 'Is an E-Way bill mandatory for inter-state movement of goods to a job-worker even if value is below ₹50,000?',
        options: ['No, threshold applies', 'Yes, mandatory regardless of consignment value', 'Only for machinery', 'Only if job-worker is registered'],
        correctIndex: 1,
        explanation: 'Third proviso to Rule 138(1) mandates e-way bill for inter-state job-work movement irrespective of value.',
      },
    ],
  },
  {
    id: 'les-07',
    title: '7. GSTR-1: Outward Supplies & Table Rules',
    slug: 'gstr-1-table-rules',
    category: 'Returns Practice',
    estimatedMinutes: 12,
    summary: 'Master the breakdown of GSTR-1 tables: B2B, B2C Large, B2C Small, Credit Notes, Exports, and HSN summary.',
    content: {
      introduction:
        'GSTR-1 is the monthly or quarterly statement of outward supplies of goods and services filed under Section 37 of the CGST Act. The details uploaded in GSTR-1 flow automatically into the recipients’ GSTR-2B statement.',
      keyProvisions: [
        'Table 4: B2B supplies to registered persons (Invoice-level details required).',
        'Table 5: B2C Large supplies (Inter-State supplies to unregistered persons where invoice value > ₹2.5 Lakhs).',
        'Table 7: B2C Small supplies (Intra-state supplies and small inter-state supplies up to ₹2.5 Lakhs - reported rate-wise summary).',
        'Table 9B: Credit & Debit Notes issued during the period.',
        'Table 12: HSN-wise summary of outward supplies (mandatory 4 digits for turnover up to ₹5 Cr; 6 digits for turnover > ₹5 Cr).',
        'Due Date: 11th of the following month for monthly filers, or 13th under the QRMP scheme.',
      ],
      practicalExample: {
        title: 'Distinguishing Table 4, 5, and 7',
        scenario: 'Reporting three sales of ₹3,00,000 by a Bihar taxpayer:',
        breakdown: [
          { step: 'Sale to GST registered trader in Patna', calculation: 'Table 4A (B2B)', note: 'Recipient has GSTIN' },
          { step: 'Sale to unregistered individual in Ranchi (Jharkhand) for ₹3,00,000', calculation: 'Table 5A (B2C Large)', note: 'Inter-state + Value > ₹2.5L' },
          { step: 'Sale to unregistered individual in Patna for ₹3,00,000', calculation: 'Table 7 (B2C Small)', note: 'Intra-state (reported consolidated)' },
        ],
      },
      commonErrors: [
        'Reporting intra-state high value consumer sales in Table 5 instead of Table 7 (Table 5 is ONLY for inter-state sales).',
        'Failing to report HSN summary matching the total taxable turnover in Table 12.',
      ],
    },
    quiz: [
      {
        question: 'Which table in GSTR-1 is used to enter B2B outward invoices?',
        options: ['Table 4', 'Table 7', 'Table 8', 'Table 13'],
        correctIndex: 0,
        explanation: 'Table 4 is designated for supplies made to registered persons (B2B).',
      },
      {
        question: 'When does an invoice qualify as "B2C Large" in GSTR-1 Table 5?',
        options: [
          'Any invoice above ₹50,000',
          'Inter-State supply to an unregistered person where invoice value exceeds ₹2.5 Lakhs',
          'Intra-State supply to unregistered person above ₹1 Lakh',
          'Any export invoice',
        ],
        correctIndex: 1,
        explanation: 'Table 5 is specifically for Inter-State supplies to unregistered buyers where the total invoice value exceeds ₹2.5 Lakhs.',
      },
      {
        question: 'How is Table 7 (B2C Others) entered in GSTR-1?',
        options: ['Invoice by invoice', 'Consolidated rate-wise and Place of Supply-wise', 'HSN-wise only', 'Customer PAN-wise'],
        correctIndex: 1,
        explanation: 'Table 7 is entered as a consolidated summary per POS and GST tax rate slab.',
      },
      {
        question: 'What is the standard due date for filing monthly GSTR-1?',
        options: ['11th of the succeeding month', '20th of the succeeding month', '31st of the quarter end', '15th of the month'],
        correctIndex: 0,
        explanation: 'Monthly GSTR-1 is due on the 11th of the following month (e.g. September GSTR-1 is due on October 11th).',
      },
      {
        question: 'What does Table 12 of GSTR-1 contain?',
        options: ['Documents issued summary', 'HSN-wise summary of outward supplies', 'Advances received', 'Amended invoices'],
        correctIndex: 1,
        explanation: 'Table 12 requires reporting HSN/SAC code wise quantities, taxable value, and tax breakdown.',
      },
    ],
  },
  {
    id: 'les-08',
    title: '8. GSTR-3B: Outward Supplies & Rule 88A Set-off',
    slug: 'gstr-3b-set-off-rules',
    category: 'Returns Practice',
    estimatedMinutes: 15,
    summary: 'Detailed study of GSTR-3B summary return, Table 3.1, Table 4 ITC, and the strict credit utilization order under Rule 88A.',
    content: {
      introduction:
        'GSTR-3B is a monthly self-declaration summary return filed under Section 39 where taxpayers summarize their outward supplies, claim Input Tax Credit, and discharge net tax liability in cash or credit.',
      keyProvisions: [
        'Table 3.1: Details of Outward Supplies & inward supplies liable to reverse charge.',
        'Table 4(A): ITC available (Imports, RCM, ISD, All other ITC).',
        'Table 4(B): ITC reversed (Rule 42/43 of CGST Rules, others).',
        'Table 4(D): Ineligible ITC (Section 17(5) blocked credits).',
        'Rule 88A Set-off Order: IGST credit must be fully exhausted first before using CGST or SGST credit.',
        'Strict Cross-Utilization Rule: CGST credit CANNOT be used to pay SGST liability, and SGST credit CANNOT be used to pay CGST liability.',
      ],
      practicalExample: {
        title: 'Rule 88A Set-off Calculation',
        scenario: 'Liabilities: IGST ₹50k, CGST ₹30k, SGST ₹30k. Available ITC: IGST ₹70k, CGST ₹20k, SGST ₹20k.',
        breakdown: [
          { step: 'Pay IGST Liability (₹50k)', calculation: 'Utilize ₹50k from IGST Credit (Balance IGST ITC = ₹20k)', note: 'IGST ITC must pay IGST first' },
          { step: 'Utilize Remaining IGST ITC (₹20k)', calculation: 'Apply ₹10k to CGST and ₹10k to SGST (Balance IGST ITC = 0)', note: 'Can be split in any proportion' },
          { step: 'Pay Balance CGST (₹20k)', calculation: 'Utilize ₹20k from CGST Credit (CGST paid in full)', note: 'CGST ITC pays CGST' },
          { step: 'Pay Balance SGST (₹20k)', calculation: 'Utilize ₹20k from SGST Credit (SGST paid in full)', note: 'SGST ITC pays SGST' },
        ],
      },
      commonErrors: [
        'Attempting to cross-utilize CGST credit for SGST liability (portal rejects this).',
        'Availing ITC in GSTR-3B without verifying GSTR-2B (violates Section 16(2)(aa)).',
      ],
    },
    quiz: [
      {
        question: 'Under Rule 88A, which tax credit must be completely exhausted first before utilizing any other credit?',
        options: ['CGST Credit', 'SGST Credit', 'IGST Credit', 'Cess Credit'],
        correctIndex: 2,
        explanation: 'Rule 88A mandates that the entire IGST credit balance must be utilized first before touching CGST or SGST credits.',
      },
      {
        question: 'Can CGST credit be utilized to pay SGST tax liability?',
        options: ['Yes, always', 'No, never', 'Yes, with Commissioner permission', 'Yes, up to 50%'],
        correctIndex: 1,
        explanation: 'Cross-utilization of CGST credit against SGST liability (or vice-versa) is strictly prohibited by law.',
      },
      {
        question: 'Where is Input Tax Credit claimed in Form GSTR-3B?',
        options: ['Table 3.1', 'Table 4', 'Table 5', 'Table 6.1'],
        correctIndex: 1,
        explanation: 'Table 4 of Form GSTR-3B is specifically dedicated to Eligible ITC, ITC Reversal, and Ineligible ITC.',
      },
      {
        question: 'What is the standard due date for filing monthly GSTR-3B for taxpayers with turnover > ₹5 Crore?',
        options: ['11th of the next month', '15th of the next month', '20th of the next month', 'Last day of the month'],
        correctIndex: 2,
        explanation: 'Normal monthly GSTR-3B is due on the 20th of the succeeding month.',
      },
      {
        question: 'What is the rate of interest under Section 50 for delayed payment of GST liability in cash?',
        options: ['12% p.a.', '18% p.a.', '24% p.a.', '6% p.a.'],
        correctIndex: 1,
        explanation: 'Under Section 50(1), interest at 18% per annum is payable on the net tax paid in cash delayed beyond the due date.',
      },
    ],
  },
  {
    id: 'les-09',
    title: '9. GSTR-2B Auto-Drafted Statement & Features',
    slug: 'gstr-2b-statement-features',
    category: 'Returns Practice',
    estimatedMinutes: 10,
    summary: 'Learn how GSTR-2B is generated on the 14th of every month, static vs dynamic differences, and ITC actionability.',
    content: {
      introduction:
        'GSTR-2B is a static, auto-drafted Input Tax Credit (ITC) statement generated on the 14th of every month based on supplier GSTR-1, IFF, and GSTR-5 filings made up to the 13th of the month.',
      keyProvisions: [
        'Static Snapshot: Remains unchanged for the tax period once generated on the 14th.',
        'Part A: ITC Available (Supplies from registered persons, inward supplies from ISD, Inward RCM, Import of goods from ICEGATE).',
        'Part B: ITC Not Available (Invoices where Place of Supply and recipient state cause ITC restriction, or invoices filed after the Section 16(4) deadline).',
        'Advisory Purpose: Guides taxpayers on exact eligible ITC for Form GSTR-3B Table 4.',
      ],
      practicalExample: {
        title: 'Determining Tax Period in GSTR-2B',
        scenario: 'A supplier files their August GSTR-1 on 15th September (after the 11th deadline).',
        breakdown: [
          { step: 'August 2B Cutoff', calculation: 'Cutoff date was 13th September', note: 'Invoice missed August GSTR-2B' },
          { step: 'Reflected In', calculation: 'Appears in September GSTR-2B generated on 14th October', note: 'Moved to next period 2B' },
          { step: 'Claim Window', calculation: 'Buyer claims ITC in September GSTR-3B filed in October', note: 'Complies with Section 16(2)(aa)' },
        ],
      },
      commonErrors: [
        'Looking for late-filed invoices in the month of invoice date instead of the month supplier actually filed.',
        'Ignoring the "ITC Available - No" column in GSTR-2B.',
      ],
    },
    quiz: [
      {
        question: 'When is Form GSTR-2B generated for a month on the GST portal?',
        options: ['1st of every month', '11th of every month', '14th of every month', '20th of every month'],
        correctIndex: 2,
        explanation: 'GSTR-2B is generated on the 14th of every month after the GSTR-1 filing cutoff.',
      },
      {
        question: 'Does GSTR-2B change if a supplier files their return after the 14th of that month?',
        options: [
          'Yes, it updates daily',
          'No, GSTR-2B is static; late filed invoices will appear in the next month GSTR-2B',
          'It updates only on weekends',
          'It deletes previous records',
        ],
        correctIndex: 1,
        explanation: 'GSTR-2B is a static statement; any late filing appears in the subsequent month’s GSTR-2B.',
      },
      {
        question: 'Does GSTR-2B include import data from overseas customs?',
        options: ['No, customs is outside GST', 'Yes, integrated with ICEGATE system', 'Only for air cargo', 'Only if declared manually'],
        correctIndex: 1,
        explanation: 'GSTR-2B integrates automatically with ICEGATE to reflect IGST paid on Bill of Entry imports.',
      },
      {
        question: 'If GSTR-2B shows an invoice under "ITC Available: No", can the taxpayer claim it in Table 4(A)(5)?',
        options: ['Yes, taxpayer choice', 'No, it must not be claimed as eligible ITC', 'Yes, but pay penalty', 'Only up to 10%'],
        correctIndex: 1,
        explanation: 'Invoices flagged as "ITC Available: No" (e.g. POS mismatch or time barred) are ineligible for claim.',
      },
      {
        question: 'Which statement auto-populates directly into Table 4 of Form GSTR-3B?',
        options: ['GSTR-2A', 'GSTR-2B', 'GSTR-1', 'E-Way Bill'],
        correctIndex: 1,
        explanation: 'System auto-populates Table 4 of Form GSTR-3B using data computed in GSTR-2B.',
      },
    ],
  },
  {
    id: 'les-10',
    title: '10. Input Tax Credit (ITC) Rules & Eligibility',
    slug: 'itc-eligibility-rules',
    category: 'Input Tax Credit',
    estimatedMinutes: 12,
    summary: 'Detailed examination of Section 16 conditions, 180-day payment rule, Section 17 apportionment, and Rule 42/43 reversals.',
    content: {
      introduction:
        'Input Tax Credit is the backbone of the GST mechanism designed to eliminate the cascading effect ("tax on tax"). Section 16 prescribes four core conditions that must be fulfilled concurrently to claim ITC.',
      keyProvisions: [
        'Four Core Conditions (Section 16(2)): 1) Possession of tax invoice/debit note; 2) Invoice details communicated in GSTR-2B; 3) Goods or services actually received; 4) Tax actually paid to government by supplier and return filed.',
        '180-Day Payment Rule (Second Proviso to Section 16(2)): Recipient must pay the supplier the value of supply along with tax within 180 days from invoice date. If unpaid, ITC must be reversed with interest.',
        'Section 16(4) Limitation: ITC for any FY cannot be claimed after 30th November of subsequent FY or filing of annual return, whichever is earlier.',
        'Apportionment (Section 17(1)/(2)): ITC used partly for business and partly for personal purposes or exempt supplies must be reversed under Rule 42 (inputs) & Rule 43 (capital goods).',
      ],
      practicalExample: {
        title: '180-Day Payment Reversal',
        scenario: 'Invoice dated 1st January for ₹1,00,000 + ₹18,000 GST. As of 30th June (180 days elapsed), recipient has not paid the supplier.',
        breakdown: [
          { step: 'Check Timeline', calculation: '180 days exceeded without payment', note: 'Second proviso to Section 16(2) triggered' },
          { step: 'Action in GSTR-3B', calculation: 'Reverse ₹18,000 ITC in Table 4(B)(2)', note: 'Reversal mandatory' },
          { step: 'Re-claim', calculation: 'Can re-claim ₹18,000 whenever payment is made in future', note: 'No time limit for re-claiming under Section 16(4)' },
        ],
      },
      commonErrors: [
        'Claiming depreciation on the tax component in income tax while simultaneously claiming ITC under GST (strictly prohibited under Section 16(3)).',
        'Failing to reverse ITC when vendor payments remain pending beyond 180 days.',
      ],
    },
    quiz: [
      {
        question: 'Under Section 16(2), within how many days must the recipient pay the supplier to avoid ITC reversal?',
        options: ['30 days', '90 days', '180 days', '365 days'],
        correctIndex: 2,
        explanation: 'The second proviso to Section 16(2) mandates payment to supplier within 180 days from the invoice date.',
      },
      {
        question: 'Can a taxpayer claim both Income Tax depreciation on tax amount AND GST Input Tax Credit?',
        options: ['Yes, allowed', 'No, Section 16(3) strictly prohibits double benefit', 'Only on capital goods', 'Only for small businesses'],
        correctIndex: 1,
        explanation: 'Section 16(3) specifies that if depreciation is claimed on the tax component under Income Tax, no ITC is allowed.',
      },
      {
        question: 'What is the statutory deadline under Section 16(4) for claiming omitted ITC of a financial year?',
        options: ['31st March of same year', '30th November of subsequent financial year or annual return date', '3 years', 'No deadline'],
        correctIndex: 1,
        explanation: 'Section 16(4) establishes 30th November following the end of financial year as the final cutoff.',
      },
      {
        question: 'Which rules govern the reversal of common ITC between taxable and exempt supplies?',
        options: ['Rule 12 & 13', 'Rule 42 (inputs & input services) & Rule 43 (capital goods)', 'Rule 88A & 88B', 'Rule 138'],
        correctIndex: 1,
        explanation: 'Rules 42 and 43 provide the statutory mathematical formulas for apportioning common credit.',
      },
      {
        question: 'If goods are received in installments or lots against an invoice, when can ITC be availed?',
        options: ['Upon receiving first installment', 'Upon receiving the final installment/lot', 'Pro-rata on each lot', 'Before dispatch'],
        correctIndex: 1,
        explanation: 'First proviso to Section 16(2) provides that where goods are received in lots, ITC is available only upon receipt of the last lot.',
      },
    ],
  },
  {
    id: 'les-11',
    title: '11. Reverse Charge Mechanism (RCM)',
    slug: 'reverse-charge-mechanism',
    category: 'Tax Liability',
    estimatedMinutes: 10,
    summary: 'Understand Section 9(3) and 9(4), notified goods & services liable to RCM, payment in cash, and subsequent ITC claim.',
    content: {
      introduction:
        'Normally, the supplier of goods or services pays tax to the government (Forward Charge). Under the Reverse Charge Mechanism (RCM), the recipient of supplies is legally liable to pay GST directly to the government.',
      keyProvisions: [
        'Section 9(3) Notified Services: Goods Transport Agency (GTA) services, Legal services by advocate/firm, Arbitral tribunal services, Sponsorship services, Director services to company, Renting of residential dwelling to registered person.',
        'Payment Strictly in Cash: Tax payable under reverse charge CANNOT be paid by utilizing Input Tax Credit; it must be paid in CASH through Electronic Cash Ledger.',
        'Subsequent ITC: Once RCM tax is paid in cash, the recipient can claim 100% of that tax as Input Tax Credit in the same month (if otherwise eligible).',
        'Self-Invoice: Under Section 31(3)(f), the recipient must issue a self-invoice when receiving supplies from an unregistered person liable to RCM.',
      ],
      practicalExample: {
        title: 'Accounting for Advocate Legal Fees',
        scenario: 'RB Enterprises pays ₹50,000 legal fees to a High Court advocate in Patna for business litigation.',
        breakdown: [
          { step: 'Charge Determination', calculation: 'RCM under Section 9(3)', note: 'Advocate services to business entity are on RCM' },
          { step: 'Tax Payable (18%)', calculation: '₹4,500 CGST + ₹4,500 SGST = ₹9,000', note: 'Must pay in CASH via Table 3.1(d)' },
          { step: 'ITC Claim', calculation: 'Claim ₹9,000 in Table 4(A)(3)', note: 'Full credit claimed in same month 3B' },
        ],
      },
      commonErrors: [
        'Attempting to offset RCM output liability using existing ITC balance in the Credit Ledger.',
        'Forgetting to issue a self-invoice for supplies received from unregistered vendors liable to RCM.',
      ],
    },
    quiz: [
      {
        question: 'Under Reverse Charge Mechanism (RCM), who pays the tax to the government?',
        options: ['Supplier of goods/services', 'Recipient of goods/services', 'E-commerce operator', 'Bank'],
        correctIndex: 1,
        explanation: 'Under RCM defined in Section 2(98), the recipient of supply is liable to pay tax directly to the government.',
      },
      {
        question: 'Can RCM tax liability be paid by utilizing Input Tax Credit from the Electronic Credit Ledger?',
        options: ['Yes, always', 'No, RCM liability must be paid strictly in cash', 'Yes, up to 50%', 'Yes, for intra-state only'],
        correctIndex: 1,
        explanation: 'Section 49(4) clarifies that Credit Ledger can only be used to pay output tax on outward supplies, not inward RCM.',
      },
      {
        question: 'Which of the following services is covered under mandatory RCM under Section 9(3)?',
        options: ['Software SaaS subscription', 'Legal services provided by an advocate to a business entity', 'Air travel booking', 'Hotel room stay'],
        correctIndex: 1,
        explanation: 'Legal services by an advocate or firm of advocates to a business entity are notified under RCM (Notification 13/2017-CT).',
      },
      {
        question: 'When an RCM service is received from an unregistered person, what document must the recipient issue?',
        options: ['Delivery Challan', 'Self-Invoice under Section 31(3)(f) and Payment Voucher under 31(3)(g)', 'Debit Note', 'Credit Note'],
        correctIndex: 1,
        explanation: 'Under Section 31(3)(f), a registered recipient receiving RCM supplies from unregistered supplier must issue an invoice.',
      },
      {
        question: 'Can the recipient claim Input Tax Credit of the tax paid under RCM?',
        options: ['No, never', 'Yes, in the same tax period if the expense is for business purposes', 'Only after 1 year', 'Only 50%'],
        correctIndex: 1,
        explanation: 'Tax paid under RCM is fully available as ITC under Table 4(A)(3) of Form GSTR-3B subject to general eligibility rules.',
      },
    ],
  },
  {
    id: 'les-12',
    title: '12. GST Payments, Ledgers & PMT-06 Challans',
    slug: 'payments-ledgers-pmt-06',
    category: 'Payments',
    estimatedMinutes: 10,
    summary: 'Master Electronic Cash Ledger, Credit Ledger, Liability Register, CPIN, CIN, and challan payment processes.',
    content: {
      introduction:
        'The GST accounting framework is maintained through three statutory digital ledgers on the portal: Electronic Cash Ledger, Electronic Credit Ledger, and Electronic Liability Register.',
      keyProvisions: [
        'Electronic Cash Ledger (Section 49(1)): Contains deposits made via Net Banking, OTC, NEFT/RTGS. Subdivided into 4 Major Heads (IGST, CGST, SGST, Cess) and 5 Minor Heads (Tax, Interest, Penalty, Fee, Other).',
        'Form PMT-09: Allows cross-utilization and transfer of funds between major and minor heads within the cash ledger.',
        'CPIN (Common Portal Identification Number): 14-digit number generated when a PMT-06 challan is created (valid for 15 days).',
        'CIN (Challan Identification Number): 17-digit number generated by the authorized bank upon successful receipt of payment.',
        'Electronic Credit Ledger (Section 49(2)): Records eligible ITC availed through returns.',
      ],
      practicalExample: {
        title: 'Challan Payment Workflow',
        scenario: 'Taxpayer has net shortfall of ₹15,000 CGST and ₹15,000 SGST in GSTR-3B.',
        breakdown: [
          { step: 'Generate Challan', calculation: 'Create Form PMT-06 for ₹30,000 total', note: '14-digit CPIN generated' },
          { step: 'Make Payment', calculation: 'Authorize via SBI Corporate Net Banking', note: 'Bank returns 17-digit CIN' },
          { step: 'Ledger Update', calculation: 'Cash Ledger credited instantly', note: 'Taxpayer offsets liability in 3B' },
        ],
      },
      commonErrors: [
        'Depositing money under the wrong head (e.g. depositing under Penalty instead of Tax). Note: Form PMT-09 can fix this.',
        'Assuming CPIN means payment is complete (CIN is required for actual credit).',
      ],
    },
    quiz: [
      {
        question: 'How many digits are there in a Common Portal Identification Number (CPIN)?',
        options: ['10', '14', '15', '17'],
        correctIndex: 1,
        explanation: 'A CPIN generated for a GST payment challan is 14 digits long.',
      },
      {
        question: 'For how many days is a generated PMT-06 payment challan valid?',
        options: ['7 days', '15 days', '30 days', '90 days'],
        correctIndex: 1,
        explanation: 'A GST challan (CPIN) remains valid for payment for 15 days from the date of generation.',
      },
      {
        question: 'Which form is used to transfer wrongly deposited amounts between major and minor heads in the Cash Ledger?',
        options: ['Form GST PMT-05', 'Form GST PMT-06', 'Form GST PMT-09', 'Form GST DRC-03'],
        correctIndex: 2,
        explanation: 'Form GST PMT-09 is filed to shift funds across major and minor heads within the Electronic Cash Ledger.',
      },
      {
        question: 'What is generated by the bank confirming receipt of payment for a GST challan?',
        options: ['CPIN', 'CIN (Challan Identification Number - 17 digits)', 'ARN', 'DIN'],
        correctIndex: 1,
        explanation: 'The bank generates a 17-digit Challan Identification Number (CIN) confirming successful remittance.',
      },
      {
        question: 'What is the maximum limit per challan for cash/cheque deposit Over The Counter (OTC) in a bank?',
        options: ['₹5,000', '₹10,000 per tax period', '₹25,000', '₹50,000'],
        correctIndex: 1,
        explanation: 'Under Rule 87(4), over-the-counter payments are restricted to a maximum of ₹10,000 per challan per tax period.',
      },
    ],
  },
  {
    id: 'les-13',
    title: '13. GST Refunds: Form RFD-01 & Statutory Grounds',
    slug: 'gst-refunds-rfd-01',
    category: 'Refunds',
    estimatedMinutes: 10,
    summary: 'Study Section 54 refund mechanisms, inverted duty structure, export without tax payment (LUT), and deficiency memos.',
    content: {
      introduction:
        'Taxpayers are entitled to claim refund of unutilized Input Tax Credit or excess tax paid under Section 54 through Form GST RFD-01 within 2 years from the relevant date.',
      keyProvisions: [
        'Statutory Refund Grounds: 1) Zero-rated supplies (exports) under LUT without tax payment; 2) Inverted Duty Structure (tax on inputs higher than tax on output supplies); 3) Excess balance in Cash Ledger; 4) Tax paid on intra-state supply later held as inter-state.',
        'Two-Year Limitation: Application must be filed within 2 years from the "relevant date" (e.g. date of export shipping bill, or date of filing return).',
        'Form RFD-02 (Acknowledgement) vs RFD-03 (Deficiency Memo): Officer issues acknowledgement within 15 days or deficiency memo requiring fresh application.',
        'Provisional Refund: 90% of export refund is sanctioned provisionally within 7 days under Section 54(6).',
      ],
      practicalExample: {
        title: 'Inverted Duty Structure Example',
        scenario: 'Manufacturer purchases chemical raw materials at 18% GST and sells final fertilizer at 5% GST.',
        breakdown: [
          { step: 'Accumulation', calculation: 'Input rate (18%) > Output rate (5%)', note: 'ITC accumulates permanently in Credit Ledger' },
          { step: 'Eligibility', calculation: 'Eligible for refund under Section 54(3)(ii)', note: 'Inverted duty structure ground' },
          { step: 'Formula Applied', calculation: 'Maximum Refund Formula under Rule 89(5)', note: 'Proportionate net ITC minus output tax' },
        ],
      },
      commonErrors: [
        'Filing refund applications after the 2-year limitation period.',
        'Claiming refund of input services or capital goods under Inverted Duty Structure (Rule 89(5) restricts to inputs only).',
      ],
    },
    quiz: [
      {
        question: 'What is the time limit for filing a GST refund application from the relevant date under Section 54?',
        options: ['6 months', '1 year', '2 years', '3 years'],
        correctIndex: 2,
        explanation: 'Section 54(1) establishes a limitation period of 2 years from the relevant date.',
      },
      {
        question: 'What is an "Inverted Duty Structure"?',
        options: [
          'When tax rate on output supplies is higher than inputs',
          'When tax rate on inputs is higher than the tax rate on output supplies',
          'When taxes are cancelled',
          'When importing from inverted countries',
        ],
        correctIndex: 1,
        explanation: 'Inverted duty structure occurs where the credit has accumulated on account of rate of tax on inputs being higher than rate of tax on output supplies.',
      },
      {
        question: 'What percentage of refund is sanctioned provisionally within 7 days for export claims under Section 54(6)?',
        options: ['50%', '75%', '90%', '100%'],
        correctIndex: 2,
        explanation: 'Section 54(6) mandates sanction of 90% of the total amount provisionally within 7 days.',
      },
      {
        question: 'Which form is issued by the tax officer when a refund application has discrepancies or missing documents?',
        options: ['Form GST RFD-01', 'Form GST RFD-02', 'Form GST RFD-03 (Deficiency Memo)', 'Form GST RFD-06'],
        correctIndex: 2,
        explanation: 'Form GST RFD-03 is a Deficiency Memo pointing out omissions; taxpayer must file a fresh refund application.',
      },
      {
        question: 'Which form is used by taxpayers to apply for GST refund on the portal?',
        options: ['Form GST RFD-01', 'Form GST REG-01', 'Form GST PMT-06', 'Form GST RET-01'],
        correctIndex: 0,
        explanation: 'Form GST RFD-01 is the standard digital application form for all GST refunds.',
      },
    ],
  },
  {
    id: 'les-14',
    title: '14. ITC Reconciliation: Books vs GSTR-2B',
    slug: 'itc-reconciliation-mastery',
    category: 'Reconciliation',
    estimatedMinutes: 12,
    summary: 'Master the end-to-end reconciliation workflow, variance types, vendor communication, and year-end audit matching.',
    content: {
      introduction:
        'ITC reconciliation is the vital internal control process of comparing inward supply invoices recorded in accounting books (Tally, SAP, Busy, ERP) against the GSTR-2B statement generated by the GST portal.',
      keyProvisions: [
        'Reconciliation Statuses: 1) Matched (all attributes match); 2) Partially Matched (slight amount/tax head variation); 3) Missing in 2B (supplier hasn\'t filed); 4) Missing in Books (unaccounted invoice); 5) Mismatch (GSTIN or date errors).',
        'Statutory Risk: Under Section 16(2)(aa), claiming unreflected ITC invites automated notices under Rule 88D (Form DRC-01C).',
        'Vendor Follow-Up System: Tagging defaulting suppliers and holding back payment until invoices reflect in GSTR-2B.',
        'Year-End Cutoff: Final matching before 30th November cutoff of subsequent financial year.',
      ],
      practicalExample: {
        title: 'Reconciling Vendor Invoice Discrepancy',
        scenario: 'Books record ₹1,00,000 + 18% GST (₹18,000). GSTR-2B shows ₹90,000 + 18% GST (₹16,200).',
        breakdown: [
          { step: 'Identification', calculation: 'Partial Match (₹10,000 taxable variance)', note: 'Supplier under-reported in GSTR-1' },
          { step: 'Current Action', calculation: 'Claim ONLY ₹16,200 in current month 3B', note: 'Never claim above 2B value' },
          { step: 'Rectification', calculation: 'Ask supplier to amend Table 9A in next GSTR-1', note: 'Claim balance ₹1,800 once amended' },
        ],
      },
      commonErrors: [
        'Filing GSTR-3B without executing monthly reconciliation against GSTR-2B.',
        'Claiming ITC on missing invoices assuming supplier will file later.',
      ],
    },
    quiz: [
      {
        question: 'If books show ₹20,000 ITC but GSTR-2B shows ₹18,000 for an invoice, how much ITC can be claimed in GSTR-3B?',
        options: ['₹20,000 as per books', '₹18,000 as per GSTR-2B', '₹2,000', 'Average of both'],
        correctIndex: 1,
        explanation: 'Under Section 16(2)(aa), you cannot claim more than what is reflected in GSTR-2B; claim ₹18,000 and ask vendor to amend.',
      },
      {
        question: 'What automated notice is issued by the portal if ITC in GSTR-3B exceeds GSTR-2B by prescribed percentage?',
        options: ['Form GST DRC-01A', 'Form GST DRC-01B', 'Form GST DRC-01C (Rule 88D)', 'Form GST ASMT-10'],
        correctIndex: 2,
        explanation: 'Form DRC-01C is the automated statutory intimation issued under Rule 88D for excess ITC claimed.',
      },
      {
        question: 'What is the primary cause of an invoice being "Missing in GSTR-2B"?',
        options: [
          'The buyer forgot to pay',
          'The supplier failed to file their GSTR-1 or filed with wrong recipient GSTIN',
          'GST portal was down',
          'Goods were delivered late',
        ],
        correctIndex: 1,
        explanation: 'An invoice is missing in 2B when the supplier has not filed GSTR-1 or uploaded it under an incorrect GSTIN.',
      },
      {
        question: 'When should monthly ITC reconciliation ideally be performed?',
        options: [
          'On the 1st of the month',
          'Between the 14th (when 2B is generated) and the 20th (when 3B is filed)',
          'At the end of the year only',
          'Whenever the auditor visits',
        ],
        correctIndex: 1,
        explanation: 'The ideal window is between the 14th of the month (2B generation) and the 20th (GSTR-3B filing due date).',
      },
      {
        question: 'If an invoice in GSTR-2B has an incorrect invoice number in books (e.g. INV-101 vs INV/101), what is the status?',
        options: ['Totally invalid', 'Partially Matched / Format Difference (can be matched and claimed)', 'Cannot claim ITC', 'Must pay fine'],
        correctIndex: 1,
        explanation: 'Trivial formatting differences can be reconciled as matched since the transaction and tax amounts are identical.',
      },
    ],
  },
  {
    id: 'les-15',
    title: '15. GST Notices, Scrutiny (ASMT-10) & DRC-01B/C',
    slug: 'gst-notices-scrutiny-rules',
    category: 'Notices',
    estimatedMinutes: 12,
    summary: 'Analyze automated notices DRC-01B, DRC-01C, return scrutiny under Section 61 (ASMT-10), and reply drafting procedures.',
    content: {
      introduction:
        'With automated risk analysis, the GST portal generates algorithmic intimations and notices for return discrepancies, tax shortfalls, and unverified credits.',
      keyProvisions: [
        'DRC-01B (Rule 88C): Issued when tax liability declared in GSTR-1 exceeds liability paid in GSTR-3B by more than 10% and ₹25,000. 7 days to pay or reply.',
        'DRC-01C (Rule 88D): Issued when ITC claimed in GSTR-3B exceeds GSTR-2B by more than 10% and ₹25,000. 7 days to pay back with interest or submit explanation.',
        'ASMT-10 (Section 61): Notice for scrutiny of returns issued by the proper officer pointing out specific discrepancies. 30 days to respond in Form ASMT-11.',
        'GSTR-3A: Notice issued to return defaulters who failed to furnish GSTR-1 or GSTR-3B within 15 days of due date.',
        'Consequence of Non-Compliance: Blocking of subsequent GSTR-1 filing, bank attachment, or best judgment assessment under Section 62.',
      ],
      practicalExample: {
        title: 'Responding to DRC-01B Notice',
        scenario: 'Taxpayer reported ₹2,00,000 in GSTR-1 but only paid ₹1,50,000 in GSTR-3B due to a clerical typo.',
        breakdown: [
          { step: 'Notice Received', calculation: 'Form DRC-01B Part A received with ₹50,000 variance', note: '7-day statutory clock begins' },
          { step: 'Evaluation', calculation: 'Difference of ₹50,000 is genuinely payable', note: 'Typo in 3B identified' },
          { step: 'Action Taken', calculation: 'Pay ₹50,000 + interest via Form DRC-03 and enter ARN in Part B reply', note: 'Notice successfully closed' },
        ],
      },
      commonErrors: [
        'Ignoring automated DRC-01B/C notices (results in immediate blocking of subsequent period GSTR-1).',
        'Paying differential tax without interest when replying to DRC-01C.',
      ],
    },
    quiz: [
      {
        question: 'Within how many days must a taxpayer respond to an automated notice in Form DRC-01B or DRC-01C?',
        options: ['3 days', '7 days', '30 days', '60 days'],
        correctIndex: 1,
        explanation: 'Both Rule 88C and Rule 88D give the taxpayer exactly 7 days to either pay the amount or submit an explanation.',
      },
      {
        question: 'Which form is used to reply to a return scrutiny notice issued in Form ASMT-10?',
        options: ['Form GST ASMT-11', 'Form GST DRC-03', 'Form GST RFD-01', 'Form GST REG-17'],
        correctIndex: 0,
        explanation: 'Under Rule 99(2), the reply to a scrutiny notice Form ASMT-10 is submitted in Form GST ASMT-11.',
      },
      {
        question: 'What happens if a taxpayer fails to respond or pay under DRC-01B within 7 days?',
        options: [
          'Nothing happens',
          'Filing of subsequent period GSTR-1 is blocked under Rule 59(6)',
          'Immediate police arrest',
          'Turnover is reduced',
        ],
        correctIndex: 1,
        explanation: 'Rule 59(6) automatically blocks the generation or filing of subsequent GSTR-1 if DRC-01B is unresolved.',
      },
      {
        question: 'Which form is used for voluntary or notice-based payment of tax dues outside regular return filing?',
        options: ['Form GST DRC-03', 'Form GST REG-06', 'Form GST RET-01', 'Form GST CMP-08'],
        correctIndex: 0,
        explanation: 'Form GST DRC-03 is the official electronic form used for voluntary payments or payments against notices.',
      },
      {
        question: 'Notice in Form GSTR-3A is issued for which default?',
        options: ['Wrong GSTIN', 'Failure to furnish returns (GSTR-1, GSTR-3B) by due date', 'Delay in E-way bill', 'Excess refund claim'],
        correctIndex: 1,
        explanation: 'Section 46 read with Rule 68 provides for issuing notice in Form GSTR-3A to a return defaulter.',
      },
    ],
  },
];
