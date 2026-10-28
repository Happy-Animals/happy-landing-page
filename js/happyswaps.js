
(()=>{
"use strict";
const sections=[...document.querySelectorAll("main > section.screen")];
const navDots=[...document.querySelectorAll("[data-goto]")];
const arrow=document.getElementById("deckArrow");
const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
const desktop=window.matchMedia("(pointer:fine) and (min-width:761px)");
let active=0,locked=false,wheelTotal=0,wheelTime=0,unlockTimer=null,scrollFrame=0;
const clamp=n=>Math.max(0,Math.min(n,sections.length-1));
function nearest(){let best=0,dist=Infinity;sections.forEach((section,i)=>{const d=Math.abs(section.getBoundingClientRect().top);if(d<dist){dist=d;best=i;}});return best;}
function paint(i){active=clamp(i);document.body.classList.toggle("past-intro",active>0);const last=active===sections.length-1;
arrow.textContent=last?"↑":"↓";arrow.classList.toggle("is-last",last);
arrow.setAttribute("aria-label",last?"Back to first section":"Next section");
arrow.title=arrow.getAttribute("aria-label");
navDots.forEach((dot,j)=>dot.setAttribute("aria-current",String(j===active)));
}
function go(i){const target=clamp(i);paint(target);sections[target].scrollIntoView({behavior:motion.matches?"auto":"smooth",block:"start"});}
function step(d){const i=nearest();if(i===sections.length-1&&d>0)return;go(i+d);}
arrow.addEventListener("click",()=>{if(nearest()===sections.length-1)go(0);else step(1);});
navDots.forEach(dot=>dot.addEventListener("click",()=>go(sections.findIndex(s=>s.id===dot.dataset.goto))));
window.addEventListener("scroll",()=>{if(scrollFrame)return;scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;paint(nearest());});},{passive:true});
window.addEventListener("wheel",event=>{
 if(!desktop.matches||event.ctrlKey||event.defaultPrevented)return;
 if(event.target.closest("select,textarea,input,[data-native-scroll]"))return;
 event.preventDefault();
 if(locked)return;
 const now=performance.now();
 if(now-wheelTime>180)wheelTotal=0;
 wheelTime=now;
 wheelTotal+=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?window.innerHeight:1);
 if(Math.abs(wheelTotal)<38)return;
 locked=true;const direction=wheelTotal>0?1:-1;wheelTotal=0;
 step(direction);
 clearTimeout(unlockTimer);unlockTimer=setTimeout(()=>{locked=false;},740);
},{passive:false});
document.addEventListener("keydown",event=>{
 const t=event.target;
 if(event.altKey||event.ctrlKey||event.metaKey||t.closest("button,a,input,textarea,select,[contenteditable]"))return;
 let direction=0;
 if(["PageDown","ArrowDown"," "].includes(event.key))direction=1;
 if(["PageUp","ArrowUp"].includes(event.key))direction=-1;
 if(event.key==="Home"){event.preventDefault();go(0);return;}
 if(event.key==="End"){event.preventDefault();go(sections.length-1);return;}
 if(direction){event.preventDefault();step(direction);}
});
window.addEventListener("hashchange",()=>{const index=sections.findIndex(s=>"#"+s.id===location.hash);if(index>=0)paint(index);});

/* One-card swipes on touch screens; tall sections retain native scrolling. */
let swipe=null;
window.addEventListener("touchstart",event=>{
 if(event.touches.length!==1){swipe=null;return;}
 if(event.target.closest("a,button,select,input,textarea,[contenteditable],[data-native-scroll]")){swipe=null;return;}
 const index=nearest(),section=sections[index];
 if(!section||section.getBoundingClientRect().height>window.innerHeight+2){swipe=null;return;}
 swipe={x:event.touches[0].clientX,y:event.touches[0].clientY,index};
},{passive:true});
window.addEventListener("touchmove",event=>{
 if(!swipe)return;
 if(event.touches.length!==1){swipe=null;return;}
 const dx=event.touches[0].clientX-swipe.x,dy=event.touches[0].clientY-swipe.y;
 if(Math.abs(dy)>12&&Math.abs(dy)>Math.abs(dx)&&event.cancelable)event.preventDefault();
},{passive:false});
window.addEventListener("touchend",event=>{
 const start=swipe;swipe=null;
 if(!start||event.changedTouches.length!==1)return;
 const dx=event.changedTouches[0].clientX-start.x,dy=event.changedTouches[0].clientY-start.y;
 if(Math.abs(dy)>=45&&Math.abs(dy)>Math.abs(dx))go(start.index+(dy<0?1:-1));
 else go(start.index);
},{passive:true});
window.addEventListener("touchcancel",()=>{swipe=null;},{passive:true});

paint(nearest());
})();
