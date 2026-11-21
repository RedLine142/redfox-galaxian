(() => {
'use strict';
const GAME_URL='https://cdn.jsdelivr.net/gh/RedLine142/redfox-galaxian@df60301210013bced1d9a6ba27bb5c96950c10c9/index.html';
function mount(){
  let root=document.getElementById('pp-galaxian-game');
  if(!root){
    const host=document.querySelector('.oPos.nobr');
    if(host){root=document.createElement('div');root.id='pp-galaxian-game';host.appendChild(root);}
  }
  if(!root)return false;
  if(root.dataset.galaxianMounted==='redfox-galaxian-classic-v3')return true;
  root.dataset.galaxianMounted='redfox-galaxian-classic-v3';
  root.innerHTML='';
  root.style.cssText='width:100%;max-width:620px;margin:14px auto;line-height:normal;overflow:hidden;';
  const frame=document.createElement('iframe');
  frame.title='RED FOX — GALAXIAN CLASSIC';
  frame.setAttribute('allow','autoplay; fullscreen');
  frame.setAttribute('allowfullscreen','');
  frame.setAttribute('loading','eager');
  frame.style.cssText='display:block;width:100%;height:380px;border:2px solid #315c7c;border-radius:6px;background:#000;';
  frame.srcdoc='<!doctype html><html lang="ru"><meta charset="utf-8"><body style="margin:0;background:#000;color:#ff7f00;font:14px Arial;padding:20px">Загрузка GALAXIAN…</body></html>';
  root.appendChild(frame);
  fetch(GAME_URL,{mode:'cors',cache:'no-cache'})
    .then(response=>{if(!response.ok)throw new Error('HTTP '+response.status);return response.text();})
    .then(html=>{frame.srcdoc=html;})
    .catch(error=>{
      frame.srcdoc='<!doctype html><html lang="ru"><meta charset="utf-8"><body style="margin:0;background:#000;color:#fff;font:14px Arial;padding:20px">Не удалось загрузить GALAXIAN.<br><small>'+String(error.message).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))+'</small></body></html>';
    });
  return true;
}
function start(){
  if(mount())return;
  const observer=new MutationObserver(()=>{if(mount())observer.disconnect();});
  observer.observe(document.documentElement,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();