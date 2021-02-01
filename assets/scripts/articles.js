function onLoad(event) {
    filterBySearch();
}

function filterBySearch() {
    const params = (new URL(window.location)).searchParams;
    const searchString = params.get("search");

    if (searchString === null || typeof(searchString) === "undefined") {
        return;
    }

    document.querySelector("#search-input").value = searchString;

    const searchStringLower = searchString.trim().toLowerCase();

    const articlesList = document.querySelectorAll("#articles-list li");

    if (articlesList.length < 1) {
        return;
    }

    articlesList.forEach((article) => {
        const txtValue = article.textContent || article.innerText;

        if (txtValue !== null && typeof(txtValue) !== "undefined") {
            const txtValueLower = txtValue.trim().toLowerCase();

            if (!filterByText(txtValueLower, searchStringLower))
            {
                article.style.display = "none";
            }
        }
    });
}

function filterByText(txtValue, searchString) {
    if (searchString === null || searchString === undefined) {
        return true;
    }

    if (txtValue.indexOf(searchString) > -1) 
    {
        return true;
    } 

    return false;
}

document.addEventListener("DOMContentLoaded", onLoad);