# 🔥 FIRE Lifestyle Planner (退休生活规划器)

> **Build your path to Financial Independence, Retire Early.**  
> 一个基于 React 的现代化 FIRE 规划器，帮助你量化财务自由之路。
> ![](README-media/73a4eed902d3ade42a13b29fd1464d4fffafb7e4.png)

## 📖 简介

**FIRE Lifestyle Planner** 是一款专为追求"财务独立，提前退休"（FIRE）人群设计的交互式计算器。不同于传统的复杂 Excel 表格，它提供了一个直观、极简且美观的界面，帮助用户通过调节生活方式（支出）、储蓄能力（收入）以及投资假设（回报率），实时推演达成财务自由所需的时间与资金。

无论你是刚开始了解 FIRE 的新手，还是正在积极践行的长期主义者，这个工具都能为你提供清晰的目标可视化。

## ✨ 核心特性

- **🛒 精细化支出模拟**：

  - 基于**月度**的微观视角（住房、餐饮、电子娱乐等 6 大维度）输入，自动推算年度总开销。

  - 实时可视化饼图分析支出结构。

- **🎯 多维度 FIRE 目标**：

  - **基础版**：经典的 4% 法则（年支出 × 25 倍）。

  - **动态版**：自定义投资回报率（靠利息生活）与安全提取率（本金消耗模式）。

  - **自定义目标**：设定你心中的具体金额（如 500 万），倒推达成时间。

- **⏳ 时间复利计算**：

  - 内置复利增长模型（默认 4% 储蓄增长率），科学计算达成目标所需的奋斗年限。

  - 告别线性估算，让时间的价值看得见。

- **🎨 极简美学设计**：

  - 完全响应式布局，适配移动端与桌面端。

  - 精心设计的交互滑块与动态数据卡片，提供流畅的操作体验。

## 🛠️ 技术栈

- **Frontend**: React 18, TypeScript, Vite

- **Styling**: Tailwind CSS

- **Icons**: Lucide React

- **Charts**: Recharts

- **Build Tool**: AIStudio / WebContainer (or your local env)

## 🚀 快速开始

1.  **克隆仓库**

    codeBash

        git clone https://github.com/qwerzyy2/fire-.git

2.  **安装依赖**

    codeBash

        cd fire-lifestyle-planner
        npm install

3.  **启动开发服务器**

    codeBash

        npm run dev

4.  打开浏览器访问 http://localhost:5173 即可开始规划你的自由人生！

## 🧮 核心算法说明

### 1. 退休金计算 (FIRE Number)

默认采用 4% 安全提取率，即年支出的 25 倍。

### 2. 达成目标所需时间 (Years to Goal)

假设每年的结余（年收入 - 年支出）按固定利率 

 进行复利投资：

-  = 所需年数

-  = 投资年化增长率 (本工具设定储蓄增长率为 4%)

## 📄 许可证

本项目基于 [MIT License](https://www.google.com/url?sa=E&q=LICENSE) 开源。

------------------------------------------------------------------------

Made with ❤️ for the FIRE community.
