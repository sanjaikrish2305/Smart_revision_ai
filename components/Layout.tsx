import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="text-xl font-bold tracking-tight text-slate-800">SmartRevise <span className="text-indigo-600">AI</span></span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-600 transition">Features</a>
            <a href="#" className="hover:text-indigo-600 transition">Pricing</a>
            <a href="#" className="hover:text-indigo-600 transition">Contact</a>
          </nav>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
            Get Started
          </button>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">© 2024 SmartRevise AI. Powered by Google Gemini 3.</p>
          <p className="mt-2 text-xs opacity-50 italic">Making education accessible through artificial intelligence.</p>
        </div>
      </footer>
    </div>
  );
};