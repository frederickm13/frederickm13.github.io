function triggerSearch(event) {
    if (event.keyCode === 13) {
        setHash();
    }
}

function setHash(event) {
    window.location.hash = encodeURIComponent(document.getElementById("searchInput").value);
}

function searchPosts(event) 
{
    console.log("searching");
    var inputFilter = decodeURI(window.location.hash).replace("#", "");
    postList = document.getElementById("PostsList");
    post_li = postList.getElementsByTagName("li");

    for (i = 0; i < post_li.length; i++) 
    {
        currentItem = post_li[i];
        if (currentItem) 
        {
            txtValue = currentItem.textContent || currentItem.innerText;
            if (txtValue.toLowerCase().indexOf(inputFilter) > -1) 
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
    searchPosts(event);
});

window.addEventListener("hashchange", function (event) {
    searchPosts(event);
});