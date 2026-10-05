import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { PracticeScenario } from '../../types/gst';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Send,
  Award,
} from 'lucide-react';

export const PracticeLabView: React.FC = () => {
  const { practiceScenarios, scenarioResults, submitScenarioEvaluation, setActiveTab } =
    useGstPortal();

  const [selectedScenario, setSelectedScenario] = useState<PracticeScenario>(practiceScenarios[0]);
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({
    totalTaxable: '585000',
    totalIgst: '77400',
    totalCgst: '11625',
    totalSgst: '11625',
  });
  const [evalResult, setEvalResult] = useState<{
    passed: boolean;
    score: number;
    breakdown: any;
  } | null>(null);

  const handleSelectScenario = (scen: PracticeScenario) => {
    setSelectedScenario(scen);
    setEvalResult(null);

    // Initialize inputs with empty/default
    if (scen.id === 'scen-1') {
      setUserInputs({
        totalTaxable: '585000',
        totalIgst: '77400',
        totalCgst: '11625',
        totalSgst: '11625',
      });
    } else if (scen.id === 'scen-2') {
      setUserInputs({
        eligibleIgst: '88200',
        eligibleCgst: '7875',
        eligibleSgst: '7875',
        ineligibleCgst17_5: '112000',
        ineligibleSgst17_5: '112000',
      });
    } else if (scen.id === 'scen-3') {
      setUserInputs({
        igstPaidFromIgst: '77400',
        cashIgstPaid: '0',
        cashCgstPaid: '0',
        cashSgstPaid: '0',
      });
    } else {
      setUserInputs({
        action: 'Submit Explanation with Reconciliation',
      });
    }
  };

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = submitScenarioEvaluation(selectedScenario.id, userInputs);
    setEvalResult(result);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                GST Practice Mode &amp; Accounting Scenarios
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <FileCheck2 className="w-3.5 h-3.5" />
                Hands-on Lab
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Solve real-life GST accounting tasks. Submit your values for automatic evaluation against expected statutory answers.
            </p>
          </div>
        </div>

        {/* Scenarios Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-100">
          {practiceScenarios.map((scen) => {
            const hasCompleted = scenarioResults[scen.id]?.completed;
            const score = scenarioResults[scen.id]?.score;

            return (
              <button
                key={scen.id}
                onClick={() => handleSelectScenario(scen)}
                className={`text-left p-3 rounded-xl border transition flex flex-col justify-between ${
                  selectedScenario.id === scen.id
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold uppercase mb-1">
                    <span>{scen.category}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        scen.difficulty === 'Beginner'
                          ? 'bg-blue-100 text-blue-700'
                          : scen.difficulty === 'Intermediate'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {scen.difficulty}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-slate-900 line-clamp-2">
                    {scen.title}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  {hasCompleted ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Score: {score}%
                    </span>
                  ) : (
                    <span className="text-slate-400">Not Attempted</span>
                  )}
                  <span className="text-blue-600 font-semibold text-xs">&rarr;</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scenario Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Brief & Tasks */}
        <div className="lg:col-span-6 bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 text-xs">
          <div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
              {selectedScenario.category} Scenario
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">
              {selectedScenario.title}
            </h3>
            <p className="text-slate-600 leading-relaxed mt-2 text-xs">
              {selectedScenario.description}
            </p>
          </div>

          {/* Tasks Checklist */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              <span>Assignment Tasks Checklist:</span>
            </div>
            <ul className="space-y-1.5 text-slate-700">
              {selectedScenario.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Explanation Notes */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-950 text-[11px] leading-relaxed">
            <strong className="font-bold">Statutory Rule Insight:</strong> {selectedScenario.explanationNotes}
          </div>
        </div>

        {/* Right Column: User Input & Live Grading Engine */}
        <div className="lg:col-span-6 bg-white rounded-xl shadow-xs border border-slate-200 p-5 space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Your Computed Answers</h3>
            <span className="text-slate-400 text-[11px]">Fill numbers &amp; test answers</span>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-3">
            {Object.keys(selectedScenario.expectedAnswers).map((key) => (
              <div key={key}>
                <label className="block text-slate-700 font-semibold mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="text"
                  value={userInputs[key] || ''}
                  onChange={(e) => setUserInputs({ ...userInputs, [key]: e.target.value })}
                  placeholder={`Enter computed ${key}`}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono font-bold text-xs"
                  required
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#1E40AF] hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow-sm text-xs flex items-center justify-center gap-2 transition"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Submit &amp; Evaluate Answers</span>
            </button>
          </form>

          {/* Evaluation Results Box */}
          {evalResult && (
            <div
              className={`p-4 rounded-xl border space-y-3 animate-in fade-in ${
                evalResult.passed ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {evalResult.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600" />
                  )}
                  <span className="font-bold text-sm text-slate-900">
                    {evalResult.passed ? 'Scenario Completed Successfully!' : 'Discrepancies Detected'}
                  </span>
                </div>
                <span
                  className={`font-mono font-extrabold text-sm px-2 py-0.5 rounded ${
                    evalResult.passed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                  }`}
                >
                  Score: {evalResult.score}%
                </span>
              </div>

              {/* Breakdown Table */}
              <div className="bg-white rounded-lg p-3 border border-slate-200 font-mono text-[11px] space-y-1.5">
                {Object.keys(evalResult.breakdown).map((k) => {
                  const b = evalResult.breakdown[k];
                  const isOk = b.status === 'Correct';
                  return (
                    <div key={k} className="flex items-center justify-between py-0.5 border-b border-slate-100 last:border-0">
                      <span className="text-slate-600 font-sans capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700">You: {b.user}</span>
                        <span className="text-slate-400">| Exp: {b.expected}</span>
                        <span
                          className={`px-1.5 py-0.2 rounded font-sans text-[10px] font-bold ${
                            isOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-700 leading-relaxed">
                {selectedScenario.explanationNotes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
