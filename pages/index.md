---
title: Home
layout: default
permalink: /
description: Home page.
---

<h1 class="w3-monospace w3-xxlarge">About Me</h1>
My name is Frederick McCollum, but I go by Erick. I am a well-organized leader with a work ethic that has never been seen before. Every day I bring a sense of humor and contagious, positive energy. Communication is my best strength, and I honestly enjoy writing documentation. I have an unrivaled passion for technology, learning, solving problems, and building valuable relationships. If you give me a chance, I will be a respected leader within 6 months of joining your team.

I am currently employed by *[H-E-B](https://www.heb.com/)* as a Software Engineer II based in San Antonio, TX. I graduated from *[Schreiner University](https://schreiner.edu/)* in May of 2017 with a Bachelor of Business Administration degree in Information Systems, including minors in both Mathematics and Finance. I graduated from the *[University of Dallas](https://udallas.edu/)* in December of 2021 with a Master of Science in Business Analytics.

<h2 class="w3-monospace w3-xxlarge">Posts</h2>
<ul class="w3-ul">
    {% for post in site.posts %}
        <li>
            <a href="{{ post.url }}">{{ post.title }} | <span class="w3-text-grey">{{ post.date | date_to_string }}</span></a>
        </li>
    {% endfor %}
</ul>
