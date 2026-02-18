import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { FileUploader } from './components/FileUploader';
import { Dashboard } from './components/Dashboard';
import { SubjectSelector } from './components/SubjectSelector';
import { processPdfWithGemini } from './services/geminiService';
import { AppState, SummaryResult, Subject } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.HOME);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setState(AppState.SELECT_SUBJECT);
  };

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setState(AppState.UPLOADING);
  };

  const handleFileSelect = async (file: File) => {
    if (!selectedSubject) return;
    
    setState(AppState.LOADING);
    setError(null);

    try {
      const base64 = await fileToBase64(file);
      const data = await processPdfWithGemini(base64, selectedSubject.name);
      setResult(data);
      setState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while processing your file.");
      setState(AppState.ERROR);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const reset = () => {
    setState(AppState.HOME);
    setResult(null);
    setSelectedSubject(null);
    setError(null);
  };

  return (
    <Layout>
      <div className="min-h-[80vh]">
        {state === AppState.HOME && (
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold mb-6 animate-bounce">
                New: Smarter Context Analysis ✨
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                Study Smarter, <br/><span className="gradient-text">Not Harder.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Transform dense textbooks into actionable revision kits. Powered by AI, tailored by subject, designed for you.
              </p>
              
              <button 
                onClick={handleStart}
                className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 mb-20"
              >
                Start Your Revision
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  { title: "Contextual AI", desc: "Select your subject for specialized term extraction.", icon: "🎯" },
                  { title: "Visual Prep", desc: "Get curated YouTube links to master difficult topics.", icon: "🎬" },
                  { title: "Clean Layout", desc: "Beautifully organized notes that make reading easy.", icon: "✨" }
                ].map((feature, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-50 transition-all duration-500">
                    <div className="text-4xl mb-6">{feature.icon}</div>
                    <h4 className="font-bold text-slate-900 text-lg mb-3">{feature.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {state === AppState.SELECT_SUBJECT && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-500 py-12 px-4">
            <SubjectSelector onSelect={handleSubjectSelect} />
            <div className="text-center mt-8">
              <button onClick={reset} className="text-slate-400 text-sm hover:text-slate-600 font-medium transition">
                ← Go back to home
              </button>
            </div>
          </div>
        )}

        {state === AppState.UPLOADING && selectedSubject && (
          <div className="animate-in fade-in zoom-in-95 duration-500 py-20 px-4">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                 <span className="text-4xl">{selectedSubject.icon}</span>
                 <h2 className="text-3xl font-black text-slate-900">{selectedSubject.name}</h2>
              </div>
              <p className="text-slate-500">Perfect! Now upload the PDF material for {selectedSubject.name}.</p>
            </div>
            <FileUploader onFileSelect={handleFileSelect} isLoading={false} />
            <div className="text-center mt-12">
              <button onClick={() => setState(AppState.SELECT_SUBJECT)} className="text-indigo-600 text-sm font-bold hover:underline transition">
                Change Subject
              </button>
            </div>
          </div>
        )}

        {state === AppState.LOADING && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-indigo-100 rounded-full"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mt-10 mb-4 tracking-tight">AI at work...</h2>
            <p className="text-slate-500 max-w-md font-medium leading-relaxed">
              We're reading your {selectedSubject?.name} materials and crafting a concise revision kit. This will only take a moment.
            </p>
          </div>
        )}

        {state === AppState.RESULTS && result && (
          <Dashboard data={result} onReset={reset} />
        )}

        {state === AppState.ERROR && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
            <div className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center mb-8 text-rose-500">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Analysis Interrupted</h2>
            <p className="text-slate-500 mb-10 max-w-md font-medium">{error}</p>
            <button 
              onClick={reset}
              className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default App;