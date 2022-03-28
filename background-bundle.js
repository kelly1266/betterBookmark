(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
chrome.runtime.onInstalled.addListener(function(){
    // create initial config object
    const configObject = require("./templates/json/config.json");
    chrome.storage.local.set({"configObject":configObject});
});

// chrome.runtime.onUpdateAvailable.addListener(function(){
//     const configObject = require("./config.json");
//     chrome.storage.local.set({"configObject":configObject});
// });
},{"./templates/json/config.json":2}],2:[function(require,module,exports){
module.exports={"StorageKey":"","Bookmarks":[]}
},{}]},{},[1]);
