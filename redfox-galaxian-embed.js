(() => {
'use strict';
function mount(){
  let root=document.getElementById('pp-galaxian-game');
  if(!root){
    const host=document.querySelector('.oPos.nobr');
    if(host){root=document.createElement('div');root.id='pp-galaxian-game';host.appendChild(root);}
  }
  if(!root)return false;
  if(root.dataset.galaxianMounted==='redfox-galaxian-v1')return true;
  root.dataset.galaxianMounted='redfox-galaxian-v1';
  root.innerHTML='';
  root.style.cssText='width:100%;max-width:980px;margin:14px auto;line-height:normal;';
  const frame=document.createElement('iframe');
  frame.title='RED FOX — GALAXIAN';
  frame.setAttribute('allow','autoplay; fullscreen');
  frame.setAttribute('allowfullscreen','');
  frame.setAttribute('loading','eager');
  frame.style.cssText='display:block;width:100%;height:clamp(440px,calc(75vw + 70px),790px);border:2px solid #315c7c;border-radius:6px;background:#02050c;';
  frame.src='https://cdn.jsdelivr.net/gh/RedLine142/redfox-galaxian@c2be22d9581e8c691eedf3a8e7dfd8ad85b24d79/index.html';
  root.appendChild(frame);
  return true;
}
function start(){
  if(mount())return;
  const observer=new MutationObserver(()=>{if(mount())observer.disconnect();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();