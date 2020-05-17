function triggerSearch(event) {
    if (event.keyCode === 13) {
        hashSearch();
    }
}

function setHash(hashString) {
    if (hashString === null || hashString === undefined) {
        hashString = "";
    }

    window.location.hash = hashString;
}

function getSearchString() {
    let searchString = document.getElementById("searchInput").value;
    if (searchString === null || searchString === undefined || searchString.length < 1) {
        return null;
    }

    return searchString;
}

function getTagFilter() {
    let filterString = document.getElementById("tag-select").value;

    if (filterString === "" || filterString === null || filterString === undefined) {
        return null;
    }

    return filterString;
}

function buildHashString(searchString, filterString) {
    let queryString = "";
    let hasSearchString = false;

    if (searchString !== null && searchString !== undefined) {
        hasSearchString = true;
        searchString = "search=" + encodeURIComponent(searchString);
        queryString += searchString;
    }

    if (filterString !== null && filterString !== undefined) {
        filterString = "tagFilter=" + encodeURIComponent(filterString);

        if (hasSearchString) {
            queryString += "&"
        }

        queryString += filterString;
    }

    return queryString;
}

function getQueryString() 
{
    let queryString = decodeURI(window.location.hash).replace("#", "");
    let searchString = null;
    let tagString = null;
    
    if (queryString.length > 0) {
        queryString = queryString.split("&");
    } else {
        showAllPosts();
        return;
    }

    let queryStringObj = {};

    queryString.forEach(function (str) {
        str = str.split("=");
        queryStringObj[str[0]] = decodeURIComponent(str[1]);
    });
    
    if (queryStringObj["search"] !== null && queryStringObj["search"] !== undefined) {
        searchString = queryStringObj["search"].toLowerCase();
    }

    if (queryStringObj["tagFilter"] !== null && queryStringObj["tagFilter"] !== undefined) {
        tagString = queryStringObj["tagFilter"].toLowerCase();
    }

    searchPosts(searchString, tagString);
}

function showAllPosts() {
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

function filterByText(postTxt, searchString) {
    if (searchString === null || searchString === undefined) {
        return true;
    }

    if (txtValue.indexOf(searchString) > -1) 
    {
        return true;
    } 

    return false;
}

function searchPosts(searchString, filterString) {
    console.log("Searching for: " + searchString + "; Filtered by: " + filterString);
    let postList = document.getElementById("PostsList");
    let post_li = postList.getElementsByTagName("li");

    for (i = 0; i < post_li.length; i++) 
    {
        currentItem = post_li[i];
        if (currentItem) 
        {
            txtValue = currentItem.textContent || currentItem.innerText;
            txtValue = txtValue.toLowerCase();

            if (filterByText(txtValue, searchString) && filterByText(txtValue, filterString)) 
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

function hashSearch() {
    let searchString = getSearchString();
    let tagString = getTagFilter();
    let queryString = buildHashString(searchString, tagString);
    setHash(queryString);
}

function clearFilters() {
    let searchBox = document.getElementById("searchInput");
    let tagSelect = document.getElementById("tag-select");

    searchBox.value = null;
    tagSelect.value = "";

    hashSearch();
}

window.addEventListener("DOMContentLoaded", function () {
    getQueryString();
});

window.addEventListener("hashchange", function () {
    getQueryString();
});