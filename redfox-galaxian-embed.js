(() => {
'use strict';
const GAME_URL='https://raw.githack.com/RedLine142/redfox-galaxian/fbacacec2be724c7e83e78527518e1f38b3fab38/galaxy-invaders.html';
function mount(){
  let root=document.getElementById('pp-galaxy-invaders');
  if(!root){
    const host=document.querySelector('.oPos.nobr');
    if(host){
      root=document.createElement('div');
      root.id='pp-galaxy-invaders';
      host.appendChild(root);
    }
  }
  if(!root)return false;
  if(root.dataset.mounted==='galaxy-invaders-v1')return true;
  root.dataset.mounted='galaxy-invaders-v1';
  root.style.cssText='width:100%;max-width:640px;margin:14px auto;overflow:hidden;background:#000;line-height:normal;border:2px solid #315c7c;border-radius:6px;box-sizing:border-box;aspect-ratio:4/3;';
  const frame=document.createElement('iframe');
  frame.title='Galaxy Invaders';
  frame.setAttribute('allow','autoplay; fullscreen');
  frame.setAttribute('allowfullscreen','');
  frame.setAttribute('loading','eager');
  frame.setAttribute('scrolling','no');
  frame.setAttribute('tabindex','0');
  frame.style.cssText='display:block;width:100%;height:100%;border:0;background:#000;';
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