import React from 'react';
import { useRouter } from '../context/RouterContext';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { 
  GraduationCap, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title="About StudentKit — Mission & Privacy-First Philosophy"
        description="Learn about StudentKit, an open, free, and privacy-first utility platform engineered for university and college students worldwide."
        canonicalPath="/about"
      />

      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
          <GraduationCap className="w-4 h-4 text-brand-600" />
          <span>Our Story &amp; Purpose</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Built for Students, by Engineers
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          StudentKit was created to replace slow, cluttered, ad-ridden student calculators with a clean, fast, and 100% private platform.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-subtle space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            The Problem with Modern Student Utilities
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every semester, millions of students search for GPA calculators, attendance tracking formulas, or marks percentages. Most websites they encounter are littered with intrusive pop-up ads, fake download buttons, unweighted arithmetic formulas that produce incorrect results, or mandatory login walls that sell student data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            The StudentKit Standard
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            StudentKit solves this by providing startup-grade tools designed with modern UX principles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Accurate Weighted Formulas</strong>
                <span className="text-xs text-slate-500">Every calculation uses exact university credit-weighted mathematics.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Zero Mandatory Accounts</strong>
                <span className="text-xs text-slate-500">Open the page and use any tool immediately without logins or passwords.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">100% Client-Side Privacy</strong>
                <span className="text-xs text-slate-500">Your study tasks, notes, and marks never leave your personal browser.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Mobile-First Responsiveness</strong>
                <span className="text-xs text-slate-500">Fast and fluid on smartphones, tablets, and desktops.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Open Roadmap &amp; Future Plans
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We are actively developing additional student tools including ATS Resume Builder, CTC In-Hand Salary Calculators, and interactive interview question banks. Have an idea for a tool that would help your college batch? Let us know!
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-colors"
            >
              <span>Suggest a New Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <AdPlaceholder slotType="banner" />
    </div>
  );
};
