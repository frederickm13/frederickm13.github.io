function onLoad(event) {
    document.querySelector("#search-form").addEventListener("submit", doSearch);
}

function doSearch(event) {
    // Prevent default submission
    event.preventDefault();

    const searchInput = document.querySelector("#search-input").value;

    if (searchInput === null || typeof(searchInput) === "undefined") {
        return;
    }

    const searchInputLower = searchInput.trim().toLowerCase();

    if (searchInputLower === "") {
        window.open("/articles/", "_self");
        return;
    }

    const searchString = "search=" + encodeURIComponent(searchInputLower);

    window.open(`/articles?${searchString}`, "_self");
}

document.addEventListener("DOMContentLoaded", onLoad);