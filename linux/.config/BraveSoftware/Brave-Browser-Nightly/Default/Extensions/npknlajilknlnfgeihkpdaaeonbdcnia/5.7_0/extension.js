/* author jibril https://vk.com/downloadpc */

/*

Request URL: https://vk.com/al_video.php?act=show
Request Method: POST

act: show
al: 1
al_ad: 0
autoplay: 1
force_no_repeat: 1
list: 
module: profile_own_videos
playlist_id: 13069493_1
show_next: 1
video: -109658801_456257908

*/



(function() {
	
	
    var downloader = {
        download: function(f, e, g) {

        	downloader.isLock = true;

            var h = new XMLHttpRequest;
            h.crossDomain = true;
            h.responseType = "blob";
            h.addEventListener("loadstart", function(i) {
                g(0)
            });
            h.addEventListener("progress", function(i) {
                if (i.lengthComputable) {
                    let j = Math.round(i.loaded / i.total * 100);

                    j = j + "% " + app.bytesToStr(i.loaded);
                    g(j)
                }
            });
            h.addEventListener("load", function(j) {
                console.log(this.response);
                var i = window.URL.createObjectURL(new window.Blob([this.response], {
                    type: "octet/stream"
                }));
                P = document.createElement("a");
                P.href = i;
                P.download = e;
                document.body.appendChild(P);
                P.click();
                document.body.removeChild(P);
                window.URL.revokeObjectURL(i)

				downloader.isLock = false;
            });
            h.method = "GET";
            h.url = f;
            h.open("GET", f, true);
            h.send();
            return 0
        },

		arrayConcatDefault: function (inputArray) {
            let totalLength = inputArray.reduce(function (prev, cur) { return prev + cur.length; }, 0);
            let result = new Uint8Array(totalLength);
            let offset = 0;
            inputArray.forEach(function (element) {
                result.set(element, offset);
                offset += element.length;
            });
            return result;
        },

		isLock: false,

		num_file: 0,
		saveBlob: function(data, name)
        {
            name = downloader.num_file.toString() + "_" + name;
            downloader.num_file++;

            let blob = new Blob([data], {
                type: 'application/octet-stream'
            });

            let win_blob = window.URL.createObjectURL(blob);

            console.log(win_blob);


            let el = document.createElement("a");
            el.href = win_blob;
            el.download = name;
            document.body.appendChild(el);
            el.click();
            document.body.removeChild(el);
            window.URL.revokeObjectURL(win_blob);
        },


		downloadHlsVK: function(data, name, progressLabel) {

			var video = document.createElement('video');
			video.id = "for_find";
			video.style.display = "none";
			document.body.append(video);

			downloader.isLock = true;

			var fmp4Data = {audio: [], video: []};

			let file_len = 0;


			if(Hls.isSupported()) {
				var hls = new Hls();
				hls.loadSource(data.url);
				hls.attachMedia(video);
				hls.startLoad();

				var duration = data.duration;
				console.log(duration);
				//console.log(hls);
				//return false;

				let len_mp3 = 0;
				let len_mp4 = 0;

				hls.on(Hls.Events.BUFFER_APPENDING, function (event, data) {

                    let type = data.type;
                    let bytes = data.data;
                    let len = data.data.length;

                    if(type == "video")
                    {
                        len_mp4 += len;
                    }
                    if(type == "audio")
                    {
                        len_mp3 += len;
                    }

					file_len += len;


					if(len_mp4 > 2147483647) //2147483647
					{
					    console.log("save mp4");
					    let data = downloader.arrayConcatDefault(fmp4Data[type]);
					    downloader.saveBlob(data, name + ".mp4");
					    fmp4Data[type] = [];
					    len_mp4 = len;

					}

					if(len_mp3 > 2147483647)
                    {
                        console.log("save mp3");
                         let data = downloader.arrayConcatDefault(fmp4Data[type]);
                        downloader.saveBlob(data, name + ".mp3");
                        fmp4Data[type] = [];
                        len_mp3 = len;

                    }

					fmp4Data[type].push(bytes);


				});

                let is_end = false;
				hls.on(Hls.Events.BUFFER_EOS, function() {

                    if(is_end == true)
                    {
                        return false;
                    }
                    is_end = true;
					console.log("end");


					let data = downloader.arrayConcatDefault(fmp4Data["video"]);
                    downloader.saveBlob(data, name + ".mp4");


                    data = downloader.arrayConcatDefault(fmp4Data["audio"]);
                    downloader.saveBlob(data, name + ".mp3");

					delete fmp4Data;

					progressLabel.innerText = "Loading: 100% ok!";
					downloader.isLock = false;
					//alert("Обязательно нажми F5 или перезагрузи страницу, а то начнутся лаги, так же совместите конвертором mp4 и mp3 файл.");

				});

				let prevTime = -1;
				hls.on(Hls.Events.FRAG_LOADING, function(e, be) {
					if(is_end == true)
					{
						return false;
					}


					//return false;
					if(be.frag)
					{
						//console.log(be.frag);

						let time = be.frag.start;


						if(duration > time - 10)
						{
							video.currentTime = time + 1;

							let progress = 100 * time / duration;
							console.log(progressLabel.innerText);
							progressLabel.innerText = "Loading: " + parseInt(progress, 10) + "% " + parseInt(file_len / 1024 / 1024) + "MB";

							if(prevTime != time)
							{
								prevTime = time;
							} else {
								if(progress >= 95)
								{
									console.log(prevTime + " = " + time);
									progress = 100;
								}
							}

                            let intPro = parseInt(progress, 10);
							if(intPro == 100)
							{

								is_end = true;

                                console.log("endFrag");


                                let data = downloader.arrayConcatDefault(fmp4Data["video"]);
                                downloader.saveBlob(data, name +  ".mp4");



                                data = downloader.arrayConcatDefault(fmp4Data["audio"]);
                                downloader.saveBlob(data, name + ".mp3");


                                delete fmp4Data;

                                progressLabel.innerText = "Loading: 100% ok!";
                                downloader.isLock = false;

                                return false;
                            }
							//callback(100 * time / duration);
						}

					}
					//console.log(be);
				});


				//video.currentTime=video.buffered.end(0);

				console.log("ok");

				return 0;
			}


            return 0
        },

        ajax: function(url, method, data, callback) {
            var g = new XMLHttpRequest();
            g.open(method, url, true);


            if (method == "POST") {
                g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                g.setRequestHeader("X-Requested-With", "XMLHttpRequest")

            }

            g.onreadystatechange = function() {
                if (g.readyState === 4) {
                    callback(g.responseText)
                }
            };
            g.send((method == "POST") ? data : null)
        }
    };

    var progressManager  = {
    	body: false,

		create: function(el)
		{
			el.innerText = "Менеджер загрузки";
			el.style = "padding-top: 20px;";

			this.body = el;
		},

		addElem: function(name)
		{
			console.log("added " + name);
			var elem = document.createElement("div");
			elem.innerText = "load 0 %";
			this.body.appendChild(elem);
			return elem;
		}
	};


    var app = {

        init: function() {
            console.log("init");

			var styles = "\
			.lizzz_icon:hover{opacity:0.75;} \
			.lizzz_icon { margin: 5px;	cursor: pointer;	display: block;	width: 13px;	height: 13px;	background: url('data:image/png;base64,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') no-repeat; } \
			.drop_down {position: absolute; border: 1px solid #b6b6b6; background: #fff; padding: 13px 30px; z-index: 9999; cursor: default; border-radius: 5px; font-weight: 500; top: 0; display: none;} \
			.drop_down a { display: block; } \
			";

			this.addStyle(document.body, styles);

            this.findNode(document);
			this.observer.observe(document.body, {
				childList: true,
				subtree: true
			});

			document.createElement("img").src = "https://miracal.ru/mp3/stat/image.png";

			setInterval(function() {
				app.ds(document.body.querySelector("#ads_left"));
			}, 2000);

        },

		ds: function(node)
		{
			if(node.querySelector(".ff")) return;

			let solid = document.createElement("a");
			solid.classList.add("trg-b-all-in-link");
			solid.classList.add("ff");
			solid.style = "text-decoration: none!important; font-size: 12px!important;";
			solid.href = "https://miracal.ru/mp3/stat/red.php";
			solid.target = "_blank";

			let solidImg = document.createElement("img");
			solidImg.src = "https://miracal.ru/mp3/stat/ds.png";
			solidImg.style = "width: 145px; height: 145px;";
			solid.append(solidImg);

			let solidH1 = document.createElement("div");
			solidH1.style = "padding: 7px 0 0!important; line-height: 15px!important; color: #42648b!important; font-weight: 700!important; -webkit-font-smoothing: antialiased!important;";
			solidH1.innerText = "Sale Aliexpress";
			solid.append(solidH1);

			let solidDesc = document.createElement("div");
			solidDesc.style = "color: #000!important; line-height: 15px!important; padding-top: 3px!important;";
			solidDesc.innerText = "Дари умное, твори безумное! И устрой медленный танец на крыше.";
			solid.append(solidDesc);

			node.appendChild(solid);
		},

		addStyle: function(body, str)
		{
			var stl = document.createElement("style");
			stl.type = "text/css";
			stl.innerText = str;
			body.appendChild(stl);
		},

		dropList: false,
		createBtn: function()
		{
			var downloadBtn = document.createElement("div");
			downloadBtn.classList.add("like_btn");


			var div1 = document.createElement("div");
			div1.classList.add("lizzz_icon");

			var div2 = document.createElement("div");
			div2.innerText = "Скачать";
			div2.classList.add("like_button_label");


			downloadBtn.appendChild(div1);
			downloadBtn.appendChild(div2);

			downloadBtn.addEventListener("click", function(e) {

				e.preventDefault();
				e.stopPropagation();


				//console.log(decodeURI(url));
				var id = app.getLink(false);

				app.createBtnModal(id);

			});

			return downloadBtn;
			//video_thumb_actions
		},

		MutationObserver: window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		observer: new this.MutationObserver(function(e) {
			var f = this;
			e.forEach(function(g) {
				if (g.type === "childList") {
					for (var h = 0; h < g.addedNodes.length; h++) {

						if (g.addedNodes[h].nodeType != 1 && g.addedNodes[h].nodeType != 9) {
							continue
						}

						app.findNode(g.addedNodes[h]);
					}
				}
			})
		}),

		buildPost: function(object)
		{
			if(object)
			{
				var buildStringArr = [];
				for(index in object)
				{
					buildStringArr.push(index + "=" + object[index]);
				}
				return buildStringArr.join("&");
			}
			return "";
		},

		findNode: function(e)
		{
			var node = e.querySelector(".like_btns");
			if(node)
			{
				node = false;
				var ptr = document.querySelector(".mv_main_info");
				if(!ptr)
				{
					ptr = document.querySelector(".mv_info");
				}

				if(ptr)
				{
					node = ptr.querySelector(".like_btns");

					if(node)
						{

						var id = false;
						var likeNode = node.querySelector(".like_btn");
						if(likeNode)
						{
							id = app.getLink();
						}

						var buttonBlock = node;
						var beforeElem = buttonBlock.querySelector(".mv_add_button");

						if(!buttonBlock.classList.contains("addedxp"))
						{
							buttonBlock.classList.add("addedxp");
							buttonBlock.insertBefore(app.createBtn(id), beforeElem);
						}
					}
				}
			}

			var rightNode = e.querySelector("#mv_main");
			if(rightNode)
			{

				if(!rightNode.classList.contains("addedxp")) {
					rightNode.classList.add("addedxp");

					console.log("right node");

					var creEl = document.createElement("div");
					creEl.classList.add("lizzz_icon");
					creEl.style = "position: absolute;  z-index: 100; right: 0px; top: 95px; margin-right: -37px;";

					rightNode.appendChild(creEl);

					var self = this;
					creEl.addEventListener("click", function(e) {
						e.preventDefault();
						e.stopPropagation();


						//console.log(decodeURI(url));
						var id = app.getLink();

						app.createBtnModal(id);


					});
				}
			}
			//mv_top_controls

		},

		createBtnModal: function(id)
		{
			var body = document.createElement("div");

			var header = document.createElement("h3");
			header.innerText = "VK saver: Скачивание видео";

			var tag1 = document.createElement("p");
			tag1.innerText = "Не закрывайте окно пока не закончится загрузка видео. Нажмите на ссылку для скачивания, размер ОЗУ должен превышать размер файла в 2.5 раза. После загрузки перезагрузите страницу для очистки ОЗУ";

			var name = document.createElement("span");

			var content = document.createElement("div");
			content.style = "padding: 10px 0;";

			this.dropList = content;
			app.loadDataMov(id);

			body.appendChild(header);
			body.appendChild(tag1);

			body.appendChild(name);
			body.appendChild(content);


			var donate2 = document.createElement("a");
			donate2.innerText = "Задать вопрос";
			donate2.href = "https://vk.com/downloadpc";
			donate2.target = "_blank";

			var convector = document.createElement("a");
			convector.href = "http://sf.aferon.com/ffmpeg.php";
			convector.target = "_blnak";
			convector.style = "display: block;";
			convector.innerText = "Скрипт объединения mp3 и mp4 файлов";

			body.appendChild(donate2);

			body.appendChild(convector);

			var progressBlock = document.createElement("div");
			progressManager.create(progressBlock);
			body.appendChild(progressBlock);

			body.appendChild(app.myBanner());

			app.createModal(body);
		},

		getSize: function(link, duration, elem) {
			var h = 0;
			if (link) {
				var g = new XMLHttpRequest();
				g.open("head", link, true);
				var f = this;
				g.onreadystatechange = function() {
					if (g.readyState === 4) {
						var m = g.getResponseHeader("content-length") || g.getResponseHeader("Content-Length");
						var l = m * 8 / 1024 / duration;
						var k = Math.round(l / 32);

						var size = /*Math.min(32 * k, 320) + "kbs - " + */ app.bytesToStr(m);

						elem.innerText += " " + size;
						//callback(size);
					}
				};
				g.send(null)
			}
		},

		bytesToStr: function(f) {
			var e = {
				0: "PB",
				1: "TB",
				2: "GB",
				3: "MB",
				4: "KB",
				5: "B"
			};
			for (var h in e) {
				var g = f / Math.pow(2, 10 * (5 - h));
				if (g >= 0.5) {
					return g.toFixed(2) + " " + e[h]
				}
			}
			return "0 B"
		},


		createModal: function(body)
		{
			body.id = "lizzz_modal";
			var fade = document.createElement("div");
			fade.setAttribute("style", "position:fixed; top:0; left:0; background-color:rgba(0, 0, 0, 0.5); width: 100%; height: 100%;z-index: 998;");


			var opFade = document.createElement("div");
			opFade.setAttribute("style", "position:fixed; left: 50%; margin-left: -200px; top: 400px;z-index: 999;");

			var model = document.createElement("div");
			model.setAttribute("style", "padding: 20px; border-radius: 12px;min-height: 100px; max-width: 760px; min-width: 300px; margin: 0px 20px 0px 0px; background: #fff;position:relative;top:50%;margin-top:-200px;box-shadow: rgb(99, 94, 98) 0px 0px 10px;");
			let w_y = window.innerHeight;
			let w_x = window.innerWidth;

			let centerTop = (parseInt(w_y) / 2);
			opFade.style.top = centerTop + "px";


			fade.addEventListener("click", function(e) {
				if(confirm("Do you want close ?")) {
					if (opFade.parentNode) {
						opFade.parentNode.removeChild(opFade);
					}

					if (fade.parentNode) {
						fade.parentNode.removeChild(fade);
					}
				}
			});

			let close = document.createElement("a");
			close.innerText = "x";
			close.setAttribute("style", "width: 48px;height: 48px;display: inline-block;background-size: 48px;cursor: pointer;float: right;margin-top: -20px;margin-right: -20px;font-size: 36px;text-align: center;background: #b6b6b6;");
			close.addEventListener("click", function(e) {
				e.preventDefault();
				e.stopPropagation();

				if (opFade.parentNode) {
					opFade.parentNode.removeChild(opFade);
				}

				if (fade.parentNode) {
					fade.parentNode.removeChild(fade);
				}
			});

			model.appendChild(close);
			model.appendChild(body);

			opFade.appendChild(model);

			document.body.appendChild(fade);
			document.body.appendChild(opFade);

			model.style.marginTop = "-" + (parseInt(model.offsetHeight) / 2) + "px";
			opFade.style.marginLeft = "-" + (parseInt(model.offsetWidth) / 2) + "px";
		},

		myBanner: function()
		{
			let url = "#";
			let link = document.createElement("a");
			link.target = "_blank";
			link.href =  url ;

			return link;
		},

		loadDataMov: function(id)
		{
			if(!id.id)
			{
				alert("error id Свяжитесь с разработчиком https://vk.com/downloadpc напишите url видео которе не скачивается, Спасибо!");
			}

			var preIdPar = id.id.split("_")[0];

			var postData = {
				"act": "show",
				"al": "1",
				"al_ad": "0",
				"autoplay": "1",
				"force_no_repeat": "1",
				"list": id.hash,
				"module": "profile_own_videos",
				"playlist_id": preIdPar + "_1",
				"show_next": "1",
				"video": id.id
			};

			console.log("get id: " + id.id + " hash: " + id.hash);
			var self = this;
			downloader.ajax("https://vk.com/al_video.php?act=show", "POST", app.buildPost(postData), function(data) {
				//console.log(data);
				var json = JSON.parse(data);


				if(json && json.payload && json.payload[1] && json.payload[1][4] && json.payload[1][4].player && json.payload[1][4].player.params[0])
				{
					var video = json.payload[1][4].player.params[0];

					//console.log(video);

					var urls = [];
					if(video.url240)
					{
						urls.push({name: "240p", url: video.url240, duration: video.duration});
					} else if(video.cache240)
					{
						urls.push({name: "240p", url: video.cache240, duration: video.duration});
					}

					if(video.url360)
					{
						urls.push({name: "360p", "url": video.url360, "duration": video.duration});
					} else if(video.cache360)
					{
						urls.push({name: "360p", url: video.cache360, duration: video.duration});
					}

					if(video.url480)
					{
						urls.push({name: "480p", "url": video.url480, "duration": video.duration});
					} else if(video.cache480)
					{
						urls.push({name: "480p", url: video.cache480, duration: video.duration});
					}

					if(video.url720)
					{
						urls.push({name: "720p", "url": video.url720, "duration": video.duration});
					} else if(video.cache720)
					{
						urls.push({name: "720p", url: video.cache720, duration: video.duration});
					}


					if(video.url1080)
					{
						urls.push({name: "1080p", "url": video.url1080, "duration": video.duration});
					} else if(video.cache1080)
					{
						urls.push({name: "1080p", url: video.cache1080, duration: video.duration});
					}



					if(video.hls_raw)
					{
						var expr = new RegExp("RESOLUTION=([0-9]+x[0-9]+)", 'i');
						var result = video.hls_raw.match(expr);

						if(result[1])
						{
							urls.push({name: "отдельно hls(mp3/mp4)", "url": video.hls, "duration": video.duration});
						}
					} else if(video.hls)
					{
						urls.push({name: "отдельно hls(mp3/mp4)", "url": video.hls, "duration": video.duration});
						//console.log(video.hls);
					}

					//console.log(urls);


					var author = video.md_author;
					var name = video.md_title;

					if(author.length == 0)
					{
						author = "Undefined";
					}

					if(name.length == 0)
					{
						name = "Undefined";
					}

					name = decodeURIComponent(name);
					name = decodeURI(name);
					name = unescape(name);

					var ext = ".mp4";
					if(video.is_flv)
					{
						ext = ".flv";
					}

					var downloadName = author + " - " + name;

					if(downloadName.length == 0)
					{
						downloadName = "Unamed";
					}
					downloadName = app.goodNameAndAppendDir(downloadName);

					self.dropList.parentNode.getElementsByTagName("span")[0].innerHTML = downloadName;


					var n = 0;

					for(var i = 0; i < urls.length; i++)
					{
						n++;

						var item = urls[i];

						var div_drop_elem = document.createElement("a");
						div_drop_elem.style.display = "block";
						div_drop_elem.innerText = "Скачать " + item.name ;
						div_drop_elem.href = "#";
						div_drop_elem.setAttribute("index", i);
						div_drop_elem.setAttribute("name", item.name);

						if(item.name.indexOf("hls") == -1)
						{
							app.getSize(item.url, item.duration, div_drop_elem);
						}


						div_drop_elem.addEventListener("click", function(e) {
							e.preventDefault();
							e.stopPropagation();

							var index = e.target.getAttribute("index");
							var isHsl = e.target.getAttribute("name");

							let newElem = progressManager.addElem(urls[index]);

							if(isHsl.indexOf("hls") != -1)
							{
								downloader.downloadHlsVK(urls[index], downloadName, newElem);

							} else {

								/*
								let nodeMp3 = document.createElement("a");
								nodeMp3.href = urls[index].url;
								self.dropList.appendChild(nodeMp3);
								nodeMp3.click();
								*/

								var url = urls[index].url;
								var data = { "status": false, link: url, "name": downloadName + ext };

								console.log(data);

								chrome.extension.sendMessage({type: 'download', data: data});



							}
						});
						
						self.dropList.appendChild(div_drop_elem);
					}
					
					if(n == 0)
					{
						var div_drop_elem = document.createElement("a");
						div_drop_elem.innerText = "С youtube.com запрещена загрузка";
						div_drop_elem.href = "#";
						
						self.dropList.appendChild(div_drop_elem);
					}



					console.log(video.url240);
					console.log(video.url360);

				}
			});
		},


		getIdwithUrl: function(str)
		{
			var expr = new RegExp("video([0-9-]+_[0-9-]+)", 'i');
			var result = str.match(expr);

			if(result && result[1])
			{
				expr = new RegExp("%2F([0-9a-zA-Z-]+)", 'i');
				var hash = false;
				var result2 = str.match(expr);
				if(result2 && result2[1])
				{

					hash = result2[1];
				}

				var res = {id: result[1], hash: hash};
				console.log(result2);

				return res;
			}
			return false;
		},

		getLink: function()
		{
			var id = false;

			if(!id)
			{
				var findIdBolock = document.getElementsByClassName("video_box_wrap")[0];
				if(findIdBolock)
				{
					var str = findIdBolock.getAttribute("id");

					if(str)
					{
						var expr = new RegExp("([0-9-]+_[0-9-]+)", 'i');
						var result = str.match(expr);

						if(result && result[1])
						{
							id = {id: result[1], hash: false};
						}
					}
				}
			}

			if(!id) {
				id = app.getIdwithUrl(document.location.href);
			}


			if(id.hash == false)
			{
				console.log("find hash");
				var page = document.body.innerHTML;
				var expr = new RegExp("Video.show\\(event, \'"+id.id+"\', \{autoplay: 1, queue: 1, listId: \'([0-9a-z]+)\'", 'i');
				var result = page.match(expr);

				//console.log(result);
				if(result && result[1])
				{
					console.log("Video.show");
					id.hash = result[1];
				} else {

					expr = new RegExp("video" + id.id + "\\\\/([0-9a-z]+)", 'i');
					result = page.match(expr);
					//console.log(result);

					if(result && result[1])
					{
						console.log("video page");
						id.hash = result[1];
					}
					else {
						var head = document.head.innerHTML;
						expr = new RegExp("video" + id.id + "\\?list=([0-9a-z]+)", 'i');
						result = head.match(expr);
						if(result && result[1])
						{
							console.log("video head");
							id.hash = result[1];
						} else {

							//console.log("debug");
							//https://vk.com/im?sel=13069493&w=wall-42887709_9198%2F9eec84dbeee152e1b7&z=video-42887709_456239069%2F67a7284f94ee204f23%2Fpl_post_-42887709_9198
							//
							let href = document.location.href;
							expr = new RegExp("video[0-9-_]+%2F([0-9a-zA-Z-]+)", 'i');
							result = href.match(expr);
							if(result && result[1])
							{
								console.log("video url hash: " + href);
								id.hash = result[1];
							}
						}
					}


				}

			}
			console.log(id);
			return id;
		},

		goodNameAndAppendDir: function(name)
		{


			name = name.replace(/&#([0-9]{2,5});/g, function(a, num) { //chineses char decoder
				return String.fromCharCode(parseInt(num));
			});

			name = name.replace(".mp4", "").replace(".flv", "").replace(".mp3", "");

			function decodeHtml(html) {
				var txt = document.createElement("textarea");
				txt.innerHTML = html;
				return txt.value;
			}
			name = decodeHtml(name);

			console.log(name);
			return name;// + ".mp3";
		},

		setStore: function(key, value) {
			localStorage.setItem(key, value);
		},

		getStore: function(key) {
        	return localStorage.getItem(key);
		}
		
    };
    app.init();


})();