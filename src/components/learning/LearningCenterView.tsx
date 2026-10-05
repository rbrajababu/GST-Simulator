import React, { useState } from 'react';
import { useGstPortal } from '../../context/GstPortalContext';
import { ALL_LEARNING_LESSONS } from '../../data/learningLessons';
import { LearningLesson } from '../../types/gst';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  Info,
  Clock,
} from 'lucide-react';

export const LearningCenterView: React.FC = () => {
  const { quizScores, recordQuizScore } = useGstPortal();

  const [selectedLesson, setSelectedLesson] = useState<LearningLesson>(ALL_LEARNING_LESSONS[0]);
  const [activeLessonTab, setActiveLessonTab] = useState<'learn' | 'example' | 'quiz'>('learn');

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectLesson = (lesson: LearningLesson) => {
    setSelectedLesson(lesson);
    setActiveLessonTab('learn');
    setCurrentQuizIndex(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectOption = (optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentQuizIndex]: optIdx });
  };

  const handleFinishQuiz = () => {
    setQuizSubmitted(true);
    let correct = 0;
    selectedLesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / selectedLesson.quiz.length) * 100);
    recordQuizScore(selectedLesson.id, finalScore);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                GST Educational Learning Center
              </h2>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5" />
                15 Complete Modules
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured curriculum: Learn &rarr; Practical Example &rarr; Practice Checkpoint &rarr; 5-Question Quiz &rarr; Score.
            </p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-5 pt-4 border-t border-slate-100 text-xs">
          {ALL_LEARNING_LESSONS.map((les) => {
            const isSelected = selectedLesson.id === les.id;
            const score = quizScores[les.id];

            return (
              <button
                key={les.id}
                onClick={() => handleSelectLesson(les)}
                className={`text-left p-2.5 rounded-lg border transition flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 font-bold text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="line-clamp-1">{les.title}</div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 font-normal">
                  <span>{les.estimatedMinutes} mins</span>
                  {score !== undefined ? (
                    <span className="text-emerald-700 font-bold">{score}% Score</span>
                  ) : (
                    <span>Not taken</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson Reader Workspace */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-200 overflow-hidden">
        {/* Sub-tabs: Learn / Example / Quiz */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setActiveLessonTab('learn')}
            className={`px-5 py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeLessonTab === 'learn'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Concept &amp; Statutory Provisions</span>
          </button>
          <button
            onClick={() => setActiveLessonTab('example')}
            className={`px-5 py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeLessonTab === 'example'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>2. Practical Numerical Example</span>
          </button>
          <button
            onClick={() => setActiveLessonTab('quiz')}
            className={`px-5 py-3 border-b-2 transition flex items-center gap-1.5 ${
              activeLessonTab === 'quiz'
                ? 'border-blue-600 text-blue-900 bg-white font-bold'
                : 'border-transparent text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>3. 5-Question Quiz ({selectedLesson.quiz.length} Questions)</span>
          </button>
        </div>

        {/* TAB 1: Concept & Provisions */}
        {activeLessonTab === 'learn' && (
          <div className="p-6 space-y-5 text-xs leading-relaxed text-slate-700">
            <div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                {selectedLesson.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-2">{selectedLesson.title}</h3>
              <p className="text-slate-600 mt-1 text-xs">{selectedLesson.summary}</p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">Statutory Context &amp; Legal Framework</h4>
              <p className="text-slate-700 text-xs leading-relaxed">
                {selectedLesson.content.introduction}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-xs">Key Provisions &amp; Act Sections</h4>
              <div className="space-y-1.5">
                {selectedLesson.content.keyProvisions.map((prov, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50/60 rounded border border-slate-100">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-slate-800 font-medium">{prov}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedLesson.content.commonErrors && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-rose-950">
                <h4 className="font-bold text-xs flex items-center gap-1.5 text-rose-900">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Frequent Practitioner Mistakes &amp; Audit Pitfalls</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-900">
                  {selectedLesson.content.commonErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setActiveLessonTab('example')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <span>Continue to Practical Example</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Practical Numerical Example */}
        {activeLessonTab === 'example' && (
          <div className="p-6 space-y-5 text-xs text-slate-700">
            <div>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase">
                Hands-On Demonstration
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                {selectedLesson.content.practicalExample.title}
              </h3>
              <p className="text-slate-600 mt-1 text-xs">
                {selectedLesson.content.practicalExample.scenario}
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
              {selectedLesson.content.practicalExample.breakdown.map((step, idx) => (
                <div key={idx} className="p-4 hover:bg-slate-50 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  <div className="md:col-span-4 font-bold text-slate-900 text-xs flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step.step}</span>
                  </div>
                  <div className="md:col-span-4 font-mono font-bold text-blue-900 bg-blue-50/70 p-2 rounded text-xs">
                    {step.calculation}
                  </div>
                  <div className="md:col-span-4 text-slate-500 text-[11px] italic">
                    {step.note}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-3">
              <button
                onClick={() => setActiveLessonTab('learn')}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                &larr; Back to Theory
              </button>
              <button
                onClick={() => setActiveLessonTab('quiz')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition"
              >
                <span>Take Lesson Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Quiz */}
        {activeLessonTab === 'quiz' && (
          <div className="p-6 space-y-6 text-xs text-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Lesson Quiz: {selectedLesson.title}
                </h3>
                <span className="text-slate-500 text-[11px]">
                  Question {currentQuizIndex + 1} of {selectedLesson.quiz.length}
                </span>
              </div>
              {quizSubmitted && (
                <div className="text-emerald-700 font-extrabold font-mono text-sm bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                  Score: {quizScores[selectedLesson.id] ?? 0}%
                </div>
              )}
            </div>

            {/* Current Question */}
            {(() => {
              const currentQ = selectedLesson.quiz[currentQuizIndex];
              const userAnswer = selectedAnswers[currentQuizIndex];

              return (
                <div className="space-y-4">
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {currentQuizIndex + 1}. {currentQ.question}
                  </div>

                  <div className="space-y-2">
                    {currentQ.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = currentQ.correctIndex === optIdx;

                      let btnStyle = 'border-slate-200 hover:border-blue-400 bg-white';
                      if (isSelected) {
                        btnStyle = 'border-blue-600 bg-blue-50 font-bold text-blue-900';
                      }
                      if (quizSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 font-bold text-emerald-900';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-50 font-bold text-rose-900';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {quizSubmitted && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-blue-950 text-[11px] leading-relaxed">
                      <strong>Statutory Explanation:</strong> {currentQ.explanation}
                    </div>
                  )}

                  {/* Question Switcher */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      disabled={currentQuizIndex === 0}
                      onClick={() => setCurrentQuizIndex((p) => Math.max(0, p - 1))}
                      className="px-3 py-1.5 border border-slate-300 rounded text-slate-700 disabled:opacity-40"
                    >
                      &larr; Previous Question
                    </button>

                    <div className="flex gap-1.5">
                      {selectedLesson.quiz.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentQuizIndex(i)}
                          className={`w-7 h-7 rounded text-xs font-bold ${
                            currentQuizIndex === i
                              ? 'bg-blue-600 text-white'
                              : selectedAnswers[i] !== undefined
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    {currentQuizIndex < selectedLesson.quiz.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuizIndex((p) => Math.min(selectedLesson.quiz.length - 1, p + 1))}
                        className="px-3 py-1.5 bg-blue-600 text-white rounded font-semibold"
                      >
                        Next &rarr;
                      </button>
                    ) : !quizSubmitted ? (
                      <button
                        onClick={handleFinishQuiz}
                        className="px-4 py-1.5 bg-emerald-600 text-white rounded font-bold shadow-xs"
                      >
                        Submit Answers
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setQuizSubmitted(false);
                          setSelectedAnswers({});
                          setCurrentQuizIndex(0);
                        }}
                        className="px-3 py-1.5 border border-slate-300 rounded text-slate-700"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};
