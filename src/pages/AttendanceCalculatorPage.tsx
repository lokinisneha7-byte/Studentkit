import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { calculateAttendance } from '../utils/calculations';
import { SubjectAttendance } from '../types';
import { 
  CalendarCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Plus, 
  Trash2, 
  RotateCcw, 
  BookOpen, 
  PartyPopper,
  ShieldAlert
} from 'lucide-react';

const INITIAL_SUBJECT_ATTENDANCE: SubjectAttendance[] = [
  { id: '1', name: 'Engineering Mathematics', attended: 32, total: 38 },
  { id: '2', name: 'Data Structures & Algorithms', attended: 26, total: 40 },
  { id: '3', name: 'Database Management Systems', attended: 35, total: 42 },
  { id: '4', name: 'Computer Organization', attended: 20, total: 30 },
];

export const AttendanceCalculatorPage: React.FC = () => {
  // Main Calculator State
  const [attended, setAttended] = useState<string>('34');
  const [total, setTotal] = useState<string>('45');
  const [target, setTarget] = useState<number>(75);

  // Multi-Subject Tracker State
  const [activeTab, setActiveTab] = useState<'single' | 'multi'>('single');
  const [subjectList, setSubjectList] = useState<SubjectAttendance[]>(INITIAL_SUBJECT_ATTENDANCE);

  // Compute main attendance
  const attendedNum = parseFloat(attended);
  const totalNum = parseFloat(total);
  const attendanceResult = calculateAttendance(attendedNum, totalNum, target);

  // Multi-subject calculations
  const totalMultiAttended = subjectList.reduce((sum, s) => sum + (Number(s.attended) || 0), 0);
  const totalMultiConducted = subjectList.reduce((sum, s) => sum + (Number(s.total) || 0), 0);
  const multiOverallResult = calculateAttendance(totalMultiAttended, totalMultiConducted, target);

  const handleAddSubject = () => {
    setSubjectList([
      ...subjectList,
      {
        id: Date.now().toString(),
        name: `Subject ${subjectList.length + 1}`,
        attended: 0,
        total: 0,
      },
    ]);
  };

  const handleRemoveSubject = (id: string) => {
    if (subjectList.length <= 1) return;
    setSubjectList(subjectList.filter((s) => s.id !== id));
  };

  const handleSubjectChange = (
    id: string,
    field: 'name' | 'attended' | 'total',
    value: string | number
  ) => {
    setSubjectList((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (field === 'name') return { ...s, name: String(value) };
        const num = parseFloat(String(value));
        return { ...s, [field]: isNaN(num) ? 0 : num };
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="Attendance Calculator — 75% Attendance & Bunk Planner"
        description="Calculate your current attendance percentage and discover how many more classes you need to attend to hit 75% or how many you can safely miss."
        keywords="attendance calculator, 75% attendance rule, college bunk calculator, classes needed for 75, attendance shortage planner"
        canonicalPath="/attendance-calculator"
      />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
          <CalendarCheck className="w-4 h-4 text-emerald-600" />
          <span>75% Criteria &amp; Shortage Recovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Attendance Calculator
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Check your attendance percentage and find out exactly how many more classes you need to attend or can safely miss.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200/70 p-1 rounded-xl inline-flex">
          <button
            type="button"
            onClick={() => setActiveTab('single')}
            className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              activeTab === 'single'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quick Single Calculator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('multi')}
            className={`px-5 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              activeTab === 'multi'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Subject-Wise Tracker
          </button>
        </div>
      </div>

      {activeTab === 'single' ? (
        /* Single Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs Section */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-subtle">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span>Enter Class Numbers</span>
              </h2>

              <div className="space-y-5">
                {/* Classes Attended */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Classes Attended
                    </label>
                    <span className="text-xs text-slate-400">Total present</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={attended}
                    onChange={(e) => setAttended(e.target.value)}
                    placeholder="e.g. 34"
                    className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                  />
                </div>

                {/* Total Classes Conducted */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Total Classes Held
                    </label>
                    <span className="text-xs text-slate-400">Total sessions</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    placeholder="e.g. 45"
                    className="w-full px-4 py-3 text-lg font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all"
                  />
                </div>

                {/* Target Attendance % */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Target Attendance %
                    </label>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {target}% Target
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {[65, 75, 80, 85].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTarget(val)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                          target === val
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {val}%
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={target}
                      onChange={(e) => setTarget(parseInt(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <span className="text-xs font-bold text-slate-600 min-w-[36px]">
                      {target}%
                    </span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Quick Test Cases:</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { setAttended('28'); setTotal('40'); setTarget(75); }}
                      className="text-emerald-700 hover:underline font-medium"
                    >
                      70% (Need +8)
                    </button>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => { setAttended('42'); setTotal('48'); setTarget(75); }}
                      className="text-emerald-700 hover:underline font-medium"
                    >
                      87.5% (Can Skip 8)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-subtle flex flex-col justify-between h-full">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  Attendance Status &amp; Planner
                </h2>

                {/* Percentage Display Card */}
                <div
                  className={`p-6 rounded-2xl border text-center transition-all ${
                    attendanceResult.status === 'safe'
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : attendanceResult.status === 'warning'
                      ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                      : 'bg-rose-50/70 border-rose-200 text-rose-950'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Current Attendance
                  </span>
                  <div className="text-5xl font-black mt-1">
                    {attendanceResult.currentPercentage}%
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    {attendanceResult.status === 'safe' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-600 text-white shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>On Track ({attendanceResult.statusText})</span>
                      </span>
                    )}
                    {attendanceResult.status === 'warning' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white shadow-2xs">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{attendanceResult.statusText}</span>
                      </span>
                    )}
                    {attendanceResult.status === 'critical' && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-rose-600 text-white shadow-2xs">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{attendanceResult.statusText}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Advice Card */}
                <div className="mt-5 p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-start gap-3">
                    {attendanceResult.isTargetMet ? (
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <PartyPopper className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-4 h-4" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {attendanceResult.isTargetMet
                          ? 'Target Achieved! Attendance Safe.'
                          : 'Action Required: Attendance Shortage'}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {attendanceResult.message}
                      </p>
                    </div>
                  </div>

                  {/* Summary Math Info */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                      <span className="text-slate-400 block">Classes Attended:</span>
                      <span className="font-bold text-slate-800">
                        {isNaN(attendedNum) ? 0 : attendedNum} / {isNaN(totalNum) ? 0 : totalNum}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-100">
                      <span className="text-slate-400 block">Required Goal:</span>
                      <span className="font-bold text-slate-800">{target}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Bar */}
              <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => { setAttended('0'); setTotal('0'); }}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset values</span>
                </button>
                <span className="text-[11px] text-slate-400">
                  Formula: (Attended / Total) × 100
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Multi-Subject Mode */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Subject-Wise Attendance</h2>
                <p className="text-xs text-slate-500">Track attendance across all individual semester subjects.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Subject</span>
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="hidden sm:grid sm:grid-cols-12 gap-3 text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                <div className="col-span-4">Subject Name</div>
                <div className="col-span-2">Attended</div>
                <div className="col-span-2">Total Classes</div>
                <div className="col-span-3 text-center">Status / Attendance %</div>
                <div className="col-span-1 text-center">Remove</div>
              </div>

              {subjectList.map((s) => {
                const itemRes = calculateAttendance(s.attended, s.total, target);
                return (
                  <div
                    key={s.id}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 items-center"
                  >
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        value={s.name}
                        onChange={(e) => handleSubjectChange(s.id, 'name', e.target.value)}
                        placeholder="Subject Name"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="number"
                        min="0"
                        value={s.attended}
                        onChange={(e) => handleSubjectChange(s.id, 'attended', e.target.value)}
                        placeholder="Attended"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="number"
                        min="0"
                        value={s.total}
                        onChange={(e) => handleSubjectChange(s.id, 'total', e.target.value)}
                        placeholder="Total"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-hidden"
                      />
                    </div>
                    <div className="sm:col-span-3 text-center">
                      <span
                        className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${
                          itemRes.status === 'safe'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : itemRes.status === 'warning'
                            ? 'bg-amber-100 text-amber-800 border-amber-200'
                            : 'bg-rose-100 text-rose-800 border-rose-200'
                        }`}
                      >
                        {itemRes.currentPercentage}% {itemRes.status === 'safe' ? `(Can bunk ${itemRes.canBunk})` : `(Need +${itemRes.classesNeeded})`}
                      </span>
                    </div>
                    <div className="sm:col-span-1 flex justify-end sm:justify-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(s.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Multi Aggregate Summary Card */}
            <div className="mt-6 p-4 rounded-xl bg-slate-100/70 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                  Aggregate Semester Attendance
                </span>
                <div className="text-2xl font-black text-slate-900">
                  {multiOverallResult.currentPercentage}%{' '}
                  <span className="text-xs font-normal text-slate-500">
                    ({totalMultiAttended} attended of {totalMultiConducted} total)
                  </span>
                </div>
              </div>

              <div className="text-xs font-semibold">
                {multiOverallResult.isTargetMet ? (
                  <span className="text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Overall Safe! You can miss {multiOverallResult.canBunk} classes across subjects.
                  </span>
                ) : (
                  <span className="text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 inline-flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Overall Shortage! Need {multiOverallResult.classesNeeded} more classes.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reserved Ad Space */}
      <AdPlaceholder slotType="banner" />

      {/* Educational & SEO Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-lg">
          <BookOpen className="w-5 h-5" />
          <h2>How College Attendance Rules &amp; 75% Calculations Work</h2>
        </div>

        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Why is 75% Attendance Mandatory?</h3>
            <p>
              In most Indian universities, AICTE, UGC, and Medical/Bar councils mandate a minimum of <strong>75% attendance</strong> per course to be eligible for end-semester examinations. A relaxation of 5-10% is sometimes granted on genuine medical grounds with formal documentation.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              How are "Classes Needed to Reach 75%" Calculated?
            </h3>
            <p>
              If your current attendance is below your target $T\%$, every upcoming class you attend increases both your attended count and the total conducted count. The exact mathematical formula is:
            </p>
            <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
              Classes Needed = ⌈ (Target% × Total - 100 × Attended) / (100 - Target%) ⌉
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-800 mb-1">
              How is Safe Bunk / Classes You Can Miss Calculated?
            </h3>
            <p>
              If your current attendance is above $T\%$, missing classes increases only the total conducted count while keeping attended count constant:
            </p>
            <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-800">
              Safe Bunk = ⌊ (100 × Attended - Target% × Total) / Target% ⌋
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
