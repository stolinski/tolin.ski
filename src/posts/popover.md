---
title: Menus Using Popover
date: '2024-06-03'
tags:
  - html
  - css
  - javascript
  - browser apis
  - animation
category: cool-treats
status: LIVE
---

<script>
	import Basic from '$/demos/popover/Basic.demo';
	import Action from '$/demos/popover/Action.demo';
	import Compat from '$/demos/popover/Compat.demo';
	import Anchor from '$/demos/popover/Anchor.demo';
</script>

An exploration of menus created with `popover`

<!-- excerpt -->

## A Basic Popover

Here is a basic popover. You can use these anytime you need something that overlays. Think a three dot menu, a login / user menu or settings of any kind.

<Basic />

So what's the difference between popover and dialog? 1. Popover doesn't inflict inert onto your page. 2. Dialog can be on toplayer or not, Popover is on toplayer.

___

## Popover Actions

You can do a lot with just html here if all you need is basic show and hide. It's only once we get into positioning & animations does this get a bit trickier.

<Action />

___

## Menu w/ Compatible Anchor

Let's say I wanted everything above, but using only shippable features.

<Compat />

___

## Menu w/ Anchor Positioning

Here's where things get interesting.  This uses a few crazy new APIs, popover, anchor, @starting-style, allow-discrete. Basically a who's who of unsupported cool stuff. On top of that anchor is still greatly in flux.

*Disclaimer* - This demo may or may not work. 🤷‍♂️

<Anchor />

### Side note - Anchor Positioning

Anchor positioning is a fix for elements placed in the top-layer where relative context doesn't exist. This is how you pin a menu to a location. It's great, but not only does support suck, the API itself is not agreed upon and still in flux. See: [Anchor Position Issues](https://github.com/WebKit/standards-positions/issues/216) 

<h4 class="h3">Can I use anchor positioning? - ❔ Big No 48% support</h4>

But wait?! Is there a Polyfill? 

There is, [Anchor Polyfill](https://github.com/oddbird/css-anchor-positioning) but, it's not currently current to the spec, and the spec isn't final, so hold off for now.



## Further reading

- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)
- [Anchor Position Issues](https://github.com/WebKit/standards-positions/issues/216)