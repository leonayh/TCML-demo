/* ===== app.jsx — router + scaling ===== */
function App(){
  const [route,setRoute]=React.useState('home');
  const go=(r)=>setRoute(r);
  const home=()=>setRoute('home');
  // allow deep-linking a flow via ?go=hero|send|receive (used by demo "next page" nav)
  React.useEffect(()=>{
    const g=new URLSearchParams(location.search).get('go');
    if(g && ['hero','send','receive'].includes(g)) setRoute(g);
  },[]);
  return (
    <div className="screen">
      {route==='home'    && <Home go={go}/>}
      {route==='hero'    && <HeroFlow home={home}/>}
      {route==='send'    && <SendFlow home={home}/>}
      {route==='receive' && <ReceiveFlow home={home} goSend={()=>{location.href='4.Send-Postcard.html'+location.search;}}/>}
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

/* width-governed sizing: fixed 400px column; only scale DOWN when viewport < 400 (down to ~376);
   never scale up — above 400 the column stays 400 centered and the page bg extends to the sides.
   The whole column scrolls vertically like a normal page. */
function fit(){
  const s=document.getElementById('scaler');
  const box=document.getElementById('scaler-box');
  if(!s||!box) return;
  const k=Math.min(1, window.innerWidth/400);
  s.style.transform='scale('+k+')';
  box.style.width=(400*k)+'px';
  box.style.height=(812*k)+'px';
}
window.addEventListener('resize',fit);
setTimeout(fit,60); setTimeout(fit,400);
