# 商务管理系统

一个为中小型企业打造的简化版 ERP 账目管理系统，具有清新的蓝色 UI 设计和现代化的用户体验。

## 功能特性

- ✅ **清新蓝色 UI**: 采用苹果设计规范，提供优雅的用户界面
- ✅ **Wise 集成**: 连接 Wise 账户，自动同步银行交易记录
- ✅ **Gmail 集成**: 自动扫描邮箱中的发票邮件
- ✅ **交易分类**: 智能分类收支记录
- ✅ **仪表板**: 直观显示财务概览和统计数据
- ✅ **发票匹配**: 自动匹配发票与银行交易

## 技术栈

- **前端**: Next.js 14, React 18, TypeScript
- **样式**: Tailwind CSS, Radix UI
- **图标**: Lucide React
- **开发工具**: ESLint, Bun/npm

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.local` 文件并填入相应的 API 密钥：

```bash
cp .env.local .env.local
```

需要配置的环境变量：
- `WISE_API_TOKEN`: Wise API 访问令牌
- `GMAIL_CLIENT_ID`: Google OAuth 客户端 ID
- `GMAIL_CLIENT_SECRET`: Google OAuth 客户端密钥

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动。

## API 集成指南

### Wise API 设置

1. 访问 [Wise 开发者控制台](https://sandbox.transferwise.tech/)
2. 创建新的应用程序
3. 生成 API Token
4. 将 Token 添加到环境变量中

### Gmail API 设置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Gmail API
4. 创建 OAuth 2.0 凭据
5. 将客户端 ID 和密钥添加到环境变量中

## 使用说明

### 连接账户

1. 进入设置页面
2. 按照指引连接 Wise 和 Gmail 账户
3. 系统将自动开始同步数据

### 查看交易

- 在首页仪表板查看最近交易
- 查看收入、支出和余额统计
- 交易会自动分类并显示相应的颜色标识

### 发票管理

- 系统会自动扫描 Gmail 中的发票邮件
- 提取发票金额和日期信息
- 自动匹配对应的银行交易记录

## 项目结构

```
business-erp/
├── src/
│   ├── app/                 # Next.js App Router 页面
│   ├── components/          # React 组件
│   │   └── ui/             # UI 基础组件
│   ├── lib/                # 工具函数和配置
│   └── styles/             # 全局样式
├── public/                 # 静态资源
└── ...配置文件
```

## 开发

### 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行代码检查

### 添加新功能

1. 创建相应的组件和页面
2. 添加必要的 API 路由
3. 更新类型定义
4. 测试功能是否正常

## 许可证

本项目基于 MIT 许可证开源。
