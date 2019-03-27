function searchPosts() 
{
    var inputFilter;
    inputFilter = document.getElementById("searchInput").value.toLowerCase();
    postList = document.getElementById("PostsList");
    projList = document.getElementById("ProjectsList");
    post_li = postList.getElementsByTagName("li");
    proj_li = projList.getElementsByTagName("li");

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

    for (i = 0; i < proj_li.length; i++) 
    {
        currentItem = proj_li[i];
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