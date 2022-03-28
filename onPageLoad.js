window.addEventListener("load", function(){
    chrome.storage.local.get("configObject", (data)=>{
        const objectManagement = require("./objectManagement.js")
        let configObject = data.configObject;
        // get current url
        const url = window.location.toString();
        // cycle through bookmarks and check for match
        let hasChanges = false;
        configObject.Bookmarks.forEach(function(item, index){
            if( objectManagement.matchesPattern(item, url) ){
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
