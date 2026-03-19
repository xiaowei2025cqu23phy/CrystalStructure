/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Atom, LatticeParams, Bond } from '../types';

interface LatticeViewerProps {
  atoms: Atom[];
  bonds: Bond[];
  params: LatticeParams;
  showBonds: boolean;
  showUnitCell: boolean;
}

const AtomMesh: React.FC<{ atom: Atom }> = ({ atom }) => {
  return (
    <mesh position={atom.position}>
      <sphereGeometry args={[atom.radius * 0.5, 32, 32]} />
      <meshStandardMaterial color={atom.color} roughness={0.3} metalness={0.2} />
    </mesh>
  );
};

const UnitCell: React.FC<{ params: LatticeParams }> = ({ params }) => {
  const { a, b, c } = params;
  const points = useMemo(() => [
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(a, 0, 0),
    new THREE.Vector3(a, 0, 0), new THREE.Vector3(a, b, 0),
    new THREE.Vector3(a, b, 0), new THREE.Vector3(0, b, 0),
    new THREE.Vector3(0, b, 0), new THREE.Vector3(0, 0, 0),

    new THREE.Vector3(0, 0, c), new THREE.Vector3(a, 0, c),
    new THREE.Vector3(a, 0, c), new THREE.Vector3(a, b, c),
    new THREE.Vector3(a, b, c), new THREE.Vector3(0, b, c),
    new THREE.Vector3(0, b, c), new THREE.Vector3(0, 0, c),

    new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, c),
    new THREE.Vector3(a, 0, 0), new THREE.Vector3(a, 0, c),
    new THREE.Vector3(a, b, 0), new THREE.Vector3(a, b, c),
    new THREE.Vector3(0, b, 0), new THREE.Vector3(0, b, c),
  ], [a, b, c]);

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

const Scene: React.FC<LatticeViewerProps> = ({ atoms, bonds, params, showBonds, showUnitCell }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Center the lattice
  const center: [number, number, number] = [params.a / 2, params.b / 2, params.c / 2];

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
      {showUnitCell && <UnitCell params={params} />}
    </group>
  );
};

const LatticeViewer: React.FC<LatticeViewerProps> = (props) => {
  return (
    <div className="w-full h-full bg-stone-950 rounded-2xl overflow-hidden shadow-inner relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Scene {...props} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-stone-400 text-xs font-mono bg-black/50 p-2 rounded backdrop-blur-sm pointer-events-none">
        Orbit: Left Click | Pan: Right Click | Zoom: Scroll
      </div>
    </div>
  );
};

export default LatticeViewer;
