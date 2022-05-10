function getBookmark(BookmarkID, bookmarks){
    // while bookmark not found
    for (let i=0; i < bookmarks.length; i++){
        if (bookmarks[i].BookmarkID == BookmarkID){
            return bookmarks[i];
        }
    }
    newBookmark = require("./templates/json/bookmark.json");
    newBookmark.BookmarkID = BookmarkID;
    return newBookmark;
}

function createForm(bookmark){
    document.getElementById("bookmarkID").innerHTML = bookmark.BookmarkID;
    document.getElementById("bookmarkTitle").value = bookmark.Title;
    document.getElementById("bookmarkLastURL").value = bookmark.LastURL;
    document.getElementById("bookmarkPattern").value = bookmark.Pattern;
    document.getElementById("bookmarkIsPattern").checked = bookmark.isPattern;
    document.getElementById("addToIgnoreListAfterView").checked = bookmark.addToIgnoreListAfterView;
    document.getElementById("isBookmarkActive").checked = bookmark.isBookmarkActive;
    document.getElementById("formID").addEventListener("submit", function(event){
        event.preventDefault();
        console.log("Submitting Form...")
        chrome.storage.local.get("configObject", (data)=>{
            let configObject = data.configObject;
            const bookmarkID = document.getElementById("bookmarkID").innerHTML;
            let bookmarkExists = false;
            // TODO: this should be a while list for performance 
            for (let i=0; i<configObject.Bookmarks.length; i++){
                if (configObject.Bookmarks[i].BookmarkID == bookmarkID){
                    configObject.Bookmarks[i].Title = document.getElementById("bookmarkTitle").value;
                    configObject.Bookmarks[i].Pattern = document.getElementById("bookmarkPattern").value;
                    configObject.Bookmarks[i].isPattern = document.getElementById("bookmarkIsPattern").checked;
                    configObject.Bookmarks[i].addToIgnoreListAfterView = document.getElementById("addToIgnoreListAfterView").checked;
                    configObject.Bookmarks[i].isBookmarkActive = document.getElementById("isBookmarkActive").checked;
                    bookmarkExists = true;
                }
            }
            if (!bookmarkExists){
                let newBookmark = require("./templates/json/bookmark.json");
                newBookmark.BookmarkID = bookmarkID;
                newBookmark.Title = document.getElementById("bookmarkTitle").value;
                newBookmark.Pattern = document.getElementById("bookmarkPattern").value;
                newBookmark.isPattern = document.getElementById("bookmarkIsPattern").checked;
                newBookmark.addToIgnoreListAfterView = document.getElementById("addToIgnoreListAfterView").checked;
                newBookmark.isBookmarkActive = document.getElementById("isBookmarkActive").checked;
                configObject.Bookmarks.push(newBookmark);

            }
            chrome.storage.local.set({"configObject":configObject});
            window.close();
        });
    });

    document.getElementById("deleteBookmark").addEventListener("click", function(event){
        event.preventDefault();
        chrome.storage.local.get("configObject", (data)=>{
            let configObject = data.configObject;
            const bookmarkID = document.getElementById("bookmarkID").innerHTML;
            configObject.Bookmarks = configObject.Bookmarks.filter(bookmarkObj => bookmarkObj.BookmarkID !== bookmarkID);
            chrome.storage.local.set({"configObject":configObject});
            window.close();
        });
    });

    document.getElementById("cancelChanges").addEventListener("click", function(event){
        event.preventDefault();
        window.close();
    });
    
}

window.addEventListener("load", function(event) {
    chrome.storage.local.get("configObject", (data)=>{
        bookmarksObject = data.configObject.Bookmarks;
        chrome.storage.local.get("settingFormBookmarkID", (settings) =>{
            let bookmark = getBookmark(settings.settingFormBookmarkID, bookmarksObject);
            createForm(bookmark);

        });
    });
      
});
