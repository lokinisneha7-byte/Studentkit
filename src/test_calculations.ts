import { 
  calculateWeightedGpa, 
  getGpaClassification, 
  calculateAttendance, 
  calculateXPercentOfY, 
  calculateXIsWhatPercentOfY, 
  calculatePercentageChange, 
  calculateMarksPercentage 
} from './utils/calculations.ts';

console.log('=== RUNNING STUDENTKIT CALCULATOR VERIFICATION SUITE ===\n');

let allPassed = true;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
    allPassed = false;
  }
}

// 1. CGPA / SGPA Weighted Calculation Test
console.log('--- 1. Testing Weighted CGPA / SGPA Calculation ---');
const sampleSubjects = [
  { id: '1', name: 'Math', credits: 4, gradePoint: 10, gradeLabel: 'O' },
  { id: '2', name: 'DSA', credits: 4, gradePoint: 9, gradeLabel: 'A+' },
  { id: '3', name: 'DBMS', credits: 3, gradePoint: 8, gradeLabel: 'A' },
  { id: '4', name: 'Networks', credits: 3, gradePoint: 9, gradeLabel: 'A+' },
  { id: '5', name: 'Lab', credits: 2, gradePoint: 10, gradeLabel: 'O' },
];

const gpaRes = calculateWeightedGpa(sampleSubjects);
assert(gpaRes.isValid === true, 'GPA calculation succeeded');
assert(gpaRes.totalCredits === 16, `Total credits calculated correctly (expected 16, got ${gpaRes.totalCredits})`);
assert(gpaRes.gpa === 9.19, `Weighted GPA calculated correctly (expected 9.19, got ${gpaRes.gpa})`);

const classification = getGpaClassification(gpaRes.gpa, '10-point');
assert(classification.label.includes('Outstanding'), `Classification assigned correctly: ${classification.label}`);

// 2. Attendance Calculations
console.log('\n--- 2. Testing Attendance Calculator ---');
// Case A: Shortage recovery
const attShortage = calculateAttendance(28, 40, 75);
assert(attShortage.currentPercentage === 70.0, `Current attendance is 70% (got ${attShortage.currentPercentage})`);
assert(attShortage.isTargetMet === false, 'Target not met identified correctly');
assert(attShortage.classesNeeded === 8, `Classes needed to reach 75% is 8 (got ${attShortage.classesNeeded})`);

// Case B: Safe bunk
const attSafe = calculateAttendance(42, 48, 75);
assert(attSafe.currentPercentage === 87.5, `Current attendance is 87.5% (got ${attSafe.currentPercentage})`);
assert(attSafe.isTargetMet === true, 'Target met identified correctly');
assert(attSafe.canBunk === 8, `Can safely bunk 8 classes (got ${attSafe.canBunk})`);

// Case C: Invalid input (attended > total)
const attInvalid = calculateAttendance(50, 40, 75);
assert(attInvalid.status === 'critical', 'Invalid input detected when attended > total');

// Case D: Target 100% when missed
const attImpossible = calculateAttendance(9, 10, 100);
assert(attImpossible.isImpossible === true, 'Impossible 100% target flagged when classes were missed');

// 3. Percentage Calculator Modes
console.log('\n--- 3. Testing Percentage Calculator Modes ---');
// Mode 1
const p1 = calculateXPercentOfY(18, 450);
assert(p1.isValid && p1.result === 81, `18% of 450 is 81 (got ${p1.result})`);

// Mode 2
const p2 = calculateXIsWhatPercentOfY(72, 80);
assert(p2.isValid && p2.result === 90, `72 is 90% of 80 (got ${p2.result}%)`);

// Mode 3
const p3 = calculatePercentageChange(60, 85);
assert(p3.isValid && p3.change === 41.67 && p3.type === 'increase', `Percentage change from 60 to 85 is +41.67% (got ${p3.change}%, type ${p3.type})`);

// Mode 4: Marks
const marksRes = calculateMarksPercentage([
  { name: 'Math', marks: 88, maxMarks: 100 },
  { name: 'Physics', marks: 76, maxMarks: 100 },
  { name: 'Chemistry', marks: 84, maxMarks: 100 },
  { name: 'CS', marks: 95, maxMarks: 100 },
  { name: 'English', marks: 80, maxMarks: 100 },
]);
assert(marksRes.isValid && marksRes.totalMarks === 423 && marksRes.percentage === 84.6, `Marks percentage is 84.6% with total 423/500 (got ${marksRes.percentage}%)`);
assert(marksRes.division === 'Distinction', `Division is Distinction (got ${marksRes.division})`);

console.log('\n=================================================');
if (allPassed) {
  console.log('🎉 ALL MATHEMATICAL & LOGICAL TESTS PASSED SUCCESSFULLY!');
} else {
  console.error('❌ SOME TESTS FAILED.');
  process.exit(1);
}
