import React from 'react';
import { Subject, SUBJECTS } from '../types';

interface SubjectSelectorProps {
  onSelect: (subject: Subject) => void;
  selectedId?: string;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({ onSelect, selectedId }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h3 className="text-2xl font-bold text-slate-800 mb-8 text-center">First, choose your subject</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {SUBJECTS.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSelect(subject)}
            className={`
              group p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3
              ${selectedId === subject.id 
                ? 'border-indigo-600 bg-indigo-50 ring-4 ring-indigo-50' 
                : 'border-slate-100 bg-white hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50'
              }
            `}
          >
            <span className={`text-4xl transition-transform group-hover:scale-110`}>{subject.icon}</span>
            <span className={`font-semibold text-sm ${selectedId === subject.id ? 'text-indigo-600' : 'text-slate-600'}`}>
              {subject.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};