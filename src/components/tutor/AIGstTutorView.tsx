import React, { useState, useRef, useEffect } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import {
  Sparkles,
  Send,
  User,
  Bot,
  HelpCircle,
  Lightbulb,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  source?: string;
}

export const AIGstTutorView: React.FC = () => {
  const { currentPeriod, activeCompany } = useGstPortal();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'tutor',
      text: `Hello! I am your AI GST Learning Assistant. I can help you understand Indian Goods and Services Tax concepts, return filing tables (GSTR-1, GSTR-3B, GSTR-2B), Rule 88A credit set-off order, Section 17(5) blocked credits, interest calculations, or practice scenario calculations.\n\n*(Educational simulator guidance only – Not official tax advice)*`,
      timestamp: 'Just now',
      source: 'simulator',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Explain difference between GSTR-1 Table 4A and Table 7',
    'How does GST credit set-off order work under Rule 88A?',
    'What items are blocked under Section 17(5)?',
    'How is interest calculated under Section 50 on net cash tax?',
    'Explain DRC-01B and DRC-01C mismatch notices',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: `Active Company: ${activeCompany.tradeName} (${activeCompany.gstin}) in ${activeCompany.state}. Return Period: ${currentPeriod}.`,
        }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: data.reply || 'I am ready to help with your GST questions.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err) {
      console.error('Tutor chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: `*(Educational Simulator Guidance)*\n\nUnder Indian GST, please check that:\n1. Intra-state sales are charged to CGST + SGST equally.\n2. Inter-state sales are charged to IGST.\n3. Rule 88A mandates IGST credit must be fully exhausted first before using CGST or SGST.\n4. Section 16(2)(aa) requires invoice appearance in GSTR-2B before claiming ITC.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge-base',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                AI GST Learning Tutor
              </h2>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Interactive Assistant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ask statutory questions, verify return calculations, clarify table rules, and get instant explanations.
            </p>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 'msg-welcome',
                  sender: 'tutor',
                  text: `Chat cleared. How can I help you learn GST today?`,
                  timestamp: 'Just now',
                },
              ])
            }
            className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 border border-slate-200 px-2.5 py-1 rounded"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Chat
          </button>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 flex flex-col h-[580px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[85%] ${
                m.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-xs'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-4 space-y-1.5 leading-relaxed text-xs shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.text}</div>
                <div
                  className={`text-[10px] flex items-center justify-between gap-3 pt-1 ${
                    m.sender === 'user' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {m.source && <span className="font-mono text-[9px] uppercase">{m.source}</span>}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 mr-auto max-w-[85%] items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-slate-500 text-xs italic">
                AI GST Tutor is analyzing statutory rules &amp; formulas...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex overflow-x-auto gap-2 scrollbar-none text-[11px]">
          <span className="text-slate-400 font-semibold shrink-0 py-1 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            Suggested:
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p)}
              className="bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 px-2.5 py-1 rounded-full whitespace-nowrap transition"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Query Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about GSTR tables, Rule 88A set-off, Section 17(5), or tax calculations..."
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask Tutor</span>
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center mt-1.5">
            AI responses are for educational training and practice only. Not official tax or legal advice.
          </div>
        </div>
      </div>
    </div>
  );
};
