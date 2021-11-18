---
title: Home
layout: Base
permalink: /
description: Home page.
---

# Home
Hello, and welcome to my website! My name is Frederick McCollum, but I go by Erick. I am a well-organized leader with a work ethic that has never been seen before. Every day I bring a sense of humor and contagious, positive energy. Communication is my best strength, and I honestly enjoy writing documentation. I have an unrivaled passion for technology, learning, solving problems, and building valuable relationships. If you give me a chance, I will be a respected leader within 6 months of joining your team. 

Please feel free to reach out to me with any questions and/or comments. Additionally, I would like to invite you to re-visit this site frequently to check back for more content. 

## Recent Content
<ul class="list-group list-group-flush">
    {% for post in site.posts limit:10 %}
        <li class="list-group-item">
            <a href="{{ post.url }}">{{ post.title }}</a> <span class="text-muted">{{ post.date | date_to_string }}</span>
        </li>
    {% endfor %}
</ul>