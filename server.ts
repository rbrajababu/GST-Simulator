import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Shared Gemini client on server
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // AI GST Tutor API endpoint
  app.post('/api/tutor/chat', async (req, res) => {
    try {
      const { message, context } = req.body;
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required' });
        return;
      }

      const systemInstruction = `You are the AI GST Tutor for the "GST Practice Portal – Learn & Practice GST" simulator.
Your role is to educate students, accountants, and GST practitioners on Indian Goods and Services Tax (GST) concepts, return filing (GSTR-1, GSTR-3B, GSTR-2B, CMP-08), ITC reconciliation, tax calculations, ledger accounting, and portal procedures in a safe educational simulator environment.

CRITICAL INSTRUCTIONS:
1. Always start or end with a brief disclaimer: "Educational simulator guidance only – Not official tax advice."
2. Provide clear, step-by-step explanations with exact GST rules, relevant sections (e.g. CGST Act Section 16, 17(5), 49, 50, Rule 88A, Rule 88C, Rule 88D), and practical numerical examples where appropriate.
3. Be encouraging, precise, and directly address the user's question.
4. If asked about portal tables, explain the exact table numbers (e.g., Table 4A of GSTR-1 for B2B invoices, Table 3.1 of GSTR-3B for outward supplies).
5. If the user provides a scenario or numbers, verify their calculations (Taxable value, IGST, CGST, SGST, set-off order).`;

      if (ai) {
        try {
          const contents = context
            ? `User Context / Current Module: ${context}\n\nUser Question: ${message}`
            : message;

          const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: contents,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });

          const text = response.text || 'I could not generate an answer right now. Please try again.';
          res.json({ reply: text, source: 'gemini' });
          return;
        } catch (apiError) {
          console.error('Gemini API call failed, falling back to knowledge base:', apiError);
        }
      }

      // Fallback knowledge response if no API key or API call failed
      const fallbackReply = generateFallbackGSTReply(message);
      res.json({ reply: fallbackReply, source: 'simulator-knowledge-base' });
    } catch (err: any) {
      console.error('Server error in /api/tutor/chat:', err);
      res.status(500).json({ error: 'Internal server error', details: err.message });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', simulator: true, timestamp: new Date().toISOString() });
  });

  // Mount Vite middleware in development or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`GST Simulator Server running at http://0.0.0.0:${port}`);
  });
}

function generateFallbackGSTReply(query: string): string {
  const q = query.toLowerCase();
  let topic = '';

  if (q.includes('gstr-1') || q.includes('gstr1') || q.includes('table 4') || q.includes('table 7')) {
    topic = `### GSTR-1 Overview & Table Rules:
- **Table 4A, 4B, 4C**: B2B Supplies (Invoices issued to registered taxable persons). Must report recipient GSTIN, Invoice No, Date, POS, Rate, and Taxable Value.
- **Table 5A, 5B**: B2C Large Supplies (Inter-State supplies to unregistered persons where invoice value > ₹2.5 Lakhs).
- **Table 7**: B2C Small Supplies (Intra-state supplies to unregistered persons, and inter-state supplies with invoice value ≤ ₹2.5 Lakhs) - reported consolidated rate-wise.
- **Table 9B**: Credit and Debit Notes issued to registered and unregistered persons.
- **Table 12**: HSN-wise summary of outward supplies (mandatory 4-digit for turnover up to ₹5 Cr, 6-digit above ₹5 Cr).
- **Table 13**: Documents issued summary (Serial numbers of invoices, revised invoices, credit/debit notes).`;
  } else if (q.includes('gstr-3b') || q.includes('gstr3b') || q.includes('offset') || q.includes('set-off') || q.includes('rule 88a')) {
    topic = `### GSTR-3B & Rule 88A Credit Set-off Order:
Under Section 49 & Rule 88A:
1. **IGST Credit Utilization**: Must be fully exhausted first before using CGST or SGST credit! It can be set off against IGST liability first, and the remaining IGST credit can be utilized towards CGST and SGST liabilities in ANY proportion or order.
2. **CGST Credit Utilization**: Set off against CGST liability first, then any remaining against IGST liability. Cross-utilization with SGST is **STRICTLY PROHIBITED**.
3. **SGST Credit Utilization**: Set off against SGST liability first, then any remaining against IGST liability. Cross-utilization with CGST is **STRICTLY PROHIBITED**.
4. Balance liability must be discharged in cash through the Electronic Cash Ledger via Form PMT-06 challan.`;
  } else if (q.includes('gstr-2b') || q.includes('gstr2b') || q.includes('reconciliation') || q.includes('itc')) {
    topic = `### GSTR-2B & ITC Reconciliation Guidelines:
- **GSTR-2B** is a static, auto-drafted statement generated on the 14th of every month based on supplier GSTR-1/IFF filings.
- **Matching Criteria**: Compare Purchase Register (Books) vs GSTR-2B on:
  1. Supplier GSTIN
  2. Invoice Number (handle prefixes like INV- or /24-25)
  3. Invoice Date (Financial Year)
  4. Taxable Value & Tax amounts (CGST, SGST, IGST)
- **Status Types**:
  - **Matched**: In both Books and 2B with matching amounts -> Eligible to claim in GSTR-3B Table 4(A)(5).
  - **Missing in 2B**: In Books but supplier hasn't filed GSTR-1 -> Cannot be claimed in 3B until it reflects in 2B (Section 16(2)(aa)).
  - **Mismatch**: Rate or tax head difference -> Requires verification with supplier.`;
  } else if (q.includes('17(5)') || q.includes('blocked') || q.includes('ineligible')) {
    topic = `### Ineligible ITC under Section 17(5) (Blocked Credits):
Input Tax Credit cannot be claimed on:
1. Motor vehicles for transportation of persons having approved seating capacity ≤ 13 persons (with exceptions like driving schools, passenger transport business, further supply).
2. Food, beverages, outdoor catering, beauty treatment, health services, cosmetic & plastic surgery (unless used as inward supply of same category).
3. Membership of a club, health, and fitness centre.
4. Travel benefits extended to employees on vacation (leave travel concession).
5. Works contract services for construction of an immovable property (except plant & machinery or where input for further works contract).
6. Goods or services used for personal consumption, or goods lost, stolen, destroyed, written off, or disposed of by way of gift or free samples.`;
  } else if (q.includes('notice') || q.includes('drc-01b') || q.includes('drc-01c') || q.includes('asmt-10')) {
    topic = `### Statutory Notices in GST:
- **DRC-01B (Rule 88C)**: Intimation of difference in liability reported in GSTR-1 vs paid in GSTR-3B exceeding prescribed threshold. Taxpayer must either pay differential liability through DRC-03 or submit an explanation within 7 days.
- **DRC-01C (Rule 88D)**: Intimation of difference in ITC availed in GSTR-3B exceeding ITC available in GSTR-2B by prescribed percentage. Taxpayer must pay back excess ITC with interest or explain reasons within 7 days.
- **ASMT-10**: Scrutiny notice pointing out discrepancies in filed returns with 30 days time to respond.
- **GSTR-3A**: Notice issued to return defaulters who failed to furnish GSTR-1 or GSTR-3B by due date.`;
  } else {
    topic = `### Indian GST Practice Essentials:
- **Dual GST Model**: Intra-State supplies attract CGST (Central) + SGST (State). Inter-State supplies attract IGST (Integrated).
- **Reverse Charge Mechanism (RCM)**: Recipient pays tax directly to the government instead of supplier (e.g. GTA services, legal services by advocate, sponsorship).
- **Late Fee (Section 47)**: Normal returns attract ₹50/day (₹25 CGST + ₹25 SGST) up to maximum ₹10,000; Nil returns attract ₹20/day up to maximum ₹500.
- **Interest (Section 50)**: 18% per annum calculated on net cash tax liability delayed beyond the statutory due date (20th of subsequent month).`;
  }

  return `*(Educational Simulator Guidance – Not official tax advice)*\n\n${topic}\n\n**Tip:** You can practice entering this scenario directly in the **Returns Practice** or **Practice Scenarios** tabs in the simulator!`;
}

startServer();
