(function()
{
	function isDevMode()
	{
		return !('update_url' in chrome.runtime.getManifest());
	};

	var session = Date.now();
	var debug = isDevMode();

	function getDomainName(hostName)
	{
		return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
	};

	function logEvent(data)
	{
		try
		{
			var img = new Image();
			img.src = 'https://log.draw.io/images/1x1.png?' +
				'data=' + encodeURIComponent(
				JSON.stringify(data));
		}
		catch (e)
		{
			console.error(e);
		}
	};

	function writeDebug()
	{
		try
		{
			if (window.console != null && debug)
			{
				var args = [new Date().toISOString(),
					'[Session ' + session + ']',
					'[draw.io for Notion]', '[debug]'];
				
				for (var i = 0; i < arguments.length; i++)
			    {
					args.push(arguments[i]);
			    }
			    
				console.log.apply(console, args);
			}
		}
		catch (e)
		{
			// ignore
		}
	};

	function writeLog()
	{
		try
		{
			if (window.console != null)
			{
				var args = [new Date().toISOString(),
					'[Session ' + session + ']',
					'[draw.io for Notion]', '[info]'];
				
				for (var i = 0; i < arguments.length; i++)
			    {
					args.push(arguments[i]);
			    }
			    
				console.log.apply(console, args);
			}
		}
		catch (e)
		{
			// ignore
		}
	};

	// Specifies if images should be changed for dark mode
	var convertImages = true;
	var backgroundColor = '#191919';
	var convertAttrib = 'data-drawio-src';
	var editor = debug ?
		'https://test.draw.io/?dev=1&embedInline=1&libraries=1&configure=1' :
		'https://embed.diagrams.net/?embedInline=1&libraries=1&configure=1';
	var notionScrollers = document.getElementsByClassName('notion-scroller vertical');
	var notionFrames = document.getElementsByClassName('notion-frame');
	var dark = document.body.className.includes('dark');
	var enabled = getDomainName(window.location.hostname) == 'notion.so';
	var initialized = false;
	var activeImage = null;
	var editBlockId = null;
	var darkModeCss = '@media (prefers-color-scheme: dark)' +
	'{' +
	'	svg {' +
	'		filter: invert(93%) hue-rotate(180deg);' +
	'	}' +
	'	svg[style^="background-color: rgb(255, 255, 255);"] {' +
	'		background-color: transparent !important;' +
	'	}' +
	'	image {' +
	'		filter: invert(100%) hue-rotate(180deg) saturate(1.25);' +
	'	}' +
	'}';
	
	if (!enabled)
	{
		writeLog('Editor disabled for hostname ' + window.location.hostname);
	}

	var iframe = document.createElement('iframe');
	iframe.style.position = 'absolute';
	iframe.style.border = '0';
	iframe.style.top = '0px';
	iframe.style.left = '0px';
	iframe.style.width = '100%';
	iframe.style.height = '100%';
	iframe.style.zIndex = '4';

	function invertImage(img, done)
	{
		var req = new XMLHttpRequest();

		req.addEventListener('load', function()
		{
			if (req.status >= 200 && req.status <= 299 && this.responseXML != null)
			{
				img.src = createSvgDataUri(invertSvg(this.responseXML));
			}

			done();
		});

		req.open('GET', img.src);
		req.send();
	};

	function installInverter(img)
	{
		var busy = false;
		img.setAttribute(convertAttrib, img.src);

		if (dark)
		{
			busy = true;

			invertImage(img, function()
			{
				busy = false;
			});
		}

		var mutationObserver = new MutationObserver(function(evt)
		{
			if (!isSvgDataUri(img.src) && img.src != '' && !busy)
			{
				if (dark)
				{
					busy = true;
					img.setAttribute(convertAttrib, img.src);

					invertImage(img, function()
					{
						busy = false;
					});
				}
			}
		});

		mutationObserver.observe(img, {attributes: true});
	};

	function darkModeChanged()
	{
		if (activeImage != null)
		{
			iframe.contentWindow.postMessage(JSON.stringify(
				{action: 'exit'}), '*');
		}

		var imgs = document.getElementsByTagName('img');

		for (var i = 0; i < imgs.length; i++)
		{
			var src = imgs[i].getAttribute(convertAttrib);

			if (src != null)
			{
				if (!isSvgDataUri(imgs[i].src))
				{
					src = imgs[i].src;
					imgs[i].src = '';
					imgs[i].src = src;
				}
				else
				{
					imgs[i].src = src;
				}
			}
		}
	};

	function editImage(img, isNew, onChange)
	{
		iframe.doResize = function(msg)
		{
			setFullscreen(msg.fullscreen);
			img.style.width = msg.rect.width + 'px';
			img.style.height = (msg.rect.height - 22) + 'px';
		};

		var prev = img.parentNode.style.cursor;
		img.parentNode.style.cursor = 'wait';
		iframe.style.cursor = 'wait';

		iframe.doInit = function(errorCode)
		{
			if (errorCode != null)
			{
				img.parentNode.style.cursor = prev;
				onChange({});
				alert('Error ' + errorCode + ': Cannot load editor');
			}
			else
			{
				setControlsVisible(img, false);
				crossfade(img, iframe);
				iframe.style.cursor = '';
				img.parentNode.style.cursor = prev;
			}
		};
		
		iframe.doUpdate = onChange;
		startEditor(img, isNew);
	};

	function startEditor(img, isNew)
	{
		var req = new XMLHttpRequest();

		req.addEventListener('load', function()
		{
			if (req.status >= 200 && req.status <= 299)
			{
				try
				{
					var rect = img.parentNode.getBoundingClientRect();
					var r = iframe.parentNode.getBoundingClientRect();

					if (rect.y < r.y + 66 || rect.y > iframe.parentNode.scrollTop + r.height)
					{
						img.scrollIntoView();
						iframe.parentNode.scrollTop -= 60
						rect = img.parentNode.getBoundingClientRect();
					}

					var mw = Math.min(600, window.innerWidth - 60);
					var mh = Math.min(400, window.innerHeight - 60);

					var border = 8;
					rect.x -= border + 3 + r.x - Math.min(0, (rect.width - mw) / 2);
					rect.y -= border + 3 - iframe.parentNode.scrollTop + r.y;
					rect.width = Math.max(mw, rect.width + (2 * border + 2));
					rect.height = Math.max(mh, rect.height + (2 * border + 2));

					iframe.contentWindow.postMessage(JSON.stringify(
						{action: 'load', xml: this.responseText, border: border,
						background: '#ffffff', rect: rect, maxFitScale: 1.5,
						minWidth: Math.min(mw, rect.width + (2 * border + 2)),
						minHeight: Math.min(mh, rect.height + (2 * border + 2)),
						dark: dark, viewport: getViewport()}), '*');
					updateFrame();

					logEvent({category: 'NOTION',
						action: (isNew) ? 'create' : 'edit',
						label: getBlockId(img)});
				}
				catch (e)
				{
					iframe.doInit(e.message);
				}
			}
			else
			{
				iframe.doInit(req.status);
			}
		});

		req.open('GET', img.src);
		req.send();

		writeLog('Starting editor at block ' + getBlockId(img));
	};

	function installEditor(img, filename, url)
	{
		img.parentNode.addEventListener('click', function()
		{
			if (enabled)
			{
				if (!initialized)
				{
					var prev = img.parentNode.style.cursor;
					img.parentNode.style.cursor = 'not-allowed';

					window.setTimeout(function()
					{
						img.parentNode.style.cursor = prev;

						if (!initialized)
						{
							iframe.removeAttribute('src');
							iframe.setAttribute('src', editor);
							alert('draw.io for Notion is not ready.');
						}
					}, 300);
				}
				else
				{
					prepareEditor(img, filename, url);
				}
			}
		});
	};

	function editBlock(id)
	{
		editBlockId = id;
	};

	function mergeChanges(url)
	{
		var req = new XMLHttpRequest();

		req.addEventListener('load', function()
		{
			if (req.status >= 200 && req.status <= 299)
			{
				iframe.contentWindow.postMessage(JSON.stringify({action: 'merge',
					xml: this.responseText}), '*');
			}
		});

		req.open('GET', url);
		req.send();
	};

	var lastSnapshot = null;

	function prepareEditor(img, filename, url, isNew)
	{
		if (!iframe.busy)
		{
			iframe.busy = true;
			activeImage = img;

			var width = img.style.width;
			var height = img.style.height;
			var boxSizing = img.style.boxSizing;

			// Listens for remote changes
			var mutationObserver = new MutationObserver(function(evt)
			{
				if (!isSvgDataUri(img.src) && url != img.src &&
					activeImage == img)
				{
					url = img.src;
					mergeChanges(url);
				}
			});
		
			mutationObserver.observe(img, {attributes: true});

			editImage(img, isNew, function(msg, override)
			{
				if (msg.data != null && msg.exit != null &&
					!msg.exit && !override)
				{
					lastSnapshot = msg;
				}
				else
				{
					var rect = iframe.getBoundingClientRect();
					mutationObserver.disconnect();
					setFullscreen(false);
					img.style.width = width;
					img.style.height = height;
					img.style.boxSizing = boxSizing;
					imageChanged(img, filename, msg.data);

					crossfade(iframe, img, function()
					{
						writeDebug('Editor stopped');
						setControlsVisible(img, true);
						iframe.busy = false;
						lastSnapshot = null;
						activeImage = null;

						var temp = (msg != null && msg.point != null) ? document.elementFromPoint(
							rect.x + msg.point.x, rect.y + msg.point.y) : null;
						
						if (temp != null && (temp.nodeName == 'IMG' ||
							temp.getAttribute('data-content-editable-leaf') == 'true') &&
							typeof temp.click === 'function')
						{
							temp.click();
						}
						else
						{
							img.focus();
						}
					});
				}
			});
		}
	};

	function imageChanged(img, filename, data)
	{
		if (data != null)
		{
			var blockId = getBlockId(img);
			var svg = getSvg(data);

			writeLog('Saving diagram ' + filename + ' at block ' + blockId);

			replaceDiagram({blockId: blockId, filename: filename, data: svg}, function(msg, res)
			{
				if (msg.error != null)
				{
					var message = 'Error ' + msg.errStatus + ': Cannot update diagram';

					if (res != null && res.message != null)
					{
						message += '\n' + res.message;

						if (res.debugMessage != null)
						{
							message += '\n' + res.debugMessage;
						}
					}

					alert(message);
				}
			});

			if (dark && convertImages)
			{
				data = createSvgDataUri(invertSvg(new DOMParser().
					parseFromString(svg, 'text/xml')));
			}

			// Restores state and shows preview
			img.setAttribute('src', data);
		}

		iframe.style.width = '100%';
		iframe.style.height = '100%';
		iframe.doUpdate = null;
		iframe.doResize = null;
	};

	writeDebug('Adding message listener');

	window.addEventListener('message', function(evt)
	{
		if (evt, evt.source === iframe.contentWindow)
		{
			writeDebug('Message', evt);

			var msg = JSON.parse(evt.data);

			if (msg.event == 'init')
			{
				initialized = true;

				writeDebug('Editor initialized');
			}
			else if (msg.event == 'configure')
			{
				iframe.contentWindow.postMessage(JSON.stringify({action: 'configure',
					config: {
						darkColor: backgroundColor,
						settingsName: 'notion'
					}
				}), '*');
			}
			else if (msg.event == 'load' && iframe.doInit != null)
			{
				iframe.doInit();

				writeDebug('Editor started');
			}
			else if ((msg.event == 'export' || msg.event == 'exit') &&
				iframe.doUpdate != null)
			{
				iframe.doUpdate(msg);
			}
			else if (msg.event == 'resize' && iframe.doResize != null)
			{
				iframe.doResize(msg);
			}
		}
	});

	var checked = [];

	function updateChecked()
	{
		var temp = [];

		// Forgets old images
		for (var i = 0; i < checked.length; i++)
		{
			if (document.body.contains(checked[i]))
			{
				temp.push(checked[i]);
			}
		}

		return temp;
	};

	function isOverlay(node)
	{
		while (node != null)
		{
			if (node.className != null &&
				node.className.includes('notion-overlay-container'))
			{
				return true;
			}

			node = node.parentElement;
		}

		return false;
	};

	function checkDiagram(img)
	{
		var filename = getFilename(img.src);
		var result = false;

		if (filename.endsWith('.drawio.svg'))
		{
			if (enabled && !isOverlay(img))
			{
				installEditor(img, filename, img.src);
			}

			if (convertImages)
			{
				installInverter(img);
			}

			if (editBlockId != null && getBlockId(img) == editBlockId)
			{
				editBlockId = null;
				prepareEditor(img, filename, img.src, true);
			}

			result = true;
		}

		return result;
	};

	function checkImage(img)
	{
		if (checked.indexOf(img) < 0)
		{
			checked.push(img);

			if (!checkDiagram(img))
			{
				var mutationObserver = new MutationObserver(function()
				{
					if (checkDiagram(img))
					{
						mutationObserver.disconnect();
					}
				});
		
				mutationObserver.observe(img, {attributes: true});
			}
		};
	};

	function scrollHandler()
	{
		if (initialized && iframe.style.visibility != 'hidden')
		{
			iframe.contentWindow.postMessage(JSON.stringify(
				{action: 'viewport', viewport: getViewport()}), '*');
		}
	};

	// Creates a snapshot in case ppl click off the diagram so that it
	// is removed from the DOM (eg, if they click on the background or
	// if they click in the navigation).
	iframe.addEventListener('mouseleave', function()
	{
		if (activeImage != null && iframe.contentWindow != null)
		{
			writeDebug('Preparing to save snapshot');

			iframe.contentWindow.postMessage(JSON.stringify(
				{action: 'snapshot'}), '*');
		}
	}, true);

	function checkFrame()
	{
		// Checks if pending snapshot exists
		if (iframe.doUpdate != null && lastSnapshot != null &&
			!document.body.contains(iframe))
		{
			iframe.doUpdate(lastSnapshot, true);
		}

		// Checks if parent node was removed and reinserts editor
		// Adding to body would avoid this but doesn't allow
		// the iframe to be scrolled with the page content.
		// LATER: Can we use cloneNode to avoid this?
		if (notionScrollers.length > 0 &&
			!notionScrollers[notionScrollers.length - 1].contains(iframe))
		{
			iframe.removeAttribute('src');

			if (iframe.parentNode != null)
			{
				iframe.parentNode.removeEventListener('scroll', scrollHandler);
			}

			initialized = false;
			iframe.busy = false;
			iframe.style.visibility = 'hidden';
			notionScrollers[notionScrollers.length - 1].appendChild(iframe);
			iframe.parentNode.addEventListener('scroll', scrollHandler);

			window.setTimeout(function()
			{
				iframe.setAttribute('src', editor);
				writeDebug('Initializing editor', iframe);
			}, 0);
		}
	};

	function checkImages()
	{
		// Removes old images
		// LATER: Move to other listener with fewer invocations
		checked = updateChecked();
		var imgs = document.getElementsByTagName('img');

		for (var i = 0; i < imgs.length; i++)
		{
			checkImage(imgs[i]);
		}
	};

	function getViewport()
	{
		var viewport = iframe.parentNode.getBoundingClientRect();
		viewport.x = iframe.parentNode.scrollLeft;
		viewport.y = iframe.parentNode.scrollTop;

		return viewport;
	};

	function pageChanged()
	{
		if (enabled)
		{
			checkFrame();
		}

		checkImages();
	};
	
	function installDarkModeListener()
	{
		new MutationObserver(pageChanged).observe(
			document.body, {childList: true,
				subtree: true});

		new MutationObserver(function()
		{
			var newDark = document.body.className.includes('dark');

			if (newDark != dark)
			{
				dark = newDark;
				darkModeChanged();
			}
		}).observe(document.body, {attributes: true});
	};

	installDarkModeListener();

	var resizeThread = null;

	window.addEventListener('resize', function()
	{
		window.clearTimeout(resizeThread);

		// Allows for CSS transitions in Notion containers
		resizeThread = window.setTimeout(function()
		{
			if (iframe.contentWindow != null && iframe.style.visibility != 'hidden')
			{
				iframe.contentWindow.postMessage(JSON.stringify(
					{action: 'viewport', viewport: getViewport()}), '*');

				updateFrame();
			}
		}, 1000);
	});

	var fullscreen = false;
	var prevOverflow = null;

	function updateFrame()
	{
		if (fullscreen)
		{
			var r = notionFrames[0].getBoundingClientRect();
			prevOverflow = document.body.style.overflow;
			document.body.style.overflow = 'hidden';
			iframe.style.position = 'fixed';
			iframe.style.top = r.y + 'px';
			iframe.style.left = r.x + 'px';
			iframe.style.width = r.width + 'px';
			iframe.style.height = r.height + 'px';
		}
		else
		{
			document.body.style.overflow = prevOverflow;
			iframe.style.position = 'absolute';
			iframe.style.left = '0px';
			iframe.style.top = '0px';
			iframe.style.width = iframe.parentNode.clientWidth + 'px';
			iframe.style.height = iframe.parentNode.scrollHeight + 'px';
		}
	};

	function setFullscreen(value)
	{
		if (fullscreen != value)
		{
			fullscreen = value;
			updateFrame();
			iframe.contentWindow.postMessage(JSON.stringify(
				{action: 'fullscreenChanged',
				value: value}), '*');
		}
	};

	function setControlsVisible(img, visible)
	{
		try
		{
			// Hides halo
			var node = img;

			while (node != null)
			{
				if (node.className == 'notion-selectable notion-image-block')
				{
					node.style.visibility = (visible) ? '' : 'hidden'

					break;
				}
				else
				{
					node = node.parentNode;
				}
			}

			// Hides image context controls
			var id = getBlockId(img);
			var ns = notionScrollers.length > 0 ? notionScrollers[notionScrollers.length - 1] : null;

			document.querySelectorAll('[role="button"]').forEach(function (button)
			{
				if (getBlockId(button) == id)
				{
					button.style.visibility = (visible) ? '' : 'hidden';
				}
				else if (ns != null && button.parentNode != null &&
					button.parentNode.parentNode != null &&
					button.parentNode.parentNode.parentNode != null &&
					button.parentNode.parentNode.parentNode.parentNode ==
						notionScrollers[notionScrollers.length - 1])
				{
					button.style.visibility = (visible) ? '' : 'hidden';
				}
			});
		}
		catch (e)
		{
			// ignore
		}
	};

	function invertSvg(doc)
	{
		var defs = doc.getElementsByTagName('defs');
		var style = doc.createElementNS('http://www.w3.org/2000/svg', 'style');
		style.appendChild(doc.createTextNode(darkModeCss));
		defs[0].appendChild(style);

		return doc;
	};

	function isSvgDataUri(url)
	{
		return url.startsWith('data:image/svg+xml;base64,');
	};

	function createSvgDataUri(doc)
	{
		return 'data:image/svg+xml;base64,' +
			btoa(unescape(encodeURIComponent(
				new XMLSerializer().serializeToString(
					doc.documentElement))));
	};

	function getSvg(data)
	{
		return  '<?xml version="1.0" encoding="UTF-8"?>\n' +
			'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
			decodeURIComponent(escape(atob(data.substring(data.indexOf(',') + 1))));
	};

	function getFilename(url)
	{
		var tokens = url.split('?')[0].split('/');
		var filename = tokens[tokens.length - 1];

		if (filename.startsWith('https%3A%2F%2F'))
		{
			filename = getFilename(decodeURIComponent(filename));
		}

		return filename;
	};

	function getBlockId(node)
	{
		var blockId = null;
		
		while (blockId == null && node != null && node != document.body)
		{
			blockId = node.getAttribute('data-block-id');
			node = node.parentNode;
		}

		return blockId;
	};

	function crossfade(source, target, done)
	{
		target.style.visibility = '';

		window.setTimeout(function()
		{
			source.style.visibility = 'hidden';

			if (done != null)
			{
				done();
			}	
		}, 50);
	};

	function extractId(url, isBlock)
	{
		if (isBlock)
		{
			url = url.split('#').pop();
		}
		
		let id = url.split('/').pop().split('&p=').pop().split('?p=').pop().split('?').shift().split('-').pop().split('&').shift();
		
		//Return the id in the form 12345678-1234-5678-1234-567812345678 
		return id.substring(0,8) + '-' + id.substring(8, 12) + '-' + id.substring(12, 16) +
				 '-' + id.substring(16, 20) + '-' + id.substring(20);
	};
	
	function uuidv4()
	{
	  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	  );
	};

	function lengthInUtf8Bytes(str)
	{
		// Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
		var m = encodeURIComponent(str).match(/%[89ABab]/g);

		return str.length + (m ? m.length : 0);
	};
	
	function callNotionAPI(api, data, onsuccess, onerror, origMsg, absUrl, method, directData, mimeType, respAsTxt, customHeaders)
	{
		try
		{
			var headers = {'Content-Type': mimeType || 'application/json'};

			if (customHeaders != null)
			{
				for (var i = 0; i < customHeaders.length; i++)
				{
					headers[customHeaders[i].name] = customHeaders[i].value;
				}
			}

			fetch(absUrl || ('https://www.notion.so/api/v3/' + api),
				{ method: method || 'post', 
				body: directData? data : JSON.stringify(data), 
				headers: headers})
				.then(async res => 
				{
					try
					{
						var response = respAsTxt? await res.text() : await res.json();

						if (res.ok)
						{
							onsuccess(response);
						}
						else
						{
							var err = 'Unknown error';

							try
							{
								err = respAsTxt? JSON.parse(response) : response;
							}
							catch (e)
							{
								try
								{
									if (respAsTxt)
									{
										var parser = new DOMParser();
										xmlDoc = parser.parseFromString(response, 'text/xml');

										var code = xmlDoc.getElementsByTagName('Code')[0];
										var message = xmlDoc.getElementsByTagName('Message')[0];

										if (code != null && message != null)
										{
											err = {errStatus: res.status, message: message.textContent +
												' (' + code.textContent + ')'};
										}
									}
								}
								catch (e)
								{
									// ignore
								}
							}

							origMsg = origMsg || {};
							origMsg.error = true;
							origMsg.errStatus = res.status;
							onerror(origMsg, err);
							
							try
							{
								console.error(response);
							}
							catch(e){}
						}
					}
					catch(e)
					{
						console.error(e);
						origMsg.error = true;
						onerror(origMsg);
					}
				})
				.catch((err) => 
				{
					console.error(err);
					origMsg.error = true;
					onerror(origMsg);
				});
		}
		catch(e)
		{
			console.error(e);
			origMsg.error = true;
			onerror(origMsg);
		}
	};

	function replaceDiagram(msg, sendResponse, initialize)
	{
		writeLog('Getting user ID to replace file');

		callNotionAPI('loadUserContent', {},
		function(data)
		{
			let spaceId = Object.keys(data.recordMap.space)[0];
			let blockId = msg.blockId;
			let size = lengthInUtf8Bytes(msg.data);

			writeLog('Getting upload URL for ' + msg.filename + ' with ' + size + ' bytes');

			//Upload the file
			callNotionAPI('getUploadFileUrl', {
				bucket: 'secure',
				name: msg.filename,
				contentType: 'image/svg+xml',
				supportExtraHeaders: true,
				contentLength: size,
				record: {
					table: 'block',
					id: blockId,
					spaceId: spaceId
				}
			},
			function(urls)
			{
				let ts = Date.now();
				let url = urls.url;
				const S3_URL_PREFIX = 'https://s3-us-west-2.amazonaws.com/secure.notion-static.com/';
				let fileId = url.substring(S3_URL_PREFIX.length).split('/')[0];

				writeLog('Uploading file ' + fileId + ' in block ' + blockId + ' at ' + url + ' for space ' + spaceId);

				callNotionAPI(null, msg.data, function()
				{
					//Update Image block with file info
					callNotionAPI('saveTransactions',
					{
						requestId: uuidv4(),
						transactions: [
						{
							id: uuidv4(),
							spaceId: spaceId,
							debug: {userAction: 'embedBlockActions.initializeEmbedBlock'},
							operations: [
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: ['properties'],
								command: 'update',
								args: {
									source: [[url]],
									title: [[msg.filename]],
									size: [[Math.round(msg.data.length / 100) / 10 + 'KB']]
								}
							},
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: ['format'],
								command: 'update',
								args: {
									display_source: url
								}
							},
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: [],
								command: 'update',
								args: {
									type: 'image'
								}
							},
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: [],
								command: 'update',
								args: {
									last_edited_time: ts
								}
							}]
						}]
					},
					function()
					{
						writeLog('File replaced in block ' + blockId + ' at ' + url);

						msg.newUrl = url;
						sendResponse(msg, url);
					}, sendResponse, msg);
				}, sendResponse, msg, urls.signedPutUrl, 'put', true, 'image/svg+xml', true, urls.putHeaders);
			}, sendResponse, msg);
		}, sendResponse, msg);
	};
	
	chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) 
	{
		if (location.href == 'https://aif.notion.so/aif-production.html')
		{
			return;
		}

		writeDebug('Message', location.href, msg);

		switch (msg.msg)
		{
			case 'insertDiagram':
				// Stops active editing
				if (activeImage != null)
				{
					iframe.contentWindow.postMessage(JSON.stringify(
						{action: 'exit'}), '*');
				}

				writeLog('Getting user ID to insert file');

				//Get user ID
				callNotionAPI('loadUserContent', {},
				function(data)
				{
					let divs = document.querySelectorAll('[data-block-id]');
					let lastBlockId = divs[divs.length - 1].getAttribute('data-block-id');
					let spaceId = Object.keys(data.recordMap.space)[0];
					let userId = Object.keys(data.recordMap.notion_user)[0];
					let blockId = uuidv4();
					let pageId = msg.pageId || extractId(window.location.href);
					let ts = Date.now();

					writeLog('Inserting file on page ' + pageId + ' in block ' + blockId + ' as user ' + userId);

					//Add Image block
					callNotionAPI('saveTransactions',
					{
						requestId: uuidv4(),
						transactions: [
						{
							id: uuidv4(),
							spaceId: spaceId,
							debug: {userAction: 'ListItemBlock.handleNativeDrop'},
							operations: [
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: [],
								command: 'set',
								args: {
									type: 'embed',
									space_id: spaceId,
									id: blockId,
									version: 1
								}
							},
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: [],
								command: 'update',
								args: {
									created_by_id: userId,
									created_by_table: 'notion_user',
									created_time: ts,
									last_edited_time: ts,
									last_edited_by_id: userId,
									last_edited_by_table: 'notion_user'
								}
							},
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: [],
								command: 'update',
								args: {
									parent_id: pageId,
									parent_table: 'block',
									alive: true
								}
							},
							{
								pointer: {
									table: 'block',
									id: blockId,
									spaceId: spaceId
								},
								path: ['content'],
								command: 'listAfter',
								args: {
									after: lastBlockId,
									id: blockId
								}
							},
							{
								pointer: {
									table: 'block',
									id: pageId,
									spaceId: spaceId
								},
								path: [],
								command: 'update',
								args: {
									last_edited_time: ts
								}
							}]
						}]
					},
					function()
					{
						callNotionAPI('saveTransactions',
						{
							requestId: uuidv4(),
							transactions: [
							{
								id: uuidv4(),
								spaceId: spaceId,
								debug: {userAction: 'embedBlockActions.initializeFormat'},
								operations: [
								{
									pointer: {
										table: 'block',
										id: blockId,
										spaceId: spaceId
									},
									path: ['format'],
									command: 'update',
									args: {
										block_width: 815,
										block_height: null,
										block_preserve_scale: true,
										block_full_width: false,
										block_page_width: true,
										block_aspect_ratio: 0.505521472392638
									}
								},
								{
									pointer: {
										table: 'block',
										id: blockId,
										spaceId: spaceId
									},
									path: [],
									command: 'update',
									args: {
										last_edited_time: Date.now()
									}
								}]
							}]
						},
						function()
						{
							msg.blockId = blockId;
							writeLog('Getting upload URL for ' + msg.filename);

							replaceDiagram(msg, function(msg, url)
							{
								// Scrolls new block into view
								var block = document.querySelector('[data-block-id="' + blockId + '"]');

								if (block != null)
								{
									block.scrollIntoView();
									msg.newBlock = {id: blockId, url: url};
									editBlock(blockId);
								}
								else
								{
									// TODO: Fix inserting diagrams via API
									msg.failed = true;
								}

								writeLog('File inserted in block ' + blockId + ' at ' + url, msg);								
								sendResponse(msg);
							}, true);
						}, sendResponse, msg);
					}, sendResponse, msg);
				}, sendResponse, msg);
			break;
		}
		
		return true;
	});
})();
