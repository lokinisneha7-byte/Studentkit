import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead
        title="Privacy Policy — 100% Client-Side Privacy"
        description="StudentKit Privacy Policy. Learn why we do not collect personal information, require user registration, or store your marks on external servers."
        canonicalPath="/privacy-policy"
      />

      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Zero Server Storage</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-subtle space-y-6 text-sm text-slate-600 leading-relaxed">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Overview &amp; Privacy Pledge</h2>
          <p>
            At <strong>StudentKit</strong>, privacy is not an afterthought — it is an architectural foundation. All calculation logic (CGPA, SGPA, Attendance, Percentage, Pomodoro timer) executes 100% locally in your device’s web browser. We do not require accounts, logins, or personal details to use our utilities.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Local Storage Usage</h2>
          <p>
            Certain productivity features like the <strong>Daily Study Planner</strong> and <strong>Pomodoro Timer streaks</strong> save your data in your browser’s standard <code>localStorage</code> so that your tasks remain accessible when you reopen the page. This information stays exclusively on your machine and is never transmitted to our servers.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. Zero Account &amp; Tracking Policy</h2>
          <p>
            We do not maintain user databases, do not sell academic records, and do not track individual student grades. You can clear all cached study data anytime by clearing your browser cache or clicking "Clear All Tasks" inside the study planner.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Third-Party Advertisements &amp; Links</h2>
          <p>
            To keep StudentKit 100% free forever, non-intrusive banner sponsorships or educational discount links may be displayed in designated placeholders. These services operate under their respective privacy policies.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">5. Contact</h2>
          <p>
            If you have questions regarding this policy, please reach out via our contact page.
          </p>
        </div>
      </div>

      <AdPlaceholder slotType="banner" />
    </div>
  );
};
