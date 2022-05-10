function urlInIgnoreList(bookmark, url){
    let ignore = false;
    for(i=0; i<bookmark.IgnoreList.length; i++){
        if (bookmark.IgnoreList[i] === url){
            ignore = true;
        }
    }
    return ignore;
}


window.addEventListener("load", function(){
    chrome.storage.local.get("configObject", (data)=>{
        const objectManagement = require("./objectManagement.js")
        let configObject = data.configObject;
        // get current url
        const url = window.location.toString();
        // cycle through bookmarks and check for match
        let hasChanges = false;
        configObject.Bookmarks.forEach(function(item, index){
            const canUpdateBookmark = objectManagement.matchesPattern(item, url) 
                                && configObject.Bookmarks[index].isBookmarkActive
                                && ! urlInIgnoreList(configObject.Bookmarks[index], url);
            if( canUpdateBookmark ){
                configObject.Bookmarks[index].LastURL = url;
                hasChanges = true;
                if(configObject.Bookmarks[index].addToIgnoreListAfterView ){
                    configObject.Bookmarks[index].IgnoreList.push(url)
                }
            }
        });
        // if any matches were found, update the config object
        if (hasChanges){
            chrome.storage.local.set({"configObject":configObject});
        }
    });
});
