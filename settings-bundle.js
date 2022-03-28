(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
        <button id="deleteBookmark">Delete Bookmark</button>
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
            let bookmarkExists = false;
            for (let i=0; i<configObject.Bookmarks.length; i++){
                if (configObject.Bookmarks[i].BookmarkID == bookmarkID){
                    configObject.Bookmarks[i].Title = document.getElementById("bookmarkTitle").value;
                    configObject.Bookmarks[i].Pattern = document.getElementById("bookmarkPattern").value;
                    configObject.Bookmarks[i].isPattern = document.getElementById("bookmarkIsPattern").checked;
                    bookmarkExists = true;
                }
            }
            if (!bookmarkExists){
                let newBookmark = require("./templates/json/bookmark.json");
                newBookmark.BookmarkID = bookmarkID;
                newBookmark.Title = document.getElementById("bookmarkTitle").value;
                newBookmark.Pattern = document.getElementById("bookmarkPattern").value;
                newBookmark.isPattern = document.getElementById("bookmarkIsPattern").checked;
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

},{"./templates/json/bookmark.json":2}],2:[function(require,module,exports){
module.exports={
    "Title": "",
    "LastURL": "",
    "BookmarkID": "",
    "Pattern": "",
    "isPattern": true,
    "BookmarkActive": true,
    "IgnoreList":[]
}
},{}]},{},[1]);
