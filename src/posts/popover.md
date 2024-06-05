---
title: Popover
date: '2024-06-03'
tags:
  - html
category: cool-treats
status: LIVE
---

<script>
	import Menu from '$/demos/popover/Menu.demo';
</script>

`popover` demos and exploration of menus

<!-- excerpt -->

## A Basic Popover

Here is a basic popover. You can use these anytime you need something that overlays. Think a three dot menu, a login / user menu or settings of any kind.

<Menu />

## Popover Actions

## Menu w/ Compatible Anchor

## Menu w/ Anchor Positioning

### Side note - Anchor Positioning

Anchor positioning is a fix for elements placed in the top-layer where relative context doesn't exist. This is how you pin a menu to a location. It's great, but support sucks right now.

<h4 class="h3">Can I use anchor positioning? - ❔ No 48% support</h4>

But wait?! Is there a Polyfill? 

There is, [Anchor Polyfill](https://github.com/oddbird/css-anchor-positioning) but, it's not currently current to the spec, so probably best to use the above listed compatible anchor strategy.

<p class="ciu_embed" data-feature="mdn-css_at-rules_starting-style" data-periods="future_1,current,past_1" data-accessible-colours="false">
</p>