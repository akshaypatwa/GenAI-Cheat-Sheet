import React from 'react';
import { Concept } from '../types';
import * as LucideIcons from 'lucide-react';
import { 
  ArrowUpRight, Lightbulb, Box, Hexagon, Orbit, Layers, 
  Triangle, Circle, Sparkles, Dna, Zap 
} from 'lucide-react';

interface ConceptCardProps {
  concept: Concept;
  onClick: (concept: Concept) => void;
  index: number;
}

// Map color names to actual tailwind classes for the accent borders/icons
const colorMap: Record<string, { bg: string, text: string, border: string, glow: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-500', glow: 'from-blue-500' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-500', glow: 'from-indigo-500' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-500', glow: 'from-emerald-500' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-cyan-500', glow: 'from-cyan-500' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', border: 'border-violet-500', glow: 'from-violet-500' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-500', glow: 'from-orange-500' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-500', glow: 'from-pink-500' },
  fuchsia: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-600', border: 'border-fuchsia-500', glow: 'from-fuchsia-500' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-500', glow: 'from-teal-500' },
  red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-500', glow: 'from-red-500' },
  lime: { bg: 'bg-lime-100', text: 'text-lime-600', border: 'border-lime-500', glow: 'from-lime-500' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-500', glow: 'from-yellow-500' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'border-sky-500', glow: 'from-sky-500' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-600', border: 'border-rose-500', glow: 'from-rose-500' },
};

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onClick, index }) => {
  const IconComponent = (LucideIcons as any)[concept.iconName] || LucideIcons.HelpCircle;
  const colors = colorMap[concept.color] || colorMap.indigo;
  
  // Unified gradient for consistent header
  const unifiedGradient = "from-[#4f46e5] to-[#7c3aed]";

  return (
    <div 
      onClick={() => onClick(concept)}
      style={{ animationDelay: `${index * 80}ms` }}
      className="
        animate-fade-in-up
        group relative h-full
        cursor-pointer
        rounded-[1.25rem]
        /* BOLD BORDER STROKE - Slightly reduced to 3px to match scale */
        p-[3.5px]
        overflow-hidden
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
        hover:shadow-[0_25px_50px_-12px_rgba(79,70,229,0.25)]
        transition-all duration-300
        hover:-translate-y-2
      "
    >
      {/* 
          INNOVATIVE BORDER EFFECT:
          Layer 1: Static base border (slate-200) so it's not invisible by default 
      */}
      <div className="absolute inset-0 bg-slate-200 rounded-[1.25rem]" />

      {/* 
          Layer 2: Spinning Gradient Beam ("Aurora Border")
          - Uses conic-gradient to create a rotating beam
          - Matches the concept color
      */}
      <div className="absolute inset-[-50%] overflow-hidden rounded-[1.25rem]">
        <div 
           className={`
             absolute inset-0 
             bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,var(--tw-gradient-from)_360deg)] 
             ${colors.glow}
             animate-border-spin 
             opacity-60 group-hover:opacity-100 
             transition-opacity duration-500
           `}
        />
      </div>

      {/* 
         Layer 3: The actual card content.
         It sits on top of the spinning border, with a slight margin to reveal the border underneath.
         We use h-full to fill the container.
      */}
      <div className="relative h-full flex flex-col bg-white rounded-[calc(1.25rem-3.5px)] overflow-hidden">
        
        {/* 0. Continuous Shimmer Effect Inside the Card */}
        <div 
          className="absolute inset-0 -translate-x-[150%] skew-x-[-25deg] animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent z-30 pointer-events-none mix-blend-overlay" 
          style={{ animationDelay: `${(index % 3) * 2}s` }}
        />

        {/* --- Header Section (SCALED DOWN) --- */}
        <div className={`
          relative w-full h-[6rem]
          bg-gradient-to-br ${unifiedGradient}
          p-3.5 flex items-center
          overflow-hidden shrink-0
          z-10
        `}>
          
          {/* --- 3D Background Elements (Scaled Down by ~20%) --- */}
          
          {/* 1. Large Spinning Box (Top Right) */}
          <div className="absolute -top-5 -right-8 opacity-30 animate-spin-slow mix-blend-overlay perspective-1000">
             <Box size={110} strokeWidth={0.5} className="transform rotate-x-12" />
          </div>

          {/* 2. Large Orbit (Bottom Left) */}
          <div className="absolute -bottom-6 -left-6 opacity-25 animate-spin-slow duration-[40s] mix-blend-overlay">
             <Orbit size={100} strokeWidth={0.5} />
          </div>

          {/* 3. Floating Hexagon (Middle Right) */}
          <div className="absolute top-[25%] right-[25%] opacity-20 animate-float-slow mix-blend-overlay">
              <Hexagon size={40} strokeWidth={1} />
          </div>
          
          {/* 4. Rotating Triangle (Top Left) */}
          <div className="absolute -top-3 left-8 opacity-20 animate-spin-reverse-slow mix-blend-overlay" style={{ animationDuration: '20s' }}>
              <Triangle size={70} strokeWidth={0.5} className="text-white" />
          </div>

          {/* 5. DNA Helix (Bottom Right) */}
          <div className="absolute bottom-[-8px] right-6 opacity-20 animate-pulse-slow mix-blend-overlay" style={{ animationDuration: '8s' }}>
              <Dna size={75} strokeWidth={0.5} className="rotate-[-15deg]" />
          </div>

          {/* 6. Floating Layers (Bottom Left - Deep) */}
          <div className="absolute top-[60%] left-[-8px] opacity-15 animate-float mix-blend-overlay" style={{ animationDelay: '1.5s' }}>
             <Layers size={60} strokeWidth={0.5} className="rotate-12" />
          </div>

          {/* 7. Sparkle Particles (Scattered) */}
          <div className="absolute top-4 left-[35%] opacity-40 animate-pulse mix-blend-overlay">
              <Sparkles size={12} strokeWidth={2} />
          </div>
           <div className="absolute bottom-6 right-[40%] opacity-30 animate-pulse mix-blend-overlay" style={{ animationDelay: '2s' }}>
              <Circle size={6} fill="currentColor" className="text-white/80" />
          </div>
          <div className="absolute top-8 right-[10%] opacity-20 animate-spin-slow mix-blend-overlay" style={{ animationDuration: '3s' }}>
              <Zap size={10} strokeWidth={2} />
          </div>


          {/* Top Right: Category Tag (Smaller font) */}
          <div className="absolute top-2.5 right-2.5 z-20">
              <span className="
                inline-flex items-center px-1.5 py-0.5 rounded-full 
                bg-white/10 backdrop-blur-md border border-white/20
                text-[8px] font-extrabold text-white tracking-widest uppercase shadow-sm
                group-hover:bg-white/20 transition-colors
              ">
                 {concept.category}
                 <ArrowUpRight className="ml-0.5 w-2 h-2 text-white/80" />
              </span>
          </div>

          {/* Main Header Content: 3D Floating Icon + Title */}
          <div className="flex items-center gap-3 relative z-10 w-full">
              {/* 3D Glass Icon Container (Scaled) */}
              <div 
                  className="
                      relative
                      w-12 h-12 shrink-0 rounded-xl
                      bg-gradient-to-br from-white/30 to-white/5
                      backdrop-blur-md 
                      border-t border-l border-white/50 border-b border-r border-transparent
                      flex items-center justify-center
                      shadow-xl
                      animate-float-slow
                  "
              >
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-white/10 rounded-xl blur-sm animate-pulse-slow" />
                  
                  {/* Icon with continuous wiggle (Scaled) */}
                  <IconComponent 
                    className="relative z-10 w-6 h-6 text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)] animate-wiggle-slow" 
                    strokeWidth={2.5} 
                  />
              </div>
              
              <div className="flex flex-col justify-center min-w-0 flex-1">
                 {/* UPPERCASE TITLE (Smaller) */}
                 <h3 className={`
                   font-black text-white tracking-tight drop-shadow-md pr-1 uppercase
                   ${concept.title.length > 12 ? 'text-base leading-snug' : 'text-lg leading-none'}
                 `}>
                    {concept.title}
                 </h3>
                 {/* Decorative line below title */}
                 <div className="h-0.5 w-6 bg-white/40 mt-1.5 rounded-full animate-pulse-slow" />
              </div>
          </div>
        </div>

        {/* --- Body Section (Scaled) --- */}
        <div className="p-3.5 flex flex-col flex-grow relative bg-white space-y-3">
          
          {/* Definition (Smaller text) */}
          <div className="relative z-10">
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed line-clamp-3">
              {concept.shortDefinition}
            </p>
          </div>

          {/* Example - Insight Card Style */}
          <div className="mt-auto pt-1">
             <div className={`
                relative overflow-hidden
                bg-slate-50/80 rounded-lg p-2.5
                border border-slate-100
                hover:border-${concept.color}-200
                transition-all duration-300
                flex gap-2.5 items-start
             `}>
                {/* Colorful Accent Left Border */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg.replace('bg-', 'bg-')}-400/50`} />

                <div className={`mt-0.5 shrink-0 p-1 rounded-md bg-white shadow-sm border border-slate-100 ${colors.text}`}>
                   <Lightbulb className="w-3 h-3" strokeWidth={2.5} />
                </div>
                
                <div className="flex flex-col min-w-0">
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Example</span>
                   <p className="text-[10px] font-semibold text-slate-700 leading-snug">
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