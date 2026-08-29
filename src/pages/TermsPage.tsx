import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { BookOpen } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title="Terms of Use"
        description="Terms and conditions for utilizing the StudentKit student utility platform."
        canonicalPath="/terms"
      />

      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold mb-3">
          <BookOpen className="w-4 h-4 text-slate-600" />
          <span>Legal Terms</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-subtle space-y-6 text-sm text-slate-600 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or using StudentKit, you agree to these Terms of Use. If you disagree with any part of these terms, please do not use our utilities.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Accuracy &amp; University Rules Disclaimer</h2>
          <p>
            StudentKit calculators utilize standard mathematical formulas for CGPA, SGPA, attendance percentages, and test conversions. However, individual universities, colleges, and examination boards may apply specific rounding guidelines, grace mark policies, or alternative grade conversion multipliers. Results provided on StudentKit are for informational and planning purposes; official transcripts issued by your academic institution take ultimate precedence.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Acceptable Use</h2>
          <p>
            You agree to use StudentKit for personal academic and productivity purposes. You may not attempt to reverse engineer or disrupt the service through malicious traffic or automated abuse.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Limitation of Liability</h2>
          <p>
            StudentKit and its creators shall not be liable for any academic discrepancies, exam scheduling oversights, or admission decisions resulting from calculated approximations.
          </p>
        </div>
      </div>

      <AdPlaceholder slotType="banner" />
    </div>
  );
};
