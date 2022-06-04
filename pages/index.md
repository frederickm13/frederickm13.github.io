---
title: Home
layout: default
permalink: /
description: Home page.
---

<h1 class="w3-monospace w3-xxlarge">About Me</h1>
I am a well-organized leader with an incredible work ethic and a learn-it-all mindset. I can learn anything, and I will grow every day. I bring a sense of humor and contagious, positive energy to my team. Communication is my greatest strength, and I honestly enjoy writing documentation. I have an unrivaled passion for technology, learning, solving problems, and building valuable relationships. If you give me a chance, I will be a respected leader within 6 months of joining your team.

I graduated from *[Schreiner University](https://schreiner.edu/)* with a Bachelor of Business Administration degree in Information Systems, including minors in both Mathematics and Finance. Following the completion of my undergraduate degree, I obtained a Master of Science in Business Analytics from the *[University of Dallas](https://udallas.edu/)*.

<h2 class="w3-monospace w3-xxlarge">Posts</h2>
<ul class="w3-ul">
    {% for post in site.posts %}
        <li>
            <a href="{{ post.url }}">{{ post.title }} | <span class="w3-text-grey">{{ post.date | date_to_string }}</span></a>
        </li>
    {% endfor %}
</ul>
