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
	import Action from '$/demos/popover/Action.demo';
</script>

`popover` demos and exploration of menus

<!-- excerpt -->

## A Basic Popover

Here is a basic popover. You can use these anytime you need something that overlays. Think a three dot menu, a login / user menu or settings of any kind.

<Menu />

So what's the difference between popover and dialog? Dialog is more full featured and popover is more flexible. Dialog is also a semantic element for a dialog where popover is a generic attribute based API. I typically use Dialog for modals and alerts but popover for menus, tooltips, ect.

## Popover Actions

<Action />

___

## Menu w/ Compatible Anchor

___

## Menu w/ Anchor Positioning

### Side note - Anchor Positioning

Anchor positioning is a fix for elements placed in the top-layer where relative context doesn't exist. This is how you pin a menu to a location. It's great, but support sucks right now.

<h4 class="h3">Can I use anchor positioning? - ❔ No 48% support</h4>

But wait?! Is there a Polyfill? 

There is, [Anchor Polyfill](https://github.com/oddbird/css-anchor-positioning) but, it's not currently current to the spec, so probably best to use the above listed compatible anchor strategy.


___

## What About JavaScript?

<!-- Tooltip demo -->


## Further reading

- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)