import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { ALL_TOOLS } from '../data/toolsData';
import { 
  Search, 
  X, 
  GraduationCap, 
  Award, 
  CalendarCheck, 
  Percent, 
  Timer, 
  CheckSquare, 
  FileText, 
  Calculator, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      tool.title.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q)
    );
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-brand-600" />;
      case 'Award': return <Award className="w-5 h-5 text-indigo-600" />;
      case 'CalendarCheck': return <CalendarCheck className="w-5 h-5 text-emerald-600" />;
      case 'Percent': return <Percent className="w-5 h-5 text-blue-600" />;
      case 'Timer': return <Timer className="w-5 h-5 text-rose-600" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-purpleBrand-600" />;
      case 'FileText': return <FileText className="w-5 h-5 text-amber-600" />;
      case 'Calculator': return <Calculator className="w-5 h-5 text-cyan-600" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a tool name (e.g. CGPA, Attendance, Pomodoro, Percentage)..."
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-400 bg-slate-200/60 rounded-md hover:bg-slate-200 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-50">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">No tools found matching "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for CGPA, Attendance, SGPA or Pomodoro.</p>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleSelect(tool.path)}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-brand-50/70 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(tool.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">
                        {tool.title}
                      </span>
                      {tool.badge && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          tool.isFunctional 
                            ? 'bg-brand-100 text-brand-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {tool.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400 group-hover:text-brand-600 transition-colors shrink-0 ml-4">
                  <span className="text-xs font-semibold hidden sm:inline">Open</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tip: Navigate using mouse or keyboard shortcuts</span>
          <span>StudentKit All-in-One Utility</span>
        </div>
      </div>
    </div>
  );
};
