import { StudyTask, PomodoroStats } from '../types';

const STUDY_TASKS_KEY = 'studentkit_study_tasks_v1';
const POMODORO_STATS_KEY = 'studentkit_pomo_stats_v1';

export const storage = {
  getTasks: (): StudyTask[] => {
    try {
      const data = localStorage.getItem(STUDY_TASKS_KEY);
      if (!data) return [];
      return JSON.parse(data) as StudyTask[];
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
      return [];
    }
  },

  saveTasks: (tasks: StudyTask[]) => {
    try {
      localStorage.setItem(STUDY_TASKS_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  },

  getPomodoroStats: (): PomodoroStats => {
    try {
      const data = localStorage.getItem(POMODORO_STATS_KEY);
      if (!data) {
        return {
          sessionsCompleted: 0,
          totalMinutesFocused: 0,
          lastActiveDate: new Date().toISOString().split('T')[0],
        };
      }
      return JSON.parse(data) as PomodoroStats;
    } catch (e) {
      console.error('Failed to load pomodoro stats', e);
      return {
        sessionsCompleted: 0,
        totalMinutesFocused: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
    }
  },

  savePomodoroStats: (stats: PomodoroStats) => {
    try {
      localStorage.setItem(POMODORO_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Failed to save pomodoro stats', e);
    }
  },
};
