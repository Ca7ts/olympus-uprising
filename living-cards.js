/* Local cutout rigs. Konva (MIT) supplies the 2D scene graph; original card art is the fallback. */
(() => {
 'use strict';
 const K=window.Konva, manifest=window.LIVING_CARD_RIGS;
 if(!K||!manifest)return;
 K.autoDrawEnabled=false;K.pixelRatio=Math.min(devicePixelRatio||1,1.5);
 const active=new Map(), pending=new Set(), observed=new Set(), textures=new Map();
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frameId=0,last=0,clock=0,scheduled=false;
 const quiet=()=>reduced.matches||document.documentElement.classList.contains('quiet-motion')||window.LIVING_CARDS_PAUSED===true;
 const image=file=>new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(new Error('Missing living card texture: '+file));img.src='assets/living-cards/'+file;});
 async function assets(id){
  let entry=textures.get(id);
  if(!entry){const rig=manifest[id];entry={used:Date.now(),promise:Promise.all([image(rig.background),image(rig.body.file),...rig.parts.map(p=>image(p.file))])};textures.set(id,entry);entry.promise.catch(()=>textures.delete(id));}
  entry.used=Date.now();return entry.promise;
 }
 function prune(){
  const ids=new Set([...active.values()].map(r=>r.id));
  const idle=[...textures].filter(([id])=>!ids.has(id)).sort((a,b)=>b[1].used-a[1].used);
  for(const [id] of idle.slice(8))textures.delete(id);
 }
 function stop(host){const r=active.get(host);if(r){resize.unobserve(host);r.stage.destroy();active.delete(host);}host.removeAttribute('data-ready');}
 const resize=new ResizeObserver(entries=>{for(const {target} of entries){const r=active.get(target);if(r)fit(r);}});
 function fit(r){
  const w=r.host.clientWidth,h=r.host.clientHeight;if(!w||!h)return;
  r.stage.size({width:w,height:h});r.scene.scale({x:w/r.rig.width,y:h/r.rig.height});r.layer.draw();
 }
 async function start(host){
  if(active.has(host)||pending.has(host)||!host.isConnected||quiet()||document.hidden||host.clientWidth<40||active.size>=24)return;
  const id=host.dataset.livingCard,rig=manifest[id];if(!rig)return;
  pending.add(host);
  try{
   const imgs=await assets(id);
   if(!host.isConnected||quiet()||document.hidden||!visible.has(host)||active.size>=24)return;
   const stage=new K.Stage({container:host,width:host.clientWidth,height:host.clientHeight,listening:false});
   const layer=new K.Layer({listening:false});stage.add(layer);
   const scene=new K.Group({listening:false});layer.add(scene);
   scene.add(new K.Image({image:imgs[0],width:rig.width,height:rig.height,listening:false}));
   const root=new K.Group({x:rig.width*.5,y:rig.height*.87,offsetX:rig.width*.5,offsetY:rig.height*.87,listening:false});scene.add(root);
   root.add(new K.Image({image:imgs[1],x:rig.body.x,y:rig.body.y,width:rig.body.width,height:rig.body.height,listening:false}));
   const parts=rig.parts.map((p,i)=>{
    const x=p.pivot[0]*rig.width,y=p.pivot[1]*rig.height;
    const joint=new K.Group({x,y,offsetX:x,offsetY:y,listening:false});
    joint.add(new K.Image({image:imgs[i+2],x:p.x,y:p.y,width:p.width,height:p.height,listening:false}));root.add(joint);
    return {joint,p,x,y};
   });
   const r={host,id,rig,stage,layer,scene,root,parts,phase:[...id].reduce((a,c)=>a+c.charCodeAt(0),0)*.17};
   active.set(host,r);fit(r);resize.observe(host);host.dataset.ready='true';wake();
  }catch(error){console.warn('[Living cards]',id,error.message);stop(host);}
  finally{pending.delete(host);prune();}
 }
 const visible=new Set();
 const intersection=new IntersectionObserver(entries=>{
  for(const e of entries){if(e.isIntersecting){visible.add(e.target);start(e.target);}else{visible.delete(e.target);stop(e.target);}}
  prune();wake();
 },{rootMargin:'0px',threshold:.01});
 function scan(){
  scheduled=false;
  for(const host of [...observed])if(!host.isConnected){stop(host);intersection.unobserve(host);observed.delete(host);visible.delete(host);}
  for(const host of document.querySelectorAll('.living-card-host[data-living-card]'))if(!observed.has(host)){observed.add(host);intersection.observe(host);}
  if(quiet()){for(const host of [...active.keys()])stop(host);}else for(const host of visible)start(host);
  prune();
 }
 function schedule(){if(!scheduled){scheduled=true;queueMicrotask(scan);}}
 new MutationObserver(records=>{if(records.some(r=>r.type==='childList'&&[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1&&!n.matches?.('canvas,.konvajs-content'))))schedule();}).observe(document.body,{childList:true,subtree:true});
 new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 function pose(r,t){
  const expressive=r.host.dataset.motionProfile!=='original';
  const breathGain=expressive?1.4:1;
  const b=Math.sin(t*1.45+r.phase);r.root.scale({x:1+b*.0008*breathGain,y:1+b*.0018*breathGain});
  for(let i=0;i<r.parts.length;i++){
   const {joint,p,x,y}=r.parts[i],wave=Math.sin(t*(p.kind==='wing'?1.25:p.kind==='cloth'?1.65:1.35)+r.phase+i*.9);
   // Midpoint profile: halfway between original and expressive amplitude for each part type.
   const gain=expressive?(p.kind==='cloth'?1.7:p.kind==='sway'?1.4:1.8):1;
   joint.rotation(wave*p.angle*(p.kind==='cloth'?.55:1)*gain);
   joint.position({x:x+(p.kind==='cloth'?wave*r.rig.width*.0017*gain:0),y:y+(p.kind==='sway'?wave*r.rig.height*.0012*gain:0)});
   joint.scaleX(p.kind==='wing'?1+wave*.006*gain:1);
  }
 }
 function tick(now){
  frameId=0;if(document.hidden||quiet()||!active.size){last=0;return;}
  // 30 fps keeps the illustrated motion smooth without tying it to combat speed.
  if(now-last>=32){clock+=Math.min(last?(now-last)/1000:0,.06);last=now;
   for(const r of active.values()){pose(r,clock);r.layer.draw();}}
  frameId=requestAnimationFrame(tick);
 }
 function wake(){if(!frameId&&!document.hidden&&!quiet()&&active.size)frameId=requestAnimationFrame(tick);}
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frameId);frameId=0;last=0;}else{schedule();wake();}});
 reduced.addEventListener('change',schedule);
 document.addEventListener('pointermove',e=>{
  const card=e.target.closest('.legendary-card');if(!card||quiet())return;
  const r=card.getBoundingClientRect();const x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
  const y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));
  const panel=card.querySelector('.art-panel');if(panel){panel.style.setProperty('--foil-x',(100-x*100)+'%');panel.style.setProperty('--foil-angle',(95+y*35)+'deg');}
 },{passive:true});
 window.LivingCards={refresh:schedule,get status(){return {active:active.size,visible:visible.size,cached:textures.size,total:Object.keys(manifest).length};},pause(value=true){window.LIVING_CARDS_PAUSED=value;schedule();},setTime(seconds){for(const r of active.values()){pose(r,seconds);r.layer.draw();}}};
 scan();
})();
