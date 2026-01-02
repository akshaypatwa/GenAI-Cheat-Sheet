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
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white pb-12">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply">
         <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-b from-blue-100 to-transparent blur-3xl" />
         <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-gradient-to-t from-violet-100 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-[1800px]">
        
        {/* Header - Compact */}
        <header className="mb-8 text-center animate-fade-in-up relative flex flex-col md:flex-row justify-center md:justify-center items-center">
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 animate-gradient-x">
                GENAI CHEAT SHEET
              </span>
            </h1>

        </header>

        {/* 5-Column Grid - Optimized for density */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {CONCEPTS.map((concept, index) => (
            <div key={concept.id} className="h-full">
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