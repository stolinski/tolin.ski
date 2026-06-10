---
title: This Component Could Have Been a Div
date: '2026-06-10'
tags:
  - html
  - css
  - react
category: posts
status: LIVE
---

Everything from my React Summit 2026 talk — every demo, as plain HTML and CSS.

<!-- excerpt -->

This is the written compendium of my React Summit 2026 talk, "This Component Could Have Been A Div." The deck itself is a React app rendered inside a three.js solar system (yes, really — the [source is on GitHub](https://github.com/stolinski/react-summit-talk-2026)), but every demo in it uses **only the platform**. No modal library, no gesture library, no positioning library, no carousel library.

The premise: a huge amount of what we install from npm is now a built-in browser feature. The talk tours those features from "shipped everywhere years ago" to "behind a flag in Chrome last month," and ends with why this matters more than ever now that agents write so much of our UI code.

Below is every demo, in talk order, rebuilt as **plain HTML and CSS** you can paste straight into a page. No React, no build step. The handful of demos that include any JavaScript at all do so because the platform API itself is JavaScript — one line to open a dialog. Browser support is listed as it appeared on the slides.

## Table of Contents

## Stop 1: Native HTML

### A basic modal with `<dialog>`

**Chrome 37 · Safari 15.4 · Firefox 98**

This is the template for every "this could have been a div" demo. Click the button and a real native modal opens — focus trap, ESC-to-close, `::backdrop`, all free. The only JavaScript is one method call (elements with an `id` are reachable as globals, so it fits in the attribute).

```html
<button onclick="demoModal.showModal()">Open modal</button>

<dialog id="demoModal" class="native-dialog">
  <h3>I'm a native &lt;dialog&gt;</h3>
  <p>Focus trap, ESC to close, a real backdrop — zero dependencies.</p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>
```

```css
.native-dialog {
    max-width: min(90vw, 420px);
    padding: 28px 32px;
    border: none;
    border-radius: 16px;
    background: #0b1020;
    color: #e2e8f0;
}

.native-dialog h3 {
    margin-top: 0;
}

.native-dialog::backdrop {
    background: rgba(2, 6, 12, 0.6);
    backdrop-filter: blur(4px);
}
```

Two free bonuses in there: the `<form method="dialog">` closes the dialog on submit, no close handler. And in newer browsers you can drop even the one line of JS with invoker commands:

```html
<!-- zero JS at all — invoker commands (Chrome 135+) -->
<button commandfor="demoModal" command="show-modal">Open modal</button>
```

### A drawer that slides in… and back out

**Chrome 117 · Safari 17.4/17.5 · Firefox 129**

The exit is the kill shot. Sliding *in* was always easy; the reason people reach for `vaul` is that animating *out* used to need JavaScript — wait for the animation to finish, THEN remove it. Now it's a native `<dialog>` plus a CSS `translate` transition: `@starting-style` handles the enter, and `allow-discrete` on `display` and `overlay` keeps the dialog rendered and in the top layer long enough to play the slide-out. One line of JS to open it. Zero dependencies.

```html
<button onclick="demoDrawer.showModal()">Open drawer</button>

<dialog id="demoDrawer" class="drawer">
  <h3>I slide in. I slide out.</h3>
  <p>
    Focus trapped, ESC closes me, the backdrop dims — and both the enter
    and the exit animate, in pure CSS. The part you used to install a
    library for.
  </p>
  <form method="dialog">
    <button>Close</button>
  </form>
</dialog>
```

```css
/* The drawer: a modal <dialog> pinned to the right edge that animates both
   ways. translate moves it; allow-discrete on display/overlay keeps it in the
   top layer long enough to animate OUT (the part that used to need JS). */
.drawer {
    height: 100dvh;
    max-height: 100dvh;
    width: min(92vw, 380px);
    margin: 0 0 0 auto; /* pin to the right edge */
    padding: 32px 36px;
    border: none;
    border-radius: 16px 0 0 16px;
    background: #0b1020;
    color: #e2e8f0;

    translate: 100% 0; /* off-screen right when closed */
    transition:
        translate 0.35s ease,
        display 0.35s allow-discrete,
        overlay 0.35s allow-discrete;
}

.drawer[open] {
    translate: 0 0; /* slid in */
}

/* the state to animate FROM on first open */
@starting-style {
    .drawer[open] {
        translate: 100% 0;
    }
}

.drawer h3 {
    margin-top: 0;
}

.drawer::backdrop {
    background: rgba(2, 6, 12, 0);
    backdrop-filter: blur(4px);
    transition:
        background 0.35s ease,
        display 0.35s allow-discrete,
        overlay 0.35s allow-discrete;
}

.drawer[open]::backdrop {
    background: rgba(2, 6, 12, 0.6);
}

@starting-style {
    .drawer[open]::backdrop {
        background: rgba(2, 6, 12, 0);
    }
}
```

Closing a `<dialog>` normally yanks it out instantly — `display: none` hits and the exit never plays. `allow-discrete` is what keeps it rendered and on top long enough to animate out. That's the exact part people install a library for.

## Stop 2: Scroll-snap UI

### A feed that snaps, post by post

**Chrome 69 · Safari 11 · Firefox 68**

The plainest possible scroll-snap: a vertical, Instagram-reel feed. Each post is one viewport tall and the feed snaps to it as you flick. Two CSS rules carry the entire gesture: the feed snaps on the y axis, and every post is a snap target. No carousel library, no JS, no state.

```html
<div class="reel">
  <div class="reel-post" style="--i: 1">
    <span class="reel-play">▶</span>
    <div class="reel-meta">
      <b>@syntax</b>
      <span>this could have been a div</span>
    </div>
    <div class="reel-rail"><span>♥</span><span>💬</span><span>↗</span></div>
  </div>

  <div class="reel-post" style="--i: 2">
    <span class="reel-play">▶</span>
    <div class="reel-meta">
      <b>@sentry</b>
      <span>no library, just scroll-snap</span>
    </div>
    <div class="reel-rail"><span>♥</span><span>💬</span><span>↗</span></div>
  </div>

  <div class="reel-post" style="--i: 3">
    <span class="reel-play">▶</span>
    <div class="reel-meta">
      <b>@graffiti</b>
      <span>the platform already does this</span>
    </div>
    <div class="reel-rail"><span>♥</span><span>💬</span><span>↗</span></div>
  </div>

  <div class="reel-post" style="--i: 4">
    <span class="reel-play">▶</span>
    <div class="reel-meta">
      <b>@scott</b>
      <span>flick up — it snaps every time</span>
    </div>
    <div class="reel-rail"><span>♥</span><span>💬</span><span>↗</span></div>
  </div>
</div>
```

```css
/* The plainest scroll-snap: a vertical Instagram-reel feed. The feed snaps on
   the y axis; every post is one viewport tall and a snap target. No JS. */
.reel {
    width: 300px;
    height: 560px;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
    scrollbar-width: none;
    border-radius: 34px;
    background: #000;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
        inset 0 0 0 6px #05070d,
        0 26px 64px rgba(0, 0, 0, 0.55);
}
.reel::-webkit-scrollbar {
    display: none;
}
.reel-post {
    position: relative;
    height: 100%;
    scroll-snap-align: start;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: linear-gradient(
        165deg,
        hsl(calc(var(--i) * 64) 80% 56%),
        hsl(calc(var(--i) * 64 + 40) 72% 38%)
    );
}
.reel-play {
    font-size: 3.4rem;
    color: rgba(255, 255, 255, 0.85);
    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.45));
}
.reel-meta {
    position: absolute;
    left: 20px;
    bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: #fff;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.55);
}
.reel-meta b {
    font-size: 1.05rem;
    font-weight: 800;
}
.reel-meta span {
    font-size: 0.95rem;
    opacity: 0.92;
}
.reel-rail {
    position: absolute;
    right: 16px;
    bottom: 22px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 1.5rem;
    color: #fff;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.55);
}
```

### A bottom sheet that snaps to size

**Chrome 69 · Safari 11 · Firefox 68**

The multi-detent bottom sheet people reach for `vaul` to get: it rests at three positions — peek, half, full — and drags smoothly between them with real momentum. The trick is that those rest positions are just CSS scroll-snap points, so the browser's native scrolling IS the gesture. No drag handler, no spring physics library, no open/half/full state in JS. The backdrop even dims on its own via a scroll-driven animation.

The geometry falls out of one rule: **visible sheet height = deviceHeight − panelTop + scrollTop**. Pick the three heights you want to rest at — here, on a 360×460 device, that's 96px (peek), 250px (half), and 430px (full) — and everything else is derived: the panel offset is 460 − 96 = 364, the snap offsets land at 0 / 154 / 334, and the transparent "rungs" stacked above the panel (whose top edges are the snap points) get the gaps between them: 154px, 180px, 30px.

```html
<div class="bs-device">
  <!-- Decorative app sitting behind the sheet. -->
  <div class="bs-app">
    <div class="bs-app-bar">
      <span>9:41</span>
      <span>Library</span>
      <span>＋</span>
    </div>
    <div class="bs-grid">
      <div class="bs-tile" style="--i: 1"></div>
      <div class="bs-tile" style="--i: 2"></div>
      <div class="bs-tile" style="--i: 3"></div>
      <div class="bs-tile" style="--i: 4"></div>
      <div class="bs-tile" style="--i: 5"></div>
      <div class="bs-tile" style="--i: 6"></div>
    </div>
  </div>

  <!-- The sheet: a scroll-snap container whose rungs are the rest positions. -->
  <div class="bs-scroller">
    <div class="bs-dim"></div>

    <!-- each rung's top edge is a snap point: peek → half → full -->
    <div class="bs-zone" style="height: 154px"></div>
    <div class="bs-zone" style="height: 180px"></div>
    <div class="bs-zone" style="height: 30px"></div>

    <div class="bs-panel">
      <div class="bs-grip"></div>
      <h4>Share to…</h4>
      <div class="bs-share">
        <span class="bs-app-icon" style="--i: 1"><b>S</b>Syntax</span>
        <span class="bs-app-icon" style="--i: 2"><b>S</b>Sentry</span>
        <span class="bs-app-icon" style="--i: 3"><b>N</b>Notes</span>
        <span class="bs-app-icon" style="--i: 4"><b>M</b>Mail</span>
        <span class="bs-app-icon" style="--i: 5"><b>M</b>More</span>
      </div>
      <ul class="bs-list">
        <li>Copy link</li>
        <li>Add to favorites</li>
        <li>Edit details</li>
      </ul>
    </div>
  </div>
</div>
```

```css
/* Multi-detent bottom sheet (the `vaul` job): the peek / half / full rest
   positions are CSS scroll-snap points, so native momentum scrolling IS the
   drag. The backdrop dims via a scroll-driven animation. No gesture library,
   no open/half/full state in JS. `timeline-scope` lets the dim (a sibling)
   read the scroller's named scroll-timeline. */
.bs-device {
    position: relative;
    width: 360px;
    height: 460px;
    border-radius: 36px;
    overflow: hidden;
    background: #0a0f1c;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
        inset 0 0 0 6px #05070d,
        0 26px 64px rgba(0, 0, 0, 0.55);
    timeline-scope: --bs;
}

/* Decorative app behind the sheet. */
.bs-app {
    position: absolute;
    inset: 0;
    padding: 20px 18px;
}
.bs-app-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 6px 16px;
    font-size: 0.95rem;
    font-weight: 700;
    color: #e2e8f0;
}
.bs-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
.bs-tile {
    aspect-ratio: 1;
    border-radius: 16px;
    background: linear-gradient(
        155deg,
        hsl(calc(var(--i) * 48) 70% 58%),
        hsl(calc(var(--i) * 48 + 30) 65% 44%)
    );
}

/* The scroll-snap sheet, overlaid on the app. */
.bs-scroller {
    position: absolute;
    inset: 0;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    overscroll-behavior: contain;
    scrollbar-width: none;
    scroll-timeline: --bs y;
}
.bs-scroller::-webkit-scrollbar {
    display: none;
}

/* Dims the app as the sheet rises — pure scroll-driven animation. Sits between
   the app and the (transparent) sheet rungs, so it only shows above the panel. */
.bs-dim {
    position: absolute;
    inset: 0;
    background: #02040a;
    animation: bs-dim linear both;
    animation-timeline: --bs;
}
@keyframes bs-dim {
    from {
        opacity: 0;
    }
    to {
        opacity: 0.6;
    }
}

/* Each rung's top edge is a rest position: peek · half · full. */
.bs-zone {
    scroll-snap-align: start;
}

.bs-panel {
    position: relative;
    z-index: 1;
    height: 430px; /* the FULL detent */
    padding: 12px 22px 24px;
    background: #141a2b;
    border-radius: 26px 26px 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 -18px 50px rgba(0, 0, 0, 0.5);
    color: #e8eefc;
}
.bs-grip {
    width: 44px;
    height: 5px;
    margin: 6px auto 18px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.32);
}
.bs-panel h4 {
    margin: 0 0 16px;
    font-size: 1.35rem;
    font-weight: 700;
}
.bs-share {
    display: flex;
    gap: 14px;
    margin-bottom: 18px;
}
.bs-app-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    font-size: 0.7rem;
    color: #aab6cf;
}
.bs-app-icon b {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    font-size: 1.25rem;
    color: #05070d;
    background: linear-gradient(
        155deg,
        hsl(calc(var(--i) * 60) 80% 64%),
        hsl(calc(var(--i) * 60 + 28) 72% 50%)
    );
}
.bs-list {
    margin: 0;
    padding: 0;
    list-style: none;
}
.bs-list li {
    padding: 15px 6px;
    font-size: 1.05rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}
```

Bonus detail in there: `scroll-timeline: --bs y` plus `timeline-scope: --bs` lets a *sibling* element (the dim layer) animate off the sheet's scroll position. The backdrop fades in as you drag the sheet up, with zero JavaScript.

### A row swiper with ZERO JavaScript

**Chrome 105 · Safari 16 · Firefox 110**

This is Graffiti's `.swipe` pattern. Each row is a horizontal scroll-snap container laid out `auto 1fr auto`, and the middle cell is sized `100cqw` — exactly the row's width — so the two action buttons sit just offscreen on either side. The browser's native horizontal scroll IS the swipe. The centered cell is the only snap point, so a released swipe always springs straight back to center. No drag handlers, no state, no spring physics, and nothing to reset between runs.

```html
<div class="swipe-inbox">
  <div class="swipe-bar">
    <span>Inbox</span>
    <span class="swipe-hint">‹ swipe ›</span>
  </div>
  <ul class="swipe-list">
    <li class="swipe">
      <!-- first child = left action -->
      <button class="swipe-act pin">Pin</button>

      <!-- second child = the visible row, sized to 100cqw -->
      <div class="swipe-row">
        <span class="swipe-avatar" style="--h: 45">S</span>
        <span class="swipe-text">
          <b>Syntax</b>
          <span>New episode just dropped</span>
        </span>
        <span class="swipe-time">9:41</span>
      </div>

      <!-- third child = right action -->
      <button class="swipe-act del">Delete</button>
    </li>

    <li class="swipe">
      <button class="swipe-act pin">Pin</button>
      <div class="swipe-row">
        <span class="swipe-avatar" style="--h: 265">S</span>
        <span class="swipe-text">
          <b>Sentry</b>
          <span>Issue resolved in production</span>
        </span>
        <span class="swipe-time">8:12</span>
      </div>
      <button class="swipe-act del">Delete</button>
    </li>

    <li class="swipe">
      <button class="swipe-act pin">Pin</button>
      <div class="swipe-row">
        <span class="swipe-avatar" style="--h: 200">V</span>
        <span class="swipe-text">
          <b>Vercel</b>
          <span>Deployment is ready</span>
        </span>
        <span class="swipe-time">Tue</span>
      </div>
      <button class="swipe-act del">Delete</button>
    </li>

    <li class="swipe">
      <button class="swipe-act pin">Pin</button>
      <div class="swipe-row">
        <span class="swipe-avatar" style="--h: 150">G</span>
        <span class="swipe-text">
          <b>GitHub</b>
          <span>Review requested on #482</span>
        </span>
        <span class="swipe-time">Mon</span>
      </div>
      <button class="swipe-act del">Delete</button>
    </li>
  </ul>
</div>
```

```css
/* Swipe-to-reveal row (Graffiti's `.swipe`): the iOS swipe gesture with no
   gesture library and NO JS. Each row is a horizontal scroll-snap container laid
   out `auto 1fr auto`; the MIDDLE cell is `100cqw` (exactly the row's width), so
   the two action buttons sit just offscreen. Native scroll IS the swipe. The
   centered cell is the ONLY snap point (this is Graffiti's default `.swipe`, not
   `.stop`), so a released swipe always springs straight back to center. */
.swipe-inbox {
    width: 380px;
    border-radius: 30px;
    overflow: hidden;
    background: #0a0f1c;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
        inset 0 0 0 6px #05070d,
        0 26px 64px rgba(0, 0, 0, 0.55);
}
.swipe-bar {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 20px 22px 14px;
    font-size: 1.25rem;
    font-weight: 700;
    color: #e8eefc;
}
.swipe-hint {
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: #34d399;
    opacity: 0.85;
}
.swipe-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

/* one row = the whole technique. */
.swipe {
    container-type: inline-size;
    display: grid;
    grid-template-columns: auto 1fr auto;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    scrollbar-width: none;
}
.swipe::-webkit-scrollbar {
    display: none;
}

/* the visible row: middle cell, full container width → actions wait offscreen.
   center is the only snap point, so a released swipe springs straight back. */
.swipe-row {
    inline-size: 100cqw;
    scroll-snap-align: center;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 22px;
    background: #0d1322;
}
.swipe-avatar {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-weight: 800;
    color: #05070d;
    background: linear-gradient(
        155deg,
        hsl(var(--h) 80% 64%),
        hsl(calc(var(--h) + 28) 72% 50%)
    );
}
.swipe-text {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    flex: 1;
}
.swipe-text b {
    font-size: 1.05rem;
    color: #e8eefc;
}
.swipe-text span {
    font-size: 0.92rem;
    color: #9fb0cf;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.swipe-time {
    flex: 0 0 auto;
    align-self: flex-start;
    font-size: 0.8rem;
    color: #6b7c99;
}

/* the offscreen actions: a swipe peeks one into view, then it springs back.
   no snap-align here — only the centered row snaps, so nothing holds open. */
.swipe-act {
    inline-size: 96px;
    border: none;
    border-radius: 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5) inset;
}
.swipe-act.pin {
    background: #d9852b;
}
.swipe-act.del {
    background: #e0445b;
}
```

### The carousel builds its own controls

**Chrome 135 · not yet in Safari or Firefox**

A carousel whose dot markers and prev/next buttons are **generated by the browser** — zero JS, zero extra markup. `::scroll-button()` makes the arrows, `::scroll-marker` makes the dots, and `:target-current` highlights the active one. Look at how little HTML there is.

```html
<div class="carousel">
  <div class="carousel-slide" style="--i: 1">1</div>
  <div class="carousel-slide" style="--i: 2">2</div>
  <div class="carousel-slide" style="--i: 3">3</div>
  <div class="carousel-slide" style="--i: 4">4</div>
  <div class="carousel-slide" style="--i: 5">5</div>
</div>
```

```css
/* Carousel: scroll-snap + browser-GENERATED dot markers (::scroll-marker) and
   prev/next buttons (::scroll-button). Zero JS. */
.carousel {
    width: 560px;
    height: 320px;
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scroll-marker-group: after;
    scrollbar-width: none;
    border-radius: 18px;
    position: relative;
}
.carousel::-webkit-scrollbar {
    display: none;
}
.carousel-slide {
    flex: 0 0 100%;
    scroll-snap-align: center;
    display: grid;
    place-items: center;
    font-size: 5rem;
    font-weight: 800;
    color: #04111b;
    background: linear-gradient(
        155deg,
        hsl(calc(var(--i) * 48) 85% 64%),
        hsl(calc(var(--i) * 48 + 30) 80% 52%)
    );
}
.carousel::scroll-button(left),
.carousel::scroll-button(right) {
    position: absolute;
    bottom: 16px;
    width: 46px;
    height: 46px;
    border: none;
    border-radius: 50%;
    background: rgba(2, 6, 12, 0.55);
    color: #fff;
    font-size: 1.6rem;
    cursor: pointer;
}
.carousel::scroll-button(left) {
    content: "‹";
    left: 16px;
}
.carousel::scroll-button(right) {
    content: "›";
    right: 16px;
}
.carousel::scroll-button(*):disabled {
    opacity: 0.3;
}
.carousel::scroll-marker-group {
    display: flex;
    justify-content: center;
    gap: 12px;
    padding-top: 18px;
}
.carousel-slide::scroll-marker {
    content: "";
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    cursor: pointer;
}
.carousel-slide::scroll-marker:target-current {
    background: #fff;
}
```

## Stop 3: Scroll-driven CSS

### A cover-flow gallery that scrubs as you scroll

**Chrome 115 · Safari 26 · Firefox behind a flag**

Each card scales up and turns to face you as it passes center, then falls back as it leaves. The whole effect is `animation-timeline: view()` — every card animates off its own position in the scroller. No scroll listeners, no rAF, no library.

```html
<div class="scrubber">
  <div class="scrub-card" style="--i: 1">1</div>
  <div class="scrub-card" style="--i: 2">2</div>
  <div class="scrub-card" style="--i: 3">3</div>
  <div class="scrub-card" style="--i: 4">4</div>
  <div class="scrub-card" style="--i: 5">5</div>
  <div class="scrub-card" style="--i: 6">6</div>
  <div class="scrub-card" style="--i: 7">7</div>
</div>
```

```css
/* Scroll-scrub gallery: each card animates off its own position in the
   scroller via animation-timeline: view(). Zero JS. */
.scrubber {
    display: flex;
    gap: 30px;
    width: 820px;
    padding-inline: calc(
        50% - 130px
    ); /* lets the first & last card reach center */
    padding-block: 40px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    perspective: 1400px;
    scrollbar-width: none;
}
.scrubber::-webkit-scrollbar {
    display: none;
}

.scrub-card {
    flex: 0 0 260px;
    aspect-ratio: 3 / 4;
    display: grid;
    place-items: center;
    scroll-snap-align: center;
    border-radius: 22px;
    font-size: 3.6rem;
    font-weight: 800;
    color: #04111b;
    background: linear-gradient(
        155deg,
        hsl(calc(var(--i) * 42) 85% 66%),
        hsl(calc(var(--i) * 42 + 30) 80% 52%)
    );

    animation: scrub linear both;
    animation-timeline: view(inline);
}

@keyframes scrub {
    0% {
        scale: 0.6;
        opacity: 0.3;
        rotate: y -42deg;
    }
    50% {
        scale: 1;
        opacity: 1;
        rotate: y 0deg;
    }
    100% {
        scale: 0.6;
        opacity: 0.3;
        rotate: y 42deg;
    }
}
```

### A header that knows it's stuck

**Chrome 133 · not yet in Safari or Firefox**

A sticky header that restyles itself the instant it sticks — pure CSS, via a `scroll-state()` container query. No IntersectionObserver, no scroll handler. The header is `position: sticky` and a `scroll-state` container; the moment it pins to the top, a container query restyles it.

```html
<div class="sticky-scroller">
  <div class="sticky-head">
    <span class="sticky-title">Scroll me ↓</span>
  </div>
  <div class="sticky-body">
    <p>Keep scrolling — watch the header above.</p>
    <p>
      The header is <code>position: sticky</code> and a
      <code>scroll-state</code> container. The moment it sticks to the top,
      a container query restyles it.
    </p>
    <p>No IntersectionObserver. No scroll handler. No JavaScript at all.</p>
    <p>Just CSS reacting to its own scroll position.</p>
    <p>That used to be a guaranteed reach for a library.</p>
    <p>Now it's a few lines of stylesheet.</p>
    <p>Keep going…</p>
    <p>…almost there…</p>
    <p>That's the whole trick.</p>
  </div>
</div>
```

```css
/* scroll-state() container query: a sticky header that restyles when stuck. */
.sticky-scroller {
    width: 520px;
    height: 340px;
    overflow-y: auto;
    border-radius: 16px;
    background: #0b1020;
}
.sticky-head {
    position: sticky;
    top: 0;
    container-type: scroll-state;
}
.sticky-title {
    display: block;
    padding: 30px 26px;
    font-size: 2rem;
    font-weight: 800;
    background: #131a2e;
    color: #f8fafc;
    transition:
        padding 0.3s ease,
        font-size 0.3s ease,
        background 0.3s ease,
        color 0.3s ease,
        box-shadow 0.3s ease;
}
@container scroll-state(stuck: top) {
    .sticky-title {
        padding: 14px 26px;
        font-size: 1.3rem;
        background: #a855f7;
        color: #04111b;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    }
}
.sticky-body {
    padding: 22px 26px;
    color: #cbd5e1;
    line-height: 1.7;
    font-size: 1.1rem;
}
.sticky-body code {
    background: rgba(255, 255, 255, 0.08);
    padding: 1px 6px;
    border-radius: 5px;
}
```

## Stop 4: CSS as a language

### Numbers that count themselves

**Chrome 85 · Safari 16.4 · Firefox 128**

A stat counting up from 0 to 1,000,000 with zero JavaScript. An `@property`-typed `<integer>` custom property is animated by keyframes; `counter()` prints it. No timer, no rAF. The entire markup is one empty div.

```html
<div class="counter"></div>
```

```css
/* Animated counter: an @property <integer> animated by keyframes, printed with
   counter(). Pure CSS, no timer. */
@property --count {
    syntax: "<integer>";
    initial-value: 0;
    inherits: false;
}
.counter {
    counter-reset: count var(--count);
    /* Loops up → hold → down → hold, forever. The holds at each end are the
       pause between counting in and back out. 8s round trip. */
    animation: count-loop 8s ease-in-out infinite both;
    font-size: 7rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    color: #f8fafc;
}
.counter::after {
    content: counter(count);
}
@keyframes count-loop {
    0% {
        --count: 0;
    }
    37.5% {
        --count: 1000000;
    } /* counted up */
    50% {
        --count: 1000000;
    } /* hold at the top */
    87.5% {
        --count: 0;
    } /* counted back down */
    100% {
        --count: 0;
    } /* hold at the bottom */
}
```

The magic: `@property` declares the custom property as a real `<integer>`, which makes it interpolable. Animate it with keyframes, pipe it through `counter-reset`, and print it with `content: counter()`.

### Every element knows its index

**Chrome 138 · Safari 26.2 · not yet in Firefox**

A bar chart where every bar's height, hue, and animation delay come from `sibling-index()`. No inline `style="--i"` anywhere — each element simply knows its own position among its siblings, so it staggers in on its own.

```html
<div class="siblings">
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
  <div class="sib"></div>
</div>
```

```css
/* sibling-index(): every bar derives its height, hue, and delay from its own
   index — no inline --i, no JS. */
.siblings {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    height: 360px;
}
.sib {
    width: 46px;
    height: calc(sibling-index() * 28px);
    border-radius: 10px 10px 4px 4px;
    background: hsl(calc(sibling-index() * 26) 85% 62%);
    transform-origin: bottom; /* grow/shrink from the baseline */
    /* Loops in → hold → out → hold, forever, each bar staggered off its own
       index so it ripples. scaleY animates, not height, so the keyframes stay
       index-free. */
    animation: sib-pulse 4s ease-in-out infinite both;
    animation-delay: calc(sibling-index() * 70ms);
}
@keyframes sib-pulse {
    0% {
        transform: scaleY(0);
        opacity: 0;
    }
    25% {
        transform: scaleY(1);
        opacity: 1;
    } /* risen */
    50% {
        transform: scaleY(1);
        opacity: 1;
    } /* hold up */
    75% {
        transform: scaleY(0);
        opacity: 0;
    } /* fallen */
    100% {
        transform: scaleY(0);
        opacity: 0;
    } /* hold down */
}
```

## Stop 5: Overlays and menus

### A menu that flips to stay on screen

**Chrome 125 · Safari 18.4 · Firefox 147**

The job people install Floating UI / Popper.js / Tippy for: a menu anchored to a trigger that flips to the other side when it would run off-screen. The positioning is pure CSS — `anchor-name` + `position-anchor` tie the menu to the button, `position-area` puts it below, and `position-try-fallbacks` flips it above or to the side when there's no room.

Pair it with the `popover` attribute and `popovertarget`, and the *entire* menu — opening, closing, light dismiss, ESC, positioning, flipping — is zero JavaScript. Scroll, resize, do whatever: the browser recomputes the menu's side on its own. You never touch it.

```html
<button class="menu-btn" popovertarget="profileMenu">Open menu ⌄</button>

<menu id="profileMenu" class="menu-pop" popover>
  <li>Profile</li>
  <li>Settings</li>
  <li class="menu-sep">Sign out</li>
</menu>
```

```css
/* Anchor positioning (the Floating UI job): the menu is tied to the button with
   `position-anchor` and flips sides via `position-try-fallbacks` when it would
   run off-screen. The popover attribute handles open/close/light-dismiss.
   100% CSS, zero positioning JS. */
.menu-btn {
    anchor-name: --menu-btn;
    padding: 12px 18px;
    border: none;
    border-radius: 12px;
    background: #22d3ee;
    color: #04111b;
    font-size: 1.05rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(34, 211, 238, 0.35);
}

.menu-pop {
    /* anchored to the button — no JS measures or positions this */
    position-anchor: --menu-btn;
    inset: auto; /* clear the popover UA default so position-area wins */
    position-area: block-end span-inline-end; /* below, left-aligned */
    position-try-fallbacks:
        flip-block,
        flip-inline,
        flip-block flip-inline;
    margin: 8px 0;

    width: 184px;
    padding: 8px;
    list-style: none;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #151b2d;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.55);
    color: #e8eefc;
}
.menu-pop li {
    padding: 11px 14px;
    border-radius: 9px;
    font-size: 1.05rem;
}
.menu-pop li:hover {
    background: rgba(255, 255, 255, 0.08);
}
.menu-sep {
    margin-top: 6px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #fca5a5;
}
```

In the talk this demo had a draggable trigger so the room could watch the menu flip sides in real time as the button approached the edge — drag it near the bottom and the menu hops on top. The flip needs nothing from you; the browser recomputes it every frame.

### Select lists no longer suck

**Chrome 135 · Safari Technology Preview (flag) · not yet in Firefox**

The styled dropdown everyone reaches for react-select / Radix Select / Headless UI Listbox to build: a trigger showing the picked option with an avatar, opening a popover of rich options. This is a **real native `<select>`** — keyboard, typeahead, form submission, and screen-reader semantics all free — opted into full styling with one declaration: `appearance: base-select` on the control AND its `::picker(select)` popover.

The custom trigger is a `<button>` holding a `<selectedcontent>` element, which the browser fills with a live clone of the chosen `<option>`'s markup. Rich markup inside `<option>` is now valid HTML under the customizable-select spec — that's the whole point. The option list is the picker popover; open state and the active row are plain CSS (`:open`, `option:checked`). Zero JS, zero dependency.

```html
<div class="pick">
  <label for="reviewer">Assign reviewer</label>

  <select id="reviewer" class="pick-select">
    <!-- the custom trigger — <selectedcontent> mirrors the chosen option -->
    <button>
      <selectedcontent></selectedcontent>
      <span class="pick-caret"></span>
    </button>

    <option value="maya" selected>
      <span class="pick-avatar" style="--h: 200">MR</span>
      <span class="pick-meta">
        <span class="pick-name">Maya R.</span>
        <span class="pick-role">Frontend</span>
      </span>
    </option>

    <option value="owen">
      <span class="pick-avatar" style="--h: 265">OB</span>
      <span class="pick-meta">
        <span class="pick-name">Owen B.</span>
        <span class="pick-role">Platform</span>
      </span>
    </option>

    <option value="priya">
      <span class="pick-avatar" style="--h: 150">PN</span>
      <span class="pick-meta">
        <span class="pick-name">Priya N.</span>
        <span class="pick-role">Infrastructure</span>
      </span>
    </option>

    <option value="sana">
      <span class="pick-avatar" style="--h: 330">SK</span>
      <span class="pick-meta">
        <span class="pick-name">Sana K.</span>
        <span class="pick-role">Design</span>
      </span>
    </option>
  </select>
</div>
```

```css
/* ── Customizable <select> ──────────────────────────────────────────────────
   The dropdown people install react-select / Radix / Headless UI for. The ONE
   opt-in below — `appearance: base-select` on BOTH the control and its
   ::picker(select) popover — unlocks styling the whole thing, including the
   option list that used to force a JS combobox. */
.pick {
    display: grid;
    gap: 14px;
    width: 420px;
}
.pick > label {
    font-size: 1rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #94a3b8;
}

.pick-select,
.pick-select::picker(select) {
    appearance: base-select; /* opt the control AND its popover into styling */
}

.pick-select {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    background: #0b1020;
    color: #e8eefc;
    font: inherit;
    padding: 0;
}
.pick-select::picker-icon {
    display: none; /* we draw our own caret */
}

/* the custom trigger (first child of the select) */
.pick-select button {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-radius: 14px;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
}
.pick-select:open button {
    box-shadow: 0 0 0 2px #22d3ee;
}

/* <selectedcontent> is the live clone of the chosen option inside the button */
.pick-select selectedcontent {
    display: flex;
    align-items: center;
    gap: 14px;
    flex: 1;
}
.pick-select selectedcontent .pick-role {
    display: none; /* trigger shows the avatar + name only */
}

.pick-caret {
    width: 9px;
    height: 9px;
    margin-left: auto;
    border-right: 2px solid #94a3b8;
    border-bottom: 2px solid #94a3b8;
    translate: 0 -2px;
    rotate: 45deg;
    transition: rotate 0.25s ease;
}
.pick-select:open .pick-caret {
    rotate: 225deg;
}

/* the popover list — it's a real popover, so it can animate open */
.pick-select::picker(select) {
    width: anchor-size(width); /* match the trigger width */
    margin-top: 8px;
    padding: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    background: #151b2d;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);

    opacity: 0;
    translate: 0 -6px;
    transition:
        opacity 0.18s ease,
        translate 0.18s ease,
        display 0.18s allow-discrete,
        overlay 0.18s allow-discrete;
}
.pick-select:open::picker(select) {
    opacity: 1;
    translate: 0;
}
@starting-style {
    .pick-select:open::picker(select) {
        opacity: 0;
        translate: 0 -6px;
    }
}

.pick-select option {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 12px;
    border-radius: 12px;
    color: #e8eefc;
}
.pick-select option::checkmark {
    display: none; /* drop the native tick — :checked carries the state */
}
.pick-select option:hover {
    background: rgba(255, 255, 255, 0.07);
}
.pick-select option:checked {
    background: color-mix(in srgb, #22d3ee 22%, transparent);
}

.pick-avatar {
    display: grid;
    place-items: center;
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: hsl(var(--h) 65% 48%);
    color: #fff;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.02em;
}
.pick-meta {
    display: grid;
    gap: 2px;
}
.pick-name {
    font-size: 1.15rem;
    font-weight: 600;
}
.pick-role {
    font-size: 0.92rem;
    color: #94a3b8;
}
```

Notice the picker is a real popover, so it gets `@starting-style` + `allow-discrete` open/close animation for free — the same trick as the drawer.

### An emoji reaction picker — still one native `<select>`

**Chrome 135 · Safari Technology Preview (flag) · not yet in Firefox**

This one is by [Una Kravets](https://una.im) — her ["Emoji Picker with fallback" pen](https://codepen.io/una/pen/RNaWYNK), which I used in the talk verbatim, with credit. The shock: this Facebook-style reaction bar is the **same native `<select>`** as the previous demo — the only trick is laying its picker out as a horizontal row of round emoji (`::picker(select) { flex-direction: row }`). And because she wraps the styling in `@supports (appearance: base-select)`, browsers without support just get a normal, working `<select>`.

Here's her pen, live — click the emoji (in a Chrome 135+ browser) and poke through the HTML/CSS tabs for the full source:

<iframe height="450" style="width: 100%;" scrolling="no" title="Emoji Picker with fallback by Una Kravets" src="https://codepen.io/una/embed/RNaWYNK?default-tab=css%2Cresult" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>

The unique bit that turns a dropdown into a reaction bar is just this:

```css
/* the picker is a horizontal row of round */
/* emoji — a reaction bar, not a dropdown */
::picker(select) {
  flex-direction: row;
}

option {
  font-size: 1.8rem;
  border-radius: 50%;
  padding: 0.7rem;
  &::checkmark { display: none }
}
```

## Stop 6: Bleeding edge

### HTML that streams in, out of order

**Chrome 148 · experimental flag**

No fetch, no `innerHTML`, no hydration. [Declarative partial updates](https://developer.chrome.com/blog/declarative-partial-updates) let server HTML reserve slots up front and fill them whenever each chunk arrives — in any order — with zero JavaScript. The genuine syntax:

```html
<ul id="results">
  <?start name="results"> Loading… <?end>
</ul>

<!-- each chunk fills the slot the moment
     it arrives — in any order, no JS -->
<template for="results">
  <li>web.dev</li>
  <?marker name="results">
</template>
```

A `<?start name>…<?end>` placeholder holds the spot, and each `<template for="…">` chunk fills its marker whenever it arrives — the server just keeps writing chunks down the same response, in whatever order they finish. Slots stay in document order; content lands in the right one regardless of arrival order. In the talk this was the moment the room realized HTML itself is gaining the streaming/out-of-order rendering story frameworks have been building in userland.

### Draw live HTML into a canvas

**Chrome 148 · `drawElementImage` · experimental flag**

The finale's setup. For years, getting DOM into a canvas or WebGL meant a screenshot (html2canvas) or a separate CSS3D layer that can't composite with the scene. The new [html-in-canvas](https://github.com/WICG/html-in-canvas) API — `ctx.drawElementImage()` — rasterizes a **live, interactive** element straight into a 2D context. Real fonts, real inputs, real CSS.

The whole demo is plain HTML plus a few lines of vanilla JS (the API itself is a canvas method, so this is as JS-free as it gets). The element must be a child of a `<canvas layoutsubtree>` — it stays live and focusable; the canvas just mirrors its pixels. Type in the input and watch the canvas copy update:

```html
<canvas id="mirror" layoutsubtree width="1024" height="640">
  <!-- live, interactive — focusable, typeable -->
  <section id="card" class="card">
    <h2>This Component Could Have Been A Div</h2>
    <input value="Hello from the DOM" />
    <select>
      <option>Aurora</option>
      <option>Sentry</option>
      <option>Syntax</option>
      <option>Graffiti</option>
    </select>
  </section>
</canvas>

<script>
  const ctx = mirror.getContext('2d')

  function paint() {
    ctx.clearRect(0, 0, mirror.width, mirror.height)
    // the element stays live — this just rasterizes its current pixels
    ctx.drawElementImage(card, 0, 0, mirror.width, mirror.height)
    requestAnimationFrame(paint)
  }
  requestAnimationFrame(paint)
</script>
```

And since it lands in a canvas, it's one step from being a GPU texture:

```javascript
// it's a texture now — feed it to the GPU
material.map = new THREE.CanvasTexture(mirror)
```

Drawing DOM that looks like DOM is a parlor trick; the point is that once it's a texture, the whole GPU is yours. In the talk, this is how the deck's own title card became a particle field that dissolved into a galaxy — the slide was rendered with the very API it was demonstrating. (That particle scatter is three.js scenery, not platform — it lives in the repo at [`src/scene/DissolveCard.jsx`](https://github.com/stolinski/react-summit-talk-2026/blob/main/src/scene/DissolveCard.jsx) if you want it.)

The API ships in Chrome 148+ behind `chrome://flags/#canvas-draw-element` (origin trial 148–150), so feature-detect and degrade:

```javascript
/** True only when the real drawElementImage API is present (flag enabled). */
const HTML_IN_CANVAS_SUPPORTED =
    typeof CanvasRenderingContext2D !== "undefined" &&
    typeof CanvasRenderingContext2D.prototype.drawElementImage === "function";

/**
 * Rasterize a live element into a 2D context with the real API. `el` MUST be a
 * descendant of a `<canvas layoutsubtree>` (typically the very canvas we draw
 * into). Returns true on success; false if the API threw or is unavailable, so
 * callers can fall back without a black frame.
 */
function paintElement(ctx, el, w, h) {
    if (!HTML_IN_CANVAS_SUPPORTED || !el) return false;
    try {
        ctx.reset?.();
        ctx.clearRect(0, 0, w, h);
        // drawElementImage(element, dx, dy, dWidth, dHeight) — scale to fit.
        ctx.drawElementImage(el, 0, 0, w, h);
        return true;
    } catch {
        return false;
    }
}
```

### Proof it scales: Graffiti

The credibility payoff capping the tour: none of this is toys. [Graffiti](https://graffiti-ui.com/) is my platform-only component library — HTML and CSS, no JS framework required — built entirely on the techniques above. Drawers, swipes, sheets, menus, the lot. In the talk it was embedded live, full screen (an `<iframe>` dressed up as a desktop browser window), as the answer to "sure, but does this hold up for a whole real library?"

## The close: your agents can write this too

The reason this all matters more than ever: agents write a huge share of UI code now, and left to their average, they default to div soup plus a dependency. Your platform knowledge is the ceiling on what they ship.

### The same menu, two supply chains

Every import is a trust decision. The talk put two ways to get the exact same dropdown side by side. The usual way:

```text
$ npm i @floating-ui/react

@floating-ui/react
└─ @floating-ui/react-dom
   └─ @floating-ui/dom
      └─ @floating-ui/core
         └─ @floating-ui/utils
```

Five packages you didn't write — shipped to every user, forever yours to patch. Versus the platform:

```css
.menu {
  position-anchor: --btn;
  position-try-fallbacks: flip-block;
}
```

Zero packages. Zero kilobytes shipped. Audited by the browser vendors.

### The reason you installed it is gone

You pulled in the library because writing it yourself was the expensive part. It isn't anymore. The dependency stopped being a trade and became risk you kept for nothing.

And there's the other edge: point an agent at nothing and it installs. Left to its average, an agent reaches for the registry — and will confidently import a package that doesn't exist, a name attackers now register to catch the guess. The same tool that can delete dependencies will happily add a hostile one.

### You write its defaults

You can't approve what you can't recognize. The fix is the same as it's always been — know the platform — except now you can also write it down once and have it apply to everything your agents ship:

```text
# CLAUDE.md / .cursorrules

Prefer the platform over packages:
  <dialog>        over a modal library
  :has()          over state
  anchor + try    over Floating UI
  scroll timeline over scroll listeners

No new dependency without asking first.
```

## This component could have been a div

Now you're the one who decides it is. Every component you write becomes the next model's training data — ship the platform and you raise the floor for everyone.

The full deck — solar system, dissolving title card and all — is at [github.com/stolinski/react-summit-talk-2026](https://github.com/stolinski/react-summit-talk-2026).
