(function()
{
	var svg = '<?xml version="1.0" encoding="UTF-8"?>\n' +
		'<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n' +
		'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="815px" height="412px" viewBox="-0.5 -0.5 815 412" content="&lt;mxfile host=&quot;app.diagrams.net&quot; modified=&quot;2023-01-22T12:50:14.862Z&quot; agent=&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36&quot; etag=&quot;-J4kKM8Kww0cTnAo6mr_&quot; version=&quot;20.8.10&quot;&gt;&lt;diagram name=&quot;Page-1&quot; id=&quot;IZTuIewHX-2reReE1Nqf&quot;&gt;ddHBEoIgEADQr+FOME3dzerSyUNngk2ZkHUQR+vr0wEzxjqxvF12GSA8q4eTE011QQWGMKoGwg+EsQ3b8XGZ5DkLZUFKp1UwukChXxALZ+20gjZaII9ovG5SlGgtSJ+YcA77tOyORiXQiBJWUEhh1nrVyldB91u6+Bl0Wc2TNzRmbkI+SoedjfMsWgiZWsxtYmlbCYX9F/Gc8Mwh+hDVQwZmetf0xY5/sp8rO7D+x4ExWHqPm+TzeP4G&lt;/diagram&gt;&lt;/mxfile&gt;" style="background-color: rgb(255, 255, 255);"><defs/><g><rect x="0" y="0" width="814" height="411" fill="none" stroke="none" pointer-events="all"/><rect x="347" y="175.5" width="120" height="60" rx="9" ry="9" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all"/><g transform="translate(-0.5 -0.5)"><switch><foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 206px; margin-left: 348px;"><div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;"><div style="display: inline-block; font-size: 16px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">Click Here to<br />Edit Diagram</div></div></div></foreignObject><text x="407" y="210" fill="rgb(0, 0, 0)" font-family="Helvetica" font-size="16px" text-anchor="middle">Click Here to...</text></switch></g></g><switch><g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"/><a transform="translate(0,-5)" xlink:href="https://www.drawio.com/doc/faq/svg-export-text-problems" target="_blank"><text text-anchor="middle" font-size="10px" x="50%" y="100%">Text is not SVG - cannot display</text></a></switch></svg>\n';

	var port = chrome.runtime.connect({name: 'popup'});
	var button = document.getElementById('insertDiagram');
	var error = document.getElementById('error');
	var prev = null;
	
	function done(failed)
	{
		if (prev != null)
		{
			button.removeAttribute('disabled');
			button.innerHTML = prev;
			prev = null;

			if (failed)
			{
				error.style.display = 'block';
			}
		}
	};

	button.onclick = function()
	{
		prev = button.innerHTML;
		error.style.display = 'none';
		button.innerHTML = 'Please wait... <img style="padding:2px 0px 0px 6px;" src="spin.gif" border="0"/>';
		button.setAttribute('disabled', 'disabled');
		port.postMessage({msg: 'insertDiagram', filename: 'Diagram.drawio.svg', data: svg});

		// Handles timeout
		window.setTimeout(function()
		{
			done(true);
		}, 6000);
	};

	port.onMessage.addListener(function(msg)
	{
		try
		{
			if (msg != null)
			{
				switch(msg.msg)
				{
					case 'insertDiagram':
						window.setTimeout(function()
						{
							done(msg.failed);
						}, 0);
					break;
				}
			}
		}
		catch (e)
		{
			done(e.message);
		}
	});

})();
