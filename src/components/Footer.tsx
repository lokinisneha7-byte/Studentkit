import React from 'react';
import { useRouter } from '../context/RouterContext';
import { 
  GraduationCap, 
  ShieldCheck, 
  Calculator, 
  BookOpen, 
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Student<span className="text-brand-600">Kit</span>
              </span>
            </div>
            
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              StudentKit is a free, fast, and privacy-first utility platform built for college students. Calculate grades, track minimum attendance requirements, plan study routines, and boost productivity without creating an account.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 w-fit">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-side. No tracking. No login required.</span>
            </div>
          </div>

          {/* Academic Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-brand-600" />
              <span>Academic Tools</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('/cgpa-calculator')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  CGPA Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/sgpa-calculator')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  SGPA Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/attendance-calculator')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  Attendance Calculator (75%)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/percentage-calculator')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  Marks &amp; Percentage Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Study & Career Tools */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purpleBrand-600" />
              <span>Study &amp; Career</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('/pomodoro-timer')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  Pomodoro Focus Timer
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/study-planner')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  Daily Study Planner
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/career-tools')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left flex items-center gap-1"
                >
                  <span>Career Tools</span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold">Soon</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/calculators')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  All Tools Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Company / Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span>Platform</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  About StudentKit
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  Contact &amp; Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/privacy-policy')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/terms')}
                  className="text-slate-600 hover:text-brand-600 transition-colors text-left"
                >
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} StudentKit. Built for university &amp; college students worldwide.</p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigate('/privacy-policy')} className="hover:text-slate-900 transition-colors">
              Privacy
            </button>
            <span>•</span>
            <button onClick={() => navigate('/terms')} className="hover:text-slate-900 transition-colors">
              Terms
            </button>
            <span>•</span>
            <button onClick={() => navigate('/contact')} className="hover:text-slate-900 transition-colors">
              Suggest a Tool
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
