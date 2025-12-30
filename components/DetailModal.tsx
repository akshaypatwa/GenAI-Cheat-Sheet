import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Concept } from '../types';
import { X, Sparkles, Loader2, Copy } from 'lucide-react';

interface DetailModalProps {
  isOpen: boolean;
  concept: Concept | null;
  aiContent: string | null;
  isLoadingAi: boolean;
  onClose: () => void;
  onGenerate: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ 
  isOpen, 
  concept, 
  aiContent, 
  isLoadingAi, 
  onClose,
  onGenerate 
}) => {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !concept) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
        
        {/* Header */}
        <div className="p-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
              {concept.category}
            </span>
            <div className="flex gap-2">
                <button 
                  onClick={() => {
                     const text = `${concept.title}: ${concept.shortDefinition}\n\n${aiContent || ''}`;
                     navigator.clipboard.writeText(text);
                  }}
                  className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  title="Copy to clipboard"
                >
                    <Copy className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2.5 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
            </div>
          </div>
          
          <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">{concept.title}</h2>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">{concept.shortDefinition}</p>
        </div>

        {/* Separator */}
        <div className="h-px bg-slate-100 mx-8" />

        {/* Content Body */}
        <div className="p-8 pt-6 overflow-y-auto custom-scrollbar flex-grow bg-white">
          
          {!aiContent && !isLoadingAi && (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-5 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
                <Sparkles className="w-8 h-8 text-violet-500" />
              </div>
              <div className="max-w-xs">
                <h3 className="text-lg font-bold text-slate-900">Unlock Deep Insights</h3>
                <p className="text-slate-500 text-sm mt-1">
                  Ask Gemini to explain {concept.title} with a real-world analogy.
                </p>
              </div>
              <button 
                onClick={onGenerate}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-slate-900/20 flex items-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Analogy</span>
              </button>
            </div>
          )}

          {isLoadingAi && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
              <p className="text-slate-500 font-medium animate-pulse">Consulting Gemini...</p>
            </div>
          )}

          {aiContent && (
            <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900">
               <div className="flex items-center gap-2 mb-6 p-3 bg-violet-50 text-violet-700 rounded-xl w-fit">
                 <Sparkles className="w-5 h-5 fill-violet-200" />
                 <span className="text-sm font-bold uppercase tracking-wide">AI Generated</span>
               </div>
               <ReactMarkdown>{aiContent}</ReactMarkdown>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
