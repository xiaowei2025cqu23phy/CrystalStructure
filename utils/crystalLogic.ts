/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LatticeType, LatticeParams, Atom, Bond, ElementInfo, SymmetryOperation } from '../types';

export const ELEMENTS: Record<string, ElementInfo> = {
  'H': { symbol: 'H', name: '氢', radius: 0.37, color: '#FFFFFF', atomicWeight: 1.008 },
  'He': { symbol: 'He', name: '氦', radius: 0.32, color: '#D9FFFF', atomicWeight: 4.0026 },
  'Li': { symbol: 'Li', name: '锂', radius: 1.34, color: '#CC80FF', atomicWeight: 6.94 },
  'Be': { symbol: 'Be', name: '铍', radius: 0.90, color: '#C2FF00', atomicWeight: 9.0122 },
  'B': { symbol: 'B', name: '硼', radius: 0.82, color: '#FFB5B5', atomicWeight: 10.81 },
  'C': { symbol: 'C', name: '碳', radius: 0.77, color: '#909090', atomicWeight: 12.011 },
  'N': { symbol: 'N', name: '氮', radius: 0.75, color: '#3050F8', atomicWeight: 14.007 },
  'O': { symbol: 'O', name: '氧', radius: 0.73, color: '#FF0D0D', atomicWeight: 15.999 },
  'F': { symbol: 'F', name: '氟', radius: 0.71, color: '#90E050', atomicWeight: 18.998 },
  'Ne': { symbol: 'Ne', name: '氖', radius: 0.69, color: '#B3E3F5', atomicWeight: 20.180 },
  'Na': { symbol: 'Na', name: '钠', radius: 1.54, color: '#AB5CF2', atomicWeight: 22.990 },
  'Mg': { symbol: 'Mg', name: '镁', radius: 1.30, color: '#8AFF00', atomicWeight: 24.305 },
  'Al': { symbol: 'Al', name: '铝', radius: 1.18, color: '#BFA6A6', atomicWeight: 26.982 },
  'Si': { symbol: 'Si', name: '硅', radius: 1.11, color: '#F0C8A0', atomicWeight: 28.085 },
  'P': { symbol: 'P', name: '磷', radius: 1.06, color: '#FF8000', atomicWeight: 30.974 },
  'S': { symbol: 'S', name: '硫', radius: 1.02, color: '#FFFF30', atomicWeight: 32.06 },
  'Cl': { symbol: 'Cl', name: '氯', radius: 0.99, color: '#1FF01F', atomicWeight: 35.45 },
  'Ar': { symbol: 'Ar', name: '氩', radius: 0.97, color: '#80D1E3', atomicWeight: 39.948 },
  'K': { symbol: 'K', name: '钾', radius: 1.96, color: '#8F40D4', atomicWeight: 39.098 },
  'Ca': { symbol: 'Ca', name: '钙', radius: 1.74, color: '#3DFF00', atomicWeight: 40.078 },
  'Fe': { symbol: 'Fe', name: '铁', radius: 1.25, color: '#E06633', atomicWeight: 55.845 },
  'Cu': { symbol: 'Cu', name: '铜', radius: 1.28, color: '#C88033', atomicWeight: 63.546 },
  'Au': { symbol: 'Au', name: '金', radius: 1.44, color: '#FFD123', atomicWeight: 196.97 },
  'Ag': { symbol: 'Ag', name: '银', radius: 1.44, color: '#C0C0C0', atomicWeight: 107.87 },
  'Pt': { symbol: 'Pt', name: '铂', radius: 1.39, color: '#D0D0E0', atomicWeight: 195.08 },
  'W': { symbol: 'W', name: '钨', radius: 1.37, color: '#2196F3', atomicWeight: 183.84 },
  'Cr': { symbol: 'Cr', name: '铬', radius: 1.25, color: '#8A99B2', atomicWeight: 51.996 },
  'Mo': { symbol: 'Mo', name: '钼', radius: 1.36, color: '#545B68', atomicWeight: 95.95 },
  'Ta': { symbol: 'Ta', name: '钽', radius: 1.43, color: '#4DA6FF', atomicWeight: 180.95 },
  'Ni': { symbol: 'Ni', name: '镍', radius: 1.24, color: '#50EBAD', atomicWeight: 58.693 },
  'Pb': { symbol: 'Pb', name: '铅', radius: 1.75, color: '#575961', atomicWeight: 207.2 },
  'Ge': { symbol: 'Ge', name: '锗', radius: 1.22, color: '#668F8F', atomicWeight: 72.63 },
  'Sn': { symbol: 'Sn', name: '锡', radius: 1.40, color: '#667878', atomicWeight: 118.71 },
  'Zn': { symbol: 'Zn', name: '锌', radius: 1.31, color: '#7D80B2', atomicWeight: 65.38 },
  'Ti': { symbol: 'Ti', name: '钛', radius: 1.45, color: '#BFC2C7', atomicWeight: 47.867 },
  'Cd': { symbol: 'Cd', name: '镉', radius: 1.48, color: '#FFD98F', atomicWeight: 112.41 },
  'Ga': { symbol: 'Ga', name: '镓', radius: 1.22, color: '#C28F8F', atomicWeight: 69.723 },
  'As': { symbol: 'As', name: '砷', radius: 1.19, color: '#BD80FF', atomicWeight: 74.922 },
  'In': { symbol: 'In', name: '铟', radius: 1.44, color: '#A67573', atomicWeight: 114.82 },
  'Sb': { symbol: 'Sb', name: '锑', radius: 1.38, color: '#9E63B5', atomicWeight: 121.76 },
  'Cs': { symbol: 'Cs', name: '铯', radius: 2.65, color: '#57178F', atomicWeight: 132.91 },
  'Tl': { symbol: 'Tl', name: '铊', radius: 1.70, color: '#A6544D', atomicWeight: 204.38 },
  'Po': { symbol: 'Po', name: '钋', radius: 1.68, color: '#AB5C00', atomicWeight: 209 },
  'Br': { symbol: 'Br', name: '溴', radius: 1.14, color: '#A62929', atomicWeight: 79.904 },
  'I': { symbol: 'I', name: '碘', radius: 1.33, color: '#940094', atomicWeight: 126.90 },
};

import { MaterialPreset } from '../types';

export const MATERIAL_PRESETS: MaterialPreset[] = [
  // SC
  { name: '钋 (α-Po)', type: 'SC', element: 'Po', params: { a: 3.35, b: 3.35, c: 3.35, alpha: 90, beta: 90, gamma: 90 } },
  
  // BCC
  { name: '铁 (α-Fe)', type: 'BCC', element: 'Fe', params: { a: 2.866, b: 2.866, c: 2.866, alpha: 90, beta: 90, gamma: 90 } },
  { name: '钨 (W)', type: 'BCC', element: 'W', params: { a: 3.16, b: 3.16, c: 3.16, alpha: 90, beta: 90, gamma: 90 } },
  { name: '铬 (Cr)', type: 'BCC', element: 'Cr', params: { a: 2.88, b: 2.88, c: 2.88, alpha: 90, beta: 90, gamma: 90 } },
  { name: '钼 (Mo)', type: 'BCC', element: 'Mo', params: { a: 3.15, b: 3.15, c: 3.15, alpha: 90, beta: 90, gamma: 90 } },
  { name: '钽 (Ta)', type: 'BCC', element: 'Ta', params: { a: 3.30, b: 3.30, c: 3.30, alpha: 90, beta: 90, gamma: 90 } },
  { name: '钠 (Na)', type: 'BCC', element: 'Na', params: { a: 4.23, b: 4.23, c: 4.23, alpha: 90, beta: 90, gamma: 90 } },
  { name: '钾 (K)', type: 'BCC', element: 'K', params: { a: 5.23, b: 5.23, c: 5.23, alpha: 90, beta: 90, gamma: 90 } },

  // FCC
  { name: '铜 (Cu)', type: 'FCC', element: 'Cu', params: { a: 3.61, b: 3.61, c: 3.61, alpha: 90, beta: 90, gamma: 90 } },
  { name: '铝 (Al)', type: 'FCC', element: 'Al', params: { a: 4.05, b: 4.05, c: 4.05, alpha: 90, beta: 90, gamma: 90 } },
  { name: '金 (Au)', type: 'FCC', element: 'Au', params: { a: 4.08, b: 4.08, c: 4.08, alpha: 90, beta: 90, gamma: 90 } },
  { name: '银 (Ag)', type: 'FCC', element: 'Ag', params: { a: 4.09, b: 4.09, c: 4.09, alpha: 90, beta: 90, gamma: 90 } },
  { name: '铂 (Pt)', type: 'FCC', element: 'Pt', params: { a: 3.92, b: 3.92, c: 3.92, alpha: 90, beta: 90, gamma: 90 } },
  { name: '镍 (Ni)', type: 'FCC', element: 'Ni', params: { a: 3.52, b: 3.52, c: 3.52, alpha: 90, beta: 90, gamma: 90 } },
  { name: '铅 (Pb)', type: 'FCC', element: 'Pb', params: { a: 4.95, b: 4.95, c: 4.95, alpha: 90, beta: 90, gamma: 90 } },

  // Diamond
  { name: '金刚石 (C)', type: 'Diamond', element: 'C', params: { a: 3.567, b: 3.567, c: 3.567, alpha: 90, beta: 90, gamma: 90 } },
  { name: '硅 (Si)', type: 'Diamond', element: 'Si', params: { a: 5.43, b: 5.43, c: 5.43, alpha: 90, beta: 90, gamma: 90 } },
  { name: '锗 (Ge)', type: 'Diamond', element: 'Ge', params: { a: 5.66, b: 5.66, c: 5.66, alpha: 90, beta: 90, gamma: 90 } },
  { name: '锡 (α-Sn)', type: 'Diamond', element: 'Sn', params: { a: 6.49, b: 6.49, c: 6.49, alpha: 90, beta: 90, gamma: 90 } },

  // NaCl
  { name: '氯化钠 (NaCl)', type: 'NaCl', element: 'Na', secondaryElement: 'Cl', params: { a: 5.64, b: 5.64, c: 5.64, alpha: 90, beta: 90, gamma: 90 } },
  { name: '氯化钾 (KCl)', type: 'NaCl', element: 'K', secondaryElement: 'Cl', params: { a: 6.29, b: 6.29, c: 6.29, alpha: 90, beta: 90, gamma: 90 } },
  { name: '氟化锂 (LiF)', type: 'NaCl', element: 'Li', secondaryElement: 'F', params: { a: 4.02, b: 4.02, c: 4.02, alpha: 90, beta: 90, gamma: 90 } },
  { name: '氧化镁 (MgO)', type: 'NaCl', element: 'Mg', secondaryElement: 'O', params: { a: 4.21, b: 4.21, c: 4.21, alpha: 90, beta: 90, gamma: 90 } },
  { name: '氯化银 (AgCl)', type: 'NaCl', element: 'Ag', secondaryElement: 'Cl', params: { a: 5.55, b: 5.55, c: 5.55, alpha: 90, beta: 90, gamma: 90 } },

  // CsCl
  { name: '氯化铯 (CsCl)', type: 'CsCl', element: 'Cs', secondaryElement: 'Cl', params: { a: 4.12, b: 4.12, c: 4.12, alpha: 90, beta: 90, gamma: 90 } },
  { name: '溴化铯 (CsBr)', type: 'CsCl', element: 'Cs', secondaryElement: 'Br', params: { a: 4.29, b: 4.29, c: 4.29, alpha: 90, beta: 90, gamma: 90 } },
  { name: '碘化铯 (CsI)', type: 'CsCl', element: 'Cs', secondaryElement: 'I', params: { a: 4.57, b: 4.57, c: 4.57, alpha: 90, beta: 90, gamma: 90 } },
  { name: '氯化铊 (TlCl)', type: 'CsCl', element: 'Tl', secondaryElement: 'Cl', params: { a: 3.83, b: 3.83, c: 3.83, alpha: 90, beta: 90, gamma: 90 } },

  // HCP
  { name: '镁 (Mg)', type: 'HCP', element: 'Mg', params: { a: 3.21, b: 3.21, c: 5.21, alpha: 90, beta: 90, gamma: 120 } },
  { name: '锌 (Zn)', type: 'HCP', element: 'Zn', params: { a: 2.66, b: 2.66, c: 4.95, alpha: 90, beta: 90, gamma: 120 } },
  { name: '钛 (α-Ti)', type: 'HCP', element: 'Ti', params: { a: 2.95, b: 2.95, c: 4.68, alpha: 90, beta: 90, gamma: 120 } },
  { name: '铍 (Be)', type: 'HCP', element: 'Be', params: { a: 2.29, b: 2.29, c: 3.58, alpha: 90, beta: 90, gamma: 120 } },
  { name: '镉 (Cd)', type: 'HCP', element: 'Cd', params: { a: 2.98, b: 2.98, c: 5.62, alpha: 90, beta: 90, gamma: 120 } },

  // ZincBlende
  { name: '硫化锌 (闪锌矿)', type: 'ZincBlende', element: 'S', secondaryElement: 'Zn', params: { a: 5.41, b: 5.41, c: 5.41, alpha: 90, beta: 90, gamma: 90 } },
  { name: '砷化镓 (GaAs)', type: 'ZincBlende', element: 'Ga', secondaryElement: 'As', params: { a: 5.65, b: 5.65, c: 5.65, alpha: 90, beta: 90, gamma: 90 } },
  { name: '磷化铟 (InP)', type: 'ZincBlende', element: 'In', secondaryElement: 'P', params: { a: 5.87, b: 5.87, c: 5.87, alpha: 90, beta: 90, gamma: 90 } },
  { name: '碳化硅 (3C-SiC)', type: 'ZincBlende', element: 'Si', secondaryElement: 'C', params: { a: 4.36, b: 4.36, c: 4.36, alpha: 90, beta: 90, gamma: 90 } },

  // Wurtzite
  { name: '硫化锌 (纤锌矿)', type: 'Wurtzite', element: 'S', secondaryElement: 'Zn', params: { a: 3.82, b: 3.82, c: 6.26, alpha: 90, beta: 90, gamma: 120 } },
  { name: '氮化镓 (GaN)', type: 'Wurtzite', element: 'Ga', secondaryElement: 'N', params: { a: 3.19, b: 3.19, c: 5.19, alpha: 90, beta: 90, gamma: 120 } },
  { name: '氮化铝 (AlN)', type: 'Wurtzite', element: 'Al', secondaryElement: 'N', params: { a: 3.11, b: 3.11, c: 4.98, alpha: 90, beta: 90, gamma: 120 } },
  { name: '氧化锌 (ZnO)', type: 'Wurtzite', element: 'Zn', secondaryElement: 'O', params: { a: 3.25, b: 3.25, c: 5.21, alpha: 90, beta: 90, gamma: 120 } },

  // Molecular
  { name: '白磷 (P4)', type: 'P4', element: 'P', params: { a: 2.2, b: 2.2, c: 2.2, alpha: 90, beta: 90, gamma: 90 } },
  { name: '硫环 (S8)', type: 'S8', element: 'S', params: { a: 3.0, b: 3.0, c: 3.0, alpha: 90, beta: 90, gamma: 90 } },
  { name: '三硫化四磷 (P4S3)', type: 'P4S3', element: 'P', secondaryElement: 'S', params: { a: 3.5, b: 3.5, c: 3.5, alpha: 90, beta: 90, gamma: 90 } },
  { name: '五硫化二磷 (P4S10)', type: 'P4S10', element: 'P', secondaryElement: 'S', params: { a: 4.5, b: 4.5, c: 4.5, alpha: 90, beta: 90, gamma: 90 } },
  { name: '富勒烯 (C60)', type: 'C60', element: 'C', params: { a: 7.0, b: 7.0, c: 7.0, alpha: 90, beta: 90, gamma: 90 } },
  { name: '水 (H2O)', type: 'H2O', element: 'O', secondaryElement: 'H', params: { a: 1.0, b: 1.0, c: 1.0, alpha: 90, beta: 90, gamma: 90 } },
  { name: '甲烷 (CH4)', type: 'CH4', element: 'C', secondaryElement: 'H', params: { a: 1.5, b: 1.5, c: 1.5, alpha: 90, beta: 90, gamma: 90 } },
];

export const LATTICE_COLORS: Record<LatticeType, string> = {
  'SC': '#ef4444',
  'BCC': '#3b82f6',
  'FCC': '#10b981',
  'Diamond': '#f59e0b',
  'HCP': '#8b5cf6',
  'NaCl': '#ec4899',
  'CsCl': '#06b6d4',
  'ZincBlende': '#f97316',
  'Wurtzite': '#6366f1',
  'P4': '#ff8000',
  'S8': '#ffff30',
  'P4S3': '#ff8000',
  'P4S10': '#ff8000',
  'C60': '#909090',
  'H2O': '#3050F8',
  'CH4': '#909090',
};

export const generateSymmetryOperations = (type: LatticeType): SymmetryOperation[] => {
  const ops: SymmetryOperation[] = [
    { 
      name: '恒等变换 (E)', 
      description: '保持晶体结构不变的最基本操作。',
      matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    }
  ];

  if (['SC', 'BCC', 'FCC', 'Diamond', 'NaCl', 'CsCl', 'ZincBlende', 'P4', 'CH4', 'C60'].includes(type)) {
    // Cubic point group Oh (m-3m) - representative operations (or subgroups for molecules)
    ops.push({ 
      name: '反演中心 (i)', 
      description: '通过中心点进行镜像对称，坐标 (x,y,z) 变为 (-x,-y,-z)。',
      matrix: [[-1, 0, 0], [0, -1, 0], [0, 0, -1]], 
      translation: [0, 0, 0] 
    });
    
    // 4-fold rotations around axes
    ops.push({ 
      name: '4次旋转轴 (x)', 
      description: '绕 x 轴旋转 90 度的操作。',
      matrix: [[1, 0, 0], [0, 0, -1], [0, 1, 0]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '4次旋转轴 (y)', 
      description: '绕 y 轴旋转 90 度的操作。',
      matrix: [[0, 0, 1], [0, 1, 0], [-1, 0, 0]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '4次旋转轴 (z)', 
      description: '绕 z 轴旋转 90 度的操作。',
      matrix: [[0, -1, 0], [1, 0, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
    
    // 2-fold rotations around axes
    ops.push({ 
      name: '2次旋转轴 (x)', 
      description: '绕 x 轴旋转 180 度的操作。',
      matrix: [[1, 0, 0], [0, -1, 0], [0, 0, -1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '2次旋转轴 (y)', 
      description: '绕 y 轴旋转 180 度的操作。',
      matrix: [[-1, 0, 0], [0, 1, 0], [0, 0, -1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '2次旋转轴 (z)', 
      description: '绕 z 轴旋转 180 度的操作。',
      matrix: [[-1, 0, 0], [0, -1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });

    // Mirror planes
    ops.push({ 
      name: '镜面 (xy)', 
      description: '以 xy 平面为镜面的镜像操作，z 坐标变号。',
      matrix: [[1, 0, 0], [0, 1, 0], [0, 0, -1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '镜面 (yz)', 
      description: '以 yz 平面为镜面的镜像操作，x 坐标变号。',
      matrix: [[-1, 0, 0], [0, 1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '镜面 (xz)', 
      description: '以 xz 平面为镜面的镜像操作，y 坐标变号。',
      matrix: [[1, 0, 0], [0, -1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });

    // 3-fold rotations around body diagonals
    ops.push({ 
      name: '3次旋转轴 (111)', 
      description: '绕体对角线 [111] 旋转 120 度的操作。',
      matrix: [[0, 0, 1], [1, 0, 0], [0, 1, 0]], 
      translation: [0, 0, 0] 
    });
  } else if (['HCP', 'Wurtzite', 'S8'].includes(type)) {
    // Hexagonal/Octagonal symmetry - representative operations
    ops.push({ 
      name: '6次旋转轴 (z)', 
      description: '绕 z 轴旋转 60 度的操作。',
      matrix: [[0.5, -0.866, 0], [0.866, 0.5, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '3次旋转轴 (z)', 
      description: '绕 z 轴旋转 120 度的操作。',
      matrix: [[-0.5, -0.866, 0], [0.866, -0.5, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '2次旋转轴 (z)', 
      description: '绕 z 轴旋转 180 度的操作。',
      matrix: [[-1, 0, 0], [0, -1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '镜面 (xy)', 
      description: '以 xy 平面为镜面的镜像操作。',
      matrix: [[1, 0, 0], [0, 1, 0], [0, 0, -1]], 
      translation: [0, 0, 0] 
    });
  } else if (type === 'H2O') {
    // C2v symmetry
    ops.push({ 
      name: '2次旋转轴 (z)', 
      description: '绕 z 轴旋转 180 度的操作。',
      matrix: [[-1, 0, 0], [0, -1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '镜面 (xz)', 
      description: '以 xz 平面为镜面的镜像操作。',
      matrix: [[1, 0, 0], [0, -1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
    ops.push({ 
      name: '镜面 (yz)', 
      description: '以 yz 平面为镜面的镜像操作。',
      matrix: [[-1, 0, 0], [0, 1, 0], [0, 0, 1]], 
      translation: [0, 0, 0] 
    });
  }

  return ops;
};

export const generateCrystal = (type: LatticeType, params: LatticeParams, element: string, secondaryElement?: string, bondThresholdOverride?: number): { atoms: Atom[], bonds: Bond[], symmetry: SymmetryOperation[] } => {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  const symmetry = generateSymmetryOperations(type);
  const el = ELEMENTS[element] || ELEMENTS['C'];
  const secEl = secondaryElement ? (ELEMENTS[secondaryElement] || el) : el;
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

  const toCartesian = (u: number, v: number, w: number): [number, number, number] => {
    const gr = params.gamma * Math.PI / 180;
    const x = a * u + b * Math.cos(gr) * v;
    const y = b * Math.sin(gr) * v;
    const z = c * w;
    return [x, y, z];
  };

  switch (type) {
    case 'P4':
      // White Phosphorus: Tetrahedron
      {
        const s = a / 2;
        addAtom([s, s, s], 'P');
        addAtom([-s, -s, s], 'P');
        addAtom([-s, s, -s], 'P');
        addAtom([s, -s, -s], 'P');
      }
      break;

    case 'S8':
      // Sulfur: Crown-shaped ring (8 atoms)
      {
        const r = a / 1.5;
        const h = a / 4;
        for (let i = 0; i < 8; i++) {
          const angle = (i * 45) * Math.PI / 180;
          const z = (i % 2 === 0) ? h : -h;
          addAtom([r * Math.cos(angle), r * Math.sin(angle), z], 'S');
        }
      }
      break;

    case 'P4S3':
      // Phosphorus sesquisulfide
      {
        const s = a / 2;
        // P4 tetrahedron
        addAtom([0, 0, s], 'P'); // Top P
        const r = s;
        for (let i = 0; i < 3; i++) {
          const angle = (i * 120) * Math.PI / 180;
          addAtom([r * Math.cos(angle), r * Math.sin(angle), -s / 3], 'P'); // Base P
        }
        // S atoms bridging the base P and top P
        for (let i = 0; i < 3; i++) {
          const angle = (i * 120 + 60) * Math.PI / 180;
          addAtom([r * 0.8 * Math.cos(angle), r * 0.8 * Math.sin(angle), s / 4], 'S');
        }
      }
      break;

    case 'P4S10':
      // Phosphorus pentasulfide (P4S10) - Adamantane-like structure
      {
        const s = a / 1.5;
        // P4 tetrahedron (larger)
        const p_pos: [number, number, number][] = [
          [s, s, s], [s, -s, -s], [-s, s, -s], [-s, -s, s]
        ];
        p_pos.forEach(p => addAtom(p, 'P'));

        // 6 bridging S atoms (between P atoms)
        for (let i = 0; i < p_pos.length; i++) {
          for (let j = i + 1; j < p_pos.length; j++) {
            const mid: [number, number, number] = [
              (p_pos[i][0] + p_pos[j][0]) / 2,
              (p_pos[i][1] + p_pos[j][1]) / 2,
              (p_pos[i][2] + p_pos[j][2]) / 2
            ];
            // Push mid out a bit to make it look like a bridge
            const dist = Math.sqrt(mid[0]**2 + mid[1]**2 + mid[2]**2);
            const factor = 1.2;
            addAtom([mid[0] * factor, mid[1] * factor, mid[2] * factor], 'S');
          }
        }
        // 4 terminal S atoms (one on each P)
        p_pos.forEach(p => {
          const factor = 1.6;
          addAtom([p[0] * factor, p[1] * factor, p[2] * factor], 'S');
        });
      }
      break;

    case 'C60':
      // Buckminsterfullerene
      {
        const phi = (1 + Math.sqrt(5)) / 2;
        const s = a / 3.5;
        const coords: [number, number, number][] = [
          [0, 1, 3*phi], [0, 1, -3*phi], [0, -1, 3*phi], [0, -1, -3*phi],
          [1, 3*phi, 0], [1, -3*phi, 0], [-1, 3*phi, 0], [-1, -3*phi, 0],
          [3*phi, 0, 1], [3*phi, 0, -1], [-3*phi, 0, 1], [-3*phi, 0, -1],
          [2, (1+2*phi), phi], [2, (1+2*phi), -phi], [2, -(1+2*phi), phi], [2, -(1+2*phi), -phi],
          [-2, (1+2*phi), phi], [-2, (1+2*phi), -phi], [-2, -(1+2*phi), phi], [-2, -(1+2*phi), -phi],
          [(1+2*phi), phi, 2], [(1+2*phi), phi, -2], [(1+2*phi), -phi, 2], [(1+2*phi), -phi, -2],
          [-(1+2*phi), phi, 2], [-(1+2*phi), phi, -2], [-(1+2*phi), -phi, 2], [-(1+2*phi), -phi, -2],
          [phi, 2, (1+2*phi)], [phi, 2, -(1+2*phi)], [phi, -2, (1+2*phi)], [phi, -2, -(1+2*phi)],
          [-phi, 2, (1+2*phi)], [-phi, 2, -(1+2*phi)], [-phi, -2, (1+2*phi)], [-phi, -2, -(1+2*phi)],
          [1, (2+phi), 2*phi], [1, (2+phi), -2*phi], [1, -(2+phi), 2*phi], [1, -(2+phi), -2*phi],
          [-1, (2+phi), 2*phi], [-1, (2+phi), -2*phi], [-1, -(2+phi), 2*phi], [-1, -(2+phi), -2*phi],
          [(2+phi), 2*phi, 1], [(2+phi), 2*phi, -1], [(2+phi), -2*phi, 1], [(2+phi), -2*phi, -1],
          [-(2+phi), 2*phi, 1], [-(2+phi), 2*phi, -1], [-(2+phi), -2*phi, 1], [-(2+phi), -2*phi, -1],
          [2*phi, 1, (2+phi)], [2*phi, 1, -(2+phi)], [2*phi, -1, (2+phi)], [2*phi, -1, -(2+phi)],
          [-2*phi, 1, (2+phi)], [-2*phi, 1, -(2+phi)], [-2*phi, -1, (2+phi)], [-2*phi, -1, -(2+phi)]
        ];
        coords.forEach(c => addAtom([c[0] * s, c[1] * s, c[2] * s], 'C'));
      }
      break;

    case 'H2O':
      {
        const d = a / 3;
        const angle = 104.5 * Math.PI / 180;
        addAtom([0, 0, 0], 'O');
        addAtom([d, 0, 0], 'H');
        addAtom([d * Math.cos(angle), d * Math.sin(angle), 0], 'H');
      }
      break;

    case 'CH4':
      {
        const s = a / 4;
        addAtom([0, 0, 0], 'C');
        addAtom([s, s, s], 'H');
        addAtom([s, -s, -s], 'H');
        addAtom([-s, s, -s], 'H');
        addAtom([-s, -s, s], 'H');
      }
      break;

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
      addAtom([a / 2, b / 2, 0]); addAtom([a / 2, b / 2, c]);
      addAtom([a / 2, 0, c / 2]); addAtom([a / 2, b, c / 2]);
      addAtom([0, b / 2, c / 2]); addAtom([a, b / 2, c / 2]);
      break;

    case 'Diamond':
      // Diamond: FCC + 4 interior atoms
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
      addAtom([a / 4, b / 4, c / 4]); addAtom([3 * a / 4, 3 * b / 4, c / 4]);
      addAtom([a / 4, 3 * b / 4, 3 * c / 4]); addAtom([3 * a / 4, b / 4, 3 * c / 4]);
      break;

    case 'HCP':
      // Hexagonal Close-Packed - Full Hexagonal Prism
      {
        const corners = 6;
        const radius = a;
        const getHexPos = (i: number, z: number): [number, number, number] => {
          const angle = (i * 60) * Math.PI / 180;
          return [radius * Math.cos(angle), radius * Math.sin(angle), z];
        };

        // Layers
        for (let z of [0, c]) {
          addAtom([0, 0, z]); // Center
          for (let i = 0; i < corners; i++) {
            addAtom(getHexPos(i, z));
          }
        }
        // Middle layer (3 atoms)
        for (let i = 0; i < 3; i++) {
          const angle = (30 + i * 120) * Math.PI / 180;
          const r_int = radius / Math.sqrt(3);
          addAtom([r_int * Math.cos(angle), r_int * Math.sin(angle), c / 2]);
        }
      }
      break;

    case 'NaCl':
      // NaCl: FCC Na + FCC Cl (offset by 1/2, 0, 0)
      {
        const s1 = element;
        const s2 = secondaryElement || 'Cl';
        for (let x = 0; x <= 1; x++) {
          for (let y = 0; y <= 1; y++) {
            for (let z = 0; z <= 1; z++) {
              addAtom([x * a, y * b, z * c], s1);
            }
          }
        }
        addAtom([a / 2, b / 2, 0], s1); addAtom([a / 2, b / 2, c], s1);
        addAtom([a / 2, 0, c / 2], s1); addAtom([a / 2, b, c / 2], s1);
        addAtom([0, b / 2, c / 2], s1); addAtom([a, b / 2, c / 2], s1);
        addAtom([a / 2, 0, 0], s2); addAtom([a / 2, b, 0], s2);
        addAtom([a / 2, 0, c], s2); addAtom([a / 2, b, c], s2);
        addAtom([0, b / 2, 0], s2); addAtom([a, b / 2, 0], s2);
        addAtom([0, b / 2, c], s2); addAtom([a, b / 2, c], s2);
        addAtom([0, 0, c / 2], s2); addAtom([a, 0, c / 2], s2);
        addAtom([0, b, c / 2], s2); addAtom([a, b, c / 2], s2);
        addAtom([a / 2, b / 2, c / 2], s2);
      }
      break;

    case 'CsCl':
      {
        const s1 = element;
        const s2 = secondaryElement || 'Cl';
        for (let x = 0; x <= 1; x++) {
          for (let y = 0; y <= 1; y++) {
            for (let z = 0; z <= 1; z++) {
              addAtom([x * a, y * b, z * c], s1);
            }
          }
        }
        addAtom([a / 2, b / 2, c / 2], s2);
      }
      break;

    case 'ZincBlende':
      // Zinc Blende: FCC S + Zn in 4 tetrahedral holes
      {
        const s1 = element;
        const s2 = secondaryElement || 'Zn';
        for (let x = 0; x <= 1; x++) {
          for (let y = 0; y <= 1; y++) {
            for (let z = 0; z <= 1; z++) {
              addAtom([x * a, y * b, z * c], s1);
            }
          }
        }
        addAtom([a / 2, b / 2, 0], s1); addAtom([a / 2, b / 2, c], s1);
        addAtom([a / 2, 0, c / 2], s1); addAtom([a / 2, b, c / 2], s1);
        addAtom([0, b / 2, c / 2], s1); addAtom([a, b / 2, c / 2], s1);
        addAtom([a / 4, b / 4, c / 4], s2); addAtom([3 * a / 4, 3 * b / 4, c / 4], s2);
        addAtom([a / 4, 3 * b / 4, 3 * c / 4], s2); addAtom([3 * a / 4, b / 4, 3 * c / 4], s2);
      }
      break;

    case 'Wurtzite':
      // Wurtzite - Full Hexagonal Prism
      {
        const s1 = element;
        const s2 = secondaryElement || 'Zn';
        const corners = 6;
        const radius = a;
        const getHexPos = (i: number, z: number): [number, number, number] => {
          const angle = (i * 60) * Math.PI / 180;
          return [radius * Math.cos(angle), radius * Math.sin(angle), z];
        };

        const u = 3/8; // Ideal u parameter

        // S atoms
        for (let z of [0, c]) {
          addAtom([0, 0, z], s1);
          for (let i = 0; i < corners; i++) {
            addAtom(getHexPos(i, z), s1);
          }
        }
        for (let i = 0; i < 3; i++) {
          const angle = (30 + i * 120) * Math.PI / 180;
          const r_int = radius / Math.sqrt(3);
          addAtom([r_int * Math.cos(angle), r_int * Math.sin(angle), c / 2], s1);
        }

        // Zn atoms (offset by u*c)
        for (let z of [0, c]) {
          addAtom([0, 0, z + u * c], s2);
          for (let i = 0; i < corners; i++) {
            addAtom(getHexPos(i, z + u * c), s2);
          }
        }
        for (let i = 0; i < 3; i++) {
          const angle = (30 + i * 120) * Math.PI / 180;
          const r_int = radius / Math.sqrt(3);
          addAtom([r_int * Math.cos(angle), r_int * Math.sin(angle), c / 2 + u * c], s2);
        }
      }
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
  if (type === 'Diamond' || type === 'ZincBlende') bondThreshold = (Math.sqrt(3) * a / 4) * 1.1;
  if (type === 'NaCl') bondThreshold = (a / 2) * 1.1;
  if (type === 'CsCl') bondThreshold = (Math.sqrt(3) * a / 2) * 1.1;
  if (type === 'HCP' || type === 'Wurtzite') bondThreshold = a * 1.1;
  
  // Molecular bond thresholds
  if (type === 'P4') bondThreshold = (Math.sqrt(2) * a) * 1.1;
  if (type === 'S8') bondThreshold = (a / 1.5) * 1.1;
  if (type === 'P4S3') bondThreshold = (a / 2) * 1.1;
  if (type === 'P4S10') bondThreshold = (a / 1.5) * 1.1;
  if (type === 'C60') bondThreshold = (a / 3.5) * 1.5; // C-C bond in C60 is about 1.4A
  if (type === 'H2O') bondThreshold = (a / 3) * 1.1;
  if (type === 'CH4') bondThreshold = (a / 4) * 1.1 * Math.sqrt(3);

  // Apply override if provided
  if (bondThresholdOverride !== undefined) {
    bondThreshold = bondThresholdOverride;
  }

  // Determine bond type based on lattice type
  let bondType = 'covalent';
  if (['SC', 'BCC', 'FCC', 'HCP'].includes(type)) bondType = 'metallic';
  if (['NaCl', 'CsCl'].includes(type)) bondType = 'ionic';
  if (['ZincBlende', 'Wurtzite', 'H2O'].includes(type)) bondType = 'polar_covalent';

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dist = getDistance(atoms[i].position, atoms[j].position);
      if (dist > 0.1 && dist <= bondThreshold) {
        bonds.push({ from: atoms[i].id, to: atoms[j].id, type: bondType });
      }
    }
  }

  return { atoms, bonds, symmetry };
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
    case 'HCP': z = 2; break;
    case 'ZincBlende': z = 4; break;
    case 'Wurtzite': z = 2; break;
    case 'P4': z = 4; break;
    case 'S8': z = 8; break;
    case 'P4S3': z = 7; break;
    case 'P4S10': z = 14; break;
    case 'C60': z = 60; break;
    case 'H2O': z = 3; break;
    case 'CH4': z = 5; break;
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
    case 'HCP': z = 2; break;
    case 'ZincBlende': z = 8; break;
    case 'Wurtzite': z = 4; break;
    case 'P4': z = 4; break;
    case 'S8': z = 8; break;
    case 'P4S3': z = 7; break;
    case 'P4S10': z = 14; break;
    case 'C60': z = 60; break;
    case 'H2O': z = 3; break;
    case 'CH4': z = 5; break;
  }
  
  return (z * vAtom) / vCell;
};
