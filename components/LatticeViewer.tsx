/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, LatticeParams, Bond, LatticeType, ElementInfo } from '../types';
import { Download, Image as ImageIcon, FileCode, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { ELEMENTS } from '../utils/crystalLogic';

interface LatticeViewerProps {
  atoms: Atom[];
  bonds: Bond[];
  params: LatticeParams;
  type: LatticeType;
  showBonds: boolean;
  showUnitCell: boolean;
  onExportReady?: (exportFn: (type: 'png' | 'svg') => void) => void;
}

// Helper component to handle exports from within the Canvas context
const ExportHandler = ({ onReady }: { onReady: (exportFn: (type: 'png' | 'svg') => void) => void }) => {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    const exportFn = (type: 'png' | 'svg') => {
      if (type === 'png') {
        // Ensure the scene is rendered before capturing
        gl.render(scene, camera);
        const dataURL = gl.domElement.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `crystal-structure-${new Date().getTime()}.png`;
        link.href = dataURL;
        link.click();
      } else if (type === 'svg') {
        const renderer = new SVGRenderer();
        renderer.setSize(gl.domElement.clientWidth, gl.domElement.clientHeight);
        renderer.render(scene, camera);
        const svgData = renderer.domElement.outerHTML;
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `crystal-structure-${new Date().getTime()}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    };

    onReady(exportFn);
  }, [gl, scene, camera, onReady]);

  return null;
};

const AtomMesh: React.FC<{ atom: Atom }> = ({ atom }) => {
  return (
    <mesh position={atom.position}>
      <sphereGeometry args={[atom.radius * 0.5, 32, 32]} />
      <meshStandardMaterial color={atom.color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
};

const UnitCell: React.FC<{ params: LatticeParams, type: LatticeType }> = ({ params, type }) => {
  const { a, b, c, alpha, beta, gamma } = params;
  
  const points = useMemo(() => {
    if (type === 'HCP' || type === 'Wurtzite') {
      // Draw a full hexagonal prism
      const hexPoints: THREE.Vector3[] = [];
      const corners = 6;
      const radius = a;
      
      const getHexPos = (i: number, z: number) => {
        const angle = (i * 60) * Math.PI / 180;
        return new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), z);
      };

      // Bottom hexagon
      for (let i = 0; i < corners; i++) {
        hexPoints.push(getHexPos(i, 0), getHexPos((i + 1) % corners, 0));
      }
      // Top hexagon
      for (let i = 0; i < corners; i++) {
        hexPoints.push(getHexPos(i, c), getHexPos((i + 1) % corners, c));
      }
      // Vertical lines
      for (let i = 0; i < corners; i++) {
        hexPoints.push(getHexPos(i, 0), getHexPos(i, c));
      }
      return hexPoints;
    }

    const ar = alpha * Math.PI / 180;
    const br = beta * Math.PI / 180;
    const gr = gamma * Math.PI / 180;

    // Basis vectors for a general lattice
    const v1 = new THREE.Vector3(a, 0, 0);
    const v2 = new THREE.Vector3(b * Math.cos(gr), b * Math.sin(gr), 0);
    
    const c_z = c * Math.sqrt(1 - Math.pow(Math.cos(ar), 2) - Math.pow(Math.cos(br), 2) - Math.pow(Math.cos(gr), 2) + 2 * Math.cos(ar) * Math.cos(br) * Math.cos(gr)) / Math.sin(gr);
    const c_x = c * Math.cos(br);
    const c_y = c * (Math.cos(ar) - Math.cos(br) * Math.cos(gr)) / Math.sin(gr);
    const v3 = new THREE.Vector3(c_x, c_y, c_z);

    const p0 = new THREE.Vector3(0, 0, 0);
    const p1 = v1.clone();
    const p2 = v1.clone().add(v2);
    const p3 = v2.clone();
    const p4 = v3.clone();
    const p5 = v1.clone().add(v3);
    const p6 = v1.clone().add(v2).add(v3);
    const p7 = v2.clone().add(v3);

    return [
      p0, p1, p1, p2, p2, p3, p3, p0, // Bottom
      p4, p5, p5, p6, p6, p7, p7, p4, // Top
      p0, p4, p1, p5, p2, p6, p3, p7  // Verticals
    ];
  }, [a, b, c, alpha, beta, gamma, type]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#666666" linewidth={1} transparent opacity={0.5} />
    </lineSegments>
  );
};

const BOND_STYLES: Record<string, { color: string, radius: number, name: string }> = {
  'metallic': { color: '#94a3b8', radius: 0.04, name: '金属键' },
  'covalent': { color: '#334155', radius: 0.07, name: '共价键' },
  'ionic': { color: '#cbd5e1', radius: 0.02, name: '离子键' },
  'polar_covalent': { color: '#64748b', radius: 0.05, name: '极性共价键' },
  'default': { color: '#888888', radius: 0.05, name: '化学键' }
};

const BondMesh: React.FC<{ from: [number, number, number], to: [number, number, number], type?: string }> = ({ from, to, type }) => {
  const style = BOND_STYLES[type || 'default'] || BOND_STYLES.default;
  const fromVec = new THREE.Vector3(...from);
  const toVec = new THREE.Vector3(...to);
  const direction = new THREE.Vector3().subVectors(toVec, fromVec);
  const length = direction.length();
  const center = new THREE.Vector3().addVectors(fromVec, toVec).multiplyScalar(0.5);
  
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.clone().normalize()
  );

  return (
    <mesh position={center} quaternion={quaternion}>
      <cylinderGeometry args={[style.radius, style.radius, length, 8]} />
      <meshStandardMaterial color={style.color} roughness={0.5} metalness={0.1} transparent opacity={0.6} />
    </mesh>
  );
};

const Scene: React.FC<LatticeViewerProps> = ({ atoms, bonds, params, type, showBonds, showUnitCell }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Center the lattice
  const center: [number, number, number] = type === 'HCP' || type === 'Wurtzite' 
    ? [0, 0, params.c / 2]
    : [params.a / 2, params.b / 2, params.c / 2];

  const bondElements = useMemo(() => {
    if (!showBonds) return null;
    return bonds.map((bond, idx) => {
      const fromAtom = atoms.find(a => a.id === bond.from);
      const toAtom = atoms.find(a => a.id === bond.to);
      if (fromAtom && toAtom) {
        return <BondMesh key={`bond-${idx}`} from={fromAtom.position} to={toAtom.position} type={bond.type} />;
      }
      return null;
    });
  }, [bonds, atoms, showBonds]);

  return (
    <group ref={groupRef} position={[-center[0], -center[1], -center[2]]}>
      {atoms.map((atom) => (
        <AtomMesh key={atom.id} atom={atom} />
      ))}
      {bondElements}
      {showUnitCell && <UnitCell params={params} type={type} />}
    </group>
  );
};

const ExportButton: React.FC<{ 
  onClick: () => void, 
  icon: any, 
  label: string, 
  tooltip: string 
}> = ({ onClick, icon: Icon, label, tooltip }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <button 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-lg text-stone-700 text-xs font-bold hover:bg-white transition-all shadow-sm"
      >
        <Icon size={14} />
        <span>{label}</span>
      </button>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full mt-2 z-30 pointer-events-none flex flex-col items-center"
          >
            <div className="bg-stone-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap font-bold tracking-wide">
              {tooltip}
            </div>
            <div className="w-2 h-2 bg-stone-900 rotate-45 -mt-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Legend: React.FC<{ atoms: Atom[], bonds: Bond[], showBonds: boolean }> = ({ atoms, bonds, showBonds }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const uniqueElements = useMemo(() => {
    const symbols = Array.from(new Set(atoms.map(a => a.element)));
    return symbols.map(s => ELEMENTS[s]).filter(Boolean);
  }, [atoms]);

  const uniqueBonds = useMemo(() => {
    if (!showBonds) return [];
    const types = Array.from(new Set(bonds.map(b => b.type || 'default')));
    return types.map(t => BOND_STYLES[t] || BOND_STYLES.default);
  }, [bonds, showBonds]);

  return (
    <div className="absolute top-6 left-6 z-20 flex flex-col gap-4 pointer-events-none">
      <div className="bg-white/80 backdrop-blur-md border border-stone-200 rounded-xl p-3 shadow-sm pointer-events-auto w-fit">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between gap-4 text-stone-900 font-serif font-bold text-xs uppercase tracking-wider group/legend"
        >
          <div className="flex items-center gap-2">
            <Info size={14} className="text-nobel-gold" />
            <span>图例</span>
          </div>
          <div className="text-stone-400 group-hover/legend:text-nobel-gold transition-colors">
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </div>
        </button>
        
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="space-y-4 overflow-hidden"
            >
              {/* Elements */}
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-2">元素</span>
                <div className="flex flex-col gap-2">
                  {uniqueElements.map((el) => (
                    <div key={el.symbol} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full border border-stone-200" 
                        style={{ backgroundColor: el.color }} 
                      />
                      <span className="text-xs text-stone-700 font-medium">{el.name} ({el.symbol})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bonds */}
              {showBonds && uniqueBonds.length > 0 && (
                <div className="pt-3 border-t border-stone-100">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-2">化学键</span>
                  <div className="flex flex-col gap-2">
                    {uniqueBonds.map((style, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-1 rounded-full" 
                          style={{ 
                            backgroundColor: style.color,
                            height: `${style.radius * 40}px` 
                          }} 
                        />
                        <span className="text-xs text-stone-700 font-medium">{style.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Radius Scale */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-2">原子半径比例 (Å)</span>
                <div className="flex flex-col gap-3">
                  {[
                    { symbol: 'H', radius: 0.37, name: '氢' },
                    { symbol: 'C', radius: 0.77, name: '碳' },
                    { symbol: 'Fe', radius: 1.25, name: '铁' },
                    { symbol: 'Cs', radius: 2.65, name: '铯' }
                  ].map((el) => (
                    <div key={el.symbol} className="flex items-center gap-3">
                      <div className="w-8 flex justify-center items-center">
                        <div 
                          className="rounded-full border border-stone-300 bg-stone-200" 
                          style={{ 
                            width: `${el.radius * 12}px`, 
                            height: `${el.radius * 12}px` 
                          }} 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-stone-700 font-bold leading-none">{el.name}</span>
                        <span className="text-[9px] text-stone-400 font-mono">{el.radius} Å</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LatticeViewer: React.FC<LatticeViewerProps> = (props) => {
  const [exportFn, setExportFn] = useState<((type: 'png' | 'svg') => void) | null>(null);

  useEffect(() => {
    if (exportFn && props.onExportReady) {
      props.onExportReady(exportFn);
    }
  }, [exportFn, props.onExportReady]);

  return (
    <div className="w-full h-full bg-stone-50 rounded-2xl overflow-hidden shadow-inner relative group border border-stone-200">
      <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Scene {...props} />
        <ExportHandler onReady={setExportFn} />
      </Canvas>
      
      <Legend atoms={props.atoms} bonds={props.bonds} showBonds={props.showBonds} />
      
      {/* Export Buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ExportButton 
          onClick={() => exportFn?.('png')}
          icon={ImageIcon}
          label="PNG"
          tooltip="导出为 PNG"
        />
        <ExportButton 
          onClick={() => exportFn?.('svg')}
          icon={FileCode}
          label="SVG"
          tooltip="导出为 SVG"
        />
      </div>
      
      <div className="absolute bottom-4 left-4 text-stone-500 text-[10px] font-bold uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none border border-stone-200 shadow-sm">
        旋转: 左键 | 平移: 右键 | 缩放: 滚轮
      </div>
    </div>
  );
};

export default LatticeViewer;
