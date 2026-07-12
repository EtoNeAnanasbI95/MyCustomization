let m,em,er,
mf=chrome.runtime.getManifest(),
vk={url:mf.permissions.slice(0,2)},
menu=(t,h)=>chrome.contextMenus.create({title:chrome.i18n.getMessage(t),contexts:['browser_action'],onclick:h}),
icon=e=>{
	chrome.browserAction.setTitle({title:mf.short_name+': '+chrome.i18n.getMessage(['on','off','err'][e])});
	if(icon[e])chrome.browserAction.setIcon({path:icon[e]});else{
		let i=new Image(), c=document.createElement('canvas'), x=c.getContext('2d'), s=16*devicePixelRatio;c.height=c.width=s;
		i.src=URL.createObjectURL(new Blob(['<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><mask id="a"><circle cx="24" cy="24" r="24" fill="#fff"/></mask><linearGradient id="b" x1="1" x2="0" y1="0" y2="1"><stop offset=".1" stop-color="#7A00F4"/><stop offset=".5" stop-color="#0038F2"/><stop offset=".9" stop-color="#00F9F9"/></linearGradient><linearGradient id="c" x1="0" x2="1" y1="0" y2="1"><stop offset=".1" stop-color="#00F9F9"/><stop offset=".5" stop-color="#00EF33"/><stop offset=".9" stop-color="#FF0"/></linearGradient><linearGradient id="d" x1="1" x2="0" y1="0" y2="1"><stop offset=".1" stop-color="#F70000"/><stop offset=".5" stop-color="#FF6A00"/><stop offset=".9" stop-color="#FF0"/></linearGradient><linearGradient id="e" x1="0" x2="1" y1="0" y2="1"><stop offset=".1" stop-color="#7A00F4"/><stop offset=".5" stop-color="#EA00A8"/><stop offset=".9" stop-color="#F70000"/></linearGradient><g mask="url(#a)"><path fill="'+ (e?'url(#b)':'#2787F5') +'" d="M0 0h24v24H0"/><path fill="'+ (e?'url(#c)':'#2787F5') +'" d="M0 24h24v24H0"/><path fill="'+ (e?'url(#d)':'#2787F5') +'" d="M24 24h24v24H24"/><path fill="'+ (e?'url(#e)':'#2787F5') +'" d="M24 0h24v24H24"/></g><circle cx="24" cy="24" r="'+ (e?'21':'0') +'" fill="#222"/>'+ (e==2?'<path stroke="#fff" stroke-width="4" stroke-linecap="square" d="M10 16v18h6m-2-9h1m-1-9h2m7 8h4m-4 0v10m11-10h4m-4 0v10"/>':'<path fill="#fff" d="M7.6 18.2a2.9 2.4 70 0 1 4.6-1.9c1.8 4.5 5 14.5 11.2 14.7a2.9 2.4 0 0 1 0 5c-2.8 0-9.4.3-15.8-17.8m13.9-.9a2.5 3 0 0 1 5 0v5c.2 1.4 2 1.1 7.7-6.6a2.9 2.4-60 0 1 4 3c-5.5 7.8-9 9.8-11.7 9.8q-5 0-5-6m10.8 9.9a2.9 2.4 40 0 1 4-3q1 1 1.9 2.3a2.9 2.4 50 0 1-4 3l-1.9-2.3"/>') +'</svg>'],{type:'image/svg+xml'}));
		i.onload=()=>{x.drawImage(i,0,0,s,s);URL.revokeObjectURL(i.src);icon[e]=c.toDataURL();chrome.browserAction.setIcon({path:icon[e]})}
	}
},
j=(e,k)=>chrome.tabs.query(vk,t=>(k==1?[t[0]]:k?t.filter(t=>k==t.id):t).forEach(t=>chrome.tabs.executeScript(t.id,{code:`(s=>{s.textContent="${e}";document.head.append(s);s.remove()})(document.createElement('script'))`}))),
t=e=>{
	let v,c=(a='',b='')=>{a=a.split('.');b=b.split('.');for(let i=0,m=Math.max(a.length,b.length);i<m;i++){let n=+a[i]||0,o=+b[i]||0;if(o>n)return 0;if(n>o)return 1}return 0},o={mode:m=e?e.mode!=undefined?e.mode:1:+!m};
	e?(em=e.em<=0, c(mf.version,e.v)&&(o.v=mf.version,o.C=0,j('location.reload()')), menu('reset',()=>j('window.st?st.ss():(localStorage.clear(),sessionStorage.clear(),location.reload())')), menu('appReset',()=>{j('localStorage.clear(),sessionStorage.clear(),indexedDB.deleteDatabase(`st`)',1);setTimeout(e=>{chrome.storage.local.clear();chrome.storage.sync.clear();chrome.contextMenus.removeAll();chrome.runtime.reload()},100)})):j('window.st?st.m('+ m +'):location.reload()');
	icon(er?2:m);chrome.storage.local.set(o);chrome.storage.sync.set(o)
};
chrome.storage.local.get(null,a=>{a&&a.v?t(a):chrome.storage.sync.get(null,e=>e&&t(e)),er=!a});
chrome.browserAction.onClicked.addListener(()=>er?er=chrome.tabs.create({url:'https://vk.com/@2style-err'},()=>icon(m)):chrome.tabs.query(vk,e=>e[0]?e.find(e=>e.active)?t():chrome.tabs.update(e[0].id,{active:true}):chrome.tabs.create({url:'https://vk.com',index:0})));
chrome.commands.onCommand.addListener((e,t)=>e=='eye'?chrome.permissions.request({permissions:['activeTab']},()=>chrome.tabs.captureVisibleTab(e=>j(`st.eye('${e}')`,t.id))):j(`st.k('${e}')`,1));
chrome.runtime.setUninstallURL('https://vk.com/@2style-uninstall');