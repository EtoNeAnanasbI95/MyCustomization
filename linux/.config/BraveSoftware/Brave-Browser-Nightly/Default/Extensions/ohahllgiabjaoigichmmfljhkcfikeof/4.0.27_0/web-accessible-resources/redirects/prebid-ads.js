!function(e,n){const c=n?[].concat(e).concat(n):[e];try{(function(e){window.canRunAds=!0,window.isAdBlockActive=!1,function(e){if(!0===e.verbose){try{var n=console.log.bind(console),c=console.trace.bind(console),o=e.ruleText||"";if(e.domainName){var t,a="#%#//",i="##+js";e.ruleText.includes(a)?t=e.ruleText.indexOf(a):e.ruleText.includes(i)&&(t=e.ruleText.indexOf(i));var d=e.ruleText.slice(t);o="".concat(e.domainName).concat(d)}n("".concat(o," trace start")),c&&c(),n("".concat(o," trace end"))}catch(e){}"function"==typeof window.__debug&&window.__debug(e)}}(e)}).apply(this,c)}catch(e){console.log(e)}}({name:"prebid-ads",args:[]},[]);