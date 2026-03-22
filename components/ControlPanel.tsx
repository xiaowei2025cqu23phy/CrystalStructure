/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LatticeType, LatticeParams, ElementInfo, SymmetryOperation } from '../types';
import { ELEMENTS, MATERIAL_PRESETS, calculateVolume, calculateDensity, calculatePackingFraction } from '../utils/crystalLogic';
import { Settings, Info, Calculator, Layers, Atom as AtomIcon, ShieldCheck, Download, Image as ImageIcon, FileCode, Bookmark } from 'lucide-react';

interface ControlPanelProps {
  type: LatticeType;
  setType: (type: LatticeType) => void;
  params: LatticeParams;
  setParams: (params: LatticeParams) => void;
  element: string;
  setElement: (element: string) => void;
  secondaryElement?: string;
  setSecondaryElement: (element: string | undefined) => void;
  showUnitCell: boolean;
  setShowUnitCell: (show: boolean) => void;
  showBonds: boolean;
  setShowBonds: (show: boolean) => void;
  bondThreshold?: number;
  setBondThreshold: (threshold: number | undefined) => void;
  symmetry: SymmetryOperation[];
  onExport?: (type: 'png' | 'svg') => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  type, setType, params, setParams, element, setElement, secondaryElement, setSecondaryElement, showUnitCell, setShowUnitCell, showBonds, setShowBonds, bondThreshold, setBondThreshold, symmetry, onExport
}) => {
  const [expandedOpIndex, setExpandedOpIndex] = useState<number | null>(null);
  const volume = calculateVolume(params);
  const density = calculateDensity(type, params, element);
  const packingFraction = calculatePackingFraction(type, params, element);

  const handleParamChange = (key: keyof LatticeParams, value: number) => {
    setParams({ ...params, [key]: value });
  };

  const handlePresetChange = (presetName: string) => {
    const preset = MATERIAL_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setType(preset.type);
      setElement(preset.element);
      setSecondaryElement(preset.secondaryElement);
      setParams(preset.params);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* Material Presets */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <Bookmark size={18} className="text-nobel-gold" />
          <h3>Material Presets</h3>
        </div>
        <select 
          onChange={(e) => handlePresetChange(e.target.value)}
          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nobel-gold/20"
          defaultValue=""
        >
          <option value="" disabled>Select a material...</option>
          {MATERIAL_PRESETS.map((p) => (
            <option key={p.name} value={p.name}>{p.name}</option>
          ))}
        </select>
      </section>

      {/* Lattice Type Selection */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <Layers size={18} className="text-nobel-gold" />
          <h3>Lattice System</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(['SC', 'BCC', 'FCC', 'Diamond', 'NaCl', 'CsCl', 'HCP', 'ZincBlende', 'Wurtzite'] as LatticeType[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setSecondaryElement(undefined);
              }}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                type === t 
                ? 'bg-nobel-gold text-white border-nobel-gold shadow-md' 
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-nobel-gold/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-6 mb-4 text-stone-900 font-serif font-semibold">
          <Layers size={18} className="text-nobel-gold" />
          <h3>Molecular Structures</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(['P4', 'S8', 'P4S3', 'P4S10', 'C60', 'H2O', 'CH4'] as LatticeType[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                // Auto-set elements for molecules
                if (t === 'P4') { setElement('P'); setSecondaryElement(undefined); }
                if (t === 'S8') { setElement('S'); setSecondaryElement(undefined); }
                if (t === 'P4S3') { setElement('P'); setSecondaryElement('S'); }
                if (t === 'P4S10') { setElement('P'); setSecondaryElement('S'); }
                if (t === 'C60') { setElement('C'); setSecondaryElement(undefined); }
                if (t === 'H2O') { setElement('O'); setSecondaryElement('H'); }
                if (t === 'CH4') { setElement('C'); setSecondaryElement('H'); }
              }}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                type === t 
                ? 'bg-nobel-gold text-white border-nobel-gold shadow-md' 
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-nobel-gold/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Element Selection */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <AtomIcon size={18} className="text-nobel-gold" />
          <h3>Element</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full border border-stone-200 shadow-sm" 
              style={{ backgroundColor: ELEMENTS[element]?.color }} 
            />
            <select 
              value={element}
              onChange={(e) => {
                setElement(e.target.value);
                setSecondaryElement(undefined);
              }}
              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nobel-gold/20"
            >
              {Object.keys(ELEMENTS).map((el) => (
                <option key={el} value={el}>{ELEMENTS[el].name} ({el})</option>
              ))}
            </select>
          </div>
          
          {secondaryElement && (
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
              <div 
                className="w-4 h-4 rounded-full border border-stone-200 shadow-sm" 
                style={{ backgroundColor: ELEMENTS[secondaryElement]?.color }} 
              />
              <div className="flex flex-col">
                <span className="text-sm text-stone-600 font-medium">
                  {ELEMENTS[secondaryElement]?.name} ({secondaryElement})
                </span>
                <span className="text-[10px] text-stone-400 font-bold uppercase">Secondary Species</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lattice Parameters */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <Settings size={18} className="text-nobel-gold" />
          <h3>Lattice Parameters</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {(['a', 'b', 'c'] as const).map((dim) => (
              <div key={dim} className="flex items-center gap-4">
                <label className="text-xs font-mono text-stone-500 w-4 uppercase">{dim}</label>
                <input 
                  type="range" min="2" max="10" step="0.1" 
                  value={params[dim]} 
                  onChange={(e) => handleParamChange(dim, parseFloat(e.target.value))}
                  className="flex-1 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-nobel-gold"
                />
                <span className="text-xs font-mono text-stone-900 w-8">{params[dim].toFixed(1)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 grid grid-cols-1 gap-4">
            {(['alpha', 'beta', 'gamma'] as const).map((angle) => (
              <div key={angle} className="flex items-center gap-4">
                <label className="text-[10px] font-mono text-stone-400 w-10 uppercase">{angle === 'alpha' ? 'α' : angle === 'beta' ? 'β' : 'γ'}</label>
                <input 
                  type="range" min="60" max="120" step="1" 
                  value={params[angle]} 
                  onChange={(e) => handleParamChange(angle, parseFloat(e.target.value))}
                  className="flex-1 h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-stone-400"
                />
                <span className="text-[10px] font-mono text-stone-900 w-8">{params[angle]}°</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">Show Unit Cell</span>
          <button 
            onClick={() => setShowUnitCell(!showUnitCell)}
            className={`w-10 h-5 rounded-full transition-colors relative ${showUnitCell ? 'bg-nobel-gold' : 'bg-stone-200'}`}
          >
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${showUnitCell ? 'left-6' : 'left-1'}`} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">Show Bonds</span>
          <button 
            onClick={() => setShowBonds(!showBonds)}
            className={`w-10 h-5 rounded-full transition-colors relative ${showBonds ? 'bg-nobel-gold' : 'bg-stone-200'}`}
          >
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${showBonds ? 'left-6' : 'left-1'}`} />
          </button>
        </div>

        {showBonds && (
          <div className="mt-6 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Bonding Threshold (Å)</span>
              <button 
                onClick={() => setBondThreshold(undefined)}
                className="text-[10px] text-nobel-gold hover:underline font-bold uppercase tracking-widest"
              >
                Reset
              </button>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="range" min="0.5" max="10" step="0.1" 
                value={bondThreshold ?? (params.a * 1.1)} // Fallback to a rough default if undefined
                onChange={(e) => setBondThreshold(parseFloat(e.target.value))}
                className="flex-1 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-nobel-gold"
              />
              <span className="text-xs font-mono text-stone-900 w-8">{(bondThreshold ?? (params.a * 1.1)).toFixed(1)}</span>
            </div>
          </div>
        )}
      </section>

      {/* Calculations */}
      <section className="bg-stone-900 p-6 rounded-2xl border border-stone-800 shadow-xl text-white">
        <div className="flex items-center gap-2 mb-6 text-white font-serif font-semibold">
          <Calculator size={18} className="text-nobel-gold" />
          <h3>Crystallographic Data</h3>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Cell Volume</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif text-nobel-gold">{volume.toFixed(2)}</span>
              <span className="text-xs text-stone-500 font-mono">Å³</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Theoretical Density</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif text-nobel-gold">{density.toFixed(3)}</span>
              <span className="text-xs text-stone-500 font-mono">g/cm³</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Packing Fraction</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif text-nobel-gold">{(packingFraction * 100).toFixed(1)}</span>
              <span className="text-xs text-stone-500 font-mono">%</span>
            </div>
            <div className="w-full h-1 bg-stone-800 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-nobel-gold transition-all duration-500" 
                style={{ width: `${packingFraction * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Symmetry Operations */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <ShieldCheck size={18} className="text-nobel-gold" />
          <h3>Symmetry Operations</h3>
        </div>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {symmetry.map((op, idx) => (
            <div 
              key={idx} 
              onClick={() => setExpandedOpIndex(expandedOpIndex === idx ? null : idx)}
              className={`flex flex-col p-3 rounded-xl border transition-all cursor-pointer ${
                expandedOpIndex === idx 
                ? 'bg-white border-nobel-gold shadow-md ring-1 ring-nobel-gold/20' 
                : 'bg-stone-50 border-stone-100 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold tracking-tight transition-colors ${expandedOpIndex === idx ? 'text-nobel-gold' : 'text-stone-800'}`}>
                  {op.name}
                </span>
                <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">
                  {expandedOpIndex === idx ? 'Detailed View' : 'Matrix'}
                </span>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="relative inline-block">
                  {/* Left bracket */}
                  <div className={`absolute -left-2 top-0 bottom-0 w-1.5 border-l-2 border-t-2 border-b-2 rounded-l-sm transition-colors ${expandedOpIndex === idx ? 'border-nobel-gold/40' : 'border-stone-300'}`} />
                  {/* Right bracket */}
                  <div className={`absolute -right-2 top-0 bottom-0 w-1.5 border-r-2 border-t-2 border-b-2 rounded-r-sm transition-colors ${expandedOpIndex === idx ? 'border-nobel-gold/40' : 'border-stone-300'}`} />
                  
                  <div className="grid grid-cols-3 gap-x-4 gap-y-1 px-1">
                    {op.matrix.flat().map((val, i) => (
                      <span key={i} className={`text-[11px] font-mono text-center w-8 ${val < 0 ? 'text-rose-500' : val > 0 ? 'text-emerald-600' : 'text-stone-400'}`}>
                        {val === 0 ? '0' : val}
                      </span>
                    ))}
                  </div>
                </div>

                {expandedOpIndex === idx && (
                  <div className="w-full pt-3 border-t border-stone-100 animate-in fade-in slide-in-from-top-1 duration-200">
                    <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mb-3 block text-center">Translation Vector (t)</span>
                    <div className="flex justify-center gap-6">
                      {op.translation.map((val, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <span className="text-[10px] text-stone-400 font-mono uppercase">{i === 0 ? 'x' : i === 1 ? 'y' : 'z'}</span>
                          <div className={`px-2 py-1 rounded bg-stone-50 border border-stone-200 text-xs font-mono font-bold ${val === 0 ? 'text-stone-400' : 'text-nobel-gold'}`}>
                            {val.toFixed(3)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Export */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <Download size={18} className="text-nobel-gold" />
          <h3>Export Visualization</h3>
        </div>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => onExport?.('png')}
            className="flex items-center justify-between w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 hover:bg-white hover:border-nobel-gold/50 hover:shadow-md transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <ImageIcon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">PNG Image</span>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Raster • High Quality</span>
              </div>
            </div>
            <Download size={16} className="text-stone-300 group-hover:text-nobel-gold transition-colors" />
          </button>

          <button 
            onClick={() => onExport?.('svg')}
            className="flex items-center justify-between w-full px-5 py-4 bg-stone-900 border border-stone-800 rounded-xl text-white hover:bg-stone-800 hover:shadow-xl transition-all group text-left"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-nobel-gold rounded-lg text-white">
                <FileCode size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">SVG Vector</span>
                <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">Scalable • Research Ready</span>
              </div>
            </div>
            <Download size={16} className="text-stone-500 group-hover:text-nobel-gold transition-colors" />
          </button>
        </div>
      </section>

      {/* Info */}
      <section className="bg-stone-50 p-6 rounded-2xl border border-stone-200 border-dashed">
        <div className="flex items-start gap-3">
          <Info size={16} className="text-stone-400 mt-0.5 shrink-0" />
          <p className="text-xs text-stone-500 leading-relaxed italic">
            Calculations assume ideal hard-sphere model for atoms. Real density may vary due to temperature, defects, and non-spherical electron clouds.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ControlPanel;
