import{c as d,j as a}from"./client-45b27fd3.js";import{g as u,i as l}from"./index-825701e8.js";import{C as p}from"./index-f4f95d06.js";import{u as b}from"./index-e5678ee4.js";import{C as f}from"./index-24d5af66.js";import{c as h}from"./index-5c33a703.js";import"./index-9b1f0f42.js";import"./index-203ce83a.js";import"./foyerLogo-7f07d1ff.js";import"./analytics-46c41402.js";import"./useTranslation-c38a45bb.js";import"./index-39fb8d8a.js";import"./motion-2f15212b.js";import"./IconPower-207bf3f9.js";import"./createReactComponent-d14705e3.js";import"./hook-ae816606.js";const x=t=>{let r="";const e=new MutationObserver(()=>{location.href!==r&&(r=location.href,t())}),i={childList:!0,subtree:!0};e.observe(document.body,i)};function S({code:t}){const{blackList:r,codeSummarizer:e}=b();if(e&&!r.includes(window.location.hostname))return a.jsx(f,{children:a.jsx(p,{code:t})})}const g=async()=>{if(document.getElementById("merlin-code-summarizer"))return;const t=await u();if(t&&(!t.misc.codeSummarizer.visible||t.misc.codeSummarizer.blackListedDomains.includes(window.location.hostname)))return;const r=()=>{if(document.body){const e=new MutationObserver(l(()=>{var n,s;const i=document.querySelectorAll("#read-only-cursor-text-area"),o=document.querySelectorAll(".Box-sc-g0xbh4-0.kSGBPx.react-blob-header-edit-and-raw-actions")[0];if(i.length>0)for(let m=0;m<i.length;m++)((n=o==null?void 0:o.previousElementSibling)==null?void 0:n.id)==="merlin-code-summarizer"&&((s=o==null?void 0:o.previousElementSibling)==null||s.remove()),w(c=>{o.insertAdjacentElement("beforebegin",c)},i[m].textContent);e.disconnect()},50));e.observe(document.body,{attributes:!0,childList:!0,subtree:!0})}};r(),x(()=>{r()})},w=async(t,r)=>{const e=document.createElement("merlin-component");e.id="merlin-code-summarizer",e.className="merlin-code-summarizer";const i=e.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=`${h}
:host(#merlin-code-summarizer) {
    all: initial; /* 1st rule so subsequent properties are reset. */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.reactAppRoot{
    z-index: 1 !important;
}
`;const n=document.createElement("div");n.id="reactAppRoot",n.className="reactAppRoot",i.appendChild(o),i.appendChild(n),t(e),d(n).render(a.jsx(S,{code:r}))};g();
