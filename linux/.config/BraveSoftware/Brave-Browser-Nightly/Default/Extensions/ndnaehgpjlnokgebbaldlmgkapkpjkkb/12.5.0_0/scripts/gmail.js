
(function () {
    'use strict';

    var inject = document.createElement('script');

    inject.setAttribute('version', chrome.runtime.getManifest().version);
    inject.setAttribute('id', chrome.runtime.id);

    if (chrome.runtime.getManifest().manifest_version === 3) {
        inject.src = chrome.runtime.getURL('scripts/bundles/gmail.inject.bundle.js');
    } else {
        inject.src = chrome.extension.getURL('scripts/bundles/gmail.inject.bundle.js');
    }

    inject.onload = function() {
        this.remove();
    };

    document.documentElement.appendChild(inject);
}());
