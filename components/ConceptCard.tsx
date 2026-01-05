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

  // Delays for staggering animations
  const fadeDelay = { animationDelay: `${index * 80}ms` };
  
  // Randomize some delays slightly for organic feel
  const scanDelayStyle = { animationDelay: `${index * 1.2}s` };
  const borderDelayStyle = { animationDelay: `${index * 0.3}s` };
  const shineDelayStyle = { animationDelay: `${2 + index * 0.5}s` };

  return (
    // Outer wrapper handles the Entrance Animation (Fade In)
    <div 
      className="animate-fade-in-up h-full perspective-1000"
      style={fadeDelay}
    >
      {/* Inner wrapper */}
      <div 
        onClick={() => onClick(concept)}
        className={`
          group relative w-full h-full
          cursor-pointer rounded-2xl
          transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          hover:scale-[1.03] hover:z-20
        `}
      >
        {/* Ambient Background Glow - Always Visible & Pulsing */}
        <div 
          className={`
             absolute -inset-[3px] rounded-2xl bg-gradient-to-r ${unifiedGradient} 
             blur-xl animate-glow-pulse 
             transition-opacity duration-500 group-hover:opacity-70 group-hover:blur-2xl
          `} 
        />

        {/* Shadow */}
        <div className={`
            absolute inset-0 rounded-2xl bg-white 
            shadow-md transition-shadow duration-500
            group-hover:shadow-xl
            ${colors.shadow.replace('shadow-', 'group-hover:shadow-')}
        `} />

        {/* Spinning Border */}
        <div className="absolute inset-[-1px] overflow-hidden rounded-[1.1rem] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
          <div 
             className={`absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,var(--tw-gradient-from)_360deg)] ${colors.glow} animate-border-spin`}
             style={{ ...borderDelayStyle, animationDuration: '4s' }}
          />
        </div>

        {/* Content Container */}
        <div className="relative h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 group-hover:border-transparent transition-colors duration-300">
          
          {/* Continuous Scanline */}
          <div className="absolute inset-0 z-40 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700 overflow-hidden rounded-2xl">
             <div className="w-full h-[20%] bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent animate-scan" style={scanDelayStyle} />
          </div>

          {/* Periodic Shine Sweep */}
          <div className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay opacity-30">
             <div className="absolute top-0 bottom-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-[-25deg] animate-shine-sweep" style={shineDelayStyle} />
          </div>

          {/* --- Top: Header (Dynamic Height) --- */}
          <div className={`
            relative w-full basis-[35%] grow-0 shrink-0
            bg-gradient-to-br ${unifiedGradient} bg-[length:200%_200%] animate-gradient-xy
            px-3 py-2.5 flex items-center
            overflow-hidden z-10
          `}>
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
               <div className="absolute -top-4 -right-4 opacity-50"><Box size={60} strokeWidth={0.5} className="text-white animate-spin-slow" /></div>
               <div className="absolute bottom-0 left-0 opacity-40"><Layers size={40} strokeWidth={0.5} className="text-white animate-float" /></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"><Orbit size={80} strokeWidth={0.2} className="text-white animate-spin-reverse-slow" /></div>
            </div>

            <div className="absolute top-2.5 right-2.5 z-20">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[8px] font-extrabold text-white tracking-widest uppercase shadow-sm">
                   {concept.category}
                </span>
            </div>

            <div className="flex items-center gap-2.5 relative z-10 w-full mt-1">
                {/* 3D Icon Container */}
                <div className="perspective-500 relative w-9 h-9 shrink-0 flex items-center justify-center">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-md group-hover:bg-white/25 preserve-3d animate-icon-3d">
                        <div className="absolute inset-0 bg-white/30 rounded-xl blur-md animate-pulse-fast" style={{transform: 'translateZ(-5px)'}} />
                        <IconComponent className="relative z-10 w-4.5 h-4.5 text-white drop-shadow-md" strokeWidth={2.5} style={{transform: 'translateZ(10px)'}} />
                    </div>
                </div>

                <div className="flex flex-col justify-center min-w-0 flex-1">
                   <h3 className={`font-black text-white tracking-tight drop-shadow-lg uppercase leading-none ${concept.title.length > 10 ? 'text-lg' : 'text-2xl'}`}>
                      {concept.title}
                   </h3>
                   <div className="h-0.5 w-6 bg-white/50 mt-1.5 rounded-full group-hover:w-full transition-all duration-500" />
                </div>
            </div>
          </div>

          {/* --- Middle: Definition (Flexible) --- */}
          <div className="px-3 py-1.5 flex flex-col flex-1 relative bg-white z-10 min-h-0 justify-center">
              <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-4 group-hover:text-slate-700 transition-colors duration-300">
                {concept.shortDefinition}
              </p>
          </div>

          {/* --- Bottom: Example (Fixed Bottom) --- */}
          <div className="px-3 pb-2.5 pt-0 shrink-0 bg-white z-10">
               <div className={`
                  relative overflow-hidden
                  bg-slate-50 rounded-lg p-2
                  border border-slate-100
                  group-hover:border-${concept.color}-200
                  group-hover:bg-${concept.color}-50/30
                  transition-all duration-500
                  flex gap-2.5 items-start
                  shadow-sm
               `}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bg.replace('bg-', 'bg-')}-400 transition-all duration-500 group-hover:w-1.5`} />
                  <div className={`shrink-0 p-1 rounded bg-white shadow-sm border border-slate-100 ${colors.text} mt-0.5`}>
                     <Lightbulb className="w-3 h-3" strokeWidth={2.5} />
                  </div>
                  <p className="text-xs font-semibold text-slate-700 leading-tight line-clamp-3 group-hover:text-slate-900 transition-colors flex-1">
                     {concept.example}
                  </p>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
};
