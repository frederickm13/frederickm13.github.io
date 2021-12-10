---
title: Home
layout: Base
permalink: /
description: Home page.
---

# Home
Hello, and welcome to my website! My name is Frederick McCollum, but I go by Erick. You can read more [about me here](about).

Please feel free [contact me](contact) with any questions and/or comments. Additionally, I would like to invite you to re-visit this site frequently to check back for more content. 

## Recent Posts
<ul class="list-group list-group-flush">
    {% for post in site.posts limit:10 %}
        <li class="list-group-item">
            <a href="{{ post.url }}">{{ post.title }}</a> <span class="text-muted">{{ post.date | date_to_string }}</span>
        </li>
    {% endfor %}
</ul>