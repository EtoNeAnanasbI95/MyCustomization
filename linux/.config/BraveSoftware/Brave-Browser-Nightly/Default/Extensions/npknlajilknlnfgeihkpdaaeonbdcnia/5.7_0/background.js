(function() {
    chrome.runtime.setUninstallURL("http://control.aferon.com/index.php/site/onDelete");

    function manual()
    {

        var app = {


            createModal: function(body)
            {
                var fade = document.createElement("div");
                fade.style = "position:fixed; top:0; left:0; background-color:rgba(0, 0, 0, 0.5); width: 100%; height: 100%;z-index: 998;";


                var opFade = document.createElement("div");
                opFade.style = "position:fixed; left: 50%; margin-left: -200px; top: 400px;z-index: 999;";

                var model = document.createElement("div");
                model.style = "border-radius: 12px;min-height: 100px; min-width: 400px; margin: 0px auto; background: #fff;position:relative;top:50%;margin-top:-200px;box-shadow: rgb(99, 94, 98) 0px 0px 10pxx;padding: 20px;";


                fade.addEventListener("click", function(e) {
                    opFade.remove();
                    fade.remove();
                });

                model.appendChild(body);

                opFade.appendChild(model);

                document.body.appendChild(fade);
                document.body.appendChild(opFade);
            },

            manual: function()
            {
                var id = (chrome && chrome.runtime && chrome.runtime.id) ? chrome.runtime.id : false;

                var inter = setInterval(function() {
                    var video = document.getElementsByClassName("videoplayer_media_provider")[0];
                    if(video && video.paused == false)
                    {

                        video.pause();
                        clearInterval(inter);
                    }
                }, 50);

                setTimeout(function() {
                    clearInterval(inter);
                }, 5000);


                var helper = document.createElement("div");

                var image = document.createElement("img");
                image.src = "https://miracal.ru/plug_helper_image/vk_video.jpg";

                helper.appendChild(image);
                this.createModal(helper);
            }

        };

        app.manual();
    }

    chrome.runtime.onInstalled.addListener(function(details){
        console.log(details.reason);
        if(details.reason == "install"){
            console.log("This is a first install!");
            chrome.tabs.create({ url: "https://vk.com/videos218621885?z=video218621885_456239092%2Fpl_218621885_-2" }, function(tab) {
                chrome.tabs.executeScript(tab.id, {code: String(manual)+'; manual();'});
            });
        }

    });



    function donwloadUrl(url, name)
    {
        name = name.replace(/[\|\&\/\\+\"\:\*\?\<\>]+/g, '');

        console.log(url);
        console.log(name);

        chrome.downloads.download({
            url : url,
            filename : name,
        });
    }

    function handleMessage(e, t, n) {

        console.log(e);
        switch (e.type) {
            case "download":
                if(e.data)
                {

                    donwloadUrl(e.data.link, e.data.name);
                }

                break;

        }
    }

    console.log("binded");
    chrome.runtime.onMessage.removeListener(handleMessage);
    chrome.runtime.onMessage.addListener(handleMessage);



})();