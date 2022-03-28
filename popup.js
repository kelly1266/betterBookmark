function populateExistingBookmarks(){
    const existingBookmarks = document.getElementById("existingBookmarks");
    chrome.storage.local.get("configObject", (data)=>{
        data.configObject.Bookmarks.forEach(function(item, index){
            existingBookmarks.innerHTML += `
                <div class="bookmarkCard">
                    <div class="bookmarkTitle bookmark-clickable" data-url="${item.LastURL}">
                        <a>${item.Title}</a>
                    </div>
                    <div class="settingsWheel">
                        <img src="../../icons/settingswheel20.png" class="settings" data-bookmarkid="${item.BookmarkID}"/>
                    </div>
                </div>
            `;
        });
    });
}

function generateID(){
    const head = Date.now().toString();
    const tail = Math.random().toString().substr(2);
    return head + tail;
}

// populate page with existing bookmarks
populateExistingBookmarks();
// add the listener events
window.addEventListener("load", function(event) {
    // add click listeners for redirection the page
    let elements = document.getElementsByClassName("bookmark-clickable");
    Array.from(elements).forEach(function(element) {
        element.addEventListener('click', function(event){
            event.preventDefault();
            let location = this.getAttribute("data-url");
            chrome.tabs.create({active: false, url: location});
        });
    });

    // add click listeners for opening settings popup
    let settingsElements = document.getElementsByClassName("settings");
    Array.from(settingsElements).forEach(function(element) {
        element.addEventListener('click', function(event){
            event.preventDefault();
            const options = {
                type: "popup",
                url: "templates/html/settings.html",
                focused: true,
            }
            let settingFormBookmarkID = element.getAttribute("data-bookmarkid");
            chrome.storage.local.set({"settingFormBookmarkID":settingFormBookmarkID});
            // create window and get the promise result
            chrome.windows.create(options);
            window.close();
        });
    });

    // add click listener to create a new bookmark
    let addNewBookmarkElement = document.getElementById("newBookmarkRow");
    addNewBookmarkElement.addEventListener('click', function(event){
        event.preventDefault();
        const options = {
            type: "popup",
            url: "templates/html/settings.html",
            focused: true,
        }
        let settingFormBookmarkID = generateID();
        chrome.storage.local.set({"settingFormBookmarkID":settingFormBookmarkID});
        // create window and get the promise result
        chrome.windows.create(options);
        window.close();
    });
});
