---
title: Swipers & Slide Shows with Scroll Snap
date: '2024-06-08'
tags:
  - css
  - javascript
  - scroll-snap
  - swiper
  - slide-show
category: cool-treats
status: LIVE
---

<script>
	import Swiper from '$/demos/slide-show/Swiper.demo';
	import SwiperIndicators from '$/demos/slide-show/SwiperIndicators.demo';
	import SlideShow from '$/demos/slide-show/SlideShow.demo';
</script>

An exploration of swipers and slide shows using modern browser features like CSS Scroll Snap

<!-- excerpt -->

## A Basic CSS Only Swiper using CSS Scroll Snap

This is a slide show in the sense that you can swipe but it won't automatically move.  With proper page indicators this is basically the Instagram post swiper.

<Swiper />

FYI this basketball is really sick and actually for sale here: [Syntax Basketball](https://sentry.shop/products/syntax-basketball)

### What is this missing to become a slide show?

* Working Page indicators
* Forward Prev Buttons
* Automatic 
* Events? (only if you need it)

___

## A Swiper With Active Indicators

If we want indicators to show what slide we're on, buttons and timing, we'll need to add a bit of JavaScript. Let's do it

<SwiperIndicators />

___

## Let's Make A Simple Slideshow

<SlideShow />