var bt=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)};var i=(e,t,s)=>(bt(e,t,"read from private field"),s?s.call(e):t.get(e)),p=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},l=(e,t,s,r)=>(bt(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s);var ft=(e,t,s,r)=>({set _(n){l(e,t,n,s)},get _(){return i(e,t,r)}}),T=(e,t,s)=>(bt(e,t,"access private method"),s);import{D as Ot,L as R,M as mt}from"./index-825701e8.js";import{c as S,Q as Et,z as Wt}from"./index-9b1f0f42.js";var wt=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},vt=typeof window>"u"||"Deno"in globalThis;function j(){}function Xt(e,t){return typeof e=="function"?e(t):e}function Yt(e){return typeof e=="number"&&e>=0&&e!==1/0}function Zt(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Dt(e,t){return typeof e=="function"?e(t):e}function Ft(e,t){const{type:s="all",exact:r,fetchStatus:n,predicate:a,queryKey:o,stale:u}=e;if(o){if(r){if(t.queryHash!==Ct(o,t.options))return!1}else if(!ht(t.queryKey,o))return!1}if(s!=="all"){const c=t.isActive();if(s==="active"&&!c||s==="inactive"&&c)return!1}return!(typeof u=="boolean"&&t.isStale()!==u||n&&n!==t.state.fetchStatus||a&&!a(t))}function xt(e,t){const{exact:s,status:r,predicate:n,mutationKey:a}=e;if(a){if(!t.options.mutationKey)return!1;if(s){if(ct(t.options.mutationKey)!==ct(a))return!1}else if(!ht(t.options.mutationKey,a))return!1}return!(r&&t.state.status!==r||n&&!n(t))}function Ct(e,t){return((t==null?void 0:t.queryKeyHashFn)||ct)(e)}function ct(e){return JSON.stringify(e,(t,s)=>Pt(s)?Object.keys(s).sort().reduce((r,n)=>(r[n]=s[n],r),{}):s)}function ht(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?!Object.keys(t).some(s=>!ht(e[s],t[s])):!1}function Ut(e,t){if(e===t)return e;const s=Mt(e)&&Mt(t);if(s||Pt(e)&&Pt(t)){const r=s?e:Object.keys(e),n=r.length,a=s?t:Object.keys(t),o=a.length,u=s?[]:{};let c=0;for(let y=0;y<o;y++){const f=s?y:a[y];(!s&&r.includes(f)||s)&&e[f]===void 0&&t[f]===void 0?(u[f]=void 0,c++):(u[f]=Ut(e[f],t[f]),u[f]===e[f]&&e[f]!==void 0&&c++)}return n===o&&c===n?e:u}return t}function Pe(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}function Mt(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function Pt(e){if(!It(e))return!1;const t=e.constructor;if(t===void 0)return!0;const s=t.prototype;return!(!It(s)||!s.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function It(e){return Object.prototype.toString.call(e)==="[object Object]"}function te(e){return new Promise(t=>{setTimeout(t,e)})}function ee(e,t,s){return typeof s.structuralSharing=="function"?s.structuralSharing(e,t):s.structuralSharing!==!1?Ut(e,t):t}function se(e,t,s=0){const r=[...e,t];return s&&r.length>s?r.slice(1):r}function re(e,t,s=0){const r=[t,...e];return s&&r.length>s?r.slice(0,-1):r}var _t=Symbol(),Ht=(e,t)=>!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===_t?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn,G,H,tt,Rt,ne=(Rt=class extends wt{constructor(){super();p(this,G,void 0);p(this,H,void 0);p(this,tt,void 0);l(this,tt,t=>{if(!vt&&window.addEventListener){const s=()=>t();return window.addEventListener("visibilitychange",s,!1),()=>{window.removeEventListener("visibilitychange",s)}}})}onSubscribe(){i(this,H)||this.setEventListener(i(this,tt))}onUnsubscribe(){var t;this.hasListeners()||((t=i(this,H))==null||t.call(this),l(this,H,void 0))}setEventListener(t){var s;l(this,tt,t),(s=i(this,H))==null||s.call(this),l(this,H,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){i(this,G)!==t&&(l(this,G,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(s=>{s(t)})}isFocused(){var t;return typeof i(this,G)=="boolean"?i(this,G):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},G=new WeakMap,H=new WeakMap,tt=new WeakMap,Rt),Lt=new ne,et,L,st,jt,ie=(jt=class extends wt{constructor(){super();p(this,et,!0);p(this,L,void 0);p(this,st,void 0);l(this,st,t=>{if(!vt&&window.addEventListener){const s=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",s,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",r)}}})}onSubscribe(){i(this,L)||this.setEventListener(i(this,st))}onUnsubscribe(){var t;this.hasListeners()||((t=i(this,L))==null||t.call(this),l(this,L,void 0))}setEventListener(t){var s;l(this,st,t),(s=i(this,L))==null||s.call(this),l(this,L,t(this.setOnline.bind(this)))}setOnline(t){i(this,et)!==t&&(l(this,et,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return i(this,et)}},et=new WeakMap,L=new WeakMap,st=new WeakMap,jt),pt=new ie;function ae(e){return Math.min(1e3*2**e,3e4)}function Vt(e){return(e??"online")==="online"?pt.isOnline():!0}var kt=class{constructor(e){this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function St(e){return e instanceof kt}function Bt(e){let t=!1,s=0,r=!1,n,a,o;const u=new Promise((w,b)=>{a=w,o=b}),c=w=>{var b;r||(C(new kt(w)),(b=e.abort)==null||b.call(e))},y=()=>{t=!0},f=()=>{t=!1},d=()=>Lt.isFocused()&&(e.networkMode==="always"||pt.isOnline())&&e.canRun(),h=()=>Vt(e.networkMode)&&e.canRun(),m=w=>{var b;r||(r=!0,(b=e.onSuccess)==null||b.call(e,w),n==null||n(),a(w))},C=w=>{var b;r||(r=!0,(b=e.onError)==null||b.call(e,w),n==null||n(),o(w))},F=()=>new Promise(w=>{var b;n=v=>{(r||d())&&w(v)},(b=e.onPause)==null||b.call(e)}).then(()=>{var w;n=void 0,r||(w=e.onContinue)==null||w.call(e)}),K=()=>{if(r)return;let w;const b=s===0?e.initialPromise:void 0;try{w=b??e.fn()}catch(v){w=Promise.reject(v)}Promise.resolve(w).then(m).catch(v=>{var O;if(r)return;const P=e.retry??(vt?0:3),x=e.retryDelay??ae,J=typeof x=="function"?x(s,v):x,Z=P===!0||typeof P=="number"&&s<P||typeof P=="function"&&P(s,v);if(t||!Z){C(v);return}s++,(O=e.onFail)==null||O.call(e,s,v),te(J).then(()=>d()?void 0:F()).then(()=>{t?C(v):K()})})};return{promise:u,cancel:c,continue:()=>(n==null||n(),u),cancelRetry:y,continueRetry:f,canStart:h,start:()=>(h()?K():F().then(K),u)}}function oe(){let e=[],t=0,s=h=>{h()},r=h=>{h()},n=h=>setTimeout(h,0);const a=h=>{n=h},o=h=>{let m;t++;try{m=h()}finally{t--,t||y()}return m},u=h=>{t?e.push(h):n(()=>{s(h)})},c=h=>(...m)=>{u(()=>{h(...m)})},y=()=>{const h=e;e=[],h.length&&n(()=>{r(()=>{h.forEach(m=>{s(m)})})})};return{batch:o,batchCalls:c,schedule:u,setNotifyFunction:h=>{s=h},setBatchNotifyFunction:h=>{r=h},setScheduler:a}}var D=oe(),W,Nt,zt=(Nt=class{constructor(){p(this,W,void 0)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),Yt(this.gcTime)&&l(this,W,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(vt?1/0:5*60*1e3))}clearGcTimeout(){i(this,W)&&(clearTimeout(i(this,W)),l(this,W,void 0))}},W=new WeakMap,Nt),rt,nt,I,A,lt,X,N,U,qt,ue=(qt=class extends zt{constructor(t){super();p(this,N);p(this,rt,void 0);p(this,nt,void 0);p(this,I,void 0);p(this,A,void 0);p(this,lt,void 0);p(this,X,void 0);l(this,X,!1),l(this,lt,t.defaultOptions),this.setOptions(t.options),this.observers=[],l(this,I,t.cache),this.queryKey=t.queryKey,this.queryHash=t.queryHash,l(this,rt,t.state||he(this.options)),this.state=i(this,rt),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=i(this,A))==null?void 0:t.promise}setOptions(t){this.options={...i(this,lt),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&i(this,I).remove(this)}setData(t,s){const r=ee(this.state.data,t,this.options);return T(this,N,U).call(this,{data:r,type:"success",dataUpdatedAt:s==null?void 0:s.updatedAt,manual:s==null?void 0:s.manual}),r}setState(t,s){T(this,N,U).call(this,{type:"setState",state:t,setStateOptions:s})}cancel(t){var r,n;const s=(r=i(this,A))==null?void 0:r.promise;return(n=i(this,A))==null||n.cancel(t),s?s.then(j).catch(j):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(i(this,rt))}isActive(){return this.observers.some(t=>t.options.enabled!==!1)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!Zt(this.state.dataUpdatedAt,t)}onFocus(){var s;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(s=i(this,A))==null||s.continue()}onOnline(){var s;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(s=i(this,A))==null||s.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),i(this,I).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(s=>s!==t),this.observers.length||(i(this,A)&&(i(this,X)?i(this,A).cancel({revert:!0}):i(this,A).cancelRetry()),this.scheduleGc()),i(this,I).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||T(this,N,U).call(this,{type:"invalidate"})}fetch(t,s){var c,y,f;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(s!=null&&s.cancelRefetch))this.cancel({silent:!0});else if(i(this,A))return i(this,A).continueRetry(),i(this,A).promise}if(t&&this.setOptions(t),!this.options.queryFn){const d=this.observers.find(h=>h.options.queryFn);d&&this.setOptions(d.options)}const r=new AbortController,n=d=>{Object.defineProperty(d,"signal",{enumerable:!0,get:()=>(l(this,X,!0),r.signal)})},a=()=>{const d=Ht(this.options,s),h={queryKey:this.queryKey,meta:this.meta};return n(h),l(this,X,!1),this.options.persister?this.options.persister(d,h,this):d(h)},o={fetchOptions:s,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:a};n(o),(c=this.options.behavior)==null||c.onFetch(o,this),l(this,nt,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((y=o.fetchOptions)==null?void 0:y.meta))&&T(this,N,U).call(this,{type:"fetch",meta:(f=o.fetchOptions)==null?void 0:f.meta});const u=d=>{var h,m,C,F;St(d)&&d.silent||T(this,N,U).call(this,{type:"error",error:d}),St(d)||((m=(h=i(this,I).config).onError)==null||m.call(h,d,this),(F=(C=i(this,I).config).onSettled)==null||F.call(C,this.state.data,d,this)),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return l(this,A,Bt({initialPromise:s==null?void 0:s.initialPromise,fn:o.fetchFn,abort:r.abort.bind(r),onSuccess:d=>{var h,m,C,F;if(d===void 0){u(new Error(`${this.queryHash} data is undefined`));return}this.setData(d),(m=(h=i(this,I).config).onSuccess)==null||m.call(h,d,this),(F=(C=i(this,I).config).onSettled)==null||F.call(C,d,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:u,onFail:(d,h)=>{T(this,N,U).call(this,{type:"failed",failureCount:d,error:h})},onPause:()=>{T(this,N,U).call(this,{type:"pause"})},onContinue:()=>{T(this,N,U).call(this,{type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0})),i(this,A).start()}},rt=new WeakMap,nt=new WeakMap,I=new WeakMap,A=new WeakMap,lt=new WeakMap,X=new WeakMap,N=new WeakSet,U=function(t){const s=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...ce(r.data,this.options),fetchMeta:t.meta??null};case"success":return{...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const n=t.error;return St(n)&&n.revert&&i(this,nt)?{...i(this,nt),fetchStatus:"idle"}:{...r,error:n,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:n,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=s(this.state),D.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),i(this,I).notify({query:this,type:"updated",action:t})})},qt);function ce(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:Vt(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function he(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,s=t!==void 0,r=s?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:s?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}var q,Qt,le=(Qt=class extends wt{constructor(t={}){super();p(this,q,void 0);this.config=t,l(this,q,new Map)}build(t,s,r){const n=s.queryKey,a=s.queryHash??Ct(n,s);let o=this.get(a);return o||(o=new ue({cache:this,queryKey:n,queryHash:a,options:t.defaultQueryOptions(s),state:r,defaultOptions:t.getQueryDefaults(n)}),this.add(o)),o}add(t){i(this,q).has(t.queryHash)||(i(this,q).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const s=i(this,q).get(t.queryHash);s&&(t.destroy(),s===t&&i(this,q).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){D.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return i(this,q).get(t)}getAll(){return[...i(this,q).values()]}find(t){const s={exact:!0,...t};return this.getAll().find(r=>Ft(s,r))}findAll(t={}){const s=this.getAll();return Object.keys(t).length>0?s.filter(r=>Ft(t,r)):s}notify(t){D.batch(()=>{this.listeners.forEach(s=>{s(t)})})}onFocus(){D.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){D.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},q=new WeakMap,Qt),Q,E,Y,$,_,$t,de=($t=class extends zt{constructor(t){super();p(this,$);p(this,Q,void 0);p(this,E,void 0);p(this,Y,void 0);this.mutationId=t.mutationId,l(this,E,t.mutationCache),l(this,Q,[]),this.state=t.state||fe(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){i(this,Q).includes(t)||(i(this,Q).push(t),this.clearGcTimeout(),i(this,E).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){l(this,Q,i(this,Q).filter(s=>s!==t)),this.scheduleGc(),i(this,E).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){i(this,Q).length||(this.state.status==="pending"?this.scheduleGc():i(this,E).remove(this))}continue(){var t;return((t=i(this,Y))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var n,a,o,u,c,y,f,d,h,m,C,F,K,w,b,v,P,x,J,Z;l(this,Y,Bt({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(O,z)=>{T(this,$,_).call(this,{type:"failed",failureCount:O,error:z})},onPause:()=>{T(this,$,_).call(this,{type:"pause"})},onContinue:()=>{T(this,$,_).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>i(this,E).canRun(this)}));const s=this.state.status==="pending",r=!i(this,Y).canStart();try{if(!s){T(this,$,_).call(this,{type:"pending",variables:t,isPaused:r}),await((a=(n=i(this,E).config).onMutate)==null?void 0:a.call(n,t,this));const z=await((u=(o=this.options).onMutate)==null?void 0:u.call(o,t));z!==this.state.context&&T(this,$,_).call(this,{type:"pending",context:z,variables:t,isPaused:r})}const O=await i(this,Y).start();return await((y=(c=i(this,E).config).onSuccess)==null?void 0:y.call(c,O,t,this.state.context,this)),await((d=(f=this.options).onSuccess)==null?void 0:d.call(f,O,t,this.state.context)),await((m=(h=i(this,E).config).onSettled)==null?void 0:m.call(h,O,null,this.state.variables,this.state.context,this)),await((F=(C=this.options).onSettled)==null?void 0:F.call(C,O,null,t,this.state.context)),T(this,$,_).call(this,{type:"success",data:O}),O}catch(O){try{throw await((w=(K=i(this,E).config).onError)==null?void 0:w.call(K,O,t,this.state.context,this)),await((v=(b=this.options).onError)==null?void 0:v.call(b,O,t,this.state.context)),await((x=(P=i(this,E).config).onSettled)==null?void 0:x.call(P,void 0,O,this.state.variables,this.state.context,this)),await((Z=(J=this.options).onSettled)==null?void 0:Z.call(J,void 0,O,t,this.state.context)),O}finally{T(this,$,_).call(this,{type:"error",error:O})}}finally{i(this,E).runNext(this)}}},Q=new WeakMap,E=new WeakMap,Y=new WeakMap,$=new WeakSet,_=function(t){const s=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=s(this.state),D.batch(()=>{i(this,Q).forEach(r=>{r.onMutationUpdate(t)}),i(this,E).notify({mutation:this,type:"updated",action:t})})},$t);function fe(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var M,dt,Kt,ye=(Kt=class extends wt{constructor(t={}){super();p(this,M,void 0);p(this,dt,void 0);this.config=t,l(this,M,new Map),l(this,dt,Date.now())}build(t,s,r){const n=new de({mutationCache:this,mutationId:++ft(this,dt)._,options:t.defaultMutationOptions(s),state:r});return this.add(n),n}add(t){const s=yt(t),r=i(this,M).get(s)??[];r.push(t),i(this,M).set(s,r),this.notify({type:"added",mutation:t})}remove(t){var r;const s=yt(t);if(i(this,M).has(s)){const n=(r=i(this,M).get(s))==null?void 0:r.filter(a=>a!==t);n&&(n.length===0?i(this,M).delete(s):i(this,M).set(s,n))}this.notify({type:"removed",mutation:t})}canRun(t){var r;const s=(r=i(this,M).get(yt(t)))==null?void 0:r.find(n=>n.state.status==="pending");return!s||s===t}runNext(t){var r;const s=(r=i(this,M).get(yt(t)))==null?void 0:r.find(n=>n!==t&&n.state.isPaused);return(s==null?void 0:s.continue())??Promise.resolve()}clear(){D.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}getAll(){return[...i(this,M).values()].flat()}find(t){const s={exact:!0,...t};return this.getAll().find(r=>xt(s,r))}findAll(t={}){return this.getAll().filter(s=>xt(t,s))}notify(t){D.batch(()=>{this.listeners.forEach(s=>{s(t)})})}resumePausedMutations(){const t=this.getAll().filter(s=>s.state.isPaused);return D.batch(()=>Promise.all(t.map(s=>s.continue().catch(j))))}},M=new WeakMap,dt=new WeakMap,Kt);function yt(e){var t;return((t=e.options.scope)==null?void 0:t.id)??String(e.mutationId)}function pe(e){return{onFetch:(t,s)=>{const r=async()=>{var C,F,K,w,b;const n=t.options,a=(K=(F=(C=t.fetchOptions)==null?void 0:C.meta)==null?void 0:F.fetchMore)==null?void 0:K.direction,o=((w=t.state.data)==null?void 0:w.pages)||[],u=((b=t.state.data)==null?void 0:b.pageParams)||[],c={pages:[],pageParams:[]};let y=!1;const f=v=>{Object.defineProperty(v,"signal",{enumerable:!0,get:()=>(t.signal.aborted?y=!0:t.signal.addEventListener("abort",()=>{y=!0}),t.signal)})},d=Ht(t.options,t.fetchOptions),h=async(v,P,x)=>{if(y)return Promise.reject();if(P==null&&v.pages.length)return Promise.resolve(v);const J={queryKey:t.queryKey,pageParam:P,direction:x?"backward":"forward",meta:t.options.meta};f(J);const Z=await d(J),{maxPages:O}=t.options,z=x?re:se;return{pages:z(v.pages,Z,O),pageParams:z(v.pageParams,P,O)}};let m;if(a&&o.length){const v=a==="backward",P=v?Gt:Tt,x={pages:o,pageParams:u},J=P(n,x);m=await h(x,J,v)}else{m=await h(c,u[0]??n.initialPageParam);const v=e??o.length;for(let P=1;P<v;P++){const x=Tt(n,m);m=await h(m,x)}}return m};t.options.persister?t.fetchFn=()=>{var n,a;return(a=(n=t.options).persister)==null?void 0:a.call(n,r,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},s)}:t.fetchFn=r}}}function Tt(e,{pages:t,pageParams:s}){const r=t.length-1;return e.getNextPageParam(t[r],t,s[r],s)}function Gt(e,{pages:t,pageParams:s}){var r;return(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,s[0],s)}function Te(e,t){return t?Tt(e,t)!=null:!1}function Ae(e,t){return!t||!e.getPreviousPageParam?!1:Gt(e,t)!=null}var g,V,k,it,at,B,ot,ut,Jt,me=(Jt=class{constructor(e={}){p(this,g,void 0);p(this,V,void 0);p(this,k,void 0);p(this,it,void 0);p(this,at,void 0);p(this,B,void 0);p(this,ot,void 0);p(this,ut,void 0);l(this,g,e.queryCache||new le),l(this,V,e.mutationCache||new ye),l(this,k,e.defaultOptions||{}),l(this,it,new Map),l(this,at,new Map),l(this,B,0)}mount(){ft(this,B)._++,i(this,B)===1&&(l(this,ot,Lt.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,g).onFocus())})),l(this,ut,pt.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,g).onOnline())})))}unmount(){var e,t;ft(this,B)._--,i(this,B)===0&&((e=i(this,ot))==null||e.call(this),l(this,ot,void 0),(t=i(this,ut))==null||t.call(this),l(this,ut,void 0))}isFetching(e){return i(this,g).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return i(this,V).findAll({...e,status:"pending"}).length}getQueryData(e){var s;const t=this.defaultQueryOptions({queryKey:e});return(s=i(this,g).get(t.queryHash))==null?void 0:s.state.data}ensureQueryData(e){const t=this.getQueryData(e.queryKey);if(t===void 0)return this.fetchQuery(e);{const s=this.defaultQueryOptions(e),r=i(this,g).build(this,s);return e.revalidateIfStale&&r.isStaleByTime(Dt(s.staleTime,r))&&this.prefetchQuery(s),Promise.resolve(t)}}getQueriesData(e){return i(this,g).findAll(e).map(({queryKey:t,state:s})=>{const r=s.data;return[t,r]})}setQueryData(e,t,s){const r=this.defaultQueryOptions({queryKey:e}),n=i(this,g).get(r.queryHash),a=n==null?void 0:n.state.data,o=Xt(t,a);if(o!==void 0)return i(this,g).build(this,r).setData(o,{...s,manual:!0})}setQueriesData(e,t,s){return D.batch(()=>i(this,g).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,s)]))}getQueryState(e){var s;const t=this.defaultQueryOptions({queryKey:e});return(s=i(this,g).get(t.queryHash))==null?void 0:s.state}removeQueries(e){const t=i(this,g);D.batch(()=>{t.findAll(e).forEach(s=>{t.remove(s)})})}resetQueries(e,t){const s=i(this,g),r={type:"active",...e};return D.batch(()=>(s.findAll(e).forEach(n=>{n.reset()}),this.refetchQueries(r,t)))}cancelQueries(e={},t={}){const s={revert:!0,...t},r=D.batch(()=>i(this,g).findAll(e).map(n=>n.cancel(s)));return Promise.all(r).then(j).catch(j)}invalidateQueries(e={},t={}){return D.batch(()=>{if(i(this,g).findAll(e).forEach(r=>{r.invalidate()}),e.refetchType==="none")return Promise.resolve();const s={...e,type:e.refetchType??e.type??"active"};return this.refetchQueries(s,t)})}refetchQueries(e={},t){const s={...t,cancelRefetch:(t==null?void 0:t.cancelRefetch)??!0},r=D.batch(()=>i(this,g).findAll(e).filter(n=>!n.isDisabled()).map(n=>{let a=n.fetch(void 0,s);return s.throwOnError||(a=a.catch(j)),n.state.fetchStatus==="paused"?Promise.resolve():a}));return Promise.all(r).then(j)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const s=i(this,g).build(this,t);return s.isStaleByTime(Dt(t.staleTime,s))?s.fetch(t):Promise.resolve(s.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(j).catch(j)}fetchInfiniteQuery(e){return e.behavior=pe(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(j).catch(j)}resumePausedMutations(){return pt.isOnline()?i(this,V).resumePausedMutations():Promise.resolve()}getQueryCache(){return i(this,g)}getMutationCache(){return i(this,V)}getDefaultOptions(){return i(this,k)}setDefaultOptions(e){l(this,k,e)}setQueryDefaults(e,t){i(this,it).set(ct(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...i(this,it).values()];let s={};return t.forEach(r=>{ht(e,r.queryKey)&&(s={...s,...r.defaultOptions})}),s}setMutationDefaults(e,t){i(this,at).set(ct(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...i(this,at).values()];let s={};return t.forEach(r=>{ht(e,r.mutationKey)&&(s={...s,...r.defaultOptions})}),s}defaultQueryOptions(e){if(e._defaulted)return e;const t={...i(this,k).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=Ct(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.enabled!==!0&&t.queryFn===_t&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...i(this,k).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){i(this,g).clear(),i(this,V).clear()}},g=new WeakMap,V=new WeakMap,k=new WeakMap,it=new WeakMap,at=new WeakMap,B=new WeakMap,ot=new WeakMap,ut=new WeakMap,Jt);function At(){}function we(e,{interval:t=1e3,onError:s=At}={}){if(typeof e!="function")throw new Error("argument is not function.");let r=0,n=null,a=!1,o=!1;return async(...u)=>{if(n=u,!o){for(o=!0;a;)await new Promise(c=>setTimeout(c,t));for(;Date.now()<r;)await new Promise(c=>setTimeout(c,r-Date.now()));o=!1,a=!0;try{await e(...n)}catch(c){try{s(c)}catch{}}r=Date.now()+t,a=!1}}}var ve=({storage:e,key:t="REACT_QUERY_OFFLINE_CACHE",throttleTime:s=1e3,serialize:r=JSON.stringify,deserialize:n=JSON.parse,retry:a})=>{if(e){const o=async u=>{try{const c=await r(u);await e.setItem(t,c);return}catch(c){return c}};return{persistClient:we(async u=>{let c=u,y=await o(c),f=0;for(;y&&c;)f++,c=await(a==null?void 0:a({persistedClient:c,error:y,errorCount:f})),c&&(y=await o(c))},{interval:s}),restoreClient:async()=>{const u=await e.getItem(t);if(u)return await n(u)},removeClient:()=>e.removeItem(t)}}return{persistClient:At,restoreClient:()=>Promise.resolve(void 0),removeClient:At}};const gt=new me({defaultOptions:{queries:{refetchOnWindowFocus:!1}}}),ge={getItem:async e=>(await Ot.storage.local.get(e))[e],removeItem:async e=>{await Ot.storage.local.remove(e)},setItem:async(e,t)=>{await Ot.storage.local.set({[e]:t})}},Ce=ve({key:"reactQueryCache",storage:ge}),Ee=async e=>{if(!e){let n=await chrome.storage.local.get("authDetails");n=JSON.parse(n.authDetails),e=n.token}const t=await R.get("extVersion"),r=await(await fetch(`${S.DOMAIN}/status?customJWT=true`,{headers:{Authorization:`Bearer ${e}`,"x-merlin-version":`extension-${t}`},method:"GET"})).json();if(r.status==="success")return r.data;if(r.status==="error")throw r.error},De=async(e,t,s,r=!0)=>{var y,f,d;const n=gt.getQueryData(["sharedUserSettings"]),a=await R.get("extVersion"),o=(y=n==null?void 0:n.apiKey)!=null&&y.enabled&&((f=n==null?void 0:n.apiKey)!=null&&f.value)?{apiKey:(d=n==null?void 0:n.apiKey)==null?void 0:d.value}:{},u=await fetch(`${S.DOMAIN}/summarize/blog?&customJWT=true`,{body:JSON.stringify({key:s,language:n.language||"AUTO",query:t,useCache:r,...o}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${a}`},method:"POST"}),c=await u.json();if(c.status==="success")return c.data.requestIdHeader=u.headers.get("x-request-id"),c;throw c.status==="error"?c.error:new Error("Something went wrong")},Fe=async(e,t,s,r,n=!0,a=!0)=>{var d,h,m;const o=gt.getQueryData(["sharedUserSettings"]),u=await R.get("extVersion"),c=(d=o==null?void 0:o.apiKey)!=null&&d.enabled&&((h=o==null?void 0:o.apiKey)!=null&&h.value)?{apiKey:(m=o==null?void 0:o.apiKey)==null?void 0:m.value}:{},f=await(await fetch(`${S.DOMAIN}/summarize/codex?&customJWT=true`,{body:JSON.stringify({commit:t,getTitle:a,key:r,query:s,useCache:n,...c}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${u}`},method:"POST"})).json();if(f.status==="success")return f;throw f.status==="error"?f.error:new Error("Something went wrong")},xe=async(e,t="")=>{const r=await(await fetch(`${S.DOMAIN}/session/refresh?&source=${t}`,{body:JSON.stringify({refreshToken:e}),headers:{"Content-Type":"application/json"},method:"POST"})).json();if(r.status==="success")return r.data;if(r.status==="error")throw r.error},Me=async(e,t)=>{const s=await R.get("extVersion"),n=await(await fetch(`${S.DOMAIN}/delete/document?customJWT=true`,{body:JSON.stringify({namespace:t}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${s}`},method:"POST"})).json();if(n.status==="error")throw n.error;return n},Ie=async(e,t)=>{var u,c,y;const s=gt.getQueryData(["sharedUserSettings"]),r=await R.get("extVersion"),n=(u=s==null?void 0:s.apiKey)!=null&&u.enabled&&((c=s==null?void 0:s.apiKey)!=null&&c.value)?{apiKey:(y=s==null?void 0:s.apiKey)==null?void 0:y.value}:{},o=await(await fetch(S.DOMAIN+S.ROUTES.WEB_SUMMARIZE,{body:JSON.stringify({...t,...n}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${r}`},method:"POST"})).json();if(o.status==="error")throw o.error;return o};async function Re(e,t){const s=t;s.append("token",e);const n=await(await fetch(`${Et.DOMAIN}${Et.ROUTES.EXTRACT_TEXT_DOC_CHAT}`,{body:s,headers:{"Access-Control-Request-Method":"POST"},method:"POST"})).json(),a=n==null?void 0:n.detail;if(a.status==="error")throw a.error;return a}async function je(e,t,s,r,n){var f,d,h;const a=gt.getQueryData(["sharedUserSettings"]),o=await R.get("extVersion"),u=(f=a==null?void 0:a.apiKey)!=null&&f.enabled&&((d=a==null?void 0:a.apiKey)!=null&&d.value)?{apiKey:(h=a==null?void 0:a.apiKey)==null?void 0:h.value}:{},y=await(await fetch(`${S.DOMAIN}/summarize/document?customJWT=true`,{body:JSON.stringify({chatId:t,language:n,namespace:s,useCache:r,...u}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${o}`},method:"POST"})).json();if(y.status==="error")throw y.error;return y}const Ne=async(e,t,s)=>{const r=await R.get("extVersion"),a=await(await fetch(`${S.DOMAIN}${S.ROUTES.USER_CHAT_HISTORY}`,{body:JSON.stringify({ENTRY_PER_PAGE:s,page:t}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${r}`},method:"POST"})).json();if(a.status==="success")return a.data;throw a.status==="error"?a.error:new Error("Something went wrong")},qe=async(e,t)=>{const s=await R.get("extVersion");try{const n=await(await fetch(`${S.DOMAIN}${S.ROUTES.SEARCH_DECISION_WEB_ACCESS_THREAD}`,{body:JSON.stringify({action:t.action,chatId:t.chatId,mode:"VANILLA_CHAT",model:t.model}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${s}`},method:"POST"})).json();return n.status==="success"?n.data:null}catch{return null}},Qe=async(e,t,s,r,n)=>{const a=await R.get("extVersion"),u=await(await fetch(`${S.DOMAIN}${S.ROUTES.CLEAN_WEBPAGE_DOM}`,{body:JSON.stringify({chatId:r,dom:t,namespace:n,webpage:s}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${a}`},method:"POST"})).json();if(u.status==="error")throw u.error;return u},$e=async(e,t,s,r,n,a)=>{const o=await R.get("extVersion"),c=await(await fetch(`${S.DOMAIN}/feedback?customJWT=true`,{body:JSON.stringify({callingSite:r,email:n,feedback:s,query:e,request_id:a||null,result:t}),headers:{"Content-Type":"application/json","x-merlin-version":`extension-${o}`},method:"POST"})).json();if(c.status==="error")throw c.error;return c},Ke=async(e,t,s,r,n)=>{const a=await R.get("extVersion");try{const u=await(await fetch(`${S.DOMAIN}${S.ROUTES.GENERATE_SHARE_ID}`,{body:JSON.stringify({chatId:t,email:s,lastMessageId:r,title:n}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${a}`},method:"POST"})).json();if(u.status==="success")return u.data;throw u.status==="error"?u.error:new Error("Something went wrong")}catch{return null}},Je=async(e,t)=>{const s=await R.get("extVersion");try{const n=await(await fetch(`${Wt.DOMAIN}/deleteSharedChat?customJWT=true`,{body:JSON.stringify({chatId:t}),headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json","x-merlin-version":`extension-${s}`},method:"POST"})).json();if(n.status==="success")return!0;if(n.status==="error")return!1;throw new Error("Something went wrong")}catch{return!1}},Ue=async()=>{try{const e=await mt.get(`${S.DOMAIN}/user/getUserPrompts?customJWT=true`);if(e.data.status==="error")throw new Error(e.data.error);return e.data}catch{return null}},_e=async e=>{try{const t=await mt.post(`${S.DOMAIN}/user/addUserPrompt?customJWT=true`,e);if(t.data.status==="error")throw new Error(t.data.error);return t.data}catch{return null}},He=async()=>{try{const e=await mt.get(`${S.DOMAIN}/user/getSurveyProgress?customJWT=true`);if(e.data.status==="error")throw new Error(e.data.error);return e.data}catch{return null}},Le=async(e,t)=>{try{const s=await mt.post(`${S.DOMAIN}/user/updateSurveyProgress?surveyIdx=${e}&surveyInterval=${t}&customJWT=true`);if(s.data.status==="error")throw new Error(s.data.error);return s.data}catch{return null}};export{vt as A,Yt as B,Zt as C,Lt as D,ce as E,ee as F,D as G,ct as H,fe as I,wt as S,Ce as a,Ue as b,De as c,Ae as d,je as e,Ie as f,Fe as g,Te as h,pe as i,Qe as j,Ke as k,Je as l,$e as m,Me as n,Ne as o,He as p,gt as q,Le as r,_e as s,xe as t,Re as u,Ee as v,qe as w,Pe as x,Dt as y,j as z};
