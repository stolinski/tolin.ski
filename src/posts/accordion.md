---
title: Accordions and Details
date: '2024-06-05'
tags:
  - html
category: cool-treats
status: LIVE
---

<script>
	import Details from '$/demos/details/Details.demo';
	import Caret from '$/demos/details/Caret.demo';
	import DetailsAnimatedJS from '$/demos/details/DetailsAnimatedJS.demo';
	import CSSOnly from '$/demos/details/CSSOnly.demo';
	import DetailsAnimatedPageTransition from '$/demos/details/DetailsAnimatedPageTransition.demo';
</script>

`<details>` demos and exploration of html accordions.

<!-- excerpt -->

## Basic Accordion with `<details>`

<Details />

### Animating the caret 

<Caret />

___

## Animate According with JS

Get ready, it's about to be heavy.

<DetailsAnimatedJS />

___

## Animate According with JS

Woof, no wonder we reach for JS frameworks. It's not too crazy but it's a lot of JS just to animate an accordion. Remember `.slideDown();`.

This next one is good, less code, but the container itself still isn't sliding without adding in a custom JS height animation.

<DetailsAnimatedPageTransition />

## A CSS Only Accordion with `<details>`

<CSSOnly />