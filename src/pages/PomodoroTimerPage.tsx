import React, { useState, useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { storage } from '../utils/storage';
import { soundManager } from '../utils/sound';
import { PomodoroStats } from '../types';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Flame, 
  Sparkles, 
  Coffee, 
  Brain, 
  CheckCircle2,
  BookOpen
} from 'lucide-react';

type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

const MODE_TIMES: Record<TimerMode, number> = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const PomodoroTimerPage: React.FC = () => {
  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(MODE_TIMES.focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [customFocusMin, setCustomFocusMin] = useState<number>(25);
  const [stats, setStats] = useState<PomodoroStats>(storage.getPomodoroStats);

  const timerRef = useRef<number | null>(null);

  // Total duration for progress circle
  const totalDuration = mode === 'focus' ? customFocusMin * 60 : MODE_TIMES[mode];

  // Update title with timer countdown
  useEffect(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.title = isRunning ? `(${formatted}) ${mode === 'focus' ? 'Focusing' : 'Break'} | StudentKit` : 'Pomodoro Timer | StudentKit';
  }, [timeLeft, isRunning, mode]);

  // Timer Tick
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, customFocusMin]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    if (soundEnabled) {
      soundManager.playCompletionChime();
    }

    if (mode === 'focus') {
      const updated: PomodoroStats = {
        sessionsCompleted: stats.sessionsCompleted + 1,
        totalMinutesFocused: stats.totalMinutesFocused + customFocusMin,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      setStats(updated);
      storage.savePomodoroStats(updated);

      // Transition to short break
      setMode('shortBreak');
      setTimeLeft(MODE_TIMES.shortBreak);
    } else {
      // Transition to focus
      setMode('focus');
      setTimeLeft(customFocusMin * 60);
    }
  };

  const handleModeSwitch = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'focus') {
      setTimeLeft(customFocusMin * 60);
    } else {
      setTimeLeft(MODE_TIMES[newMode]);
    }
  };

  const toggleStartPause = () => {
    soundManager.playTick();
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? customFocusMin * 60 : MODE_TIMES[mode]);
  };

  const handleSkip = () => {
    handleTimerComplete();
  };

  const handleCustomTimeChange = (mins: number) => {
    const validMins = Math.max(1, Math.min(120, mins));
    setCustomFocusMin(validMins);
    if (mode === 'focus') {
      setIsRunning(false);
      setTimeLeft(validMins * 60);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="Pomodoro Study Timer — 25/5 Interval Focus"
        description="Boost study productivity with our free Pomodoro timer. 25-minute focus intervals, audio alarms, session streaks, and zero ads."
        keywords="pomodoro timer, study timer, 25 minute timer, college study focus, pomodoro technique student"
        canonicalPath="/pomodoro-timer"
      />

      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold mb-3">
          <Timer className="w-4 h-4 text-rose-600" />
          <span>Productivity &amp; Focus Tool</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pomodoro Timer
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Supercharge your study sessions using the scientifically-backed Pomodoro Technique.
        </p>
      </div>

      {/* Main Timer Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card text-center relative overflow-hidden">
        {/* Mode Selector */}
        <div className="inline-flex bg-slate-100 p-1.5 rounded-2xl mb-8">
          <button
            type="button"
            onClick={() => handleModeSwitch('focus')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'focus'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Focus ({customFocusMin}m)</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeSwitch('shortBreak')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'shortBreak'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-4 h-4" />
            <span>Short Break (5m)</span>
          </button>

          <button
            type="button"
            onClick={() => handleModeSwitch('longBreak')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              mode === 'longBreak'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Long Break (15m)</span>
          </button>
        </div>

        {/* Large Countdown Display */}
        <div className="my-6">
          <div className="relative inline-flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-64 h-64 sm:w-72 sm:h-72 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className="stroke-slate-100"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                className={`transition-all duration-500 ease-out ${
                  mode === 'focus'
                    ? 'stroke-rose-500'
                    : mode === 'shortBreak'
                    ? 'stroke-emerald-500'
                    : 'stroke-blue-500'
                }`}
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Centered Numbers */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-xs uppercase font-bold tracking-widest text-slate-400 mt-2">
                {mode === 'focus' ? 'Deep Work Session' : 'Rest & Refresh'}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={handleReset}
            title="Reset Timer"
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={toggleStartPause}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-lg text-white shadow-lg transition-all hover:scale-105 active:scale-95 ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25'
                : mode === 'focus'
                ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25'
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            <span>{isRunning ? 'Pause' : 'Start Focus'}</span>
          </button>

          <button
            type="button"
            onClick={handleSkip}
            title="Skip Session"
            className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Toggle & Custom Minutes */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-slate-50 text-slate-400 border-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-600" /> : <VolumeX className="w-4 h-4" />}
            <span>Sound Alarm: {soundEnabled ? 'Enabled' : 'Muted'}</span>
          </button>

          {/* Custom Duration Selector */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600">Focus Duration:</span>
            {[20, 25, 30, 45, 50].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => handleCustomTimeChange(mins)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  customFocusMin === mins
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Streak Banner */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Sessions Completed
            </span>
            <div className="text-2xl font-black text-slate-900">
              {stats.sessionsCompleted} <span className="text-xs font-normal text-slate-500">intervals</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Total Deep Work
            </span>
            <div className="text-2xl font-black text-slate-900">
              {stats.totalMinutesFocused} <span className="text-xs font-normal text-slate-500">minutes focused</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reserved Ad Space */}
      <AdPlaceholder slotType="banner" />

      {/* Educational Technique Guide */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4 text-sm text-slate-600">
        <div className="flex items-center gap-2 text-rose-600 font-bold text-lg">
          <BookOpen className="w-5 h-5" />
          <h2>How to Study with the Pomodoro Technique</h2>
        </div>
        <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
          <li><strong>Pick one topic:</strong> Choose a single chapter, assignment, or coding problem.</li>
          <li><strong>Set timer for 25 mins:</strong> Work with zero distractions (phone on silent, close unrelated tabs).</li>
          <li><strong>Take a 5-min break:</strong> Stand up, hydrate, and stretch when the chime rings.</li>
          <li><strong>Repeat:</strong> After completing 4 sessions, reward yourself with a longer 15-30 minute break.</li>
        </ol>
      </div>
    </div>
  );
};
