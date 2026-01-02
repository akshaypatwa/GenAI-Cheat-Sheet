import React from 'react';
import { Concept } from '../types';
import * as LucideIcons from 'lucide-react';
import { 
  ArrowUpRight, Lightbulb, Box, Hexagon, Orbit, Layers, 
  Triangle, Circle, Sparkles, Dna, Zap, ScanLine
} from 'lucide-react';

interface ConceptCardProps {
  concept: Concept;
  onClick: (concept: Concept) => void;
  index: number;
}

// Enhanced Color Map with specific shadow and glow classes
const colorMap: Record<string, { bg: string, text: string, border: string, glow: string, shadow: string, ring: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500', glow: 'from-blue-500', shadow: 'shadow-blue-500/30', ring: 'ring-blue-400' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500', glow: 'from-indigo-500', shadow: 'shadow-indigo-500/30', ring: 'ring-indigo-400' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-500', glow: 'from-emerald-500', shadow: 'shadow-emerald-500/30', ring: 'ring-emerald-400' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-500', glow: 'from-cyan-500', shadow: 'shadow-cyan-500/30', ring: 'ring-cyan-400' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', border: 'border-violet-500', glow: 'from-violet-500', shadow: 'shadow-violet-500/30', ring: 'ring-violet-400' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500', glow: 'from-orange-500', shadow: 'shadow-orange-500/30', ring: 'ring-orange-400' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-500', glow: 'from-pink-500', shadow: 'shadow-pink-500/30', ring: 'ring-pink-400' },
  fuchsia: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-600', border: 'border-fuchsia-500', glow: 'from-fuchsia-500', shadow: 'shadow-fuchsia-500/30', ring: 'ring-fuchsia-400' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-500', glow: 'from-teal-500', shadow: 'shadow-teal-500/30', ring: 'ring-teal-400' },
  red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-500', glow: 'from-red-500', shadow: 'shadow-red-500/30', ring: 'ring-red-400' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-500', glow: 'from-sky-500', shadow: 'shadow-sky-500/30', ring: 'ring-sky-400' },
};

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onClick, index }) => {
  const IconComponent = (LucideIcons as any)[concept.iconName] || LucideIcons.HelpCircle;
  const colors = colorMap[concept.color] || colorMap.indigo;
  
  const unifiedGradient = "from-[#4f46e5] to-[#7c3aed]";

  // Generate staggered delays based on index to prevent robotic synchronization
  const delayStyle = { animationDelay: `${index * 0.5}s` };
  const scanDelayStyle = { animationDelay: `${index * 1.2}s` };
  const borderDelayStyle = { animationDelay: `${index * 0.3}s` };

  return (
    <div 
      onClick={() => onClick(concept)}
      className={`
        animate-fade-in-up
        group relative h-full
        cursor-pointer
        rounded-[1.25rem]
        transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
        hover:-translate-y-3 hover:scale-[1.02] hover:z-20
        perspective-1000
      `}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* 
         --- Outer Glow / Halo Effect ---
         ALWAYS ON: Pulsing slowly by default
      */}
      <div 
        className={`
          absolute -inset-1 rounded-[1.5rem] bg-gradient-to-r ${unifiedGradient} 
          opacity-20 animate-pulse-slow blur-xl transition-opacity duration-700
          group-hover:opacity-60
        `} 
        style={delayStyle}
      />

      {/* 
          --- Dynamic Shadow ---
      */}
      <div className={`
          absolute inset-0 rounded-[1.25rem] bg-white 
          shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
          transition-shadow duration-500
          group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]
          ${colors.shadow.replace('shadow-', 'group-hover:shadow-')}
      `} />

      {/* 
          --- Spinning Border ---
          ALWAYS ON: Spinning continuously
      */}
      <div className="absolute inset-[-2px] overflow-hidden rounded-[1.35rem] opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <div 
           className={`
             absolute inset-[-100%] 
             bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,var(--tw-gradient-from)_360deg)] 
             ${colors.glow}
             animate-border-spin 
           `}
           style={{ ...borderDelayStyle, animationDuration: '4s' }}
        />
      </div>

      {/* 
         --- Main Card Content Container ---
      */}
      <div className="relative h-full flex flex-col bg-white rounded-[1.25rem] overflow-hidden border border-slate-100 group-hover:border-transparent transition-colors duration-300">
        
        {/* 
          --- Scanline Effect ---
          ALWAYS ON: Cyberpunk scanline moving down continuously 
        */}
        <div className="absolute inset-0 z-40 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-700 overflow-hidden rounded-[1.25rem]">
           <div 
              className="w-full h-[20%] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent animate-scan" 
              style={scanDelayStyle}
           />
        </div>

        {/* Shimmer Flash - Periodic */}
        <div className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay opacity-20 group-hover:opacity-40 transition-opacity">
           <div 
             className="absolute top-0 bottom-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-[-25deg] animate-shine"
             style={{ animationDuration: '3s', ...delayStyle }}
           />
        </div>

        {/* --- Header Section --- */}
        <div className={`
          relative w-full h-[6.5rem]
          bg-gradient-to-br ${unifiedGradient}
          p-4 flex items-center
          overflow-hidden shrink-0
          z-10
        `}>
          
          {/* 
            --- Animated Background Shapes --- 
            ALWAYS ON: Floating and spinning 
          */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {/* 1. Spinning Box */}
             <div className="absolute -top-6 -right-8 opacity-30 mix-blend-overlay">
                <Box size={120} strokeWidth={0.5} className="animate-spin-slow" />
             </div>
             {/* 2. Layers */}
             <div className="absolute bottom-0 left-0 opacity-20 mix-blend-overlay">
                <Layers size={80} strokeWidth={0.5} className="animate-float" style={delayStyle} />
             </div>
             {/* 3. Orbit */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 mix-blend-overlay">
                <Orbit size={150} strokeWidth={0.2} className="animate-spin-reverse-slow" />
             </div>
             {/* 4. Particles */}
             <div className="absolute top-2 right-[20%] opacity-50 animate-pulse">
                <Sparkles size={14} className="text-white" />
             </div>
          </div>

          {/* Category Tag */}
          <div className="absolute top-3 right-3 z-20">
              <span className={`
                inline-flex items-center px-2 py-0.5 rounded-full 
                bg-white/10 backdrop-blur-md border border-white/20
                text-[9px] font-extrabold text-white tracking-widest uppercase shadow-sm
              `}>
                 {concept.category}
              </span>
          </div>

          {/* Content: Icon + Title */}
          <div className="flex items-center gap-3.5 relative z-10 w-full">
              {/* 3D Icon Container */}
              <div 
                  className="
                      relative
                      w-12 h-12 shrink-0 rounded-xl
                      bg-gradient-to-br from-white/20 to-white/5
                      backdrop-blur-md 
                      border border-white/30
                      flex items-center justify-center
                      shadow-xl
                      group-hover:bg-white/25
                  "
              >
                  {/* Internal Glow - Always pulsing */}
                  <div className="absolute inset-0 bg-white/30 rounded-xl blur-md animate-pulse-fast" />
                  
                  <IconComponent 
                    className="relative z-10 w-6 h-6 text-white drop-shadow-md animate-wiggle-slow" 
                    strokeWidth={2.5} 
                  />
              </div>
              
              <div className="flex flex-col justify-center min-w-0 flex-1">
                 <h3 className={`
                   font-black text-white tracking-tight drop-shadow-lg uppercase
                   ${concept.title.length > 12 ? 'text-sm leading-tight' : 'text-lg leading-none'}
                 `}>
                    {concept.title}
                 </h3>
                 {/* Animated underline - Always visible width, pulses opacity */}
                 <div className="h-0.5 w-12 bg-white/50 mt-1.5 rounded-full group-hover:w-full transition-all duration-500" />
              </div>
          </div>
        </div>

        {/* --- Body Section --- */}
        <div className="p-4 flex flex-col flex-grow relative bg-white space-y-3 z-10">
          
          <div className="relative z-10">
            <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors duration-300">
              {concept.shortDefinition}
            </p>
          </div>

          {/* Example Box */}
          <div className="mt-auto pt-1">
             <div className={`
                relative overflow-hidden
                bg-slate-50 rounded-xl p-3
                border border-slate-100
                group-hover:border-${concept.color}-200
                group-hover:bg-${concept.color}-50/30
                transition-all duration-500
                flex gap-3 items-start
                shadow-sm
             `}>
                {/* Animated Accent Bar */}
                <div className={`
                  absolute left-0 top-0 bottom-0 w-1 ${colors.bg.replace('bg-', 'bg-')}-400 
                  transition-all duration-500 group-hover:w-1.5
                `} />

                <div className={`
                  mt-0.5 shrink-0 p-1.5 rounded-lg bg-white shadow-sm border border-slate-100 
                  ${colors.text}
                `}>
                   <Lightbulb className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>
                
                <div className="flex flex-col min-w-0">
                   <span className={`
                     text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5
                     transition-colors duration-300 group-hover:${colors.text}
                   `}>
                     Example
                   </span>
                   <p className="text-[11px] font-semibold text-slate-700 leading-snug group-hover:text-slate-900 transition-colors">
                       {concept.example}
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};