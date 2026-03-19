/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { LatticeType, LatticeParams } from './types';
import { generateCrystal } from './utils/crystalLogic';
import LatticeViewer from './components/LatticeViewer';
import ControlPanel from './components/ControlPanel';
import { Hexagon, Info, Github, BookOpen, Share2 } from 'lucide-react';

const App: React.FC = () => {
  const [type, setType] = useState<LatticeType>('FCC');
  const [params, setParams] = useState<LatticeParams>({
    a: 4.0, b: 4.0, c: 4.0,
    alpha: 90, beta: 90, gamma: 90
  });
  const [element, setElement] = useState<string>('Cu');
  const [showUnitCell, setShowUnitCell] = useState(true);
  const [showBonds, setShowBonds] = useState(true);

  const { atoms, bonds } = useMemo(() => 
    generateCrystal(type, params, element), 
    [type, params, element]
  );

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white font-sans">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-nobel-gold shadow-lg transform rotate-45">
              <Hexagon size={24} className="-rotate-45" />
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl tracking-tight text-stone-900">CrystalStructure <span className="text-nobel-gold italic">Lab</span></h1>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em] leading-none">Interactive Crystallography</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide text-stone-600">
            <a href="#" className="hover:text-nobel-gold transition-colors flex items-center gap-2">
              <BookOpen size={16} /> Documentation
            </a>
            <a href="#" className="hover:text-nobel-gold transition-colors flex items-center gap-2">
              <Github size={16} /> Source
            </a>
            <button className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
              <Share2 size={16} /> Export Data
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-12 container mx-auto px-6 h-[calc(100vh-2rem)] flex flex-col md:flex-row gap-8">
        
        {/* Left: 3D Viewer */}
        <div className="flex-1 min-h-[400px] md:min-h-0 relative group">
          <div className="absolute top-6 left-6 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">Live Rendering</span>
              </div>
            </div>
          </div>
          
          <LatticeViewer 
            atoms={atoms} 
            bonds={bonds}
            params={params} 
            showBonds={showBonds} 
            showUnitCell={showUnitCell} 
          />
          
          {/* Overlay Info */}
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
             <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-stone-200 shadow-sm min-w-[140px]">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-1">Current System</span>
                <span className="text-lg font-serif text-stone-900 font-semibold">{type}</span>
             </div>
             <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-stone-200 shadow-sm min-w-[140px]">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-1">Atom Count</span>
                <span className="text-lg font-serif text-stone-900 font-semibold">{atoms.length}</span>
             </div>
          </div>
        </div>

        {/* Right: Controls */}
        <aside className="w-full md:w-96 shrink-0">
          <ControlPanel 
            type={type} setType={setType}
            params={params} setParams={setParams}
            element={element} setElement={setElement}
            showUnitCell={showUnitCell} setShowUnitCell={setShowUnitCell}
            showBonds={showBonds} setShowBonds={setShowBonds}
          />
        </aside>
      </main>

      {/* Footer Info Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 py-2 px-6 z-50">
        <div className="container mx-auto flex justify-between items-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          <div className="flex gap-6">
            <span>Precision: 0.001 Å</span>
            <span>Engine: Three.js / R3F</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={12} />
            <span>Educational Tool • v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
