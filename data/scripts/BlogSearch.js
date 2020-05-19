function triggerSearch(event) {
    if (event.keyCode === 13) {
        doSearch();
    }
}

function setSearch(queryString) {
    if (queryString.length < 1 || queryString === null || queryString === undefined) {
        window.open("/blog/", "_self");
    } else {
        window.location.search = queryString;
    }
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

function buildSearchString(searchString, filterString) {
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
    let params = (new URL(window.location)).searchParams;
    let searchString = params.get("search");
    let tagString = params.get("tagFilter");
    
    if (searchString !== null && searchString !== undefined) {
        document.getElementById("searchInput").value = searchString;
        searchString = searchString.toLowerCase();
    }

    if (tagString !== null && tagString !== undefined) {
        setTagSelect(tagString);
        tagString = tagString.toLowerCase();
    }

    searchPosts(searchString, tagString);
}

function setTagSelect(stringVal) {
    let tagSelectEl = document.getElementById("tag-select");
    let tagSelectOptions = tagSelectEl.options;
    let selectIndex = 0;

    for (x = 0; x < tagSelectOptions.length; x++) {
        if (tagSelectOptions[x].value === stringVal) {
            selectIndex =  tagSelectOptions[x].index;
            break;
        }
    }

    tagSelectEl.selectedIndex = selectIndex;
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

function doSearch() {
    let searchString = getSearchString();
    let tagString = getTagFilter();
    let queryString = buildSearchString(searchString, tagString);
    setSearch(queryString);
}

function clearFilters() {
    let searchBox = document.getElementById("searchInput");
    let tagSelect = document.getElementById("tag-select");

    searchBox.value = null;
    tagSelect.value = "";

    doSearch();
}

window.addEventListener("DOMContentLoaded", function () {
    getQueryString();
});