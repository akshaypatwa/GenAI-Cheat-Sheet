import React, { useState } from 'react';
import { CONCEPTS } from './constants';
import { ConceptCard } from './components/ConceptCard';
import { DetailModal } from './components/DetailModal';
import { Concept, ModalState } from './types';
import { generateAnalogy } from './services/geminiService';

const App: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    concept: null,
    aiContent: null,
    isLoadingAi: false,
  });

  const handleCardClick = (concept: Concept) => {
    setModalState({
      isOpen: true,
      concept,
      aiContent: null, // Reset content on new open
      isLoadingAi: false,
    });
  };

  const handleCloseModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleGenerateAi = async () => {
    if (!modalState.concept) return;

    setModalState(prev => ({ ...prev, isLoadingAi: true }));
    
    const content = await generateAnalogy(
      modalState.concept.title, 
      modalState.concept.shortDefinition
    );

    setModalState(prev => ({
      ...prev,
      isLoadingAi: false,
      aiContent: content
    }));
  };

  return (
    // H-SCREEN + OVERFLOW-HIDDEN: Forces single page, no scroll
    <div className="h-screen w-full bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden flex justify-center items-center relative">
      
      {/* Background Decor - Animated Blobs - Extremely Reduced Intensity (5%) */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
         <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-b from-blue-200 to-transparent blur-3xl animate-blob" />
         <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-gradient-to-t from-violet-200 to-transparent blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-100/50 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* 
         Main Container: 
         1. Max width 1000px.
         2. Max height 1200px.
         3. Flex column to stack Header + Grid.
      */}
      <div className="relative z-10 w-full max-w-[1000px] h-full max-h-[1200px] p-4 flex flex-col justify-center">
        
        {/* Header - Distinct */}
        <header className="shrink-0 mb-4 text-center animate-fade-in-up flex flex-col justify-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none uppercase flex flex-row justify-center items-baseline gap-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 animate-gradient-x drop-shadow-sm">
                GENAI CHEAT SHEET
              </span>
            </h1>
        </header>

        {/* 
           Grid - 3 Cols x 3 Rows (Perfect 9 items).
           gap-2 for tight spacing to maximize card size.
        */}
        <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-2 min-h-0">
          {CONCEPTS.map((concept, index) => (
            <div key={concept.id} className="min-h-0">
              <ConceptCard 
                concept={concept} 
                onClick={handleCardClick} 
                index={index}
              />
            </div>
          ))}
        </div>

      </div>

      <DetailModal 
        isOpen={modalState.isOpen}
        concept={modalState.concept}
        aiContent={modalState.aiContent || null}
        isLoadingAi={modalState.isLoadingAi || false}
        onClose={handleCloseModal}
        onGenerate={handleGenerateAi}
      />
    </div>
  );
};

export default App;