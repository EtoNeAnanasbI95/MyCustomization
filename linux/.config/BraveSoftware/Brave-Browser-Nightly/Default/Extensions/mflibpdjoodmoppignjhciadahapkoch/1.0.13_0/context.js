'use strict';
((d, id, w = this,
run = {
	o: t => {
		if(~t.indexOf('audio_api_unavailable')){
			let e = t.split('?extra=')[1].split('#')
			,	 o = '' === e[1] ? '' : run.a(e[1]);
			if(e = run.a(e[0]), 'string' != typeof o || !e)return t;
			o = o ? o.split(String.fromCharCode(9)) : [];
			for(let s, r, n = o.length; n--;){
				if(r = o[n].split(String.fromCharCode(11)), s = r.splice(0, 1, e)[0], !run.l[s])return t;
				e = run.l[s].apply(null, r);
			}
			if(e && 'http' == e.slice(0,4))
				return e
		}
		return t
	},
	r: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=',
	a: (t, e='') => {
		if(!t || t.length%4 == 1) return false;
		for(let n, i, o=0, a=0; i=t.charAt(a++);)
			i = run.r.indexOf(i),
			~i && (n=o%4 ? 64*n+i : i, o++ % 4) && (e+=String.fromCharCode(255 & n >> (-2*o & 6)));
		return e
	},
	s: (t, e) => {
		let i=t.length, a=i, o=[];
		if(i)for(e = Math.abs(e); a--;)e=(i*(a+1)^e+a)%i, o[a]=e;
		return o
	},
	l: {
		v: t => t.split('').reverse().join(''),
		r: (t, e) => {
			t = t.split('');
			for(let i, o=run.r+run.r, a=t.length; a--;)i = o.indexOf(t[a]), ~i && (t[a] = o.slice(i-e,1));
			return t.join('')
		},
		s: (t, e) => {
			let i = t.length;
			if(i){
				let o = run.s(t, e), a=0;
				for(t = t.split(''); ++a<i;)t[a] = t.splice(o[i-1-a], 1, t[a])[0];
				t = t.join('')
			}
			return t
		},
		i: (t, e) => run.l.s(t, e^id),
		x: (t, e) => {
			let i = [];
			return e = e.charCodeAt(0), t.split('').forEach(o => i.push(String.fromCharCode(o.charCodeAt(0)^e))), i.join('')
		}
	}
},

init = () => {
	let b = d.body
	,	st = d.createElement('style')
	,	hls = d.createElement('script');
	st.textContent = '.audio_row:not(.audio_claimed):hover .audio_row__info {position: relative; margin-right: 29px} .audio_row:not(.audio_claimed):hover .audio_player__place {padding-right: 29px}'
	+'.audioSize:before {content: attr(data-size); display: none; position: absolute; right: 27px; width: 130px; padding: 2px 5px; background-color: var(--n15, var(--vkui--color_background_content)); border: 1px solid var(--vkui--color_separator_primary); border-radius: 6px; color: var(--vkui--color_text_primary); font-size: 13px; line-height: 20px; text-align: center; white-space: break-spaces}'
	+'.audioSize {display: none; align-items: center; position: absolute; top: 0; right: -24px; width: 24px; height: 100%; z-index: 1}'
	+'.audioSize[href] {color: var(--vkui--color_text_secondary)}'
	+'.audioSize:hover:before, .audio_row:hover .audioSize {display:grid}'
	+'.audioSize svg {opacity: 0.85}'
	+'.audioSize:hover svg {opacity: 1}';
	b.append(st, hls);

	hls.src = '/dist/'+Object.keys(w.stVersions||{}).filter(e=>/\/hls/.test(e))[0], hls.onload = init.hls = () => !w.Hls && Object.keys(w).filter(e=>/webpack/.test(e)&&Array.isArray(w[e])).map(e=>w[e]).flat().forEach(e=>{if(e[1])for(let i in e[1])~e[1][i].toString().indexOf('hls.js config')&&(e[1][i](e,i,{d:(a,t)=>e=t,r:e=>e}),e.default&&(w.Hls=e.default()))});

	let k = d.head.textContent.match(/id: ?([0-9]+)/i);
	if(k && k[0])id = +k[1];

	findNode(b);
	new MutationObserver(e => {
		e.forEach(e => e.type == 'childList' && e.addedNodes.forEach(e => (e.nodeType == 1 || e.nodeType == 9) && findNode(e)));
		clearTimeout(k); k = setTimeout(() => id && !w.st && w.cur && /audio|feed/.test(cur.module) && context(cur), 50)
	}).observe(b, {childList:true, subtree:true})
},
context = e => {
	let h = /news|recommended/.test(e.section) && w.feed_rows, s = 'yaContextCb', f = (p,s,c) => s.forEach((e,i) => c.sheet.insertRule('#'+p+e, i)),
	r = (i,d) => (w[s] = w[s] || (w.AdsLight && AdsLight.initYaDirect(), [])).push(() => Ya.Context.AdvManager.render({blockId:'R-A-'+843079*2+~d,renderTo:i})),
	v = w.narrow_column || e.submodule == 'my' && d.querySelector('.CatalogSection__stickyColumn');

	if(h && !w[e.h]){
		e.h = 'p'+Math.random().toString(16).slice(2);
		let a = d.createElement('div'), p = d.createElement('div'), c = d.createElement('style'), s = ['{width:'+ h.offsetWidth +'px!important;overflow:clip!important}'];
		a.className = 'feed_row'; p.className = 'page_block'; p.id = e.h;
		a.append(p, c); h.insertBefore(a, h.children[1]); r(p.id, 0);
		f(p.id,s,c)
	}
	if(v && new Date>(localStorage.VBT||'') && !w[e.v]){
		e.v = 'p'+Math.random().toString(16).slice(2);
		let a = d.createElement('div'), p = d.createElement('div'), x = d.createElement('div'), c = d.createElement('style'), s = ['{min-height:250px!important;overflow:clip!important}', '+div{background:#3338 url(\'data:image/svg+xml,<svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><path d="M5 5l5 5m0-5l-5 5" stroke="white" stroke-linecap="round"/></svg>\');backdrop-filter:blur(5px);padding:12px;position:absolute;top:4px;right:'+ ( h ? 4 : -8 ) +'px;border-radius:50%;opacity:0;transition:.2s;z-index:2}', ':hover+div{opacity:1}', '+div:hover{opacity:1;cursor:pointer}', '>*{width:calc(100% + 2px)!important;height:calc(100% + 2px)!important;margin:-1px!important;display:block!important}'];
		h && (p.className='page_block'); p.id=e.v;
		a.append(c,p,x); a.style.position='relative'; v.append(a); r(p.id, 1);
		x.addEventListener('click', () => {localStorage.VBT=+new Date+432e5; a.remove()});
		f(p.id,s,c); s = v.querySelector('[data-type=placeholder]'); s && s.parentElement.remove()
	}
},

findNode = e => {
	if(e.classList && e.classList.contains('audio_row'))
		return updateNode(e);

	e.querySelectorAll('.audio_row').forEach(updateNode)
},
updateNode = e => {
	if(e.A || e.classList.contains('audio_claimed'))return;

	let a = d.createElement('a'), b = getInfo(e), save = b => {a.dataset.size = a.size, a.href = URL.createObjectURL(new Blob(b)), a.click()};

	a.className = 'audioSize';
	a.dataset.size = 'load...';
	a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path stroke="currentColor" stroke-linecap="round" d="M5 2v0m0 1.5v0m0 1.5v3.5m0 0 2-2m-4 0 2 2"/></svg>';

	a.addEventListener('mouseenter', e => {
		if(a.dataset.size.slice(-3) == '...')getUrl(b.ids, u => {
			if(!u)return a.dataset.size = 'try wait...';
			a.download = b.name; a.url = u.url;
			if(u.size)getSize(a, u.size, b.duration);
			else if(w.Hls && Hls.isSupported()){
				let hls = new Hls(), audio = d.createElement('audio'), frag, data = [], frags, cut, media_err = 0, duration,
				clear = e => {e && (a.dataset.size = 'error...'); hls.stopLoad(); hls.destroy()};
				hls.on(Hls.Events.MANIFEST_PARSED, (e, d) => {d = d.levels[0].details; frags = d.fragments.length; duration = d.totalduration});
				hls.on(Hls.Events.BUFFER_CODECS, (e, d) => cut = d.audio && d.audio.container == 'audio/mp4');
				hls.on(Hls.Events.BUFFER_APPENDING, (e, d) => frag = d.data);
				hls.on(Hls.Events.FRAG_BUFFERED, (e, d) => {
					if(!a.start && frag)return hls.detachMedia(), a.load = () => hls.attachMedia(audio), getSize(a, frag.length/d.frag.duration*duration, duration);
					if(frag)data.push(cut ? frag.slice(8, frag.length) : frag);
					audio.currentTime = d.frag.start + d.frag.duration;
					getStep(a, data.length, frags);
					if(data.length >= frags)clear(), save(data)
				});
				hls.on(Hls.Events.ERROR, (e, d) => {
					if(d.details == 'bufferFullError' || d.details == 'fragLoadError')return clear(e);
					if(d.type == Hls.ErrorTypes.MEDIA_ERROR && media_err<2){if(++media_err > 1)hls.swapAudioCodec();return hls.recoverMediaError()}
					clear(e)
				});
				hls.loadSource(a.url);
				hls.attachMedia(audio)
			}
		}),init.hls()
	});
	a.addEventListener('click', async e => {
		e.stopPropagation();
		if(e.isTrusted && a.size && !a.href){
			e.preventDefault();
			if(a.load)a.start=1, a.load();
			else {
				let r = await fetch(a.url)
				,	b = r.body.getReader()
				,	l = +r.headers.get('Content-Length')
				,	p = 0
				,	c = [];
				while(true){
					let {done, value} = await b.read();
					if(done)break;
					c.push(value);
					getStep(a, p += value.length, l)
				}
				save(c)
			}
		}
	});
	e.querySelector('.audio_row__info').append(a);e.A=1
},
get = (url, m, h) => {
	let g = new XMLHttpRequest();
	g.open(m ? 'post' : 'head', url, true);

	if(m)g.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'),
		g.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

	g.onreadystatechange = () => g.readyState == 4 && h(g);
	g.send(m)
},
getInfo = e => {
	if(e.dataset.audio){
		let a = JSON.parse(e.dataset.audio)
		,	 b = '';
		if(a[13]){
			let c = a[13].split('/');
			b = a[1]+'_'+a[0]+'_'+c[ c[1].length==0?2:3 ] +'_'+c[5]
		}
		return {
			name: getName(a[4]+' - '+a[3]+(a[16]?' ('+a[16]+')':'')),
			duration: a[5],
			ids: b
		}
	}
},
getUrl = (ids, h) => {
	get('/music', 'act=reload_audio&al=1&ids='+ids, j => {
		j = JSON.parse(j.responseText);
		if(j && j.payload && j.payload[1] && j.payload[1][0] && typeof j.payload[1][0][0] != 'string'){
			let a = j.payload[1][0][0],
			b = run.o(a[2]),
			c = {url: b}, d;
			if(/\.m3u8\?/.test(b)){
				let l = (d = b.replace('/index.m3u8', '.mp3')).split('/')
				,	 u = ~d.indexOf('audios') ? 1 : 0;
				l.splice(l.length - (2 + u), 1), d = l.join('/');
				get(d, '', s => {if(!/text|null/.test(s.getResponseHeader('Content-Type')))c.url = d, c.size = s.getResponseHeader('Content-Length'); h(c)})
			} else h(c)
		} else h()
	})
},
getSize = (a, b, t) => {
	let k = 1024, s = Math.floor(Math.log(b)/Math.log(k));
	a.dataset.size = a.size = Math.min(32 * Math.round(b / 4096 / t), 320)+'kbs - ' + (b?(b/Math.pow(k,s)).toFixed(2)+' '+['B','KB','MB','GB'][s]:'0 B')
},
getStep = (a, b, c) => a.dataset.size = 'load' + '.'.repeat(new Date / 1000 % 4).padEnd(3) + '    ' + (b/c*100).toFixed() + '%',
getName = n => {
	n = n.replace(/&#([0-9]{2,5});/g, (a, num) => String.fromCharCode(+num));	//chineses char decoder
	let e = d.createElement('div'); e.innerHTML = n;	//html decoder
	return e.textContent.replace(/[\/:*?"<>|~]/g,'').replace(/[_\s]+/g,' ').trim() + '.mp3'
}) =>
d.readyState == 'loading' ? d.addEventListener('DOMContentLoaded',init) : init())(document)