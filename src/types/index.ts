export type GradeScale = '10-point' | '4-point';

export interface SubjectRow {
  id: string;
  name: string;
  credits: number;
  gradePoint: number;
  gradeLabel: string;
}

export interface GradeOption {
  label: string;
  points: number;
  description: string;
}

export interface AttendanceResult {
  currentPercentage: number;
  status: 'safe' | 'warning' | 'critical';
  statusText: string;
  target: number;
  classesNeeded: number;
  canBunk: number;
  isTargetMet: boolean;
  message: string;
  isImpossible?: boolean;
}

export interface SubjectAttendance {
  id: string;
  name: string;
  attended: number;
  total: number;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  category: 'assignment' | 'exam' | 'project' | 'revision' | 'reading';
  completed: boolean;
  createdAt: number;
}

export interface PomodoroStats {
  sessionsCompleted: number;
  totalMinutesFocused: number;
  lastActiveDate: string;
}

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  path: string;
  category: 'academic' | 'study' | 'career';
  icon: string;
  isFunctional: boolean;
  badge?: string;
  popular?: boolean;
}
