!function(n,t){function e(){}const o=t?[].concat(n).concat(t):[n];try{(function(n){var t=function(n,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=e.callback,c=e.ctx;"function"==typeof o&&(o=void 0!==c?o.bind(c):o,setTimeout((function(){return o()})))},o={addFileExtension:e,extLink:t,file:t,getClientID:function(n,t){t&&setTimeout(t(null))},hit:t,notBounce:t,params:e,reachGoal:function(n,e,o,c,a){t(null,null,{callback:c,ctx:a})},setUserID:e,userParams:e,destruct:e};function c(n,t){for(var e=arguments.length,c=new Array(e>2?e-2:0),a=2;a<e;a++)c[a-2]=arguments[a];return o[t]&&o[t](n,...c)}void 0===window.ym?(window.ym=c,c.a=[]):window.ym&&window.ym.a&&(c.a=window.ym.a,window.ym=c,window.ym.a.forEach((function(n){var t;t=n[0],window["yaCounter".concat(t)]=o,document.dispatchEvent(new Event("yacounter".concat(t,"inited")))}))),function(n){if(!0===n.verbose){try{var t=console.log.bind(console),e=console.trace.bind(console),o=n.ruleText||"";if(n.domainName){var c,a="#%#//",i="##+js";n.ruleText.includes(a)?c=n.ruleText.indexOf(a):n.ruleText.includes(i)&&(c=n.ruleText.indexOf(i));var r=n.ruleText.slice(c);o="".concat(n.domainName).concat(r)}t("".concat(o," trace start")),e&&e(),t("".concat(o," trace end"))}catch(n){}"function"==typeof window.__debug&&window.__debug(n)}}(n)}).apply(this,o)}catch(n){console.log(n)}}({name:"metrika-yandex-tag",args:[]},[]);