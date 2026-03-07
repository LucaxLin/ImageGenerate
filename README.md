# AI 图像生成

一个基于 Vue 3 和 TypeScript 构建的现代化 AI 图像生成 Web 应用，支持多种 AI 模型进行文本到图像的生成。

## 功能特性

- 🎨 **多模型支持** - 支持多种 AI 图像生成模型（Qwen/Qwen-Image、Kolors）
- 💬 **聊天式交互** - 直观的聊天界面，通过对话方式生成图像
- 🖼️ **图像画廊** - 查看和管理生成的图像作品
- 🌓 **深色模式** - 支持深色/浅色主题切换
- 📱 **响应式设计** - 完美适配桌面端和移动端设备
- ⚙️ **参数配置** - 可调节种子值、推理步数等生成参数
- 🔐 **API 密钥管理** - 安全的 API 密钥输入和管理
- 🚀 **快速生成** - 基于 SiliconFlow API 的高速图像生成

## 技术栈

- **框架**: Vue 3.5.25
- **语言**: TypeScript 5.9.3
- **构建工具**: Vite 7.3.1
- **UI 组件库**: Element Plus 2.13.3
- **路由**: Vue Router 4.6.4
- **样式**: UnoCSS 66.6.4 + Sass 1.97.3
- **HTTP 客户端**: Axios 1.13.6
- **工具库**: @vueuse/core 14.2.1
- **分析**: @vercel/analytics 1.6.1

## 项目结构

```
image-generate/
├── src/
│   ├── assets/          # 静态资源
│   ├── components/      # 可复用组件
│   │   ├── BotConfigComponent.vue  # AI 配置组件
│   │   ├── ChatHistory.vue         # 聊天历史组件
│   │   ├── PromptInput.vue         # 提示词输入组件
│   │   └── toggleDark.vue          # 深色模式切换组件
│   ├── router/          # 路由配置
│   ├── types/           # TypeScript 类型定义
│   ├── utils/           # 工具函数
│   ├── views/           # 页面视图
│   │   ├── chat.vue     # 聊天页面
│   │   ├── gallary.vue  # 画廊页面
│   │   └── NotFound.vue # 404 页面
│   ├── App.vue          # 根组件
│   ├── main.ts          # 应用入口
│   └── style.css        # 全局样式
├── public/              # 公共资源
├── package.json         # 项目配置
└── vite.config.ts       # Vite 配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览构建

```bash
npm run preview
```

## 使用说明

### API 配置

1. 访问 [SiliconFlow](https://siliconflow.cn/) 获取 API 密钥
2. 在应用的设置面板中输入 API 密钥
3. 选择合适的 AI 模型

### 生成图像

1. 在聊天界面输入提示词
2. 配置生成参数（可选）
3. 点击发送按钮
4. 等待图像生成完成

### 参数说明

- **模型**: 选择不同的 AI 图像生成模型
- **种子**: 控制生成的随机性，相同种子生成相同图像
- **推理步数**: 影响生成质量和速度
- **引导系数**: 控制提示词对生成的影响程度

## 开发特性

- **自动导入**: 使用 unplugin-auto-import 自动导入 Vue API
- **组件自动注册**: 使用 unplugin-vue-components 自动注册组件
- **文件系统路由**: 使用 unplugin-vue-router 自动生成路由
- **类型安全**: 完整的 TypeScript 类型支持
- **代码规范**: 集成 Prettier 进行代码格式化

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
