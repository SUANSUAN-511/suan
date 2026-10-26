/* ============================================================
   月面旅馆 · MOONLIGHT MOTEL
   剧情 / 解谜 / 存档 / 音频 / 结局
   ============================================================ */
(() => {
  'use strict';

  const SAVE_KEY = 'moonlight_motel_save_v1';
  const CLUE_ORDER = ['diary', 'cam', 'radio', 'guestbook', 'mail'];

  const PAGE_TITLES = {
    home: '月面旅馆',
    diary: '我的日记',
    cam: '阳台摄像头',
    guestbook: '留言簿',
    mail: '收件箱',
    radio: '午夜频率',
    zero: '0号房',
    '404': '找不到网页',
    closed: '连接已关闭'
  };

  const PAGE_PATHS = {
    home: '',
    diary: 'diary.html',
    cam: 'cam.html',
    guestbook: 'guestbook.html',
    mail: 'mail.html',
    radio: 'radio.html',
    zero: 'zero.html',
    '404': 'missing.html',
    closed: 'closed.html'
  };

  const CLUES = {
    diary: {
      title: '最后一篇日记',
      desc: '1999.12.31 23:47。她写：零点，去0号房。',
      toast: '线索归档：最后一篇日记。'
    },
    cam: {
      title: '零点那一帧',
      desc: '704的窗是黑的。0号房的窗里，有一个人抱着纸箱。',
      toast: '线索归档：摄像头捕获帧 00:00:00。'
    },
    radio: {
      title: '两个频率',
      desc: '99.9 是周野的警告；100.0 是陈秀兰在2026年的留言。',
      toast: '线索归档：99.9 与 100.0。'
    },
    guestbook: {
      title: '两个“晚晚”',
      desc: '2001年那条留言里，她自称“妈”。晚晚不是林晚。',
      toast: '线索归档：留言簿笔迹分析。'
    },
    mail: {
      title: '未发送的信',
      desc: '收件人：陈秀兰。定时发送：2000-01-01 00:00。',
      toast: '线索归档：草稿箱里的定时邮件。'
    }
  };

  const BOOT_LINES = [
    { text: 'Award Modular BIOS v4.51PG, An Energy Star Ally', cls: 'dim' },
    { text: 'Copyright (C) 1984-99, Award Software, Inc.', cls: 'dim' },
    { text: '' },
    { text: 'Pentium(R) II 350MHz  /  Memory Test : 65536K OK' },
    { text: 'Detecting IDE Primary Master ... QUANTUM FIREBALL 4.3GB' },
    { text: 'Detecting IDE Secondary Master ... CD-ROM 32X' },
    { text: 'Detecting IDE Secondary Slave ... None' },
    { text: '' },
    { text: 'Archive disc found: [MOONLIGHT_MOTEL_1999.ISO]', cls: 'accent' },
    { text: 'Mounting /dev/archive ... OK' },
    { text: 'Scanning sectors .......................... 1 bad sector (recovered)' },
    { text: 'Rebuilding index .......................... OK' },
    { text: 'Found 1 unread message.', cls: 'warn' },
    { text: 'Found 1 unsent message.', cls: 'warn' },
    { text: 'Visitor counter: 001999 / 002000', cls: 'accent' },
    { text: '' },
    { text: '> RUN MOONLIGHT.EXE', cls: 'accent' },
    { text: '> CONNECT 16300', cls: 'accent' }
  ];

  const STATIC_GUESTBOOK = [
    {
      id: 'g1', date: '2000-01-01 00:03', name: '0', badge: '管理员', ip: '127.0.0.1',
      text: '晚晚，我在0号房等到天亮。你没有回来。'
    },
    {
      id: 'g2', date: '2000-01-03 17:20', name: '0', badge: '管理员', ip: '127.0.0.1',
      text: '网站我接管了。你说过，只要首页还亮着，就不算关店。'
    },
    {
      id: 'g3', date: '2001-01-01 00:00', name: '晚晚', badge: '站长', ip: '127.0.0.1',
      text: '新年快乐。妈给你包了馄饨，放在门口。你回来热一热。'
    },
    {
      id: 'g4', date: '2004-12-31 23:59', name: '0', badge: '管理员', ip: '127.0.0.1',
      text: '今年也过了。对面窗户没亮。'
    },
    {
      id: 'g5', date: '2009-12-31 23:58', name: '晚晚', badge: '站长', ip: '127.0.0.1',
      text: '你的毛衣我收在樟木箱里了。线头散了，我补不好。'
    },
    {
      id: 'g6', date: '2019-12-31 23:59', name: '0', badge: '管理员', ip: '127.0.0.1',
      text: '网站要关了。房东说服务器下个月停电。'
    },
    {
      id: 'g7', date: '2020-01-01 00:00', name: '晚晚', badge: '站长', ip: '127.0.0.1',
      text: '别关。她回来会找不到路。'
    },
    {
      id: 'g8', date: '2026-10-25 23:59', name: '0', badge: '管理员', ip: '127.0.0.1',
      text: '第 2000 位旅客，你终于来了。'
    }
  ];

  const MAILS = [
    {
      id: 'bounce',
      folder: 'inbox',
      fromName: 'Mail Delivery System',
      from: 'postmaster@moonlight-motel.net',
      to: 'wanwan@moonlight-motel.net',
      date: '2000-01-01 00:00',
      subject: '退信：无法投递',
      body: `
        <p>您发送的邮件无法投递。</p>
        <p>目标服务器：<b>moonlight-motel.net</b><br>目标用户：<b>wanwan</b><br>原因：服务器已离线（最后一次响应：1999-12-31 23:59:51）<br>重试次数：<b>1,999</b><br>下次重试：<b>永不</b></p>
        <div class="letter">
          <p><b>----- 原始邮件 -----</b></p>
          <p>主题：新年快乐<br>发件人：wanwan@moonlight-motel.net<br>定时发送：2000-01-01 00:00:00</p>
        </div>
        <p class="system-note">系统备注：投递队列已被冻结。该邮件至今保留在本地缓存中。</p>
      `,
      headers: `Return-Path: <postmaster@moonlight-motel.net>
X-Originating-IP: 127.0.0.1
X-Mailer: FoxMail 3.11
Message-ID: <20000101000000.0@moonlight-motel.net>
X-Status: undelivered`,
      attachments: [
        {
          name: 'postmaster.log',
          desc: '2 KB / 文本文件',
          content: `1999-12-31 23:59:51  连接超时。
1999-12-31 23:59:59  目标主机无响应。
2000-01-01 00:00:00  投递失败。
2000-01-01 00:00:00  重试排队 ... 1,999
2000-01-01 00:00:01  队列冻结。
原因：目标用户不存在，或已离开服务区。`
        }
      ]
    },
    {
      id: 'tape',
      folder: 'inbox',
      fromName: '0',
      from: 'zero@radio-zero.net',
      to: 'wanwan@moonlight-motel.net',
      date: '2026-10-25 23:59',
      subject: '磁带B面',
      body: `
        <p>如果你能读到这封信，说明网站又亮了。</p>
        <p>别去0号房。那里没有鬼。<br>只有一台忘了关的电脑，和一个不肯搬走的阿姨。</p>
        <p>磁带在收音机里。<b>99.9</b>。<br>密码是零点。</p>
        <p class="mail-sig">——0</p>
        <p class="system-note">这封邮件没有经过任何服务器。它是在本机被写下的。</p>
      `,
      headers: `Return-Path: <zero@radio-zero.net>
X-Originating-IP: 127.0.0.1
X-Mailer: 0.exe / build 1999.12.31
X-Auto-Reply: paused
Message-ID: <20261025235959.0@localhost>`,
      attachments: [
        {
          name: 'tape_b.txt',
          desc: '1 KB / 磁带转录',
          content: `TAPE_B / 1999.12.31 23:52 / 时长 04:12
[已损坏 61%]

可读片段：
“晚晚，如果你在听——”
“零点不要来。重复，零点不要来。”
“楼下的煤气管漏了，我刚闻到。”
“我去关总阀。你待在屋里，别开灯。”
“如果……如果我回不来，网站别关。”

[后面是 37 秒的空白。]
[空白之后，有一个女人在哭。]`
        }
      ]
    },
    {
      id: 'mother',
      folder: 'inbox',
      fromName: '陈秀兰',
      from: 'chenxiulan@163.net',
      to: 'wanwan@moonlight-motel.net',
      date: '2026-10-24 06:12',
      subject: '毛衣补好了',
      body: `
        <p>小晚：</p>
        <p>毛衣补好了。今年冬天冷，你记得穿。</p>
        <p>你王阿姨说要给网站办什么注销，我没让。</p>
        <p>妈不会打字，但妈会按你写的那些字。</p>
        <p>你什么时候回来看看都行。妈不催你。</p>
        <p class="mail-sig">妈</p>
        <p class="system-note">发件人字段被手动修改过。原始身份：陈秀兰（母亲）。</p>
      `,
      headers: `Return-Path: <chenxiulan@163.net>
X-Originating-IP: 127.0.0.1
X-Mailer: 163.net WebMail
X-Sender-Name: 陈秀兰
Message-ID: <20261024061203.mother@localhost>`,
      attachments: []
    },
    {
      id: 'nobody',
      folder: 'inbox',
      fromName: 'nobody',
      from: 'nobody@0',
      to: 'wanwan@moonlight-motel.net',
      date: '2000-01-01 00:00',
      subject: 'RE: 你看见我了吗',
      body: `
        <p>我不是她。</p>
        <p>我只是每天替她上线。</p>
        <p>如果有一天你看到这封邮件，请不要回信。</p>
        <p>回信会让她以为，还能等。</p>
        <p class="system-note">自动回复程序 0.exe / 作者：周野 / 最后修改：2000-01-02</p>
      `,
      headers: `Return-Path: <nobody@0>
X-Originating-IP: 127.0.0.1
X-Mailer: 0.exe / build 1999.12.31
X-Auto-Reply: enabled
X-Maintainer: 陈秀兰
Message-ID: <20000101000000.nobody@localhost>`,
      attachments: []
    },
    {
      id: 'draft',
      folder: 'draft',
      fromName: '林晚',
      from: 'wanwan@moonlight-motel.net',
      to: '陈秀兰 <chenxiulan@163.net>',
      date: '1999-12-31 23:47',
      subject: '新年快乐',
      draft: true,
      body: `
        <p><span class="draft-stamp">未发送 / 定时发送失败</span></p>
        <p>妈：</p>
        <p>我出门了。锅里有饺子，别等我。</p>
        <p>我不生你的气。我只是想去看看，2000年的窗户是不是真的会亮。</p>
        <p>如果我没有回来，网站别关。会有人来的。</p>
        <p class="mail-sig">晚晚</p>
        <p class="system-note">定时发送：2000-01-01 00:00:00<br>状态：等待发送（已等待 26 年）<br>发送权限：0号房管理员</p>
      `,
      headers: `Return-Path: <wanwan@moonlight-motel.net>
X-Originating-IP: 127.0.0.1
X-Mailer: FoxMail 3.11
X-Identity: 林晚 (1981-2000)
X-Schedule: 2000-01-01 00:00:00
X-Status: unsent
Message-ID: <19991231234712.wanwan@localhost>`,
      attachments: [
        {
          name: 'dinner.wav',
          desc: '217 KB / 录音（仅恢复文字）',
          content: `DINNER.WAV / 1999.12.31 23:44 / 时长 00:19

[碗筷声]
晚晚：妈，饺子在锅里。
晚晚：我出去一下。零点前回来。
[很长的空白]
晚晚：如果我没回来……你别等。
[录音结束]`
        }
      ]
    }
  ];

  const RADIO_STATIONS = {
    '99.9': {
      title: '午夜频率 / 主播：0',
      time: '23:52',
      note: '信号来源：1999-12-31 / 重播',
      lines: [
        '<span class="timestamp">[99.9 MHz] 1999-12-31 23:52</span>',
        '<span class="speaker">0：</span>测试，测试。',
        '<span class="speaker">0：</span>晚晚，如果你在听——',
        '<span class="speaker">0：</span>零点不要来。重复，零点不要来。',
        '<span class="speaker">0：</span>楼下的煤气管漏了，我刚闻到。',
        '<span class="speaker">0：</span>我去关总阀。你待在屋里，别开灯。',
        '<span class="speaker">0：</span>如果……如果我回不来，网站别关。',
        '<span class="dim">（信号中断 3 秒）</span>',
        '<span class="dim">（背景里有一个女人在哭）</span>',
        '<span class="speaker">女人：</span>她走了……她往你那边去了……',
        '<span class="dim">（磁带结束）</span>'
      ]
    },
    '100.0': {
      title: '未归档频率 / 来源：本机',
      time: '03:12',
      note: '信号来源：2026-10-25 / 未归档录音',
      lines: [
        '<span class="timestamp">[100.0 MHz] 2026-10-25 03:12</span>',
        '<span class="speaker">陈秀兰：</span>晚晚，妈今天又把你的网页打开了。',
        '<span class="speaker">陈秀兰：</span>你王阿姨说，人走了，网站也该关了。',
        '<span class="speaker">陈秀兰：</span>可妈觉得，只要这个页面还亮着，',
        '<span class="speaker">陈秀兰：</span>你就还在加班，没空回家。',
        '<span class="speaker">陈秀兰：</span>妈给你包了荠菜馄饨。放在冰箱第二层。',
        '<span class="speaker">陈秀兰：</span>你什么时候回来都行。妈不催你。',
        '<span class="dim">（很长的空白）</span>',
        '<span class="dim">（录音没有关。能听见一台电脑的风扇声）</span>'
      ]
    }
  };

  const SOURCE_CODE = `<!-- ============================================================ -->
<!-- 月面旅馆 / MOONLIGHT MOTEL                                   -->
<!-- 原站长：林晚 (1981.12.31 - 2000.01.01)                       -->
<!-- 最后更新：2026.10.26 23:59                                   -->
<!-- 维护：陈秀兰                                                 -->
<!-- 自动回复：0.exe / 作者：周野 / 暂停于 2025.12                -->
<!-- ============================================================ -->

<!-- 阿野：阿姨，如果有一天网站亮了，你就按这个。 -->
<!-- 陈秀兰：按了，她是不是就回不来了？ -->
<!-- 阿野：她早就回不来了。可她会知道，有人在等她。 -->
<!-- 陈秀兰：那她为什么还不回来？ -->
<!-- 阿野：因为她不知道，门还开着。 -->

<!-- TODO: send draft -->
<!-- TODO: turn off the light -->
<!-- TODO: tell her it is okay to go -->`;

  const ENDING_DATA = {
    dawn: {
      num: '01',
      title: '天亮',
      en: 'DAYBREAK',
      quote: '有些回信，要走二十六年，才能送到收件人手里。'
    },
    loop: {
      num: '02',
      title: '零点',
      en: '23:59',
      quote: '你保存了一封信。也保存了那间没有出口的房间。'
    },
    silence: {
      num: '03',
      title: '静音',
      en: 'DEAD AIR',
      quote: '有些声音消失的时候，是没有回声的。'
    }
  };

  /* ============================================================
     状态
     ============================================================ */

  function defaultState() {
    return {
      name: '无名旅客',
      started: false,
      sound: false,
      crt: true,
      clues: { diary: false, cam: false, radio: false, guestbook: false, mail: false },
      flags: {
        visitor2000: false,
        counterSeen: false,
        camCaptured: false,
        camEnhanced: false,
        reflectionSeen: false,
        radio99: false,
        radio100: false,
        guestbookAnalyzed: false,
        signed: false,
        signedAsWanwan: false,
        draftRead: false,
        zeroUnlocked: false,
        zeroRevealed: false,
        sourceViewed: false,
        finalSeen: false,
        siteClosed: '',
        readMails: {}
      },
      guestbook: [],
      endings: [],
      lastPage: 'home'
    };
  }

  function hydrateState(raw) {
    const base = defaultState();
    if (!raw || typeof raw !== 'object') return base;
    const s = Object.assign({}, base, raw);
    s.name = typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim().slice(0, 12) : base.name;
    s.clues = Object.assign({}, base.clues, raw.clues || {});
    s.flags = Object.assign({}, base.flags, raw.flags || {});
    s.flags.readMails = Object.assign({}, raw.flags && raw.flags.readMails ? raw.flags.readMails : {});
    s.guestbook = Array.isArray(raw.guestbook) ? raw.guestbook.slice(-30) : [];
    s.endings = Array.isArray(raw.endings) ? Array.from(new Set(raw.endings.filter(x => ENDING_DATA[x]))) : [];
    s.lastPage = PAGE_TITLES[raw.lastPage] ? raw.lastPage : 'home';
    s.sound = Boolean(raw.sound);
    s.crt = raw.crt !== false;
    s.started = Boolean(raw.started);
    return s;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      return raw ? hydrateState(JSON.parse(raw)) : defaultState();
    } catch (err) {
      return defaultState();
    }
  }

  let state = loadState();
  let currentPage = 'home';
  let historyStack = ['home'];
  let historyIndex = 0;
  let currentMailFolder = 'inbox';
  let selectedMailId = null;
  let bootToken = 0;
  let radioToken = 0;
  let radioScanTimer = null;
  let radioLockTimer = null;
  let radioMuted = false;
  let chatToken = 0;
  let chatState = { started: false, busy: false, asked: new Set(), phase: 0 };
  let lastFocused = null;
  let hintLevel = 0;
  let camValue = 0;
  let zPos = 40;
  let dragState = null;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  function saveState() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (err) {
      /* 本地存储不可用时，游戏仍然可以继续。 */
    }
  }

  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function formatNow() {
    // 档案里的时间停在 23:59，不让现实时间把玩家拽出去。
    return '2026-10-26 23:59';
  }

  function allClues() {
    return CLUE_ORDER.every(key => state.clues[key]);
  }

  function clueCount() {
    return CLUE_ORDER.filter(key => state.clues[key]).length;
  }

  function daysSinceMillennium() {
    const start = Date.UTC(2000, 0, 1);
    const archive = Date.UTC(2026, 9, 26);
    return Math.max(0, Math.floor((archive - start) / 86400000));
  }

  /* ============================================================
     音频
     ============================================================ */

  const AudioEngine = (() => {
    let ctx = null;
    let master = null;
    let ambientStarted = false;
    let bellTimer = null;
    let melodyTimers = [];
    let ambientNodes = [];

    function ensure() {
      if (!ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        try {
          ctx = new AC();
          master = ctx.createGain();
          master.gain.value = 0;
          master.connect(ctx.destination);
        } catch (err) {
          return false;
        }
      }
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      return true;
    }

    function setMaster(on) {
      if (!ensure()) return;
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(on ? 0.62 : 0, t + 0.5);
      if (on) startAmbient();
    }

    function makeNoise(seconds = 2) {
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * 0.35;
      }
      return buffer;
    }

    function startAmbient() {
      if (!ctx || ambientStarted || !state.sound) return;
      ambientStarted = true;

      try {
        const noise = ctx.createBufferSource();
        noise.buffer = makeNoise(3);
        noise.loop = true;
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 850;
        bp.Q.value = 0.45;
        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.038;
        noise.connect(bp).connect(noiseGain).connect(master);
        noise.start();
        ambientNodes.push(noise);

        const drone = ctx.createOscillator();
        drone.type = 'sine';
        drone.frequency.value = 55;
        const droneGain = ctx.createGain();
        droneGain.gain.value = 0.022;
        drone.connect(droneGain).connect(master);
        drone.start();
        ambientNodes.push(drone);

        const drone2 = ctx.createOscillator();
        drone2.type = 'triangle';
        drone2.frequency.value = 82.41;
        const drone2Gain = ctx.createGain();
        drone2Gain.gain.value = 0.007;
        const lp = ctx.createBiquadFilter();
        lp.type = 'lowpass';
        lp.frequency.value = 180;
        drone2.connect(lp).connect(drone2Gain).connect(master);
        drone2.start();
        ambientNodes.push(drone2);
      } catch (err) {
        /* 忽略音频节点失败。 */
      }

      const bell = () => {
        if (!ctx || !state.sound) return;
        try {
          const notes = [220, 261.63, 329.63, 392, 440];
          const freq = notes[Math.floor(Math.random() * notes.length)];
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.exponentialRampToValueAtTime(0.075, now + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
          const delay = ctx.createDelay();
          delay.delayTime.value = 0.31;
          const fb = ctx.createGain();
          fb.gain.value = 0.24;
          const wet = ctx.createGain();
          wet.gain.value = 0.22;
          osc.connect(gain);
          gain.connect(master);
          gain.connect(delay);
          delay.connect(fb);
          fb.connect(delay);
          delay.connect(wet);
          wet.connect(master);
          osc.start(now);
          osc.stop(now + 4.2);
        } catch (err) {
          /* 忽略。 */
        }
        bellTimer = setTimeout(bell, 9000 + Math.random() * 14000);
      };
      bellTimer = setTimeout(bell, 4500);
    }

    function blip(freq = 880, duration = 0.045, type = 'square', volume = 0.035) {
      if (!state.sound || !ensure()) return;
      try {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        osc.connect(gain).connect(master);
        osc.start(t);
        osc.stop(t + duration + 0.02);
      } catch (err) {
        /* 忽略。 */
      }
    }

    function staticBurst(duration = 0.12, volume = 0.045) {
      if (!state.sound || radioMuted || !ensure()) return;
      try {
        const t = ctx.currentTime;
        const src = ctx.createBufferSource();
        src.buffer = makeNoise(duration);
        const bp = ctx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1700;
        bp.Q.value = 0.7;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        src.connect(bp).connect(gain).connect(master);
        src.start(t);
        src.stop(t + duration + 0.02);
      } catch (err) {
        /* 忽略。 */
      }
    }

    function chime(kind = 'good') {
      if (!state.sound || !ensure()) return;
      const base = kind === 'bad' ? 180 : 523.25;
      const notes = kind === 'bad' ? [base, base * 0.87] : [base, base * 1.25, base * 1.5];
      notes.forEach((freq, i) => {
        setTimeout(() => blip(freq, 0.32, 'triangle', 0.05), i * 130);
      });
    }

    function modem() {
      if (!state.sound || !ensure()) return;
      const sequence = [425, 425, 1200, 2100, 1650, 1850, 980, 1180, 2100, 1300];
      sequence.forEach((freq, i) => {
        setTimeout(() => {
          blip(freq, 0.16, i % 3 === 0 ? 'sine' : 'square', 0.035);
          if (i % 2 === 0) staticBurst(0.08, 0.025);
        }, i * 190);
      });
    }

    function stopMelody() {
      melodyTimers.forEach(timer => clearTimeout(timer));
      melodyTimers = [];
    }

    function playMelody(kind = 'midi') {
      if (!state.sound || !ensure()) return;
      stopMelody();
      const sequences = {
        midi: [
          [440, 0], [523.25, 380], [659.25, 760], [783.99, 1140],
          [659.25, 1520], [523.25, 1900], [392, 2280], [440, 2660]
        ],
        tape: [
          [220, 0], [261.63, 520], [329.63, 1040], [392, 1580],
          [329.63, 2200], [261.63, 2900], [196, 3700]
        ]
      };
      const seq = sequences[kind] || sequences.midi;
      seq.forEach(([freq, delay]) => {
        const timer = setTimeout(() => {
          if (kind === 'tape') staticBurst(0.06, 0.018);
          blip(freq, kind === 'tape' ? 0.7 : 0.36, 'triangle', kind === 'tape' ? 0.04 : 0.055);
        }, delay);
        melodyTimers.push(timer);
      });
    }

    return {
      setEnabled(on) { if (on) { if (ensure()) setMaster(true); } else if (ensure()) { setMaster(false); } },
      resume() { if (state.sound) ensure(); },
      blip,
      chime,
      staticBurst,
      modem,
      playMelody,
      stopMelody,
      setRadioMuted(v) { radioMuted = v; }
    };
  })();

  /* ============================================================
     通用 UI
     ============================================================ */

  function showToast(text, type = '', duration = 3100) {
    const root = $('#toastRoot');
    if (!root) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`.trim();
    toast.textContent = text;
    root.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(4px)';
      toast.style.transition = 'opacity .2s, transform .2s';
      setTimeout(() => toast.remove(), 220);
    }, duration);
  }

  function syncSoundUI() {
    const on = state.sound;
    const label = on ? '声音：开启' : '声音：关闭';
    const gateBtn = $('#gateSound');
    if (gateBtn) {
      gateBtn.textContent = label;
      gateBtn.setAttribute('aria-pressed', String(on));
    }
    const tray = $('#traySound');
    if (tray) {
      tray.textContent = on ? '🔊' : '🔇';
      tray.setAttribute('aria-pressed', String(on));
      tray.title = on ? '关闭声音' : '开启声音';
    }
    const startLabel = $('#startSoundLabel');
    if (startLabel) startLabel.textContent = on ? '开启' : '关闭';
  }

  function syncCrtUI() {
    document.body.classList.toggle('crt-off', !state.crt);
    const tray = $('#trayCrt');
    if (tray) {
      tray.setAttribute('aria-pressed', String(state.crt));
      tray.title = state.crt ? '关闭CRT扫描线' : '开启CRT扫描线';
    }
    const label = $('#startCrtLabel');
    if (label) label.textContent = state.crt ? '开启' : '关闭';
  }

  function setSound(on, announce = false) {
    state.sound = Boolean(on);
    saveState();
    syncSoundUI();
    AudioEngine.setEnabled(state.sound);
    if (announce) showToast(state.sound ? '声音已开启。' : '声音已关闭。', state.sound ? 'good' : '');
    if (state.sound) AudioEngine.blip(660, 0.05, 'sine', 0.025);
  }

  function toggleSound() { setSound(!state.sound, true); }

  function setCrt(on) {
    state.crt = Boolean(on);
    saveState();
    syncCrtUI();
  }

  function applyName() {
    const name = state.name || '无名旅客';
    const noteName = $('#notePlayerName');
    if (noteName) noteName.textContent = name;
    const computerUser = $('#computerUser');
    if (computerUser) computerUser.textContent = name;
    const guestName = $('#guestName');
    if (guestName && !guestName.value) guestName.value = name;
  }

  function updateClock() {
    const clock = $('#clock');
    if (!clock) return;
    if (state.flags.siteClosed === 'silence') clock.textContent = '--:--';
    else if (state.flags.siteClosed === 'dawn') clock.textContent = '00:00';
    else clock.textContent = '23:59';
  }

  function markClue(key) {
    if (!CLUES[key] || state.clues[key]) return;
    state.clues[key] = true;
    hintLevel = 0;
    saveState();
    renderNotebook();
    AudioEngine.chime('good');
    showToast(CLUES[key].toast, 'good', 3800);
    if (allClues()) {
      setTimeout(() => showToast('五条线索已全部归档。去0号房，替她把信发出去。', 'good', 5000), 4200);
    }
  }

  function markFlag(key, value = true) {
    if (!(key in state.flags)) return;
    state.flags[key] = value;
    saveState();
  }

  /* ============================================================
     入场 / 启动
     ============================================================ */

  function showGateScreen(name) {
    ['bootScreen', 'dialScreen', 'nameScreen'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('hidden', id !== `${name}Screen`);
    });
  }

  function openGate() {
    const gate = $('#gate');
    const desktop = $('#desktop');
    if (gate) gate.classList.remove('hidden');
    if (desktop) {
      desktop.classList.add('hidden');
      desktop.setAttribute('aria-hidden', 'true');
    }
  }

  function showNameScreen() {
    bootToken += 1;
    showGateScreen('name');
    const input = $('#playerName');
    if (input) {
      input.value = state.name && state.name !== '无名旅客' ? state.name : '';
      setTimeout(() => input.focus(), 160);
    }
    showToast('档案恢复程序已就绪。', '', 2200);
  }

  async function runBoot() {
    const token = ++bootToken;
    openGate();
    showGateScreen('boot');
    const log = $('#bootLog');
    if (!log) return;
    log.replaceChildren();
    for (let i = 0; i < BOOT_LINES.length; i += 1) {
      if (token !== bootToken) return;
      const line = BOOT_LINES[i];
      await sleep(line.text ? 78 : 34);
      if (token !== bootToken) return;
      const div = document.createElement('div');
      if (line.cls) div.className = line.cls;
      div.textContent = line.text || '\u00a0';
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
      if (line.text) AudioEngine.blip(1200 + i * 30, 0.008, 'square', 0.006);
    }
    await sleep(700);
    if (token === bootToken) startDial(token);
  }

  function startDial(token = bootToken) {
    showGateScreen('dial');
    AudioEngine.modem();
    const progress = $('#dialProgress');
    const status = $('#dialStatus');
    const speed = $('#dialSpeed');
    const elapsed = $('#dialElapsed');
    let value = 0;
    let seconds = 0;
    if (progress) progress.style.width = '0%';
    if (speed) speed.textContent = '0.0 Kbps';
    if (elapsed) elapsed.textContent = '00:00';
    const messages = [
      [0, '正在拨号 16300…'],
      [16, '等待拨号音…'],
      [32, '载波检测…'],
      [49, '握手协议：V.34…'],
      [66, '正在验证用户名…'],
      [81, '正在同步时间…'],
      [96, '连接成功。33.6 Kbps。']
    ];

    const timer = setInterval(() => {
      if (token !== bootToken) {
        clearInterval(timer);
        return;
      }
      value = Math.min(100, value + 2);
      seconds += 0.1;
      if (progress) progress.style.width = `${value}%`;
      if (speed) speed.textContent = `${Math.min(33.6, (value / 100) * 33.6).toFixed(1)} Kbps`;
      if (elapsed) elapsed.textContent = `00:${pad(Math.floor(seconds))}`;
      const msg = messages.filter(item => value >= item[0]).pop();
      if (status && msg) status.textContent = msg[1];
      if (value >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          if (token === bootToken) showNameScreen();
        }, 650);
      }
    }, 58);
  }

  function enterGame(name) {
    const clean = String(name || '').replace(/[\u0000-\u001f<>]/g, '').trim().slice(0, 12);
    state.name = clean || '无名旅客';
    state.started = true;
    saveState();
    const gate = $('#gate');
    const desktop = $('#desktop');
    if (gate) gate.classList.add('hidden');
    if (desktop) {
      desktop.classList.remove('hidden');
      desktop.setAttribute('aria-hidden', 'false');
    }
    applyName();
    syncSoundUI();
    syncCrtUI();
    updateClock();
    openWindow('browser');
    renderAll();
    if (state.flags.siteClosed) navigate('closed', { replace: true });
    else navigate('home', { replace: true });
    if (state.sound) setSound(true, false);
    AudioEngine.chime('good');
    setTimeout(() => {
      const msg = state.flags.counterSeen
        ? `欢迎回来，${state.name}。`
        : `第 2000 位旅客，${state.name}。欢迎。`;
      showToast(msg, 'good', 4200);
    }, 800);
  }

  function restoreSession() {
    const gate = $('#gate');
    const desktop = $('#desktop');
    if (gate) gate.classList.add('hidden');
    if (desktop) {
      desktop.classList.remove('hidden');
      desktop.setAttribute('aria-hidden', 'false');
    }
    applyName();
    syncSoundUI();
    syncCrtUI();
    updateClock();
    openWindow('browser');
    renderAll();
    if (state.flags.siteClosed) navigate('closed', { replace: true });
    else navigate(state.lastPage || 'home', { replace: true });
    setTimeout(() => showToast(`已恢复上次访问，${state.name}。`, '', 3000), 700);
  }

  /* ============================================================
     窗口管理
     ============================================================ */

  function windowElement(name) {
    if (name === 'browser') return $('#browserWindow');
    if (name === 'notebook') return $('#notebookWindow');
    return null;
  }

  function bringToFront(name) {
    const win = windowElement(name);
    if (!win) return;
    zPos += 1;
    win.style.zIndex = String(zPos);
    $$('.task-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.task === name));
  }

  function openWindow(name, targetPage) {
    const win = windowElement(name);
    if (!win) return;
    win.classList.remove('hidden');
    const task = $(`.task-btn[data-task="${name}"]`);
    if (task) task.classList.remove('hidden');
    bringToFront(name);
    if (name === 'browser' && targetPage) navigate(targetPage);
    if (name === 'notebook') renderNotebook();
  }

  function closeWindow(name) {
    const win = windowElement(name);
    if (!win) return;
    win.classList.add('hidden');
    const task = $(`.task-btn[data-task="${name}"]`);
    if (task) {
      task.classList.remove('active');
      if (name === 'notebook') task.classList.add('hidden');
    }
    if (name === 'browser') showToast('网页已关闭。单击桌面上的“月面旅馆”可以重新打开。', '', 2600);
  }

  function minimizeWindow(name) {
    const win = windowElement(name);
    if (!win) return;
    win.classList.add('hidden');
    const task = $(`.task-btn[data-task="${name}"]`);
    if (task) task.classList.remove('active');
  }

  function maximizeWindow(name) {
    const win = windowElement(name);
    if (!win) return;
    win.classList.toggle('maximized');
    bringToFront(name);
  }

  function openNotebook(tab = 'clues') {
    openWindow('notebook');
    switchNotebookTab(tab);
  }

  function switchNotebookTab(tab) {
    $$('.notebook-tabs button').forEach(btn => btn.classList.toggle('active', btn.dataset.noteTab === tab));
    $$('.note-tab-panel').forEach(panel => panel.classList.toggle('active', panel.dataset.notePanel === tab));
    if (tab === 'clues') renderClueList();
    if (tab === 'people') renderPeople();
    if (tab === 'endings') renderEndings();
  }

  function startDrag(e, name) {
    if (window.innerWidth <= 820) return;
    if (e.button !== 0) return;
    if (e.target.closest('.window-controls')) return;
    const win = windowElement(name);
    if (!win || win.classList.contains('maximized')) return;
    const rect = win.getBoundingClientRect();
    dragState = {
      name,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      width: rect.width,
      height: rect.height
    };
    win.style.left = `${rect.left}px`;
    win.style.top = `${rect.top}px`;
    bringToFront(name);
    e.preventDefault();
  }

  document.addEventListener('pointermove', e => {
    if (!dragState) return;
    const win = windowElement(dragState.name);
    if (!win) return;
    const maxX = Math.max(0, window.innerWidth - 120);
    const maxY = Math.max(0, window.innerHeight - 80);
    const left = Math.max(-dragState.width + 120, Math.min(maxX, e.clientX - dragState.offsetX));
    const top = Math.max(0, Math.min(maxY, e.clientY - dragState.offsetY));
    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
  });

  document.addEventListener('pointerup', () => { dragState = null; });
  document.addEventListener('pointercancel', () => { dragState = null; });

  /* ============================================================
     导航
     ============================================================ */

  function resolveAddress(raw) {
    let value = String(raw || '').trim().toLowerCase();
    if (!value) return 'home';
    value = value.replace(/^https?:\/\//, '');
    value = value.replace(/^www\./, '');
    value = value.replace(/^geocities\.com\/moonlight_1999\/?/, '');
    value = value.replace(/^moonlight_1999\/?/, '');
    value = value.replace(/^\/+/, '');
    value = value.split('?')[0].split('#')[0];
    if (!value || value === 'index.html' || value === 'index.htm' || value === 'index') return 'home';
    value = value.replace(/\.html?$/, '');
    const map = {
      home: 'home', index: 'home', diary: 'diary', cam: 'cam', camera: 'cam',
      guestbook: 'guestbook', guest: 'guestbook', mail: 'mail', email: 'mail',
      radio: 'radio', zero: 'zero', room0: 'zero', '0': 'zero'
    };
    return map[value] || '404';
  }

  function pageAllowed(page) {
    if (state.flags.siteClosed && page !== 'closed' && page !== '404') return false;
    return true;
  }

  function navigate(page, options = {}) {
    if (page === 'about') {
      openHelp();
      return;
    }
    if (page === 'closed' && !state.flags.siteClosed) page = '404';
    if (!pageAllowed(page)) page = 'closed';
    if (!PAGE_TITLES[page]) page = '404';

    const oldPage = currentPage;
    currentPage = page;
    const target = $(`.page[data-page="${page}"]`);
    $$('.page').forEach(el => el.classList.remove('active'));
    if (target) target.classList.add('active');

    const viewport = $('#viewport');
    if (viewport) viewport.scrollTop = 0;
    updateBrowserChrome(page);
    updateHistory(page, options);

    const load = $('#loadingBar');
    if (load) {
      load.classList.add('loading');
      setTimeout(() => load.classList.remove('loading'), 520);
    }

    state.lastPage = page === 'closed' ? state.lastPage : page;
    saveState();

    if (page !== oldPage) {
      AudioEngine.blip(760, 0.03, 'sine', 0.012);
    }

    onPageEnter(page);
    closeStartMenu();
    if (window.innerWidth <= 820) {
      const note = $('#notebookWindow');
      if (note && !note.classList.contains('hidden') && page !== 'zero') {
        /* 移动端保留笔记，用户可手动关闭。 */
      }
    }
  }

  function updateHistory(page, options) {
    if (!options.fromHistory) {
      if (historyStack[historyIndex] !== page) {
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(page);
        historyIndex = historyStack.length - 1;
      }
    }
    const back = $('#btnBack');
    const forward = $('#btnForward');
    if (back) back.disabled = historyIndex <= 0;
    if (forward) forward.disabled = historyIndex >= historyStack.length - 1;
  }

  function updateBrowserChrome(page) {
    const title = $('#browserTitle');
    if (title) title.textContent = `Netscape Navigator - ${PAGE_TITLES[page] || '找不到网页'}`;
    const address = $('#addressBar');
    if (address) {
      address.value = page === 'closed'
        ? 'about:blank'
        : `http://www.geocities.com/moonlight_1999/${PAGE_PATHS[page] || ''}`;
    }
    const status = $('#statusText');
    if (status) status.textContent = page === 'closed' ? '无法连接' : '完成';
    const zone = $('#statusZone');
    if (zone) zone.textContent = page === 'closed' ? '连接已断开' : '本地归档';
    const statusLink = $('#statusLink');
    if (statusLink) statusLink.textContent = '';
  }

  function goBack() {
    if (historyIndex <= 0) return;
    historyIndex -= 1;
    navigate(historyStack[historyIndex], { fromHistory: true });
  }

  function goForward() {
    if (historyIndex >= historyStack.length - 1) return;
    historyIndex += 1;
    navigate(historyStack[historyIndex], { fromHistory: true });
  }

  function goHome() {
    if (state.flags.siteClosed) navigate('closed');
    else navigate('home');
  }

  function refreshPage() {
    const load = $('#loadingBar');
    if (load) {
      load.classList.add('loading');
      setTimeout(() => load.classList.remove('loading'), 600);
    }
    AudioEngine.staticBurst(0.08, 0.02);
    onPageEnter(currentPage);
    showToast('页面已刷新。1999年的缓存没有变化。', '', 2100);
  }

  function onPageEnter(page) {
    if (page === 'home') renderHome();
    if (page === 'diary') initDiaryPage();
    if (page === 'cam') initCamPage();
    if (page === 'guestbook') renderGuestbookPage();
    if (page === 'mail') initMailPage();
    if (page === 'radio') initRadioPage();
    if (page === 'zero') initZeroPage();
    if (page === 'closed') renderClosedPage();
    if (page === '404') updateBrowserChrome('404');
    updateClock();
  }

  /* ============================================================
     首页
     ============================================================ */

  function renderHome() {
    const counter = $('#visitorCount');
    if (counter) {
      if (!state.flags.counterSeen) {
        state.flags.counterSeen = true;
        saveState();
        let count = 1999;
        const timer = setInterval(() => {
          count += 1;
          counter.textContent = String(count).padStart(6, '0');
          if (count >= 2000) {
            clearInterval(timer);
            counter.textContent = '002000';
            const homeStatus = $('.hero-status');
            if (homeStatus) homeStatus.classList.add('counter-flash');
            setTimeout(() => showToast('计数器跳到了 2000。', 'warn', 3000), 450);
          }
        }, 55);
      } else {
        counter.textContent = '002000';
      }
    }
    const days = $('#daysOnline');
    if (days) days.textContent = `已营业 ${daysSinceMillennium().toLocaleString('en-US')} 天`;
    renderHomeGuestbook();
    const now = $('#nowPlaying');
    if (now) {
      const songs = ['《零点以后》— 佚名', '《最后一班地铁》— 佚名', '《给2000年的信》— 佚名'];
      now.textContent = songs[Math.floor(Math.random() * songs.length)];
    }
  }

  function renderHomeGuestbook() {
    const root = $('#homeGuestbook');
    if (!root) return;
    const all = getGuestEntries();
    const latest = all.slice(-3).reverse();
    root.innerHTML = latest.map(entry => `
      <div class="home-guest-item">
        <span class="g-date">${escapeHTML(entry.date)}</span>
        <span class="g-name">${escapeHTML(entry.name)}</span>
        <span class="g-text">${escapeHTML(entry.text)}</span>
      </div>
    `).join('');
  }

  function initMidi() {
    const play = $('#midiPlay');
    const stop = $('#midiStop');
    let progressTimer = null;
    if (play) {
      play.addEventListener('click', () => {
        if (!state.sound) setSound(true, true);
        AudioEngine.playMelody('midi');
        showToast('MIDI 已开始播放。', '', 1800);
        const bar = $('#midiProgress');
        let width = 0;
        clearInterval(progressTimer);
        progressTimer = setInterval(() => {
          width = Math.min(100, width + 1.5);
          if (bar) bar.style.width = `${width}%`;
          if (width >= 100) {
            clearInterval(progressTimer);
            if (bar) bar.style.width = '0%';
          }
        }, 240);
      });
    }
    if (stop) {
      stop.addEventListener('click', () => {
        AudioEngine.stopMelody();
        clearInterval(progressTimer);
        const bar = $('#midiProgress');
        if (bar) bar.style.width = '0%';
        showToast('播放已停止。', '', 1400);
      });
    }
  }

  /* ============================================================
     日记
     ============================================================ */

  function initDiaryPage() {
    const reveal = $('#revealSecret');
    const page = $('.diary-page');
    if (reveal && page) {
      reveal.textContent = page.classList.contains('reveal-secret') ? '隐藏被隐藏的字' : '显示被隐藏的字';
    }
  }

  function initDiaryEvents() {
    $$('.diary-entry').forEach(entry => {
      entry.addEventListener('toggle', () => {
        if (!entry.open) return;
        AudioEngine.blip(420, 0.03, 'sine', 0.012);
        if (entry.dataset.entry === '5') {
          markClue('diary');
        }
      });
    });

    const reveal = $('#revealSecret');
    if (reveal) {
      reveal.addEventListener('click', () => {
        const page = $('.diary-page');
        if (!page) return;
        const shown = page.classList.toggle('reveal-secret');
        reveal.textContent = shown ? '隐藏被隐藏的字' : '显示被隐藏的字';
        AudioEngine.blip(shown ? 700 : 380, 0.04, 'sine', 0.018);
      });
    }

    const tapeBtn = $('#diaryTapeBtn');
    if (tapeBtn) {
      tapeBtn.addEventListener('click', () => {
        AudioEngine.playMelody('tape');
        openModal('TAPE_A / 1999.12.31 23:47', `
          <h2>磁带 A 面</h2>
          <p class="modal-note">仅恢复文字。原始音频损坏 73%。</p>
          <pre class="source-code">[磁带转动声]
晚晚：妈，饺子在锅里。
晚晚：我出去一下。零点前回来。
[很长的空白]
晚晚：如果我没回来……你别等。
[录音结束]</pre>
          <p class="modal-note">录音结束后，还能听见一个人的呼吸。不是林晚的。</p>
        `);
      });
    }
  }

  /* ============================================================
     摄像头
     ============================================================ */

  const CAM_LABELS = [
    '天井东侧 · 704窗 / 0号房窗',
    '23:58 · 0号房的灯亮了',
    '23:59 · 704的信号开始闪烁',
    '00:00 · 704无人 / 0号房：一人'
  ];

  function camTimestamp(value) {
    if (value >= 13) return '2000-01-01 00:00:00';
    const total = 23 * 60 + 47 + value;
    const h = Math.floor(total / 60) % 24;
    const m = total % 60;
    return `1999-12-31 ${pad(h)}:${pad(m)}:00`;
  }

  function updateCam(value, options = {}) {
    camValue = Number(value);
    const slider = $('#camTime');
    if (slider && slider.value !== String(camValue)) slider.value = String(camValue);
    const label = $('#camTimeLabel');
    if (label) label.textContent = camValue >= 13 ? '00:00' : `23:${47 + camValue}`;
    const stamp = $('#camTimestamp');
    if (stamp) stamp.textContent = camTimestamp(camValue);
    const frame = $('#camFrame');
    const stage = camValue >= 13 ? 3 : camValue === 12 ? 2 : camValue === 11 ? 1 : 0;
    if (frame) frame.dataset.stage = String(stage);
    const caption = $('#camCaption');
    if (caption) caption.textContent = CAM_LABELS[stage];
    const signal = $('#camSignal');
    if (signal) signal.textContent = stage >= 3 ? 'SIGNAL ▮▯▯▯' : 'SIGNAL ▮▮▮▯';
    const showEvidence = state.flags.camCaptured && camValue >= 13;
    const stampEl = $('#frameStamp');
    if (stampEl) stampEl.classList.toggle('hidden', !showEvidence);
    const hot = $('#refHotspot');
    if (hot) hot.classList.toggle('hidden', !showEvidence);
    if (!options.silent && stage >= 3) AudioEngine.staticBurst(0.1, 0.025);
  }

  function camEvidenceHTML() {
    if (state.flags.camEnhanced) {
      return `
        <p class="ev-line">704的窗是黑的。</p>
        <p class="ev-line">0号房的窗里，周野抱着一个纸箱。纸箱上写着：晚晚的磁带。</p>
        <p class="ev-line">但真正让你后背发凉的，是玻璃反光里的第三个人。</p>
        <p class="ev-line">她穿着红色毛衣。她站在镜头这一边。</p>
        <p class="ev-small">捕获时间 2000-01-01 00:00:00 / 来源：CAM_02 / 已增强对比</p>
      `;
    }
    return `
      <p class="ev-line">704的窗是黑的。</p>
      <p class="ev-line">0号房的窗里，有一个人，抱着一个纸箱。</p>
      <p class="ev-line">玻璃里似乎还有第三个人。画面太暗了。</p>
      <p class="ev-small">捕获时间 2000-01-01 00:00:00 / 来源：CAM_02 / 试试“增强对比”</p>
    `;
  }

  function initCamPage() {
    const frame = $('#camFrame');
    if (!frame) return;
    frame.classList.toggle('enhanced', Boolean(state.flags.camEnhanced));
    const enhance = $('#camEnhance');
    if (enhance) enhance.setAttribute('aria-pressed', String(Boolean(state.flags.camEnhanced)));
    const evidence = $('#camEvidence');
    const evidenceText = $('#camEvidenceText');
    if (state.flags.camCaptured) {
      updateCam(13, { silent: true });
      if (evidence) evidence.classList.remove('hidden');
      if (evidenceText) evidenceText.innerHTML = camEvidenceHTML();
    } else {
      updateCam(0, { silent: true });
      if (evidence) evidence.classList.add('hidden');
    }
  }

  function initCamEvents() {
    const slider = $('#camTime');
    if (slider) {
      slider.addEventListener('input', () => updateCam(slider.value));
    }
    const capture = $('#camCapture');
    if (capture) {
      capture.addEventListener('click', () => {
        if (camValue < 13) {
          AudioEngine.staticBurst(0.08, 0.025);
          showToast('画面里只有雨。再等等。把时间码拖到最后。', 'warn', 3200);
          return;
        }
        const frame = $('#camFrame');
        if (frame) {
          frame.classList.remove('flash');
          void frame.offsetWidth;
          frame.classList.add('flash');
          setTimeout(() => frame.classList.remove('flash'), 800);
        }
        state.flags.camCaptured = true;
        saveState();
        const stamp = $('#frameStamp');
        if (stamp) stamp.classList.remove('hidden');
        const hot = $('#refHotspot');
        if (hot) hot.classList.remove('hidden');
        const evidence = $('#camEvidence');
        const evidenceText = $('#camEvidenceText');
        if (evidence) evidence.classList.remove('hidden');
        if (evidenceText) evidenceText.innerHTML = camEvidenceHTML();
        markClue('cam');
        AudioEngine.chime('good');
        showToast('帧已捕获。已加入案件笔记。', 'good', 2800);
      });
    }
    const enhance = $('#camEnhance');
    if (enhance) {
      enhance.addEventListener('click', () => {
        state.flags.camEnhanced = !state.flags.camEnhanced;
        saveState();
        const frame = $('#camFrame');
        if (frame) frame.classList.toggle('enhanced', state.flags.camEnhanced);
        enhance.setAttribute('aria-pressed', String(state.flags.camEnhanced));
        if (state.flags.camCaptured) {
          const evidenceText = $('#camEvidenceText');
          if (evidenceText) evidenceText.innerHTML = camEvidenceHTML();
        }
        showToast(state.flags.camEnhanced ? '对比度增强。玻璃里的东西更清楚了。' : '已恢复原始画面。', '', 2200);
        AudioEngine.staticBurst(0.08, 0.018);
      });
    }
    const reset = $('#camReset');
    if (reset) {
      reset.addEventListener('click', () => {
        updateCam(0, { silent: true });
        showToast('回到 23:47。雨还在下。', '', 1800);
      });
    }
    const hot = $('#refHotspot');
    if (hot) {
      hot.addEventListener('click', () => {
        state.flags.reflectionSeen = true;
        saveState();
        openModal('FRAME 00 / 反光', `
          <h2>你放大了玻璃的反光</h2>
          <p>画面左下角，704的窗玻璃里，映着一个女孩。</p>
          <p>她穿着红色高领毛衣，站在摄像头这一边。</p>
          <p>可这一帧的时间是 <b>2000-01-01 00:00:00</b>。</p>
          <p>而704的窗，是黑的。</p>
          <p class="modal-note">技术备注：反光出现于第 1,999 帧。下一帧，信号中断。</p>
          <div class="trace-result"><strong>她一直在镜头这一边。</strong><br>她不是被拍进去的。她是看着你按下“捕获”的人。</div>
        `);
      });
    }
  }

  /* ============================================================
     留言簿
     ============================================================ */

  function getGuestEntries() {
    return STATIC_GUESTBOOK.concat(state.guestbook);
  }

  function renderGuestbookPage() {
    renderGuestbookList();
    const input = $('#guestName');
    if (input && !input.value) input.value = state.name;
    const feedback = $('#guestFeedback');
    if (feedback) feedback.textContent = state.flags.signed ? '你的留言已经写进去了。' : '';
  }

  function renderGuestbookList() {
    const root = $('#guestbookList');
    if (!root) return;
    const entries = getGuestEntries();
    root.innerHTML = entries.map(entry => {
      const isNew = !STATIC_GUESTBOOK.some(g => g.id === entry.id);
      const isOwner = entry.badge === '站长';
      const isReply = entry.badge === '自动回复';
      return `
        <article class="guest-entry ${isNew ? 'guest-new' : ''}" data-guest-id="${escapeHTML(entry.id)}">
          <div class="guest-side">
            <span class="g-name">${escapeHTML(entry.name)}</span>
            <span>${escapeHTML(entry.date)}</span>
            <span class="g-ip">IP: ${escapeHTML(entry.ip || '127.0.0.1')}</span>
          </div>
          <div class="guest-content">
            <div class="guest-head">
              <span class="g-badge ${isOwner ? 'owner' : ''}">${escapeHTML(entry.badge || '旅客')}</span>
              ${isReply ? '<span class="g-badge owner">刚刚</span>' : ''}
              ${entry.mood ? `<span class="g-badge">心情：${escapeHTML(entry.mood)}</span>` : ''}
            </div>
            <div class="guest-text">${escapeHTML(entry.text)}</div>
          </div>
        </article>
      `;
    }).join('');
    renderHomeGuestbook();
  }

  function addTypingRow() {
    const root = $('#guestbookList');
    if (!root) return null;
    removeTypingRow();
    const row = document.createElement('div');
    row.className = 'typing-row';
    row.id = 'guestTyping';
    row.innerHTML = `<span class="g-name">0</span><span class="typing-dots"><span></span><span></span><span></span> 正在输入…</span>`;
    root.appendChild(row);
    root.scrollTop = root.scrollHeight;
    return row;
  }

  function removeTypingRow() {
    const row = $('#guestTyping');
    if (row) row.remove();
  }

  function guestReplyFor(message, first) {
    if (/妈|阿姨|母亲/.test(message)) {
      return '……你知道了。';
    }
    if (/晚晚|林晚|她/.test(message)) {
      return '别叫那个名字。她会找不到自己的。';
    }
    if (state.clues.mail) {
      return '你已经看过那封信了。去0号房吧。密码是零点。';
    }
    if (first) {
      return '第 2,000 位旅客。她等的人，终于来了。';
    }
    return '收到了。她会看见的。';
  }

  function initGuestbookEvents() {
    const form = $('#guestForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const nameInput = $('#guestName');
        const messageInput = $('#guestMessage');
        const moodInput = $('#guestMood');
        const feedback = $('#guestFeedback');
        const name = (nameInput ? nameInput.value.trim() : '').slice(0, 12) || state.name || '无名旅客';
        const message = (messageInput ? messageInput.value.trim() : '').slice(0, 200);
        if (!message) {
          if (feedback) feedback.textContent = '写点什么吧。空白会被网站吞掉。';
          AudioEngine.blip(220, 0.08, 'square', 0.02);
          return;
        }
        if (/^(晚晚|林晚|wanwan)$/i.test(name)) {
          state.flags.signedAsWanwan = true;
          saveState();
          if (feedback) feedback.textContent = '该用户名已被占用。';
          AudioEngine.chime('bad');
          showToast('该用户名已被占用。', 'warn', 3000);
          setTimeout(() => showToast('别用她的名字。她会找不到自己的。', 'warn', 4200), 1200);
          return;
        }
        const first = !state.flags.signed;
        const entry = {
          id: `u-${Date.now()}`,
          date: formatNow(),
          name,
          badge: name === state.name ? '旅客' : '访客',
          ip: '127.0.0.1',
          mood: moodInput ? moodInput.value : '路过',
          text: message
        };
        state.guestbook.push(entry);
        state.flags.signed = true;
        saveState();
        renderGuestbookList();
        if (messageInput) messageInput.value = '';
        if (feedback) feedback.textContent = '留言已提交。请等待审核……';
        AudioEngine.blip(620, 0.05, 'sine', 0.025);
        const typing = addTypingRow();
        setTimeout(() => {
          removeTypingRow();
          const replyText = guestReplyFor(message, first);
          state.guestbook.push({
            id: `r-${Date.now()}`,
            date: formatNow(),
            name: '0',
            badge: '自动回复',
            ip: '127.0.0.1',
            text: replyText,
            reply: true
          });
          saveState();
          renderGuestbookList();
          renderNotebook();
          AudioEngine.chime('good');
          if (feedback) feedback.textContent = '0 回复了你的留言。';
          const list = $('#guestbookList');
          if (list) list.scrollTop = list.scrollHeight;
        }, 1900);
        if (typing) typing.scrollIntoView({ block: 'nearest' });
      });
      form.addEventListener('reset', () => {
        setTimeout(() => {
          const nameInput = $('#guestName');
          if (nameInput) nameInput.value = state.name;
          const feedback = $('#guestFeedback');
          if (feedback) feedback.textContent = '';
        }, 0);
      });
    }

    const analyze = $('#analyzeGuestbook');
    if (analyze) analyze.addEventListener('click', openTraceModal);
  }

  function openTraceModal() {
    const body = `
      <h2>笔迹分析 / TRACE v1.0</h2>
      <p>从留言簿中抽取三条使用“晚晚”署名的记录，比对用词习惯、标点与自称。</p>
      <div class="trace-compare">
        <div class="trace-sample"><small>样本 A / 2001-01-01</small>新年快乐。<mark>妈</mark>给你包了馄饨，放在门口。你回来热一热。</div>
        <div class="trace-sample"><small>样本 B / 2009-12-31</small>你的毛衣我收在<mark>樟木箱</mark>里了。线头散了，我补不好。</div>
      </div>
      <div class="trace-compare">
        <div class="trace-sample"><small>样本 C / 2020-01-01</small>别关。<mark>她回来</mark>会找不到路。</div>
        <div class="trace-sample"><small>对照组 / 1999 日记</small>我决定了。零点，去0号房。我要问问他，为什么在报纸上，我已经死了。</div>
      </div>
      <div class="trace-progress"><span id="traceBar"></span></div>
      <p class="modal-note" id="traceStatus">等待分析…</p>
      <div id="traceResult"></div>
      <div style="margin-top:12px"><button type="button" class="retro-btn" id="traceStart">开始比对</button></div>
    `;
    openModal('笔迹分析 / TRACE', body, [{ label: '关闭' }]);
    const start = $('#traceStart');
    if (start) {
      start.addEventListener('click', () => {
        start.disabled = true;
        const bar = $('#traceBar');
        const status = $('#traceStatus');
        const result = $('#traceResult');
        let p = 0;
        if (status) status.textContent = '正在比对 1,999 条记录…';
        const timer = setInterval(() => {
          p += 4;
          if (bar) bar.style.width = `${Math.min(100, p)}%`;
          if (p >= 40 && p < 75) { if (status) status.textContent = '检测到重复自称：“妈”。'; }
          if (p >= 75) { if (status) status.textContent = '检测到不一致的输入习惯。'; }
          if (p >= 100) {
            clearInterval(timer);
            if (status) status.textContent = '分析完成。';
            if (result) {
              result.innerHTML = `
                <div class="trace-result">
                  <strong>结论：“晚晚”不是林晚。</strong><br>
                  2001 年的“晚晚”用“妈”自称，而不是在叫“妈”。2009 年的“晚晚”提到了只有长辈才会保留的樟木箱。
                  2020 年的“晚晚”说“她回来”。<br><br>
                  三个“晚晚”，是同一个人：<strong>林晚的母亲，陈秀兰。</strong><br>
                  她用女儿的名字，和另一个不肯走的人，说了二十六年的话。
                  <br><br>
                  <span style="font-family:var(--mono);font-size:9px;color:#7b6c50">附注：所有样本的 IP 都是 127.0.0.1。留言的人一直坐在这台电脑前。</span>
                </div>
              `;
              result.scrollIntoView({ block: 'nearest' });
            }
            state.flags.guestbookAnalyzed = true;
            saveState();
            markClue('guestbook');
            AudioEngine.chime('good');
          }
        }, 48);
      });
    }
  }

  /* ============================================================
     邮件
     ============================================================ */

  function mailsForFolder(folder) {
    if (folder === 'inbox') return MAILS.filter(m => m.folder === 'inbox');
    if (folder === 'draft') return MAILS.filter(m => m.folder === 'draft');
    return [];
  }

  function initMailPage() {
    if (!['inbox', 'draft', 'sent', 'trash', 'archive', 'contacts'].includes(currentMailFolder)) {
      currentMailFolder = 'inbox';
    }
    $$('.folder').forEach(btn => btn.classList.toggle('active', btn.dataset.folder === currentMailFolder));
    renderMailFolder(currentMailFolder);
    if (!selectedMailId) {
      const first = mailsForFolder(currentMailFolder)[0];
      if (first) selectMail(first.id);
      else renderMailEmpty();
    } else {
      const still = MAILS.find(m => m.id === selectedMailId);
      if (still) selectMail(still.id);
      else renderMailEmpty();
    }
  }

  function renderMailEmpty() {
    const preview = $('#mailPreview');
    if (preview) preview.innerHTML = `<div class="mail-empty">这个文件夹是空的。<br>或者，里面只有不想被看见的东西。</div>`;
  }

  function renderMailFolder(folder) {
    const list = $('#mailList');
    if (!list) return;
    list.innerHTML = '';
    const items = mailsForFolder(folder);
    if (!items.length) {
      list.innerHTML = `<div class="mail-empty">没有邮件。</div>`;
      renderMailEmpty();
      return;
    }
    items.forEach(mail => {
      const unread = !state.flags.readMails[mail.id];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `mail-item ${mail.draft ? 'draft-item' : ''} ${unread ? 'unread' : ''} ${selectedMailId === mail.id ? 'selected' : ''}`;
      btn.dataset.mailId = mail.id;
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', String(selectedMailId === mail.id));
      btn.innerHTML = `
        <span class="m-from">${mail.draft ? '📝 ' : ''}${escapeHTML(mail.fromName)}</span>
        <span class="m-subject">${escapeHTML(mail.subject)}</span>
        <span class="m-date">${escapeHTML(mail.date.slice(5, 10))}</span>
      `;
      list.appendChild(btn);
    });
  }

  function selectMail(id) {
    const mail = MAILS.find(m => m.id === id);
    if (!mail) return;
    selectedMailId = id;
    state.flags.readMails[id] = true;
    saveState();
    renderMailFolder(currentMailFolder);
    const preview = $('#mailPreview');
    if (!preview) return;
    preview.innerHTML = `
      <div class="mail-preview-head">
        <h2>${escapeHTML(mail.subject)}</h2>
        <div class="mail-fields">
          <span><b>发件人：</b>${escapeHTML(mail.fromName)} &lt;${escapeHTML(mail.from)}&gt;</span>
          <span><b>收件人：</b>${escapeHTML(mail.to)}</span>
          <span class="mail-date"><b>时间：</b>${escapeHTML(mail.date)}</span>
        </div>
      </div>
      <div class="mail-preview-body">
        ${mail.body}
        ${mail.attachments.map((att, index) => `
          <button type="button" class="mail-attach" data-att-index="${index}">
            <span class="att-icon">▣</span>
            <span><b>${escapeHTML(att.name)}</b><br><small>${escapeHTML(att.desc)}</small></span>
          </button>
        `).join('')}
        <div class="mail-tools-row">
          <button type="button" class="mail-header-toggle" id="mailHeadersBtn">显示邮件头</button>
          <button type="button" class="mail-send-btn" id="mailReplyBtn">回复</button>
          ${mail.draft ? '<button type="button" class="mail-send-btn" id="mailSendBtn">发送</button>' : ''}
        </div>
        <div class="mail-headers hidden" id="mailHeaders">${escapeHTML(mail.headers)}</div>
      </div>
    `;

    const headerBtn = $('#mailHeadersBtn');
    const headers = $('#mailHeaders');
    if (headerBtn && headers) {
      headerBtn.addEventListener('click', () => {
        const shown = headers.classList.toggle('hidden');
        headerBtn.textContent = shown ? '显示邮件头' : '隐藏邮件头';
        AudioEngine.blip(shown ? 500 : 700, 0.02, 'sine', 0.012);
      });
    }
    const replyBtn = $('#mailReplyBtn');
    if (replyBtn) {
      replyBtn.addEventListener('click', () => {
        showToast('这封邮件没有可用的回信地址。', 'warn', 2600);
      });
    }
    const sendBtn = $('#mailSendBtn');
    if (sendBtn) {
      sendBtn.addEventListener('click', () => {
        openModal('发送权限不足', `
          <h2>邮件被锁定</h2>
          <p>这封定时邮件需要 <b>0号房管理员</b> 权限才能发送。</p>
          <p>请前往 <b>0号房</b>。</p>
          <p class="modal-note">定时发送：2000-01-01 00:00:00<br>状态：已过期 26 年</p>
        `, [
          { label: '去0号房', primary: true, onClick: () => { closeModal(); navigate('zero'); } },
          { label: '取消' }
        ]);
      });
    }
    $$('.mail-attach', preview).forEach(btn => {
      btn.addEventListener('click', () => {
        const index = Number(btn.dataset.attIndex);
        const att = mail.attachments[index];
        if (!att) return;
        openModal(att.name, `
          <h2>${escapeHTML(att.name)}</h2>
          <p class="modal-note">${escapeHTML(att.desc)}</p>
          <pre class="source-code">${escapeHTML(att.content)}</pre>
        `, [
          { label: '播放 / 查看', primary: true, onClick: () => { AudioEngine.playMelody('tape'); showToast('磁带噪声。没有更多可恢复的内容。', '', 2600); } },
          { label: '关闭' }
        ]);
      });
    });

    if (mail.draft) {
      state.flags.draftRead = true;
      saveState();
      markClue('mail');
    }
  }

  function initMailEvents() {
    const list = $('#mailList');
    if (list) {
      list.addEventListener('click', e => {
        const item = e.target.closest('[data-mail-id]');
        if (!item) return;
        selectMail(item.dataset.mailId);
        AudioEngine.blip(660, 0.02, 'sine', 0.012);
      });
    }
    $$('.folder').forEach(btn => {
      btn.addEventListener('click', () => {
        currentMailFolder = btn.dataset.folder;
        selectedMailId = null;
        $$('.folder').forEach(f => f.classList.toggle('active', f === btn));
        renderMailFolder(currentMailFolder);
        const items = mailsForFolder(currentMailFolder);
        if (items.length) selectMail(items[0].id);
        else renderMailEmpty();
      });
    });
  }

  /* ============================================================
     收音机
     ============================================================ */

  function initRadioPage() {
    const value = radioStateFreq();
    const station = Math.abs(value - 99.9) < 0.06 ? '99.9' : Math.abs(value - 100) < 0.06 ? '100.0' : null;
    if (!station) renderRadioStatic();
    setRadio(value, { silent: true, immediate: true });
    updateRadioHeader();
  }

  let radioFreqValue = 87.5;

  function radioStateFreq() { return radioFreqValue; }

  function setRadio(freq, options = {}) {
    const value = Math.round(Math.max(87.5, Math.min(108, Number(freq))) * 10) / 10;
    radioFreqValue = value;
    const tuner = $('#radioTuner');
    if (tuner && Number(tuner.value) !== value) tuner.value = String(value);
    const display = $('#radioFreq');
    if (display) display.textContent = value.toFixed(1);
    const needle = $('#radioNeedle');
    if (needle) needle.style.left = `calc(${((value - 87.5) / 20.5) * 100}% - 1px)`;
    const station = Math.abs(value - 99.9) < 0.06 ? '99.9' : Math.abs(value - 100) < 0.06 ? '100.0' : null;
    const distance = station ? 0 : Math.min(Math.abs(value - 99.9), Math.abs(value - 100));
    const bars = station ? 8 : Math.max(1, Math.min(6, Math.round(6 - distance * 1.8)));
    $$('#radioSignal i').forEach((bar, index) => bar.classList.toggle('on', index < bars));
    const stereo = $('#radioStereo');
    if (stereo) stereo.textContent = station ? 'STEREO' : 'MONO';
    if (!station) {
      clearTimeout(radioLockTimer);
      radioLockTimer = null;
      radioLockTimerStation = null;
      const header = $('#transcriptStation');
      if (header) {
        header.textContent = '— 静噪 —';
        header.dataset.locked = '';
      }
      const time = $('#transcriptTime');
      if (time) time.textContent = '--:--';
      const foot = $('#transcriptNote');
      if (foot) {
        foot.textContent = '把指针移到有声音的地方。';
        foot.dataset.locked = '';
      }
      if (!options.silent && !radioMuted) AudioEngine.staticBurst(0.04, 0.012);
    } else if (options.skipLock) {
      return;
    } else if (options.immediate) {
      radioLockTimerStation = station;
      clearTimeout(radioLockTimer);
      lockRadioStation(station, Boolean(options.silent));
    } else if (station !== radioLockTimerStation) {
      radioLockTimerStation = station;
      clearTimeout(radioLockTimer);
      radioLockTimer = setTimeout(() => {
        lockRadioStation(station);
      }, 380);
    }
  }

  let radioLockTimerStation = null;

  function updateRadioHeader() {
    const header = $('#transcriptStation');
    if (header && !header.dataset.locked) header.textContent = '— 无信号 —';
    const foot = $('#transcriptNote');
    if (foot && !foot.dataset.locked) foot.textContent = '把指针移到有声音的地方。';
  }

  function renderRadioStatic() {
    const transcript = $('#transcript');
    if (!transcript) return;
    transcript.innerHTML = `
      <p class="static-line">░ ▒ ▓ ░ ▒ ▓ ░ ▒ ▓ ░ ▒ ▓</p>
      <p class="dim">（调谐中……）</p>
      <p class="dim">（没有信号。只有雨声和一台老式收音机的底噪。）</p>
    `;
    const header = $('#transcriptStation');
    if (header) {
      header.textContent = '— 无信号 —';
      header.dataset.locked = '';
    }
    const time = $('#transcriptTime');
    if (time) time.textContent = '--:--';
    const foot = $('#transcriptNote');
    if (foot) {
      foot.textContent = '把指针移到有声音的地方。';
      foot.dataset.locked = '';
    }
  }

  function lockRadioStation(id, silent = false) {
    const station = RADIO_STATIONS[id];
    if (!station) return;
    const token = ++radioToken;
    const transcript = $('#transcript');
    const header = $('#transcriptStation');
    const time = $('#transcriptTime');
    const foot = $('#transcriptNote');
    if (!transcript) return;
    transcript.innerHTML = '';
    if (header) {
      header.textContent = station.title;
      header.dataset.locked = '1';
    }
    if (time) time.textContent = station.time;
    if (foot) {
      foot.textContent = station.note;
      foot.dataset.locked = '1';
    }
    if (!silent) AudioEngine.staticBurst(0.12, 0.035);
    station.lines.forEach((line, index) => {
      const timer = setTimeout(() => {
        if (token !== radioToken) return;
        const p = document.createElement('p');
        p.className = 'line-new';
        p.innerHTML = line;
        transcript.appendChild(p);
        transcript.scrollTop = transcript.scrollHeight;
        if (index === station.lines.length - 1) {
          if (id === '99.9') state.flags.radio99 = true;
          if (id === '100.0') state.flags.radio100 = true;
          saveState();
          if (state.flags.radio99 && state.flags.radio100) markClue('radio');
          renderNotebook();
          AudioEngine.chime('good');
        }
      }, index * (silent ? 60 : 420));
    });
  }

  function initRadioEvents() {
    const tuner = $('#radioTuner');
    if (tuner) {
      tuner.addEventListener('input', () => {
        setRadio(tuner.value);
        if (radioLockTimer) {
          /* 频率变化时取消尚未锁定的台。 */
        }
      });
      tuner.addEventListener('change', () => {
        const val = Number(tuner.value);
        const station = Math.abs(val - 99.9) < 0.06 ? '99.9' : Math.abs(val - 100) < 0.06 ? '100.0' : null;
        if (!station) updateRadioHeader();
      });
    }
    const scan = $('#radioScan');
    if (scan) {
      scan.addEventListener('click', () => {
        if (radioScanTimer) return;
        let target = 99.9;
        if (state.flags.radio99 && !state.flags.radio100) target = 100.0;
        if (state.flags.radio99 && state.flags.radio100) target = 99.9;
        if (radioFreqValue > target + 0.05) {
          setRadio(87.5, { silent: true });
        }
        scan.disabled = true;
        scan.textContent = '搜台中…';
        radioScanTimer = setInterval(() => {
          const next = Math.round((radioFreqValue + 0.1) * 10) / 10;
          if (next >= target - 0.05) {
            clearInterval(radioScanTimer);
            radioScanTimer = null;
            scan.disabled = false;
            scan.textContent = '自动搜台';
            setRadio(target);
            return;
          }
          setRadio(next, { silent: true, skipLock: true });
          if (Math.random() < 0.12) AudioEngine.staticBurst(0.03, 0.01);
        }, 45);
      });
    }
    const replay = $('#radioReplay');
    if (replay) {
      replay.addEventListener('click', () => {
        const station = Math.abs(radioFreqValue - 99.9) < 0.06 ? '99.9' : Math.abs(radioFreqValue - 100) < 0.06 ? '100.0' : (state.flags.radio100 ? '100.0' : '99.9');
        setRadio(Number(station), { silent: true, skipLock: true });
        lockRadioStation(station);
        showToast('正在重播磁带。', '', 2000);
      });
    }
    const mute = $('#radioMute');
    if (mute) {
      mute.addEventListener('click', () => {
        radioMuted = !radioMuted;
        AudioEngine.setRadioMuted(radioMuted);
        mute.setAttribute('aria-pressed', String(radioMuted));
        mute.textContent = radioMuted ? '取消静噪' : '静噪';
        showToast(radioMuted ? '静噪已开启。字幕仍在。' : '静噪已关闭。', '', 1800);
      });
    }
  }

  /* ============================================================
     0号房
     ============================================================ */

  let passInput = '';
  let passErrorTimer = null;

  function initZeroPage() {
    const gate = $('#zeroGate');
    const room = $('#zeroRoom');
    if (!gate || !room) return;
    if (state.flags.zeroUnlocked) {
      gate.classList.add('hidden');
      room.classList.remove('hidden');
      if (!chatState.started) startZeroChat();
      else if (chatState.phase === 3 && !chatState.busy) renderFinalChoices();
    } else {
      gate.classList.remove('hidden');
      room.classList.add('hidden');
      passInput = '';
      renderPasscode();
    }
  }

  function renderPasscode() {
    const display = $('#passcodeDisplay');
    if (display) {
      display.textContent = passInput.padEnd(4, '·');
      display.classList.remove('error');
    }
  }

  function pressPassKey(key) {
    const error = $('#passcodeError');
    if (key === 'clear') {
      passInput = '';
      renderPasscode();
      if (error) error.textContent = '';
      return;
    }
    if (key === 'enter') {
      checkPasscode();
      return;
    }
    if (/^\d$/.test(key) && passInput.length < 4) {
      passInput += key;
      renderPasscode();
      AudioEngine.blip(620 + Number(key) * 25, 0.025, 'square', 0.012);
      if (passInput.length === 4) {
        setTimeout(checkPasscode, 260);
      }
    }
  }

  function checkPasscode() {
    if (state.flags.zeroUnlocked) return;
    const display = $('#passcodeDisplay');
    const error = $('#passcodeError');
    if (passInput === '0000') {
      state.flags.zeroUnlocked = true;
      saveState();
      AudioEngine.chime('good');
      const gate = $('#zeroGate');
      const room = $('#zeroRoom');
      if (gate) gate.classList.add('hidden');
      if (room) room.classList.remove('hidden');
      renderNotebook();
      startZeroChat();
      showToast('门开了。里面没有锁。', 'good', 2600);
      return;
    }
    if (display) {
      display.classList.add('error');
      display.textContent = passInput.padEnd(4, '·');
    }
    if (error) error.textContent = '门没有开。提示：四个数字，零点。';
    AudioEngine.chime('bad');
    clearTimeout(passErrorTimer);
    passErrorTimer = setTimeout(() => {
      passInput = '';
      renderPasscode();
      if (error) error.textContent = '';
    }, 900);
  }

  function addChat(who, text, extraClass = '') {
    const log = $('#chatLog');
    if (!log) return;
    if (who === 'system') {
      const line = document.createElement('div');
      line.className = 'chat-line system';
      line.innerHTML = `<span class="msg">${escapeHTML(text)}</span>`;
      log.appendChild(line);
    } else {
      const line = document.createElement('div');
      line.className = `chat-line ${who === '0' ? 'zero' : 'me'} ${extraClass}`.trim();
      line.innerHTML = `<span class="who">${who === '0' ? '0' : '你'}：</span><span class="msg">${escapeHTML(text)}</span>`;
      log.appendChild(line);
    }
    log.scrollTop = log.scrollHeight;
  }

  function setChatTyping(on) {
    const typing = $('#chatTyping');
    if (typing) {
      typing.innerHTML = on ? '<span class="dots">对方正在输入</span>' : '';
    }
  }

  async function botSay(text, delay = 700) {
    const token = chatToken;
    setChatTyping(true);
    await sleep(delay);
    if (token !== chatToken) return;
    setChatTyping(false);
    addChat('0', text);
    AudioEngine.blip(520, 0.018, 'sine', 0.008);
  }

  async function systemSay(text, delay = 260) {
    const token = chatToken;
    await sleep(delay);
    if (token !== chatToken) return;
    addChat('system', text);
    AudioEngine.blip(300, 0.02, 'square', 0.007);
  }

  function renderChatChoices(choices, disabled = false) {
    const root = $('#chatChoices');
    if (!root) return;
    root.innerHTML = '';
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chat-choice ${choice.danger ? 'danger' : ''}`.trim();
      btn.textContent = choice.label;
      btn.disabled = disabled;
      btn.addEventListener('click', () => {
        if (chatState.busy) return;
        handleChatChoice(choice);
      });
      root.appendChild(btn);
    });
  }

  async function startZeroChat(force = false) {
    if (chatState.busy) return;
    if (chatState.started && !force) return;
    const token = ++chatToken;
    chatState = { started: true, busy: true, asked: new Set(), phase: 1 };
    const log = $('#chatLog');
    const choices = $('#chatChoices');
    if (log) log.innerHTML = '';
    if (choices) choices.innerHTML = '';
    setChatTyping(false);
    await systemSay('正在连接 0号房…', 120);
    if (token !== chatToken) return;
    await systemSay('连接建立。延迟：26 年。', 450);
    if (token !== chatToken) return;
    await botSay('你来了。', 600);
    await botSay('比约定的时间晚了二十六年。', 900);
    await botSay('别怕。我不是鬼。鬼不会打字这么慢。', 900);
    chatState.busy = false;
    renderChatChoices([
      { id: 'who', label: '你是谁？' },
      { id: 'where', label: '林晚在哪？' },
      { id: 'site', label: '这个网站是谁做的？' }
    ]);
  }

  async function handleChatChoice(choice) {
    if (chatState.busy) return;
    addChat('me', choice.label);
    const root = $('#chatChoices');
    if (root) root.innerHTML = '';
    chatState.busy = true;
    chatState.asked.add(choice.id);

    if (chatState.phase === 1) {
      if (choice.id === 'who') {
        await botSay('我叫0。住在她对面。', 700);
        await botSay('1999年，我每天半夜敲暖气管。三下，停，两下。', 900);
      } else if (choice.id === 'where') {
        await botSay('她不在0号房。', 600);
        await botSay('她在去0号房的路上。那条路很短，可她走了二十六年。', 900);
      } else if (choice.id === 'site') {
        await botSay('网站是她做的。', 600);
        await botSay('她走后，有人替她开着。', 900);
      }
      chatState.busy = false;
      if (chatState.asked.size >= 3) {
        await startChatPhaseTwo();
      } else {
        const remaining = [
          { id: 'who', label: '你是谁？' },
          { id: 'where', label: '林晚在哪？' },
          { id: 'site', label: '这个网站是谁做的？' }
        ].filter(item => !chatState.asked.has(item.id));
        renderChatChoices(remaining);
      }
      return;
    }

    if (chatState.phase === 2) {
      if (choice.id === 'fire') {
        await botSay('她来叫我。她说闻到煤气味。', 800);
        await botSay('我跑出去了。她回去拿一盘磁带。', 900);
        await botSay('我回头的时候，窗户已经红了。', 1000);
        await botSay('他们没找到她。只找到我的一只鞋。', 1000);
      } else if (choice.id === 'two') {
        await botSay('一个是我。一个是她妈妈。', 700);
        await botSay('我学她说话，是怕她妈妈撑不住。', 900);
        await botSay('她妈妈学她说话，是怕我撑不住。', 900);
        await botSay('我们都在等她回来。可我们都知道，她不会回来了。', 1100);
      } else if (choice.id === 'real') {
        await botSay('我是0。', 400);
        await botSay('我是0。', 400);
        await botSay('我是0。', 400);
        await systemSay('自动回复程序 0.exe 发生递归错误。', 500);
        await botSay('……别告诉阿姨。', 900);
      }
      chatState.busy = false;
      if (chatState.asked.size >= 6) {
        await revealMother(tokenSafe());
      } else {
        const remaining = [
          { id: 'fire', label: '那晚发生了什么？' },
          { id: 'two', label: '为什么留言簿有两个晚晚？' },
          { id: 'real', label: '你到底是不是活人？' }
        ].filter(item => !chatState.asked.has(item.id));
        renderChatChoices(remaining);
      }
      return;
    }
  }

  function tokenSafe() { return chatToken; }

  async function startChatPhaseTwo() {
    chatState.phase = 2;
    const token = chatToken;
    await botSay('你还想问什么？', 600);
    if (token !== chatToken) return;
    chatState.busy = false;
    renderChatChoices([
      { id: 'fire', label: '那晚发生了什么？' },
      { id: 'two', label: '为什么留言簿有两个晚晚？' },
      { id: 'real', label: '你到底是不是活人？' }
    ]);
  }

  async function revealMother(token) {
    if (chatState.busy) return;
    chatState.busy = true;
    chatState.phase = 3;
    if (token !== chatToken) return;
    await systemSay('自动回复程序 0.exe 已暂停。', 300);
    await systemSay('当前用户：陈秀兰。', 650);
    await botSay('对不起。让你看笑话了。', 900);
    await botSay('我不是阿野。阿野在去年冬天走了。', 1000);
    await botSay('我是晚晚的妈妈，陈秀兰。', 900);
    await botSay('这个网站，我替她看了二十六年。', 1000);
    await botSay('我学她说话，学阿野打字。学到最后，我自己都分不清了。', 1100);
    await botSay('你别怕。阿姨不是鬼。阿姨只是……不会关机。', 1200);
    await botSay('收件箱里那封〈磁带B面〉，也是我写的。我学他，学得不像。', 1000);
    await botSay('首页那个计数器，不是人数。她把它设成了1999。', 900);
    await botSay('你进来的时候，它跳到了2000。', 900);
    if (token !== chatToken) return;
    state.flags.zeroRevealed = true;
    saveState();
    await botSay('她的草稿箱里有一封信，定时发送设在2000年1月1日零点。', 1000);
    await botSay('那年服务器烧了，信没有发出去。', 900);
    await botSay('我把它修好了。可我按不下去。', 1000);
    await botSay('你帮我按，好不好？', 900);
    if (token !== chatToken) return;
    chatState.busy = false;
    renderFinalChoices();
    renderNotebook();
  }

  function renderFinalChoices() {
    const choices = [
      {
        id: 'send',
        label: state.clues.mail ? '替她按下发送' : '替她按下发送（先读完那封信）',
        disabled: !state.clues.mail,
        primary: true
      },
      { id: 'keep', label: '把信留在这里' },
      { id: 'delete', label: '删除这封信', danger: true }
    ];
    const root = $('#chatChoices');
    if (!root) return;
    root.innerHTML = '';
    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `chat-choice ${choice.danger ? 'danger' : ''}`.trim();
      btn.textContent = choice.label;
      btn.disabled = Boolean(choice.disabled);
      if (choice.disabled) btn.title = '去收件箱的“草稿”文件夹，读完那封〈新年快乐〉。';
      btn.addEventListener('click', () => {
        if (chatState.busy) return;
        if (choice.id === 'send') {
          if (!state.clues.mail) {
            showToast('你还没有读过那封信。去收件箱的草稿箱看看。', 'warn', 3500);
            return;
          }
          openModal('发送这封信？', `
            <h2>这封信已经迟到了二十六年。</h2>
            <p>收件人：陈秀兰<br>发送时间：2000-01-01 00:00<br>当前状态：等待发送</p>
            <p>按下发送后，不可撤回。</p>
            <p class="modal-note">“如果我没有回来，网站别关。会有人来的。”</p>
          `, [
            { label: '发送', primary: true, onClick: () => { closeModal(); showEnding('dawn'); } },
            { label: '再想想' }
          ]);
        } else if (choice.id === 'keep') {
          openModal('把信留下？', `
            <h2>把信留在草稿箱里。</h2>
            <p>它会继续等待。网站也会继续亮着。</p>
            <p class="modal-note">“妈不会打字，但妈会按你写的那些字。”</p>
          `, [
            { label: '留在这里', primary: true, onClick: () => { closeModal(); showEnding('loop'); } },
            { label: '再想想' }
          ]);
        } else if (choice.id === 'delete') {
          openModal('删除这封信？', `
            <h2>永久删除。</h2>
            <p>没有回收站。没有备份。没有第二次机会。</p>
          `, [
            { label: '删除', primary: true, onClick: () => { closeModal(); showEnding('silence'); } },
            { label: '取消' }
          ]);
        }
      });
      root.appendChild(btn);
    });
    if (!state.clues.mail) {
      const note = document.createElement('p');
      note.className = 'chat-note';
      note.textContent = '提示：你还没有读过那封信。去收件箱的“草稿”文件夹看看。';
      root.appendChild(note);
    }
  }

  function openSourceModal() {
    state.flags.sourceViewed = true;
    saveState();
    openModal('查看源代码 / INDEX.HTM', `
      <h2>&lt;!-- 页面源代码 --&gt;</h2>
      <p class="modal-note">浏览器：Netscape Navigator 4.08 · 编码：GB2312 · 最后保存：2026-10-26 23:59</p>
      <pre class="source-code">${escapeHTML(SOURCE_CODE)}</pre>
      <p class="modal-note">有些注释不是写给你看的。但它们一直留在那里。</p>
    `, [{ label: '关闭' }]);
  }

  function initZeroEvents() {
    const keypad = $('#keypad');
    if (keypad) {
      keypad.addEventListener('click', e => {
        const btn = e.target.closest('[data-key]');
        if (!btn) return;
        pressPassKey(btn.dataset.key);
      });
    }
    const viewSource = $('#viewSource');
    if (viewSource) viewSource.addEventListener('click', openSourceModal);
    const restart = $('#zeroRestart');
    if (restart) {
      restart.addEventListener('click', () => {
        if (chatState.busy) {
          showToast('对方还在输入。等她说完。', 'warn', 2000);
          return;
        }
        chatToken += 1;
        chatState = { started: false, busy: false, asked: new Set(), phase: 0 };
        setChatTyping(false);
        $('#chatLog').innerHTML = '';
        $('#chatChoices').innerHTML = '';
        startZeroChat(true);
        showToast('重新连接0号房。', '', 2200);
      });
    }
  }

  document.addEventListener('keydown', e => {
    if (currentPage !== 'zero') return;
    if (state.flags.zeroUnlocked) return;
    const modalOpen = !$('#modalRoot').classList.contains('hidden');
    if (modalOpen) return;
    const tag = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    if (['input', 'textarea', 'select', 'button'].includes(tag)) return;
    if (/^\d$/.test(e.key)) {
      e.preventDefault();
      pressPassKey(e.key);
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      passInput = passInput.slice(0, -1);
      renderPasscode();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      checkPasscode();
    }
  });

  /* ============================================================
     笔记
     ============================================================ */

  function nextHint(direct = false) {
    if (!state.clues.diary) {
      return direct
        ? '打开〈我的日记〉，点开 1999.12.31 那一篇。'
        : '先看看首页。她把最后一天写进了日记。';
    }
    if (!state.clues.cam) {
      return direct
        ? '把时间码拖到最右端 00:00，等窗帘里的人影出现，再按“捕获此帧”。'
        : '摄像头的时间码可以拖动。零点那一帧，信号只亮了七秒。';
    }
    if (!state.clues.radio) {
      return direct
        ? '把收音机调到 99.9，听完；再调到 100.0，听完。'
        : '两个频率。一个在1999年，一个在2026年。';
    }
    if (!state.clues.guestbook) {
      return direct
        ? '点留言簿右上角的“笔迹分析”，再点“开始比对”。'
        : '留言簿里有两个“晚晚”。看看她们说话的方式。';
    }
    if (!state.clues.mail) {
      return direct
        ? '打开收件箱左侧的“草稿”文件夹，点那封〈新年快乐〉。'
        : '最下面有一封没有发出去的信。收件人不是阿野。';
    }
    if (!state.flags.zeroUnlocked) {
      return direct
        ? '在地址栏输入 zero.html，密码是 0000。'
        : '五条线索都齐了。去0号房。密码是零点。';
    }
    return direct
      ? '替她按下发送。或者，把信留下。'
      : '你已经知道该怎么做了。去0号房。';
  }

  function renderNotebook() {
    renderClueList();
    renderPeople();
    renderEndings();
    applyName();
  }

  function renderClueList() {
    const root = $('#clueList');
    const progress = $('#clueProgress');
    if (!root) return;
    const count = clueCount();
    if (progress) progress.textContent = `${count} / 5`;
    root.innerHTML = CLUE_ORDER.map(key => {
      const clue = CLUES[key];
      const done = state.clues[key];
      return `
        <div class="clue-item ${done ? 'done' : ''}">
          <span class="clue-box">${done ? '✓' : ''}</span>
          <span>
            <span class="clue-title">${done ? escapeHTML(clue.title) : '未归档'}</span>
            <span class="clue-desc">${done ? escapeHTML(clue.desc) : '还没有找到。'}</span>
          </span>
        </div>
      `;
    }).join('');
    const hint = $('#hintText');
    if (hint) hint.textContent = nextHint(hintLevel > 0);
    const hintBtn = $('#hintBtn');
    if (hintBtn) hintBtn.textContent = hintLevel > 0 ? '已经是最直接的了' : '给我一点提示';
  }

  function renderPeople() {
    const root = $('#peopleList');
    if (!root) return;
    const zhouUnlocked = state.clues.radio || state.clues.cam;
    const motherUnlocked = state.clues.guestbook || state.flags.zeroRevealed;
    root.innerHTML = `
      <div class="person-card">
        <h3>林晚 / 晚晚</h3>
        <span class="person-role">月面旅馆站长 · 1981—2000</span>
        <p>18岁。喜欢月亮、旧磁带和橘子汽水。1999年12月31日23:47留下最后一篇日记，之后失踪。</p>
      </div>
      <div class="person-card ${zhouUnlocked ? '' : 'locked'}">
        <h3>${zhouUnlocked ? '周野 / 0' : '？？？'}</h3>
        <span class="person-role">${zhouUnlocked ? '午夜频率主播 · 0号房住户' : '尚未确认'}</span>
        <p>${zhouUnlocked ? '住在林晚对面的0号房。1999年12月31日晚，他在广播里警告林晚不要过来。他是那晚唯一从火里跑出来的人。' : '需要更多来自午夜频率或摄像头的线索。'}</p>
      </div>
      <div class="person-card ${motherUnlocked ? '' : 'locked'}">
        <h3>${motherUnlocked ? '陈秀兰' : '？？？'}</h3>
        <span class="person-role">${motherUnlocked ? '林晚的母亲 · 网站维护者' : '尚未确认'}</span>
        <p>${motherUnlocked ? '她用女儿的名字在留言簿上写了二十六年。她不是幽灵。她只是没有关机。' : '留言簿里有人在用“晚晚”的名字，说着不像18岁女孩会说的话。'}</p>
      </div>
    `;
  }

  function renderEndings() {
    const root = $('#endingSlots');
    if (!root) return;
    root.innerHTML = ['dawn', 'loop', 'silence'].map((id, index) => {
      const data = ENDING_DATA[id];
      const unlocked = state.endings.includes(id);
      return `
        <div class="ending-slot ${unlocked ? 'unlocked' : 'locked'}">
          <div class="es-num">ENDING 0${index + 1} / 03</div>
          <h4>${unlocked ? data.title : '？？？'}</h4>
          <p>${unlocked ? data.quote : '尚未抵达。'}</p>
        </div>
      `;
    }).join('');
  }

  function initNotebookEvents() {
    $$('.notebook-tabs button').forEach(btn => {
      btn.addEventListener('click', () => switchNotebookTab(btn.dataset.noteTab));
    });
    const close = $('#notebookClose');
    if (close) close.addEventListener('click', () => closeWindow('notebook'));
    const hint = $('#hintBtn');
    if (hint) {
      hint.addEventListener('click', () => {
        hintLevel = hintLevel > 0 ? 0 : 1;
        const text = $('#hintText');
        if (text) text.textContent = nextHint(hintLevel > 0);
        hint.textContent = hintLevel > 0 ? '已经是最直接的了' : '给我一点提示';
        AudioEngine.blip(660, 0.03, 'sine', 0.012);
      });
    }
    const replay = $('#replayBtn');
    if (replay) {
      replay.addEventListener('click', () => {
        openModal('重新归档？', `
          <h2>重新开始调查</h2>
          <p>线索、留言和摄像头记录会被清空。已经收集的结局会保留。</p>
        `, [
          { label: '重新归档', primary: true, onClick: () => { closeModal(); resetStory(true); } },
          { label: '取消' }
        ]);
      });
    }
  }

  /* ============================================================
     结局 / 收尾
     ============================================================ */

  function endingBodyHTML(id) {
    const name = escapeHTML(state.name);
    const complete = allClues();
    if (id === 'dawn') {
      return `
        <p class="sys">[ SYSTEM ] 正在发送...<br>[ SYSTEM ] 绕过时间校验...<br>[ SYSTEM ] 投递路径 1999-12-31 23:47 → 2026-10-26 23:59<br>[ SYSTEM ] <strong>发送成功。</strong></p>
        <p>延迟：<b>26 年 298 天 0 小时 0 分 0 秒</b></p>
        <p>屏幕白了一下。<br>你听见很远的地方，有一扇窗户被推开。</p>
        <div class="guest-line">留言簿 / 2026-10-27 00:00<br>陈秀兰：晚晚，妈收到了。<br>陈秀兰：新年快乐。<br>陈秀兰：这一次，妈不哭了。妈去把窗户关上。</div>
        <p>网站停止响应。<br>桌面右下角的时间，第一次跳到了 <b>00:00</b>。</p>
        <p class="sys">她不是失踪了。她只是没有来得及长大。</p>
        ${complete ? `
          <p class="sys">服务器日志最后一行：<strong>2000-01-01 00:00:00  wanwan：我就知道，会有人来的。</strong></p>
          <p class="sys">你没有找到任何幽灵。你只是替一个母亲，按下了她二十六年不敢按的回车。</p>
        ` : `
          <p class="sys">你错过了几条线索，但这封信还是送到了。也许，有些事不需要全部知道。</p>
        `}
        <p class="quote">${ENDING_DATA.dawn.quote}</p>
        <p class="sys">见证人：${name} · 线索 ${clueCount()}/5</p>
      `;
    }
    if (id === 'loop') {
      return `
        <p>0：好。阿姨最会等了。</p>
        <p class="sys">[ SYSTEM ] 自动回复程序 0.exe 已恢复。<br>[ SYSTEM ] 草稿已保存。<br>[ SYSTEM ] 访客计数器 +1。</p>
        <p>页面刷新。<br>时间回到 <b>23:59</b>。</p>
        <div class="guest-line">留言簿 / 2026-10-26 23:59<br>0：晚安。明天见。</div>
        <p>很多年后，另一个陌生人在旧服务器里发现了这个网站。<br>他点进留言簿，看见最新的一条：</p>
        <div class="guest-line">2038-01-01 00:00　晚晚：有人在吗？</div>
        <p>他回复：在的。</p>
        <p>三秒后，屏幕上出现一行字：</p>
        <p class="quote">“请进。门没有锁。”</p>
        <p class="sys">你把那封信留在了草稿箱里。网站会一直亮着。你也是。</p>
        <p class="sys">见证人：${name} · 线索 ${clueCount()}/5</p>
      `;
    }
    return `
      <p>你按下了确认。</p>
      <p>没有回收站。没有备份。</p>
      <p>0 的头像灰了下去。</p>
      <p>0：……谢谢你。</p>
      <p class="sys">[ SYSTEM ] 对方已下线。<br>[ SYSTEM ] 草稿已永久删除。</p>
      <p>屏幕黑了。</p>
      <p>你听见机箱里有一声很轻的“咔哒”。<br>像是有人，把门锁上了。</p>
      <p>三天后，你收到一封没有主题的邮件。<br>发件人：chenxiulan@163.net<br><b>“网站怎么打不开了？”</b></p>
      <p>你没有回复。</p>
      <p class="quote">${ENDING_DATA.silence.quote}</p>
      <p class="sys">见证人：${name} · 线索 ${clueCount()}/5</p>
    `;
  }

  function showEnding(id) {
    const data = ENDING_DATA[id];
    if (!data) return;
    if (!state.endings.includes(id)) state.endings.push(id);
    state.flags.finalSeen = true;
    if (id === 'dawn') state.flags.siteClosed = 'dawn';
    if (id === 'silence') state.flags.siteClosed = 'silence';
    if (id === 'loop') state.flags.siteClosed = '';
    saveState();
    renderNotebook();
    updateClock();
    const screen = $('#endingScreen');
    if (!screen) return;
    const kicker = $('#endingKicker');
    if (kicker) kicker.textContent = `ENDING ${data.num} / 03${allClues() ? ' · COMPLETE' : ''}`;
    const title = $('#endingTitle');
    if (title) title.textContent = data.title;
    const sub = $('#endingSub');
    if (sub) sub.textContent = data.en;
    const body = $('#endingBody');
    if (body) body.innerHTML = endingBodyHTML(id);
    const meta = $('#endingMeta');
    if (meta) meta.innerHTML = `见证人：${escapeHTML(state.name)}<br>线索：${clueCount()} / 5<br>档案：CASE_1999 / REV.07<br>${allClues() ? '完整结局已解锁。' : '还有未被发现的线索。'}`;
    screen.classList.remove('hidden');
    document.body.classList.add('ending-open');
    AudioEngine.stopMelody();
    if (id === 'dawn') AudioEngine.chime('good');
    if (id === 'silence') AudioEngine.blip(90, 1.2, 'sine', 0.05);
    setTimeout(() => {
      const first = $('#endingRestart');
      if (first) first.focus();
    }, 120);
  }

  function hideEnding() {
    const screen = $('#endingScreen');
    if (screen) screen.classList.add('hidden');
    document.body.classList.remove('ending-open');
  }

  function resetStory(keepEndings = true) {
    const endings = keepEndings ? state.endings.slice() : [];
    const name = state.name;
    const sound = state.sound;
    const crt = state.crt;
    state = defaultState();
    state.name = name;
    state.sound = sound;
    state.crt = crt;
    state.started = true;
    state.endings = endings;
    hintLevel = 0;
    passInput = '';
    chatToken += 1;
    setChatTyping(false);
    chatState = { started: false, busy: false, asked: new Set(), phase: 0 };
    selectedMailId = null;
    currentMailFolder = 'inbox';
    radioFreqValue = 87.5;
    radioLockTimerStation = null;
    radioToken += 1;
    clearTimeout(radioLockTimer);
    radioLockTimer = null;
    clearInterval(radioScanTimer);
    radioScanTimer = null;
    camValue = 0;
    historyStack = ['home'];
    historyIndex = 0;
    saveState();
    const diaryPage = $('.diary-page');
    if (diaryPage) diaryPage.classList.remove('reveal-secret');
    $$('.diary-entry').forEach(entry => { entry.open = false; });
    const recycle = $('#recycleWindow');
    if (recycle) recycle.classList.add('hidden');
    const computer = $('#computerWindow');
    if (computer) computer.classList.add('hidden');
    closeWindow('notebook');
    const guestName = $('#guestName');
    if (guestName) guestName.value = state.name;
    hideEnding();
    applyName();
    syncSoundUI();
    syncCrtUI();
    updateClock();
    renderAll();
    openWindow('browser');
    navigate('home', { replace: true });
    showToast('档案已重新归档。线索已清空，结局收藏保留。', '', 3600);
  }

  function clearEverything() {
    try { localStorage.removeItem(SAVE_KEY); } catch (err) { /* 忽略 */ }
    window.location.reload();
  }

  function renderClosedPage() {
    const closed = state.flags.siteClosed;
    const kicker = $('#closedKicker');
    const title = $('#closedTitle');
    const body = $('#closedBody');
    if (closed === 'dawn') {
      if (kicker) kicker.textContent = 'SITE CLOSED / 2026-10-27 00:00';
      if (title) title.textContent = '本页不存在。';
      if (body) body.innerHTML = `
        <p>月面旅馆已于 <b>2026-10-27 00:00</b> 停止营业。</p>
        <p>感谢你替她按下了发送。</p>
        <p>域名会过期，服务器会停电，缓存会被清理。<br>但有些回信，已经送到了。</p>
      `;
    } else {
      if (kicker) kicker.textContent = 'CONNECTION FAILED / NO BACKUP';
      if (title) title.textContent = '无法连接到服务器。';
      if (body) body.innerHTML = `
        <p><b>moonlight-motel.net</b> 已停止响应。</p>
        <p>没有备份。没有回收站。没有第二次机会。</p>
        <p>你关掉了浏览器。<br>但屏幕右下角的时间，没有再走过。</p>
      `;
    }
  }

  /* ============================================================
     弹窗
     ============================================================ */

  function openModal(titleText, bodyHTML, actions = null) {
    const root = $('#modalRoot');
    if (!root) return;
    lastFocused = document.activeElement;
    $('#modalTitle').textContent = titleText;
    $('#modalBody').innerHTML = bodyHTML;
    const footer = $('#modalActions');
    footer.innerHTML = '';
    const list = actions && actions.length ? actions : [{ label: '关闭' }];
    list.forEach(action => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = action.label;
      if (action.primary) btn.className = 'primary';
      btn.addEventListener('click', () => {
        AudioEngine.blip(520, 0.02, 'sine', 0.012);
        if (typeof action.onClick === 'function') action.onClick();
        else closeModal();
      });
      footer.appendChild(btn);
    });
    root.classList.remove('hidden');
    setTimeout(() => {
      const first = footer.querySelector('button');
      if (first) first.focus();
    }, 40);
    AudioEngine.blip(760, 0.025, 'sine', 0.012);
  }

  function closeModal() {
    const root = $('#modalRoot');
    if (!root || root.classList.contains('hidden')) return;
    root.classList.add('hidden');
    $('#modalBody').innerHTML = '';
    $('#modalActions').innerHTML = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      try { lastFocused.focus(); } catch (err) { /* 忽略 */ }
    }
    lastFocused = null;
  }

  function openHelp() {
    openModal('帮助 / 关于', `
      <h2>月面旅馆</h2>
      <p>一个发生在 1999 年零点的网页悬疑 ARG。</p>
      <h3>怎么玩</h3>
      <ul>
        <li>浏览网站：左侧书签、站内导航、地址栏都可以跳转。</li>
        <li>寻找 5 条线索，它们会记录在右上角「笔记」里。</li>
        <li>卡住时，打开「笔记 → 给我一点提示」。</li>
        <li>进度自动保存在浏览器本地。</li>
      </ul>
      <h3>操作</h3>
      <ul>
        <li>摄像头：拖动时间码，在 00:00 捕获画面。</li>
        <li>收音机：拖动滑杆或按方向键，找到 99.9 和 100.0。</li>
        <li>留言簿：可以真的留言。有人会回复。</li>
        <li>0号房：密码是四个数字。她没能跨过的那一分钟。</li>
      </ul>
      <h3>说明</h3>
      <p>本作为虚构叙事，人物、地点、网站与事件均属虚构。包含火灾、丧亲、轻度惊悚与闪烁画面。</p>
      <p class="modal-note">图片素材来自 Unsplash（Unsplash License），经复古 / 监控滤镜处理：<br>
      images.unsplash.com/photo-1419242902214-272b3f66ee7a<br>
      images.unsplash.com/photo-1550745165-9bc0b252726f<br>
      images.unsplash.com/photo-1534528741775-53994a69daeb<br>
      images.unsplash.com/photo-1478760329108-5c3ed9d495a0<br>
      其余图形、像素图标、监控画面与报纸均为 CSS / 内联 SVG 绘制。</p>
      <p class="modal-note">建议佩戴耳机。没有声音也能完成。含三种结局。</p>
    `, [
      { label: '打开案件笔记', primary: true, onClick: () => { closeModal(); openNotebook('clues'); } },
      { label: '关闭' }
    ]);
  }

  function openStartMenu() {
    const menu = $('#startMenu');
    const btn = $('#startBtn');
    if (!menu) return;
    menu.classList.remove('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  function closeStartMenu() {
    const menu = $('#startMenu');
    const btn = $('#startBtn');
    if (menu) menu.classList.add('hidden');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function toggleStartMenu() {
    const menu = $('#startMenu');
    if (!menu) return;
    if (menu.classList.contains('hidden')) openStartMenu();
    else closeStartMenu();
  }

  /* ============================================================
     事件绑定
     ============================================================ */

  function initGlobalEvents() {
    // 导航委托
    document.addEventListener('click', e => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        e.preventDefault();
        const page = nav.dataset.nav;
        if (page === 'about') openHelp();
        else navigate(page);
        return;
      }
      const closeModalBtn = e.target.closest('[data-close-modal]');
      if (closeModalBtn) {
        closeModal();
        return;
      }
      if (e.target.closest('#startMenu') || e.target.closest('#startBtn')) return;
      if (!e.target.closest('.modal-window')) closeStartMenu();
    });

    // 桌面图标（单击打开，移动端也能用）
    $$('.desk-icon').forEach(icon => {
      icon.addEventListener('click', () => handleDeskOpen(icon.dataset.open));
    });

    // 窗口控制
    document.addEventListener('click', e => {
      const ctrl = e.target.closest('[data-win]');
      if (ctrl) {
        const name = ctrl.dataset.win;
        const action = ctrl.dataset.action;
        if (action === 'close') closeWindow(name);
        if (action === 'minimize') minimizeWindow(name);
        if (action === 'maximize') maximizeWindow(name);
        return;
      }
      const closeWin = e.target.closest('[data-close-window]');
      if (closeWin) {
        const win = document.getElementById(`${closeWin.dataset.closeWindow}Window`);
        if (win) win.classList.add('hidden');
      }
    });

    // 任务栏
    const startBtn = $('#startBtn');
    if (startBtn) {
      startBtn.addEventListener('click', e => {
        e.stopPropagation();
        toggleStartMenu();
      });
    }

    $$('.task-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.task;
        const win = windowElement(name);
        if (!win) return;
        const task = $(`.task-btn[data-task="${name}"]`);
        if (win.classList.contains('hidden')) openWindow(name);
        else if (task && task.classList.contains('active')) minimizeWindow(name);
        else bringToFront(name);
        if (task && !win.classList.contains('hidden')) task.classList.add('active');
      });
    });

    // 开始菜单项
    $$('[data-start]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.start;
        closeStartMenu();
        if (action === 'browser') openWindow('browser');
        if (action === 'notebook') openNotebook('clues');
        if (action === 'hint') { openNotebook('clues'); setTimeout(() => $('#hintBtn') && $('#hintBtn').click(), 150); }
        if (action === 'sound') toggleSound();
        if (action === 'crt') setCrt(!state.crt);
        if (action === 'intro') {
          openGate();
          runBoot();
        }
        if (action === 'reset') {
          openModal('清除全部档案？', '<h2>所有进度将被删除。</h2><p>包括线索、留言、结局收藏和你的名字。这个操作不能撤销。</p>', [
            { label: '清除', primary: true, onClick: () => { closeModal(); clearEverything(); } },
            { label: '取消' }
          ]);
        }
        if (action === 'shutdown') {
          openModal('关闭 Windows', '<h2>现在可以安全地离开 1999 年了。</h2><p>系统检测到 1 封未读邮件、1 个未发送草稿和 1 个不肯下线的访客。</p><p>关机已取消。</p>', [{ label: '继续等待', primary: true }]);
        }
      });
    });

    // 浏览器工具栏
    const back = $('#btnBack'); if (back) back.addEventListener('click', goBack);
    const forward = $('#btnForward'); if (forward) forward.addEventListener('click', goForward);
    const refresh = $('#btnRefresh'); if (refresh) refresh.addEventListener('click', refreshPage);
    const home = $('#btnHome'); if (home) home.addEventListener('click', goHome);
    const stop = $('#btnStop'); if (stop) stop.addEventListener('click', () => {
      const load = $('#loadingBar');
      if (load) load.classList.remove('loading');
      showToast('传输已停止。已加载的部分不会消失。', '', 1800);
    });
    const go = $('#btnGo');
    if (go) go.addEventListener('click', () => {
      const page = resolveAddress($('#addressBar').value);
      navigate(page);
    });
    const address = $('#addressBar');
    if (address) {
      address.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          navigate(resolveAddress(address.value));
        }
      });
      address.addEventListener('focus', () => address.select());
    }

    // 菜单栏
    $$('.menubar [data-menu]').forEach(btn => {
      btn.addEventListener('click', () => {
        const menu = btn.dataset.menu;
        if (menu === 'help') openHelp();
        else if (menu === 'view') setCrt(!state.crt);
        else if (menu === 'go') { const a = $('#addressBar'); if (a) { a.focus(); a.select(); } }
        else if (menu === 'file') showToast('此档案为只读镜像。文件无法保存。', '', 2600);
        else if (menu === 'edit') showToast('无法编辑1999年的网页。它已经写完了。', '', 2600);
        else if (menu === 'bookmarks') openNotebook('clues');
      });
    });

    const quickNote = $('#notebookQuick');
    if (quickNote) quickNote.addEventListener('click', () => openNotebook('clues'));

    // 笔记窗口拖动
    const browserTitlebar = $('#browserTitlebar');
    if (browserTitlebar) browserTitlebar.addEventListener('pointerdown', e => startDrag(e, 'browser'));
    const notebookTitlebar = $('#notebookTitlebar');
    if (notebookTitlebar) notebookTitlebar.addEventListener('pointerdown', e => startDrag(e, 'notebook'));

    // 音量 / CRT
    const gateSound = $('#gateSound');
    if (gateSound) gateSound.addEventListener('click', toggleSound);
    const traySound = $('#traySound');
    if (traySound) traySound.addEventListener('click', toggleSound);
    const trayCrt = $('#trayCrt');
    if (trayCrt) trayCrt.addEventListener('click', () => setCrt(!state.crt));

    // 录入
    const nameForm = $('#nameForm');
    if (nameForm) {
      nameForm.addEventListener('submit', e => {
        e.preventDefault();
        const input = $('#playerName');
        enterGame(input ? input.value : '');
      });
    }
    const skipBoot = $('#skipBoot');
    if (skipBoot) skipBoot.addEventListener('click', showNameScreen);
    const skipDial = $('#skipDial');
    if (skipDial) skipDial.addEventListener('click', showNameScreen);

    // 键盘
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const modal = $('#modalRoot');
        if (modal && !modal.classList.contains('hidden')) { closeModal(); return; }
        closeStartMenu();
        if (window.innerWidth <= 820) {
          const note = $('#notebookWindow');
          if (note && !note.classList.contains('hidden')) closeWindow('notebook');
        }
      }
      if (e.key === 'F5') {
        e.preventDefault();
        refreshPage();
      }
    });

    // 地址栏输入时，状态栏提示
    document.addEventListener('mouseover', e => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        const label = nav.dataset.nav === 'about' ? '关于本作' : (PAGE_TITLES[nav.dataset.nav] || nav.dataset.nav);
        const statusLink = $('#statusLink');
        if (statusLink) statusLink.textContent = `转到：${label}`;
      }
    });
    document.addEventListener('mouseout', e => {
      const nav = e.target.closest('[data-nav]');
      if (nav) {
        const statusLink = $('#statusLink');
        if (statusLink) statusLink.textContent = '';
      }
    });

    // 回收站 / 我的电脑
    const deletedFile = $('#deletedFile');
    if (deletedFile) {
      deletedFile.addEventListener('click', openDeletedFile);
    }
    const closedRestart = $('#closedRestart');
    if (closedRestart) closedRestart.addEventListener('click', () => resetStory(true));

    // 结局
    const endingRestart = $('#endingRestart');
    if (endingRestart) endingRestart.addEventListener('click', () => resetStory(true));
    const endingDesktop = $('#endingDesktop');
    if (endingDesktop) endingDesktop.addEventListener('click', () => {
      hideEnding();
      openWindow('browser');
      navigate(state.flags.siteClosed ? 'closed' : 'home');
    });
    const endingGallery = $('#endingGallery');
    if (endingGallery) endingGallery.addEventListener('click', () => {
      const cards = ['dawn', 'loop', 'silence'].map((id, i) => {
        const data = ENDING_DATA[id];
        const unlocked = state.endings.includes(id);
        return `
          <div class="ending-slot ${unlocked ? 'unlocked' : 'locked'}" style="margin-bottom:8px">
            <div class="es-num">ENDING 0${i + 1} / 03</div>
            <h4>${unlocked ? data.title : '？？？'}</h4>
            <p>${unlocked ? data.quote : '尚未抵达。'}</p>
          </div>
        `;
      }).join('');
      openModal('结局收藏', `<h2>你抵达过的零点</h2>${cards}<p class="modal-note">已收集 ${state.endings.length} / 3。</p>`, [{ label: '关闭' }]);
    });

    // 远程图片失败兜底
    $$('img.remote-photo').forEach(img => {
      const fail = () => {
        const frame = img.closest('.poster-photo, .polaroid');
        if (frame) frame.classList.add('no-photo');
        img.style.display = 'none';
      };
      if (img.complete && img.naturalWidth === 0) fail();
      else img.addEventListener('error', fail, { once: true });
    });

    // 首次点击时恢复音频上下文（浏览器要求用户手势）
    document.addEventListener('pointerdown', () => {
      if (state.sound) AudioEngine.setEnabled(true);
    }, { once: true });

    // 重置页面滚动 / 移动端地址栏
    window.addEventListener('orientationchange', () => {
      setTimeout(() => { if ($('#viewport')) $('#viewport').scrollTop = 0; }, 250);
    });
  }

  function handleDeskOpen(target) {
    if (target === 'browser') openWindow('browser');
    if (target === 'notebook') openNotebook('clues');
    if (target === 'recycle') {
      const win = $('#recycleWindow');
      if (win) { win.classList.remove('hidden'); bringToFront('recycle'); }
    }
    if (target === 'computer') {
      const win = $('#computerWindow');
      if (win) { win.classList.remove('hidden'); bringToFront('computer'); }
    }
  }

  function openDeletedFile() {
    openModal('给阿野.txt', `
      <h2>给阿野.txt</h2>
      <p class="modal-note">恢复自回收站 · 最后修改 1999-12-31 23:58</p>
      <pre class="source-code">阿野：

如果你看到这个文件，说明我没来得及当面跟你说。

我妈没有锁门。她只是坐在门口，坐了一整夜。
我从窗户爬出去的。毛衣挂破了，你别笑。

煤气味是真的。我闻到了。
你不要去关总阀。你等我。

我把磁带放在你门口了。B面是给你的。
A面是给我妈的。她不会用电脑，你帮我按一下播放。

零点见。

晚晚</pre>
      <p class="modal-note">文件属性：只读 / 已删除 / 没有备份。</p>
    `, [{ label: '关闭' }]);
  }

  /* ============================================================
     启动
     ============================================================ */

  function renderAll() {
    applyName();
    renderNotebook();
    renderHomeGuestbook();
    syncSoundUI();
    syncCrtUI();
    updateClock();
    renderGuestbookList();
    renderMailFolder(currentMailFolder);
    const feedback = $('#guestFeedback');
    if (feedback) feedback.textContent = state.flags.signed ? '你的留言已经写进去了。' : '';
  }

  function init() {
    // URL 调试：?reset=1 清空存档并重新开始
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('reset') === '1') {
        localStorage.removeItem(SAVE_KEY);
        state = defaultState();
      }
    } catch (err) { /* 忽略 */ }

    document.body.classList.toggle('crt-off', !state.crt);
    syncSoundUI();
    syncCrtUI();
    applyName();
    initDiaryEvents();
    initCamEvents();
    initGuestbookEvents();
    initMailEvents();
    initRadioEvents();
    initZeroEvents();
    initNotebookEvents();
    initMidi();
    initGlobalEvents();
    renderNotebook();
    updateClock();

    if (state.started) {
      restoreSession();
    } else {
      openGate();
      runBoot();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
