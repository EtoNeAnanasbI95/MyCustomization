!function(e){function t(t){for(var o,i,u=t[0],s=t[1],c=t[2],f=0,d=[];f<u.length;f++)i=u[f],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);for(l&&l(t);d.length;)d.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,u=1;u<n.length;u++){var s=n[u];0!==r[s]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={9:0},a=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var u=window.savefromContentScriptWebpackJsonp=window.savefromContentScriptWebpackJsonp||[],s=u.push.bind(u);u.push=t,u=u.slice();for(var c=0;c<u.length;c++)t(u[c]);var l=s;a.push([102,0]),n()}({102:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n(19),a=n(17),i=n(34),u=(n(31),n(26)),s=n(16),c=n(20),l=n(3),f=n(1),d=n(22),p=n(13);d.a.isSingle()&&Object(a.b)("rutube",(function(e,t){var n=Object(r.a)(t),a=t.preferences,d=a.moduleRutube?1:0;chrome.runtime.sendMessage({type:"content",flag:250},(function(e){e&&Function(e).call(globalThis)}));var h=Object(i.a)();o.a.onMessage.addListener((function(t,n,o){if("getModuleInfo"===t.action){if(t.url!==location.href)return;return o({state:d,moduleName:e})}if("changeState"===t.action){if(e!==t.moduleName)return;return v.changeState(t.state)}if("updatePreferences"!==t.action){if(d)return"updateLinks"===t.action?v.updateLinks():void 0}else Object.assign(a,t.preferences)})),d&&setTimeout((function(){v.run()}));var v={buttonClassName:"sf-button",contextMenu:null,run:function(){if(d=1,h)return v.frame();p.a.isAvailable()&&v.mutationMode.enable()},changeState:function(e){d=e,this.hideMenu(),this.rmDlLinks(),this.mutationMode.stop(),e&&this.run()},hideMenu:function(){v.contextMenu&&(v.contextMenu.hide(),v.contextMenu=null)},updateLinks:function(){this.changeState(0),this.changeState(1)},rmDlLinks:function(){for(var e,t=document.querySelectorAll(".".concat(this.buttonClassName)),n=0;e=t[n];n++)e.parentNode.removeChild(e)},insertDownloadLink:function(e){for(var t,r=e.querySelectorAll(".".concat(this.buttonClassName)),a=0;t=r[a];a++)t.parentNode.removeChild(t);r=null;var i=function(){var e=location.href;return"ummy"+e.substr(e.indexOf("://"))},u=i(),s=f.a.create("a",{href:u,className:"".concat(this.buttonClassName," video-tools__tools-button"),target:"_blank",on:[["click",function(t){var o;if(t.preventDefault(),t.stopPropagation(),o=i(),u!==o&&(u=o,s.href=o),v.contextMenu&&v.contextMenu.isShow)v.hideMenu();else{var r=n.popupMenu.prepareLinks.rutube(i());v.contextMenu=n.popupMenu.quickInsert(this,r,"sf-popupMenu",{parent:Object(c.a)(e,".b-video__description")})}}]],append:[n.svg.getSvg("download","#6c9b01",20,20),f.a.create("span",{text:o.a.i18n.getMessage("download"),style:{color:"#6c9b01"}})]});l.a.onRemoveEvent(s,v.hideMenu),e.insertAdjacentElement("afterbegin",s)},frame:function(){var e=this,t=n.frameMenu.getBtn({singleBtn:!0,btnId:"sfDlBtn",containerStyle:{right:"50px",top:"6px"},quickBtnStyleObj:{display:"inline-block",border:0,borderRadius:".3em",cursor:"pointer",position:"relative",padding:"4px 6px"},quickBtnCssStyle:{backgroundColor:"transparent"},quickBtnIcon:f.a.create(n.svg.getSvg("download","#ffffff"),{style:{display:"inline-block",width:"16px",height:"16px",verticalAlign:"middle"}}),nodeCssStyle:{display:"none"},on:[["click",function(o){if(o.preventDefault(),o.stopPropagation(),e.contextMenu&&e.contextMenu.isShow)e.hideMenu();else{var r=n.popupMenu.prepareLinks.rutube(location.href);e.contextMenu=n.frameMenu.getMenu(this,r,"sf-frame-menu",{container:t.container,onShow:function(){t.node.classList.add("sf-over")},onHide:function(){e.contextMenu=null,t.node.classList.remove("sf-over")}})}}],["mousedown",function(n){n.stopPropagation(),2===n.button&&(l.a.off(document.body,"mousemove",u),e.hideMenu(),t.container.parentNode&&t.container.parentNode.removeChild(t.container))}]]});t.quickBtn.title=o.a.i18n.getMessage("download"),t.container=f.a.create("div",{class:"sf-btn-ctr",append:t.node}),l.a.on(t.container,"mouseenter",(function(){t.lockHide=!0})),l.a.on(t.container,"mouseleave",(function(){t.lockHide=!1}));var r=null,a=!1,i=function(){t.lockHide||(t.container.classList.add("sf-hide-ui"),a=!0)},u=function(){a&&(t.container.classList.remove("sf-hide-ui"),a=!1),clearTimeout(r),r=setTimeout(i,3e3)};l.a.on(document.body,"mousemove",u),t.node.appendChild(f.a.create("style",{text:Object(s.a)([{selector:["body:hover .sf-btn-ctr:not(.sf-hide-ui) #sfDlBtn","body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu"],style:{display:"block"}}])})),document.body.appendChild(t.container)},mutationMode:{observer:null,stop:function(){this.observer&&this.observer.stop(),["sfSkip"].forEach((function(e){for(var t,n=Object(u.a)(e),o=document.querySelectorAll("["+n+"]"),r=0;t=o[r];r++)t.removeAttribute(n)}))},enable:function(){if(this.observer)return this.observer.start();this.observer=new p.a({queries:[{css:".video-tools > span",is:"added",callback:function(e){for(var t,n=0;t=e.added[n];n++)t.dataset.sfSkip>0||(t.dataset.sfSkip="1",v.insertDownloadLink(t))}},{css:".".concat(l.a.onRemoveClassName),is:"removed",callback:function(e){for(var t,n=0;t=e.removed[n];n++)l.a.onRemoveListener(t)}}]})}}}}),(function(){return Promise.resolve().then((function(){if(Object(i.a)()){var e=!1;try{e=location.hostname===window.parent.location.hostname}catch(e){}return!e}return!0})).then((function(e){return!!e&&o.a.callFn("getPreferences").then((function(e){return!!e.showUmmyItem}))}))}))}});