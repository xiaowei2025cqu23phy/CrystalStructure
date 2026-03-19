/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LatticeType, LatticeParams, ElementInfo } from '../types';
import { ELEMENTS, calculateVolume, calculateDensity, calculatePackingFraction } from '../utils/crystalLogic';
import { Settings, Info, Calculator, Layers, Atom as AtomIcon } from 'lucide-react';

interface ControlPanelProps {
  type: LatticeType;
  setType: (type: LatticeType) => void;
  params: LatticeParams;
  setParams: (params: LatticeParams) => void;
  element: string;
  setElement: (element: string) => void;
  showUnitCell: boolean;
  setShowUnitCell: (show: boolean) => void;
  showBonds: boolean;
  setShowBonds: (show: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  type, setType, params, setParams, element, setElement, showUnitCell, setShowUnitCell, showBonds, setShowBonds
}) => {
  const volume = calculateVolume(params);
  const density = calculateDensity(type, params, element);
  const packingFraction = calculatePackingFraction(type, params, element);

  const handleParamChange = (key: keyof LatticeParams, value: number) => {
    setParams({ ...params, [key]: value });
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar">
      {/* Lattice Type Selection */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <Layers size={18} className="text-nobel-gold" />
          <h3>Lattice System</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(['SC', 'BCC', 'FCC', 'Diamond', 'NaCl', 'CsCl'] as LatticeType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
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
        <select 
          value={element}
          onChange={(e) => setElement(e.target.value)}
          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-nobel-gold/20"
        >
          {Object.keys(ELEMENTS).map((el) => (
            <option key={el} value={el}>{ELEMENTS[el].name} ({el})</option>
          ))}
        </select>
      </section>

      {/* Lattice Parameters */}
      <section className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 text-stone-900 font-serif font-semibold">
          <Settings size={18} className="text-nobel-gold" />
          <h3>Lattice Constants (Å)</h3>
        </div>
        <div className="space-y-4">
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
