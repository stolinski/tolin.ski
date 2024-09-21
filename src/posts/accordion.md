---
title: Accordions with <details>
date: '2024-06-05'
tags:
  - html
category: cool-treats
status: LIVE
---

`<details>` demos and exploration of html accordions.

<!-- excerpt -->

## Basic Accordion with `<details>`

$$ details-details

### Animating the caret 


$$ details-caret


## A CSS Only Accordion with `<details>`

It feels like this should work and maybe it's just a browser issue / quirk that it doesn't currently. Maybe by the time you're looking at this it's ✨flawless✨. 

$$ details-CSSOnly

### WTF is max-block-size

max-block-size === max-height. Well.. kinda, it's the logical property version of max-height. This supports all type directions instead of just top to bottom, left to right. This is the same as things like margin-block, margin-inline. It has full browser support, so update your brain matter and use block-size and inline-size.

___

## Animate According with JavaScript via View Transitions

Woof, no wonder we reach for JS frameworks. It's not too crazy but it's a lot of JS just to animate an accordion. Remember `.slideDown();`.

This next one is good, less code, but the container itself still isn't sliding without adding in a custom JS height animation.

$$ details-ViewTransitions

___

## Animate According with JavaScript via WAAPI

Get ready, it's about to be heavy.

$$ details-WAAPI


## Exclusive Accordions

By giving an accordion a name attribute, you can make it part of a group of "exclusive" accordions where only one with the same name can be open at a time.

$$ details-Exclusive