/*
##
##  Enhancer for YouTube™
##  =====================
##
##  Author: Maxime RF <https://www.mrfdev.com>
##
##  This file is protected by copyright laws and international copyright
##  treaties, as well as other intellectual property laws and treaties.
##
##  All rights not expressly granted to you are retained by the author.
##  Read the license.txt file for more details.
##
##  © MRFDEV.com - All Rights Reserved
##
*/
(function(){chrome.runtime.onInstalled.addListener(function(c){"install"===c.reason?(chrome.runtime.openOptionsPage(),chrome.tabs.create({url:"https://www.mrfdev.com/event?n=install&b=chrome&e=enhancer-for-youtube&v="+chrome.runtime.getManifest().version,active:!0}),chrome.storage.local.set({date:Date.now(),update:Date.now()}),chrome.tabs.query({url:"*://www.youtube.com/*"},function(b){b.forEach(function(a){chrome.scripting.executeScript({target:{tabId:a.id},files:["start.js","content.js"]})})})):
"update"===c.reason&&/2\.0\.(10[3-9]|11[0-9]|12[0-1])/.test(c.previousVersion)?chrome.storage.local.get({controls:"loop reverse-playlist volume-booster whitelist not-interested cards-end-screens cinema-mode size pop-up-player speed video-filters screenshot keyboard-shortcuts options".split(" "),themevariant:"youtube-deep-dark.css"},function(b){b.controls=b.controls.filter(a=>"whitelist"!==a&&"not-interested"!==a);"youtube-deep-dark-youtube-light.css"===b.themevariant&&(b.themevariant="youtube-deep-dark.css");
b.reload=!0;b.update=Date.now();chrome.storage.local.set(b);chrome.storage.local.remove(["blockads","blockadsexceptforsubs","whitelist"])}):"update"===c.reason&&/2\.0\.124/.test(c.previousVersion)&&chrome.storage.local.set({update:Date.now(),whatsnew:!0});"update"===c.reason&&chrome.tabs.query({url:"*://www.youtube.com/*"},function(b){b.forEach(function(a){chrome.scripting.executeScript({target:{tabId:a.id},files:["start.js","content.js"]})})})});chrome.runtime.setUninstallURL("https://www.mrfdev.com/event?n=uninstall&b=chrome&e=enhancer-for-youtube&v="+
chrome.runtime.getManifest().version);chrome.runtime.onMessage.addListener(function(c,b,a){a=c.request;if("init"===a)chrome.scripting.executeScript({target:{tabId:b.tab.id},func:(d,f,k)=>{var h=window.efyt||{};h.prefs=d;h.reload=d.reload;h.resources=f;h.version=k;window.efyt=h;window.Polymer&&(d=document.createElement("script"),d.src=f+"/youtube-polymer.js",document.head.appendChild(d),d.remove())},args:[c.prefs,chrome.runtime.getURL("resources"),chrome.runtime.getManifest().version],world:"MAIN",
injectImmediately:!0});else if("get-messages"===a){var e=chrome.i18n.getMessage("locale_code"),g="boost_volume brightness cinema_mode color_inversion contrast custom_script expand flip_horizontally flip_vertically gaussian_blur grayscale hue_rotation keyboard_shortcuts loop loop_end loop_start message options pop_up_player reset reverse_playlist saturation screenshot sepia shrink speed stop toggle_visibility video_filters".split(" ");chrome.storage.local.get({localecode:e,whatsnew:!1},function(d){var f=
{};if(e===d.localecode){for(var k=g.length-1;0<=k;k--)f[g[k]]=chrome.i18n.getMessage(g[k]);chrome.tabs.sendMessage(b.tab.id,{message:"set-messages",messages:f})}else fetch(`_locales/${d.localecode}/messages.json`).then(function(h){return h.json()}).then(function(h){for(var l=g.length-1;0<=l;l--)f[g[l]]=h[g[l]].message;chrome.tabs.sendMessage(b.tab.id,{message:"set-messages",messages:f})});d.whatsnew&&(chrome.storage.local.remove("whatsnew"),chrome.tabs.create({url:"whats-new.html",active:!0}),chrome.tabs.query({url:"*://www.youtube.com/*"},
function(h){h.forEach(function(l){chrome.tabs.sendMessage(l.id,{message:"pause-video"})})}))})}else"pause-videos"===a?chrome.tabs.query({url:"*://www.youtube.com/*"},function(d){d.forEach(function(f){b.tab.id!==f.id&&chrome.tabs.sendMessage(f.id,{message:"pause-video"})})}):"set-cookie"===a?chrome.cookies.set({url:c.url,name:c.name,value:c.value,domain:".youtube.com",path:"/",expirationDate:Math.floor(Date.now()/1E3)+31556926}):"convert-short"===a?chrome.tabs.update(b.tab.id,{url:b.tab.url.replace("shorts/",
"watch?v=")}):"pop-up-player"===a?chrome.windows.create(c.options,function(d){chrome.windows.update(d.id,{drawAttention:!0})}):"configure-keyboard-shortcuts"===a?chrome.tabs.create({url:"chrome://extensions/shortcuts",active:!0}):"keyboard-shortcuts"===a?chrome.tabs.create({url:"https://www.mrfdev.com/youtube-keyboard-shortcuts",active:!0}):"always-on-top"===a?chrome.tabs.create({url:"https://www.mrfdev.com/always-on-top",active:!0}):"custom-script"===a?chrome.storage.local.get({customscript:""},
function(d){chrome.scripting.executeScript({target:{tabId:b.tab.id},func:f=>{var k=document.createElement("script");k.textContent=f;document.head.appendChild(k)},args:[d.customscript],world:"MAIN",injectImmediately:!0})}):"dark-theme-off"===a?chrome.storage.local.get({darktheme:!1},function(d){d.darktheme&&chrome.storage.local.set({darktheme:!1})}):"options-page"===a?chrome.runtime.openOptionsPage():"content-scripts"===a&&chrome.scripting.executeScript({target:{tabId:b.tab.id},files:["start.js","content.js"]})});
chrome.storage.onChanged.addListener(function(c,b){for(const a in c)"undefined"!==typeof c[a].newValue&&("customscript"!==a&&"popuplayersize"!==a&&chrome.tabs.query({url:"*://www.youtube.com/*"},function(e){e.forEach(function(g){chrome.tabs.sendMessage(g.id,{message:"preference-changed",name:a,value:c[a].newValue})})}),"disableautoplay"===a&&chrome.cookies.get({url:"https://www.youtube.com",name:"PREF"},function(e){e=e?e.value.split("&"):[];var g=e.findIndex(function(d){return/f5=[\w\d]+/.test(d)});
-1===g&&(g=e.length);e[g]=!0===c[a].newValue?"f5=30000":"f5=20000";chrome.cookies.set({url:"https://www.youtube.com",name:"PREF",value:e.join("&"),domain:".youtube.com",path:"/",expirationDate:Math.floor(Date.now()/1E3)+31556926})}))});chrome.commands.onCommand.addListener(function(c){var b={"c070-toggle-loop":"loop","c080-stop-video":"stop","c090-reverse-playlist":"reverse-playlist","c100-toggle-volume-booster":"volume-booster","c130-toggle-annotations":"cards-end-screens","c140-toggle-cinema-mode":"cinema-mode",
"c150-toggle-player-size":"size","c160-center-video-player":"size","c170-pop-up-player":"pop-up-player","c180-decrease-speed":"speed-minus","c190-increase-speed":"speed-plus","c200-default-speed":"speed","c210-normal-speed":"speed","c220-toggle-video-filters":"video-filters","c230-flip-horizontally":"flip-horizontally","c240-flip-vertically":"flip-vertically","c250-take-screenshot":"screenshot","c260-keyboard-shortcuts":"keyboard-shortcuts","c270-custom-script":"custom-script"};switch(c){case "c000-options-page":chrome.runtime.openOptionsPage();
break;case "c020-theme-youtube-dark":chrome.storage.local.set({darktheme:!0,theme:"default-dark"});break;case "c030-theme-youtube-deep-dark":chrome.storage.local.set({darktheme:!0,theme:"youtube-deep-dark"});break;case "c040-theme-youtube-deep-dark-custom":chrome.storage.local.set({darktheme:!0,theme:"youtube-deep-dark-custom"});break;case "c050-theme-custom-theme":chrome.storage.local.get({customtheme:!1},function(a){chrome.storage.local.set({customtheme:!a.customtheme})});break;default:chrome.tabs.query({lastFocusedWindow:!0,
active:!0},function(a){chrome.tabs.sendMessage(a[0].id,{message:"command",command:c,control:b[c]?b[c]:""})})}});chrome.action.onClicked.addListener(function(c){chrome.runtime.openOptionsPage()});chrome.storage.local.get({disableautoplay:!1,theatermode:!1},function(c){c.disableautoplay&&chrome.cookies.get({url:"https://www.youtube.com",name:"PREF"},function(b){b=b?b.value.split("&"):[];var a=b.findIndex(function(e){return/f5=[\w\d]+/.test(e)});-1===a&&(a=b.length);b[a]="f5=30000";chrome.cookies.set({url:"https://www.youtube.com",
name:"PREF",value:b.join("&"),domain:".youtube.com",path:"/",expirationDate:Math.floor(Date.now()/1E3)+31556926})});c.theatermode&&chrome.cookies.set({url:"https://www.youtube.com",name:"wide",value:"1",domain:".youtube.com",path:"/",expirationDate:Math.floor(Date.now()/1E3)+31556926});chrome.tabs.query({url:"*://www.youtube.com/*"},function(b){b.forEach(function(a){chrome.scripting.executeScript({target:{tabId:a.id},files:["init.js"]})})})})})();