import { SubjectRow, GradeOption, AttendanceResult } from '../types';

export const STANDARD_GRADES: GradeOption[] = [
  { label: 'O (Outstanding)', points: 10, description: 'Marks >= 90%' },
  { label: 'A+ (Excellent)', points: 9, description: 'Marks 80-89%' },
  { label: 'A (Very Good)', points: 8, description: 'Marks 70-79%' },
  { label: 'B+ (Good)', points: 7, description: 'Marks 60-69%' },
  { label: 'B (Above Average)', points: 6, description: 'Marks 55-59%' },
  { label: 'C (Average)', points: 5, description: 'Marks 50-54%' },
  { label: 'P (Pass)', points: 4, description: 'Marks 40-49%' },
  { label: 'F (Fail)', points: 0, description: 'Marks < 40%' },
];

export const FOUR_POINT_GRADES: GradeOption[] = [
  { label: 'A (4.0)', points: 4.0, description: '90-100%' },
  { label: 'A- (3.7)', points: 3.7, description: '85-89%' },
  { label: 'B+ (3.3)', points: 3.3, description: '80-84%' },
  { label: 'B (3.0)', points: 3.0, description: '75-79%' },
  { label: 'B- (2.7)', points: 2.7, description: '70-74%' },
  { label: 'C+ (2.3)', points: 2.3, description: '65-69%' },
  { label: 'C (2.0)', points: 2.0, description: '60-64%' },
  { label: 'D (1.0)', points: 1.0, description: '50-59%' },
  { label: 'F (0.0)', points: 0.0, description: 'Below 50%' },
];

/**
 * Calculates weighted GPA = Σ(Credit × Grade Point) / Σ(Credits)
 */
export function calculateWeightedGpa(subjects: SubjectRow[]): {
  gpa: number;
  totalCredits: number;
  totalPoints: number;
  isValid: boolean;
  error?: string;
} {
  if (!subjects || subjects.length === 0) {
    return { gpa: 0, totalCredits: 0, totalPoints: 0, isValid: false, error: 'Add at least one subject.' };
  }

  let totalCredits = 0;
  let totalWeightedPoints = 0;

  for (const sub of subjects) {
    const credits = Number(sub.credits);
    const points = Number(sub.gradePoint);

    if (isNaN(credits) || credits <= 0) {
      return { gpa: 0, totalCredits: 0, totalPoints: 0, isValid: false, error: `Invalid credits for "${sub.name || 'Subject'}". Credits must be greater than 0.` };
    }
    if (isNaN(points) || points < 0) {
      return { gpa: 0, totalCredits: 0, totalPoints: 0, isValid: false, error: `Invalid grade points for "${sub.name || 'Subject'}".` };
    }

    totalCredits += credits;
    totalWeightedPoints += credits * points;
  }

  if (totalCredits === 0) {
    return { gpa: 0, totalCredits: 0, totalPoints: 0, isValid: false, error: 'Total credits cannot be zero.' };
  }

  const gpa = Number((totalWeightedPoints / totalCredits).toFixed(2));
  return {
    gpa,
    totalCredits,
    totalPoints: Number(totalWeightedPoints.toFixed(2)),
    isValid: true,
  };
}

/**
 * Get performance description based on 10-point CGPA
 */
export function getGpaClassification(gpa: number, scale: '10-point' | '4-point' = '10-point'): {
  label: string;
  badgeColor: string;
  description: string;
} {
  if (scale === '10-point') {
    if (gpa >= 9.0) return { label: 'Outstanding (First Class with Distinction)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', description: 'Top academic tier! Eligible for most honors and competitive placements.' };
    if (gpa >= 8.0) return { label: 'Excellent (First Class with Distinction)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300', description: 'Strong academic standing. Meets eligibility for almost all campus drives.' };
    if (gpa >= 7.0) return { label: 'Very Good (First Class)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300', description: 'Good performance. Clear first-class standing.' };
    if (gpa >= 6.0) return { label: 'Good (Second Class)', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300', description: 'Above average. Meets minimum criteria for many graduate programs.' };
    if (gpa >= 5.0) return { label: 'Average (Pass Class)', badgeColor: 'bg-orange-100 text-orange-800 border-orange-300', description: 'Passing grade. Consider focusing on core subjects to boost next semester.' };
    return { label: 'Needs Improvement / Reappear', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300', description: 'Below required benchmark. Backlogs or low scores may need reappearance.' };
  } else {
    if (gpa >= 3.7) return { label: 'Summa Cum Laude (High Honors)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', description: 'Outstanding achievement.' };
    if (gpa >= 3.3) return { label: 'Magna Cum Laude (Honors)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300', description: 'Excellent performance.' };
    if (gpa >= 3.0) return { label: 'Cum Laude (Good Standing)', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300', description: 'Good academic standing.' };
    if (gpa >= 2.0) return { label: 'Satisfactory', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300', description: 'Meets minimum graduation requirement.' };
    return { label: 'Academic Probation Risk', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300', description: 'Below standard academic minimum.' };
  }
}

/**
 * Attendance calculation logic
 */
export function calculateAttendance(
  attended: number,
  total: number,
  targetPercentage: number = 75
): AttendanceResult {
  // Validate inputs
  if (isNaN(attended) || isNaN(total) || isNaN(targetPercentage)) {
    return {
      currentPercentage: 0,
      status: 'critical',
      statusText: 'Invalid Input',
      target: targetPercentage,
      classesNeeded: 0,
      canBunk: 0,
      isTargetMet: false,
      message: 'Please enter valid numerical values.',
    };
  }

  if (attended < 0 || total < 0 || targetPercentage <= 0 || targetPercentage > 100) {
    return {
      currentPercentage: 0,
      status: 'critical',
      statusText: 'Out of Range',
      target: targetPercentage,
      classesNeeded: 0,
      canBunk: 0,
      isTargetMet: false,
      message: 'Values must be non-negative and target percentage must be between 1% and 100%.',
    };
  }

  if (attended > total) {
    return {
      currentPercentage: 0,
      status: 'critical',
      statusText: 'Invalid Data',
      target: targetPercentage,
      classesNeeded: 0,
      canBunk: 0,
      isTargetMet: false,
      message: 'Attended classes cannot be greater than total classes held.',
    };
  }

  if (total === 0) {
    return {
      currentPercentage: 0,
      status: 'warning',
      statusText: 'No Classes Yet',
      target: targetPercentage,
      classesNeeded: 0,
      canBunk: 0,
      isTargetMet: false,
      message: 'No classes have been conducted yet.',
    };
  }

  const currentPercentage = Number(((attended / total) * 100).toFixed(2));
  const isTargetMet = currentPercentage >= targetPercentage;

  let status: 'safe' | 'warning' | 'critical' = 'safe';
  let statusText = 'Safe Zone';

  if (currentPercentage >= targetPercentage) {
    status = 'safe';
    statusText = 'On Track';
  } else if (currentPercentage >= targetPercentage - 10) {
    status = 'warning';
    statusText = 'Warning Zone';
  } else {
    status = 'critical';
    statusText = 'Shortage Alert';
  }

  let classesNeeded = 0;
  let canBunk = 0;
  let isImpossible = false;
  let message = '';

  if (!isTargetMet) {
    if (targetPercentage >= 100) {
      if (attended < total) {
        isImpossible = true;
        message = `You have already missed ${total - attended} class(es). It is mathematically impossible to reach 100% attendance this semester.`;
      } else {
        classesNeeded = 0;
        message = 'You are currently at 100% attendance.';
      }
    } else {
      // Formula: (attended + N) / (total + N) >= T / 100
      // 100(attended + N) >= T(total + N)
      // N(100 - T) >= T * total - 100 * attended
      // N = ceil((T * total - 100 * attended) / (100 - T))
      const numerator = targetPercentage * total - 100 * attended;
      const denominator = 100 - targetPercentage;
      classesNeeded = Math.ceil(numerator / denominator);
      if (classesNeeded < 0) classesNeeded = 0;
      message = `You need to attend the next ${classesNeeded} consecutive class${classesNeeded === 1 ? '' : 'es'} without missing any to reach ${targetPercentage}% attendance.`;
    }
  } else {
    if (targetPercentage <= 0) {
      canBunk = 999;
      message = 'Target percentage is 0%. You can skip upcoming classes.';
    } else {
      // Formula: attended / (total + M) >= T / 100
      // 100 * attended >= T * total + T * M
      // T * M <= 100 * attended - T * total
      // M = floor((100 * attended - T * total) / T)
      const numerator = 100 * attended - targetPercentage * total;
      canBunk = Math.floor(numerator / targetPercentage);
      if (canBunk < 0) canBunk = 0;

      if (canBunk === 0) {
        message = `You are just at your target (${targetPercentage}%). Do not miss the next class to avoid dropping into shortage!`;
      } else {
        message = `You can safely miss up to ${canBunk} upcoming class${canBunk === 1 ? '' : 'es'} and still maintain at least ${targetPercentage}% attendance.`;
      }
    }
  }

  return {
    currentPercentage,
    status,
    statusText,
    target: targetPercentage,
    classesNeeded,
    canBunk,
    isTargetMet,
    message,
    isImpossible,
  };
}

/**
 * Percentage calculation functions
 */
export function calculateXPercentOfY(x: number, y: number): { result: number; formula: string; isValid: boolean; error?: string } {
  if (isNaN(x) || isNaN(y)) return { result: 0, formula: '', isValid: false, error: 'Enter valid numbers.' };
  const result = Number(((x * y) / 100).toFixed(4));
  return {
    result,
    formula: `(${x} × ${y}) / 100 = ${result}`,
    isValid: true,
  };
}

export function calculateXIsWhatPercentOfY(x: number, y: number): { result: number; formula: string; isValid: boolean; error?: string } {
  if (isNaN(x) || isNaN(y)) return { result: 0, formula: '', isValid: false, error: 'Enter valid numbers.' };
  if (y === 0) return { result: 0, formula: '', isValid: false, error: 'Division by zero: Total value (Y) cannot be 0.' };
  const result = Number(((x / y) * 100).toFixed(4));
  return {
    result,
    formula: `(${x} / ${y}) × 100 = ${result}%`,
    isValid: true,
  };
}

export function calculatePercentageChange(fromVal: number, toVal: number): {
  change: number;
  type: 'increase' | 'decrease' | 'no-change';
  difference: number;
  formula: string;
  isValid: boolean;
  error?: string;
} {
  if (isNaN(fromVal) || isNaN(toVal)) return { change: 0, type: 'no-change', difference: 0, formula: '', isValid: false, error: 'Enter valid numbers.' };
  if (fromVal === 0) return { change: 0, type: 'no-change', difference: 0, formula: '', isValid: false, error: 'Initial value cannot be zero for percentage change calculation.' };

  const diff = toVal - fromVal;
  const change = Number((Math.abs(diff / fromVal) * 100).toFixed(2));
  const type = diff > 0 ? 'increase' : diff < 0 ? 'decrease' : 'no-change';

  return {
    change,
    type,
    difference: Number(diff.toFixed(2)),
    formula: `|${toVal} - ${fromVal}| / |${fromVal}| × 100 = ${change}% ${type}`,
    isValid: true,
  };
}

export function calculateMarksPercentage(subjects: Array<{ name: string; marks: number; maxMarks: number }>): {
  totalMarks: number;
  totalMaxMarks: number;
  percentage: number;
  division: string;
  isValid: boolean;
  error?: string;
} {
  if (!subjects || subjects.length === 0) return { totalMarks: 0, totalMaxMarks: 0, percentage: 0, division: '', isValid: false, error: 'Add at least one subject.' };

  let totalMarks = 0;
  let totalMaxMarks = 0;

  for (const s of subjects) {
    const m = Number(s.marks);
    const max = Number(s.maxMarks);

    if (isNaN(m) || m < 0) return { totalMarks: 0, totalMaxMarks: 0, percentage: 0, division: '', isValid: false, error: `Invalid marks for ${s.name || 'Subject'}. Marks cannot be negative.` };
    if (isNaN(max) || max <= 0) return { totalMarks: 0, totalMaxMarks: 0, percentage: 0, division: '', isValid: false, error: `Max marks for ${s.name || 'Subject'} must be greater than 0.` };
    if (m > max) return { totalMarks: 0, totalMaxMarks: 0, percentage: 0, division: '', isValid: false, error: `Marks obtained (${m}) cannot be greater than Maximum marks (${max}) for ${s.name || 'Subject'}.` };

    totalMarks += m;
    totalMaxMarks += max;
  }

  if (totalMaxMarks === 0) return { totalMarks: 0, totalMaxMarks: 0, percentage: 0, division: '', isValid: false, error: 'Total maximum marks cannot be zero.' };

  const percentage = Number(((totalMarks / totalMaxMarks) * 100).toFixed(2));
  let division = 'Distinction (First Class with Distinction)';
  if (percentage >= 75) division = 'Distinction';
  else if (percentage >= 60) division = 'First Division / First Class';
  else if (percentage >= 50) division = 'Second Division / Second Class';
  else if (percentage >= 40) division = 'Third Division / Pass';
  else division = 'Needs Improvement / Fail';

  return {
    totalMarks,
    totalMaxMarks,
    percentage,
    division,
    isValid: true,
  };
}
