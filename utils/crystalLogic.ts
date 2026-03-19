/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LatticeType, LatticeParams, Atom, Bond, ElementInfo } from '../types';

export const ELEMENTS: Record<string, ElementInfo> = {
  'H': { symbol: 'H', name: 'Hydrogen', radius: 0.37, color: '#FFFFFF', atomicWeight: 1.008 },
  'He': { symbol: 'He', name: 'Helium', radius: 0.32, color: '#D9FFFF', atomicWeight: 4.0026 },
  'Li': { symbol: 'Li', name: 'Lithium', radius: 1.34, color: '#CC80FF', atomicWeight: 6.94 },
  'Be': { symbol: 'Be', name: 'Beryllium', radius: 0.90, color: '#C2FF00', atomicWeight: 9.0122 },
  'B': { symbol: 'B', name: 'Boron', radius: 0.82, color: '#FFB5B5', atomicWeight: 10.81 },
  'C': { symbol: 'C', name: 'Carbon', radius: 0.77, color: '#909090', atomicWeight: 12.011 },
  'N': { symbol: 'N', name: 'Nitrogen', radius: 0.75, color: '#3050F8', atomicWeight: 14.007 },
  'O': { symbol: 'O', name: 'Oxygen', radius: 0.73, color: '#FF0D0D', atomicWeight: 15.999 },
  'F': { symbol: 'F', name: 'Fluorine', radius: 0.71, color: '#90E050', atomicWeight: 18.998 },
  'Ne': { symbol: 'Ne', name: 'Neon', radius: 0.69, color: '#B3E3F5', atomicWeight: 20.180 },
  'Na': { symbol: 'Na', name: 'Sodium', radius: 1.54, color: '#AB5CF2', atomicWeight: 22.990 },
  'Mg': { symbol: 'Mg', name: 'Magnesium', radius: 1.30, color: '#8AFF00', atomicWeight: 24.305 },
  'Al': { symbol: 'Al', name: 'Aluminum', radius: 1.18, color: '#BFA6A6', atomicWeight: 26.982 },
  'Si': { symbol: 'Si', name: 'Silicon', radius: 1.11, color: '#F0C8A0', atomicWeight: 28.085 },
  'P': { symbol: 'P', name: 'Phosphorus', radius: 1.06, color: '#FF8000', atomicWeight: 30.974 },
  'S': { symbol: 'S', name: 'Sulfur', radius: 1.02, color: '#FFFF30', atomicWeight: 32.06 },
  'Cl': { symbol: 'Cl', name: 'Chlorine', radius: 0.99, color: '#1FF01F', atomicWeight: 35.45 },
  'Ar': { symbol: 'Ar', name: 'Argon', radius: 0.97, color: '#80D1E3', atomicWeight: 39.948 },
  'K': { symbol: 'K', name: 'Potassium', radius: 1.96, color: '#8F40D4', atomicWeight: 39.098 },
  'Ca': { symbol: 'Ca', name: 'Calcium', radius: 1.74, color: '#3DFF00', atomicWeight: 40.078 },
  'Fe': { symbol: 'Fe', name: 'Iron', radius: 1.25, color: '#E06633', atomicWeight: 55.845 },
  'Cu': { symbol: 'Cu', name: 'Copper', radius: 1.28, color: '#C88033', atomicWeight: 63.546 },
  'Au': { symbol: 'Au', name: 'Gold', radius: 1.44, color: '#FFD123', atomicWeight: 196.97 },
  'Ag': { symbol: 'Ag', name: 'Silver', radius: 1.44, color: '#C0C0C0', atomicWeight: 107.87 },
  'Pt': { symbol: 'Pt', name: 'Platinum', radius: 1.39, color: '#D0D0E0', atomicWeight: 195.08 },
};

export const generateCrystal = (type: LatticeType, params: LatticeParams, element: string): { atoms: Atom[], bonds: Bond[] } => {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  const el = ELEMENTS[element] || ELEMENTS['C'];
  const { a, b, c } = params;

  const addAtom = (pos: [number, number, number], symbol: string = element) => {
    const elInfo = ELEMENTS[symbol] || el;
    atoms.push({
      id: `${symbol}-${atoms.length}`,
      element: symbol,
      position: pos,
      radius: elInfo.radius,
      color: elInfo.color,
    });
  };

  switch (type) {
    case 'SC':
      // Simple Cubic: 8 corners
      for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          for (let z = 0; z <= 1; z++) {
            addAtom([x * a, y * b, z * c]);
          }
        }
      }
      break;

    case 'BCC':
      // Body-Centered Cubic: 8 corners + 1 center
      for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          for (let z = 0; z <= 1; z++) {
            addAtom([x * a, y * b, z * c]);
          }
        }
      }
      addAtom([a / 2, b / 2, c / 2]);
      break;

    case 'FCC':
      // Face-Centered Cubic: 8 corners + 6 face centers
      for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          for (let z = 0; z <= 1; z++) {
            addAtom([x * a, y * b, z * c]);
          }
        }
      }
      // Face centers
      addAtom([a / 2, b / 2, 0]);
      addAtom([a / 2, b / 2, c]);
      addAtom([a / 2, 0, c / 2]);
      addAtom([a / 2, b, c / 2]);
      addAtom([0, b / 2, c / 2]);
      addAtom([a, b / 2, c / 2]);
      break;

    case 'Diamond':
      // Diamond: FCC + 4 interior atoms
      // FCC base
      for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          for (let z = 0; z <= 1; z++) {
            addAtom([x * a, y * b, z * c]);
          }
        }
      }
      addAtom([a / 2, b / 2, 0]); addAtom([a / 2, b / 2, c]);
      addAtom([a / 2, 0, c / 2]); addAtom([a / 2, b, c / 2]);
      addAtom([0, b / 2, c / 2]); addAtom([a, b / 2, c / 2]);
      // Interior
      addAtom([a / 4, b / 4, c / 4]);
      addAtom([3 * a / 4, 3 * b / 4, c / 4]);
      addAtom([a / 4, 3 * b / 4, 3 * c / 4]);
      addAtom([3 * a / 4, b / 4, 3 * c / 4]);
      break;

    case 'NaCl':
      // NaCl: FCC Na + FCC Cl (offset by 1/2, 0, 0)
      // Na atoms (FCC)
      for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          for (let z = 0; z <= 1; z++) {
            addAtom([x * a, y * b, z * c], 'Na');
          }
        }
      }
      addAtom([a / 2, b / 2, 0], 'Na'); addAtom([a / 2, b / 2, c], 'Na');
      addAtom([a / 2, 0, c / 2], 'Na'); addAtom([a / 2, b, c / 2], 'Na');
      addAtom([0, b / 2, c / 2], 'Na'); addAtom([a, b / 2, c / 2], 'Na');
      // Cl atoms (offset FCC)
      addAtom([a / 2, 0, 0], 'Cl'); addAtom([a / 2, b, 0], 'Cl');
      addAtom([a / 2, 0, c], 'Cl'); addAtom([a / 2, b, c], 'Cl');
      addAtom([0, b / 2, 0], 'Cl'); addAtom([a, b / 2, 0], 'Cl');
      addAtom([0, b / 2, c], 'Cl'); addAtom([a, b / 2, c], 'Cl');
      addAtom([0, 0, c / 2], 'Cl'); addAtom([a, 0, c / 2], 'Cl');
      addAtom([0, b, c / 2], 'Cl'); addAtom([a, b, c / 2], 'Cl');
      addAtom([a / 2, b / 2, c / 2], 'Cl');
      break;

    case 'CsCl':
      // CsCl: Simple Cubic Cs + center Cl
      for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
          for (let z = 0; z <= 1; z++) {
            addAtom([x * a, y * b, z * c], 'Cs');
          }
        }
      }
      addAtom([a / 2, b / 2, c / 2], 'Cl');
      break;
  }

  // Generate bonds based on distance
  const getDistance = (p1: [number, number, number], p2: [number, number, number]) => {
    return Math.sqrt(
      Math.pow(p1[0] - p2[0], 2) +
      Math.pow(p1[1] - p2[1], 2) +
      Math.pow(p1[2] - p2[2], 2)
    );
  };

  let bondThreshold = a * 1.1;
  if (type === 'BCC') bondThreshold = (Math.sqrt(3) * a / 2) * 1.1;
  if (type === 'FCC') bondThreshold = (Math.sqrt(2) * a / 2) * 1.1;
  if (type === 'Diamond') bondThreshold = (Math.sqrt(3) * a / 4) * 1.1;
  if (type === 'NaCl') bondThreshold = (a / 2) * 1.1;
  if (type === 'CsCl') bondThreshold = (Math.sqrt(3) * a / 2) * 1.1;

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dist = getDistance(atoms[i].position, atoms[j].position);
      if (dist > 0.1 && dist <= bondThreshold) {
        bonds.push({ from: atoms[i].id, to: atoms[j].id });
      }
    }
  }

  return { atoms, bonds };
};

export const calculateVolume = (params: LatticeParams): number => {
  const { a, b, c, alpha, beta, gamma } = params;
  const ar = alpha * Math.PI / 180;
  const br = beta * Math.PI / 180;
  const gr = gamma * Math.PI / 180;
  
  // Volume of a general parallelepiped
  const v = a * b * c * Math.sqrt(
    1 - Math.pow(Math.cos(ar), 2) - Math.pow(Math.cos(br), 2) - Math.pow(Math.cos(gr), 2) + 
    2 * Math.cos(ar) * Math.cos(br) * Math.cos(gr)
  );
  return v;
};

export const calculateDensity = (type: LatticeType, params: LatticeParams, element: string): number => {
  const v = calculateVolume(params) * 1e-24; // cm^3 (assuming a,b,c in Angstroms)
  const el = ELEMENTS[element] || ELEMENTS['C'];
  const na = 6.022e23;
  
  let z = 1; // Number of formula units per cell
  switch (type) {
    case 'SC': z = 1; break;
    case 'BCC': z = 2; break;
    case 'FCC': z = 4; break;
    case 'Diamond': z = 8; break;
    case 'NaCl': z = 4; break;
    case 'CsCl': z = 1; break;
  }
  
  const mass = (z * el.atomicWeight) / na;
  return mass / v; // g/cm^3
};

export const calculatePackingFraction = (type: LatticeType, params: LatticeParams, element: string): number => {
  const vCell = calculateVolume(params);
  const el = ELEMENTS[element] || ELEMENTS['C'];
  const r = el.radius;
  const vAtom = (4 / 3) * Math.PI * Math.pow(r, 3);
  
  let z = 1;
  switch (type) {
    case 'SC': z = 1; break;
    case 'BCC': z = 2; break;
    case 'FCC': z = 4; break;
    case 'Diamond': z = 8; break;
    case 'NaCl': z = 8; break; // 4 Na + 4 Cl
    case 'CsCl': z = 2; break; // 1 Cs + 1 Cl
  }
  
  return (z * vAtom) / vCell;
};
