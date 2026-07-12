import{R as E,r as d,j as o,$ as g}from"./client-45b27fd3.js";import{T as x}from"./themeContext-38ece4f9.js";import{c as b}from"./index-5c33a703.js";import{f as y}from"./index-9b1f0f42.js";import{i as R}from"./index-825701e8.js";async function v(e){return new Promise(c=>{const r=document.querySelector(e);r?c(r):new MutationObserver(R((p,l)=>{const t=document.querySelector(e);t&&(l.disconnect(),c(t))},50)).observe(document,{childList:!0,subtree:!0})})}const w=e=>{const{children:c,groupBy:r,selector:s,shouldMount:p,zIndex:l}=e,t=d.useRef(null),u=d.useRef(null);return d.useEffect(()=>{if(document.getElementById(e.id))return;(async()=>{if(typeof s=="string"){const n=await v(s);t.current=n}else if(s.mountAsHtmlChild){const n=document.documentElement;t.current=n}if(t.current){if(r){const i=t.current.querySelector("."+r);if(i)t.current=i;else{const m=document.createElement("merlin-component-"+r);m.className=r,t.current.prepend(m),t.current=m}}const n=document.createElement("merlin-component");n.id=e.id,n.className=e.className;const f=n.attachShadow({mode:"open"}),h=document.createElement("style");h.textContent=`${b}
          :host(#preview-link) {
          }
          .reactAppRoot {
            all: initial; /* 1st rule so subsequent properties are reset. */
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            position: relative;
            z-index: ${l??2147483640};
          }          
          `;const a=document.createElement("div");a.id="reactAppRoot",a.className="reactAppRoot "+(e.theme&&e.theme==="dark"?"dark":""),y.forEach(i=>{a.addEventListener(i,m=>{m.stopPropagation()})}),f.appendChild(h),f.appendChild(a),t.current.prepend(n),u.current=a}})()},[s]),o.jsx(o.Fragment,{children:p&&u.current?g.createPortal(o.jsx(o.Fragment,{children:e.theme?o.jsx(o.Fragment,{children:c}):o.jsx(x,{websiteOverride:e.websiteOverride||!1,children:c})}),u.current):null})},j=E.memo(w);export{j as P};
