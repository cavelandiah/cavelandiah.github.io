---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% include base_path %}

<p class="publications-intro">Peer-reviewed articles, book chapters, and doctoral research in computational RNA biology. This list is generated from a single, version-controlled BibTeX file.</p>

{% assign publications = site.publications | sort: "date" | reverse %}
{% assign current_year = "" %}
<div class="publication-list">
{% for post in publications %}
  {% assign publication_year = post.date | date: "%Y" %}
  {% if publication_year != current_year %}
    {% unless forloop.first %}</section>{% endunless %}
    <section class="publication-year" aria-labelledby="publications-{{ publication_year }}">
      <h2 id="publications-{{ publication_year }}">{{ publication_year }}</h2>
    {% assign current_year = publication_year %}
  {% endif %}
  {% include publication-card.html %}
  {% if forloop.last %}</section>{% endif %}
{% endfor %}
</div>

<p class="publications-note">Publication metadata is maintained in <a href="https://github.com/{{ site.repository }}/blob/master/_bibliography/references.bib">BibTeX</a>. You can also browse the <a href="{{ site.author.googlescholar }}">Google Scholar profile</a> or <a href="{{ site.author.orcid }}">ORCID record</a>.</p>
