# Plan — 攀岩全景知识库网站（中英双语）

## 目标
构建一个全面的攀岩 library 网站（React + Vite），中英文切换，涵盖：
- 攀岩发展历史（从19世纪登山分支到奥运项目）
- 攀岩类型全解（抱石 Bouldering / 传统 Trad / 运动攀 Sport / 难度 Lead / 速度 Speed / 大墙 Big Wall / 自由独攀 Free Solo / 室内攀等）
- 比赛体系（IFSC 赛制、奥运、著名赛事与运动员）
- 专业术语库（英文原词 + 音标/中文释义 + 分类，100+ 条）
- 3D 交互模块：Three.js 交互式攀岩墙场景 + 3D 岩点（holds）类型库
- 装备介绍、等级体系（YDS / French / V-scale / UIAA）对照

## Stage 1 — 技能加载与项目骨架
- 读取 `/app/.agents/skills/vibecoding-webapp-swarm/SKILL.md`（编排）
- 读取 `/app/.agents/skills/webapp-building-swarm/SKILL.md`（React 构建工件）
- 读取 `/app/.agents/skills/swarm-workspace/SKILL.md`，用 setup-local.sh 建立共享 repo + worktree
- 初始化 React + TypeScript + Tailwind + shadcn/ui 项目骨架，安装 three / @react-three/fiber / @react-three/drei、framer-motion、i18n 方案（react-i18next 或自研 context）
- 输出：可运行的项目骨架 + 设计基调（低饱和、暖色、大量留白、清晰层级，禁止蓝紫渐变）

## Stage 2 — 内容生产（并行研究/写作子代理）
每个子代理产出结构化 JSON/TS 数据文件（中英双语字段），作为网站内容数据源：
1. history-agent：攀岩发展史（时间线数据，关键人物/事件，中英）
2. disciplines-agent：攀岩类型全解（抱石/传统/运动/难度/速度/大墙/独攀/室内等，中英）
3. comps-agent：比赛体系（IFSC、奥运、赛制规则、传奇运动员，中英）
4. glossary-agent：术语库 100+ 条（英文术语 + 中文 + 分类 + 例句）
5. grades-gear-agent：难度等级对照表（YDS/French/V/UIAA）+ 装备图鉴（中英）
6. holds-3d-data-agent：岩点类型数据（jug/crimp/sloper/pocket/pinch/undercling/sidepull/foothold 等），含 3D 几何参数描述（形状、大小、使用手法）
产出统一放到 `src/data/*.ts`

## Stage 3 — 页面与组件开发（并行 coder 子代理，worktree 隔离）
1. 全局框架：i18n 切换、导航、首页 hero、设计语言系统
2. HistoryPage：交互式时间线
3. DisciplinesPage：类型卡片 + 深度图文
4. CompsPage：赛制可视化 + 运动员
5. GlossaryPage：可搜索/筛选术语库
6. GradesGearPage：等级对照表（可交互换算）+ 装备展示
7. 3D 模块（WallScene + HoldsLibrary）：@react-three/fiber 实现
   - 交互式 3D 攀岩墙：可旋转，岩点按颜色/类型布置，点击弹出术语卡
   - 岩点库：每类岩点独立 3D 模型（程序化几何），可旋转查看 + 手法说明
8. AI 插图生成（image_generation 插件）：hero、历史场景、类型插图，统一低饱和暖色风格

## Stage 4 — 集成、构建、验证
- 合并各分支，解决冲突，npm build 通过
- 检查中英切换完整性、3D 场景性能、响应式布局
- verifier 子代理做独立 QA（构建、控制台报错、双语完整性）

## Stage 5 — 交付
- mshtools-website_version_manager build_version（type: static，项目根目录）
- 返回预览 URL
