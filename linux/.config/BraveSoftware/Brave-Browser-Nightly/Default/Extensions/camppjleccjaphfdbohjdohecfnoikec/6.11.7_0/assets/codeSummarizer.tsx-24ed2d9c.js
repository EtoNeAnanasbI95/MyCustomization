import{c as u,j as a}from"./client-45b27fd3.js";import{g as l,i as b}from"./index-825701e8.js";import{C as f}from"./index-f4f95d06.js";import{u as h}from"./index-e5678ee4.js";import{C as g}from"./index-24d5af66.js";import{c as v}from"./index-5c33a703.js";import"./index-9b1f0f42.js";import"./index-203ce83a.js";import"./foyerLogo-7f07d1ff.js";import"./analytics-46c41402.js";import"./useTranslation-c38a45bb.js";import"./index-39fb8d8a.js";import"./motion-2f15212b.js";import"./IconPower-207bf3f9.js";import"./createReactComponent-d14705e3.js";import"./hook-ae816606.js";const d=o=>{let t="";const r=new MutationObserver(()=>{location.href!==t&&(t=location.href,o())}),e={childList:!0,subtree:!0};r.observe(document.body,e)};function w({code:o}){const{blackList:t,codeSummarizer:r}=h();if(r&&!t.includes(window.location.hostname))return a.jsx(g,{children:a.jsx(f,{code:o})})}const x=async()=>{const o=await l();if(o&&(!o.misc.codeSummarizer.visible||o.misc.codeSummarizer.blackListedDomains.includes(window.location.hostname)))return;const t=()=>{document.body&&new MutationObserver(b(()=>{var s,i,m,c;const e=document.querySelectorAll("code");if(e.length>0)for(let n=0;n<e.length;n++)(!((i=(s=e[n])==null?void 0:s.previousElementSibling)!=null&&i.id)||((c=(m=e[n])==null?void 0:m.previousElementSibling)==null?void 0:c.id)!=="merlin-code-summarizer")&&e[n].offsetHeight>100&&z(p=>{e[n].insertAdjacentElement("beforebegin",p)},e[n].outerText)},50)).observe(document.body,{attributes:!0,childList:!0,subtree:!0})};t(),d(()=>{t()})},z=async(o,t)=>{const r=document.createElement("merlin-component");r.id="merlin-code-summarizer",r.className="merlin-code-summarizer";const e=r.attachShadow({mode:"open"}),s=document.createElement("style");s.textContent=`${v}
:host(#merlin-code-summarizer) {
    all: initial; /* 1st rule so subsequent properties are reset. */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.reactAppRoot{
    z-index: 1 !important;
}
`;const i=document.createElement("div");i.id="reactAppRoot",i.className="reactAppRoot",e.appendChild(s),e.appendChild(i),o(r);const m=u(i);d(()=>{m.render(a.jsx(w,{code:t}))})};x();
