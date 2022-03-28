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
