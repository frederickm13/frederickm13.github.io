function triggerSearch(event) {
    if (event.keyCode === 13) {
        setHash();
    }
}

function setHash(event) {
    let searchString = document.getElementById("searchInput").value;
    if (searchString !== null && searchString !== undefined && searchString.length > 0) {
        searchString = "search=" + encodeURIComponent(searchString);
    }

    window.location.hash = searchString;
}

function getQueryString(event) 
{
    let queryString = decodeURI(window.location.hash).replace("#", "").toLowerCase()
    
    if (queryString.length > 0) {
        queryString = queryString.split("&");
    } else {
        showAllPosts(event);
        return;
    }

    let queryStringObj = {};

    queryString.forEach(function (str) {
        str = str.split("=");
        queryStringObj[str[0]] = decodeURIComponent(str[1]);
    });
    
    if (queryStringObj["search"] !== null && queryStringObj["search"] !== undefined) {
        searchPosts(event, queryStringObj["search"]);
    }
}

function showAllPosts(event) {
    postList = document.getElementById("PostsList");
    post_li = postList.getElementsByTagName("li");

    for (i = 0; i < post_li.length; i++) 
    {
        currentItem = post_li[i];
        if (currentItem) 
        {
            currentItem.style.display = "list-item";
        }
    }
}

function searchPosts(event, searchString) {
    console.log("Searching for: " + searchString);
    postList = document.getElementById("PostsList");
    post_li = postList.getElementsByTagName("li");

    for (i = 0; i < post_li.length; i++) 
    {
        currentItem = post_li[i];
        if (currentItem) 
        {
            txtValue = currentItem.textContent || currentItem.innerText;
            if (txtValue.toLowerCase().indexOf(searchString) > -1) 
            {
                currentItem.style.display = "list-item";
            } 
            else 
            {
                currentItem.style.display = "none";
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", function (event) {
    getQueryString(event);
});

window.addEventListener("hashchange", function (event) {
    getQueryString(event);
});