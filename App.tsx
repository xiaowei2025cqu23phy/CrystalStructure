/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LatticeType, LatticeParams } from './types';
import { generateCrystal } from './utils/crystalLogic';
import LatticeViewer from './components/LatticeViewer';
import ControlPanel from './components/ControlPanel';
import { Hexagon, Info, Github, BookOpen, Share2, ChevronDown, ChevronUp, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [type, setType] = useState<LatticeType>('FCC');
  const [params, setParams] = useState<LatticeParams>({
    a: 4.0, b: 4.0, c: 4.0,
    alpha: 90, beta: 90, gamma: 90
  });
  const [element, setElement] = useState<string>('Cu');
  const [secondaryElement, setSecondaryElement] = useState<string | undefined>(undefined);
  const [showUnitCell, setShowUnitCell] = useState(true);
  const [showBonds, setShowBonds] = useState(true);
  const [bondThreshold, setBondThreshold] = useState<number | undefined>(undefined);

  const handleTypeChange = (newType: LatticeType) => {
    setType(newType);
    setBondThreshold(undefined); // Reset override on type change
    
    // Set default elements and parameters based on lattice type
    switch (newType) {
      case 'SC':
        setElement('Po');
        setSecondaryElement(undefined);
        setParams({ a: 3.35, b: 3.35, c: 3.35, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'BCC':
        setElement('Fe');
        setSecondaryElement(undefined);
        setParams({ a: 2.866, b: 2.866, c: 2.866, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'FCC':
        setElement('Cu');
        setSecondaryElement(undefined);
        setParams({ a: 3.61, b: 3.61, c: 3.61, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'Diamond':
        setElement('C');
        setSecondaryElement(undefined);
        setParams({ a: 3.567, b: 3.567, c: 3.567, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'NaCl':
        setElement('Na');
        setSecondaryElement('Cl');
        setParams({ a: 5.64, b: 5.64, c: 5.64, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'CsCl':
        setElement('Cs');
        setSecondaryElement('Cl');
        setParams({ a: 4.12, b: 4.12, c: 4.12, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'HCP':
        setElement('Mg');
        setSecondaryElement(undefined);
        setParams({ a: 3.21, b: 3.21, c: 5.21, alpha: 90, beta: 90, gamma: 120 });
        break;
      case 'ZincBlende':
        setElement('Zn');
        setSecondaryElement('S');
        setParams({ a: 5.41, b: 5.41, c: 5.41, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'Wurtzite':
        setElement('Zn');
        setSecondaryElement('O');
        setParams({ a: 3.25, b: 3.25, c: 5.21, alpha: 90, beta: 90, gamma: 120 });
        break;
      case 'P4':
        setElement('P');
        setSecondaryElement(undefined);
        setParams({ a: 2.2, b: 2.2, c: 2.2, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'S8':
        setElement('S');
        setSecondaryElement(undefined);
        setParams({ a: 3.0, b: 3.0, c: 3.0, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'P4S3':
        setElement('P');
        setSecondaryElement('S');
        setParams({ a: 3.5, b: 3.5, c: 3.5, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'P4S10':
        setElement('P');
        setSecondaryElement('S');
        setParams({ a: 4.5, b: 4.5, c: 4.5, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'C60':
        setElement('C');
        setSecondaryElement(undefined);
        setParams({ a: 7.0, b: 7.0, c: 7.0, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'H2O':
        setElement('O');
        setSecondaryElement('H');
        setParams({ a: 1.0, b: 1.0, c: 1.0, alpha: 90, beta: 90, gamma: 90 });
        break;
      case 'CH4':
        setElement('C');
        setSecondaryElement('H');
        setParams({ a: 1.5, b: 1.5, c: 1.5, alpha: 90, beta: 90, gamma: 90 });
        break;
    }
  };

  const [exportFn, setExportFn] = useState<((type: 'png' | 'svg') => void) | null>(null);

  const [showOverlays, setShowOverlays] = useState(true);

  const { atoms, bonds, symmetry } = useMemo(() => 
    generateCrystal(type, params, element, secondaryElement, bondThreshold), 
    [type, params, element, secondaryElement, bondThreshold]
  );

  const [showControlPanel, setShowControlPanel] = useState(true);

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
              <h1 className="font-serif font-bold text-xl tracking-tight text-stone-900">晶体结构<span className="text-nobel-gold italic">实验室</span></h1>
              <p className="text-[10px] text-stone-500 font-bold uppercase tracking-[0.2em] leading-none">交互式晶体学</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide text-stone-600">
            <button 
              onClick={() => setShowControlPanel(!showControlPanel)}
              className={`px-4 py-2 rounded-full transition-all text-xs font-bold flex items-center gap-2 ${
                showControlPanel ? 'bg-stone-100 text-stone-700' : 'bg-nobel-gold text-white shadow-md'
              }`}
            >
              <Layers size={16} /> {showControlPanel ? "隐藏控制面板" : "显示控制面板"}
            </button>
            <div className="h-4 w-px bg-stone-200 mx-2" />
            <a href="#" className="hover:text-nobel-gold transition-colors flex items-center gap-2">
              <BookOpen size={16} /> 文档
            </a>
            <a href="#" className="hover:text-nobel-gold transition-colors flex items-center gap-2">
              <Github size={16} /> 源码
            </a>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => exportFn?.('png')}
                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-full hover:bg-stone-200 transition-all text-xs font-bold flex items-center gap-2"
              >
                PNG
              </button>
              <button 
                onClick={() => exportFn?.('svg')}
                className="px-4 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all text-xs font-bold shadow-md hover:shadow-lg flex items-center gap-2"
              >
                SVG
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-12 container mx-auto px-6 h-[calc(100vh-2rem)] flex flex-col lg:flex-row gap-8">
        
        {/* Left: 3D Viewer */}
        <div className="flex-[2] min-h-[400px] lg:min-h-0 relative group">
          <LatticeViewer 
            atoms={atoms} 
            bonds={bonds}
            params={params} 
            type={type}
            showBonds={showBonds} 
            showUnitCell={showUnitCell} 
            onExportReady={setExportFn}
          />
          
          {/* Overlay Info */}
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 items-end">
             <button 
               onClick={() => setShowOverlays(!showOverlays)}
               className="bg-white/90 backdrop-blur-sm p-2 rounded-full border border-stone-200 shadow-sm hover:text-nobel-gold transition-colors pointer-events-auto flex items-center gap-2 px-3"
               title={showOverlays ? "隐藏界面" : "显示界面"}
             >
               <span className="text-[10px] font-bold uppercase tracking-widest">{showOverlays ? "隐藏" : "显示"}</span>
               {showOverlays ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
             </button>
             
             {showOverlays && (
               <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200 items-end">
                 <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-stone-200 shadow-sm w-fit">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-xs font-bold text-stone-600 uppercase tracking-widest">实时渲染</span>
                   </div>
                 </div>
                 <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-stone-200 shadow-sm min-w-[140px]">
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-1">当前晶系</span>
                    <span className="text-lg font-serif text-stone-900 font-semibold">{type}</span>
                 </div>
                 <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl border border-stone-200 shadow-sm min-w-[140px]">
                    <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-1">原子数量</span>
                    <span className="text-lg font-serif text-stone-900 font-semibold">{atoms.length}</span>
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Right: Controls */}
        <AnimatePresence>
          {showControlPanel && (
            <motion.aside 
              initial={{ width: 0, opacity: 0, x: 20 }}
              animate={{ width: 400, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full lg:w-[400px] shrink-0 overflow-hidden"
            >
              <ControlPanel 
                type={type} setType={handleTypeChange}
                params={params} setParams={setParams}
                element={element} setElement={setElement}
                secondaryElement={secondaryElement} setSecondaryElement={setSecondaryElement}
                showUnitCell={showUnitCell} setShowUnitCell={setShowUnitCell}
                showBonds={showBonds} setShowBonds={setShowBonds}
                bondThreshold={bondThreshold} setBondThreshold={setBondThreshold}
                symmetry={symmetry}
                onExport={exportFn}
              />
            </motion.aside>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Info Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 py-2 px-6 z-50">
        <div className="container mx-auto flex justify-between items-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
          <div className="flex gap-6">
            <span>精度: 0.001 Å</span>
            <span>引擎: Three.js / R3F</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={12} />
            <span>教学工具 • v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
