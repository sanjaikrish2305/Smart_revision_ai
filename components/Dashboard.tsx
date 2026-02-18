
import React from 'react';
import { SummaryResult, SUBJECTS } from '../types';

interface DashboardProps {
  data: SummaryResult;
  onReset: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  const subjectIcon = SUBJECTS.find(s => s.name === data.subject)?.icon || '📚';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-3xl">
              {subjectIcon}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Selected Subject</span>
              <span className="text-lg font-bold text-slate-800">{data.subject}</span>
            </div>
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">Your Smart Revision Kit</h2>
        </div>
        <button 
          onClick={onReset}
          className="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all flex items-center gap-2 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Upload New Material
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Summary & Key Points */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-indigo-100/30 transition-colors"></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              Master Summary
            </h3>
            <div className="prose prose-indigo max-w-none text-slate-600 leading-relaxed text-lg font-medium whitespace-pre-wrap">
              {data.summary}
            </div>
          </section>

          <section className="bg-white p-10 rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80">
            <h3 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </span>
              Core Concepts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.keyPoints.map((point, idx) => (
                <div key={idx} className="flex gap-4 p-6 bg-slate-50/50 rounded-3xl text-slate-700 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-50/40 transition-all duration-300">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 font-bold text-sm flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-slate-700">{point}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Visual Learning */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="p-2 bg-rose-50 rounded-xl">
                <svg className="w-6 h-6 text-rose-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>
              </div>
              Recommended Learning
            </h3>
            <div className="space-y-4">
              {data.videoSuggestions.map((video, idx) => (
                <a 
                  key={idx} 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100 group-hover:border-indigo-500 group-hover:bg-indigo-50/50 transition-all">
                    <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-indigo-600">{video.title}</h4>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed font-medium">{video.description}</p>
                    <div className="flex items-center gap-2 text-indigo-500 font-bold text-[10px] uppercase tracking-widest">
                      Stream Resource
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Full Width Formula Section */}
      <section className="pt-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-slate-200 flex-grow"></div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </span>
            Formula & Framework Guide
          </h3>
          <div className="h-px bg-slate-200 flex-grow"></div>
        </div>

        {data.formulas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.formulas.map((item, idx) => (
              <div key={idx} className="formula-card bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group">
                <div className="w-full h-24 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border border-slate-100 group-hover:bg-white transition-colors">
                  <div className="math-font text-xl text-slate-800 font-medium tracking-tight px-4">
                    {item.equation}
                  </div>
                </div>
                <h4 className="text-indigo-600 font-black text-xs uppercase tracking-widest mb-2">{item.label}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed italic">"{item.usage}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 p-12 rounded-[3rem] text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium italic">No major formulas or rules were detected in this specific document segment.</p>
          </div>
        )}
      </section>
    </div>
  );
};
