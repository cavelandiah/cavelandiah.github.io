---
permalink: /
title: "Computational RNA biology"
excerpt: "Research at the intersection of RNA evolution, algorithms, and reproducible genomics."
author_profile: true
science_hero: true
redirect_from: 
  - /about/
  - /about.html
---

<section class="science-hero" aria-labelledby="hero-title">
  <div class="science-hero__copy">
    <p class="science-hero__eyebrow">Computational RNA biology</p>
    <h1 class="science-hero__title" id="hero-title">Finding the signals that make RNA regulatory</h1>
    <p class="science-hero__lede">I combine sequence, structure, and evolution to distinguish functional non-coding RNAs from genomic noise—and turn biological evidence into reproducible models.</p>
    <div class="science-hero__actions">
      <a class="science-hero__action science-hero__action--primary" href="{{ '/publications/' | relative_url }}">Explore my research</a>
      <a class="science-hero__action science-hero__action--secondary" href="{{ '/industry/' | relative_url }}">Industry collaborations</a>
    </div>
  </div>
  <svg class="science-hero__art" viewBox="0 0 640 390" role="img" aria-labelledby="about-rna-evidence-title about-rna-evidence-desc">
    <title id="about-rna-evidence-title">Evolutionary evidence resolves a regulatory RNA signal</title>
    <desc id="about-rna-evidence-desc">One RNA strand forms a hairpin, passes through a sparse field of conserved sequence evidence, and ends in a short highlighted region representing an evidence-supported regulatory annotation.</desc>
    <defs aria-hidden="true">
      <linearGradient id="about-rna-field-gradient" x1="0" y1="0" x2="1" y2="1" aria-hidden="true">
        <stop offset="0" stop-color="currentColor" stop-opacity="0"/>
        <stop offset=".52" stop-color="currentColor" stop-opacity=".12"/>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="about-rna-signal-gradient" aria-hidden="true">
        <stop offset="0" stop-color="currentColor" stop-opacity=".2"/>
        <stop offset="1" stop-color="currentColor" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <g class="science-hero__peripheral" aria-hidden="true">
      <ellipse class="science-hero__field" cx="355" cy="225" rx="150" ry="120" fill="url(#about-rna-field-gradient)"/>
      <path class="science-hero__pair" d="M105 247 Q134 221 163 240 M103 266 Q133 244 166 258 M108 286 Q135 267 160 277"/>
      <g class="science-hero__alignment">
        <path d="M275 152h34 M328 152h18 M379 152h45 M252 182h20 M293 182h47 M366 182h25 M416 182h22 M267 213h50 M345 213h22 M392 213h35 M282 244h25 M329 244h42 M400 244h29 M258 275h38 M321 275h19 M367 275h53"/>
        <circle cx="310" cy="120" r="3"/><circle cx="359" cy="137" r="2"/><circle cx="410" cy="116" r="3"/><circle cx="244" cy="235" r="2"/><circle cx="442" cy="259" r="2.5"/><circle cx="385" cy="297" r="3"/>
      </g>
      <circle class="science-hero__signal-halo" cx="584" cy="199" r="48" fill="url(#about-rna-signal-gradient)"/>
    </g>
    <path class="science-hero__strand" d="M36 302 C76 291 80 235 111 223 C147 209 180 241 168 276 C157 309 108 308 102 272 C95 233 139 194 191 205 C239 216 244 272 286 263 C338 252 354 198 405 210 C455 222 468 260 508 244 C548 228 555 187 610 195"/>
    <path class="science-hero__mature" d="M548 228 C564 214 579 191 610 195"/>
    <g class="science-hero__evidence-dots" aria-hidden="true">
      <circle cx="286" cy="263" r="4"/><circle cx="354" cy="218" r="4"/><circle cx="405" cy="210" r="4"/><circle cx="469" cy="253" r="4"/>
    </g>
  </svg>
</section>

## From genomes to testable models

¡Hola! I am a bioinformatician studying the regulatory landscape shaped by non-coding RNA genomes. My work joins an interest in algorithm design with practical experience in comparative genomics—from annotating ncRNAs in invasive tunicates to studying concerted tRNA evolution in primates and fruit flies.

<div class="research-grid">
  <section class="research-card"><h2>Discover</h2><p>Find conserved non-coding RNAs in model and non-model genomes through sequence and structural evidence.</p></section>
  <section class="research-card"><h2>Model</h2><p>Turn biological evidence into probabilistic, reproducible predictions that can be inspected and tested.</p></section>
  <section class="research-card"><h2>Trace</h2><p>Follow miRNA innovation and loss across chordates to understand how regulatory systems evolve.</p></section>
</div>

I completed an MSc in Bioinformatics with Dra. Clara Bermúdez (Universidad Nacional de Colombia) and Dr. Federico Brown (University of São Paulo), studying microRNA evolution in tunicates. Collaboration with Dr. Peter F. Stadler (Leipzig University) led to a PhD in Computer Science focused on assessing metazoan miRNA annotations and tracing their evolution across chordates.

## Reliable annotation, by design

My doctoral work expanded into computational detection of ncRNAs, especially in tunicates, and into probabilistic predictive models. I created **miRNAture**, a pipeline that evaluates bona fide miRNA annotations by combining homology with structural features. The aim is not simply to produce more predictions, but to make every prediction explainable, comparable, and reusable.

<figure class="scientific-figure">
  <img src="{{ '/images/rna-evidence-network.svg' | relative_url }}" alt="Diagram linking RNA sequence, a hairpin structure, evolutionary evidence, and a validated annotation node.">
  <figcaption>Evidence integration in an RNA annotation workflow: sequence and secondary structure are evaluated in an evolutionary context before a candidate enters the curated annotation set.</figcaption>
</figure>

## Selected work

- [**Orthologs, turn-over, and remolding of tRNAs in primates and fruit flies**]({{ '/publication/2016-08-16-tRNA-turnover-number-1' | relative_url }}) — traced the concerted evolution of transfer RNAs across primate and fruit-fly genomes.
- [**Automated detection of ncRNAs in the draft genome of *Didemnum vexillum***]({{ '/publication/2016-08-30-draft-didemnum-vexillum-number-2' | relative_url }}) — contributed a comprehensive non-coding RNA annotation to the first draft genome assembly of this colonial tunicate.
- [**Nonprotein-Coding RNAs as Regulators of Development in Tunicates**]({{ '/publication/2018-08-07-regulator-tunicates-ncrnas-paper-3' | relative_url }}) — synthesized evidence for how non-coding RNAs regulate tunicate development and evolution.

[Browse all publications]({{ '/publications/' | relative_url }})

<!-- Current-project details needed: supply the project title, research question, status or timeframe, and a public project page for each project that may be named here. -->
<!-- Current-affiliation details needed: confirm the institution, group, position title, and dates that should appear on this page. -->
<!-- Funding details needed: supply the funder, grant or consortium name, grant number, funding period, and a public award page for any current support that may be acknowledged here. -->
<!-- Software-link details needed: supply the canonical repository and documentation or release URL for miRNAture and any other maintained research software. -->

## Current questions

- How do RNA chemical modifications reshape molecular structure and function?
- Which combinations of sequence, structure, and evolutionary evidence make ncRNA annotation dependable across divergent genomes?
- How do microRNA families emerge, change, and disappear across chordate evolution?

## Work with me

- **Academic research:** [Discuss a research collaboration](mailto:{{ site.author.email }})
- **Industry collaboration:** [Explore capabilities and ways to engage]({{ '/industry/' | relative_url }})

<!-- Collaboration-preference details needed: state the academic questions, methods, organisms, project stages, and mentoring or co-supervision opportunities currently sought. -->
<!-- Collaboration-preference details needed: state current industry availability, preferred engagement types and sectors, timing constraints, and any data, publication, confidentiality, or intellectual-property requirements. -->

<aside class="contact-callout" aria-labelledby="about-contact-title">
  <h2 id="about-contact-title">Start a conversation</h2>
  <p>Have a research question or collaboration in mind?</p>
  <a class="btn btn--primary" href="mailto:{{ site.author.email }}">Email {{ site.author.email }}</a>
</aside>
