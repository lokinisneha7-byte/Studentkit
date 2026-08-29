import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { ALL_TOOLS } from '../data/toolsData';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { 
  GraduationCap, 
  Award, 
  CalendarCheck, 
  Percent, 
  Timer, 
  CheckSquare, 
  Zap, 
  Smartphone, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  BookOpen,
  Briefcase,
  Calculator,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const popularTools = ALL_TOOLS.filter((t) => t.popular);

  const faqs = [
    {
      q: 'What is StudentKit?',
      a: 'StudentKit is a free, fast, all-in-one utility web platform designed for college and university students. It brings together academic calculators (CGPA, SGPA, Attendance, Percentage) and daily productivity tools (Pomodoro Timer, Study Planner) under one simple, modern interface without ads or popups.',
    },
    {
      q: 'Is StudentKit completely free to use?',
      a: 'Yes, 100% free! Every calculator, timer, and study planning tool on StudentKit is completely accessible without any paywalls, subscriptions, or hidden charges.',
    },
    {
      q: 'Do I need to create an account or provide my email?',
      a: 'No account required. All calculations run directly in your browser, and your study planner data is saved securely in your device’s local storage. We do not store or track your personal academic details on our servers.',
    },
    {
      q: 'How is CGPA calculated on StudentKit?',
      a: 'StudentKit uses the standard university weighted credit formula: CGPA = Σ(Credit × Grade Point) / Σ(Credits). This accurately accounts for varying credit weights per subject rather than taking a simple unweighted arithmetic average.',
    },
    {
      q: 'Can I use StudentKit on my smartphone or tablet?',
      a: 'Absolutely. StudentKit is built mobile-first with high responsiveness, touch-friendly controls, and fast page loads, ensuring it runs seamlessly on phones, tablets, laptops, and desktop computers.',
    },
    {
      q: 'How does the Attendance 75% calculator work?',
      a: 'The attendance calculator checks your current attendance percentage. If you are below 75%, it calculates exactly how many consecutive upcoming classes you must attend to recover. If you are above 75%, it computes how many classes you can safely miss without dropping below your target.',
    },
  ];

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-brand-600" />;
      case 'Award': return <Award className="w-6 h-6 text-indigo-600" />;
      case 'CalendarCheck': return <CalendarCheck className="w-6 h-6 text-emerald-600" />;
      case 'Percent': return <Percent className="w-6 h-6 text-blue-600" />;
      case 'Timer': return <Timer className="w-6 h-6 text-rose-600" />;
      case 'CheckSquare': return <CheckSquare className="w-6 h-6 text-purpleBrand-600" />;
      default: return <Calculator className="w-6 h-6 text-brand-600" />;
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Everything a student needs, in one place"
        description="Calculate your grades, track attendance, plan your studies and prepare for your career — all in one place. 100% free, fast, and no account required."
        canonicalPath="/"
      />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle Background Accent Gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-100/50 via-purpleBrand-50/40 to-sky-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Free student utility suite • No login required</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Smart Tools for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purpleBrand-600">Smarter Students</span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              Calculate your grades, track attendance, plan your studies and prepare for your career — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => navigate('/calculators')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-base shadow-md shadow-brand-500/20 transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
              >
                <span>Explore Tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/cgpa-calculator')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200 shadow-2xs transition-all hover:border-slate-300"
              >
                <Calculator className="w-4 h-4 text-brand-600" />
                <span>Popular Calculators</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 10-Point & 4-Point Scales
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 75% Attendance Planner
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Client-Side Privacy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                Featured Utilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Popular Student Tools
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-lg">
                Quick, accurate, and completely client-side tools built to make college life smoother.
              </p>
            </div>

            <button
              onClick={() => navigate('/calculators')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 group transition-colors"
            >
              <span>View All Tools</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => navigate(tool.path)}
                className="group relative bg-white rounded-2xl border border-slate-200/90 p-6 shadow-subtle hover:shadow-card-hover hover:border-brand-300/80 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-brand-50 group-hover:border-brand-200/60 flex items-center justify-center transition-colors">
                      {getToolIcon(tool.icon)}
                    </div>
                    {tool.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200/60">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                  <span>Use Tool</span>
                  <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserved Clean Ad Space */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdPlaceholder slotType="banner" />
      </div>

      {/* Why StudentKit Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Why Students Love StudentKit
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Engineered with a focus on speed, privacy, accuracy, and zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle hover:shadow-card transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">⚡ Fast & Easy</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Instant calculations with live formula feedback. No heavy frameworks, clutter, or waiting times.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle hover:shadow-card transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">📱 Mobile Friendly</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Designed mobile-first with clear touch targets. Works seamlessly whether you are in class or on the bus.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle hover:shadow-card transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">🎓 Built for Students</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Tailored for college grading standards, 75% attendance criteria, and semester credit calculations.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-subtle hover:shadow-card transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">🔒 No Account Required</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                Never worry about passwords or spam. All calculations and task lists stay 100% on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-slate-100/60 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Tool Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Everything in One Place
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Explore utilities structured across your academic semesters, daily studies, and career prep.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category 1: Academic */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Academic Tools</h3>
                    <p className="text-xs text-slate-500">Grade & attendance management</p>
                  </div>
                </div>
                <div className="space-y-2.5 mt-4">
                  <button
                    onClick={() => navigate('/cgpa-calculator')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-brand-50/70 border border-slate-100 hover:border-brand-200 flex items-center justify-between text-xs font-semibold text-slate-800 transition-all"
                  >
                    <span>CGPA Calculator (Credit-Weighted)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  </button>
                  <button
                    onClick={() => navigate('/sgpa-calculator')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-brand-50/70 border border-slate-100 hover:border-brand-200 flex items-center justify-between text-xs font-semibold text-slate-800 transition-all"
                  >
                    <span>SGPA Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  </button>
                  <button
                    onClick={() => navigate('/attendance-calculator')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-brand-50/70 border border-slate-100 hover:border-brand-200 flex items-center justify-between text-xs font-semibold text-slate-800 transition-all"
                  >
                    <span>Attendance 75% Tracker & Bunk Meter</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  </button>
                  <button
                    onClick={() => navigate('/percentage-calculator')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-brand-50/70 border border-slate-100 hover:border-brand-200 flex items-center justify-between text-xs font-semibold text-slate-800 transition-all"
                  >
                    <span>Marks & Percentage Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  </button>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 4 of 4 tools active
                </span>
              </div>
            </div>

            {/* Category 2: Study Tools */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purpleBrand-50 text-purpleBrand-600 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Study Tools</h3>
                    <p className="text-xs text-slate-500">Focus & daily task tracking</p>
                  </div>
                </div>
                <div className="space-y-2.5 mt-4">
                  <button
                    onClick={() => navigate('/pomodoro-timer')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-purpleBrand-50/70 border border-slate-100 hover:border-purpleBrand-200 flex items-center justify-between text-xs font-semibold text-slate-800 transition-all"
                  >
                    <span>Pomodoro Focus Timer (25/5 intervals)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purpleBrand-600" />
                  </button>
                  <button
                    onClick={() => navigate('/study-planner')}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-purpleBrand-50/70 border border-slate-100 hover:border-purpleBrand-200 flex items-center justify-between text-xs font-semibold text-slate-800 transition-all"
                  >
                    <span>Study Task Planner (LocalStorage)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purpleBrand-600" />
                  </button>
                  <div className="w-full text-left p-3 rounded-xl bg-slate-50/50 border border-dashed border-slate-200 flex items-center justify-between text-xs font-medium text-slate-400 cursor-not-allowed">
                    <span>Formula Sheet Hub</span>
                    <span className="text-[10px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded font-semibold">Coming Soon</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2 of 3 tools active
                </span>
              </div>
            </div>

            {/* Category 3: Career Tools */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Career Tools</h3>
                    <p className="text-xs text-slate-500">Placement & job readiness</p>
                  </div>
                </div>
                <div className="space-y-2.5 mt-4">
                  <div className="w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs font-medium text-slate-700">
                    <div>
                      <span className="font-semibold text-slate-800 block">Resume Builder</span>
                      <span className="text-[11px] text-slate-400">ATS friendly templates</span>
                    </div>
                    <span className="text-[10px] bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded font-semibold">Coming Soon</span>
                  </div>
                  <div className="w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs font-medium text-slate-700">
                    <div>
                      <span className="font-semibold text-slate-800 block">Salary / In-Hand Calculator</span>
                      <span className="text-[11px] text-slate-400">CTC to take-home breakdown</span>
                    </div>
                    <span className="text-[10px] bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded font-semibold">Coming Soon</span>
                  </div>
                  <div className="w-full text-left p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs font-medium text-slate-700">
                    <div>
                      <span className="font-semibold text-slate-800 block">Interview Question Bank</span>
                      <span className="text-[11px] text-slate-400">Tech & HR practice</span>
                    </div>
                    <span className="text-[10px] bg-brand-50 text-brand-700 border border-brand-200 px-2 py-0.5 rounded font-semibold">Coming Soon</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => navigate('/career-tools')}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Preview Career Features</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Everything you need to know about using StudentKit.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:bg-slate-50/80 transition-colors"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-brand-900 via-brand-800 to-indigo-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-3">
                <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
                <span>Need a specialized calculator?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Suggest a tool or provide feedback
              </h2>
              <p className="text-sm text-brand-100 mt-2 max-w-lg leading-relaxed">
                Tell us which university formulas, grading rules, or study tools you want to see next on StudentKit.
              </p>
            </div>

            <button
              onClick={() => navigate('/contact')}
              className="shrink-0 px-6 py-3.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-100"
            >
              Send Suggestion →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
