/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/core/api/front/api.port.ts
let port;
const connectListeners = new Set();
const disconnectListeners = new Set();
const messageListeners = new Set();
function addConnectListener(listener) {
    connectListeners.add(listener);
    listener();
}
function addDisconnectListener(listener) {
    disconnectListeners.add(listener);
}
function addMessageListener(listener) {
    messageListeners.add(listener);
}
const connect = () => {
    if (port) {
        return port;
    }
    try {
        port = browser.runtime.connect({ name: "ui" });
    }
    catch (ex) {
        port = null;
        disconnectListeners.forEach((listener) => {
            listener();
        });
        return port;
    }
    port.onMessage.addListener((message) => {
        onMessage(message);
    });
    port.onDisconnect.addListener(onDisconnect);
    connectListeners.forEach((listener) => {
        listener();
    });
    return port;
};
function listen({ type, filter, ...options }) {
    addConnectListener(() => {
        if (port) {
            port.postMessage({
                type: `${type}.listen`,
                filter,
                ...options
            });
        }
    });
}
function onDisconnect() {
    port = null;
    setTimeout(() => connect(), 100);
}
function onMessage(message) {
    if (!message.type.endsWith(".respond")) {
        return;
    }
    messageListeners.forEach((listener) => {
        listener(message);
    });
}
function removeDisconnectListener(listener) {
    disconnectListeners.delete(listener);
}

;// CONCATENATED MODULE: ./src/core/api/front/api.ts

const platformToStore = {
    chromium: "chrome",
    edgehtml: "edge",
    gecko: "firefox"
};
const app = {
    get: async (what) => await send("app.get", { what }),
    getInfo: async () => {
        return await Promise.all([
            app.get("application"),
            app.get("platform")
        ]).then(([application, rawPlatform]) => {
            var _a;
            const platform = rawPlatform;
            let store;
            if (application !== "edge" && application !== "opera") {
                store = (_a = platformToStore[platform]) !== null && _a !== void 0 ? _a : "chrome";
            }
            else {
                store = application;
            }
            return {
                application,
                manifestVersion: browser.runtime.getManifest().manifest_version,
                platform,
                store
            };
        });
    },
    listen: (filter) => {
        listen({ type: "app", filter });
    },
    open: async (what, options = {}) => await send("app.open", { what, ...options })
};
const ctalinks = {
    get: async (link, queryParams = {}) => await send("app.get", { what: "ctalink", link, queryParams })
};
const doclinks = {
    get: async (link) => await send("app.get", { what: "doclink", link })
};
const filters = {
    get: async () => await send("filters.get"),
    listen: (filter) => {
        listen({ type: "filters", filter });
    }
};
const notifications = {
    get: async (displayMethod) => await send("notifications.get", { displayMethod }),
    seen: async () => await send("notifications.seen")
};
const prefs = {
    get: async (key) => await send("prefs.get", { key }),
    listen: (filter) => {
        listen({ type: "prefs", filter });
    }
};
const premium = {
    activate: async (userId) => await send("premium.activate", { userId }),
    get: async () => await send("premium.get"),
    add: async (subscriptionType) => {
        await send("premium.subscriptions.add", { subscriptionType });
    },
    getPremiumSubscriptionsState: async () => {
        return await send("premium.subscriptions.getState");
    },
    remove: async (subscriptionType) => {
        await send("premium.subscriptions.remove", { subscriptionType });
    },
    listen: (filter) => {
        listen({ type: "premium", filter });
    }
};
const requests = {
    listen: (filter, tabId) => {
        listen({ type: "requests", filter, tabId });
    }
};
async function send(sendType, rawArgs = {}) {
    const args = {
        ...rawArgs,
        type: sendType
    };
    return await browser.runtime.sendMessage(args);
}
const stats = {
    getBlockedPerPage: async (tab) => await send("stats.getBlockedPerPage", { tab }),
    getBlockedTotal: async () => await send("stats.getBlockedTotal"),
    listen: (filter) => {
        listen({ type: "stats", filter });
    }
};
const subscriptions = {
    add: async (url) => await send("subscriptions.add", { url }),
    get: async (options) => await send("subscriptions.get", options),
    getInitIssues: async () => await send("subscriptions.getInitIssues"),
    getRecommendations: async () => await send("subscriptions.getRecommendations"),
    listen: (filter) => {
        listen({ type: "subscriptions", filter });
    },
    remove: async (url) => await send("subscriptions.remove", { url })
};
const info = {
    get: async () => await send("info.get"),
    getInjectionInfo: async () => await send("info.getInjectionInfo")
};
const api_api = {
    addDisconnectListener: addDisconnectListener,
    addListener: addMessageListener,
    app,
    ctalinks,
    doclinks,
    filters,
    notifications,
    prefs,
    premium,
    requests,
    removeDisconnectListener: removeDisconnectListener,
    subscriptions,
    stats
};
connect();
/* harmony default export */ const front_api = ((/* unused pure expression or super */ null && (api_api)));

;// CONCATENATED MODULE: ./src/core/api/front/index.ts




/* harmony default export */ const front = ((/* unused pure expression or super */ null && (api)));

;// CONCATENATED MODULE: ./src/premium-onboarding/content/onboarding.ts

function onClick(event) {
    if (!event.isTrusted) {
        return;
    }
    const element = event.target;
    if (!(element instanceof HTMLElement)) {
        return;
    }
    if (!element.matches(`[data-extension-page="premium-onboarding"]`)) {
        return;
    }
    event.stopPropagation();
    event.preventDefault();
    void app.open("premium-onboarding", { replaceTab: true });
}
function start() {
    document.addEventListener("click", onClick);
}
start();

;// CONCATENATED MODULE: ./src/premium-onboarding/content/index.ts


/******/ })()
;