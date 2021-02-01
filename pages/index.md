---
title: Home
layout: Base
permalink: /
description: Home page.
---

# Home
Hello, and welcome to my website! Please feel free to reach out to me with any questions and/or comments. Additionally, I would like to invite you to re-visit this site frequently to check back for more content. 

## Articles
Please find below the five most recent articles posted to this site. To view all articles, please click the "View All Articles" link below.

<ul class="list-group list-group-flush pb-2">
    {% for post in site.posts limit:5 %}
        <li class="list-group-item">
            <a href="{{ post.url }}">{{ post.title }}</a> <span class="text-muted">{{ post.date | date_to_string }}</span>
        </li>
    {% endfor %}
</ul>

[View All Articles](/articles/)

## About Me
My name is Frederick McCollum, but I go by Erick. I am a motivated IT
professional with an unrivaled passion for technology, learning, and building
valuable relationships. I strive to utilize modern technology to create valuable
solutions, make a positive business impact, and empower others.

[Read More](/about-me/)

## Contact Me
Please feel free to reach out to me via LinkedIn, GitHub, email, or FaceBook. 

[Contact Me](/contact-me/)