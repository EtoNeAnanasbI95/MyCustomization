import{r as c}from"./client-45b27fd3.js";import{h as w}from"./index-9b1f0f42.js";var l={exports:{}},R="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",x=R,E=x;function u(){}function v(){}v.resetWarningCache=u;var k=function(){function e(o,f,m,i,y,a){if(a!==E){var p=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw p.name="Invariant Violation",p}}e.isRequired=e;function r(){return e}var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:v,resetWarningCache:u};return t.PropTypes=t,t};l.exports;l.exports=k();var S=l.exports;const n=w(S);var j={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},C=Object.defineProperty,N=Object.defineProperties,W=Object.getOwnPropertyDescriptors,s=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable,_=(e,r,t)=>r in e?C(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,h=(e,r)=>{for(var t in r||(r={}))d.call(r,t)&&_(e,t,r[t]);if(s)for(var t of s(r))O.call(r,t)&&_(e,t,r[t]);return e},I=(e,r)=>N(e,W(r)),D=(e,r)=>{var t={};for(var o in e)d.call(e,o)&&r.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&s)for(var o of s(e))r.indexOf(o)<0&&O.call(e,o)&&(t[o]=e[o]);return t},z=(e,r,t)=>{const o=c.forwardRef((f,m)=>{var i=f,{color:y="currentColor",size:a=24,stroke:p=2,children:P}=i,g=D(i,["color","size","stroke","children"]);return c.createElement("svg",h(I(h({ref:m},j),{width:a,height:a,stroke:y,strokeWidth:p,className:`tabler-icon tabler-icon-${e}`}),g),[...t.map(([T,b])=>c.createElement(T,b)),...P||[]])});return o.propTypes={color:n.string,size:n.oneOfType([n.string,n.number]),stroke:n.oneOfType([n.string,n.number])},o.displayName=`${r}`,o};export{n as P,z as c,S as p};
