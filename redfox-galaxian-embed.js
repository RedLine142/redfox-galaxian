(() => {
'use strict';
const GAME_URL='https://cdn.jsdelivr.net/gh/RedLine142/redfox-galaxian@e0ee4bdf5f10f520ae63c61df305c23a04c97cf5/game.html';
function mount(){
  let root=document.getElementById('pp-galaxian-game');
  if(!root){
    const host=document.querySelector('.oPos.nobr');
    if(host){
      root=document.createElement('div');
      root.id='pp-galaxian-game';
      host.appendChild(root);
    }
  }
  if(!root)return false;
  if(root.dataset.galaxianMounted==='original-galaxian-v4')return true;
  root.dataset.galaxianMounted='original-galaxian-v4';
  root.innerHTML='';
  root.style.cssText='width:100%;max-width:620px;margin:14px auto;line-height:normal;overflow:hidden;background:#000;';
  const frame=document.createElement('iframe');
  frame.title='GALAXIAN — оригинальная версия';
  frame.setAttribute('allow','autoplay; fullscreen');
  frame.setAttribute('allowfullscreen','');
  frame.setAttribute('loading','eager');
  frame.setAttribute('scrolling','no');
  frame.setAttribute('tabindex','0');
  frame.style.cssText='display:block;width:100%;height:380px;border:2px solid #315c7c;border-radius:6px;background:#000;box-sizing:border-box;';
  frame.src=GAME_URL;
  root.appendChild(frame);
  return true;
}
function start(){
  if(mount())return;
  const observer=new MutationObserver(()=>{
    if(mount())observer.disconnect();
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();