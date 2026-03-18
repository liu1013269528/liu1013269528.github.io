import{_ as a,o as n,c as p,ag as t}from"./chunks/framework.D_Vktuop.js";const g=JSON.parse('{"title":"nanobot 架构设计","description":"","frontmatter":{},"headers":[],"relativePath":"guide/overview/architecture.md","filePath":"guide/overview/architecture.md","lastUpdated":null}'),i={name:"guide/overview/architecture.md"};function l(e,s,d,r,h,o){return n(),p("div",null,[...s[0]||(s[0]=[t(`<h1 id="nanobot-架构设计" tabindex="-1">nanobot 架构设计 <a class="header-anchor" href="#nanobot-架构设计" aria-label="Permalink to &quot;nanobot 架构设计&quot;">​</a></h1><blockquote><p>了解 nanobot 的整体架构和核心设计理念</p></blockquote><p><strong>版本</strong>: v1.0.0 | <strong>代码版本</strong>: nanobot v0.1.4.post4 | <strong>更新日期</strong>: 2026-03-12</p><hr><h2 id="📖-目录" tabindex="-1">📖 目录 <a class="header-anchor" href="#📖-目录" aria-label="Permalink to &quot;📖 目录&quot;">​</a></h2><ul><li><a href="#整体架构">整体架构</a></li><li><a href="#核心设计理念">核心设计理念</a></li><li><a href="#各层职责">各层职责</a></li><li><a href="#技术选型">技术选型</a></li></ul><hr><h2 id="整体架构" tabindex="-1">整体架构 <a class="header-anchor" href="#整体架构" aria-label="Permalink to &quot;整体架构&quot;">​</a></h2><h3 id="架构全景图" tabindex="-1">架构全景图 <a class="header-anchor" href="#架构全景图" aria-label="Permalink to &quot;架构全景图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         聊天平台层                                    │</span></span>
<span class="line"><span>│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │</span></span>
<span class="line"><span>│  │Telegram  │  │Discord   │  │Feishu    │  │WhatsApp  │  ...      │</span></span>
<span class="line"><span>│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │</span></span>
<span class="line"><span>└───────┼────────────┼────────────┼────────────┼─────────────────────┘</span></span>
<span class="line"><span>        │            │            │            │</span></span>
<span class="line"><span>        ▼            ▼            ▼            ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         通道适配层                                    │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                    ChannelManager                           │   │</span></span>
<span class="line"><span>│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │   │</span></span>
<span class="line"><span>│  │  │Telegram  │  │Discord   │  │Feishu    │  │WhatsApp  │   │   │</span></span>
<span class="line"><span>│  │  │Channel   │  │Channel   │  │Channel   │  │Channel   │   │   │</span></span>
<span class="line"><span>│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │   │</span></span>
<span class="line"><span>│  └───────┼────────────┼────────────┼────────────┼─────────────┘   │</span></span>
<span class="line"><span>└──────────┼────────────┼────────────┼────────────┼─────────────────┘</span></span>
<span class="line"><span>           │            │            │            │</span></span>
<span class="line"><span>           └────────────┴────────────┴────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         消息总线层                                    │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│ │                     MessageBus                               │   │</span></span>
<span class="line"><span>│  │                                                              │   │</span></span>
<span class="line"><span>│  │  ┌─────────────────────┐      ┌─────────────────────┐       │   │</span></span>
<span class="line"><span>│  │  │   inbound Queue     │      │  outbound Queue     │       │   │</span></span>
<span class="line"><span>│  │  │  (聊天平台 → Agent)  │      │  (Agent → 聊天平台)  │       │   │</span></span>
<span class="line"><span>│  │  └─────────────────────┘      └─────────────────────┘       │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>└──────────────────────────┬────────────────────────────────────────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>                           ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│                         代理核心层                                    │</span></span>
<span class="line"><span>│  ┌─────────────────────────────────────────────────────────────┐   │</span></span>
<span class="line"><span>│  │                      AgentLoop                               │   │</span></span>
<span class="line"><span>│  │                                                              │   │</span></span>
<span class="line"><span>│  │  ┌────────────────────────────────────────────────────┐     │   │</span></span>
<span class="line"><span>│  │  │  1. 从 inbound 取消息                                │     │   │</span></span>
<span class="line"><span>│  │  │  2. 构建上下文（历史+记忆+技能）                      │     │   │</span></span>
<span class="line"><span>│  │  │  3. Agent 迭代循环:                                  │     │   │</span></span>
<span class="line"><span>│  │  │     ┌──────────────────────────────────┐            │     │   │</span></span>
<span class="line"><span>│  │  │     │ 调用 LLM                         │            │     │   │</span></span>
<span class="line"><span>│  │  │     │   │                              │            │     │   │</span></span>
<span class="line"><span>│  │  │     │   ├─ 需要工具? → ToolRegistry    │            │     │   │</span></span>
<span class="line"><span>│  │  │     │   │                │             │            │     │   │</span></span>
<span class="line"><span>│  │  │     │   └──────────────────────────────┘            │     │   │</span></span>
<span class="line"><span>│  │  │  4. 保存会话 → SessionManager                      │     │   │</span></span>
<span class="line"><span>│  │  │  5. 发送响应 → outbound                            │     │   │</span></span>
<span class="line"><span>│  │  └────────────────────────────────────────────────────┘     │   │</span></span>
<span class="line"><span>│  └─────────────────────────────────────────────────────────────┘   │</span></span>
<span class="line"><span>│                                                                      │</span></span>
<span class="line"><span>│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │</span></span>
<span class="line"><span>│  │ContextBuilder│ │SessionManager│ │MemoryStore  │                │</span></span>
<span class="line"><span>│  └─────────────┘  └─────────────┘  └─────────────┘                │</span></span>
<span class="line"><span>│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                │</span></span>
<span class="line"><span>│  │SkillsLoader │ │SubagentMgmt │ │ToolRegistry │                │</span></span>
<span class="line"><span>│  └─────────────┘  └─────────────┘  └─────────────┘                │</span></span>
<span class="line"><span>└───────────┬───────────────────────┬──────────────────┬─────────────┘</span></span>
<span class="line"><span>            │                       │                  │</span></span>
<span class="line"><span>            ▼                       ▼                  ▼</span></span>
<span class="line"><span>┌───────────────────┐   ┌───────────────────┐   ┌──────────────────┐</span></span>
<span class="line"><span>│   LLM Providers   │   │      Tools        │   │  辅助服务         │</span></span>
<span class="line"><span>│  ┌─────────────┐  │   │ ┌──────┐ ┌──────┐│   │ ┌──────┐ ┌──────┐│</span></span>
<span class="line"><span>│  │ OpenAI     │  │   │ │文件  │ │Shell ││   │ │ Cron │ │Heart ││</span></span>
<span class="line"><span>│  │ Anthropic  │  │   │ │工具  │ │工具  ││   │ │Service│ │Beat  ││</span></span>
<span class="line"><span>│  │ ...        │  │   │ └──────┘ └──────┘│   │ └──────┘ └──────┘│</span></span>
<span class="line"><span>│  └─────────────┘  │   │ ┌──────┐ ┌──────┐│   └──────────────────┘</span></span>
<span class="line"><span>│                   │   │ │ Web  │ │Message│</span></span>
<span class="line"><span>│                   │   │ │工具  │ │工具   ││</span></span>
<span class="line"><span>│                   │   │ └──────┘ └──────┘│</span></span>
<span class="line"><span>└───────────────────┘   └───────────────────┘</span></span></code></pre></div><h3 id="数据流向图" tabindex="-1">数据流向图 <a class="header-anchor" href="#数据流向图" aria-label="Permalink to &quot;数据流向图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户在 Telegram 发送消息</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    TelegramChannel.receive()</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ├─► 检查权限 (is_allowed)</span></span>
<span class="line"><span>         ├─► 下载媒体文件（如果有）</span></span>
<span class="line"><span>         └─► 创建 InboundMessage</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    MessageBus.inbound (入站队列)</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    AgentLoop.run() 消费消息</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ├─► 获取或创建会话 (SessionManager)</span></span>
<span class="line"><span>         ├─► 构建上下文 (ContextBuilder)</span></span>
<span class="line"><span>         │   ├─► 加载系统提示词</span></span>
<span class="line"><span>         │   ├─► 加载历史对话</span></span>
<span class="line"><span>         │   ├─► 加载 MEMORY.md</span></span>
<span class="line"><span>         │   └─► 加载技能文件</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    _run_agent_loop() 迭代循环</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ├─► 调用 LLM (Provider)</span></span>
<span class="line"><span>         │   ├─► 有工具调用？</span></span>
<span class="line"><span>         │   │   ├─► 是 → 执行工具 (ToolRegistry)</span></span>
<span class="line"><span>         │   │   │       └─► 结果发回 LLM</span></span>
<span class="line"><span>         │   │   └─► 否 → 返回最终内容</span></span>
<span class="line"><span>         │   │</span></span>
<span class="line"><span>         │   └─► 循环直到有最终回答</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ├─► 保存会话 (SessionManager)</span></span>
<span class="line"><span>         │   └─► 触发记忆合并（如果太长）</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    创建 OutboundMessage</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    MessageBus.outbound (出站队列)</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    TelegramChannel.send()</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    用户收到回复</span></span></code></pre></div><hr><h2 id="核心设计理念" tabindex="-1">核心设计理念 <a class="header-anchor" href="#核心设计理念" aria-label="Permalink to &quot;核心设计理念&quot;">​</a></h2><h3 id="_1-解耦-decoupling" tabindex="-1">1. 解耦 (Decoupling) <a class="header-anchor" href="#_1-解耦-decoupling" aria-label="Permalink to &quot;1. 解耦 (Decoupling)&quot;">​</a></h3><p><strong>原则</strong>：各组件之间通过消息总线通信，互不依赖。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌────────────┐      消息      ┌────────────┐</span></span>
<span class="line"><span>│  Channel   │ ═════════════▶ │   Agent    │</span></span>
<span class="line"><span>│            │ ◀═════════════ │            │</span></span>
<span class="line"><span>└────────────┘      消息      └────────────┘</span></span>
<span class="line"><span>     不依赖                            不依赖</span></span>
<span class="line"><span>      具体实现                          具体渠道</span></span></code></pre></div><p><strong>好处</strong>：</p><ul><li>✅ 添加新渠道无需修改 Agent 代码</li><li>✅ Agent 可以独立测试</li><li>✅ 各组件可以独立演进</li></ul><h3 id="_2-异步优先-async-first" tabindex="-1">2. 异步优先 (Async-First) <a class="header-anchor" href="#_2-异步优先-async-first" aria-label="Permalink to &quot;2. 异步优先 (Async-First)&quot;">​</a></h3><p><strong>原则</strong>：全面使用 <code>asyncio</code> 实现高并发。</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 示例：消息处理是异步的</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        msg </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.bus.consume_inbound()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 异步等待</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        await</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._dispatch(msg)  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 异步处理</span></span></code></pre></div><p><strong>好处</strong>：</p><ul><li>✅ 同时处理多个用户的请求</li><li>✅ I/O 操作不阻塞（网络、文件）</li><li>✅ 充分利用系统资源</li></ul><h3 id="_3-插件化-plugin-based" tabindex="-1">3. 插件化 (Plugin-Based) <a class="header-anchor" href="#_3-插件化-plugin-based" aria-label="Permalink to &quot;3. 插件化 (Plugin-Based)&quot;">​</a></h3><p><strong>原则</strong>：Channels、Providers、Tools 都是可插拔的。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>                    ┌──────────────┐</span></span>
<span class="line"><span>                    │  Registry    │</span></span>
<span class="line"><span>                    │  (注册表)     │</span></span>
<span class="line"><span>                    └──────┬───────┘</span></span>
<span class="line"><span>                           │</span></span>
<span class="line"><span>           ┌───────────────┼───────────────┐</span></span>
<span class="line"><span>           │               │               │</span></span>
<span class="line"><span>      ┌────▼────┐    ┌────▼────┐    ┌────▼────┐</span></span>
<span class="line"><span>      │Plugin A │    │Plugin B │    │Plugin C │</span></span>
<span class="line"><span>      └─────────┘    └─────────┘    └─────────┘</span></span>
<span class="line"><span>      随时添加/移除</span></span></code></pre></div><p><strong>好处</strong>：</p><ul><li>✅ 用户可以自定义扩展</li><li>✅ 社区可以贡献插件</li><li>✅ 核心代码保持简洁</li></ul><h3 id="_4-轻量设计-lightweight" tabindex="-1">4. 轻量设计 (Lightweight) <a class="header-anchor" href="#_4-轻量设计-lightweight" aria-label="Permalink to &quot;4. 轻量设计 (Lightweight)&quot;">​</a></h3><p><strong>原则</strong>：最小化依赖，保持代码简洁。</p><table tabindex="0"><thead><tr><th>对比项</th><th>nanobot</th><th>其他框架</th></tr></thead><tbody><tr><td>代码量</td><td>~4000 行</td><td>数万~数十万行</td></tr><tr><td>核心依赖</td><td>5-10 个</td><td>数十个</td></tr><tr><td>启动时间</td><td>秒级</td><td>分钟级</td></tr><tr><td>内存占用</td><td>&lt; 100MB</td><td>数百 MB~GB</td></tr></tbody></table><p><strong>好处</strong>：</p><ul><li>✅ 易于阅读和理解</li><li>✅ 快速启动和部署</li><li>✅ 低资源消耗</li></ul><hr><h2 id="各层职责" tabindex="-1">各层职责 <a class="header-anchor" href="#各层职责" aria-label="Permalink to &quot;各层职责&quot;">​</a></h2><h3 id="第-1-层-聊天平台层" tabindex="-1">第 1 层：聊天平台层 <a class="header-anchor" href="#第-1-层-聊天平台层" aria-label="Permalink to &quot;第 1 层：聊天平台层&quot;">​</a></h3><p><strong>职责</strong>：与用户直接交互的平台（Telegram、Discord 等）</p><p><strong>nanobot 不关心</strong>：</p><ul><li>具体是哪个平台</li><li>平台的特性差异</li><li>消息格式差异</li></ul><p><strong>通道适配层负责转换</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>平台特有消息 → 统一的 InboundMessage</span></span>
<span class="line"><span>               ↓</span></span>
<span class="line"><span>          Agent 处理</span></span>
<span class="line"><span>               ↓</span></span>
<span class="line"><span>统一的 OutboundMessage → 平台特有消息</span></span></code></pre></div><h3 id="第-2-层-通道适配层" tabindex="-1">第 2 层：通道适配层 <a class="header-anchor" href="#第-2-层-通道适配层" aria-label="Permalink to &quot;第 2 层：通道适配层&quot;">​</a></h3><p><strong>职责</strong>：将不同平台的差异统一化</p><p><strong>核心组件</strong>：</p><ul><li><code>BaseChannel</code>：抽象基类，定义统一接口</li><li><code>ChannelManager</code>：管理所有通道实例</li></ul><p><strong>设计模式</strong>：</p><ul><li><strong>适配器模式</strong>：将不同平台接口适配为统一接口</li><li><strong>工厂模式</strong>：根据配置创建对应的通道实例</li></ul><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BaseChannel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ABC</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @abstractmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self): </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @abstractmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> stop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self): </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pass</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    @abstractmethod</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, msg): </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pass</span></span></code></pre></div><h3 id="第-3-层-消息总线层" tabindex="-1">第 3 层：消息总线层 <a class="header-anchor" href="#第-3-层-消息总线层" aria-label="Permalink to &quot;第 3 层：消息总线层&quot;">​</a></h3><p><strong>职责</strong>：解耦通道和代理，提供异步消息传递</p><p><strong>核心组件</strong>：</p><ul><li><code>MessageBus</code>：消息队列容器</li><li><code>InboundMessage</code>：入站消息格式</li><li><code>OutboundMessage</code>：出站消息格式</li></ul><p><strong>设计模式</strong>：</p><ul><li><strong>消息总线模式</strong>：使用队列解耦组件</li></ul><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MessageBus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.inbound </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> asyncio.Queue()   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 入站</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.outbound </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> asyncio.Queue()  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 出站</span></span></code></pre></div><h3 id="第-4-层-代理核心层" tabindex="-1">第 4 层：代理核心层 <a class="header-anchor" href="#第-4-层-代理核心层" aria-label="Permalink to &quot;第 4 层：代理核心层&quot;">​</a></h3><p><strong>职责</strong>：消息处理的核心逻辑</p><p><strong>核心组件</strong>：</p><table tabindex="0"><thead><tr><th>组件</th><th>职责</th></tr></thead><tbody><tr><td><code>AgentLoop</code></td><td>主循环，消息分发和迭代</td></tr><tr><td><code>ContextBuilder</code></td><td>构建 LLM 上下文</td></tr><tr><td><code>SessionManager</code></td><td>管理对话历史</td></tr><tr><td><code>MemoryStore</code></td><td>长期记忆管理</td></tr><tr><td><code>SkillsLoader</code></td><td>技能文件加载</td></tr><tr><td><code>SubagentManager</code></td><td>后台任务管理</td></tr><tr><td><code>ToolRegistry</code></td><td>工具注册表</td></tr></tbody></table><p><strong>设计模式</strong>：</p><ul><li><strong>事件循环模式</strong>：持续处理消息事件</li><li><strong>构建器模式</strong>：ContextBuilder 分步骤构建上下文</li><li><strong>命令模式</strong>：工具封装为可执行命令</li></ul><h3 id="第-5-层-外部服务层" tabindex="-1">第 5 层：外部服务层 <a class="header-anchor" href="#第-5-层-外部服务层" aria-label="Permalink to &quot;第 5 层：外部服务层&quot;">​</a></h3><p><strong>职责</strong>：提供具体功能实现</p><table tabindex="0"><thead><tr><th>服务</th><th>说明</th></tr></thead><tbody><tr><td>LLM Providers</td><td>提供大模型调用</td></tr><tr><td>Tools</td><td>提供可执行的操作</td></tr><tr><td>Cron Service</td><td>定时任务调度</td></tr><tr><td>Heartbeat Service</td><td>定期触发任务</td></tr></tbody></table><hr><h2 id="技术选型" tabindex="-1">技术选型 <a class="header-anchor" href="#技术选型" aria-label="Permalink to &quot;技术选型&quot;">​</a></h2><h3 id="编程语言-python-3-11" tabindex="-1">编程语言：Python 3.11+ <a class="header-anchor" href="#编程语言-python-3-11" aria-label="Permalink to &quot;编程语言：Python 3.11+&quot;">​</a></h3><p><strong>为什么选择 Python？</strong></p><table tabindex="0"><thead><tr><th>优势</th><th>说明</th></tr></thead><tbody><tr><td>异步支持</td><td><code>asyncio</code> 原生支持，性能优秀</td></tr><tr><td>AI 生态</td><td>与 LLM SDK 集成良好</td></tr><tr><td>易读性</td><td>代码简洁，适合学习</td></tr><tr><td>跨平台</td><td>可在 Windows/macOS/Linux 运行</td></tr></tbody></table><h3 id="核心依赖" tabindex="-1">核心依赖 <a class="header-anchor" href="#核心依赖" aria-label="Permalink to &quot;核心依赖&quot;">​</a></h3><table tabindex="0"><thead><tr><th>库</th><th>用途</th><th>为什么选择</th></tr></thead><tbody><tr><td><code>asyncio</code></td><td>异步编程</td><td>Python 内置，性能优秀</td></tr><tr><td><code>pydantic</code></td><td>数据验证</td><td>类型安全，自动校验</td></tr><tr><td><code>typer</code></td><td>CLI 框架</td><td>简洁易用，自动生成帮助</td></tr><tr><td><code>loguru</code></td><td>日志记录</td><td>功能强大，使用简单</td></tr><tr><td><code>litellm</code></td><td>LLM 统一接口</td><td>支持 100+ 模型</td></tr></tbody></table><h3 id="架构模式" tabindex="-1">架构模式 <a class="header-anchor" href="#架构模式" aria-label="Permalink to &quot;架构模式&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模式</th><th>应用位置</th><th>理由</th></tr></thead><tbody><tr><td><strong>消息总线</strong></td><td>MessageBus</td><td>解耦通道和代理</td></tr><tr><td><strong>事件驱动</strong></td><td>AgentLoop</td><td>响应消息事件</td></tr><tr><td><strong>插件式</strong></td><td>Channels/Providers/Tools</td><td>可扩展架构</td></tr><tr><td><strong>注册表</strong></td><td>ToolRegistry</td><td>动态发现和管理</td></tr><tr><td><strong>适配器</strong></td><td>Channel 实现</td><td>统一不同平台接口</td></tr><tr><td><strong>构建器</strong></td><td>ContextBuilder</td><td>分步骤构建复杂对象</td></tr><tr><td><strong>命令</strong></td><td>Tool</td><td>封装操作为对象</td></tr></tbody></table><hr><h2 id="架构优势" tabindex="-1">架构优势 <a class="header-anchor" href="#架构优势" aria-label="Permalink to &quot;架构优势&quot;">​</a></h2><h3 id="_1-易于理解" tabindex="-1">1. 易于理解 <a class="header-anchor" href="#_1-易于理解" aria-label="Permalink to &quot;1. 易于理解&quot;">​</a></h3><ul><li>清晰的分层结构</li><li>每层职责明确</li><li>代码简洁易读</li></ul><h3 id="_2-易于扩展" tabindex="-1">2. 易于扩展 <a class="header-anchor" href="#_2-易于扩展" aria-label="Permalink to &quot;2. 易于扩展&quot;">​</a></h3><ul><li>添加新平台：继承 <code>BaseChannel</code></li><li>添加新工具：继承 <code>BaseTool</code></li><li>添加新 LLM：扩展 <code>ProviderRegistry</code></li></ul><h3 id="_3-易于测试" tabindex="-1">3. 易于测试 <a class="header-anchor" href="#_3-易于测试" aria-label="Permalink to &quot;3. 易于测试&quot;">​</a></h3><ul><li>各组件独立，可单独测试</li><li>依赖注入，方便 Mock</li><li>异步设计，易于模拟</li></ul><h3 id="_4-易于部署" tabindex="-1">4. 易于部署 <a class="header-anchor" href="#_4-易于部署" aria-label="Permalink to &quot;4. 易于部署&quot;">​</a></h3><ul><li>轻量级，资源消耗小</li><li>无需复杂配置</li><li>支持多实例运行</li></ul><hr><h2 id="相关文档" tabindex="-1">相关文档 <a class="header-anchor" href="#相关文档" aria-label="Permalink to &quot;相关文档&quot;">​</a></h2><ul><li><a href="./directory-structure.html">目录结构</a> - 查看代码组织</li><li><a href="./tech-stack.html">技术栈</a> - 了解技术选型</li><li><a href="./../flow-analysis/message-flow.html">消息流转</a> - 详细的数据流</li><li><a href="./../patterns/architectural-patterns.html">架构模式</a> - 设计模式详解</li></ul><hr><blockquote><p>💡 <strong>下一步</strong>：了解 <a href="./directory-structure.html">目录结构</a> 或查看 <a href="./tech-stack.html">技术栈</a></p></blockquote>`,89)])])}const k=a(i,[["render",l]]);export{g as __pageData,k as default};
