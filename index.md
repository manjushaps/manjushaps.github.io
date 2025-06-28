---
layout: default
title: Welcome
---

<h1>Welcome to Techn0tz blog</h1>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a> — {{ post.date | date: "%B %d, %Y" }}
    </li>
  {% endfor %}
</ul>
