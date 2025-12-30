import React, { useState, useRef } from 'react';
import { CONCEPTS } from './constants';
import { ConceptCard } from './components/ConceptCard';
import { DetailModal } from './components/DetailModal';
import { Concept, ModalState } from './types';
import { generateAnalogy } from './services/geminiService';
import { Sparkles, Zap, Video, StopCircle, Download, FileVideo, Loader2 } from 'lucide-react';
import { GIFEncoder, quantize, applyPalette } from 'gifenc';

const App: React.FC = () => {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    concept: null,
    aiContent: null,
    isLoadingAi: false,
  });

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

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

  const startExport = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
            displaySurface: "browser",
            frameRate: { ideal: 24 } 
        },
        audio: false,
      });

      // Use a standard mimeType for recording first
      const mimeType = 'video/webm;codecs=vp9';
      const options = MediaRecorder.isTypeSupported(mimeType) ? { mimeType } : undefined;
      const recorder = new MediaRecorder(stream, options);

      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        setIsRecording(false);
        setRecordingTime(0);
        if (timerRef.current) clearInterval(timerRef.current);
        
        // Start processing GIF
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        await processGif(blob);
      };

      recorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = recorder;

      // Start timer
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // Handle case where user stops via browser UI
      stream.getVideoTracks()[0].onended = () => {
         if (recorder.state !== 'inactive') recorder.stop();
      };

    } catch (err) {
      console.error("Error starting recording:", err);
      setIsRecording(false);
    }
  };

  const stopExport = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  // Helper function to process video to GIF
  const processGif = async (videoBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      const videoUrl = URL.createObjectURL(videoBlob);
      const video = document.createElement('video');
      video.muted = true;
      video.src = videoUrl;
      
      await new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(true);
      });

      // GIF Config
      const width = 800; // Resized for reasonable file size
      const height = (video.videoHeight / video.videoWidth) * width;
      const fps = 10; // 10fps is standard for simple screencast GIFs
      const duration = video.duration;
      const delayMs = 1000 / fps; // 100ms
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      
      if (!ctx) throw new Error("Could not get canvas context");

      // Initialize GIF Encoder
      const gif = new GIFEncoder();
      
      // Loop through frames
      let currentTime = 0;
      
      while (currentTime < duration) {
        // Seek video
        video.currentTime = currentTime;
        await new Promise(r => { video.onseeked = r; });
        
        // Draw frame
        ctx.drawImage(video, 0, 0, width, height);
        
        // Get data
        const { data } = ctx.getImageData(0, 0, width, height);
        
        // Quantize colors (max 256 for GIF)
        const palette = quantize(data, 256);
        const index = applyPalette(data, palette);
        
        // Add frame to GIF
        gif.writeFrame(index, width, height, { palette, delay: delayMs });
        
        currentTime += (1 / fps);
        
        // Allow UI to update (non-blocking)
        await new Promise(r => setTimeout(r, 0));
      }
      
      gif.finish();
      
      // Download
      const gifBlob = new Blob([gif.bytes()], { type: 'image/gif' });
      const url = URL.createObjectURL(gifBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'genai-cheat-sheet.gif';
      a.click();
      
      URL.revokeObjectURL(url);
      URL.revokeObjectURL(videoUrl);

    } catch (e) {
      console.error("GIF Processing Error:", e);
      alert("Failed to generate GIF. Please try a shorter recording.");
    } finally {
      setIsProcessing(false);
    }
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

            {/* Export GIF Button - Absolute Top Right on Desktop, Stacked on Mobile */}
            <div className="mt-6 md:mt-0 md:absolute md:top-2 md:right-0">
                <button
                    onClick={isRecording ? stopExport : startExport}
                    disabled={isProcessing}
                    className={`
                      group flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs tracking-wide shadow-lg transition-all transform hover:scale-105 active:scale-95 border
                      ${isRecording 
                        ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' 
                        : isProcessing 
                          ? 'bg-indigo-50 text-indigo-600 border-indigo-200 cursor-wait'
                          : 'bg-white text-slate-700 hover:text-indigo-600 border-slate-200 hover:border-indigo-200'
                      }
                    `}
                >
                    {isRecording ? (
                        <>
                            <StopCircle className="w-3.5 h-3.5 text-red-500 fill-current" />
                            <span>REC ({recordingTime}s)</span>
                        </>
                    ) : isProcessing ? (
                        <>
                           <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                           <span>PROCESSING...</span>
                        </>
                    ) : (
                        <>
                            <FileVideo className="w-3.5 h-3.5 text-indigo-500" />
                            <span>EXPORT GIF</span>
                        </>
                    )}
                </button>
            </div>
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