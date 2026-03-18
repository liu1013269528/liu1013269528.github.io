import{_ as s,o as n,c as t,ag as e}from"./chunks/framework.D_Vktuop.js";const b=JSON.parse('{"title":"nanobot 目录结构","description":"","frontmatter":{},"headers":[],"relativePath":"guide/overview/directory-structure.md","filePath":"guide/overview/directory-structure.md","lastUpdated":null}'),p={name:"guide/overview/directory-structure.md"};function d(l,a,i,o,r,c){return n(),t("div",null,[...a[0]||(a[0]=[e(`<h1 id="nanobot-目录结构" tabindex="-1">nanobot 目录结构 <a class="header-anchor" href="#nanobot-目录结构" aria-label="Permalink to &quot;nanobot 目录结构&quot;">​</a></h1><blockquote><p>了解项目的代码组织和文件布局</p></blockquote><p><strong>版本</strong>: v1.0.0 | <strong>代码版本</strong>: nanobot v0.1.4.post4 | <strong>更新日期</strong>: 2026-03-12</p><hr><h2 id="📖-目录" tabindex="-1">📖 目录 <a class="header-anchor" href="#📖-目录" aria-label="Permalink to &quot;📖 目录&quot;">​</a></h2><ul><li><a href="#项目根目录">项目根目录</a></li><li><a href="#核心代码目录">核心代码目录</a></li><li><a href="#文件到模块映射表">文件到模块映射表</a></li></ul><hr><h2 id="项目根目录" tabindex="-1">项目根目录 <a class="header-anchor" href="#项目根目录" aria-label="Permalink to &quot;项目根目录&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nanobot/</span></span>
<span class="line"><span>├── nanobot/              # 核心代码包 (~4000 行)</span></span>
<span class="line"><span>├── bridge/               # WhatsApp 桥接器 (Node.js)</span></span>
<span class="line"><span>├── tests/                # 测试代码</span></span>
<span class="line"><span>├── docs/                 # 项目文档 (本目录)</span></span>
<span class="line"><span>├── openspec/             # OpenSpec 变更管理</span></span>
<span class="line"><span>├── pyproject.toml        # 项目配置文件</span></span>
<span class="line"><span>├── README.md             # 项目说明</span></span>
<span class="line"><span>├── LICENSE               # MIT 许可证</span></span>
<span class="line"><span>└── CLAUDE.md             # 开发指南</span></span></code></pre></div><h3 id="关键文件说明" tabindex="-1">关键文件说明 <a class="header-anchor" href="#关键文件说明" aria-label="Permalink to &quot;关键文件说明&quot;">​</a></h3><table tabindex="0"><thead><tr><th>文件</th><th>说明</th></tr></thead><tbody><tr><td><code>pyproject.toml</code></td><td>项目元数据、依赖、工具配置</td></tr><tr><td><code>README.md</code></td><td>项目介绍、快速开始</td></tr><tr><td><code>LICENSE</code></td><td>MIT 开源许可证</td></tr><tr><td><code>CLAUDE.md</code></td><td>Claude Code 开发指南</td></tr><tr><td><code>core_agent_lines.sh</code></td><td>统计核心代码行数的脚本</td></tr></tbody></table><hr><h2 id="核心代码目录" tabindex="-1">核心代码目录 <a class="header-anchor" href="#核心代码目录" aria-label="Permalink to &quot;核心代码目录&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nanobot/</span></span>
<span class="line"><span>├── __init__.py              # 包初始化</span></span>
<span class="line"><span>├── __main__.py              # 入口点：\`python -m nanobot\`</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── agent/                   # 🧠 代理核心 (~1000 行)</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   ├── loop.py              # 主循环：消息处理引擎</span></span>
<span class="line"><span>│   ├── context.py           # 上下文构建器</span></span>
<span class="line"><span>│   ├── memory.py            # 记忆系统 (MEMORY.md/HISTORY.md)</span></span>
<span class="line"><span>│   ├── skills.py            # 技能加载器</span></span>
<span class="line"><span>│   ├── subagent.py          # 子代理管理器</span></span>
<span class="line"><span>│   └── tools/               # 🔧 工具系统 (~800 行)</span></span>
<span class="line"><span>│       ├── __init__.py</span></span>
<span class="line"><span>│       ├── base.py          # 工具基类</span></span>
<span class="line"><span>│       ├── registry.py      # 工具注册表</span></span>
<span class="line"><span>│       ├── filesystem.py    # 文件操作工具</span></span>
<span class="line"><span>│       ├── shell.py         # Shell 命令工具</span></span>
<span class="line"><span>│       ├── web.py           # 网络工具 (搜索/抓取)</span></span>
<span class="line"><span>│       ├── message.py       # 发送消息工具</span></span>
<span class="line"><span>│       ├── spawn.py         # 子代理生成工具</span></span>
<span class="line"><span>│       ├── cron.py          # 定时任务工具</span></span>
<span class="line"><span>│       └── mcp.py           # MCP 协议工具</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── channels/                # 📡 聊天通道 (~1500 行)</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   ├── base.py              # 通道基类 (抽象接口)</span></span>
<span class="line"><span>│   ├── manager.py           # 通道管理器</span></span>
<span class="line"><span>│   ├── telegram.py          # Telegram 实现</span></span>
<span class="line"><span>│   ├── discord.py           # Discord 实现</span></span>
<span class="line"><span>│   ├── feishu.py            # 飞书实现</span></span>
<span class="line"><span>│   ├── slack.py             # Slack 实现</span></span>
<span class="line"><span>│   ├── whatsapp.py          # WhatsApp 实现</span></span>
<span class="line"><span>│   ├── email.py             # Email 实现</span></span>
<span class="line"><span>│   ├── qq.py                # QQ 实现</span></span>
<span class="line"><span>│   ├── dingtalk.py          # 钉钉实现</span></span>
<span class="line"><span>│   ├── matrix.py            # Matrix 实现</span></span>
<span class="line"><span>│   └── mochat.py            # 企业微信实现</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── bus/                     # 🚌 消息总线</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   ├── queue.py             # 消息队列实现</span></span>
<span class="line"><span>│   └── events.py            # 事件定义 (InboundMessage/OutboundMessage)</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── providers/               # 🤖 LLM 提供商 (~500 行)</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   ├── registry.py          # 提供商注册表</span></span>
<span class="line"><span>│   ├── base.py              # 提供商基类</span></span>
<span class="line"><span>│   ├── litellm_provider.py  # LiteLLM 提供商 (100+ 模型)</span></span>
<span class="line"><span>│   ├── custom_provider.py   # 自定义提供商</span></span>
<span class="line"><span>│   ├── openai_codex_provider.py  # OpenAI Codex 提供商</span></span>
<span class="line"><span>│   ├── azure_openai_provider.py  # Azure OpenAI 提供商</span></span>
<span class="line"><span>│   └── transcription.py     # 语音转录 (Groq Whisper)</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── session/                 # 💾 会话管理</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   └── manager.py           # 会话管理器 (Session/SessionManager)</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── cron/                    # ⏰ 定时任务</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   ├── service.py           # CronService</span></span>
<span class="line"><span>│   └── types.py             # 任务类型定义</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── heartbeat/               # 💓 心跳服务</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   └── service.py           # HeartbeatService</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── config/                  # ⚙️ 配置管理</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   ├── schema.py            # 配置 Pydantic 模型</span></span>
<span class="line"><span>│   ├── loader.py            # 配置加载器</span></span>
<span class="line"><span>│   └── paths.py             # 路径解析工具</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── cli/                     # 💻 命令行接口</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   └── commands.py          # Typer 命令定义</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── skills/                  # 📚 内置技能</span></span>
<span class="line"><span>│   ├── README.md</span></span>
<span class="line"><span>│   ├── clawhub/             # ClawHub 技能</span></span>
<span class="line"><span>│   ├── cron/                # 定时任务技能</span></span>
<span class="line"><span>│   ├── github/              # GitHub 技能</span></span>
<span class="line"><span>│   ├── memory/              # 记忆管理技能</span></span>
<span class="line"><span>│   ├── skill-creator/       # 技能创建技能</span></span>
<span class="line"><span>│   ├── summarize/           # 摘要技能</span></span>
<span class="line"><span>│   ├── tmux/                # tmux 技能</span></span>
<span class="line"><span>│   └── weather/             # 天气技能</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── templates/               # 📄 模板文件</span></span>
<span class="line"><span>│   ├── __init__.py</span></span>
<span class="line"><span>│   ├── AGENTS.md            # Agent 配置模板</span></span>
<span class="line"><span>│   ├── SOUL.md              # AI 个性模板</span></span>
<span class="line"><span>│   ├── USER.md              # 用户偏好模板</span></span>
<span class="line"><span>│   ├── TOOLS.md             # 自定义工具说明</span></span>
<span class="line"><span>│   └── memory/              # 记忆文件模板</span></span>
<span class="line"><span>│       └── MEMORY.md</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>└── utils/                   # 🔧 工具函数</span></span>
<span class="line"><span>    ├── __init__.py</span></span>
<span class="line"><span>    └── helpers.py           # 辅助函数</span></span></code></pre></div><hr><h2 id="目录详解" tabindex="-1">目录详解 <a class="header-anchor" href="#目录详解" aria-label="Permalink to &quot;目录详解&quot;">​</a></h2><h3 id="agent-代理核心" tabindex="-1">agent/ - 代理核心 <a class="header-anchor" href="#agent-代理核心" aria-label="Permalink to &quot;agent/ - 代理核心&quot;">​</a></h3><p><strong>职责</strong>：AI 代理的核心逻辑，包括消息处理、上下文构建、记忆管理等。</p><table tabindex="0"><thead><tr><th>文件</th><th>行数（约）</th><th>职责</th></tr></thead><tbody><tr><td><code>loop.py</code></td><td>~400</td><td>主循环：消息分发、LLM 调用、工具执行</td></tr><tr><td><code>context.py</code></td><td>~200</td><td>构建发送给 LLM 的完整上下文</td></tr><tr><td><code>memory.py</code></td><td>~150</td><td>长期记忆管理 (MEMORY.md/HISTORY.md)</td></tr><tr><td><code>skills.py</code></td><td>~100</td><td>加载工作空间和内置技能</td></tr><tr><td><code>subagent.py</code></td><td>~150</td><td>子代理管理（后台任务）</td></tr></tbody></table><p><strong>agent/tools/</strong> - 工具系统：</p><table tabindex="0"><thead><tr><th>文件</th><th>职责</th></tr></thead><tbody><tr><td><code>base.py</code></td><td>工具抽象基类</td></tr><tr><td><code>registry.py</code></td><td>工具注册表，管理所有工具</td></tr><tr><td><code>filesystem.py</code></td><td>read_file, write_file, edit_file, list_dir</td></tr><tr><td><code>shell.py</code></td><td>exec (执行 Shell 命令)</td></tr><tr><td><code>web.py</code></td><td>web_search, web_fetch</td></tr><tr><td><code>message.py</code></td><td>发送消息到聊天频道</td></tr><tr><td><code>spawn.py</code></td><td>spawn (创建子代理)</td></tr><tr><td><code>cron.py</code></td><td>创建/删除/列出定时任务</td></tr><tr><td><code>mcp.py</code></td><td>MCP 协议工具集成</td></tr></tbody></table><h3 id="channels-聊天通道" tabindex="-1">channels/ - 聊天通道 <a class="header-anchor" href="#channels-聊天通道" aria-label="Permalink to &quot;channels/ - 聊天通道&quot;">​</a></h3><p><strong>职责</strong>：适配不同聊天平台，统一消息格式。</p><table tabindex="0"><thead><tr><th>文件</th><th>行数（约）</th><th>职责</th></tr></thead><tbody><tr><td><code>base.py</code></td><td>~150</td><td>BaseChannel 抽象基类</td></tr><tr><td><code>manager.py</code></td><td>~100</td><td>管理所有通道实例</td></tr><tr><td><code>telegram.py</code></td><td>~200</td><td>Telegram Bot API 实现</td></tr><tr><td><code>discord.py</code></td><td>~200</td><td>Discord Bot 实现</td></tr><tr><td><code>feishu.py</code></td><td>~200</td><td>飞书开放平台实现</td></tr><tr><td><code>slack.py</code></td><td>~150</td><td>Slack API 实现</td></tr><tr><td><code>whatsapp.py</code></td><td>~100</td><td>WhatsApp 桥接实现</td></tr><tr><td><code>email.py</code></td><td>~100</td><td>邮件通道实现</td></tr><tr><td><code>qq.py</code></td><td>~100</td><td>QQ 机器人实现</td></tr><tr><td><code>dingtalk.py</code></td><td>~100</td><td>钉钉机器人实现</td></tr></tbody></table><p><strong>设计模式</strong>：适配器模式 - 将不同平台接口统一为 <code>BaseChannel</code></p><h3 id="bus-消息总线" tabindex="-1">bus/ - 消息总线 <a class="header-anchor" href="#bus-消息总线" aria-label="Permalink to &quot;bus/ - 消息总线&quot;">​</a></h3><p><strong>职责</strong>：解耦通道和代理的异步消息队列。</p><table tabindex="0"><thead><tr><th>文件</th><th>行数（约）</th><th>职责</th></tr></thead><tbody><tr><td><code>queue.py</code></td><td>~50</td><td>MessageBus 实现 (inbound/outbound 队列)</td></tr><tr><td><code>events.py</code></td><td>~50</td><td>InboundMessage/OutboundMessage 数据类</td></tr></tbody></table><h3 id="providers-llm-提供商" tabindex="-1">providers/ - LLM 提供商 <a class="header-anchor" href="#providers-llm-提供商" aria-label="Permalink to &quot;providers/ - LLM 提供商&quot;">​</a></h3><p><strong>职责</strong>：统一接口调用不同 LLM 提供商。</p><table tabindex="0"><thead><tr><th>文件</th><th>行数（约）</th><th>职责</th></tr></thead><tbody><tr><td><code>registry.py</code></td><td>~200</td><td>PROVIDERS 注册表、模型匹配</td></tr><tr><td><code>base.py</code></td><td>~50</td><td>Provider 抽象基类</td></tr><tr><td><code>litellm_provider.py</code></td><td>~100</td><td>LiteLLM 提供商 (支持 100+ 模型)</td></tr><tr><td><code>custom_provider.py</code></td><td>~50</td><td>自定义 API 端点提供商</td></tr><tr><td><code>openai_codex_provider.py</code></td><td>~50</td><td>OpenAI Codex 专用</td></tr><tr><td><code>azure_openai_provider.py</code></td><td>~50</td><td>Azure OpenAI 专用</td></tr></tbody></table><h3 id="session-会话管理" tabindex="-1">session/ - 会话管理 <a class="header-anchor" href="#session-会话管理" aria-label="Permalink to &quot;session/ - 会话管理&quot;">​</a></h3><p><strong>职责</strong>：管理对话历史，支持记忆合并。</p><table tabindex="0"><thead><tr><th>文件</th><th>行数（约）</th><th>职责</th></tr></thead><tbody><tr><td><code>manager.py</code></td><td>~200</td><td>Session/SessionManager 类</td></tr></tbody></table><p><strong>存储格式</strong>：JSONL (每行一个 JSON)</p><h3 id="config-配置管理" tabindex="-1">config/ - 配置管理 <a class="header-anchor" href="#config-配置管理" aria-label="Permalink to &quot;config/ - 配置管理&quot;">​</a></h3><p><strong>职责</strong>：加载、验证、解析配置。</p><table tabindex="0"><thead><tr><th>文件</th><th>行数（约）</th><th>职责</th></tr></thead><tbody><tr><td><code>schema.py</code></td><td>~300</td><td>Pydantic 配置模型</td></tr><tr><td><code>loader.py</code></td><td>~100</td><td>配置加载和保存</td></tr><tr><td><code>paths.py</code></td><td>~100</td><td>路径解析 (workspace/runtime)</td></tr></tbody></table><h3 id="cli-命令行接口" tabindex="-1">cli/ - 命令行接口 <a class="header-anchor" href="#cli-命令行接口" aria-label="Permalink to &quot;cli/ - 命令行接口&quot;">​</a></h3><p><strong>职责</strong>：提供 <code>nanobot</code> 命令。</p><table tabindex="0"><thead><tr><th>文件</th><th>行数（约）</th><th>职责</th></tr></thead><tbody><tr><td><code>commands.py</code></td><td>~300</td><td>Typer 命令定义</td></tr></tbody></table><p><strong>命令</strong>：</p><ul><li><code>nanobot onboard</code> - 初始化配置</li><li><code>nanobot gateway</code> - 启动网关</li><li><code>nanobot agent</code> - 启动 CLI 代理</li><li><code>nanobot status</code> - 查看状态</li></ul><h3 id="skills-内置技能" tabindex="-1">skills/ - 内置技能 <a class="header-anchor" href="#skills-内置技能" aria-label="Permalink to &quot;skills/ - 内置技能&quot;">​</a></h3><p><strong>职责</strong>：教 AI 如何完成特定任务。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>skills/</span></span>
<span class="line"><span>├── clawhub/     # ClawHub 集成</span></span>
<span class="line"><span>├── cron/        # 定时任务管理</span></span>
<span class="line"><span>├── github/      # GitHub 操作</span></span>
<span class="line"><span>├── memory/      # 记忆管理</span></span>
<span class="line"><span>├── summarize/   # 文本摘要</span></span>
<span class="line"><span>├── tmux/        # tmux 会话管理</span></span>
<span class="line"><span>└── weather/     # 天气查询</span></span></code></pre></div><p><strong>技能文件格式</strong>：</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">技能描述</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">nanobot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  always</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  requires</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    bins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">git</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 技能说明</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">使用此技能时...</span></span></code></pre></div><h3 id="templates-模板文件" tabindex="-1">templates/ - 模板文件 <a class="header-anchor" href="#templates-模板文件" aria-label="Permalink to &quot;templates/ - 模板文件&quot;">​</a></h3><p><strong>职责</strong>：提供配置文件模板。</p><table tabindex="0"><thead><tr><th>文件</th><th>用途</th></tr></thead><tbody><tr><td><code>AGENTS.md</code></td><td>Agent 配置模板</td></tr><tr><td><code>SOUL.md</code></td><td>AI 个性定义模板</td></tr><tr><td><code>USER.md</code></td><td>用户偏好模板</td></tr><tr><td><code>TOOLS.md</code></td><td>自定义工具说明</td></tr><tr><td><code>memory/MEMORY.md</code></td><td>记忆文件模板</td></tr></tbody></table><hr><h2 id="文件到模块映射表" tabindex="-1">文件到模块映射表 <a class="header-anchor" href="#文件到模块映射表" aria-label="Permalink to &quot;文件到模块映射表&quot;">​</a></h2><table tabindex="0"><thead><tr><th>想要...</th><th>找这个文件/目录</th></tr></thead><tbody><tr><td>理解消息处理流程</td><td><code>agent/loop.py</code></td></tr><tr><td>添加新聊天平台</td><td><code>channels/base.py</code> → 继承实现</td></tr><tr><td>添加新工具</td><td><code>agent/tools/base.py</code> → 继承实现</td></tr><tr><td>修改 LLM 调用</td><td><code>providers/</code> 目录</td></tr><tr><td>修改配置格式</td><td><code>config/schema.py</code></td></tr><tr><td>添加新命令</td><td><code>cli/commands.py</code></td></tr><tr><td>添加新技能</td><td><code>skills/</code> 目录</td></tr><tr><td>理解会话存储</td><td><code>session/manager.py</code></td></tr><tr><td>理解消息格式</td><td><code>bus/events.py</code></td></tr><tr><td>修改系统提示词</td><td><code>agent/context.py</code></td></tr><tr><td>了解记忆机制</td><td><code>agent/memory.py</code></td></tr></tbody></table><hr><h2 id="代码组织原则" tabindex="-1">代码组织原则 <a class="header-anchor" href="#代码组织原则" aria-label="Permalink to &quot;代码组织原则&quot;">​</a></h2><h3 id="_1-按功能分层" tabindex="-1">1. 按功能分层 <a class="header-anchor" href="#_1-按功能分层" aria-label="Permalink to &quot;1. 按功能分层&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>入口 (cli/) → 配置 (config/) → 核心 (agent/) → 外部 (channels/, providers/)</span></span></code></pre></div><h3 id="_2-依赖方向" tabindex="-1">2. 依赖方向 <a class="header-anchor" href="#_2-依赖方向" aria-label="Permalink to &quot;2. 依赖方向&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>高层模块 (agent/) 依赖 低层模块 (bus/, session/)</span></span>
<span class="line"><span>高层模块 (channels/) 依赖 低层模块 (bus/)</span></span>
<span class="line"><span>不依赖具体实现，依赖抽象 (base.py)</span></span></code></pre></div><h3 id="_3-可扩展性" tabindex="-1">3. 可扩展性 <a class="header-anchor" href="#_3-可扩展性" aria-label="Permalink to &quot;3. 可扩展性&quot;">​</a></h3><ul><li><strong>Channels</strong>: 继承 <code>BaseChannel</code></li><li><strong>Providers</strong>: 扩展 <code>PROVIDERS</code> 注册表</li><li><strong>Tools</strong>: 继承 <code>BaseTool</code>，注册到 <code>ToolRegistry</code></li><li><strong>Skills</strong>: 添加 <code>.md</code> 文件</li></ul><hr><h2 id="用户数据目录" tabindex="-1">用户数据目录 <a class="header-anchor" href="#用户数据目录" aria-label="Permalink to &quot;用户数据目录&quot;">​</a></h2><p>nanobot 运行时会创建以下目录：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.nanobot/</span></span>
<span class="line"><span>├── config.json          # 主配置文件</span></span>
<span class="line"><span>├── workspace/           # 工作空间</span></span>
<span class="line"><span>│   ├── sessions/        # 会话历史 (JSONL)</span></span>
<span class="line"><span>│   ├── skills/          # 用户技能</span></span>
<span class="line"><span>│   └── memory/          # 记忆文件</span></span>
<span class="line"><span>│       ├── MEMORY.md    # 长期记忆</span></span>
<span class="line"><span>│       └── HISTORY.md   # 历史日志</span></span>
<span class="line"><span>└── cron/</span></span>
<span class="line"><span>    └── jobs.json        # 定时任务配置</span></span></code></pre></div><p>详见 <a href="./../flow-analysis/onboard-flow.html">配置流程</a>。</p><hr><h2 id="相关文档" tabindex="-1">相关文档 <a class="header-anchor" href="#相关文档" aria-label="Permalink to &quot;相关文档&quot;">​</a></h2><ul><li><a href="./architecture.html">架构设计</a> - 理解整体架构</li><li><a href="./tech-stack.html">技术栈</a> - 了解技术选型</li><li><a href="./../flow-analysis/onboard-flow.html">配置流程</a> - 了解如何配置</li></ul><hr><blockquote><p>💡 <strong>下一步</strong>：了解 <a href="./tech-stack.html">技术栈</a> 或查看 <a href="./../flow-analysis/gateway-startup.html">启动流程</a></p></blockquote>`,72)])])}const y=s(p,[["render",d]]);export{b as __pageData,y as default};
