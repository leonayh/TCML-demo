/* ===== atoms.jsx — shared building blocks ===== */
const A = 'fig/assets/';
const FOOD = {
  jiPai:        A+'1ccf6532852874bb.png',
  jiPaiUp:      A+'e5bf8033e7b6173e.png',
  zuoyebu:      A+'3487970d80bac1b8.png',
  tianDeng:     A+'4185a567f9a393e8.png',
  t101:         A+'461a81b87b1f3006.png',
  taiPi:        A+'4f06d1e1c0f137a1.png',
  taiPiUp:      A+'541221b7fc53e94f.png',
  qieZhiDai:    A+'574d7d862cf94769.png',
  postbox:      A+'59ebc10fb99fc8d6.png',
  qieZhiDaiTilt:A+'5b88c22073a23b48.png',
  cheLunBing:   A+'8731e9dbd88b1151.png',
  banDeng:      A+'ad99511694ea875d.png',
  chouDoufu:    A+'d4c151523b29b5a4.png',
  tangHulu:     A+'e29098a2ab7e07e3.png',
  lanBaiTuo:    A+'edbbbd8aa01ba207.png',
  diGua:        A+'f65bdf2e72055589.png',
  luRouFan:     A+'75d3a9cd121e4b57.png',
};
// sprite f181 : 3 cols x 2 rows -> {keGaJian luRouFan niuRouMian / xiaoLongBao yanSuJi zhenNai}
const SPRITE = A+'f181a7e7bd382152.png';
const spritePos = {
  keGaJian:  '1.4% 4.3%',  luRouFanS:'48.2% .6%', niuRouMian:'95.1% .6%',
  xiaoLongBao:'1.4% 87%',  yanSuJi:'48.2% 87.9%', zhenNai:'95.1% 87.9%',
};
function spriteStyle(key){return {backgroundImage:`url(${SPRITE})`,backgroundRepeat:'no-repeat',
  backgroundPosition:spritePos[key],backgroundSize:'313% 208%'};}

/* ---- inline icons ---- */
function Icon({name,style}){
  const p={fill:'none',stroke:'currentColor',strokeWidth:1.6,strokeLinecap:'round',strokeLinejoin:'round'};
  const m={
    earth:<svg viewBox="0 0 24 24" style={style}><circle cx="12" cy="12" r="9" {...p}/><path {...p} d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>,
    menu:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M4 7h16M4 12h16M4 17h16"/></svg>,
    arrow:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M5 12h14M13 6l6 6-6 6"/></svg>,
    send:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M21 3 11 13M21 3l-6.5 18-3.5-8-8-3.5L21 3Z"/></svg>,
    retry:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5"/></svg>,
    dl:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>,
    share:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M12 16V4m0 0 4 4m-4-4-4 4M5 12v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7"/></svg>,
    back:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M15 18l-6-6 6-6"/></svg>,
    search:<svg viewBox="0 0 24 24" style={style}><circle cx="11" cy="11" r="7" {...p}/><path {...p} d="m20 20-3.5-3.5"/></svg>,
    map:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4" {...p}/></svg>,
    home:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M4 11.5 12 4l8 7.5M6 10v9h12v-9M10 19v-5h4v5"/></svg>,
    ext:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M14 5h5v5M19 5l-8 8M11 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/></svg>,
    video:<svg viewBox="0 0 24 24" style={style}><rect x="3" y="6" width="13" height="12" rx="2.5" {...p}/><path {...p} d="M16 10l5-3v10l-5-3"/></svg>,
    upload:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M12 16V5m0 0 4 4m-4-4-4 4M5 19h14"/></svg>,
    check:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M5 13l4 4L19 7"/></svg>,
    chevron:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M9 6l6 6-6 6"/></svg>,
    play:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M8 5v14l11-7z"/></svg>,
    sparkle:<svg viewBox="0 0 24 24" style={style}><path {...p} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/></svg>,
  };
  return m[name]||null;
}

/* ---- app header (full nav, hero) ---- */
function AppBar({className}){
  return (
    <div className={"appbar "+(className||'')}>
      <div className="logo"></div>
    </div>
  );
}

/* ---- flow header (center pill style 互動區-header) ---- */
function FlowHead({eyebrow}){
  return (
    <div className="flow-head">
      <div className="logo"></div>
      <div className="eyebrow">{eyebrow}</div>
    </div>
  );
}

/* ---- floating food helper ---- */
function Food({k,sprite,size,x,y,rot=0,dur=5,delay=0,extra}){
  const base={width:size,height:size,left:x,top:y,'--rot':rot+'deg','--dur':dur+'s',
    animationDelay:delay+'s',...(extra||{})};
  const bg = sprite ? spriteStyle(sprite) : {backgroundImage:`url(${FOOD[k]})`};
  return <div className="food float-anim" style={{...base,...bg,transform:`rotate(${rot}deg)`}}/>;
}

/* ---- symbol card (田字格) ---- */
function TianziChar({hz,py}){
  return <div className="tianzi"><div className="box"><span className="hz">{hz}</span></div><div className="py">{py}</div></div>;
}
function SymbolCard({letter,chars,pinyins,desc,imgKey,sprite,style,className}){
  return (
    <div className={"sym-card "+(className||'')} style={style}>
      <div className="ghost-letter">{letter}</div>
      <div className="sym-img" style={sprite?spriteStyle(sprite):{backgroundImage:`url(${FOOD[imgKey]})`}}/>
      <div className="tianzi-row">
        {chars.map((c,i)=><TianziChar key={i} hz={c} py={pinyins[i]}/>)}
      </div>
      <div className="desc">{desc}</div>
    </div>
  );
}

/* ---- postcard (single-face flip + tilt; no mirrored backface) ---- */
function Postcard({receiver,sender,heading,sub,front,emoji,message,decoding,flip,style}){
  const ref=React.useRef(null);
  const [t,setT]=React.useState({rx:0,ry:0});
  const [showBack,setShowBack]=React.useState(false);
  const [deg,setDeg]=React.useState(0);
  React.useEffect(()=>{
    if(flip===undefined) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(flip){
      if(reduce){ setShowBack(true); setDeg(0); return; }
      setDeg(90);
      const id=setTimeout(()=>{ setShowBack(true); setDeg(0); },360);
      return ()=>clearTimeout(id);
    } else { setDeg(0); setShowBack(false); }
  },[flip]);
  function move(e){
    const r=ref.current.getBoundingClientRect();
    const px=(e.clientX-r.left)/r.width-.5, py=(e.clientY-r.top)/r.height-.5;
    setT({rx:-py*9, ry:px*9});
  }
  const RightCol=(
    <div className="pc-right-col">
      <div className="pc-field-lbl">收件人 Receiver</div>
      <div className="pc-field-line"><div className="pc-field-val">{receiver||''}</div></div>
      <div className="pc-field-lbl" style={{marginTop:'10%'}}>寄件人 Sender</div>
      <div className="pc-field-line"><div className="pc-field-val">{sender||''}</div></div>
    </div>
  );
  // completed-postcard faces: front = emoji, back = original message
  const FrontFace = (emoji!==undefined) ? (
    <>
      <div className="pc-write-area">
        <div className="pc-wline"></div><div className="pc-wline"></div>
        <div className="pc-wline"></div><div className="pc-wline"></div>
        <div className="pc-write-text emoji">{emoji}</div>
      </div>
      {RightCol}
    </>
  ) : (front ? <div className="pc-front">{front}</div> : null);
  const BackFace = (message!==undefined) ? (
    <>
      <div className="pc-write-area">
        <div className="pc-wline"></div><div className="pc-wline"></div>
        <div className="pc-wline"></div><div className="pc-wline"></div>
        <div className="pc-write-text zh">{message}</div>
      </div>
      {RightCol}
    </>
  ) : (
    <div className="pc-write">
      <div className="pc-heading">{heading||'Greetings from Taiwan!'}</div>
      {sub && <div className="pc-sub">{sub}</div>}
      <div className="pc-tofrom">To {receiver||'a friend'} · From {sender||'you'}</div>
    </div>
  );
  return (
    <div ref={ref} className="pc-persp" style={style}
      onMouseMove={move} onMouseLeave={()=>setT({rx:0,ry:0})}>
      <div className="pc-card" style={{transform:`rotateX(${t.rx}deg) rotateY(${t.ry+deg}deg)`}}>
        {showBack ? BackFace : (decoding ? <div className="pc-decode"/> : FrontFace)}
      </div>
    </div>
  );
}

Object.assign(window,{Icon,AppBar,FlowHead,Food,SymbolCard,Postcard,FOOD,spriteStyle});
