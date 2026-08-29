import React, { useState, useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { storage } from '../utils/storage';
import { StudyTask } from '../types';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Check, 
  Clock, 
  Calendar, 
  Download, 
  Upload, 
  Printer, 
  Lock, 
  AlertCircle, 
  Search,
  Sparkles
} from 'lucide-react';

const INITIAL_SAMPLE_TASKS: StudyTask[] = [
  {
    id: '1',
    title: 'Complete Module 3 Assignment & Submit Report',
    subject: 'Data Structures',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    priority: 'high',
    category: 'assignment',
    completed: false,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    title: 'Review Chapter 4 (Eigenvalues and Fourier Series)',
    subject: 'Engineering Math',
    dueDate: new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0],
    priority: 'medium',
    category: 'revision',
    completed: false,
    createdAt: Date.now() - 7200000,
  },
  {
    id: '3',
    title: 'Prepare SQL Queries schema for Mini-Project Demo',
    subject: 'Database Systems',
    dueDate: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
    priority: 'high',
    category: 'project',
    completed: true,
    createdAt: Date.now() - 10800000,
  },
];

export const StudyPlannerPage: React.FC = () => {
  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    const saved = storage.getTasks();
    return saved.length > 0 ? saved : INITIAL_SAMPLE_TASKS;
  });

  // Modal / Form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubject, setTaskSubject] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [taskCategory, setTaskCategory] = useState<'assignment' | 'exam' | 'project' | 'revision' | 'reading'>('assignment');
  const [formError, setFormError] = useState<string | null>(null);

  // Filter states
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist tasks on change
  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) {
      setFormError('Task title is required.');
      return;
    }

    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      subject: taskSubject.trim() || 'General Studies',
      dueDate: taskDueDate || new Date().toISOString().split('T')[0],
      priority: taskPriority,
      category: taskCategory,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks([newTask, ...tasks]);
    setTaskTitle('');
    setTaskSubject('');
    setTaskDueDate('');
    setFormError(null);
    setShowAddModal(false);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `studentkit_study_plan_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed)) {
            setTasks(parsed);
          }
        } catch {
          alert('Invalid JSON file format.');
        }
      };
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filterStatus === 'pending' && t.completed) return false;
    if (filterStatus === 'completed' && !t.completed) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
    }
    return true;
  });

  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">High Priority</span>;
      case 'medium':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">Medium</span>;
      case 'low':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">Low</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEOHead
        title="Study Planner — Daily Student Task & Exam Schedule"
        description="Organize your study goals, track assignments, and plan exam revisions. 100% private in-browser storage with zero login required."
        keywords="study planner, student task manager, exam revision schedule, assignment tracker, homework planner"
        canonicalPath="/study-planner"
      />

      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purpleBrand-50 border border-purpleBrand-200 text-purpleBrand-700 text-xs font-semibold mb-3">
          <CheckSquare className="w-4 h-4 text-purpleBrand-600" />
          <span>Productivity &amp; Schedule Manager</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Daily Study Planner
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Plan assignments, track exam prep, and boost daily productivity with client-side privacy.
        </p>
      </div>

      {/* Privacy Notice Badge */}
      <div className="mb-8 p-3.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-900 font-medium">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>100% Client-Side Privacy:</strong> All your study planner tasks are saved securely inside your browser's local storage. No data ever leaves your device.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportJson}
            title="Backup tasks to JSON file"
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-300 font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Tasks</span>
            <div className="text-3xl font-black text-slate-900 mt-0.5">{tasks.length}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purpleBrand-50 text-purpleBrand-600 flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Pending Work</span>
            <div className="text-3xl font-black text-amber-600 mt-0.5">{pendingCount}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Progress Rate</span>
            <div className="text-3xl font-black text-emerald-600 mt-0.5">{progressPercent}%</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Task List Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-subtle p-6">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by task title or subject..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purpleBrand-500 focus:outline-hidden"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                  filterStatus === 'all' ? 'bg-white text-purpleBrand-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                All ({tasks.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                  filterStatus === 'pending' ? 'bg-white text-purpleBrand-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('completed')}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                  filterStatus === 'completed' ? 'bg-white text-purpleBrand-700 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Done ({completedCount})
              </button>
            </div>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as unknown as 'all' | 'low' | 'medium' | 'high')}
              className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-hidden"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            {/* Add Task Button */}
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-purpleBrand-600 hover:bg-purpleBrand-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-purpleBrand-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {/* Task List Items */}
        <div className="mt-6 space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <CheckSquare className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-base font-bold text-slate-700">No tasks found</p>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'Try clearing active search or filters.'
                  : 'Click "+ Add Task" to schedule your upcoming studies.'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  task.completed
                    ? 'bg-slate-50/60 border-slate-200/60 opacity-60'
                    : 'bg-white border-slate-200/90 hover:border-purpleBrand-300 hover:shadow-subtle'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(task.id)}
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white hover:border-purpleBrand-500'
                    }`}
                  >
                    {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>

                  <div>
                    <h3
                      className={`text-sm font-bold ${
                        task.completed ? 'line-through text-slate-500' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
                      <span className="font-semibold text-purpleBrand-700 bg-purpleBrand-50 px-2 py-0.5 rounded-md">
                        {task.subject}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {task.dueDate}
                      </span>
                      <span className="uppercase text-[10px] font-bold tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {task.category}
                      </span>
                      {getPriorityBadge(task.priority)}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteTask(task.id)}
                  title="Delete task"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportJson}
              className="hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <label className="hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => window.print()}
              className="hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Schedule</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              if (confirm('Clear all tasks from study planner?')) {
                setTasks([]);
              }
            }}
            className="text-rose-600 hover:underline"
          >
            Clear All Tasks
          </button>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Add New Study Task</h2>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Complete Operating Systems lab assignment 3"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purpleBrand-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Subject / Course
                  </label>
                  <input
                    type="text"
                    value={taskSubject}
                    onChange={(e) => setTaskSubject(e.target.value)}
                    placeholder="e.g. Operating Systems"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purpleBrand-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-purpleBrand-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden"
                  >
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam Preparation</option>
                    <option value="project">Course Project</option>
                    <option value="revision">Chapter Revision</option>
                    <option value="reading">Reading / Notes</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-purpleBrand-600 hover:bg-purpleBrand-700 text-white text-sm font-bold shadow-md"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reserved Ad Space */}
      <AdPlaceholder slotType="banner" />
    </div>
  );
};
