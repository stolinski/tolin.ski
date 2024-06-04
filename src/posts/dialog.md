---
title: Modals Dialogs and Alerts
date: '2024-05-30'
tags:
  - html
category: cool-treats
status: LIVE
---

<script>
	import Dialog from "$/demos/dialog/Dialog.demo";
	import Modal from "$/demos/dialog/Modal.demo";
	import Alert from "$/demos/dialog/Alert.demo";
	import AnimatedJS from "$/demos/dialog/AnimatedJS.demo";
	import AnimatedCSS from "$/demos/dialog/AnimatedCSS.demo";
</script>

`<dialog>` demos and exploration to solving different problems.

<!-- excerpt -->

## Basic Dialog

A dialog is a basic popup window.

- Opened with `.show()`
- It doesn't take over the main content, focus is not trapped
- There is no backdrop
- Not on top layer

<Dialog />

___

## Basic Modal

A dialog that takes over.

- Opened with `.showModal()`
- Blocks interaction of rest of page like alert()
- Focus is trapped withing the dialog
- On top layer
- Esc closes

<Modal />

### Side Note - Top Layer

Top layer is the fix for your z-index woes. It takes your content entirely out of the context of stacking order of CSS. This puts anything on top layer on top of all elements regardless of z-index. It creates a new "stacking context".

- .showModal() puts in top layer
- .show() uses z-index

___

## Alert

Nothing too fancy to make an alert, the dialog with showModal is the way to go here.

<Alert />

### Can I use Dialog today? - ✅ YES 96% Support

<p class="ciu_embed" data-feature="mdn-html__elements__dialog" data-periods="future_1,current,past_1" data-accessible-colours="false">
</p>

___

## Animation

### The JavaScript Solution

To animate a dialog with JS, you can use any number of your own JS framework libraries, or you can do it directly with the view transitions API. This approach is much less supported but requires no additional libraries.

<AnimatedJS />

### The CSS Solution

<AnimatedCSS />

### Side Note - Starting Style

@starting-style allows you to set the initial state of something that will transition in when it's added to the DOM. Why would you need this? Image a situation where a new DOM element is plopped into the page, Right now the solution is to add a pre-transition-in class then a transition-in class with JavaScript after time. Now you can do that all with CSS. Also this enables one of the holy grails of CSS, animating `display:none;` 🤯

It can wrap selectors or exist inside of selectors.

Pop this in with `<Dialog>` or a popover and you've got a stew goin'.

<h4 class="h3">Can I use @starting-style? - ❔ Possibly 70% support</h4>

Some nuance there. It's not supported in Firefox and given Firefox's pace lately, who knows. It will gracefully fallback and not animate, so in that regard, only FF users on desktop aren't getting the full experience and that's ok with me.