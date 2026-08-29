import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { 
  GraduationCap, 
  Menu, 
  X, 
  Search, 
  Calculator, 
  BookOpen, 
  Briefcase, 
  Info, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const { currentPath, navigate } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Calculators', path: '/calculators', icon: Calculator },
    { label: 'Study Tools', path: '/study-tools', icon: BookOpen },
    { label: 'Career Tools', path: '/career-tools', icon: Briefcase },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80'
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <div
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-purpleBrand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                  Student<span className="text-brand-600">Kit</span>
                </span>
                <span className="hidden sm:block text-[10px] uppercase font-semibold tracking-wider text-slate-400 -mt-1">
                  Utility Platform
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNav(link.path)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'text-brand-600 bg-brand-50 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search button with keyboard shortcut */}
              <button
                onClick={onOpenSearch}
                aria-label="Search all tools"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 text-xs font-medium transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search tools...</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
                  Ctrl K
                </kbd>
              </button>

              {/* Explore Tools CTA */}
              <button
                onClick={() => handleNav('/calculators')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-sm hover:shadow-brand-500/25 transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
              >
                <span>Explore Tools</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onOpenSearch}
                aria-label="Search tools"
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-slate-900">
                    Student<span className="text-brand-600">Kit</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tagline */}
              <p className="text-xs text-slate-500 my-4 font-medium italic">
                “Everything a student needs, in one place.”
              </p>

              {/* Navigation Items */}
              <div className="space-y-1 mt-4">
                {navLinks.map((link) => {
                  const active = isActive(link.path);
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.path}
                      onClick={() => handleNav(link.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                        active
                          ? 'text-brand-600 bg-brand-50/80 font-bold shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {Icon && <Icon className={`w-4 h-4 ${active ? 'text-brand-600' : 'text-slate-400'}`} />}
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick links to top tools */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Quick Access
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => handleNav('/cgpa-calculator')}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-medium text-left transition-colors"
                  >
                    CGPA Calculator
                  </button>
                  <button
                    onClick={() => handleNav('/attendance-calculator')}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-medium text-left transition-colors"
                  >
                    Attendance 75%
                  </button>
                  <button
                    onClick={() => handleNav('/pomodoro-timer')}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-medium text-left transition-colors"
                  >
                    Pomodoro Timer
                  </button>
                  <button
                    onClick={() => handleNav('/study-planner')}
                    className="p-2.5 rounded-lg bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-600 font-medium text-left transition-colors"
                  >
                    Study Planner
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => handleNav('/calculators')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 text-white font-semibold text-sm shadow-md hover:bg-brand-700 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore All Tools</span>
              </button>
              <div className="mt-3 text-center">
                <span className="inline-block text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium border border-emerald-200">
                  🔒 100% Free & No Account Needed
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
