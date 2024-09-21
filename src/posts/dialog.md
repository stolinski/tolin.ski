---
title: Modals Dialogs and Alerts
date: '2024-05-30'
tags:
  - html
  - css
category: cool-treats
status: LIVE
---

`<dialog>` demos and exploration to solving different problems.

<!-- excerpt -->

## Basic Dialog

A dialog is a basic popup window.

- Opened with `.show()`
- It doesn't take over the main content, focus is not trapped
- There is no backdrop
- Not on top layer

$$ dialog-Dialog


___

## Basic Modal

A dialog that takes over.

- Opened with `.showModal()`
- Blocks interaction of rest of page like alert()
- Focus is trapped withing the dialog
- On top layer
- Esc closes

$$ dialog-Modal

### Side Note - Top Layer

Top layer is the fix for your z-index woes. It takes your content entirely out of the context of stacking order of CSS. This puts anything on top layer on top of all elements regardless of z-index. It creates a new "stacking context".

- .showModal() puts in top layer
- .show() uses z-index

___

<!-- TODO Move alert to it's own post -->

## Alert

Nothing too fancy to make an alert, the dialog with showModal is the way to go here.

$$ dialog-Alert

### Can I use Dialog today?

✅ YES 96% Support

___

## Animation

### The JavaScript Solution

To animate a dialog with JS, you can use any number of your own JS framework libraries, or you can do it directly with the view transitions API. This approach is much less supported but requires no additional libraries.

$$ dialog-ViewTransitions

___

### The CSS Solution

$$ dialog-CSS

### Side Note - Starting Style

@starting-style allows you to set the initial state of something that will transition in when it's added to the DOM. Why would you need this? Image a situation where a new DOM element is plopped into the page, Right now the solution is to add a pre-transition-in class then a transition-in class with JavaScript after time. Now you can do that all with CSS. Also this enables one of the holy grails of CSS, animating `display:none;` 🤯

It can wrap selectors or exist inside of selectors.

Pop this in with `<Dialog>` or a popover and you've got a stew goin'.

<h4 class="h3">Can I use @starting-style? - ❔ Possibly 70% support</h4>

Some nuance there. It's not supported in Firefox and given Firefox's pace lately, who knows. It will gracefully fallback and not animate, so in that regard, only FF users on desktop aren't getting the full experience and that's ok with me.

### Side Note - allow-discrete

You may have noticed `display 1s allow-discrete` in the previous example. Try running that code and removing the allow-discrete in your own code. You'll see that at first glance the animation still works. So what gives?

Well, close the dialog and see the issue. When dialog is toggled, `display:none;` is removed. Since it's instantly removed, the intro animation still works with just @starting-style, however when closing the dialog, `display:none;` is applied immediately and therefore there is no animation on close. ☹️.

<h4 class="h3">Can I use allow-discrete? - YES Possibly 77% support</h4>

Firefox support coming August 6th, is in Nightly already.

## Interesting Reading

[Should we deprecate dialog.show()](https://github.com/whatwg/html/issues/9376)