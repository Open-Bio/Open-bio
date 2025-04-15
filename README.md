
# 项目概述  

Open-Bio 是一个专为生物数据分析与工作流管理设计的数据科学平台。它集成了数据处理与分析工具，帮助研究人员高效地管理工作流并协同完成项目。平台支持个人与团队用户，具备基于角色的访问控制系统和强大的数据处理分析功能。

# 项目模块说明

- **用户管理**：处理用户注册、认证及角色权限管理。  
- **工具注册**：允许用户注册和运行各类分析工具。  
- **工作流管理**：提供可视化工作流编辑器，用于创建与管理数据处理流程。  
- **文件管理**：管理文件上传、下载和存储操作。  
- **AI 智能推荐**：根据用户输入，提供基础的 AI 分析建议。  

# 目录结构树

```
.
├── docs
│   └── open_bio_prd.md                   # 产品需求文档
├── open_bio_class_diagram.mermaid        # 系统类图
├── open_bio_sequence_diagram.mermaid     # 用户交互时序图
├── open_bio_system_design.md             # 系统设计文档
├── README.md                             # 项目概述 
├── backend/                              # 后端目录
└── frontend
    ├── README.md                          # 项目概述与初始化说明
    ├── eslint.config.js                   # ESLint 配置文件
    ├── index.html                         # React 主页面 HTML 文件
    ├── package.json                       # 项目依赖及脚本配置
    ├── postcss.config.js                  # PostCSS 配置
    ├── public/data/example.json           # 示例数据
    ├── src
    │   ├── App.jsx                        # React 主应用组件
    │   ├── components/layout/Layout.jsx   # 页面布局组件
    │   ├── index.css                      # 全局样式文件
    │   ├── main.jsx                       # React 应用入口文件
    │   ├── pages/auth/Login.jsx           # 登录页面组件
    │   ├── pages/auth/Register.jsx        # 注册页面组件
    │   ├── pages/dashboard/Dashboard.jsx  # 仪表盘页面组件
    │   ├── pages/tools/ToolList.jsx       # 工具列表页面组件
    │   └── pages/workflows/WorkflowEditor.jsx # 工作流编辑器组件
    ├── tailwind.config.js                 # Tailwind CSS 配置文件
    └── vite.config.js                     # Vite 项目配置
```

# 文件说明清单

- **open_bio_prd.md**：产品需求文档，描述了项目范围、市场分析、用户画像和功能需求。  
- **open_bio_system_design.md**：系统架构说明文档，包括技术栈与部署策略。  
- **open_bio_class_diagram.mermaid**：系统使用的类结构图。  
- **open_bio_sequence_diagram.mermaid**：展示用户与系统交互的时序图。  
- **react_template/**：React 应用目录，包含各类组件、页面及配置文件。  

# 技术栈

- **前端**：React、TypeScript、Tailwind CSS  
- **后端**：FastAPI、PostgreSQL、Redis  
- **基础设施**：Docker、Kubernetes、MinIO 对象存储  
- **认证系统**：Keycloak  
