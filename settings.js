function getBookmark(BookmarkID, bookmarks){
    // while bookmark not found
    for (let i=0; i < bookmarks.length; i++){
        if (bookmarks[i].BookmarkID == BookmarkID){
            return bookmarks[i];
        }
    }
}

function bookmarkExists(bookmarkID){
    return true;
}

function createForm(bookmark){
    document.getElementById("formDiv").innerHTML = `
    <h2>Bookmark ID: <a id="bookmarkID">${bookmark.BookmarkID}</a></h2>
    <form id="formID" action="#">
        <label for="bookmarkTitle">Title:</label><br>
        <input type="text" id="bookmarkTitle" value="${bookmark.Title}"><br><br>
        <label for="bookmarkLastURL">Last Visited URL:</label><br>
        <input type="text" id="bookmarkLastURL" value="${bookmark.LastURL}" disabled="true"><br><br>
        <label for="bookmarkPattern">Pattern:</label><br>
        <input type="text" id="bookmarkPattern" value="${bookmark.Pattern}"><br><br>
        <input type="checkbox" id="bookmarkIsPattern" name="bookmarkIsPattern" ${bookmark.isPattern ? "checked": ""}>
        <label for="bookmarkIsPattern">Pattern or Prefix?</label><br><br><br>
        <button>Delete Bookmark</button>
        <button>Cancel Changes</button>
        <input type="submit" value="Apply Changes">
    </form>
    
    `;
    document.getElementById("formID").addEventListener("submit", function(event){
        event.preventDefault();
        console.log("Submitting Form...")
        chrome.storage.local.get("configObject", (data)=>{
            let configObject = data.configObject;
            const bookmarkID = document.getElementById("bookmarkID").innerHTML;
            for (let i=0; i<configObject.Bookmarks.length; i++){
                if (configObject.Bookmarks[i].BookmarkID == bookmarkID){
                    configObject.Bookmarks[i].Title = document.getElementById("bookmarkTitle").value;
                    configObject.Bookmarks[i].Pattern = document.getElementById("bookmarkPattern").value;
                    configObject.Bookmarks[i].isPattern = document.getElementById("bookmarkIsPattern").checked;
                }
            }
            chrome.storage.local.set({"configObject":configObject});
            window.close();
        });
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
