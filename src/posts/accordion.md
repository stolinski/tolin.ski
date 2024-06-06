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
	import Exclusive from '$/demos/details/Exclusive.demo';
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

It feels like this should work and maybe it's just a browser issue / quirk that it doesn't currently. Maybe by the time you're looking at this it's ✨flawless✨. 

<CSSOnly />

### WTF is max-block-size

max-block-size === max-height. Well.. kinda, it's the logical property version of max-height. This supports all type directions instead of just top to bottom, left to right. This is the same as things like margin-block, margin-inline. It has full browser support, so update your brain matter and use block-size and inline-size.

## Exclusive Accordions

By giving an accordion a name attribute, you can make it part of a group of "exclusive" accordions where only one with the same name can be open at a time.

<Exclusive />