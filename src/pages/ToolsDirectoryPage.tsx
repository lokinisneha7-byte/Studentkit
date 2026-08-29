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
  FileText, 
  Calculator, 
  HelpCircle, 
  Search, 
  ArrowRight, 
  Sparkles, 
  X,
  Lock
} from 'lucide-react';

interface ToolsDirectoryPageProps {
  initialCategory?: 'all' | 'academic' | 'study' | 'career';
}

export const ToolsDirectoryPage: React.FC<ToolsDirectoryPageProps> = ({
  initialCategory = 'all',
}) => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'academic' | 'study' | 'career'>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTool, setPreviewTool] = useState<{
    title: string;
    desc: string;
    features: string[];
  } | null>(null);

  const filteredTools = ALL_TOOLS.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    }
    return true;
  });

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-brand-600" />;
      case 'Award': return <Award className="w-6 h-6 text-indigo-600" />;
      case 'CalendarCheck': return <CalendarCheck className="w-6 h-6 text-emerald-600" />;
      case 'Percent': return <Percent className="w-6 h-6 text-blue-600" />;
      case 'Timer': return <Timer className="w-6 h-6 text-rose-600" />;
      case 'CheckSquare': return <CheckSquare className="w-6 h-6 text-purpleBrand-600" />;
      case 'FileText': return <FileText className="w-6 h-6 text-amber-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-cyan-600" />;
      default: return <HelpCircle className="w-6 h-6 text-slate-500" />;
    }
  };

  const handleToolClick = (tool: typeof ALL_TOOLS[0]) => {
    if (tool.isFunctional) {
      navigate(tool.path);
    } else {
      // Show Preview modal
      if (tool.id === 'resume-builder') {
        setPreviewTool({
          title: 'ATS Resume Builder for Students',
          desc: 'A single-page, LaTeX-clean resume builder built for university internship drives and IT/consulting placements with zero fluff.',
          features: [
            'Single-column Harvard & Stanford template formats',
            'Pre-written action verbs & student project bullet suggestions',
            '100% private PDF export without watermark or signups',
          ],
        });
      } else if (tool.id === 'salary-calculator') {
        setPreviewTool({
          title: 'Campus CTC to In-Hand Salary Calculator',
          desc: 'Decode confusing placement offer letters by calculating actual monthly take-home salary after EPF, gratuity, and tax deductions.',
          features: [
            'Fixed base pay vs variable bonus breakdown',
            'Employee Provident Fund (EPF) and Professional Tax calculations',
            'New vs Old Tax Regime comparison for fresh graduates',
          ],
        });
      } else {
        setPreviewTool({
          title: 'Campus Interview Question Bank',
          desc: 'Curated technical, core engineering, and HR behavioral interview practice questions asked at top recruitment drives.',
          features: [
            'DSA coding patterns & system fundamentals',
            'HR Situational STAR method answer frameworks',
            'Subject-wise core engineering MCQs',
          ],
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="All Student Tools & Calculators Directory"
        description="Browse all student calculators and productivity utilities on StudentKit. CGPA, SGPA, attendance, percentage, pomodoro, study planner, and career tools."
        keywords="student calculators, all college tools, GPA tools, attendance tracker, study planner"
        canonicalPath="/calculators"
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Complete Utility Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          All Student Tools
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Everything you need for academic semesters, daily productivity, and career preparation.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="inline-flex bg-slate-200/70 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              selectedCategory === 'all'
                ? 'bg-white text-brand-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Tools
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('academic')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              selectedCategory === 'academic'
                ? 'bg-white text-brand-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Academic (4)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('study')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              selectedCategory === 'study'
                ? 'bg-white text-brand-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Study Tools (2)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('career')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
              selectedCategory === 'career'
                ? 'bg-white text-brand-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Career Tools (3)
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all tools..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-brand-500 focus:outline-hidden shadow-2xs"
          />
        </div>
      </div>

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => handleToolClick(tool)}
            className={`group relative bg-white rounded-2xl border p-6 shadow-subtle flex flex-col justify-between transition-all duration-200 cursor-pointer ${
              tool.isFunctional
                ? 'border-slate-200 hover:border-brand-300 hover:shadow-card-hover'
                : 'border-slate-200/70 hover:border-slate-300 bg-slate-50/40'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getToolIcon(tool.icon)}
                </div>
                {tool.badge && (
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      tool.isFunctional
                        ? 'bg-brand-50 text-brand-700 border-brand-200/80'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
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

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold">
              <span className={tool.isFunctional ? 'text-brand-600 group-hover:text-brand-700' : 'text-slate-500'}>
                {tool.isFunctional ? 'Open Tool' : 'Feature Preview'}
              </span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${tool.isFunctional ? 'text-brand-600' : 'text-slate-400'}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Reserved Ad Space */}
      <AdPlaceholder slotType="banner" />

      {/* Feature Preview Modal for Coming Soon Career Tools */}
      {previewTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setPreviewTool(null)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Feature in Development</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTool(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mt-4">
              {previewTool.title}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {previewTool.desc}
            </p>

            <div className="mt-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Planned Capabilities:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {previewTool.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-600 font-bold">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" /> 100% Free &amp; Client-Side
              </span>
              <button
                type="button"
                onClick={() => setPreviewTool(null)}
                className="px-5 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-700 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
