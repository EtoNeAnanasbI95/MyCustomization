!function(e,n){function t(){return""}function c(){return[]}const i=n?[].concat(e).concat(n):[e];try{(function(e){var n=function(e){if("function"==typeof e)try{e.call()}catch(e){}},i={addAdUnits(){},adServers:{dfp:{buildVideoUrl:t}},adUnits:[],aliasBidder(){},cmd:[],enableAnalytics(){},getHighestCpmBids:c,libLoaded:!0,que:[],requestBids(e){if(e instanceof Object&&e.bidsBackHandler)try{e.bidsBackHandler.call()}catch(e){}},removeAdUnit(){},setBidderConfig(){},setConfig(){},setTargetingForGPTAsync(){}};i.cmd.push=n,i.que.push=n,window.pbjs=i,function(e){if(!0===e.verbose){try{var n=console.log.bind(console),t=console.trace.bind(console),c=e.ruleText||"";if(e.domainName){var i,o="#%#//",a="##+js";e.ruleText.includes(o)?i=e.ruleText.indexOf(o):e.ruleText.includes(a)&&(i=e.ruleText.indexOf(a));var d=e.ruleText.slice(i);c="".concat(e.domainName).concat(d)}n("".concat(c," trace start")),t&&t(),n("".concat(c," trace end"))}catch(e){}"function"==typeof window.__debug&&window.__debug(e)}}(e)}).apply(this,i)}catch(e){console.log(e)}}({name:"prebid",args:[]},[]);