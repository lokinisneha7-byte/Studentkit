import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { SubjectRow, GradeScale } from '../types';
import { 
  STANDARD_GRADES, 
  FOUR_POINT_GRADES, 
  calculateWeightedGpa, 
  getGpaClassification 
} from '../utils/calculations';
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Calculator, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  AlertCircle, 
  BookOpen,
  Info
} from 'lucide-react';

const INITIAL_SUBJECTS: SubjectRow[] = [
  { id: '1', name: 'Engineering Mathematics / Core Subject 1', credits: 4, gradePoint: 10, gradeLabel: 'O (Outstanding)' },
  { id: '2', name: 'Data Structures & Algorithms', credits: 4, gradePoint: 9, gradeLabel: 'A+ (Excellent)' },
  { id: '3', name: 'Database Management Systems', credits: 3, gradePoint: 8, gradeLabel: 'A (Very Good)' },
  { id: '4', name: 'Computer Networks', credits: 3, gradePoint: 9, gradeLabel: 'A+ (Excellent)' },
  { id: '5', name: 'Software Engineering Lab', credits: 2, gradePoint: 10, gradeLabel: 'O (Outstanding)' },
];

export const CgpaCalculatorPage: React.FC = () => {
  const [scale, setScale] = useState<GradeScale>('10-point');
  const [subjects, setSubjects] = useState<SubjectRow[]>(INITIAL_SUBJECTS);
  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    totalPoints: number;
    calculated: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const gradeOptions = scale === '10-point' ? STANDARD_GRADES : FOUR_POINT_GRADES;

  const handleAddSubject = () => {
    const defaultGrade = gradeOptions[0];
    const newSubject: SubjectRow = {
      id: Date.now().toString(),
      name: `Subject ${subjects.length + 1}`,
      credits: 3,
      gradePoint: defaultGrade.points,
      gradeLabel: defaultGrade.label,
    };
    setSubjects([...subjects, newSubject]);
    setErrorMessage(null);
  };

  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 1) {
      setErrorMessage('You need at least one subject in the list.');
      return;
    }
    setSubjects(subjects.filter((s) => s.id !== id));
    setErrorMessage(null);
  };

  const handleSubjectChange = (
    id: string,
    field: 'name' | 'credits' | 'grade',
    value: string | number
  ) => {
    setSubjects((prev) =>
      prev.map((sub) => {
        if (sub.id !== id) return sub;

        if (field === 'name') {
          return { ...sub, name: String(value) };
        } else if (field === 'credits') {
          const num = parseFloat(String(value));
          return { ...sub, credits: isNaN(num) ? 0 : num };
        } else if (field === 'grade') {
          const selected = gradeOptions.find((g) => g.label === value);
          if (selected) {
            return {
              ...sub,
              gradePoint: selected.points,
              gradeLabel: selected.label,
            };
          }
        }
        return sub;
      })
    );
    setErrorMessage(null);
  };

  const handleCalculate = () => {
    const res = calculateWeightedGpa(subjects);
    if (!res.isValid) {
      setErrorMessage(res.error || 'Please ensure all credits are valid and greater than 0.');
      setResult(null);
      return;
    }

    setErrorMessage(null);
    setResult({
      gpa: res.gpa,
      totalCredits: res.totalCredits,
      totalPoints: res.totalPoints,
      calculated: true,
    });
  };

  const handleReset = () => {
    setSubjects([
      { id: '1', name: 'Subject 1', credits: 3, gradePoint: gradeOptions[0].points, gradeLabel: gradeOptions[0].label },
      { id: '2', name: 'Subject 2', credits: 3, gradePoint: gradeOptions[1].points, gradeLabel: gradeOptions[1].label },
      { id: '3', name: 'Subject 3', credits: 4, gradePoint: gradeOptions[2].points, gradeLabel: gradeOptions[2].label },
    ]);
    setResult(null);
    setErrorMessage(null);
  };

  const handleLoadSample = () => {
    setSubjects(INITIAL_SUBJECTS);
    setErrorMessage(null);
    setResult(null);
  };

  const handleCopyResult = () => {
    if (!result) return;
    const text = `StudentKit CGPA Result:\nCGPA: ${result.gpa} / ${scale === '10-point' ? '10.0' : '4.0'}\nTotal Credits: ${result.totalCredits}\nClassification: ${getGpaClassification(result.gpa, scale).label}\nCalculated at: https://studentkit-sigma.vercel.app/cgpa-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const classification = result ? getGpaClassification(result.gpa, scale) : null;
  const estimatedPercentage95 = result && scale === '10-point' ? (result.gpa * 9.5).toFixed(2) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="CGPA Calculator — Weighted Grade Point Average"
        description="Calculate your CGPA using the official university credit-weighted formula. Accurate grade conversion for Indian universities and international colleges."
        keywords="CGPA calculator, credit weighted CGPA, CGPA to percentage, calculate CGPA college, university GPA"
        canonicalPath="/cgpa-calculator"
      />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
          <GraduationCap className="w-4 h-4 text-brand-600" />
          <span>Academic Grade Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          CGPA Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Calculate your CGPA quickly and easily using the official university credit-weighted formula.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Calculator Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
            {/* Top Bar: Scale Selector & Sample Data */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Grading Scale:</span>
                <div className="inline-flex bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => { setScale('10-point'); setResult(null); }}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                      scale === '10-point'
                        ? 'bg-white text-brand-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    10-Point (India / UGC)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setScale('4-point'); setResult(null); }}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                      scale === '4-point'
                        ? 'bg-white text-brand-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4-Point (US / International)
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Data</span>
              </button>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="my-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Subjects Table */}
            <div className="mt-6 space-y-3">
              <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                <div className="col-span-5">Subject / Course Name</div>
                <div className="col-span-3">Credits</div>
                <div className="col-span-3">Grade</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {subjects.map((sub, index) => (
                <div
                  key={sub.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 sm:p-2 rounded-xl bg-slate-50/70 border border-slate-200/80 items-center transition-all hover:border-slate-300"
                >
                  <div className="sm:col-span-5">
                    <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleSubjectChange(sub.id, 'name', e.target.value)}
                      placeholder={`e.g. Subject ${index + 1}`}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-brand-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                      Credits (e.g. 1-6)
                    </label>
                    <input
                      type="number"
                      min="0.5"
                      max="20"
                      step="0.5"
                      value={sub.credits || ''}
                      onChange={(e) => handleSubjectChange(sub.id, 'credits', e.target.value)}
                      placeholder="Credits"
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-brand-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                      Grade
                    </label>
                    <select
                      value={sub.gradeLabel}
                      onChange={(e) => handleSubjectChange(sub.id, 'grade', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-brand-500 focus:outline-hidden cursor-pointer"
                    >
                      {gradeOptions.map((opt) => (
                        <option key={opt.label} value={opt.label}>
                          {opt.label} ({opt.points} pts)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-1 flex justify-end sm:justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(sub.id)}
                      aria-label="Remove subject"
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons Row */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleAddSubject}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subject</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  onClick={handleCalculate}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-brand-500/20 transition-all hover:translate-y-[-1px]"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate CGPA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reserved Ad Slot */}
          <AdPlaceholder slotType="banner" />

          {/* Educational / SEO Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-brand-600 font-bold text-lg">
              <BookOpen className="w-5 h-5" />
              <h2>Understanding CGPA &amp; Calculation Guide</h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">What is CGPA?</h3>
                <p>
                  <strong>CGPA</strong> stands for <em>Cumulative Grade Point Average</em>. It is the weighted mean of the grade points obtained across all accredited subjects and semesters by a college or university student.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">How is CGPA Calculated?</h3>
                <p>
                  Unlike a simple average, CGPA accounts for the number of credit hours assigned to each course. Subjects with higher credits (such as core engineering, major electives, or final-year projects) hold higher weight in your overall GPA.
                </p>
                <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                  CGPA = Σ (Credit × Grade Point) / Σ (Total Credits)
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">
                  Converting CGPA to Percentage (University Variations)
                </h3>
                <p>
                  Different universities and education boards follow different official percentage conversion formulas. For instance:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs sm:text-sm text-slate-600">
                  <li><strong>CBSE / Standard 9.5 Method:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded">Percentage = CGPA × 9.5</code></li>
                  <li><strong>Mumbai University (Engg):</strong> <code className="bg-slate-100 px-1 py-0.5 rounded">Percentage = 7.1 × CGPA + 11</code> (for CGPA &lt; 7) or <code className="bg-slate-100 px-1 py-0.5 rounded">7.4 × CGPA + 12</code> (for CGPA ≥ 7)</li>
                  <li><strong>VTU (Visvesvaraya Tech University):</strong> <code className="bg-slate-100 px-1 py-0.5 rounded">Percentage = (CGPA - 0.75) × 10</code></li>
                  <li><strong>Anna University:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded">Percentage = CGPA × 10</code></li>
                </ul>
                <p className="text-xs text-slate-500 mt-2 italic">
                  *Always consult your college transcript or university examination ordinance for the exact certified conversion equation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results & Grade Table */}
        <div className="lg:col-span-4 space-y-6">
          {/* Result Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Calculation Result
            </h3>

            {result && result.calculated ? (
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                {/* Big Score Display */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50/50 border border-brand-100 text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    Your CGPA
                  </span>
                  <div className="text-5xl font-black text-brand-700 mt-1">
                    {result.gpa}
                    <span className="text-lg font-bold text-slate-400 ml-1">
                      / {scale === '10-point' ? '10' : '4.0'}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${classification?.badgeColor}`}>
                      {classification?.label}
                    </span>
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-500">Total Credits Earned:</span>
                    <span className="font-bold text-slate-900">{result.totalCredits}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-500">Total Weighted Points:</span>
                    <span className="font-bold text-slate-900">{result.totalPoints}</span>
                  </div>

                  {estimatedPercentage95 && (
                    <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-900">
                          Estimated Percentage:
                        </span>
                        <span className="text-base font-bold text-amber-900">
                          {estimatedPercentage95}%
                        </span>
                      </div>
                      <span className="block text-[11px] text-amber-700 mt-1">
                        (9.5 conversion method — CGPA × 9.5)
                      </span>
                      <p className="text-[10px] text-amber-800/80 mt-1.5 leading-tight">
                        Note: Please verify your specific university conversion guideline as formulas vary across institutions.
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Calculator className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-600">No Calculation Yet</p>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                  Enter your subject credits &amp; grades and click <strong>Calculate CGPA</strong>.
                </p>
              </div>
            )}
          </div>

          {/* Reference Grade Scale Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-brand-600" />
              <span>{scale === '10-point' ? '10-Point Grade Reference' : '4-Point Grade Reference'}</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="pb-2">Grade</th>
                    <th className="pb-2">Points</th>
                    <th className="pb-2">Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {gradeOptions.map((g) => (
                    <tr key={g.label} className="hover:bg-slate-50/50">
                      <td className="py-1.5 font-bold text-slate-800">{g.label.split(' ')[0]}</td>
                      <td className="py-1.5 font-semibold text-brand-600">{g.points}</td>
                      <td className="py-1.5 text-slate-500">{g.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
