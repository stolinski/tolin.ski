---
title: Modals Dialogs and Alerts
date: '2024-05-30'
tags:
  - html
category: cool-treats
status: LIVE
layout: false
---

<script>
	import Dialog from "$/demos/dialog/Dialog.html";
	import Modal from "$/demos/dialog/Modal.html";
	import Alert from "$/demos/dialog/Alert.html";
	import AnimatedJS from "$/demos/dialog/AnimatedJS.html";

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

---

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

---

## Alert

Nothing too fancy to make an alert, the dialog with showModal is the way to go here.

<Alert />

---

## Animation

<AnimatedJS />

### The JavaScript Solution

### The CSS Solution

## Can I Use Dialog Today?

<p class="ciu_embed" data-feature="mdn-html__elements__dialog" data-periods="future_1,current,past_1" data-accessible-colours="false">
</p>
