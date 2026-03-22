# 💎 晶体结构实验室 (Crystal Structure Lab)

一个基于 **React 18** 和 **Three.js** 的高性能、交互式晶体学与分子结构可视化平台。本项目旨在为教育、科研和材料科学爱好者提供一个直观、精确且美观的 3D 建模与分析环境。

![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Three.js](https://img.shields.io/badge/Three.js-r150+-000000.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38b2ac.svg)

---

## 🌟 核心功能

### 1. 🔬 深度 3D 可视化
- **双视图并行**：同时观察带晶胞边界的“结构单元”和无边界的“纯净点阵”。
- **智能渲染**：自动区分晶体点阵（如 FCC, BCC）与独立分子（如 C60, H2O, P4S10），并根据结构特性优化显示。
- **动态成键**：支持自定义成键阈值（Å），实时计算并渲染原子间的化学键。

### 2. 📊 实时物理计算
- **晶体学参数**：即时计算晶胞体积（Å³）、理论密度（g/cm³）以及空间利用率（Packing Fraction）。
- **对称性分析**：可视化对称操作矩阵（Symmetry Matrix）及其平移矢量，支持详细描述查看。

### 3. ⚛️ 交互式元素周期表
- **全表覆盖**：内置从 H 到 Rn 的详细元素数据。
- **详尽属性**：包括原子序数、原子量、电负性、分类颜色。
- **电子层排布**：**独家支持**显示每个元素的标准电子层排布（如 Fe: `[Ar] 3d⁶ 4s²`）。
- **智能搜索与过滤**：支持按名称/符号搜索，或按金属/非金属分类过滤。

### 4. 🛠️ 参数化建模
- **晶格常数调节**：动态修改 a, b, c 轴长度（2-10 Å）及 α, β, γ 夹角（60-120°）。
- **丰富预设**：内置金属（α-Fe, W, Cu）、离子晶体（NaCl, CsCl）、共价晶体（金刚石）及复杂分子（C60, P4S3）等多种预设。

### 5. 📤 专业级导出
- **PNG 图像**：高分辨率位图导出，适用于演示文稿。
- **SVG 矢量图**：科研级矢量图形导出，支持无限缩放，适用于学术论文。

---

## 🚀 快速启动

### 前置条件
- **Node.js**: 建议 v16.x 或更高版本
- **包管理器**: npm 或 yarn

### 运行步骤
1. **克隆并进入目录**
   ```bash
   # 假设您已下载代码包
   cd crystal-structure-lab
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   访问 `http://localhost:3000` 即可开始探索。

4. **构建生产版本**
   ```bash
   npm run build
   ```

---

## 🛠️ 技术架构

- **核心框架**: [React 18](https://reactjs.org/) (Hooks & Functional Components)
- **3D 渲染**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Three.js](https://threejs.org/)
- **动画引擎**: [Framer Motion](https://www.framer.com/motion/) (用于 UI 平滑过渡)
- **样式方案**: [Tailwind CSS](https://tailwindcss.com/) (响应式、极简主义设计)
- **图标系统**: [Lucide React](https://lucide.dev/)
- **数学逻辑**: 自研晶体几何生成算法 (`crystalLogic.ts`)

---

## 📱 移动端支持

本项目采用响应式设计，完美适配手机与平板电脑：
- **浏览器访问**：直接在手机浏览器打开部署链接即可。
- **触控优化**：支持单指旋转、双指缩放 3D 模型。
- **本地运行 (Android)**：可通过 Termux 安装 Node.js 环境运行。

---

## 📄 开源协议

本项目采用 [Apache-2.0](LICENSE) 协议开源。

---

> **致谢**：感谢所有对晶体学和材料科学做出贡献的先驱。本工具力求严谨，但计算结果基于理想模型，科研引用请以实验数据为准。
