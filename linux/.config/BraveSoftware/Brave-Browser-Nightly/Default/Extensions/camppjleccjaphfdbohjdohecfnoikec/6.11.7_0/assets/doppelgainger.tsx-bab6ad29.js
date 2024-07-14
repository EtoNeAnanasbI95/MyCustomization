import{j as e,r as I,c as B,R as S,a as U}from"./client-45b27fd3.js";import{a as $,b as z,L as j,s as F,g as W,c as J}from"./index-825701e8.js";import{C as A}from"./index-24d5af66.js";import{a as V,A as _}from"./index-37dc4817.js";import{T}from"./themeContext-38ece4f9.js";import{c as P}from"./index-5c33a703.js";import{a as k,b as H,c as E}from"./index-9b1f0f42.js";import{u as G}from"./useUrlChange-a43c51a9.js";import"./i18n-697e4fe6.js";import{u as C}from"./useTranslation-c38a45bb.js";import{c as X}from"./createReactComponent-d14705e3.js";import{T as K,I as Q}from"./index-6199ef00.js";import{f as q}from"./analytics-46c41402.js";import{I as Y}from"./IconArrowUpRight-40f005f6.js";import{I as Z}from"./IconX-71686591.js";import{d as L}from"./debounce-c70d88e0.js";import"./hook-ae816606.js";import"./motion-2f15212b.js";var ee=X("external-link","IconExternalLink",[["path",{d:"M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",key:"svg-0"}],["path",{d:"M11 13l9 -9",key:"svg-1"}],["path",{d:"M15 4h5v5",key:"svg-2"}]]);const te=({twitterUsername:n})=>{const{t}=C();return e.jsx("div",{className:"gradient-animated group rounded-full p-[1px]",children:e.jsxs("a",{href:`${k.DOMAIN}/doppelgainger/${n}`,target:"_blank",rel:"noreferrer",className:"flex items-center gap-2 whitespace-nowrap rounded-full bg-white p-[10px] text-[15px] font-semibold leading-none text-slate-900 dark:bg-black dark:text-white",children:[e.jsx("span",{children:t("dope_ai.chat_with_ai")}),e.jsx(ee,{size:15})]})})},ne=({handleClick:n,loading:t})=>{const{t:r}=C(),{...o}=I.useContext(V);return!(o!=null&&o.isLoading)&&!(o!=null&&o.isAuthenticated)?e.jsx("button",{type:"button",className:"border-cornblue-400 ml-auto w-[240px] rounded-full border bg-white p-[10px] text-[15px] font-semibold leading-none text-slate-900 dark:bg-black dark:text-white",onClick:()=>window.open(H,"_blank"),children:r("dope_ai.login")}):t?e.jsxs("div",{className:"p-3 ml-auto bg-white border rounded-full dark:bg-black",children:[e.jsx("span",{className:"sr-only",children:r("load")}),e.jsxs("div",{className:"relative top-[2px] flex items-center justify-center space-x-2",children:[e.jsx("div",{className:"h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.037s] dark:bg-slate-600"}),e.jsx("div",{className:"h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.074s] dark:bg-slate-600"}),e.jsx("div",{className:"h-1.5 w-1.5 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.113s] dark:bg-slate-600"})]})]}):e.jsx("div",{className:"gradient-animated group rounded-full p-[1px]",children:e.jsxs("button",{type:"button",className:"whitespace-nowrap rounded-full bg-white p-[10px] text-[15px] font-semibold leading-none text-slate-900 dark:bg-black dark:text-white",onClick:()=>{n(),q({eventName:"CreateDoppelgainger",eventType:"Button",feature:"Doppelgainger",firedFromFile:"components/doppelgainger/createButton.tsx"})},children:[e.jsx("div",{className:"invisible group-hover:visible",children:e.jsx(K,{text:r("dope_ai.convert")})}),r("dope_ai.create")]})})},re="/assets/doppelgainger-banner-37b67acc.png",N=({handleClick:n,status:t})=>e.jsx("button",{type:"button",className:"ml-auto self-start text-white",onClick:()=>{n(),q({eventData:`ModalStatus:${t}`,eventName:"DoppelgaingerModalClose",eventType:"Button",feature:"Doppelgainger",firedFromFile:"components/doppelgainger/createButton.tsx"})},children:e.jsx(Z,{size:20})}),D=()=>e.jsx("div",{className:"flex max-w-xl items-center gap-4 rounded-2xl bg-zinc-800 p-2",children:e.jsx("img",{src:$(re),alt:"doppelgainger-in-personas",className:"rounded-xl"})}),oe=({abortRef:n,buildDoppelgainger:t,modalStatus:r,profileName:o,setModalStatus:s})=>{const{t:a}=C(),i=()=>s(null),m=()=>window.location.reload();return r?e.jsxs("div",{className:"fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-opacity-10 backdrop-blur-sm backdrop-filter ",children:[r==="CONFIRMATION"&&e.jsxs("div",{className:"flex gap-4 rounded-2xl bg-zinc-800/90 p-4",children:[e.jsx("div",{className:"rounded-lg bg-zinc-100/10 p-4 text-7xl",children:"⚙️"}),e.jsxs("div",{children:[e.jsxs("div",{className:"text-xl font-semibold text-zinc-100",children:[a("dope_ai.build_own")," ",e.jsx("span",{className:"bg-gradient-to-r from-pink-300 to-blue-100 bg-clip-text text-transparent",children:o})," ",a("ai")]}),e.jsx("div",{className:"mb-4 text-xs text-zinc-300",children:a("dope_ai.this_cost")}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("button",{type:"button",className:"bg-cornblue-600 hover:bg-cornblue-700 rounded px-6 py-2 text-sm text-white",onClick:()=>{t()},children:"Build Now"}),e.jsx("button",{type:"button",className:"rounded border px-6 py-2 text-sm text-white",onClick:i,children:a("dope_ai.quit")})]})]}),e.jsx(N,{status:"CONFIRMATION",handleClick:i})]}),r==="INPROGRESS"&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-4 rounded-2xl bg-zinc-800 p-4",children:[e.jsx("div",{className:"rounded-lg bg-zinc-700 p-5 text-6xl",children:(()=>{const l=["🦁","🐯","🐻","🐼","🦄","🐮","🐔"];return l[Math.floor(Math.random()*l.length)]})()}),e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-semibold text-zinc-100",children:a("dope_ai.creating_ur_ai")}),e.jsx("div",{className:"mb-4 text-sm text-rose-300",children:a("dope_ai.dont_change_tab")}),e.jsx("div",{className:"mt-4 h-3 w-full rounded-full bg-zinc-700",children:e.jsx("div",{className:"animate-progress-scraping h-3 w-10 rounded-full bg-blue-600"})})]}),e.jsx(N,{status:"INPROGRESS",handleClick:()=>{n.current=!0,i()}})]}),e.jsx(D,{})]}),r==="SUCCESS"&&e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-4 rounded-2xl bg-zinc-800 p-4",children:[e.jsx("div",{className:"rounded-lg bg-zinc-700 p-5 text-6xl",children:e.jsx("div",{className:"animate-bounce",children:"🎉"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-2xl font-semibold text-zinc-100",children:a("dope_ai.redirecting")}),e.jsx("div",{className:"mb-4 text-sm text-zinc-200",children:(()=>{const l=[a("dope_ai.just_a_moment"),"<name> is waiting for you on the other side","Get ready to meet AI <name>, any second now","Prepare for the grand unveiling of AI <name>","<name> AI is being trained, hold on tight"];return l[Math.floor(Math.random()*l.length)].replace("<name>",o)})()})]}),e.jsx(N,{status:"SUCCESS",handleClick:i})]}),e.jsx(D,{})]}),r==="INSUFFICIENT_DATA"&&e.jsxs("div",{className:"flex gap-4 rounded-2xl bg-zinc-800 p-4",children:[e.jsx("div",{className:"rounded-lg bg-zinc-700 p-4 text-7xl",children:"😢"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xl font-semibold text-zinc-100",children:a("dope_ai.aint_enough")}),e.jsxs("div",{className:"mb-6 text-xs text-zinc-300",children:[a("dope_ai.insufficient_tweets"),e.jsx("br",{}),a("dope_ai.try_another_profile")]}),e.jsxs("a",{className:"text-cornblue-500 flex text-sm underline",href:"https://twitter.com/iamsrk",children:[e.jsx("span",{children:"E.g. @iamsrk"})," ",e.jsx(Y,{size:14})]})]}),e.jsx(N,{status:"INSUFFICIENT_DATA",handleClick:i})]}),r==="ERROR"&&e.jsxs("div",{className:"flex gap-4 rounded-2xl bg-zinc-800 p-4",children:[e.jsx("div",{className:"rounded-lg bg-zinc-700 p-4 text-7xl",children:"❗️"}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xl font-semibold text-zinc-100",children:a("dope_ai.something_wrong")}),e.jsx("div",{className:"mb-6 text-xs text-zinc-200",children:a("dope_ai.try_later")}),e.jsxs("button",{type:"button",className:"bg-cornblue-600 flex items-center gap-2 rounded px-6 py-2 text-sm text-white",onClick:m,children:[e.jsx(Q,{size:14})," ",a("dope_ai.retry")]})]}),e.jsx(N,{status:"ERROR",handleClick:i})]})]}):null},se=()=>new Promise(n=>{const t=new MutationObserver(L(()=>{var o,s;const r=((o=document.querySelector('[data-testid="placementTracking"]'))==null?void 0:o.parentElement)||((s=document.querySelector('[data-testid="editProfileButton"]'))==null?void 0:s.parentElement);r&&(n(r),t.disconnect())},300));t.observe(document.body,{childList:!0,subtree:!0})});async function ae(n){let t=await chrome.storage.local.get("authDetails");t=JSON.parse(t.authDetails);const r=t.token;try{const o=await fetch(`${E.DOMAIN}/doppelgainger/status/${n}?customJWT=true`,{headers:{Authorization:`Bearer ${r}`,"x-merlin-version":`extension-${await j.get("extVersion")}`},method:"PUT"});if(!o.ok)throw new Error;return(await o.json()).data}catch(o){return console.error(o),null}}const R=async n=>{const t=await z("doppelgaingers"),s=[...(t==null?void 0:t.data)||[],{...n,type:"doppelgainger"}].filter((a,i,m)=>m.findIndex(l=>l.id===a.id)===i);await F("doppelgaingers",s,60*24)},ie=async n=>{const t=await z("doppelgaingers"),r=(t==null?void 0:t.data)||[];return r.some(s=>s.id===n)||r.some(s=>s.userName===`@${n}`)},O=(n=["home","explore","notifications","messages","bookmarks","lists","profile","more","i","communities","settings","photo","compose","search"])=>{if(!window.location.href.includes("twitter.com")&&!window.location.href.includes("x.com"))return!1;const t=window.location.pathname.split("/").filter(Boolean);if(t.length===1){const r=t[0].replace(/[@\s]/g,"").toLowerCase();return!n.includes(r)}return!1},le=()=>{const t=window.location.href.split("/");return t[t.length-1]},ce=()=>{try{const t=document.querySelector('[data-testid="UserName"]').querySelector('div[dir="ltr"]');return t==null?void 0:t.textContent}catch{return null}},de=()=>{var n,t,r,o;try{const s=document.querySelector('[aria-label="Profile"]'),a=document.querySelector('[data-testid="UserName"]'),[i,m]=a.querySelectorAll('div[dir="ltr"]'),l=document.querySelector('[data-testid="UserDescription"]'),d=document.querySelector('[data-testid="UserProfileHeader_Items"]'),x=(n=document.querySelector('img[src^="https://pbs.twimg.com/profile_banners/"]'))==null?void 0:n.getAttribute("src"),u=(t=s==null?void 0:s.getAttribute("href"))==null?void 0:t.slice(1),h=i.textContent,b=m.textContent,g=l==null?void 0:l.textContent,c=window.location.href.split("?")[0],f=d?Array.from(d.childNodes).map(w=>w.textContent).join(" ").replace(/\s{2,}/g," "):null;let p=((o=(r=document.querySelector('[aria-label="Opens profile photo"]'))==null?void 0:r.querySelector("img"))==null?void 0:o.getAttribute("src"))||"https://cdn.jsdelivr.net/gh/foyer-work/cdn-files/placeholder.svg";return(p!=null&&p.endsWith("_normal.jpg")||p!=null&&p.endsWith("_normal.png"))&&(p=p.replace("_normal.","_400x400.")),{avatar:p,banner:x,bio:g,headerItems:f,name:h,self:u,url:c,userName:b}}catch{return null}},pe=n=>new Promise(t=>setTimeout(t,n)),me=async(n,t=90)=>{const a=new Set;let i=0,m=0;for(let l=0;l<t&&!n.current;l++){document.documentElement.scrollTo(0,document.documentElement.scrollTop+window.innerHeight+100),await pe(500);const d=document.documentElement.scrollTop;if(d===m?i++:i=0,i>=10)break;m=d,document.querySelectorAll('[data-testid="tweet"]').forEach(u=>{var h;try{if(u.querySelector('div[class="css-175oi2r r-1habvwh r-1wbh5a2 r-1777fci"]'))return;const g=u.querySelector("time"),c=g&&(g==null?void 0:g.getAttribute("datetime")),f=g&&((h=g.parentElement)==null?void 0:h.getAttribute("href")),p=u.querySelectorAll('[data-testid="tweetText"]'),w=p.length>0&&p[0];if(!g||!w)return;let v="";w.childNodes.forEach(y=>{v+=y instanceof HTMLImageElement?(y==null?void 0:y.alt)||"":y.textContent||""}),v&&f&&c&&a.add(JSON.stringify({text:v,time:c,url:f}))}catch{}})}return Array.from(a).map(l=>JSON.parse(l))};async function ue(n,t){const r=(await j.get("authDetails")).token,o=await j.get("extVersion"),s=await fetch(`${E.DOMAIN}/doppelgainger/build?customJWT=true`,{body:JSON.stringify({profileDetails:n,tweets:Array.from(t)}),headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json","x-merlin-version":`extension-${o}`},method:"POST"});if(!s.ok)throw new Error;return await s.json()}async function ge(n,t){const o=new URLSearchParams(window.location.search).get("doppelgaingerID"),s=(await j.get("authDetails")).token,a=await j.get("extVersion"),i=await fetch(`${E.DOMAIN}/doppelgainger/v2/build?customJWT=true`,{body:JSON.stringify({doppelgaingerId:o,profileDetails:n,tweets:Array.from(t)}),headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json","x-merlin-version":`extension-${a}`},method:"POST"});if(!i.ok)throw new Error;return await i.json()}function xe(){if(document.getElementById("merlin-modal"))return;const n=document.createElement("merlin-component");n.id="merlin-modal",n.className="merlin modal";const t=n.attachShadow({mode:"open"}),r=document.createElement("style");r.textContent=`${P}
		:host(.merlin .modal) {
		all: initial; /* 1st rule so subsequent properties are reset. */
		position: relative;
		display: block;
		margin: 0;
		padding: 0;
		align-self : start;
		box-sizing: border-box;
		z-index: 1000;
		}
		. modal {
		all: initial; /* 1st rule so subsequent properties are reset. */
		position: relative;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		}
		. modal ::-webkit-scrollbar {
		display: none;
		-ms-overflow-style: none;
		scrollbar-width: none;
		}
		`;const o=document.createElement("div");o.id="modalRoot",o.className="reactAppRoot modal-root",t==null||t.appendChild(r),t==null||t.appendChild(o),document.documentElement.prepend(n)}function he(){const[n,t]=S.useState(null),[r,o]=S.useState(!1),[s,a]=S.useState(!1),i=S.useRef(!1),d=!!new URLSearchParams(window.location.search).get("doppelgaingerID"),x=le();let u=null;const h=async()=>{t("INPROGRESS");try{const c=de();if(!c)throw new Error;const f=await me(i,d?120:90);if(i.current)return i.current=!1,t(null);if(f.length<20)return t("INSUFFICIENT_DATA");u=setTimeout(()=>{t("SUCCESS")},12e3);const p=d?await ge(c,f):await ue(c,f),{data:w,status:v}=p;d?window.open(`${k.DOMAIN}/bio`):(window.open(`${k.DOMAIN}/doppelgainger/${x}`),o(!0),R(w.doppelgainger)),t(null)}catch(c){u&&clearTimeout(u),t("ERROR"),i.current=!1,console.error(c)}finally{document.documentElement.scrollTo(0,0)}};async function b(){a(!0);try{const c=await ae(x);c?(o(!0),J(`${k.DOMAIN}/doppelgainger/${x}`),R(c)):(xe(),t("CONFIRMATION"))}catch(c){console.error(c)}finally{a(!1)}}const g=G();return I.useEffect(()=>{t(null)},[g]),I.useEffect(()=>{new URLSearchParams(window.location.search).get("triggerDoppelgainger")&&b()},[]),I.useEffect(()=>{(async()=>{const c=await ie(x);o(c)})()},[]),r?e.jsx(A,{children:e.jsx(_,{children:e.jsx(T,{websiteOverride:!0,children:e.jsx(te,{twitterUsername:x})})})}):e.jsx(A,{children:e.jsx(_,{children:e.jsxs(T,{websiteOverride:!0,children:[n&&U.createPortal(e.jsx(oe,{profileName:ce(),buildDoppelgainger:h,modalStatus:n,setModalStatus:t,abortRef:i}),document.getElementById("merlin-modal").shadowRoot.getElementById("modalRoot")),e.jsx(ne,{loading:!!n||s,handleClick:b})]})})})}const M=async n=>{const t=document.createElement("merlin-component");t.id="merlin-doppelgainger",t.className="merlin doppelgainger";const r=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=`${P}
    :host(.merlin.doppelgainger) {
      all: initial; /* 1st rule so subsequent properties are reset. */
      position: absolute;
      display: block;
      right:0;
      top: 100%;
      margin: 0;
      padding: 0;
      align-self : start;
      box-sizing: border-box;
      z-index: 1000;
    }
    .doppelgainger {
      all: initial; /* 1st rule so subsequent properties are reset. */
      position: relative;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .doppelgainger ::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    `,r==null||r.appendChild(o);const s=document.createElement("div");s.id="reactAppRoot",s.className="reactAppRoot doppelgainger",r==null||r.appendChild(s),n==null||n.appendChild(t),B(s).render(e.jsx(he,{}))},fe=async()=>{var a,i,m,l;const n=await W();if(!((i=(a=n==null?void 0:n.misc)==null?void 0:a.doppelgainger)!=null&&i.v2Visible))return;const t=(l=(m=n==null?void 0:n.misc)==null?void 0:m.doppelgainger)==null?void 0:l.blacklistedSlugs,r=await se();if(r&&!r.querySelector("merlin-component")){if(!O(t))return;M(r)}const o=new MutationObserver(L(()=>{var u,h;const d=((u=document.querySelector('[data-testid="placementTracking"]'))==null?void 0:u.parentElement)||((h=document.querySelector('[data-testid="editProfileButton"]'))==null?void 0:h.parentElement),x=document.querySelector(".merlin.modal");if(!(d!=null&&d.querySelector("merlin-component"))&&!x){if(!O(t))return;M(d)}},300)),s={childList:!0,subtree:!0};o.observe(document.body,s)};fe();
