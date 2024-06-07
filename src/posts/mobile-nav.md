---
title: UI Element Mobile Nav
date: '2024-06-07'
tags:
  - html
  - css
  - popover
  - WAAPI
category: cool-treats
status: LIVE
---
<script>
	import NoJS from '$/demos/mobile-nav/NoJS.demo'
	import WAAPI from '$/demos/mobile-nav/WAAPI.demo'
</script>

How to make a mobile nav with `popover` using only browser APIs.

<!-- excerpt -->

## Mobile Nav with No JavaScript

This is a mobile nav using the popover API. The animation is only supported in Chrome currently because it uses `@starting-style` and `allow-discrete`. Hopefully these APIs drop across all browsers soon. Either way, check it out, it's super simple and accessible, with no JavaScript.

<NoJS />

## Mobile Nav with Popover and WAAPI

Back in reality this is where your front-end framework comes in however you can get a really great animated mobile nav with `popover` combined with the Web Animations API

<WAAPI />