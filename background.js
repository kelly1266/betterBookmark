chrome.runtime.onInstalled.addListener(function(){
    // create initial config object
    const configObject = require("./templates/json/config.json");
    chrome.storage.local.set({"configObject":configObject});
});

// chrome.runtime.onUpdateAvailable.addListener(function(){
//     const configObject = require("./config.json");
//     chrome.storage.local.set({"configObject":configObject});
// });