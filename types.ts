/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LatticeType = 'SC' | 'BCC' | 'FCC' | 'Diamond' | 'HCP' | 'NaCl' | 'CsCl' | 'ZincBlende' | 'Wurtzite' | 'P4' | 'S8' | 'P4S3' | 'P4S10' | 'C60' | 'H2O' | 'CH4';

export interface LatticeParams {
  a: number;
  b: number;
  c: number;
  alpha: number;
  beta: number;
  gamma: number;
}

export interface Atom {
  id: string;
  element: string;
  position: [number, number, number];
  radius: number;
  color: string;
}

export interface Bond {
  from: string;
  to: string;
  type?: string;
}

export interface SymmetryOperation {
  name: string;
  description?: string;
  matrix: number[][]; // 3x3 matrix
  translation: [number, number, number];
}

export interface CrystalData {
  type: LatticeType;
  params: LatticeParams;
  atoms: Atom[];
  bonds: Bond[];
  symmetry: SymmetryOperation[];
  primitiveVectors?: [number, number, number][];
}

export interface ElementInfo {
  symbol: string;
  name: string;
  radius: number;
  color: string;
  atomicWeight: number;
  atomicNumber: number;
  electronegativity?: number;
  electronConfiguration: string;
  row: number;
  column: number;
  category: string;
}

export interface MaterialPreset {
  name: string;
  type: LatticeType;
  element: string;
  secondaryElement?: string;
  params: LatticeParams;
}
