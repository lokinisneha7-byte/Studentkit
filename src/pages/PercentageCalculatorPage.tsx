import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { 
  calculateXPercentOfY, 
  calculateXIsWhatPercentOfY, 
  calculatePercentageChange, 
  calculateMarksPercentage 
} from '../utils/calculations';
import { 
  Percent, 
  Plus, 
  Trash2, 
  AlertCircle, 
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface MarkSubject {
  id: string;
  name: string;
  marks: string;
  maxMarks: string;
}

export const PercentageCalculatorPage: React.FC = () => {
  const [mode, setMode] = useState<'mode1' | 'mode2' | 'mode3' | 'marks'>('marks');

  // Mode 1: What is X% of Y?
  const [m1X, setM1X] = useState('18');
  const [m1Y, setM1Y] = useState('450');

  // Mode 2: X is what % of Y?
  const [m2X, setM2X] = useState('72');
  const [m2Y, setM2Y] = useState('80');

  // Mode 3: Percentage Change
  const [m3Initial, setM3Initial] = useState('60');
  const [m3Final, setM3Final] = useState('85');

  // Mode 4: Marks Percentage
  const [marksSubjects, setMarksSubjects] = useState<MarkSubject[]>([
    { id: '1', name: 'Mathematics', marks: '88', maxMarks: '100' },
    { id: '2', name: 'Physics', marks: '76', maxMarks: '100' },
    { id: '3', name: 'Chemistry', marks: '84', maxMarks: '100' },
    { id: '4', name: 'Computer Science', marks: '95', maxMarks: '100' },
    { id: '5', name: 'English', marks: '80', maxMarks: '100' },
  ]);

  // Compute results
  const res1 = calculateXPercentOfY(parseFloat(m1X), parseFloat(m1Y));
  const res2 = calculateXIsWhatPercentOfY(parseFloat(m2X), parseFloat(m2Y));
  const res3 = calculatePercentageChange(parseFloat(m3Initial), parseFloat(m3Final));

  const marksInputFormatted = marksSubjects.map((s) => ({
    name: s.name,
    marks: parseFloat(s.marks),
    maxMarks: parseFloat(s.maxMarks),
  }));
  const resMarks = calculateMarksPercentage(marksInputFormatted);

  const handleAddMarksSubject = () => {
    setMarksSubjects([
      ...marksSubjects,
      {
        id: Date.now().toString(),
        name: `Subject ${marksSubjects.length + 1}`,
        marks: '0',
        maxMarks: '100',
      },
    ]);
  };

  const handleRemoveMarksSubject = (id: string) => {
    if (marksSubjects.length <= 1) return;
    setMarksSubjects(marksSubjects.filter((s) => s.id !== id));
  };

  const handleMarkChange = (id: string, field: 'name' | 'marks' | 'maxMarks', value: string) => {
    setMarksSubjects((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="Percentage Calculator — Marks & Student Math Tools"
        description="Calculate marks percentage, percentage change, proportions, and test exam scores with instant step-by-step mathematical breakdowns."
        keywords="marks percentage calculator, calculate percentage of marks, percentage increase decrease, what is X percent of Y"
        canonicalPath="/percentage-calculator"
      />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <Percent className="w-4 h-4 text-blue-600" />
          <span>Student Math Utility</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Percentage Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Fast, error-free percentage calculations for exams, assignments, and test scores.
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200/70 p-1 rounded-xl inline-flex flex-wrap justify-center gap-1">
          <button
            type="button"
            onClick={() => setMode('marks')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              mode === 'marks'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Marks Percentage (Multi-Subject)
          </button>
          <button
            type="button"
            onClick={() => setMode('mode1')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              mode === 'mode1'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            What is X% of Y?
          </button>
          <button
            type="button"
            onClick={() => setMode('mode2')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              mode === 'mode2'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            X is what % of Y?
          </button>
          <button
            type="button"
            onClick={() => setMode('mode3')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              mode === 'mode3'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Percentage Change (↑ / ↓)
          </button>
        </div>
      </div>

      {/* Tab 1: Marks Calculator */}
      {mode === 'marks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Enter Subject Marks</h2>
                  <p className="text-xs text-slate-500">Calculate total aggregate marks and percentage.</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMarksSubject}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subject</span>
                </button>
              </div>

              {!resMarks.isValid && resMarks.error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{resMarks.error}</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                  <div className="col-span-6">Subject</div>
                  <div className="col-span-3">Marks Obtained</div>
                  <div className="col-span-2">Max Marks</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                {marksSubjects.map((s, index) => (
                  <div
                    key={s.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 items-center"
                  >
                    <div className="sm:col-span-6">
                      <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                        Subject Name
                      </label>
                      <input
                        type="text"
                        value={s.name}
                        onChange={(e) => handleMarkChange(s.id, 'name', e.target.value)}
                        placeholder={`Subject ${index + 1}`}
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                        Marks Obtained
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={s.marks}
                        onChange={(e) => handleMarkChange(s.id, 'marks', e.target.value)}
                        placeholder="Marks"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                        Max Marks
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={s.maxMarks}
                        onChange={(e) => handleMarkChange(s.id, 'maxMarks', e.target.value)}
                        placeholder="Max"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="sm:col-span-1 flex justify-end sm:justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveMarksSubject(s.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Aggregate Score
              </span>

              {resMarks.isValid ? (
                <div className="mt-3 space-y-4">
                  <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-100">
                    <div className="text-5xl font-black text-blue-700">
                      {resMarks.percentage}%
                    </div>
                    <div className="mt-2">
                      <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-blue-200/80 text-blue-900 border border-blue-300">
                        {resMarks.division}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-500">Total Marks Scored:</span>
                      <span className="font-bold text-slate-900">
                        {resMarks.totalMarks} / {resMarks.totalMaxMarks}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                      <span className="text-slate-500">Total Subjects:</span>
                      <span className="font-bold text-slate-900">{marksSubjects.length}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-slate-400 text-xs">
                  Please fix input errors to see score.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: What is X% of Y? */}
      {mode === 'mode1' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle">
          <h2 className="text-lg font-bold text-slate-900 mb-6">What is X% of Y?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Percentage (X %)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={m1X}
                  onChange={(e) => setM1X(e.target.value)}
                  placeholder="e.g. 18"
                  className="w-full px-4 py-3 text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
                />
                <span className="absolute right-4 top-3.5 text-slate-400 font-bold">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Total Value (Y)
              </label>
              <input
                type="number"
                value={m1Y}
                onChange={(e) => setM1Y(e.target.value)}
                placeholder="e.g. 450"
                className="w-full px-4 py-3 text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Calculation Result
            </span>
            <div className="text-4xl font-black text-blue-800 mt-1">
              {res1.isValid ? res1.result : '--'}
            </div>
            {res1.isValid && (
              <p className="text-xs font-mono text-blue-600 mt-2">
                Step: {res1.formula}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: X is what % of Y? */}
      {mode === 'mode2' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle">
          <h2 className="text-lg font-bold text-slate-900 mb-6">X is what percentage of Y?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Value (X)
              </label>
              <input
                type="number"
                value={m2X}
                onChange={(e) => setM2X(e.target.value)}
                placeholder="e.g. 72"
                className="w-full px-4 py-3 text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Total Value (Y)
              </label>
              <input
                type="number"
                value={m2Y}
                onChange={(e) => setM2Y(e.target.value)}
                placeholder="e.g. 80"
                className="w-full px-4 py-3 text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Calculation Result
            </span>
            <div className="text-4xl font-black text-blue-800 mt-1">
              {res2.isValid ? `${res2.result}%` : '--'}
            </div>
            {res2.isValid ? (
              <p className="text-xs font-mono text-blue-600 mt-2">
                Step: {res2.formula}
              </p>
            ) : (
              res2.error && <p className="text-xs text-rose-600 mt-2">{res2.error}</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Percentage Increase / Decrease */}
      {mode === 'mode3' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-subtle">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Percentage Increase / Decrease</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Initial / Old Value
              </label>
              <input
                type="number"
                value={m3Initial}
                onChange={(e) => setM3Initial(e.target.value)}
                placeholder="e.g. 60"
                className="w-full px-4 py-3 text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Final / New Value
              </label>
              <input
                type="number"
                value={m3Final}
                onChange={(e) => setM3Final(e.target.value)}
                placeholder="e.g. 85"
                className="w-full px-4 py-3 text-lg font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Calculation Result
            </span>
            <div className="text-4xl font-black text-blue-800 mt-1 flex items-center justify-center gap-2">
              {res3.type === 'increase' && <TrendingUp className="w-8 h-8 text-emerald-600" />}
              {res3.type === 'decrease' && <TrendingDown className="w-8 h-8 text-rose-600" />}
              <span>{res3.isValid ? `${res3.change}%` : '--'}</span>
            </div>
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-slate-600 mt-1">
              {res3.type === 'increase' ? 'Growth / Increase' : res3.type === 'decrease' ? 'Reduction / Decrease' : 'No Change'}
            </span>
            {res3.isValid && (
              <p className="text-xs font-mono text-blue-600 mt-2">
                Step: {res3.formula}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Reserved Ad Space */}
      <AdPlaceholder slotType="banner" />
    </div>
  );
};
