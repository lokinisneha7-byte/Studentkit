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
  Award, 
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

const INITIAL_SEMESTER_SUBJECTS: SubjectRow[] = [
  { id: '1', name: 'Operating Systems', credits: 4, gradePoint: 9, gradeLabel: 'A+ (Excellent)' },
  { id: '2', name: 'Design and Analysis of Algorithms', credits: 4, gradePoint: 10, gradeLabel: 'O (Outstanding)' },
  { id: '3', name: 'Microprocessors & Microcontrollers', credits: 3, gradePoint: 8, gradeLabel: 'A (Very Good)' },
  { id: '4', name: 'Probability & Statistics', credits: 3, gradePoint: 9, gradeLabel: 'A+ (Excellent)' },
  { id: '5', name: 'Operating Systems Laboratory', credits: 2, gradePoint: 10, gradeLabel: 'O (Outstanding)' },
];

export const SgpaCalculatorPage: React.FC = () => {
  const [scale, setScale] = useState<GradeScale>('10-point');
  const [semesterName, setSemesterName] = useState('Semester 4');
  const [subjects, setSubjects] = useState<SubjectRow[]>(INITIAL_SEMESTER_SUBJECTS);
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
      setErrorMessage('You need at least one subject in the semester list.');
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
    setSubjects(INITIAL_SEMESTER_SUBJECTS);
    setErrorMessage(null);
    setResult(null);
  };

  const handleCopyResult = () => {
    if (!result) return;
    const text = `StudentKit SGPA Result for ${semesterName}:\nSGPA: ${result.gpa} / ${scale === '10-point' ? '10.0' : '4.0'}\nTotal Credits: ${result.totalCredits}\nPerformance: ${getGpaClassification(result.gpa, scale).label}\nCalculated at: https://studentkit.app/#/sgpa-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const classification = result ? getGpaClassification(result.gpa, scale) : null;
  const estimatedPercentage95 = result && scale === '10-point' ? (result.gpa * 9.5).toFixed(2) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="SGPA Calculator — Semester Grade Point Average"
        description="Calculate your Semester Grade Point Average (SGPA) quickly and accurately using credit-weighted subject grades."
        keywords="SGPA calculator, semester GPA, SGPA to percentage, how to calculate SGPA, university SGPA"
        canonicalPath="/sgpa-calculator"
      />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Award className="w-4 h-4 text-indigo-600" />
          <span>Semester Grade Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          SGPA Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Calculate your Semester Grade Point Average accurately per subject credits and grade points.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Calculator Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={semesterName}
                  onChange={(e) => setSemesterName(e.target.value)}
                  placeholder="Semester Name"
                  className="px-3 py-1.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                />

                <div className="inline-flex bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => { setScale('10-point'); setResult(null); }}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                      scale === '10-point'
                        ? 'bg-white text-indigo-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    10-Point
                  </button>
                  <button
                    type="button"
                    onClick={() => { setScale('4-point'); setResult(null); }}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                      scale === '4-point'
                        ? 'bg-white text-indigo-600 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    4-Point
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Semester</span>
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
                <div className="col-span-5">Semester Course</div>
                <div className="col-span-3">Credits</div>
                <div className="col-span-3">Grade Awarded</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {subjects.map((sub, index) => (
                <div
                  key={sub.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3.5 sm:p-2 rounded-xl bg-slate-50/70 border border-slate-200/80 items-center transition-all hover:border-slate-300"
                >
                  <div className="sm:col-span-5">
                    <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                      Course Name
                    </label>
                    <input
                      type="text"
                      value={sub.name}
                      onChange={(e) => handleSubjectChange(sub.id, 'name', e.target.value)}
                      placeholder={`e.g. Course ${index + 1}`}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-hidden"
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
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-hidden"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block sm:hidden text-xs font-bold text-slate-500 mb-1">
                      Grade
                    </label>
                    <select
                      value={sub.gradeLabel}
                      onChange={(e) => handleSubjectChange(sub.id, 'grade', e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-hidden cursor-pointer"
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
                      aria-label="Remove course"
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
                <span>Add Course</span>
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
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition-all hover:translate-y-[-1px]"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate SGPA</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reserved Ad Slot */}
          <AdPlaceholder slotType="banner" />

          {/* Educational / SEO Content */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
              <BookOpen className="w-5 h-5" />
              <h2>SGPA vs CGPA: Everything You Need to Know</h2>
            </div>

            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">What is SGPA?</h3>
                <p>
                  <strong>SGPA</strong> (<em>Semester Grade Point Average</em>) measures a student’s academic performance in a specific individual semester. It represents the ratio of total grade points secured in that single term to the total credit hours registered in the same term.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">What is the difference between SGPA and CGPA?</h3>
                <p>
                  While <strong>SGPA</strong> assesses performance in one particular semester, <strong>CGPA</strong> (Cumulative Grade Point Average) evaluates your overall cumulative performance across all completed semesters from year 1 to graduation.
                </p>
                <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                  SGPA = Σ (Semester Course Credit × Grade Point) / Σ (Semester Credits)
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800 mb-1">How SGPA Affects Your Final CGPA</h3>
                <p>
                  To find your final CGPA from multiple semesters:
                </p>
                <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
                  CGPA = Σ (SGPA of Semester i × Total Credits of Semester i) / Σ (Total Credits of All Semesters)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Result Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Semester Scorecard
            </h3>

            {result && result.calculated ? (
              <div className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purpleBrand-50/50 border border-indigo-100 text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    {semesterName} SGPA
                  </span>
                  <div className="text-5xl font-black text-indigo-700 mt-1">
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

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-500">Semester Credits:</span>
                    <span className="font-bold text-slate-900">{result.totalCredits}</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50">
                    <span className="text-slate-500">Total Quality Points:</span>
                    <span className="font-bold text-slate-900">{result.totalPoints}</span>
                  </div>

                  {estimatedPercentage95 && (
                    <div className="p-3 rounded-xl bg-indigo-50/80 border border-indigo-200">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-indigo-900">
                          Estimated Percentage:
                        </span>
                        <span className="text-base font-bold text-indigo-900">
                          {estimatedPercentage95}%
                        </span>
                      </div>
                      <span className="block text-[11px] text-indigo-700 mt-1">
                        (9.5 conversion method — SGPA × 9.5)
                      </span>
                      <p className="text-[10px] text-indigo-800/80 mt-1.5 leading-tight">
                        Note: Official conversion rules vary by university ordinance. Please check your institution's formula.
                      </p>
                    </div>
                  )}
                </div>

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
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400">
                <Award className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-600">No Semester Calculation</p>
                <p className="text-xs text-slate-400 mt-1 max-w-[200px] mx-auto">
                  Add your courses, credit values, and grades to view your SGPA.
                </p>
              </div>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>Pro Tip for Boosting GPA</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prioritize higher-credit subjects (4 credits &amp; above). Earning an 'O' or 'A+' in a 4-credit course provides twice the mathematical lift compared to a 2-credit course!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
