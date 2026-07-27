# 岩馆 · THE CRAG ARCHIVE

一个中英双语的攀岩知识库网站：发展史、类型全解、比赛体系、术语库、难度等级与装备，外加两个可交互的 3D 模块（岩墙与岩点标本室）。

**在线站点** → https://rickliang-jy.github.io/Climb_Lib/

## 内容

| 页面 | 内容 |
| --- | --- |
| 首页 | Hero、宣言、内容导览、术语跑马灯、3D 预览 |
| 历史 | 1886 至今六个时代的交互式时间线 |
| 类型 | 抱石 / 运动攀 / 传统 / 难度 / 速度 / 大墙 / 独攀等，含对比矩阵 |
| 比赛 | IFSC 三大赛制规则图解、奥运之路、运动员档案 |
| 术语 | 141 条英文术语，可搜索、按分类与首字母筛选 |
| 等级·装备 | YDS / French / UIAA / V / Font 五体系换算器 + 装备图鉴 |
| 3D 岩墙 | 38 个程序化岩点、5 条线路，可旋转缩放点击 |
| 岩点库 | 16 种岩点类型的独立 3D 标本，含手法说明 |

## 技术栈

React 19 · TypeScript · Vite 7 · Tailwind CSS 3 · shadcn/ui · three.js + React Three Fiber · GSAP + ScrollTrigger · Framer Motion · Lenis · React Router 7

## 本地开发

```bash
cd app
npm install --replace-registry-host=always   # 见下方说明
npm run dev                                   # http://localhost:3000
```

`package-lock.json` 是在一个私有 npm 镜像后面生成的，其中的 `resolved` 地址指向一台外部无法访问的主机。`--replace-registry-host=always` 让 npm 忽略这些地址、改用官方 registry。

其他命令：

```bash
npm run build     # 产物输出到 app/dist
npm run preview   # 预览构建结果
npm run lint
```

## 部署

推送到 `main` 会触发 `.github/workflows/deploy.yml`，自动构建并发布到 GitHub Pages。

两个与子路径部署相关的要点：

- 站点位于 `/Climb_Lib/` 而非域名根目录，所以 workflow 通过 `VITE_BASE` 把仓库名传给 Vite，`BrowserRouter` 则以 `import.meta.env.BASE_URL` 作为 `basename`。
- 代码里引用 `public/` 下的资源必须走 `src/lib/asset.ts` 的 `asset()`。Vite 只会重写 `index.html` 和 CSS `url()` 中的路径，JS 字符串里的 `/foo.png` 会原样输出，在子路径下会 404。
- GitHub Pages 没有 SPA 重写规则，workflow 会把 `index.html` 复制一份为 `404.html`，让 `/history` 这类深链接能正常启动应用。

## 图片说明

站点插图均为 AI 生成的编辑风格配图。运动员卡片**不使用照片** —— 本站不持有任何运动员的肖像授权，因此以姓名缩写字牌代替；成绩数据整理自 IFSC 与奥运会公开记录。

## 目录

```
app/              React 应用
  src/data/       内容数据（术语、历史、类型、比赛、等级装备、岩点）
  src/components/three/   3D 岩墙与岩点几何体
content-data/     内容数据源副本
plan.md           项目规划
```
