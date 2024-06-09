---
title: UI Element Drawer with <dialog>
date: '2024-06-06'
tags:
  - html
  - css
category: cool-treats
status: LIVE
---
<script>
	import HTML from '$/demos/drawer/HTML.demo'
	import CSS from '$/demos/drawer/CSS.demo'
	import DialogJS from '$/demos/drawer/DialogJS.demo'
</script>

How to make a drawer with `<dialog>` using only browser APIs.

<!-- excerpt -->

## The Foundation

Here is the general HTML Structure we're working with. Without the CSS and JS, nothing will happen.

<HTML />

___

## Dialog Drawer JS Version

Well that stinks. But it turns out writing this same feature using the Web Animations API isn't too rough. I'm sure this once could even be further cleaned up. 

<DialogJS />

### Can I use this?

Yes! The only newer feature here is the Web Animations API with 97% support.

## Dialog Drawer CSS Version

Choosing between the popover API and the dialog API has been a bit of a back and forth for me. Here is a version of a slide up drawer built with `<dialog>`

This version uses a few weakly supported APIs, so for non-experimental usecases see the JS version below.

___

<CSS />

### Can I Use this? 

As of '2024-06-06' you can't really unless you are only shipping to chromium browsers (possible with an Electron app).

`@starting-style` (72% of users) and `allow-discrete` (71% of users) are the blockers. 
___