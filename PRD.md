# Easter Holiday Hub - MVP 产品需求文档 (PRD)

> 版本：v1.0  
> 创建日期：2026-04-07  
> 技术栈：Next.js 14 + Tailwind CSS + fal.ai API  
> 部署平台：Vercel  
> 项目策略：混合流量站（Emoji 工具站 + AI 纹身生成器）

---

## 一、项目目标

围绕关键词 **"easter"** 构建一个 SEO 驱动的复活节主题工具网站，通过两个核心工具获取搜索流量：

1. **Emoji 工具**（高频即时需求）：吸引 `easter emoji copy paste` 类关键词流量
2. **AI 纹身生成器**（高质量深度需求）：吸引 `easter tattoo ideas` 类关键词流量

**核心 KPI（MVP 阶段）：**
- 上线时间：域名购买后 3 天内完成部署
- SEO 覆盖关键词：≥ 10 个复活节相关长尾词
- 工具可用性：Emoji 复制成功率 100%，AI 生成响应 ≤ 8 秒

---

## 二、域名选型建议

按优先级排序，购买前请逐一检查是否可注册：

| 优先级 | 域名 | 理由 |
|--------|------|------|
| ⭐⭐⭐ | `eastermoji.com` | 精准融合 Easter + Emoji，简短好记 |
| ⭐⭐⭐ | `easteremoji.net` | 关键词完整，SEO 权重高 |
| ⭐⭐ | `easterhub.io` | 混合站定位，适合品牌扩展 |
| ⭐⭐ | `easteremoji.xyz` | .xyz 便宜，适合快速验证 |
| ⭐ | `happyeastermoji.com` | 备选，关键词稍长 |

> 推荐去 Namecheap 或 GoDaddy 查询注册，.xyz/.net 通常首年 $1-5。

---

## 三、页面结构 (Sitemap)

```
/                        → 首页 = Easter Emoji 工具页 (核心 SEO 页)
/tattoo-generator        → AI 纹身生成器页面
/about                   → 简单介绍页（可后期补充）
```

---

## 四、功能需求详述

### 4.1 首页：Easter Emoji 工具 (/)

#### 目标关键词
- `easter emoji copy paste`
- `emoji for easter`
- `happy easter emoji`
- `easter egg emoji`
- `easter bunny emoji`

#### 页面布局
```
[顶部导航] Logo + "Emoji" Tab (active) + "Tattoo Generator" Tab
[Hero 区]  标题 H1 + 简短说明文字
[搜索栏]   用户可搜索 Emoji（如输入"bunny"显示兔子相关）
[分类 Tab] All | Bunny | Eggs | Flowers | Chick | Symbols | Text Art
[Emoji 网格] 每个卡片显示：Emoji 大图 + 名称 + 点击即复制
[复制反馈]  点击后卡片短暂高亮 + 出现 "✅ Copied!" 气泡
[SEO 文章区] H2 小标题 + 关键词优化文案（300 字以上）
[页脚]     版权 + 隐私政策链接
```

#### Emoji 数据规格（data/emojis.json）
```json
[
  {
    "id": 1,
    "emoji": "🐰",
    "name": "Easter Bunny",
    "keywords": ["bunny", "rabbit", "easter"],
    "category": "bunny"
  },
  ...
]
```

**至少包含以下分类数据：**
- Bunny 类：🐰🐇🐾 等（≥ 8 个）
- Eggs 类：🥚🪺🎨 等（≥ 8 个）
- Flowers 类：🌸🌷🌼💐 等（≥ 8 个）
- Chick 类：🐣🐥🐤 等（≥ 5 个）
- Symbols 类：✝️🕯️🙏🌈 等（≥ 5 个）
- Text Art：多个 Emoji 组合的复活节艺术字（≥ 5 个）

---

### 4.2 AI 纹身生成器页面 (/tattoo-generator)

#### 目标关键词
- `easter tattoo ideas`
- `easter tattoo generator`
- `bunny tattoo design`
- `easter egg tattoo`

#### 页面布局
```
[顶部导航] 同首页导航
[Hero 区]  标题 H1 + 说明（Generate your unique Easter tattoo design with AI）
[输入区]
  - Prompt 输入框（用户可自定义描述）
  - 快捷选项按钮组（一键填充预设主题）：
    "Easter Bunny" | "Easter Egg" | "Cross & Flowers" | "Baby Chick"
  - 风格选择（Style）：
    "Minimalist Line Art" | "Watercolor" | "Traditional Tattoo" | "Geometric"
  - 尺寸选择：默认 512x512（免费），1024x1024（后期可付费解锁）
  - [Generate] 按钮
[生成结果区]
  - Loading 状态：动态进度条 + 提示语（"✨ Creating your design..."）
  - 图片展示：大图预览
  - 操作按钮：[Download PNG] [Generate Again]
[SEO 文章区] 介绍复活节纹身文化、设计灵感（300 字以上）
[页脚]     同首页
```

#### API 规格（/api/generate）
- **请求方式**：POST
- **请求体**：
  ```json
  {
    "prompt": "easter bunny tattoo, minimalist black line art",
    "style": "minimalist",
    "size": "512x512"
  }
  ```
- **后端逻辑**：
  1. 接收用户 prompt
  2. 拼接固定的风格后缀（确保出图质量）
  3. 调用 fal.ai FLUX Schnell 模型
  4. 返回图片 URL
- **响应体**：
  ```json
  {
    "imageUrl": "https://fal.media/files/xxx.png"
  }
  ```
- **Prompt 拼接规则**：
  ```
  用户输入 + ", tattoo design, " + 风格描述 + ", white background, high quality"
  ```
- **错误处理**：超时（>15s）返回友好错误提示，不崩溃页面

---

## 五、SEO 优化要求

### Meta 信息
| 页面 | Title | Description |
|------|-------|-------------|
| / | Easter Emoji Copy & Paste 🐰🥚 - EasterHub | Copy the cutest Easter emojis including bunnies, eggs, flowers and more. One-click copy & paste for WhatsApp, Instagram, and all social media. |
| /tattoo-generator | Easter Tattoo Generator AI - Create Unique Designs | Generate beautiful, unique Easter tattoo designs with AI. Bunny, egg, cross, and more — create your perfect Easter tattoo for free. |

### 结构化数据
- 首页添加 `WebApplication` Schema
- 纹身生成器页添加 `SoftwareApplication` Schema

### 性能要求
- Lighthouse 分数：Performance ≥ 90
- 首屏加载时间 ≤ 2 秒（Vercel Edge CDN 加速）
- 图片全部使用 Next.js `<Image>` 组件优化

---

## 六、UI/UX 设计规范

### 色彩系统（复活节主题）
```
主色：#F9A8D4（粉色，复活节玫瑰）
辅色：#86EFAC（浅绿，春天草地）
强调色：#FDE68A（淡黄，复活节蛋）
背景：#FFFBEB（米白）
文字：#1F2937（深灰）
```

### 字体
- 标题：`Pacifico`（Google Fonts，节日感强）
- 正文：`Inter`（清晰易读）

### 组件规范
- 圆角统一：`rounded-2xl`
- Emoji 卡片 hover 效果：`scale-110 + shadow-lg`
- 按钮统一使用：`bg-pink-400 hover:bg-pink-500 text-white rounded-full`

---

## 七、非功能性需求

| 项目 | 要求 |
|------|------|
| 响应式设计 | 全页面支持移动端（手机复制体验优先）|
| 无障碍 | 所有按钮有 aria-label |
| 隐私 | AI 生成的图片不存储到服务器，直接返回 fal.ai URL |
| 限流 | AI 生成接口限制同一 IP 每小时 ≤ 20 次（防止 API 滥用）|
| 环境变量 | FAL_KEY 通过 Vercel 环境变量注入，不硬编码 |

---

## 八、开发里程碑

| 阶段 | 任务 | 预计时间 |
|------|------|---------|
| Day 1 | 购买域名 + 初始化 Next.js 项目 + 完成 Emoji 工具页 | 3-4 小时 |
| Day 2 | 注册 fal.ai + 开发 AI 生成器页面 + API 路由 | 3-4 小时 |
| Day 3 | SEO 优化（Meta/Schema/文案）+ Vercel 部署 + 域名绑定 | 2 小时 |
| Day 4+ | 内容补充 + 提交 Google Search Console | 1 小时 |

---

## 九、环境变量清单

```env
# fal.ai
FAL_KEY=your_fal_api_key

# （可选）Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 十、后期扩展方向（Post-MVP）

- [ ] Google AdSense 接入（流量变现）
- [ ] 用户可分享自己生成的纹身图到社交媒体
- [ ] 复活节贺卡生成器（Easter Card Generator）
- [ ] 多语言支持（西班牙语市场复活节流量也很大）
- [ ] AI 生成 Emoji 功能（上传照片生成专属复活节头像）
