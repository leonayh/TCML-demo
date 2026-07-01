/* ===== screens.jsx — home + 3 flows ===== */
const { useState, useEffect, useRef } = React;

/* tilt-on-mousemove wrapper for the postcard micro-interaction */
function Tilt({ children, max = 12, style }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0 });
  function move(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - .5,py = (e.clientY - r.top) / r.height - .5;
    setT({ rx: -py * max, ry: px * max });
  }
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={() => setT({ rx: 0, ry: 0 })}
    style={{ perspective: 1000, ...style }}>
      <div style={{ transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg)`, transition: 'transform .15s ease-out',
        transformStyle: 'preserve-3d', willChange: 'transform' }}>{children}</div>
    </div>);

}

/* ===== demo sequence nav bar (回主頁 / 下一頁) — matches standalone pages ===== */
function DemoNav({ onHome, nextHref, nextLabel }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: 8, background: 'var(--wh)', borderRadius: 16,
      boxShadow: '0 16px 34px -18px rgba(61,27,54,.5)', margin: '4px 20px 30px' }}>
      <button onClick={onHome} style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 8, height: 54,
        padding: '0 18px', border: 'none', borderRadius: 11, background: 'var(--bg)', cursor: 'pointer',
        fontFamily: 'var(--outfit)', fontSize: 16, color: 'var(--bk)' }}>
        <Icon name="home" style={{ width: 18, height: 18 }} />回主頁
      </button>
      {nextHref ?
      <a href={nextHref} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 54, padding: '0 20px', borderRadius: 11, background: 'var(--bk)', color: '#fff', textDecoration: 'none',
        boxShadow: '0 10px 22px -10px rgba(22,19,19,.55)' }}>
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.12 }}>
            <span style={{ fontFamily: 'var(--outfit)', fontWeight: 300, fontSize: 11, letterSpacing: 1, opacity: .85 }}>下一頁</span>
            <span style={{ fontFamily: 'var(--mont)', fontSize: 17 }}>{nextLabel}</span>
          </span>
          <Icon name="arrow" style={{ width: 18, height: 18 }} />
        </a> :
      null}
    </div>);

}

/* ================= HOME LAUNCHER ================= */
function Home({ go }) {
  const exp = [
  { id: 'hero', ext: '5.Symbol-Explorer.html', sprite: 'zhenNai', tag: '加值服務一', zh: '探索你的台灣符號', en: 'Discover Your Taiwan Symbol' },
  { id: 'send', k: 'postbox', ext: '4.Send-Postcard.html', tag: '加值服務二', zh: '寄出你的台灣問候明信片', en: 'Send A Taiwan Hello' }];

  const pages = [
  { ext: '1.Home.html', icon: 'home', zh: 'TCML 網站首頁', en: 'Homepage' },
  { id: 'finder', ext: '2.Center-Finder.html', icon: 'map', zh: '據點查找頁', en: 'Find A Center' },
  { id: 'upload', ext: '3.Video-Upload.html', icon: 'video', zh: '影音上稿示範頁', en: 'Video Demo' }];

  const renderRow = (it, i, base, cls = '') => {
    const chip = it.icon ?
    <span className="pr-ic"><Icon name={it.icon} style={{ width: 18, height: 18 }} /></span> :
    <span className="pr-ic"><span className="pr-img" style={it.sprite ? spriteStyle(it.sprite) : { backgroundImage: `url(${FOOD[it.k]})` }} /></span>;
    const inner = <>{chip}
      <span className="pr-txt">{it.tag && <span className="pr-tag">{it.tag}</span>}<span className="pr-t">{it.zh}</span></span>
      <Icon name="chevron" style={{ width: 18, height: 18, color: 'var(--gray)' }} /></>;
    const style = { animationDelay: base + i * .07 + 's' };
    if (it.ext) {
      const external = /^https?:/.test(it.ext);
      const href = external ? it.ext : it.ext + (typeof location !== 'undefined' ? location.search : '');
      return <a key={i} className={"page-row rise " + cls} style={style} href={href}
      {...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}>{inner}</a>;
    }
    return <button key={it.id} className={"page-row rise " + cls} style={style} onClick={() => go(it.id)}>{inner}</button>;
  };
  return (
    <div className="page fade-enter">
      <div className="blob blob-hero"></div>
      <AppBar className="solid" />
      <div className="scroll-area" style={{ top: 0 }}>
        <div style={{ position: 'relative', paddingBottom: 10 }}>
          <div style={{ position: 'relative', padding: '100px 28px 0' }}>
            <div className="home-sub rise" style={{ animationDelay: '.05s' }}>臺灣華語文學習中心 · 官網改版</div>
            <h1 className="home-title rise" style={{ marginTop: 6, animationDelay: '.12s' }}>
              投標示範頁面
            </h1>
          </div>

          <div className="home-section-label rise" style={{ animationDelay: '.2s' }}>網站頁面</div>
          <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pages.map((it, i) => renderRow(it, i, .24))}
          </div>

          <div className="home-section-label rise" style={{ animationDelay: '.46s', marginTop: '18px' }}>加值方案</div>
          <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {exp.map((it, i) => renderRow(it, i, .5, 'plan'))}
          </div>

          <div className="maker-footer rise" style={{ animationDelay: '.68s' }}>
            <div className="mf-label">Produced<br />by mxdigi</div>
            <img className="maker-logo" src="assets/mxdigi-logo.png" alt="mxdigi" />
          </div>
        </div>
      </div>
    </div>);

}

/* ================= FLOW 1 : HERO / DISCOVER ================= */
function HeroFlow({ home }) {
  const [step, setStep] = useState('name'); // name | reveal
  const [name, setName] = useState('');
  const display = name.trim() || 'Friend';

  if (step === 'name') {
    return (
      <div className="page slide-enter">
        <div className="blob blob-hero"></div>
        <div className="bg-pattern"></div>
        <header className="appbar">
          <div className="logo" onClick={home} style={{ cursor: 'pointer' }}></div>
          <div className="appbar-actions">
            <button className="iconbtn ghost" aria-label="Language"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" /></svg></button>
            <button className="iconbtn brand" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg></button>
          </div>
        </header>
        <Food k="chouDoufu" size={260} x={6} y={48} rot={-6} dur={6} />
        <Food k="qieZhiDaiTilt" size={300} x={210} y={64} rot={8} dur={5} delay={.4} />
        <Food k="taiPi" size={220} x={281} y={300} rot={18} dur={5.6} delay={.2} />

        <div style={{ position: 'absolute', left: 24, right: 24, top: 250 }}>
          <div style={{ position: 'relative', display: 'inline-block', maxWidth: '330px' }}>
            <input className="hero-name-input rise" autoFocus value={name} placeholder="｜Type your name"
            onChange={(e) => setName(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') setStep('reveal');}}
            style={{ width: name ? 'auto' : '310px', maxWidth: '330px', borderRadius: "18px 18px 18px 4px", paddingRight: name.trim() ? '58px' : '16px' }} />
            {name.trim() && (
              <img src="assets/btn-icon.png" alt="送出" onClick={() => setStep('reveal')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, cursor: 'pointer' }} />
            )}
          </div>
          <h1 className="hero-h1 rise" style={{ marginTop: 18, animationDelay: '.08s' }}>
            And Discover<br />Your <span style={{ display: 'inline-block', width: 58, height: 58, verticalAlign: '-16px', transform: 'rotate(2deg)',
              ...spriteStyle('zhenNai') }} /><br />
            <span className="accent">Taiwan Symbol.</span>
          </h1>
          <div className="hero-inst rise" style={{ marginTop: 18, animationDelay: '.16s' }}>Taiwan Center for Mandarin Learning</div>
        </div>

        <div style={{ position: 'absolute', right: 24, bottom: 120 }}>
          <div className="hi-card rise" style={{ animationDelay: '.24s', borderRadius: "18px 18px 4px" }} onClick={() => setStep('reveal')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src="assets/wave.png" alt="" style={{ width: 46, height: 46, flex: '0 0 auto' }} />
              <div style={{ textAlign: 'left' }}>
                <div className="lead" style={{ fontSize: "18px", letterSpacing: "0.4px", textAlign: "left" }}>Say Hi to</div>
                <div className="big">Taiwan</div>
              </div>
            </div>
            <div className="sub" onClick={(e) => {
              e.stopPropagation();
              const cover = document.createElement('div');
              cover.style.cssText = 'position:fixed;inset:0;background:#F5F4F1;opacity:0;transition:opacity .35s ease;z-index:9999;';
              document.body.appendChild(cover);
              requestAnimationFrame(() => { cover.style.opacity = '1'; });
              setTimeout(() => { location.href = '1.Home.html#fadein'; }, 360);
            }}>Back</div>
          </div>
        </div>
      </div>);

  }

  /* reveal — symbol info scroll */
  const bubbles = [
  'Your symbol is more than a cultural icon.',
  "It's a small doorway into Mandarin learning.",
  "Taiwan's everyday life and a community of learners around the world."];

  return (
    <div className="page fade-enter">
      <button className="backbtn" onClick={() => setStep('name')}><Icon name="back" /></button>
      <div className="scroll-area">
        <div style={{ position: 'relative', background: 'linear-gradient(rgba(0,0,0,.45),rgba(0,0,0,.45)), var(--bg)' }}>
          <div className="blob blob-hero" style={{ opacity: .5 }}></div>
          <div className="bg-pattern"></div>

          {/* bubbles */}
          <div style={{ position: 'relative', padding: '74px 20px 0', display: 'flex', flexDirection: 'column', gap: 12, zIndex: 5 }}>
            {bubbles.map((b, i) =>
            <div key={i} className="bubble rise" style={{ animationDelay: .15 + i * .6 + 's' }}>
                <span>{b}</span>
              </div>
            )}
          </div>

          {/* collage: faint headline + scattered symbol cards + floating food */}
          <div style={{ position: 'relative', height: 560, marginTop: 24, zIndex: 2 }}>
            <Food k="lanBaiTuo" size={230} x={262} y={-30} rot={12} dur={6} extra={{ zIndex: 10, opacity: 0, animation: 'fadeIn 1.1s ease 3.75s forwards, floaty 6s ease-in-out 3.75s infinite' }} />
            <Food k="banDeng" size={200} x={-72} y={230} rot={-14} dur={5.4} delay={.3} extra={{ zIndex: 10, opacity: 0, animation: 'fadeIn 1.1s ease 3.75s forwards, floaty 5.4s ease-in-out 3.75s infinite' }} />
            <Food sprite="niuRouMian" size={210} x={245} y={335} rot={-2} dur={6.2} delay={.5} extra={{ zIndex: 10, opacity: 0, animation: 'fadeIn 1.1s ease 3.75s forwards, floaty 6.2s ease-in-out 3.75s infinite' }} />

            <img className="rise" src="assets/card-lanbaituo.png" alt="藍白拖" style={{ position: 'absolute', width: 134, top: 6, left: 64, transform: 'rotate(0deg)', animationDelay: '1.95s', zIndex: 3, filter: 'drop-shadow(0 18px 30px rgba(61,27,54,.25))' }} />
            <img className="rise" src="assets/card-yizi.png" alt="椅子" style={{ position: 'absolute', width: 134, top: 140, left: 238, transform: 'rotate(0deg)', animationDelay: '2.55s', zIndex: 4, filter: 'drop-shadow(0 18px 30px rgba(61,27,54,.25))' }} />
            <img className="rise" src="assets/card-niuroumian.png" alt="牛肉麵" style={{ position: 'absolute', width: 134, top: 296, left: 80, transform: 'rotate(0deg)', animationDelay: '3.15s', zIndex: 3, filter: 'drop-shadow(0 18px 30px rgba(61,27,54,.25))' }} />
          </div>

          {/* ready + CTA in flow */}
          <div style={{ position: 'relative', zIndex: 5, padding: '0 20px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="bubble rise" style={{ animationDelay: '4.35s' }}>
              <span>Ready to go further?</span>
            </div>
            <button className="btn btn-primary btn-lg rise" style={{ fontSize: 18, animationDelay: '4.95s' }} onClick={home}>
              <Icon name="arrow" style={{ width: 16, height: 16 }} /> Explore Mandarin Courses
              <Icon name="arrow" className="ar" style={{ width: 16, height: 16 }} />
            </button>
          </div>
          <DemoNav onHome={home} nextHref={'4.Send-Postcard.html' + location.search} nextLabel="寄出明信片" />
        </div>
      </div>
    </div>);

}

/* ================= FLOW 2 : SEND A TAIWAN HELLO ================= */
function SendFlow({ home, startStep = 'intro', incoming }) {
  const [step, setStep] = useState(startStep); // intro | write | done
  const [mode, setMode] = useState('emoji'); // mandarin | emoji
  const [msg, setMsg] = useState('');
  const [flip, setFlip] = useState(false);
  const [toast, setToast] = useState('');

  function finish() {setStep('done');setTimeout(() => setFlip(true), 350);}
  function retry() {setFlip(false);setStep('write');}
  function ding(t) {setToast(t);setTimeout(() => setToast(''), 1600);}

  const text = msg.trim() || 'Greetings from Taiwan!';
  const mandarin = mode === 'mandarin' ? '華語：來自臺灣的問候！' : null;
  const emoji = mode === 'emoji' ? '🧋 🩴 🥟 🏮' : null;

  return (
    <div className="page slide-enter">
      <div className="blob blob-peach"></div>
      <div className="blob blob-purple"></div>
      <button className="backbtn" onClick={step === 'intro' ? home : () => {setFlip(false);setStep(step === 'done' ? 'write' : 'intro');}}>
        <Icon name="back" /></button>
      <FlowHead eyebrow="Send A Taiwan Hello" />

      {step === 'intro' &&
      <div className="page fade-enter">
          <div style={{ position: 'absolute', top: 230, left: 30, right: 30, textAlign: 'center' }}>
            <div className="rise" style={{ fontFamily: 'var(--mont)', fontWeight: 500, fontSize: 28, lineHeight: 1.5, color: 'var(--bk)' }}>
              Write a message<br />to a friend.
            </div>
            <div className="rise" style={{ animationDelay: '.1s', marginTop: 18, fontFamily: 'var(--mont)', fontWeight: 500, fontSize: 28, lineHeight: 1.5, color: 'var(--bk)' }}>
              We'll make it<br />postcard-worthy.
            </div>
          </div>
          <div className="flow-foot">
            <button className="btn btn-ghost btn-lg rise" style={{ animationDelay: '.2s', fontSize: 17 }}
          onClick={() => {setMode('mandarin');setStep('write');}}>Translate into Mandarin</button>
            <button className="btn btn-ghost btn-lg rise" style={{ animationDelay: '.28s', fontSize: 17 }}
          onClick={() => {setMode('emoji');setStep('write');}}>Translate into Taiwan symbol</button>
          </div>
        </div>
      }

      {step === 'write' &&
      <div className="page fade-enter">
          <div style={{ position: 'absolute', top: 150, left: 30, right: 30, textAlign: 'center',
          fontFamily: 'var(--mont)', fontWeight: 500, fontSize: 22, lineHeight: 1.5, color: 'var(--bk)' }}>
            Write a message to a friend.<br />We'll make it postcard-worthy.
          </div>
          <Postcard style={{ position: 'absolute', top: 280, left: 35 }} receiver="A friend" sender="You" />
          <div style={{ position: 'absolute', top: 262, right: 34, background: 'var(--brand)', color: '#fff',
          fontFamily: 'var(--outfit)', fontSize: 12, padding: '4px 10px', borderRadius: 999 }}>
            {mode === 'mandarin' ? '→ 華語 Mandarin' : '→ 符號 Symbol'}</div>
          <div className="flow-foot">
            <input className="field" autoFocus placeholder="｜Type here" value={msg}
          onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') finish();}} />
            <button className="btn btn-primary btn-lg" onClick={finish}>
              Finish <Icon name="arrow" className="ar" style={{ width: 18, height: 18 }} /></button>
          </div>
        </div>
      }

      {step === 'done' &&
      <div className="page fade-enter">
          <div style={{ position: 'absolute', top: 170, left: 30, right: 30, textAlign: 'center',
          fontFamily: 'var(--outfit)', fontWeight: 400, fontSize: 24, color: 'var(--bk)' }}>
            Your postcard is ready!
          </div>
          <Postcard style={{ position: 'absolute', top: 280, left: 35 }}
        receiver="A friend" sender="You" heading={text} sub={mandarin || emoji} flip={flip} />
          <div className="flow-foot">
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1, height: 56 }} onClick={retry}>
                Retry <Icon name="retry" style={{ width: 18, height: 18 }} /></button>
              <button className="btn btn-primary" style={{ flex: 1, height: 56 }} onClick={() => ding('Postcard downloaded ✓')}>
                Download <Icon name="dl" style={{ width: 18, height: 18 }} /></button>
            </div>
            <button className="btn btn-ghost btn-lg" onClick={() => ding('Share link copied ✓')}>
              Share <Icon name="share" style={{ width: 18, height: 18 }} /></button>
          </div>
        </div>
      }
      {toast && <div className="hint" style={{ bottom: 'auto', top: 120, background: 'var(--bk)', color: '#fff' }}>{toast}</div>}
    </div>);

}

/* ================= FLOW 3 : RECEIVE A TAIWAN HELLO ================= */
function ReceiveFlow({ home, goSend }) {
  const [step, setStep] = useState('intro'); // intro | decoding | reveal
  const [flip, setFlip] = useState(false);
  const [pc, setPc] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem('tcml_postcard'); if (s) setPc(JSON.parse(s)); } catch (e) {}
  }, []);

  function open() {
    setStep('decoding');
    setTimeout(() => {setStep('reveal');setTimeout(() => { setFlip(true); setTimeout(() => setDone(true), 1600); }, 1300);}, 2300);
  }

  return (
    <div className="page slide-enter">
      <div className="blob blob-peach"></div>
      <div className="blob blob-purple"></div>
      <button className="backbtn" onClick={home}><Icon name="back" /></button>
      <FlowHead eyebrow="A Taiwan Hello" />

      {step === 'intro' &&
      <div className="page fade-enter">
          <Food k="postbox" size={120} x={140} y={250} rot={-4} dur={5.5} />
          <div style={{ position: 'absolute', top: 400, left: 30, right: 30, textAlign: 'center',
          fontFamily: 'var(--mont)', fontWeight: 400, fontSize: 28, color: 'var(--bk)' }} className="rise">
            You've got a <span style={{ backgroundImage: 'linear-gradient(108.57deg, #FF9F37 8.43%, #955AFF 92.28%)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>postcard</span>!
          </div>
          <div className="flow-foot">
            <button className="btn btn-primary btn-lg" onClick={open}>
              Open <Icon name="arrow" className="ar" style={{ width: 18, height: 18 }} /></button>
          </div>
        </div>
      }

      {(step === 'decoding' || step === 'reveal') &&
      <div className="page fade-enter">
          <div style={{ position: 'absolute', top: 150, left: 30, right: 30, textAlign: 'center',
          fontFamily: 'var(--outfit)', fontWeight: 400, fontSize: 24, color: 'var(--bk)' }}>
            {step === 'decoding' ?
          <span>Decoding your message<span className="dots"></span></span> :
          'Your postcard reveals...'}
          </div>
          <Postcard style={{ position: 'absolute', top: 230, left: 35 }}
        receiver={pc ? (pc.receiver || 'A friend') : 'Tinz'} sender={pc ? (pc.sender || 'You') : 'Lyn'}
        emoji={pc && pc.frontHTML ? <span dangerouslySetInnerHTML={{ __html: pc.frontHTML }} /> : <span>🧋 🥟 🏮 👜</span>}
        message={pc && pc.message ? pc.message : "Greetings from Taiwan! Learning Mandarin now — miss you! 🧋"}
        decoding={step === 'decoding'} flip={step === 'reveal' && flip} />

          {step === 'reveal' &&
        <div className="flow-foot rise" style={{ animationDelay: '.5s' }}>
              <button className="btn btn-primary btn-lg" onClick={goSend}>
                Send a Postcard Back <Icon name="send" style={{ width: 18, height: 18 }} /></button>
              <button className="btn btn-ghost btn-lg" onClick={() => {location.href = '3.Video-Upload.html' + location.search;}}>
                Explore Taiwan's Culture <Icon name="arrow" className="ar" style={{ width: 18, height: 18 }} /></button>
              <button className="btn btn-ghost btn-lg" onClick={() => {location.href = '2.Center-Finder.html' + location.search;}}>
                Find a Learning Center <Icon name="map" style={{ width: 18, height: 18 }} /></button>
            </div>
        }
        </div>
      }

      <div className={"dm-overlay" + (done ? ' on' : '')}>
        <div className="dm-card">
          <div className="dm-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l5 5L20 6" /></svg>
          </div>
          <div className="dm-title">以上為明信片完整流程</div>
          <button className="dm-btn" onClick={home}>回主頁</button>
        </div>
      </div>
    </div>);

}

/* ================= PAGE : 據點查找 (Find a Center) ================= */
function FinderPage({ home }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const centers = [
  { n: '矽谷中文學校 TCML', c: 'San Jose, CA · USA', d: '2.3 km', pin: { x: '32%', y: '40%' } },
  { n: '北加州臺灣會館 TCML', c: 'Milpitas, CA · USA', d: '8.1 km', pin: { x: '52%', y: '56%' } },
  { n: '華府臺灣學校 TCML', c: 'Washington, D.C. · USA', d: '—', pin: { x: '70%', y: '30%' } },
  { n: '捷克台灣協會 TCML', c: 'Prague · Czechia', d: '—', pin: { x: '46%', y: '22%' } }];

  const list = centers.filter((c) => (c.n + c.c).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page slide-enter">
      <button className="backbtn" onClick={home}><Icon name="back" /></button>
      <FlowHead eyebrow="Find a TCML Center" />
      <div className="scroll-area" style={{ top: 118 }}>
        <div style={{ padding: '8px 22px 28px' }}>
          <div className="search-field">
            <Icon name="search" style={{ width: 18, height: 18, color: 'var(--gray)' }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜尋城市或國家 · Search city or country" />
          </div>

          <div className="placeholder-map">
            <div className="ph-cap">互動地圖 / map view</div>
            {centers.map((c, i) =>
            <span key={i} className={"map-pin " + (i === active ? 'on' : '')}
            style={{ left: c.pin.x, top: c.pin.y }} onClick={() => setActive(i)}>
                <Icon name="map" style={{ width: 16, height: 16 }} />
              </span>
            )}
          </div>

          <div className="home-section-label" style={{ padding: 0, margin: '22px 0 10px' }}>
            {list.length} 個據點 · Centers
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {list.map((c, i) => {
              const idx = centers.indexOf(c);
              return (
                <button key={i} className={"center-card " + (idx === active ? 'on' : '')} onClick={() => setActive(idx)}>
                  <span className="cc-pin"><Icon name="map" style={{ width: 16, height: 16 }} /></span>
                  <span className="pr-txt"><span className="pr-t">{c.n}</span><span className="pr-s">{c.c}</span></span>
                  <span className="cc-dist">{c.d}</span>
                </button>);

            })}
            {list.length === 0 && <div className="empty-note">找不到符合的據點 · No centers found</div>}
          </div>
        </div>
      </div>
    </div>);

}

/* ================= PAGE : 影音上稿示範 (Media Upload Demo) ================= */
function UploadPage({ home }) {
  const [stage, setStage] = useState('form'); // form | uploading | done
  const [pct, setPct] = useState(0);
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('文化活動');
  const cats = ['文化活動', '教學影片', '學員故事', '招生資訊'];

  function publish() {
    setStage('uploading');setPct(0);
    const t0 = Date.now(),dur = 1800;
    const tick = () => {
      const p = Math.min(100, Math.round((Date.now() - t0) / dur * 100));
      setPct(p);
      if (p < 100) requestAnimationFrame(tick);else setTimeout(() => setStage('done'), 350);
    };
    requestAnimationFrame(tick);
  }
  function reset() {setStage('form');setPct(0);setTitle('');}

  return (
    <div className="page slide-enter">
      <button className="backbtn" onClick={home}><Icon name="back" /></button>
      <FlowHead eyebrow="Media Upload Demo" />
      <div className="scroll-area" style={{ top: 118 }}>
        <div style={{ padding: '8px 22px 28px' }}>
          {stage === 'done' ?
          <div className="upload-done rise">
              <div className="ud-check"><Icon name="check" style={{ width: 30, height: 30 }} /></div>
              <div className="ud-title">影片已發布！</div>
              <div className="ud-sub">{title || '未命名影片'} · {cat}</div>
              <div className="vid-card" style={{ marginTop: 18 }}>
                <span className="vid-play"><Icon name="play" style={{ width: 20, height: 20 }} /></span>
                <div className="ph-cap">影片縮圖 / video thumbnail</div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
                <button className="btn btn-ghost" style={{ flex: 1, height: 52 }} onClick={reset}>
                  再上傳一支 <Icon name="upload" style={{ width: 16, height: 16 }} /></button>
                <button className="btn btn-primary" style={{ flex: 1, height: 52 }} onClick={home}>完成</button>
              </div>
            </div> :

          <>
              <div className={"dropzone " + (stage === 'uploading' ? 'busy' : '')}>
                <span className="dz-ic"><Icon name={stage === 'uploading' ? 'upload' : 'video'} style={{ width: 26, height: 26 }} /></span>
                {stage === 'uploading' ?
              <><div className="dz-t">上傳中… {pct}%</div>
                      <div className="dz-bar"><span style={{ width: pct + '%' }} /></div></> :
              <><div className="dz-t">拖曳影片到這裡，或點擊上傳</div>
                      <div className="dz-s">支援 MP4 · MOV · 最大 2GB</div></>}
              </div>

              <label className="fld-label">影片標題 · Title</label>
              <input className="cms-input" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="輸入影片標題" disabled={stage === 'uploading'} />

              <label className="fld-label">分類 · Category</label>
              <div className="chip-row">
                {cats.map((c) =>
              <button key={c} className={"chip " + (cat === c ? 'on' : '')} disabled={stage === 'uploading'}
              onClick={() => setCat(c)}>{c}</button>
              )}
              </div>

              <label className="fld-label">影片說明 · Description</label>
              <textarea className="cms-input" rows={3} placeholder="輸入影片說明…" disabled={stage === 'uploading'} />

              <button className="btn btn-primary btn-lg" style={{ marginTop: 18 }} disabled={stage === 'uploading'} onClick={publish}>
                {stage === 'uploading' ? '發布中…' : <>發布影片 <Icon name="upload" style={{ width: 18, height: 18 }} /></>}
              </button>
            </>
          }
        </div>
      </div>
    </div>);

}

Object.assign(window, { Home, HeroFlow, SendFlow, ReceiveFlow, FinderPage, UploadPage, Tilt });