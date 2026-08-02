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
  <div>
    <p class="science-hero__eyebrow">Computational RNA biology</p>
    <h1 class="science-hero__title" id="hero-title">Decoding RNA’s regulatory language</h1>
    <p class="science-hero__lede">I build algorithms that connect sequence, structure, and evolution—making non-coding RNA annotation more reliable across the tree of life.</p>
    <a class="btn" href="/publications/">Explore the research</a>
  </div>
  <svg class="science-hero__art" viewBox="0 0 480 360" role="img" aria-labelledby="rna-title rna-desc">
    <title id="rna-title">RNA structure becoming a computational graph</title>
    <desc id="rna-desc">A curved RNA backbone with paired bases transitions into connected graph nodes and a coral dynamical trajectory.</desc>
    <path class="science-hero__backbone" d="M38 280 C78 54 225 55 249 192 S357 331 444 119"/>
    <path class="science-hero__pair" d="M72 197 Q130 112 190 180 M88 157 Q130 82 175 146 M108 124 Q132 92 157 120"/>
    <path class="science-hero__trajectory" d="M242 196 C286 116 317 262 352 170 S405 74 445 118"/>
    <g aria-hidden="true">
      <circle class="science-hero__node" cx="72" cy="197" r="7"/><circle class="science-hero__node" cx="190" cy="180" r="7"/>
      <circle class="science-hero__node" cx="249" cy="192" r="8"/><circle class="science-hero__node" cx="308" cy="221" r="8"/>
      <circle class="science-hero__node" cx="352" cy="170" r="8"/><circle class="science-hero__node" cx="404" cy="91" r="8"/><circle class="science-hero__node" cx="444" cy="119" r="8"/>
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
  <img src="/images/rna-evidence-network.svg" alt="Diagram linking RNA sequence, a hairpin structure, evolutionary evidence, and a validated annotation node.">
  <figcaption>Evidence integration in an RNA annotation workflow: sequence and secondary structure are evaluated in an evolutionary context before a candidate enters the curated annotation set.</figcaption>
</figure>
