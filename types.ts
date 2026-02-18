
export interface Formula {
  equation: string;
  label: string;
  usage: string;
}

export interface SummaryResult {
  summary: string;
  keyPoints: string[];
  formulas: Formula[];
  videoSuggestions: VideoSuggestion[];
  subject?: string;
}

export interface VideoSuggestion {
  title: string;
  query: string;
  description: string;
}

export type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export enum AppState {
  HOME = 'HOME',
  SELECT_SUBJECT = 'SELECT_SUBJECT',
  UPLOADING = 'UPLOADING',
  LOADING = 'LOADING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Mathematics', icon: '📐', color: 'bg-blue-100 text-blue-600' },
  { id: 'physics', name: 'Physics', icon: '⚛️', color: 'bg-purple-100 text-purple-600' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'biology', name: 'Biology', icon: '🌿', color: 'bg-green-100 text-green-600' },
  { id: 'cs', name: 'Computer Science', icon: '💻', color: 'bg-slate-100 text-slate-600' },
  { id: 'history', name: 'History', icon: '📜', color: 'bg-amber-100 text-amber-600' },
  { id: 'economics', name: 'Economics', icon: '📈', color: 'bg-rose-100 text-rose-600' },
  { id: 'literature', name: 'Literature', icon: '📚', color: 'bg-indigo-100 text-indigo-600' },
];
