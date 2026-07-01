/* ===== 探索台灣符號 — desktop interactive flow ===== */
const {useState,useEffect,useRef} = React;
const A='fig/assets/';

/* ---------- Taiwan symbol library ---------- */
const SYMBOLS=[
  {k:'digua',   img:A+'f65bdf2e72055589.png', chars:['地','瓜'],       zh:['ㄉㄧˋ','ㄍㄨㄚ'],          py:['dì','guā'],          en:'Sweet Potato',        note:'台灣的形狀就像一顆地瓜 — 在地人也親暱地自稱「番薯囝」。'},
  {k:'tiandeng',img:A+'4185a567f9a393e8.png', chars:['天','燈'],       zh:['ㄊㄧㄢ','ㄉㄥ'],           py:['tiān','dēng'],       en:'Sky Lantern',         note:'在平溪寫下願望,看著它緩緩飄向夜空。'},
  {k:'qiezhi',  img:A+'574d7d862cf94769.png', chars:['茄','芷','袋'],  zh:['ㄑㄧㄝˊ','ㄓˇ','ㄉㄞˋ'],   py:['qié','zhǐ','dài'],   en:'Market Bag',          note:'每個傳統市場都看得到的彩色尼龍袋。'},
  {k:'luroufan',img:A+'75d3a9cd121e4b57.png', chars:['滷','肉','飯'],  zh:['ㄌㄨˇ','ㄖㄡˋ','ㄈㄢˋ'],   py:['lǔ','ròu','fàn'],    en:'Braised Pork Rice',   note:'一碗就是幸福 — 油亮的滷肉鋪在熱飯上。'},
  {k:'lanbaituo',img:A+'edbbbd8aa01ba207.png',chars:['藍','白','拖'],  zh:['ㄌㄢˊ','ㄅㄞˊ','ㄊㄨㄛ'],  py:['lán','bái','tuō'],   en:'Blue-White Slippers', note:'台灣的非官方「國民拖鞋」。'},
  {k:'jipai',   img:A+'1ccf6532852874bb.png', chars:['雞','排'],       zh:['ㄐㄧ','ㄆㄞˊ'],           py:['jī','pái'],          en:'Fried Chicken',       note:'比臉還大一片 — 夜市必吃。'},
  {k:'tanghulu',img:A+'e29098a2ab7e07e3.png', chars:['糖','葫','蘆'],  zh:['ㄊㄤˊ','ㄏㄨˊ','ㄌㄨˊ'],   py:['táng','hú','lú'],    en:'Candied Fruit',       note:'晶亮、香甜,滿滿懷舊滋味。'},
  {k:'chelun',  img:A+'8731e9dbd88b1151.png', chars:['車','輪','餅'],  zh:['ㄔㄜ','ㄌㄨㄣˊ','ㄅㄧㄥˇ'],py:['chē','lún','bǐng'],  en:'Wheel Cake',          note:'紅豆或奶油,鐵板上現烤現吃。'},
];

/* ---------- inline icons ---------- */
function Icon({name,style}){
  const p={fill:'none',stroke:'currentColor',strokeWidth:1.7,strokeLinecap:'round',strokeLinejoin:'round'};
  const m={
    arrow:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M5 12h14M13 6l6 6-6 6"/></svg>,
    back:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M15 18l-6-6 6-6"/></svg>,
    search:<svg viewBox="0 0 24 24" style={style}><circle cx="11" cy="11" r="7" {...p}/><path {...p} d="m20 20-3.5-3.5"/></svg>,
    gear:<svg viewBox="0 0 24 24" style={style}><circle cx="12" cy="12" r="3" {...p}/><path {...p} d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 6.6 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.4H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 5 6.6l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10.6 3H11a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8"/></svg>,
    retry:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5"/></svg>,
    map:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4" {...p}/></svg>,
    spark:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/></svg>,
  };
  return m[name]||null;
}

/* ---------- decorative background (persistent) ---------- */
function Decor(){
  return (
    <div className="decor">
      <div className="blob-tr"></div>
      <svg className="rings" viewBox="0 0 900 900" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9872dc"/><stop offset=".5" stopColor="#f0c9b0"/><stop offset="1" stopColor="#E89A3D"/>
          </linearGradient>
        </defs>
        <circle cx="450" cy="450" r="300" fill="none" stroke="url(#rg)" strokeWidth="1.5" strokeDasharray="7 9" opacity=".7"/>
        <circle cx="450" cy="450" r="410" fill="none" stroke="url(#rg)" strokeWidth="1.5" strokeDasharray="7 11" opacity=".45"/>
      </svg>
      <span className="dot" style={{left:421,top:90,background:'var(--brand)'}}></span>
      <span className="dot" style={{left:489,top:54,background:'var(--bk)'}}></span>
      <span className="dot sm" style={{left:591,top:207,background:'var(--gray)'}}></span>
      <span className="dot" style={{left:676,top:196,background:'var(--brand)'}}></span>
      <span className="dot sm" style={{left:765,top:148,background:'var(--bk)'}}></span>
      <span className="dot sm" style={{left:866,top:124,background:'var(--gray)'}}></span>
      <span className="dot" style={{left:852,top:246,background:'var(--brand)'}}></span>
    </div>
  );
}

/* ---------- chat bubbles (hero) ---------- */
function Bubbles(){
  return (
    <div className="bubbles">
      <div className="cbub blue"  style={{left:375,top:140}}>你好！</div>
      <div className="cbub purple"style={{left:568,top:86}}>nǐ hǎo</div>
      <div className="cbub green" style={{left:686,top:272}}>ㄋㄧˇ ㄏㄠˇ！</div>
    </div>
  );
}

/* ---------- header ---------- */
function Header(){
  return (
    <div className="dk-header">
      <img className="dk-logo" src={A+'f35fbb2d79cebc6b.png'} alt="TCML"/>
      <div className="dk-nav">
        <nav>
          <a>Latest News</a><a>Find A Center</a><a>Taiwan Vibe</a><a>About Us</a>
        </nav>
        <button className="navic"><span style={{fontFamily:'var(--fdisp)',fontSize:14}}>Aa</span></button>
        <button className="navic"><Icon name="gear" style={{width:17,height:17}}/></button>
        <button className="navic brand"><Icon name="search" style={{width:17,height:17}}/></button>
      </div>
    </div>
  );
}

/* ---------- floating food ---------- */
function Food({img,size,x,y,rot=0,dur=6,delay=0,op=1}){
  return <img className="food" src={img} alt="" style={{width:size,height:size,left:x,top:y,opacity:op,
    '--rot':rot+'deg','--dur':dur+'s',animationDelay:delay+'s',transform:`rotate(${rot}deg)`}}/>;
}

/* =================== STEP 1 : HERO / NAME =================== */
function HeroStep({name,setName,onStart}){
  return (
    <div className="layer">
      <Bubbles/>
      <Food img={SYMBOLS[2].img} size={150} x={1090} y={70}  rot={8}  dur={6}/>
      <Food img={SYMBOLS[5].img} size={140} x={1180} y={300} rot={-10} dur={5.4} delay={.4}/>
      <Food img={SYMBOLS[4].img} size={120} x={120}  y={430} rot={-8} dur={6.2} delay={.2}/>

      <div className="hero-block">
        <div className="hero-row1">
          <div className="name-pill">
            <input className="name-input" autoFocus value={name} placeholder="｜Type your name"
              onChange={e=>setName(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')onStart();}}/>
          </div>
          <span className="hero-comma">,</span>
        </div>
        <div className="hero-row2">
          and discover&nbsp;your&nbsp;
          <img className="hero-digua" src={SYMBOLS[0].img} alt=""/>
          <span className="grad-text">&nbsp;Taiwan symbol.</span>
        </div>
        <div className="hero-sub">Taiwan Center for Mandarin Learning</div>
      </div>

      <div className="hi-card" onClick={onStart}>
        <div className="hi-lead">Say Hi to</div>
        <div className="hi-big">Taiwan</div>
        <div className="hi-sub">Start <Icon name="arrow" style={{width:18,height:18,color:'var(--brand)'}}/></div>
      </div>
    </div>
  );
}

/* =================== STEP 2 : CHOOSE =================== */
function ChooseStep({name,onPick,onBack}){
  return (
    <div className="layer fade">
      <button className="backbtn" onClick={onBack}><Icon name="back" style={{width:20,height:20}}/></button>
      <div className="choose-head">
        <div className="ch-eyebrow"><Icon name="spark" style={{width:16,height:16,color:'var(--brand)'}}/> {name||'Friend'}, 哪一個最像你?</div>
        <h2 className="ch-title">Pick the Taiwan symbol that <span className="grad-text">feels like you.</span></h2>
      </div>
      <div className="grid">
        {SYMBOLS.map((s,i)=>(
          <button key={s.k} className="tile rise" style={{animationDelay:(i*.05)+'s'}} onClick={()=>onPick(s)}>
            <div className="tile-imgwrap"><img src={s.img} alt=""/></div>
            <div className="tile-hz">{s.chars.join('')}</div>
            <div className="tile-en">{s.en}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- 田字格 char ---------- */
function Tianzi({hz,zh,py}){
  return (
    <div className="tz">
      <div className="tz-box"><span>{hz}</span></div>
      <div className="tz-zh">{zh}</div>
      <div className="tz-py">{py}</div>
    </div>
  );
}

/* =================== STEP 3 : REVEAL =================== */
function RevealStep({name,sym,onAgain,onBack}){
  return (
    <div className="layer fade">
      <button className="backbtn" onClick={onBack}><Icon name="back" style={{width:20,height:20}}/></button>

      <div className="reveal-wrap">
        <div className="reveal-left">
          <div className="rv-eyebrow">{name||'Friend'}, your Taiwan symbol is</div>
          <div className="rv-name"><span className="grad-text">{sym.en}.</span></div>
          <div className="tz-row">
            {sym.chars.map((c,i)=><Tianzi key={i} hz={c} zh={sym.zh[i]} py={sym.py[i]}/>)}
          </div>
          <p className="rv-note">{sym.note}</p>
          <div className="rv-bubble">這就是你的第一個台灣詞 — 也是學華語的起點。<span className="rv-send"><Icon name="arrow" style={{width:15,height:15}}/></span></div>
          <div className="rv-cta">
            <button className="btn btn-primary" onClick={onAgain}><Icon name="retry" style={{width:17,height:17}}/> 再探索一次</button>
            <button className="btn btn-ghost"><Icon name="map" style={{width:17,height:17}}/> Find A Center</button>
            <button className="btn btn-ghost">Taiwan Vibe <Icon name="arrow" style={{width:17,height:17}}/></button>
          </div>
        </div>
        <div className="reveal-right">
          <div className="sym-stage">
            <div className="sym-halo"></div>
            <img className="sym-hero-img" src={sym.img} alt=""/>
            <div className="sym-ghost">{sym.chars[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =================== APP =================== */
function App(){
  const [step,setStep]=useState('hero');   // hero | choose | reveal
  const [name,setName]=useState('');
  const [sym,setSym]=useState(SYMBOLS[0]);

  /* scale 1440x680 to fit viewport */
  useEffect(()=>{
    const sc=document.getElementById('scaler');
    function fit(){
      const s=Math.min(window.innerWidth/1440, window.innerHeight/680);
      sc.style.transform=`scale(${s})`;
    }
    fit(); window.addEventListener('resize',fit);
    return ()=>window.removeEventListener('resize',fit);
  },[]);

  return (
    <div className="kv">
      <Decor/>
      <Header/>
      {step==='hero'   && <HeroStep name={name} setName={setName} onStart={()=>setStep('choose')}/>}
      {step==='choose' && <ChooseStep name={name} onBack={()=>setStep('hero')} onPick={s=>{setSym(s);setStep('reveal');}}/>}
      {step==='reveal' && <RevealStep name={name} sym={sym} onBack={()=>setStep('choose')} onAgain={()=>setStep('choose')}/>}
    </div>
  );
}

/* ---------- styles ---------- */
const CSS=`
.decor{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.blob-tr{position:absolute;right:-180px;top:-340px;width:980px;height:980px;border-radius:50%;
  background:radial-gradient(46% 46% at 60% 50%,rgba(182,150,239,.55) 0%,rgba(249,233,216,.35) 55%,rgba(245,244,241,0) 75%);}
.rings{position:absolute;right:-240px;top:-260px;width:1000px;height:1000px;}
.dot{position:absolute;width:9px;height:9px;border-radius:50%;}
.dot.sm{width:6px;height:6px;}

/* header */
.dk-header{position:absolute;top:30px;left:60px;right:60px;display:flex;align-items:center;justify-content:space-between;z-index:30;}
.dk-logo{height:34px;width:auto;}
.dk-nav{display:flex;align-items:center;gap:10px;}
.dk-nav nav{display:flex;align-items:center;gap:6px;background:var(--wh);border-radius:999px;padding:6px;
  box-shadow:0 12px 30px -18px rgba(61,27,54,.35);}
.dk-nav nav a{font-family:var(--fui);font-weight:400;font-size:15px;color:var(--bk);padding:9px 16px;border-radius:999px;
  cursor:pointer;transition:background .15s,color .15s;white-space:nowrap;}
.dk-nav nav a:hover{background:rgba(232,154,61,.12);color:var(--brand);}
.navic{width:44px;height:44px;border-radius:999px;border:none;background:var(--wh);cursor:pointer;display:flex;
  align-items:center;justify-content:center;color:var(--bk);box-shadow:0 12px 30px -18px rgba(61,27,54,.35);
  transition:transform .15s,box-shadow .15s;}
.navic:hover{transform:translateY(-2px);}
.navic.brand{background:var(--brand);color:#fff;}

/* layers */
.layer{position:absolute;inset:0;}
.bubbles{position:absolute;inset:0;}
.cbub{position:absolute;font-family:var(--fdisp);font-weight:400;font-size:21px;color:var(--bk);
  padding:11px 22px;border-radius:20px 8px 20px 20px;box-shadow:0 16px 34px -18px rgba(61,27,54,.4);}
.cbub.blue{background:var(--blue);}
.cbub.purple{background:var(--purple);}
.cbub.green{background:var(--green);color:#fff;}

/* floating food */
.food{position:absolute;object-fit:contain;filter:drop-shadow(0 14px 20px rgba(82,55,23,.18));}
@keyframes floaty{0%,100%{transform:translateY(0) rotate(var(--rot,0deg));}50%{transform:translateY(-14px) rotate(var(--rot,0deg));}}
@media (prefers-reduced-motion:no-preference){.food{animation:floaty var(--dur,6s) ease-in-out infinite;}}

/* hero text */
.hero-block{position:absolute;left:63px;top:286px;width:1300px;}
.hero-row1{display:flex;align-items:center;gap:20px;height:100px;}
.name-pill{background:#fff;border:2px solid var(--purple);border-radius:40px 40px 40px 12px;display:flex;align-items:center;
  padding:8px 36px 8px 22px;height:92px;box-shadow:0 20px 44px -24px rgba(61,27,54,.4);}
.name-input{border:none;outline:none;background:none;font-family:var(--fdisp);font-weight:400;font-size:52px;color:var(--bk);
  width:480px;}
.name-input::placeholder{color:#c8c5c0;}
.hero-comma{font-family:var(--fdisp);font-weight:400;font-size:72px;letter-spacing:-1px;}
.hero-row2{display:flex;align-items:center;font-family:var(--fdisp);font-weight:400;font-size:72px;line-height:1.2;
  letter-spacing:-1px;margin-top:18px;white-space:nowrap;}
.hero-digua{width:84px;height:84px;object-fit:contain;transform:rotate(-12deg);vertical-align:middle;
  filter:drop-shadow(0 8px 12px rgba(82,55,23,.2));}
.grad-text{background-image:linear-gradient(118deg,#FF9F37 8%,#955AFF 92%);-webkit-background-clip:text;
  background-clip:text;-webkit-text-fill-color:transparent;}
.hero-sub{font-family:var(--fui);font-weight:300;font-size:21px;letter-spacing:.4px;color:var(--gray);margin-top:26px;}

/* hi-card */
.hi-card{position:absolute;right:60px;bottom:56px;background:#fff;border-radius:22px;padding:18px 24px;text-align:right;
  cursor:pointer;width:200px;box-shadow:0 24px 50px -22px rgba(61,27,54,.45);transition:transform .2s,box-shadow .2s;z-index:20;}
.hi-card:hover{transform:translateY(-5px) rotate(-1deg);box-shadow:0 32px 60px -22px rgba(61,27,54,.55);}
.hi-lead{font-family:var(--fui);font-size:16px;color:var(--brand);}
.hi-big{font-family:var(--fdisp);font-weight:400;font-size:32px;color:var(--brand);line-height:1.05;margin-top:2px;}
.hi-sub{display:flex;align-items:center;justify-content:flex-end;gap:8px;margin-top:12px;font-family:var(--fui);
  font-size:15px;color:var(--gray);}

/* back btn */
.backbtn{position:absolute;left:60px;top:96px;width:48px;height:48px;border-radius:999px;background:#fff;border:none;
  cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--bk);z-index:30;
  box-shadow:0 14px 32px -18px rgba(61,27,54,.4);transition:transform .15s;}
.backbtn:hover{transform:translateX(-3px);}

/* choose */
.choose-head{position:absolute;left:63px;top:154px;width:900px;}
.ch-eyebrow{display:flex;align-items:center;gap:8px;font-family:var(--fui);font-weight:400;font-size:20px;color:var(--gray);}
.ch-title{font-family:var(--fdisp);font-weight:400;font-size:40px;line-height:1.16;letter-spacing:-.5px;margin-top:10px;max-width:720px;}
.grid{position:absolute;left:63px;right:63px;top:288px;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.tile{background:#fff;border:none;cursor:pointer;border-radius:20px;padding:14px 12px 14px;display:flex;flex-direction:column;
  align-items:center;gap:4px;box-shadow:0 18px 40px -26px rgba(61,27,54,.45);transition:transform .2s,box-shadow .2s;}
.tile:hover{transform:translateY(-6px);box-shadow:0 30px 54px -26px rgba(61,27,54,.5);}
.tile-imgwrap{width:104px;height:104px;display:flex;align-items:center;justify-content:center;}
.tile-imgwrap img{max-width:100%;max-height:100%;object-fit:contain;filter:drop-shadow(0 10px 14px rgba(82,55,23,.18));
  transition:transform .25s;}
.tile:hover .tile-imgwrap img{transform:scale(1.08) rotate(-4deg);}
.tile-hz{font-family:var(--fdisp);font-weight:400;font-size:24px;color:var(--bk);}
.tile-en{font-family:var(--fui);font-weight:300;font-size:14px;color:var(--gray);}

/* reveal */
.reveal-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:60px;padding:0 90px;}
.reveal-left{width:560px;}
.rv-eyebrow{font-family:var(--fui);font-weight:400;font-size:22px;color:var(--gray);}
.rv-name{font-family:var(--fdisp);font-weight:400;font-size:64px;line-height:1.1;letter-spacing:-1px;margin-top:6px;}
.tz-row{display:flex;gap:12px;margin-top:26px;}
.tz{display:flex;flex-direction:column;align-items:center;gap:6px;}
.tz-box{width:74px;height:74px;border:1.5px solid var(--brand);border-radius:4px;display:flex;align-items:center;justify-content:center;
  position:relative;background:#fff;}
.tz-box::before,.tz-box::after{content:"";position:absolute;}
.tz-box::before{left:0;right:0;top:50%;height:1px;background:repeating-linear-gradient(to right,rgba(232,154,61,.5) 0 5px,transparent 5px 10px);}
.tz-box::after{top:0;bottom:0;left:50%;width:1px;background:repeating-linear-gradient(to bottom,rgba(232,154,61,.5) 0 5px,transparent 5px 10px);}
.tz-box span{font-family:var(--fdisp);font-weight:400;font-size:42px;color:var(--bk);}
.tz-zh{font-family:var(--fui);font-size:15px;color:var(--green);letter-spacing:1px;}
.tz-py{font-family:var(--fui);font-size:14px;color:var(--gray);}
.rv-note{font-family:var(--fui);font-weight:300;font-size:18px;line-height:1.6;color:var(--bk);margin-top:24px;max-width:520px;}
.rv-bubble{display:inline-flex;align-items:center;gap:14px;background:#fff;border-radius:16px 16px 16px 4px;padding:14px 18px;
  font-family:var(--fdisp);font-weight:400;font-size:18px;color:var(--bk);margin-top:18px;box-shadow:0 16px 34px -20px rgba(61,27,54,.4);}
.rv-send{flex:0 0 auto;width:32px;height:32px;border-radius:999px;background:var(--brand);color:#fff;display:flex;align-items:center;justify-content:center;}
.rv-cta{display:flex;gap:12px;margin-top:30px;flex-wrap:wrap;}
.btn{font-family:var(--fui);font-weight:400;font-size:17px;border:none;cursor:pointer;border-radius:999px;height:54px;padding:0 24px;
  display:inline-flex;align-items:center;gap:9px;transition:transform .18s,box-shadow .18s,background .18s,color .18s;}
.btn:active{transform:scale(.97);}
.btn-primary{background:var(--brand);color:#fff;box-shadow:0 14px 30px -12px rgba(232,154,61,.75);}
.btn-primary:hover{transform:translateY(-2px);background:#ef9a3a;}
.btn-ghost{background:#fff;color:var(--bk);box-shadow:inset 0 0 0 1px rgba(0,0,0,.08);}
.btn-ghost:hover{transform:translateY(-2px);color:var(--brand);box-shadow:inset 0 0 0 1px rgba(232,154,61,.6);}

.reveal-right{flex:0 0 auto;}
.sym-stage{position:relative;width:440px;height:440px;display:flex;align-items:center;justify-content:center;}
.sym-halo{position:absolute;width:380px;height:380px;border-radius:50%;
  background:radial-gradient(50% 50% at 50% 50%,rgba(182,150,239,.45),rgba(249,233,216,.3) 55%,rgba(245,244,241,0) 75%);}
.sym-hero-img{position:relative;width:330px;height:330px;object-fit:contain;z-index:2;filter:drop-shadow(0 24px 34px rgba(82,55,23,.28));}
.sym-ghost{position:absolute;font-family:var(--fdisp);font-weight:400;font-size:300px;line-height:1;color:rgba(74,156,135,.1);z-index:1;}

/* anim */
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes rise{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@media (prefers-reduced-motion:no-preference){
  .fade{animation:fadeIn .5s ease both;}
  .rise{animation:rise .55s cubic-bezier(.2,.8,.2,1) both;}
}
`;
const st=document.createElement('style'); st.textContent=CSS; document.head.appendChild(st);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
