import{_ as a,o as n,c as i,ag as p}from"./chunks/framework.D_Vktuop.js";const c=JSON.parse('{"title":"nanobot Gateway 启动流程","description":"","frontmatter":{},"headers":[],"relativePath":"guide/flow-analysis/gateway-startup.md","filePath":"guide/flow-analysis/gateway-startup.md","lastUpdated":null}'),l={name:"guide/flow-analysis/gateway-startup.md"};function e(t,s,h,k,r,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="nanobot-gateway-启动流程" tabindex="-1">nanobot Gateway 启动流程 <a class="header-anchor" href="#nanobot-gateway-启动流程" aria-label="Permalink to &quot;nanobot Gateway 启动流程&quot;">​</a></h1><blockquote><p>nanobot gateway 命令的完整启动过程详解</p></blockquote><p><strong>版本</strong>: v1.0.0 | <strong>代码版本</strong>: nanobot v0.1.4.post4 | <strong>更新日期</strong>: 2026-03-12</p><hr><h2 id="📖-目录" tabindex="-1">📖 目录 <a class="header-anchor" href="#📖-目录" aria-label="Permalink to &quot;📖 目录&quot;">​</a></h2><ul><li><a href="#命令概览">命令概览</a></li><li><a href="#启动流程">启动流程</a></li><li><a href="#核心组件初始化">核心组件初始化</a></li><li><a href="#运行时行为">运行时行为</a></li></ul><hr><h2 id="命令概览" tabindex="-1">命令概览 <a class="header-anchor" href="#命令概览" aria-label="Permalink to &quot;命令概览&quot;">​</a></h2><h3 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanobot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [OPTIONS]</span></span></code></pre></div><h3 id="选项" tabindex="-1">选项 <a class="header-anchor" href="#选项" aria-label="Permalink to &quot;选项&quot;">​</a></h3><table tabindex="0"><thead><tr><th>选项</th><th>简写</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td><code>--port</code></td><td><code>-p</code></td><td><code>18790</code></td><td>Gateway 端口（预留）</td></tr><tr><td><code>--workspace</code></td><td><code>-w</code></td><td>从配置读取</td><td>工作空间目录</td></tr><tr><td><code>--config</code></td><td><code>-c</code></td><td><code>~/.nanobot/config.json</code></td><td>配置文件路径</td></tr><tr><td><code>--verbose</code></td><td><code>-v</code></td><td><code>false</code></td><td>详细输出</td></tr></tbody></table><h3 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h3><p><strong>gateway</strong> 命令启动 nanobot 的网关服务，包括：</p><ol><li>加载配置</li><li>初始化所有核心组件</li><li>启动聊天通道</li><li>启动后台服务</li><li>运行消息处理循环</li></ol><h3 id="生活类比" tabindex="-1">生活类比 <a class="header-anchor" href="#生活类比" aria-label="Permalink to &quot;生活类比&quot;">​</a></h3><p>想象 gateway 就像是&quot;<strong>指挥中心</strong>&quot;：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌──────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│           指挥中心 (gateway)                      │</span></span>
<span class="line"><span>├──────────────────────────────────────────────────┤</span></span>
<span class="line"><span>│                                                  │</span></span>
<span class="line"><span>│  ┌──────────┐    ┌──────────┐    ┌──────────┐ │</span></span>
<span class="line"><span>│  │ 接线员   │    │ 处理员   │    │ 调度员   │ │</span></span>
<span class="line"><span>│  │ Channels │───▶│ Agent    │───▶│ Services  │ │</span></span>
<span class="line"><span>│  └──────────┘    └──────────┘    └──────────┘ │</span></span>
<span class="line"><span>│      接收           处理           后台任务    │</span></span>
<span class="line"><span>│                                                  │</span></span>
<span class="line"><span>└──────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="启动流程" tabindex="-1">启动流程 <a class="header-anchor" href="#启动流程" aria-label="Permalink to &quot;启动流程&quot;">​</a></h2><h3 id="完整流程图" tabindex="-1">完整流程图 <a class="header-anchor" href="#完整流程图" aria-label="Permalink to &quot;完整流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>nanobot gateway</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. 解析命令行参数                                           │</span></span>
<span class="line"><span>│     - port: 18790                                           │</span></span>
<span class="line"><span>│     - workspace: ~/.nanobot/workspace                       │</span></span>
<span class="line"><span>│     - config: ~/.nanobot/config.json                       │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  2. 加载运行时配置                                           │</span></span>
<span class="line"><span>│     config = _load_runtime_config(config, workspace)        │</span></span>
<span class="line"><span>│     - 合并环境变量 NANOBOT__*                               │</span></span>
<span class="line"><span>│     - 验证配置 (Pydantic)                                   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3. 同步工作空间模板                                         │</span></span>
<span class="line"><span>│     sync_workspace_templates(config.workspace_path)        │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  4. 创建核心组件                                             │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│     │  bus = MessageBus()                            │    │</span></span>
<span class="line"><span>│     │  provider = _make_provider(config)             │    │</span></span>
<span class="line"><span>│     │  session_manager = SessionManager(workspace)   │    │</span></span>
<span class="line"><span>│     │  cron = CronService(cron_store_path)           │    │</span></span>
<span class="line"><span>│     │  heartbeat = HeartbeatService()                │    │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  5. 创建 AgentLoop                                           │</span></span>
<span class="line"><span>│     agent = AgentLoop(                                     │</span></span>
<span class="line"><span>│         config=config,                                     │</span></span>
<span class="line"><span>│         bus=bus,                                           │</span></span>
<span class="line"><span>│         provider=provider,                                 │</span></span>
<span class="line"><span>│         session_manager=session_manager,                   │</span></span>
<span class="line"><span>│         cron=cron,                                         │</span></span>
<span class="line"><span>│         heartbeat=heartbeat                                │</span></span>
<span class="line"><span>│     )                                                     │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│     - 注册默认工具                                          │</span></span>
<span class="line"><span>│     - 设置 cron 回调                                        │</span></span>
<span class="line"><span>│     - 设置 heartbeat 回调                                   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  6. 创建并启动通道                                           │</span></span>
<span class="line"><span>│     channel_manager = ChannelManager(                      │</span></span>
<span class="line"><span>│         config=config,                                     │</span></span>
<span class="line"><span>│         bus=bus                                            │</span></span>
<span class="line"><span>│     )                                                     │</span></span>
<span class="line"><span>│     await channel_manager.start()                          │</span></span>
<span class="line"><span>│                                                             │</span></span>
<span class="line"><span>│     根据 config.enabled 启动通道：                         │</span></span>
<span class="line"><span>│     - TelegramChannel                                      │</span></span>
<span class="line"><span>│     - DiscordChannel                                       │</span></span>
<span class="line"><span>│     - FeishuChannel                                        │</span></span>
<span class="line"><span>│     ...                                                   │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  7. 启动后台服务                                             │</span></span>
<span class="line"><span>│     await cron.start()                                    │</span></span>
<span class="line"><span>│     await heartbeat.start(heartbeat_callback, agent)      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  8. 启动 AgentLoop 主循环                                     │</span></span>
<span class="line"><span>│     await agent.run()                                     │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│     │  while True:                                     │    │</span></span>
<span class="line"><span>│     │      msg = await bus.consume_inbound()          │    │</span></span>
<span class="line"><span>│     │      await agent._dispatch(msg)                 │    │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  9. 运行直到收到中断信号 (SIGINT/SIGTERM)                    │</span></span>
<span class="line"><span>│     await shutdown()                                      │</span></span>
<span class="line"><span>│     - 停止通道                                             │</span></span>
<span class="line"><span>│     - 停止服务                                             │</span></span>
<span class="line"><span>│     - 保存状态                                             │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="核心组件初始化" tabindex="-1">核心组件初始化 <a class="header-anchor" href="#核心组件初始化" aria-label="Permalink to &quot;核心组件初始化&quot;">​</a></h2><h3 id="_1-messagebus-消息总线" tabindex="-1">1. MessageBus (消息总线) <a class="header-anchor" href="#_1-messagebus-消息总线" aria-label="Permalink to &quot;1. MessageBus (消息总线)&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/bus/queue.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MessageBus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    消息总线 - 解耦通道和代理</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 入站队列：聊天平台 → Agent</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.inbound </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> asyncio.Queue()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 出站队列：Agent → 聊天平台</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.outbound </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> asyncio.Queue()</span></span></code></pre></div><p><strong>初始化时机</strong>：gateway 启动时立即创建</p><p><strong>作用</strong>：</p><ul><li>解耦各组件</li><li>提供异步消息传递</li><li>缓冲消息避免阻塞</li></ul><h3 id="_2-llm-provider-llm-提供商" tabindex="-1">2. LLM Provider (LLM 提供商) <a class="header-anchor" href="#_2-llm-provider-llm-提供商" aria-label="Permalink to &quot;2. LLM Provider (LLM 提供商)&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/providers/registry.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _make_provider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(config: Config):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    根据配置创建对应的 LLM 提供商</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    匹配规则：</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    1. 检查 model 前缀 (claude- → anthropic)</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    2. 查找 PROVIDERS 注册表</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    3. 创建对应的 Provider 实例</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    model </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config.agents.defaults.model</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    provider_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config.get_provider_name(model)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    provider_config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config.get_provider(model)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 创建提供商实例</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> provider_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;anthropic&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AnthropicProvider(provider_config)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    elif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> provider_name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;openai&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> OpenAIProvider(provider_config)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> LiteLLMProvider(provider_config)</span></span></code></pre></div><p><strong>支持的提供商</strong>：</p><table tabindex="0"><thead><tr><th>提供商</th><th>模型前缀</th><th>示例</th></tr></thead><tbody><tr><td>Anthropic</td><td><code>claude-</code></td><td><code>claude-sonnet-4-20250514</code></td></tr><tr><td>OpenAI</td><td><code>gpt-</code></td><td><code>gpt-4</code>, <code>gpt-3.5-turbo</code></td></tr><tr><td>Azure OpenAI</td><td><code>azure/</code></td><td><code>azure/gpt-4</code></td></tr><tr><td>LiteLLM</td><td>其他所有</td><td><code>gemini-pro</code>, <code>llama-3</code></td></tr></tbody></table><h3 id="_3-sessionmanager-会话管理器" tabindex="-1">3. SessionManager (会话管理器) <a class="header-anchor" href="#_3-sessionmanager-会话管理器" aria-label="Permalink to &quot;3. SessionManager (会话管理器)&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/session/manager.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SessionManager</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    会话管理器 - 管理对话历史</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, workspace: Path):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.workspace </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> workspace</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.sessions_dir </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> workspace </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;sessions&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._cache </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 内存缓存</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> get_or_create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, key: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) -&gt; Session:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        获取或创建会话</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        key 格式：channel:chat_id</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        例如：telegram:123456789</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> key </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._cache:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._cache[key]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 从磁盘加载或创建新会话</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        session </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._load(key) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">or</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Session(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">key</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">key)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._cache[key] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> session</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> session</span></span></code></pre></div><p><strong>会话存储格式</strong>：JSONL (每行一个 JSON)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>~/.nanobot/workspace/sessions/telegram:123456789.jsonl</span></span>
<span class="line"><span>{&quot;role&quot;: &quot;user&quot;, &quot;content&quot;: &quot;你好&quot;}</span></span>
<span class="line"><span>{&quot;role&quot;: &quot;assistant&quot;, &quot;content&quot;: &quot;你好！有什么我可以帮助你的？&quot;}</span></span></code></pre></div><h3 id="_4-cronservice-定时任务服务" tabindex="-1">4. CronService (定时任务服务) <a class="header-anchor" href="#_4-cronservice-定时任务服务" aria-label="Permalink to &quot;4. CronService (定时任务服务)&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/cron/service.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CronService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    定时任务服务</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, store_path: Path):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.store_path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> store_path</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.jobs </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 任务字典</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;启动定时任务调度器&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 加载已保存的任务</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._load_jobs()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 启动调度循环</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        asyncio.create_task(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._scheduler_loop())</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _scheduler_loop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;调度循环：每秒检查一次&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        while</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> asyncio.sleep(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            await</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._check_and_run_jobs()</span></span></code></pre></div><p><strong>任务类型</strong>：</p><table tabindex="0"><thead><tr><th>类型</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><code>at</code></td><td>一次性任务</td><td>在指定时间执行</td></tr><tr><td><code>every</code></td><td>间隔重复</td><td>每 5 分钟执行一次</td></tr><tr><td><code>cron</code></td><td>Cron 表达式</td><td>每天 9:00 执行</td></tr></tbody></table><h3 id="_5-heartbeatservice-心跳服务" tabindex="-1">5. HeartbeatService (心跳服务) <a class="header-anchor" href="#_5-heartbeatservice-心跳服务" aria-label="Permalink to &quot;5. HeartbeatService (心跳服务)&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/heartbeat/service.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> HeartbeatService</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    心跳服务 - 定期触发任务</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, callback, agent):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        启动心跳</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        callback: 触发时的回调函数</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        agent: Agent 实例，用于执行任务</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 加载 HEARTBEAT.md</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        tasks </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._load_heartbeat_tasks()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 计算下次触发时间</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        next_time </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._calculate_next_time()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 启动定时器</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        while</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> asyncio.sleep(next_time </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> now)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> callback(agent, tasks)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            next_time </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._calculate_next_time()</span></span></code></pre></div><p><strong>HEARTBEAT.md 格式</strong>：</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">every</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">1d</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 每日汇总</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">请总结今天的活动...</span></span></code></pre></div><h3 id="_6-channelmanager-通道管理器" tabindex="-1">6. ChannelManager (通道管理器) <a class="header-anchor" href="#_6-channelmanager-通道管理器" aria-label="Permalink to &quot;6. ChannelManager (通道管理器)&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/channels/manager.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ChannelManager</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    通道管理器 - 管理所有聊天通道</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, config: Config, bus: MessageBus):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.bus </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bus</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.channels </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> start</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;启动所有启用的通道&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.config.enabled:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            channel </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._create_channel(name)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> channel.start()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.channels.append(channel)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _create_channel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self, name: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;创建通道实例&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;telegram&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> TelegramChannel(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.config.telegram,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                bus</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.bus</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            )</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        elif</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> name </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;discord&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> DiscordChannel(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.config.discord,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">                bus</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.bus</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            )</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # ... 其他通道</span></span></code></pre></div><h3 id="_7-agentloop-代理循环" tabindex="-1">7. AgentLoop (代理循环) <a class="header-anchor" href="#_7-agentloop-代理循环" aria-label="Permalink to &quot;7. AgentLoop (代理循环)&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/agent/loop.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> AgentLoop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    代理循环 - 消息处理的核心引擎</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    def</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> __init__</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        self,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        config: Config,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        bus: MessageBus,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        provider: BaseProvider,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        session_manager: SessionManager,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        cron: CronService,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        heartbeat: HeartbeatService</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> config</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.bus </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bus</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.provider </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> provider</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.session_manager </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> session_manager</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.cron </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cron</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.heartbeat </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> heartbeat</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        # 注册默认工具</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._register_default_tools()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(self):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &quot;&quot;&quot;主循环&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        while</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> True</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 从 inbound 队列获取消息</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            msg </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.bus.consume_inbound()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 分发并处理消息</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            await</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">._dispatch(msg)</span></span></code></pre></div><hr><h2 id="运行时行为" tabindex="-1">运行时行为 <a class="header-anchor" href="#运行时行为" aria-label="Permalink to &quot;运行时行为&quot;">​</a></h2><h3 id="消息处理流程" tabindex="-1">消息处理流程 <a class="header-anchor" href="#消息处理流程" aria-label="Permalink to &quot;消息处理流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户在 Telegram 发送消息</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    TelegramChannel 收到消息</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ├─► 检查权限 (is_allowed)</span></span>
<span class="line"><span>         ├─► 下载媒体（如果有）</span></span>
<span class="line"><span>         └─► 创建 InboundMessage</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    bus.inbound.put(msg)</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    AgentLoop.run() 消费消息</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ├─► 获取会话 (SessionManager)</span></span>
<span class="line"><span>         ├─► 构建上下文 (ContextBuilder)</span></span>
<span class="line"><span>         ├─► 调用 LLM (Provider)</span></span>
<span class="line"><span>         ├─► 执行工具 (ToolRegistry)</span></span>
<span class="line"><span>         ├─► 保存会话</span></span>
<span class="line"><span>         └─► 发送响应 → bus.outbound</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    TelegramChannel.send()</span></span>
<span class="line"><span>         │</span></span>
<span class="line"><span>         ▼</span></span>
<span class="line"><span>    用户收到回复</span></span></code></pre></div><h3 id="后台任务" tabindex="-1">后台任务 <a class="header-anchor" href="#后台任务" aria-label="Permalink to &quot;后台任务&quot;">​</a></h3><h4 id="cron-任务" tabindex="-1">Cron 任务 <a class="header-anchor" href="#cron-任务" aria-label="Permalink to &quot;Cron 任务&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 用户通过工具创建定时任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">cron_tool.create(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    task</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;每天 9 点发送天气报告&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    schedule</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;0 9 * * *&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    callback</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=lambda</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: weather_report()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># CronService 在后台调度</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 到达指定时间时调用 agent.process_direct()</span></span></code></pre></div><h4 id="heartbeat-任务" tabindex="-1">Heartbeat 任务 <a class="header-anchor" href="#heartbeat-任务" aria-label="Permalink to &quot;Heartbeat 任务&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># HEARTBEAT.md 配置</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">every: </span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic;">1d</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># HeartbeatService 每天触发一次</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 调用 agent.process_direct() 执行任务</span></span></code></pre></div><h3 id="信号处理" tabindex="-1">信号处理 <a class="header-anchor" href="#信号处理" aria-label="Permalink to &quot;信号处理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 注册信号处理器</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">signal.signal(signal.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SIGINT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, _shutdown)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">signal.signal(signal.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SIGTERM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, _shutdown)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> _shutdown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(signum, frame):</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;优雅关闭&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 1. 停止通道</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> channel_manager.stop()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 2. 停止服务</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> cron.stop()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> heartbeat.stop()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 3. 保存会话</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    session_manager.save_all()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # 4. 退出</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sys.exit(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><hr><h2 id="启动依赖图" tabindex="-1">启动依赖图 <a class="header-anchor" href="#启动依赖图" aria-label="Permalink to &quot;启动依赖图&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gateway 启动</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► 配置加载</span></span>
<span class="line"><span>    │   └─► 环境变量合并</span></span>
<span class="line"><span>    │   └─► 配置验证</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► MessageBus (无依赖)</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► Provider</span></span>
<span class="line"><span>    │   └─► 配置</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► SessionManager</span></span>
<span class="line"><span>    │   └─► workspace 路径</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► CronService</span></span>
<span class="line"><span>    │   └─► cron 目录</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► HeartbeatService (无依赖)</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► AgentLoop</span></span>
<span class="line"><span>    │   ├─► MessageBus</span></span>
<span class="line"><span>    │   ├─► Provider</span></span>
<span class="line"><span>    │   ├─► SessionManager</span></span>
<span class="line"><span>    │   ├─► CronService</span></span>
<span class="line"><span>    │   └─► HeartbeatService</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ├─► ChannelManager</span></span>
<span class="line"><span>    │   ├─► MessageBus</span></span>
<span class="line"><span>    │   └─► 配置</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    └─► 启动循环</span></span>
<span class="line"><span>        ├─► channel_manager.start()</span></span>
<span class="line"><span>        ├─► cron.start()</span></span>
<span class="line"><span>        ├─► heartbeat.start()</span></span>
<span class="line"><span>        └─► agent.run()</span></span></code></pre></div><hr><h2 id="调试技巧" tabindex="-1">调试技巧 <a class="header-anchor" href="#调试技巧" aria-label="Permalink to &quot;调试技巧&quot;">​</a></h2><h3 id="启用详细日志" tabindex="-1">启用详细日志 <a class="header-anchor" href="#启用详细日志" aria-label="Permalink to &quot;启用详细日志&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanobot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --verbose</span></span></code></pre></div><h3 id="检查配置" tabindex="-1">检查配置 <a class="header-anchor" href="#检查配置" aria-label="Permalink to &quot;检查配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">python</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -c</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;from nanobot.config.loader import load_config; import json; print(json.dumps(load_config().model_dump(), indent=2))&quot;</span></span></code></pre></div><h3 id="检查通道状态" tabindex="-1">检查通道状态 <a class="header-anchor" href="#检查通道状态" aria-label="Permalink to &quot;检查通道状态&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看 enabled 通道</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.nanobot/config.json</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enabled</span></span></code></pre></div><h3 id="手动测试组件" tabindex="-1">手动测试组件 <a class="header-anchor" href="#手动测试组件" aria-label="Permalink to &quot;手动测试组件&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试 Provider</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nanobot.providers.registry </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> PROVIDERS</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PROVIDERS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 测试配置加载</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nanobot.config.loader </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> load_config</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> load_config()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(config.model)</span></span></code></pre></div><hr><h2 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h2><h3 id="q-gateway-启动失败" tabindex="-1">Q: Gateway 启动失败？ <a class="header-anchor" href="#q-gateway-启动失败" aria-label="Permalink to &quot;Q: Gateway 启动失败？&quot;">​</a></h3><p><strong>A</strong>: 检查：</p><ol><li>配置文件是否存在</li><li>API Key 是否正确</li><li>通道 token 是否正确</li><li>网络连接是否正常</li></ol><h3 id="q-通道无法连接" tabindex="-1">Q: 通道无法连接？ <a class="header-anchor" href="#q-通道无法连接" aria-label="Permalink to &quot;Q: 通道无法连接？&quot;">​</a></h3><p><strong>A</strong>:</p><ol><li>检查 <code>enabled</code> 配置</li><li>检查通道 token</li><li>查看日志信息</li></ol><h3 id="q-如何运行多个实例" tabindex="-1">Q: 如何运行多个实例？ <a class="header-anchor" href="#q-如何运行多个实例" aria-label="Permalink to &quot;Q: 如何运行多个实例？&quot;">​</a></h3><p><strong>A</strong>: 使用不同的配置文件</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanobot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.nanobot-telegram/config.json</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanobot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.nanobot-discord/config.json</span></span></code></pre></div><hr><h2 id="相关文档" tabindex="-1">相关文档 <a class="header-anchor" href="#相关文档" aria-label="Permalink to &quot;相关文档&quot;">​</a></h2><ul><li><a href="./onboard-flow.html">配置流程</a> - 配置向导</li><li><a href="./agent-execution.html">代理运行</a> - Agent 执行流程</li><li><a href="./message-flow.html">消息流转</a> - 完整消息流</li><li><a href="./../modules/channels.html">通道系统</a> - 通道详解</li></ul><hr><blockquote><p>💡 <strong>下一步</strong>：了解 <a href="./agent-execution.html">agent 运行流程</a> 或 <a href="./message-flow.html">消息流转</a></p></blockquote>`,96)])])}const g=a(l,[["render",e]]);export{c as __pageData,g as default};
