var S=(e,t,s)=>{if(!t.has(e))throw TypeError("Cannot "+s)};var i=(e,t,s)=>(S(e,t,"read from private field"),s?s.call(e):t.get(e)),l=(e,t,s)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,s)},b=(e,t,s,r)=>(S(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s);var p=(e,t,s)=>(S(e,t,"access private method"),s);import{r as m}from"./client-45b27fd3.js";import{S as U,x as k,H as K,I,G as w}from"./backend-b5a741e2.js";import{u as L}from"./PersistQueryClientProvider-53edff98.js";var h,a,o,n,f,M,v,C,R,j=(R=class extends U{constructor(t,s){super();l(this,f);l(this,v);l(this,h,void 0);l(this,a,void 0);l(this,o,void 0);l(this,n,void 0);b(this,h,t),this.setOptions(s),this.bindMethods(),p(this,f,M).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var r;const s=this.options;this.options=i(this,h).defaultMutationOptions(t),k(this.options,s)||i(this,h).getMutationCache().notify({type:"observerOptionsUpdated",mutation:i(this,o),observer:this}),s!=null&&s.mutationKey&&this.options.mutationKey&&K(s.mutationKey)!==K(this.options.mutationKey)?this.reset():((r=i(this,o))==null?void 0:r.state.status)==="pending"&&i(this,o).setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=i(this,o))==null||t.removeObserver(this)}onMutationUpdate(t){p(this,f,M).call(this),p(this,v,C).call(this,t)}getCurrentResult(){return i(this,a)}reset(){var t;(t=i(this,o))==null||t.removeObserver(this),b(this,o,void 0),p(this,f,M).call(this),p(this,v,C).call(this)}mutate(t,s){var r;return b(this,n,s),(r=i(this,o))==null||r.removeObserver(this),b(this,o,i(this,h).getMutationCache().build(i(this,h),this.options)),i(this,o).addObserver(this),i(this,o).execute(t)}},h=new WeakMap,a=new WeakMap,o=new WeakMap,n=new WeakMap,f=new WeakSet,M=function(){var s;const t=((s=i(this,o))==null?void 0:s.state)??I();b(this,a,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},v=new WeakSet,C=function(t){w.batch(()=>{var s,r,u,y,c,O,x,E;if(i(this,n)&&this.hasListeners()){const d=i(this,a).variables,g=i(this,a).context;(t==null?void 0:t.type)==="success"?((r=(s=i(this,n)).onSuccess)==null||r.call(s,t.data,d,g),(y=(u=i(this,n)).onSettled)==null||y.call(u,t.data,null,d,g)):(t==null?void 0:t.type)==="error"&&((O=(c=i(this,n)).onError)==null||O.call(c,t.error,d,g),(E=(x=i(this,n)).onSettled)==null||E.call(x,void 0,t.error,d,g))}this.listeners.forEach(d=>{d(i(this,a))})})},R);function q(e,t){return typeof e=="function"?e(...t):!!e}function A(){}function Q(e,t){const s=L(t),[r]=m.useState(()=>new j(s,e));m.useEffect(()=>{r.setOptions(e)},[r,e]);const u=m.useSyncExternalStore(m.useCallback(c=>r.subscribe(w.batchCalls(c)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),y=m.useCallback((c,O)=>{r.mutate(c,O).catch(A)},[r]);if(u.error&&q(r.options.throwOnError,[u.error]))throw u.error;return{...u,mutate:y,mutateAsync:u.mutate}}export{q as s,Q as u};
