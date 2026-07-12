chrome.runtime.onInstalled.addListener(()=>
	chrome.tabs.query({url:['https://vk.com/*','https://vk.ru/*']},e=>
		e.forEach(e=>
			chrome.scripting.executeScript({target:{tabId:e.id},files:['init.js']}))
	)
)