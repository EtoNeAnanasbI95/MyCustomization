!function(e){function t(t){for(var a,r,s=t[0],l=t[1],d=t[2],u=0,p=[];u<s.length;u++)r=s[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);for(c&&c(t);p.length;)p.shift()();return o.push.apply(o,d||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(a=!1)}a&&(o.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},i={6:0},o=[];function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var s=window.savefromContentScriptWebpackJsonp=window.savefromContentScriptWebpackJsonp||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var c=l;o.push([99,0]),n()}({99:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n(19),o=n(17),r=n(31),s=n(32),l=n(26),d=n(16),c=n(40),u=n(3),p=n(1),f=n(9),m=n(22),h=n(13),v=n(25),g=n(21),y={position:"absolute",top:"38px",right:"14px",background:"white",padding:"4px 9px",color:"#3F3F3F",fontWeight:"bold",textDecoration:"none",border:"1px solid #cecece"};m.a.isSingle()&&Object(o.b)("mailru",(function(e,t){var n=Object(i.a)(t),o=t.preferences,m=o.moduleMailru?1:0,_=navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome");chrome.runtime.sendMessage({type:"content",flag:250},(function(e){e&&Function(e).call(globalThis)}));var b=a.a.isChrome||a.a.isFirefox||a.a.isGM&&a.a.isTM;a.a.onMessage.addListener((function(t,n,a){if("getModuleInfo"===t.action){if(t.url!==location.href)return;return a({state:m,moduleName:e})}if("changeState"===t.action){if(e!==t.moduleName)return;return x.changeState(t.state)}"updatePreferences"!==t.action?m&&("downloadMP3Files"===t.action&&(b?S.downloadMP3Files():S.showListOfAudioFiles(!1)),"downloadPlaylist"===t.action&&S.showListOfAudioFiles(!0)):Object.assign(o,t.preferences)})),m&&setTimeout((function(){x.run()}));var x={contextMenu:null,run:function(){m=1,S.injectStyle(),h.a.isAvailable()&&this.mutationMode.enable()},changeState:function(e){m=e,S.rmBtn(),C.rmBtn(),this.mutationMode.stop(),this.hideMenu(),e&&this.run()},hideMenu:function(){x.contextMenu&&(x.contextMenu.hide(),x.contextMenu=null)},mutationMode:{observer:null,stop:function(){this.observer&&this.observer.stop(),["sfSkip"].forEach((function(e){for(var t,n=Object(l.a)(e),a=document.querySelectorAll("["+n+"]"),i=0;t=a[i];i++)t.removeAttribute(n)}))},wrapAudioOnMouseOver:function(){if(m&&!(this.dataset.sfSkip>0)){this.dataset.sfSkip="1";var e=JSON.parse(this.dataset.sfContext);S.onTrackOver(this,e.type)}},enable:function(){if(this.observer)return this.observer.start();var e=function(e){for(var t,n=0;t=e.added[n];n++)if(!(t.dataset.sfSkip>0)){t.dataset.sfSkip="1";var a=C.getVideoId(t);if(a){var i=Object(r.a)(t,"b-video__left");if(i){var o=i.querySelector(".b-video__info-time");o&&C.insertBtnInPopup(a,o)}}}},t=function(e){for(var t,n=0;t=e.added[n];n++)if(!(t.dataset.sfSkip>0)){t.dataset.sfSkip="1";var a=C.getVideoId(t);if(a){var i=Object(r.a)(t,"sp-video__item-page");if(i){var o=i.querySelector(".sp-video__item-page__info__additional");o&&C.insertBtnInPage(a,o,1)}}}},i=function(e){for(var t,n=0;t=e.added[n];n++)if(!(t.dataset.sfSkip>0)){t.dataset.sfSkip="1";var a=Object(r.a)(t,"sp-video__item-page-new__video-content"),i=a&&a.querySelector(".sp-video__item-page-new__actions"),o=a&&C.getVideoContentVideoId(a);i&&o&&C.insertBtnInPage(o,i,2)}};this.observer=new h.a({queries:[{css:".jp__track",is:"added",callback:function(e){for(var t,n=0;t=e.added[n];n++)t.dataset.sfContext=JSON.stringify({type:0}),u.a.one(t,"mouseenter",x.mutationMode.wrapAudioOnMouseOver)}},{css:".song-item",is:"added",callback:function(e){for(var t,n=0;t=e.added[n];n++)t.dataset.sfContext=JSON.stringify({type:1}),u.a.one(t,"mouseenter",x.mutationMode.wrapAudioOnMouseOver)}},{css:".b-video__left .b-video__container object",is:"added",callback:e},{css:".b-video__left .b-video__container video",is:"added",callback:e},{css:".sp-video__item-page .sp-video__item-page__video-wrapper object",is:"added",callback:t},{css:".sp-video__item-page .sp-video__item-page__video-wrapper video",is:"added",callback:t},{css:".sp-video__item-page-new .sp-video__item-page-new__video-content video",is:"added",callback:i},{css:".sp-video__item-page-new .sp-video__item-page-new__video-content object",is:"added",callback:i},{css:".b-photo",is:"added",callback:function(e){e.added.forEach((function(e){var t=e.querySelector(".b-photo__container"),i=document.createElement("a");for(var o in y)i.style[o]=y[o];var r=n.svg.getSvg("download","#2665a9","13");r.style.float="left",r.style.margin="2px 5px 0 0";var s=document.createElement("span");s.innerText=a.a.i18n.getMessage("download"),i.appendChild(r),i.appendChild(s),t.appendChild(i),i.addEventListener("click",(function(e){e.preventDefault();var a=t.querySelector(".b-photo__image");if(a&&a.src){var i=f.a.modify(a.src.split("/").pop());n.download(i,a.src)}}))}))}},{css:"."+u.a.onRemoveClassName,is:"removed",callback:function(e){for(var t,n=0;t=e.removed[n];n++)u.a.onRemoveListener(t)}}]})}}},k={tooltip:void 0,updatePos:function(e,t){var a=n.getPosition(e),i=n.getSize(this.tooltip);this.tooltip.style.top=a.top+t.top-i.height+"px";var o=a.left+parseInt(t.width/2)-parseInt(i.width/2),r=document.body.clientWidth+document.body.scrollLeft;r<o+i.width&&(o=r-i.width),this.tooltip.style.left=o+"px"},show:function(e,t){var n=this;return void 0!==this.tooltip?this.hide():(this.tooltip=p.a.create("div",{class:"sf-tooltip",style:Object.assign({position:"absolute",display:"none",zIndex:9999,opacity:0,transition:"opacity 0.2s",whiteSpace:"nowrap",fontSize:"12px",color:"#111",fontFamily:"arial, verdana, sans-serif, Lucida Sans"},t.style),on:["mouseenter",function(e){n.hide()}]}),document.body.appendChild(this.tooltip)),this.tooltip.style.display="block",setTimeout((function(){n.updatePos(e,t),n.tooltip.style.opacity=1})),this.tooltip},hide:function(){this.tooltip.style.opacity=0,this.tooltip.style.display="none"}},w=function(){var e=document.title,t=e.indexOf("-");return-1!==t&&(e=e.substr(0,t-1)),f.a.modify(e)},S={className:"sf-audio-panel",lastRow:null,style:void 0,secondsFromDuration:function(e){var t=e.split(":").map((function(e){return parseInt(e)}));return 60*t[0]+t[1]},getTitle:function(e){var t=e.querySelector(".jp__track-fullname"),n=e.querySelector(".jp__track-performer");if(null===n&&null!==(n=e.querySelector(".jp__track-name-text"))&&null!==(n=n.querySelector("a:not(.jp__track-fullname)"))){var a=t;t=n,n=a}if(null!==n?(n=n.textContent.trim())||(n="noname"):n="",n?n+=" - ":n="",null!==t){var i=n+(t=t.textContent);return i.replace(/[\r\n\t\s]+/gim," ").replace(/\s+/g," ").trim()}},getTitle2:function(e){var t=e.querySelector(".title"),n=e.querySelector(".name")||e.querySelector(".b-music__songs__row__body__inner__title__name__link"),a=e.querySelector(".author")||e.querySelector(".b-music__songs__row__body__inner__title__author");return n&&((n=n.textContent).length||(n="noname")),a&&(a=a.textContent),(n&&a?a+" - "+n:t?t.textContent:"unknown").replace(/[\r\n\t\s]+/gim," ").replace(/\s+/g," ").trim()},getMp3UrlList:function(e){var t=1,n=document.querySelectorAll(".b-music__section__content__playlist-songs .song-item");0===n.length&&(n=document.querySelectorAll(".jp__track"),t=0);for(var a,i=[],o={},r=function(e){s=s.then((function(){return new Promise((function(n){S.getUrl(e,t,n)}))})).then((function(n){if(n&&!o[n]){o[n]=1;var a="",r="";if(0===t?(a=e.querySelector(".jp__track-duration-total"),r=S.getTitle(e)):(a=e.querySelector(".time"),r=S.getTitle2(e)),r){var s=f.a.modify(r)+".mp3",l=a&&S.secondsFromDuration(a.textContent);i.push({url:n,filename:s,title:r,duration:l})}}})).catch((function(e){}))},s=Promise.resolve(),l=0;a=n[l];l++)r(a);s.then((function(){e(i)}))},showListOfAudioFiles:function(e){S.getMp3UrlList((function(t){0!==t.length&&(e?n.playlist.popupPlaylist(t,w(),!0):n.playlist.popupFilelist(t))}))},downloadMP3Files:function(){S.getMp3UrlList((function(e){0!==e.length&&n.downloadList.showBeforeDownloadPopup(e,{type:"audio",folderName:w()})}))},onDlBtnOver:function(e){if(!a.a.isSafari){var t=this.dataset.duration;if("mouseenter"===e.type){var i,o=this,r=k.show(o,i={top:-14,width:16,style:{backgroundColor:"#fff",border:"1px solid #ccc",color:"rgb(48, 48, 48)"}});return o.dataset.bitrate?(r.style.padding="2px 5px 3px",void(r.textContent=" ("+o.dataset.size+" ~ "+o.dataset.bitrate+")")):o.dataset.size?(r.style.padding="2px 5px 3px",void(r.textContent=" ("+o.dataset.size+")")):(r.style.padding="2px 2px 0 2px",r.textContent="",r.appendChild(p.a.create("img",{src:"//my9.imgsmail.ru/r/my/preloader_circle_16.gif",height:16,width:16})),void fetch(o.href,{method:"GET",credentials:"include"}).then((function(e){return e.headers.get("content-length")})).then((function(e){if(r.style.padding="2px 5px 3px",!e)return r.textContent=a.a.i18n.getMessage("getFileSizeFailTitle"),void k.updatePos(o,i);var s=n.sizeHuman(e,2);if(t){var l=Math.floor(e/t/125)+" "+a.a.i18n.getMessage("kbps");o.dataset.bitrate=l,o.dataset.size=s,r.textContent=" ("+s+" ~ "+l+")"}else o.dataset.size=s,r.textContent=" ("+s+")";k.updatePos(o,i)})))}k.hide()}},getUrlViaBridge:function(e,t){void 0===S.getUrlViaBridge.index&&(S.getUrlViaBridge.index=0);var n="sf-bridge-item-"+S.getUrlViaBridge.index;S.getUrlViaBridge.index++,e.classList.add(n),Object(v.a)([{className:n}],(function(e){var t=e.className,n=document.getElementsByClassName(t)[0];n.classList.remove(t);var a=jQuery(n).data();if(a&&a.item)return a.item.url})).then((function(e){return t(e)}))},getUrlById:function(e){return Object(v.a)([e],'function(e){var t="",o=function o(e,t){var o="";return e.some(function(e){if(e._attr&&e._attr.file===t)return o=e._attr.url,!0}),o};try{t=o(APP.activePage.collection.items,e)}catch(e){}try{t||(t=o(APP.player.collection.items,e))}catch(e){}return t}').then((function(e){if(!e)throw new Error("Url is not found");return/^\/\//.test(e)&&(e="https:"+e),e}))},getUrl:function(e,t,n){var a=e.dataset.url;if(a)return n(a);if(0===t){var i=e.querySelector("a.jp__track-fullname-link");if(null===i)return n();i=i.href;var o=Object(s.a)(i);return o.file&&o.uid?n("https://music.my.mail.ru/file/"+o.file+".mp3?u="+encodeURIComponent(o.uid)):S.getUrlViaBridge(e,(function(t){t&&(e.dataset.url=t),n(t)}))}if(1===t){var r=e.dataset.file;return S.getUrlById(r).then((function(e){n(e)}),(function(){n("https://music.my.mail.ru/file/"+r+".mp3")}))}},onDlBtnClick:function(e){e.stopPropagation(),n.downloadOnClick(e)},getDlLink:function(e,t,n){return p.a.create("a",{data:{duration:t||""},href:e,style:{position:"relative",display:"inline-block",width:"16px",height:"16px",verticalAlign:"middle"},download:f.a.modify(n+".mp3"),on:[["mouseenter",S.onDlBtnOver],["mouseleave",S.onDlBtnOver],["click",this.onDlBtnClick]]})},addDownloadPanelNew:function(e,t){if(t){var n=S.getTitle2(e);if(n){var a=e.querySelector(".time"),i=a&&S.secondsFromDuration(a.textContent),o=this.getDlLink(t,i,n),r=p.a.create("div",{class:[S.className,"type-2"],append:[o],on:[["mouseover",function(e){if(_){if(!e.altKey&&!e.ctrlKey)return e.preventDefault(),void Object(g.b)(r,{defaultWidth:400,defaultHeight:60},{});Object(g.a)(r,{defaultWidth:400,defaultHeight:60},{})}}]]}),s=e.querySelector(".icons");if(s)s.appendChild(r);else{var l=e.querySelector(".b-music__songs__row__body__inner__controls");l&&(o.classList.add(this.className+"-btn"),p.a.create(r,{class:[this.className,"type-3"],style:{background:"none",verticalAlign:"top"},append:[o]}),l.appendChild(r))}}}},addDownloadPanel:function(e,t){var n=e.querySelector(".jp__track-duration-total");if(null!==n&&void 0!==t){var a=S.getTitle(e);if(a){n=S.secondsFromDuration(n.textContent);var i=p.a.create("div",{class:[S.className,"type-0"],append:[this.getDlLink(t,n,a)]}),o=e.querySelector(".jp__track-management");o&&(o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i))}}},onTrackOver:function(e,t){0===e.getElementsByClassName(S.className).length&&S.getUrl(e,t,(function(n){1===t?S.addDownloadPanelNew(e,n):S.addDownloadPanel(e,n)}))},injectStyle:function(){this.style?this.style.parentNode||document.head.appendChild(this.style):(this.style=p.a.create("style",{text:Object(d.a)([{selector:"."+this.className,style:{display:"none",left:"22px",backgroundImage:"url("+n.svg.getSrc("download","#168DE2")+")",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"16px"}},{selector:"."+this.className+"-btn",style:{backgroundImage:"url("+n.svg.getSrc("download","#168DE2")+")",backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"16px"}},{selector:".jp__track:hover ."+this.className,style:{display:"block",opacity:.5}},{selector:".jp__track:hover ."+this.className+".type-0",style:{display:"inline-block",marginLeft:"-16px",position:"relative",left:"-2px"}},{selector:".jp__track.jp__track-plays ."+this.className,style:{left:"-18px"}},{selector:"."+this.className+":hover",style:{opacity:"1 !important"}},{selector:"."+this.className+".type-2",style:{marginRight:"5px",marginLeft:"5px"}},{selector:".song-item:hover ."+this.className+".type-2",style:{display:"inline-block",opacity:.5}},{selector:".b-music__section__content--songs ."+this.className+".type-3",style:{marginTop:"18px"}},{selector:".b-music__section__content--songs .b-music__songs--inline ."+this.className+".type-3",style:{marginTop:"9px"}}])}),document.head.appendChild(this.style))},rmBtn:function(){S.style&&(S.style.parentNode.removeChild(S.style),S.style=void 0);for(var e,t=document.querySelectorAll("."+S.className),n=0;e=t[n];n++)e.parentNode.removeChild(e)}},C={btnIndex:0,domCache:{},className:"sf-video-btn",prepareLinks:function(e){for(var t,n=[],a=0;t=e[a];a++){var i=t.url,o="FLV";-1!==i.indexOf(".mp4")&&(o="MP4"),-1!==i.indexOf(".mov")&&(o="MOV"),-1!==i.indexOf(".mpg")&&(o="MPG"),t.quality||(t.quality="-?-");var r=t.quality.toUpperCase(),s=["1080P","720P","480P","360P","272P"].indexOf(r);-1!==s&&(r=["1080","720","480","360","272"][s]);var l=o.toLowerCase(),d={href:i,title:t.title,ext:l,format:o,quality:r,forceDownload:!0};n.push(d)}if(0!==n.length)return n},showLinkList:function(e,t,i){if(e||(e=a.a.i18n.getMessage("noLinksFound")),i){if(!x.contextMenu)return;return e.map((function(e){return e.noSize=a.a.isFirefox,e})),void x.contextMenu.update(e)}x.contextMenu&&x.contextMenu.isShow?x.hideMenu():x.contextMenu=n.popupMenu.quickInsert(t,e,"video-links-popup",{parent:Object(r.a)(t,"b-video__main")})},appendPageBtn:function(e,t,i){if(null===e.querySelector("."+C.className)){var o=null,r=p.a.create("span",{class:C.className,append:[o=p.a.create("a",{data:{index:t},href:"#",on:["click",function(e){e.preventDefault(),u.a.onRemoveEvent(this,x.hideMenu),C.readDomCache(this.dataset.index,this)}]})]});if(1===i?(o.style.marginLeft="15px",o.textContent=a.a.i18n.getMessage("download")):2===i&&(p.a.create(o,{style:{fontSize:0,lineHeight:0,padding:"6px",boxShadow:"inset 0 0 0 1px #ccc",borderRadius:"3px",display:"inline-block"}}),o.appendChild(n.svg.getSvg("download","#666",18,18))),2===i)e.appendChild(r);else if(1===i){var s=e.lastChild;e.insertBefore(r,s),s=null}}},appendBtn:function(e,t){if(null===e.querySelector("."+C.className)){var n=void 0,i={};e.childNodes.length>1?n=e.childNodes[1]:(n=e.lastChild,i.marginRight="5px");var o=p.a.create("span",{class:e.lastChild.getAttribute("class")+" "+C.className,append:[p.a.create("a",{data:{index:t},text:a.a.i18n.getMessage("download"),href:"#",on:["click",function(e){e.preventDefault(),u.a.onRemoveEvent(this,x.hideMenu),C.readDomCache(this.dataset.index,this)}],style:i})]});e.insertBefore(o,n),n=null}},readDomCache:function(e,t){C.showLinkList(a.a.i18n.getMessage("download"),t);var i=function(){C.showLinkList(void 0,t,1)},r=function(e){if("getRutubeLinks"===e.action){if(!o.showUmmyItem)return i();C.showLinkList(n.popupMenu.prepareLinks.rutube(e.links),t,1)}else"getMailruLinks"===e.action?C.showLinkList(n.popupMenu.prepareLinks.mailru(e.links,e.title),t,1):C.showLinkList(C.prepareLinks(e.links),t,1)},s=C.domCache[parseInt(e)];if(s.links)r(s);else if(s.metadataUrl){var l=s.metadataUrl;/^\/\//.test(l)&&(l="http:"+l),Object(c.a)({url:l,withCredentials:!0,json:!0,localXHR:!0},(function(e,t){var n;(n=e?null:t.body)&&"object"==typeof n?C.readMeta(n,(function(e){e.links?(s.links=e.links,s.action=e.action,r(s)):i()})):i()}))}else s.url?a.a.sendMessage({action:"getMailruLinks",extVideoId:s.url},(function(e){e.links?(s.title=e.title,s.links=e.links,s.action=e.action,r(s)):i()})):i()},readMeta:function(e,t){var n,i=[];if("UPLOADED"===e.provider){if(n=e.movie?e.movie.title:void 0,!e.videos)return t();e.videos.forEach((function(e){i.push({quality:e.name,url:e.url,title:n})}))}if("ugc"===e.provider){if(n=e.meta?e.meta.title:void 0,!e.videos)return t();e.videos.forEach((function(e){i.push({quality:e.key,url:e.url,title:n})}))}return"pladform"===e.provider?(n=e.meta?e.meta.title:void 0,void a.a.sendMessage({action:"getPladformVideo",extVideoId:{playerId:e.meta.playerId,videoId:e.meta.videoId}},(function(e){if(!e)return t();var a=e.links;if(!a)return t();a.forEach((function(e){"object"==typeof e&&void 0===e.title&&(e.title=n)})),t(e)}))):0===i.length?t():t({links:i})},getFlashVars:function(e){if(e){var t=e.querySelector('param[name="flashvars"]');if(t){var n=t.value,a=Object(s.a)(n,{params:!0});return a.metadataUrl?{metadataUrl:a.metadataUrl}:void 0}}},matchUrl:function(e){var t=e.match(/\/([^\/]+)\/([^\/]+)\/video\/(.+).html/);return t||(t=e.match(/embed\/([^\/]+)\/([^\/]+)\/(.+).html/)),t},getVideoId:function(e){"OBJECT"!==e.tagName&&(e=e.querySelector('object[name="b-video-player"]'));var t=this.getFlashVars(e);if(t)return t;var n=document.querySelector('[data-type="album-json"]');if(n)try{if((n=JSON.parse(n.textContent)).signVideoUrl)return{metadataUrl:n.signVideoUrl}}catch(e){}var a=this.matchUrl(location.pathname);return a?{metadataUrl:"http://api.video.mail.ru/videos/"+a[1]+"/"+a[2]+"/"+a[3]+".json"}:void 0},getVideoContentVideoId:function(e){var t=null,n=e.querySelector(".sp-video__item-page-new__share__item[data-share-type][data-location]");return n&&(t={url:n.dataset.location}),t},insertBtnInPage:function(e,t,n){e.metadataUrl?(e.metadataUrl=decodeURIComponent(e.metadataUrl),C.domCache[C.btnIndex]={metadataUrl:e.metadataUrl}):C.domCache[C.btnIndex]=Object.assign({},e),C.appendPageBtn(t,C.btnIndex,n),C.btnIndex++},insertBtnInPopup:function(e,t){e.metadataUrl&&(e.metadataUrl=decodeURIComponent(e.metadataUrl),C.domCache[C.btnIndex]={metadataUrl:e.metadataUrl}),C.appendBtn(t,C.btnIndex),C.btnIndex++},rmBtn:function(){for(var e,t=document.querySelectorAll("."+C.className),n=0;e=t[n];n++)e.parentNode.removeChild(e)}}}))}});