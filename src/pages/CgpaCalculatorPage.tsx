import React, { useMemo, useState } from 'react';
import { Calculator, Copy, Check, Info } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

interface Subject {
  id: number;
  name: string;
  credits: number;
  grade: number;
}

const gradeOptions = [
  { grade: 10, label: 'O / A+' },
  { grade: 9, label: 'A+' },
  { grade: 8, label: 'A' },
  { grade: 7, label: 'B+' },
  { grade: 6, label: 'B' },
  { grade: 5, label: 'C' },
  { grade: 4, label: 'D' },
  { grade: 0, label: 'F' },
];

export const CgpaCalculatorPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: 'Subject 1', credits: 4, grade: 9 },
    { id: 2, name: 'Subject 2', credits: 3, grade: 8 },
    { id: 3, name: 'Subject 3', credits: 3, grade: 9 },
  ]);

  const [copied, setCopied] = useState(false);

  const totalCredits = useMemo(() => {
    return subjects.reduce(
      (sum, subject) => sum + Number(subject.credits || 0),
      0
    );
  }, [subjects]);

  const cgpa = useMemo(() => {
    if (totalCredits === 0) return 0;

    const weightedGradePoints = subjects.reduce(
      (sum, subject) =>
        sum +
        Number(subject.credits || 0) * Number(subject.grade || 0),
      0
    );

    return weightedGradePoints / totalCredits;
  }, [subjects, totalCredits]);

  const percentage = useMemo(() => {
    return cgpa * 9.5;
  }, [cgpa]);

  const updateSubject = (
    id: number,
    field: keyof Subject,
    value: string | number
  ) => {
    setSubjects((currentSubjects) =>
      currentSubjects.map((subject) =>
        subject.id === id
          ? {
              ...subject,
              [field]:
                field === 'credits' || field === 'grade'
                  ? Number(value)
                  : value,
            }
          : subject
      )
    );
  };

  const addSubject = () => {
    const newId =
      subjects.length > 0
        ? Math.max(...subjects.map((subject) => subject.id)) + 1
        : 1;

    setSubjects([
      ...subjects,
      {
        id: newId,
        name: `Subject ${newId}`,
        credits: 3,
        grade: 8,
      },
    ]);
  };

  const removeSubject = (id: number) => {
    if (subjects.length <= 1) return;

    setSubjects((currentSubjects) =>
      currentSubjects.filter((subject) => subject.id !== id)
    );
  };

  const resetCalculator = () => {
    setSubjects([
      { id: 1, name: 'Subject 1', credits: 4, grade: 9 },
      { id: 2, name: 'Subject 2', credits: 3, grade: 8 },
      { id: 3, name: 'Subject 3', credits: 3, grade: 9 },
    ]);
  };

  const copyResult = async () => {
    const text = `My CGPA is ${cgpa.toFixed(
      2
    )} with ${totalCredits} total credits.
StudentKit — https://studentkit-sigma.vercel.app/cgpa-calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <SEOHead
        title="CGPA Calculator — Calculate CGPA with Credits"
        description="Free CGPA calculator for college students. Calculate credit-weighted CGPA using subject grades and credits, with 10-point and 4-point grading scales."
        keywords="CGPA calculator, CGPA calculator with credits, calculate CGPA, CGPA to percentage, college CGPA calculator, university CGPA calculator, 10 point CGPA calculator"
        canonicalPath="/cgpa-calculator"
      />

      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <section className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 mb-4">
              <Calculator size={28} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              CGPA Calculator
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Calculate your college CGPA quickly using subject grades and
              credit hours. Enter your subjects below to get your
              credit-weighted CGPA.
            </p>
          </section>

          {/* Calculator */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 md:p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Enter Your Subjects
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add each subject's credits and grade points.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={resetCalculator}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Subjects */}
            <div className="p-5 md:p-6 space-y-4">
              {subjects.map((subject, index) => (
                <div
                  key={subject.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end p-4 rounded-xl bg-gray-50 border border-gray-200"
                >
                  <div className="md:col-span-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject {index + 1}
                    </label>

                    <input
                      type="text"
                      value={subject.name}
                      onChange={(e) =>
                        updateSubject(
                          subject.id,
                          'name',
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      placeholder="Subject name"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Credits
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={subject.credits}
                      onChange={(e) =>
                        updateSubject(
                          subject.id,
                          'credits',
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Point
                    </label>

                    <select
                      value={subject.grade}
                      onChange={(e) =>
                        updateSubject(
                          subject.id,
                          'grade',
                          e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      {gradeOptions.map((option) => (
                        <option
                          key={option.grade}
                          value={option.grade}
                        >
                          {option.grade} — {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <button
                      type="button"
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length <= 1}
                      className="w-full md:w-auto px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      aria-label={`Remove ${subject.name}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addSubject}
                className="w-full rounded-xl border-2 border-dashed border-gray-300 py-3 text-sm font-semibold text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition"
              >
                + Add Subject
              </button>
            </div>

            {/* Result */}
            <div className="p-5 md:p-6 bg-indigo-50 border-t border-indigo-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-white rounded-xl p-5 border border-indigo-100">
                  <p className="text-sm text-gray-500 mb-1">
                    Your CGPA
                  </p>

                  <p className="text-4xl font-bold text-indigo-600">
                    {cgpa.toFixed(2)}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-indigo-100">
                  <p className="text-sm text-gray-500 mb-1">
                    Total Credits
                  </p>

                  <p className="text-3xl font-bold text-gray-900">
                    {totalCredits}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 border border-indigo-100">
                  <p className="text-sm text-gray-500 mb-1">
                    Approx. Percentage
                  </p>

                  <p className="text-3xl font-bold text-gray-900">
                    {percentage.toFixed(2)}%
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Based on CGPA × 9.5
                  </p>
                </div>

              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  type="button"
                  onClick={copyResult}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied!' : 'Copy Result'}
                </button>
              </div>
            </div>
          </section>

          {/* Formula */}
          <section className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-indigo-600">
                <Info size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  How is CGPA calculated?
                </h2>

                <p className="text-gray-600 leading-7 mb-4">
                  CGPA is commonly calculated as a credit-weighted average
                  of grade points. Each subject's grade point is multiplied
                  by its credits, and the total is divided by the total
                  number of credits.
                </p>

                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 font-medium text-gray-800">
                  CGPA = Σ (Credit × Grade Point) ÷ Σ Credits
                </div>
              </div>
            </div>
          </section>

          {/* Example */}
          <section className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              CGPA Calculation Example
            </h2>

            <p className="text-gray-600 leading-7 mb-4">
              Suppose a student has the following three subjects on a
              10-point grading scale:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 pr-4 text-sm font-semibold text-gray-700">
                      Subject
                    </th>

                    <th className="py-3 pr-4 text-sm font-semibold text-gray-700">
                      Credits
                    </th>

                    <th className="py-3 pr-4 text-sm font-semibold text-gray-700">
                      Grade Point
                    </th>

                    <th className="py-3 text-sm font-semibold text-gray-700">
                      Credit × Grade
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-600">
                      Subject 1
                    </td>

                    <td className="py-3 pr-4 text-gray-600">
                      4
                    </td>

                    <td className="py-3 pr-4 text-gray-600">
                      9
                    </td>

                    <td className="py-3 text-gray-600">
                      36
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-600">
                      Subject 2
                    </td>

                    <td className="py-3 pr-4 text-gray-600">
                      3
                    </td>

                    <td className="py-3 pr-4 text-gray-600">
                      8
                    </td>

                    <td className="py-3 text-gray-600">
                      24
                    </td>
                  </tr>

                  <tr className="border-b border-gray-100">
                    <td className="py-3 pr-4 text-gray-600">
                      Subject 3
                    </td>

                    <td className="py-3 pr-4 text-gray-600">
                      2
                    </td>

                    <td className="py-3 pr-4 text-gray-600">
                      10
                    </td>

                    <td className="py-3 text-gray-600">
                      20
                    </td>
                  </tr>

                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-900">
                      Total
                    </td>

                    <td className="py-3 pr-4 font-semibold text-gray-900">
                      9
                    </td>

                    <td className="py-3 pr-4 text-gray-900">
                      —
                    </td>

                    <td className="py-3 font-semibold text-gray-900">
                      80
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-5 rounded-xl bg-indigo-50 p-4 text-gray-800">
              <p className="font-semibold">
                CGPA = 80 ÷ 9 = 8.89
              </p>

              <p className="text-sm text-gray-600 mt-2">
                So, the student's credit-weighted CGPA is approximately
                <strong> 8.89</strong>.
              </p>
            </div>
          </section>

          {/* Important Note */}
          <section className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Important Note About CGPA
            </h2>

            <p className="text-gray-600 leading-7">
              Grading scales, grade-point values, and CGPA-to-percentage
              conversion rules can vary between universities and colleges.
              This calculator uses the grade points and credits you enter.
              For an official percentage conversion, always check your
              university's academic regulations.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Frequently Asked Questions
            </h2>

            <div className="space-y-5">

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  What is CGPA?
                </h3>

                <p className="text-gray-600 leading-7">
                  CGPA stands for Cumulative Grade Point Average. It
                  represents a student's average grade performance across
                  subjects or semesters, often taking subject credits into
                  account.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  How do I calculate CGPA with credits?
                </h3>

                <p className="text-gray-600 leading-7">
                  Multiply each subject's grade point by its credit value,
                  add all the weighted grade points, and divide the result
                  by the total credits.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Can I use this CGPA calculator for college?
                </h3>

                <p className="text-gray-600 leading-7">
                  Yes. You can enter your college subjects, credits, and
                  grade points to calculate a credit-weighted CGPA.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  How is CGPA converted to percentage?
                </h3>

                <p className="text-gray-600 leading-7">
                  There is no single universal conversion formula. Some
                  institutions use a specific conversion rule, while others
                  may provide their own official method. Check your
                  university's regulations before using a converted
                  percentage for academic or application purposes.
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>
    </>
  );
};
