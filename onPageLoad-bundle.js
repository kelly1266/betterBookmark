(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function addBookmark(title, pattern, isPattern){
    // get config object
    chrome.storage.local.get("configObject", (data)=>{
        let configObject = data.configObject;
        // add new bookmark to the list
        let newBookmark = require("./templates/json/bookmark.json")
        newBookmark.Title = title;
        newBookmark.Pattern = pattern;
        newBookmark.BookmarkID = generateID();
        newBookmark.isPattern = isPattern;
        configObject.Bookmarks.push(newBookmark);
        // update config object with new bookmark
        chrome.storage.local.set({"configObject":configObject});
    });
}

function generateID(){
    const head = Date.now().toString();
    const tail = Math.random().toString().substr(2);
    return head + tail;
}

function matchesPattern(bookmark, url){
    if(bookmark.isPattern){
        // match if pattern
        const regexPattern = new RegExp(bookmark.Pattern);
        return regexPattern.test(url);
    }else{
        // match if prefix
        return url.startsWith(bookmark.Pattern);
    }
}

module.exports = {
    addBookmark,
    generateID,
    matchesPattern,
}

},{"./templates/json/bookmark.json":3}],2:[function(require,module,exports){
window.addEventListener("load", function(){
    chrome.storage.local.get("configObject", (data)=>{
        const objectManagement = require("./objectManagement.js")
        let configObject = data.configObject;
        // get current url
        const url = window.location.toString();
        // cycle through bookmarks and check for match
        let hasChanges = false;
        configObject.Bookmarks.forEach(function(item, index){
            if( objectManagement.matchesPattern(item, url) && configObject.Bookmarks[index].isBookmarkActive ){
                configObject.Bookmarks[index].LastURL = url;
                hasChanges = true;
            }
        });
        // if any matches were found, update the config object
        if (hasChanges){
            chrome.storage.local.set({"configObject":configObject});
        }
    });
});

},{"./objectManagement.js":1}],3:[function(require,module,exports){
module.exports={
    "Title": "",
    "LastURL": "",
    "BookmarkID": "",
    "Pattern": "",
    "isPattern": true,
    "addToIgnoreListAfterView":false,
    "isBookmarkActive": true,
    "IgnoreList":[]
}
},{}]},{},[2]);
