import{R as m,r as h,j as s}from"./client-45b27fd3.js";import{c as x,g}from"./index-825701e8.js";import{f}from"./analytics-46c41402.js";import{c as u}from"./utils-01642ffa.js";import{u as p}from"./useTranslation-c38a45bb.js";import{m as E}from"./motion-2f15212b.js";function b(e){const a=e.reduce((r,o)=>r+o.weight,0),i=Math.random()*a;let t=0;for(let r=0;r<e.length;r++)if(t+=e[r].weight,i<=t)return e[r];return e.reduce((r,o)=>r.weight>o.weight?r:o)}const S=({feature:e,fileName:a})=>{const{t:i}=p(),[t,l]=m.useState(null),[r,o]=m.useState([]);return h.useEffect(()=>{async function d(){try{const n=(await g()).globalInfoBanner;if(!(n!=null&&n.items.length)||!(n!=null&&n.mountOn.length))return;o(n.mountOn),l(b(n.items))}catch(c){console.error(c)}}d()},[]),!r.includes(e)||!t?null:s.jsx(E.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1,transition:{delay:.6,duration:.3}},onClick:()=>{t!=null&&t.url&&x(t==null?void 0:t.url),f({eventData:"GlobalInfoBanner",eventName:"OpenPage",eventType:"Button",feature:e,firedFromFile:a})},className:u(" relative w-full cursor-pointer rounded-b-lg text-center text-sm text-amber-600 dark:text-amber-500",e==="SERP"?"mt-3 bg-[#7C3AED] hover:bg-[#7C3AED]":"bg-cornblue-100 dark:bg-cornblue-900"),children:s.jsx("div",{className:"cursor-pointer text-sm text-amber-600 dark:text-amber-500",children:s.jsx("div",{className:"cursor-pointer px-4 py-3 text-sm text-amber-600 dark:text-amber-500",children:s.jsxs("div",{children:[e!=="SERP"?`✨ ${i("new")}`:"🎉",t.html?s.jsx("span",{className:"plain-text-color ml-2",dangerouslySetInnerHTML:{__html:t.html}}):s.jsx("span",{className:u(" ml-2",e==="SERP"?"text-white":"text-foreground"),children:t==null?void 0:t.text}),e!=="SERP"&&"✨"]})})})})};export{S as G};
