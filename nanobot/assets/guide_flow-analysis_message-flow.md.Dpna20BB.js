import{_ as a,o as n,c as i,ag as p}from"./chunks/framework.D_Vktuop.js";const c=JSON.parse('{"title":"nanobot 消息流转","description":"","frontmatter":{},"headers":[],"relativePath":"guide/flow-analysis/message-flow.md","filePath":"guide/flow-analysis/message-flow.md","lastUpdated":null}'),l={name:"guide/flow-analysis/message-flow.md"};function t(e,s,h,k,d,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="nanobot-消息流转" tabindex="-1">nanobot 消息流转 <a class="header-anchor" href="#nanobot-消息流转" aria-label="Permalink to &quot;nanobot 消息流转&quot;">​</a></h1><blockquote><p>从用户发送消息到收到响应的完整路径</p></blockquote><p><strong>版本</strong>: v1.0.0 | <strong>代码版本</strong>: nanobot v0.1.4.post4 | <strong>更新日期</strong>: 2026-03-12</p><hr><h2 id="📖-目录" tabindex="-1">📖 目录 <a class="header-anchor" href="#📖-目录" aria-label="Permalink to &quot;📖 目录&quot;">​</a></h2><ul><li><a href="#完整流程图">完整流程图</a></li><li><a href="#消息格式">消息格式</a></li><li><a href="#数据传递">数据传递</a></li><li><a href="#错误处理">错误处理</a></li><li><a href="#故障排查">故障排查</a></li></ul><hr><h2 id="完整流程图" tabindex="-1">完整流程图 <a class="header-anchor" href="#完整流程图" aria-label="Permalink to &quot;完整流程图&quot;">​</a></h2><h3 id="时序图" tabindex="-1">时序图 <a class="header-anchor" href="#时序图" aria-label="Permalink to &quot;时序图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户                    TelegramChannel      MessageBus       AgentLoop        Provider</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │  发送: &quot;你好&quot;                │                  │               │              │</span></span>
<span class="line"><span>  ├───────────────────────────&gt;│                  │               │              │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │                            │  创建 InboundMessage             │              │</span></span>
<span class="line"><span>  │                            │  - channel: &quot;telegram&quot;          │              │</span></span>
<span class="line"><span>  │                            │  - sender_id: &quot;123&quot;             │              │</span></span>
<span class="line"><span>  │                            │  - content: &quot;你好&quot;               │              │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │                            │  publish_inbound()│              │              │</span></span>
<span class="line"><span>  │                            ├─────────────────&gt;│               │              │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │                            │                  │  consume_inbound()            │</span></span>
<span class="line"><span>  │                            │                  ├──────────────&gt;│              │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │                            │                  │               │  获取会话    │</span></span>
<span class="line"><span>  │                            │                  │               │  构建上下文  │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │                            │                  │               │  chat(messages, tools)</span></span>
<span class="line"><span>  │                            │                  │               ├─────────────&gt;│</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │                            │                  │               │&lt;─────────────┤</span></span>
<span class="line"><span>  │                            │                  │               │  LLM 响应    │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │                            │                  │  publish_outbound              │</span></span>
<span class="line"><span>  │                            │&lt;─────────────────┤               │              │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │  send(OutboundMessage)      │                  │               │              │</span></span>
<span class="line"><span>  │&lt;───────────────────────────┤                  │               │              │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span>
<span class="line"><span>  │  收到: &quot;你好！有什么我可以帮助你的？&quot;           │               │              │</span></span>
<span class="line"><span>  │                            │                  │               │              │</span></span></code></pre></div><h3 id="详细流程图" tabindex="-1">详细流程图 <a class="header-anchor" href="#详细流程图" aria-label="Permalink to &quot;详细流程图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户在 Telegram 发送 &quot;帮我分析 README.md&quot;</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. Telegram 接收消息                                       │</span></span>
<span class="line"><span>│     - Bot API 接收 update                                   │</span></span>
<span class="line"><span>│     - 提取消息内容、发送者信息、聊天 ID                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  2. TelegramChannel._handle_message()                       │</span></span>
<span class="line"><span>│     - 检查权限 (is_allowed)                                 │</span></span>
<span class="line"><span>│     - 下载媒体（如果有）                                    │</span></span>
<span class="line"><span>│     - 转录语音（如果启用）                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3. 创建 InboundMessage                                     │</span></span>
<span class="line"><span>│     {                                                      │</span></span>
<span class="line"><span>│       &quot;channel&quot;: &quot;telegram&quot;,                               │</span></span>
<span class="line"><span>│       &quot;sender_id&quot;: &quot;123456789&quot;,                            │</span></span>
<span class="line"><span>│       &quot;chat_id&quot;: &quot;123456789&quot;,                              │</span></span>
<span class="line"><span>│       &quot;content&quot;: &quot;帮我分析 README.md&quot;,                     │</span></span>
<span class="line"><span>│       &quot;media&quot;: [],                                         │</span></span>
<span class="line"><span>│       &quot;metadata&quot;: {},                                      │</span></span>
<span class="line"><span>│       &quot;session_key&quot;: &quot;telegram:123456789&quot;                  │</span></span>
<span class="line"><span>│     }                                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  4. MessageBus.publish_inbound()                            │</span></span>
<span class="line"><span>│     - 消息进入 inbound Queue                                │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  5. AgentLoop.run() 消费消息                                │</span></span>
<span class="line"><span>│     - 从 inbound Queue 取消息                               │</span></span>
<span class="line"><span>│     - 调用 _dispatch(msg)                                  │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  6. AgentLoop._dispatch()                                   │</span></span>
<span class="line"><span>│     - 检查是否斜杠命令                                      │</span></span>
<span class="line"><span>│     - 调用 _process_message(msg)                           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  7. 获取或创建 Session                                      │</span></span>
<span class="line"><span>│     - session_key = &quot;telegram:123456789&quot;                   │</span></span>
<span class="line"><span>│     - 从 ~/.nanobot/workspace/sessions/ 加载或创建           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  8. 构建上下文 (ContextBuilder)                             │</span></span>
<span class="line"><span>│     - 系统提示词                                            │</span></span>
<span class="line"><span>│     - 历史对话                                              │</span></span>
<span class="line"><span>│     - MEMORY.md                                            │</span></span>
<span class="line"><span>│     - 技能定义                                              │</span></span>
<span class="line"><span>│     - 工具定义                                              │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  9. Agent 迭代循环 (_run_agent_loop)                       │</span></span>
<span class="line"><span>│     ┌─────────────────────────────────────────────────┐    │</span></span>
<span class="line"><span>│     │  迭代 1:                                         │    │</span></span>
<span class="line"><span>│     │  - 调用 LLM                                       │    │</span></span>
<span class="line"><span>│     │  - LLM 返回: tool_calls = [read_file(...)]      │    │</span></span>
<span class="line"><span>│     │  - 执行工具 read_file(&quot;README.md&quot;)               │    │</span></span>
<span class="line"><span>│     │  - 工具返回: 文件内容                             │    │</span></span>
<span class="line"><span>│     │                                                  │    │</span></span>
<span class="line"><span>│     │  迭代 2:                                         │    │</span></span>
<span class="line"><span>│     │  - 调用 LLM (带上工具结果)                        │    │</span></span>
<span class="line"><span>│     │  - LLM 返回: 最终文本 (无工具调用)                │    │</span></span>
<span class="line"><span>│     │  - 返回最终内容                                   │    │</span></span>
<span class="line"><span>│     └─────────────────────────────────────────────────┘    │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  10. 保存会话 (SessionManager)                              │</span></span>
<span class="line"><span>│     - 添加用户消息到 session.messages                       │</span></span>
<span class="line"><span>│     - 添加助手响应到 session.messages                       │</span></span>
<span class="line"><span>│     - 保存到 ~/.nanobot/workspace/sessions/*.jsonl           │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  11. 创建 OutboundMessage                                   │</span></span>
<span class="line"><span>│     {                                                      │</span></span>
<span class="line"><span>│       &quot;channel&quot;: &quot;telegram&quot;,                               │</span></span>
<span class="line"><span>│       &quot;chat_id&quot;: &quot;123456789&quot;,                              │</span></span>
<span class="line"><span>│       &quot;content&quot;: &quot;README.md 是 nanobot 项目...&quot;,            │</span></span>
<span class="line"><span>│       &quot;media&quot;: [],                                         │</span></span>
<span class="line"><span>│       &quot;metadata&quot;: {}                                       │</span></span>
<span class="line"><span>│     }                                                     │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  12. MessageBus.publish_outbound()                          │</span></span>
<span class="line"><span>│     - 消息进入 outbound Queue                               │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  13. ChannelManager 分发响应                                │</span></span>
<span class="line"><span>│     - 根据 channel 路由到对应通道                           │</span></span>
<span class="line"><span>│     - TelegramChannel.send(msg) 被调用                      │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  14. TelegramChannel.send()                                 │</span></span>
<span class="line"><span>│     - 格式化消息（Markdown → Telegram 格式）                │</span></span>
<span class="line"><span>│     - 调用 Bot API 发送消息                                 │</span></span>
<span class="line"><span>│     - bot.send_message(chat_id, text, parse_mode=&quot;Markdown&quot;)│</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  15. 用户收到响应                                           │</span></span>
<span class="line"><span>│     &quot;README.md 是 nanobot 项目...&quot;                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><hr><h2 id="消息格式" tabindex="-1">消息格式 <a class="header-anchor" href="#消息格式" aria-label="Permalink to &quot;消息格式&quot;">​</a></h2><h3 id="inboundmessage" tabindex="-1">InboundMessage <a class="header-anchor" href="#inboundmessage" aria-label="Permalink to &quot;InboundMessage&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/bus/events.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">@dataclass</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> InboundMessage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    入站消息 - 从聊天平台到 Agent</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    channel: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # &quot;telegram&quot;, &quot;discord&quot; 等</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    sender_id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">            # 发送者 ID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    chat_id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # 聊天 ID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    content: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # 消息文本</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    media: list[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]          </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 媒体文件路径</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    metadata: dict[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Any]  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 额外元数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    session_key_override: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> None</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> None</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 覆盖会话密钥</span></span></code></pre></div><h3 id="outboundmessage" tabindex="-1">OutboundMessage <a class="header-anchor" href="#outboundmessage" aria-label="Permalink to &quot;OutboundMessage&quot;">​</a></h3><p><strong>文件</strong>: <code>nanobot/bus/events.py</code></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">@dataclass</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> OutboundMessage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    出站消息 - 从 Agent 到聊天平台</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    channel: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # &quot;telegram&quot;, &quot;discord&quot; 等</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    chat_id: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # 聊天 ID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    content: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">              # 响应文本</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    media: list[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 要发送的媒体</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    metadata: dict[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Any] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 额外元数据</span></span></code></pre></div><h3 id="llm-message-格式" tabindex="-1">LLM Message 格式 <a class="header-anchor" href="#llm-message-格式" aria-label="Permalink to &quot;LLM Message 格式&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 发送给 LLM 的消息格式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;role&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;system&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;user&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;assistant&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;tool&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,           </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 消息内容</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;media&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: list[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],       </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可选：媒体文件</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;tool_calls&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: list[ToolCall],  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 可选：工具调用</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;tool_call_id&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">str</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">       # 可选：工具响应关联</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="数据传递" tabindex="-1">数据传递 <a class="header-anchor" href="#数据传递" aria-label="Permalink to &quot;数据传递&quot;">​</a></h2><h3 id="消息在各组件间的转换" tabindex="-1">消息在各组件间的转换 <a class="header-anchor" href="#消息在各组件间的转换" aria-label="Permalink to &quot;消息在各组件间的转换&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Telegram Update</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ 转换</span></span>
<span class="line"><span>InboundMessage</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ 处理</span></span>
<span class="line"><span>AgentLoop 内部格式</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ 构建</span></span>
<span class="line"><span>LLM Message 格式</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ 响应</span></span>
<span class="line"><span>LLM Response</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ 转换</span></span>
<span class="line"><span>OutboundMessage</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ 格式化</span></span>
<span class="line"><span>Telegram Message</span></span>
<span class="line"><span>       │</span></span>
<span class="line"><span>       ▼ 发送</span></span>
<span class="line"><span>用户收到</span></span></code></pre></div><h3 id="数据格式的变化" tabindex="-1">数据格式的变化 <a class="header-anchor" href="#数据格式的变化" aria-label="Permalink to &quot;数据格式的变化&quot;">​</a></h3><table tabindex="0"><thead><tr><th>阶段</th><th>格式</th><th>说明</th></tr></thead><tbody><tr><td>接收</td><td>Telegram Update</td><td>平台特定格式</td></tr><tr><td>入站</td><td>InboundMessage</td><td>统一格式</td></tr><tr><td>处理</td><td>Python dict</td><td>Agent 内部</td></tr><tr><td>LLM</td><td>LLM Message</td><td>OpenAI 格式</td></tr><tr><td>响应</td><td>LLM Response</td><td>OpenAI 格式</td></tr><tr><td>出站</td><td>OutboundMessage</td><td>统一格式</td></tr><tr><td>发送</td><td>Telegram Message</td><td>平台特定格式</td></tr></tbody></table><hr><h2 id="错误处理" tabindex="-1">错误处理 <a class="header-anchor" href="#错误处理" aria-label="Permalink to &quot;错误处理&quot;">​</a></h2><h3 id="错误捕获层级" tabindex="-1">错误捕获层级 <a class="header-anchor" href="#错误捕获层级" aria-label="Permalink to &quot;错误捕获层级&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  1. Channel 层错误处理                                      │</span></span>
<span class="line"><span>│     - 网络错误                                             │</span></span>
<span class="line"><span>│     - API 错误                                             │</span></span>
<span class="line"><span>│     - 消息格式错误                                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼ 捕获并记录</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  2. AgentLoop 层错误处理                                    │</span></span>
<span class="line"><span>│     - LLM 调用错误                                         │</span></span>
<span class="line"><span>│     - 工具执行错误                                         │</span></span>
<span class="line"><span>│     - 会话管理错误                                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼ 返回错误消息</span></span>
<span class="line"><span>┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span>│  3. 用户友好的错误响应                                      │</span></span>
<span class="line"><span>│     &quot;抱歉，处理你的请求时出错了...&quot;                         │</span></span>
<span class="line"><span>└─────────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="常见错误场景" tabindex="-1">常见错误场景 <a class="header-anchor" href="#常见错误场景" aria-label="Permalink to &quot;常见错误场景&quot;">​</a></h3><table tabindex="0"><thead><tr><th>错误</th><th>触发位置</th><th>处理方式</th></tr></thead><tbody><tr><td>权限拒绝</td><td>Channel.is_allowed()</td><td>记录日志，不处理消息</td></tr><tr><td>LLM API 错误</td><td>Provider.chat()</td><td>返回错误消息，重试</td></tr><tr><td>工具执行失败</td><td>ToolRegistry.execute()</td><td>返回错误信息给 LLM</td></tr><tr><td>会话文件损坏</td><td>SessionManager._load()</td><td>创建新会话</td></tr><tr><td>网络超时</td><td>Channel.send()</td><td>重试或记录错误</td></tr></tbody></table><h3 id="错误消息示例" tabindex="-1">错误消息示例 <a class="header-anchor" href="#错误消息示例" aria-label="Permalink to &quot;错误消息示例&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># LLM API 错误</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    response </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> self</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.provider.chat(messages)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">except</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> APIError </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> e:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> AgentResult(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">        content</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;调用 AI 服务时出错: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(e)</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    )</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 工具执行错误</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tool.run(arguments)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">except</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Exception</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> e:</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;工具执行出错: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{str</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(e)</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span></code></pre></div><hr><h2 id="故障排查" tabindex="-1">故障排查 <a class="header-anchor" href="#故障排查" aria-label="Permalink to &quot;故障排查&quot;">​</a></h2><h3 id="常见故障点" tabindex="-1">常见故障点 <a class="header-anchor" href="#常见故障点" aria-label="Permalink to &quot;常见故障点&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>用户消息</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│ 🔍 故障点 1     │ Channel 是否收到消息？</span></span>
<span class="line"><span>│ Channel 接收     │ 检查 Bot Token 和网络</span></span>
<span class="line"><span>└─────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│ 🔍 故障点 2     │ 是否通过权限检查？</span></span>
<span class="line"><span>│ 权限验证         │ 检查 allowFrom 配置</span></span>
<span class="line"><span>└─────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│ 🔍 故障点 3     │ MessageBus 是否正常？</span></span>
<span class="line"><span>│ 消息队列         │ 检查队列是否阻塞</span></span>
<span class="line"><span>└─────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│ 🔍 故障点 4     │ AgentLoop 是否运行？</span></span>
<span class="line"><span>│ 代理处理         │ 检查进程状态</span></span>
<span class="line"><span>└─────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│ 🔍 故障点 5     │ LLM 是否可访问？</span></span>
<span class="line"><span>│ LLM 调用        │ 检查 API Key 和网络</span></span>
<span class="line"><span>└─────────────────┘</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>┌─────────────────┐</span></span>
<span class="line"><span>│ 🔍 故障点 6     │ 响息是否发送？</span></span>
<span class="line"><span>│ 发送响应        │ 检查 send() 方法</span></span>
<span class="line"><span>└─────────────────┘</span></span></code></pre></div><h3 id="调试技巧" tabindex="-1">调试技巧 <a class="header-anchor" href="#调试技巧" aria-label="Permalink to &quot;调试技巧&quot;">​</a></h3><h4 id="_1-启用详细日志" tabindex="-1">1. 启用详细日志 <a class="header-anchor" href="#_1-启用详细日志" aria-label="Permalink to &quot;1. 启用详细日志&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 启动时启用日志</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanobot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --verbose</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 或设置环境变量</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> NANOBOT_DEBUG</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">nanobot</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gateway</span></span></code></pre></div><h4 id="_2-检查消息队列" tabindex="-1">2. 检查消息队列 <a class="header-anchor" href="#_2-检查消息队列" aria-label="Permalink to &quot;2. 检查消息队列&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 在 AgentLoop 中添加日志</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">logger.info(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Inbound queue size: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bus.inbound.qsize()</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">logger.info(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Outbound queue size: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bus.outbound.qsize()</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h4 id="_3-追踪单个消息" tabindex="-1">3. 追踪单个消息 <a class="header-anchor" href="#_3-追踪单个消息" aria-label="Permalink to &quot;3. 追踪单个消息&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 添加消息 ID 追踪</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">msg_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">msg.channel</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">msg.chat_id</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">time.time()</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">logger.info(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">f</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">msg_id</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">] Processing message: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">{</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">msg.content</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">}</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h4 id="_4-检查会话文件" tabindex="-1">4. 检查会话文件 <a class="header-anchor" href="#_4-检查会话文件" aria-label="Permalink to &quot;4. 检查会话文件&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看会话历史</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.nanobot/workspace/sessions/telegram:123456789.jsonl</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查会话是否正常保存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ls</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -la</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ~/.nanobot/workspace/sessions/</span></span></code></pre></div><h4 id="_5-测试-llm-连接" tabindex="-1">5. 测试 LLM 连接 <a class="header-anchor" href="#_5-测试-llm-连接" aria-label="Permalink to &quot;5. 测试 LLM 连接&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 简单测试脚本</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> asyncio</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nanobot.config.loader </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> load_config</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> nanobot.providers.registry </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> get_provider</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> test_llm</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">():</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    config </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> load_config()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    provider </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> get_provider(config)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    response </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> provider.chat([{</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;role&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;user&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;content&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}])</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(response.content)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">asyncio.run(test_llm())</span></span></code></pre></div><hr><h2 id="性能考虑" tabindex="-1">性能考虑 <a class="header-anchor" href="#性能考虑" aria-label="Permalink to &quot;性能考虑&quot;">​</a></h2><h3 id="消息处理时间" tabindex="-1">消息处理时间 <a class="header-anchor" href="#消息处理时间" aria-label="Permalink to &quot;消息处理时间&quot;">​</a></h3><table tabindex="0"><thead><tr><th>阶段</th><th>平均时间</th><th>说明</th></tr></thead><tbody><tr><td>Channel 接收</td><td>&lt; 10ms</td><td>本地处理</td></tr><tr><td>MessageBus 传递</td><td>&lt; 1ms</td><td>内存队列</td></tr><tr><td>上下文构建</td><td>50-200ms</td><td>依赖历史长度</td></tr><tr><td>LLM 调用</td><td>500ms-5s</td><td>主要耗时</td></tr><tr><td>工具执行</td><td>变化很大</td><td>取决于工具</td></tr><tr><td>响应发送</td><td>&lt; 50ms</td><td>网络 I/O</td></tr></tbody></table><h3 id="优化建议" tabindex="-1">优化建议 <a class="header-anchor" href="#优化建议" aria-label="Permalink to &quot;优化建议&quot;">​</a></h3><ol><li><strong>减少历史消息</strong>：设置合理的 <code>max_messages</code></li><li><strong>缓存上下文</strong>：避免重复构建</li><li><strong>异步工具</strong>：使用异步 I/O</li><li><strong>流式响应</strong>：对于长文本使用流式输出</li></ol><hr><h2 id="相关文档" tabindex="-1">相关文档 <a class="header-anchor" href="#相关文档" aria-label="Permalink to &quot;相关文档&quot;">​</a></h2><ul><li><a href="./agent-execution.html">Agent 执行</a> - Agent 详解</li><li><a href="./../modules/message-bus.html">消息总线</a> - MessageBus 详解</li><li><a href="./../modules/channels.html">通道系统</a> - Channel 详解</li></ul><hr><blockquote><p>💡 <strong>下一步</strong>：了解 <a href="./../modules/">核心模块</a> 或 <a href="./../patterns/">设计模式</a></p></blockquote>`,62)])])}const g=a(l,[["render",t]]);export{c as __pageData,g as default};
