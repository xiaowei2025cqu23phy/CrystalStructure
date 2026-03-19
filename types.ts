/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LatticeType = 'SC' | 'BCC' | 'FCC' | 'Diamond' | 'HCP' | 'NaCl' | 'CsCl' | 'ZincBlende';

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
}

export interface CrystalData {
  type: LatticeType;
  params: LatticeParams;
  atoms: Atom[];
  bonds: Bond[];
}

export interface ElementInfo {
  symbol: string;
  name: string;
  radius: number;
  color: string;
  atomicWeight: number;
}
