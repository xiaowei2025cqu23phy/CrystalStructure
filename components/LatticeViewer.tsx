/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer.js';
import { Atom, LatticeParams, Bond, LatticeType } from '../types';
import { Download, Image as ImageIcon, FileCode } from 'lucide-react';

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

const BondMesh: React.FC<{ from: [number, number, number], to: [number, number, number] }> = ({ from, to }) => {
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
      <cylinderGeometry args={[0.05, 0.05, length, 8]} />
      <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.1} transparent opacity={0.6} />
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
        return <BondMesh key={`bond-${idx}`} from={fromAtom.position} to={toAtom.position} />;
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
      
      {/* Export Buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => exportFn?.('png')}
          className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-lg text-stone-700 text-xs font-bold hover:bg-white transition-all shadow-sm"
          title="Export as PNG"
        >
          <ImageIcon size={14} />
          <span>PNG</span>
        </button>
        <button 
          onClick={() => exportFn?.('svg')}
          className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-md border border-stone-200 rounded-lg text-stone-700 text-xs font-bold hover:bg-white transition-all shadow-sm"
          title="Export as SVG"
        >
          <FileCode size={14} />
          <span>SVG</span>
        </button>
      </div>
      
      <div className="absolute bottom-4 left-4 text-stone-500 text-[10px] font-bold uppercase tracking-widest bg-white/80 px-3 py-1.5 rounded-full backdrop-blur-sm pointer-events-none border border-stone-200 shadow-sm">
        Orbit: Left Click | Pan: Right Click | Zoom: Scroll
      </div>
    </div>
  );
};

export default LatticeViewer;
