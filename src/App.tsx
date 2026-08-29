import React, { useState } from 'react';
import { useRouter } from './context/RouterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickSearchModal } from './components/QuickSearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { CgpaCalculatorPage } from './pages/CgpaCalculatorPage';
import { SgpaCalculatorPage } from './pages/SgpaCalculatorPage';
import { AttendanceCalculatorPage } from './pages/AttendanceCalculatorPage';
import { PercentageCalculatorPage } from './pages/PercentageCalculatorPage';
import { PomodoroTimerPage } from './pages/PomodoroTimerPage';
import { StudyPlannerPage } from './pages/StudyPlannerPage';
import { ToolsDirectoryPage } from './pages/ToolsDirectoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export const App: React.FC = () => {
  const { currentPath } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage />;
      case '/cgpa-calculator':
        return <CgpaCalculatorPage />;
      case '/sgpa-calculator':
        return <SgpaCalculatorPage />;
      case '/attendance-calculator':
        return <AttendanceCalculatorPage />;
      case '/percentage-calculator':
        return <PercentageCalculatorPage />;
      case '/pomodoro-timer':
        return <PomodoroTimerPage />;
      case '/study-planner':
        return <StudyPlannerPage />;
      case '/calculators':
        return <ToolsDirectoryPage initialCategory="all" />;
      case '/study-tools':
        return <ToolsDirectoryPage initialCategory="study" />;
      case '/career-tools':
        return <ToolsDirectoryPage initialCategory="career" />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPage />;
      case '/terms':
        return <TermsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-500 selection:text-white">
      {/* Global Navbar */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Quick Search Modal (Ctrl + K) */}
      <QuickSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};
