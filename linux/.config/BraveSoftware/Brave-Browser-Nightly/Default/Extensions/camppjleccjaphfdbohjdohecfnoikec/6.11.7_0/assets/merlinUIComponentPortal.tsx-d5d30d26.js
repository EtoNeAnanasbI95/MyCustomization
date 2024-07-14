import{c as m,j as e}from"./client-45b27fd3.js";import{T as i}from"./themeContext-38ece4f9.js";/* empty css             */import{c}from"./index-5c33a703.js";import{f as d}from"./index-9b1f0f42.js";import"./hook-ae816606.js";const l=async()=>{if(document.getElementById("merlin-uicomponentportal"))return;const o=document.createElement("merlin-component");o.id="merlin-uicomponentportal",o.className="merlin merlin-uicomponentportal";const r=o.attachShadow({mode:"open"}),n=document.createElement("style");n.textContent=`${c}
    :host(#merlin-uicomponentportal) {
    }   
    .reactAppRoot {
      all: initial; /* 1st rule so subsequent properties are reset. */
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2147483650;
    }
    `.replaceAll(":root",":host");const t=document.createElement("div");t.id="reactAppRoot",t.className="reactAppRoot",d.forEach(a=>{t.addEventListener(a,s=>{s.stopPropagation()})}),r.appendChild(n),r.appendChild(t);const p=m(t);document.documentElement.append(o),p.render(e.jsxs(e.Fragment,{children:[e.jsx(i,{children:e.jsx("div",{id:"reactAppRootWithTheme"})}),e.jsx(i,{websiteOverride:!0,children:e.jsx("div",{id:"reactAppRootWithWebsiteOverrideTheme"})})]}))};l();
