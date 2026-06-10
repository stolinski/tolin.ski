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

Everything from my React Summit 2026 talk — every demo, with the complete code.

<!-- excerpt -->

This is the written compendium of my React Summit 2026 talk, "This Component Could Have Been A Div." The whole deck is a React app rendered inside a three.js solar system (yes, really — the [source is on GitHub](https://github.com/stolinski/react-summit-talk-2026)), and every demo in it is a tiny self-contained React component that uses **only the platform**. No modal library, no gesture library, no positioning library, no carousel library.

The premise: a huge amount of what we install from npm is now a built-in browser feature. The talk tours those features from "shipped everywhere years ago" to "behind a flag in Chrome last month," and ends with why this matters more than ever now that agents write so much of our UI code.

Below is every demo, in talk order, with the **full code** — the complete JSX and the complete CSS, straight out of the repo, nothing abbreviated. Browser support is listed as it appeared on the slides.

## Table of Contents

## Stop 1: Native HTML

### A basic modal with `<dialog>`

**Chrome 37 · Safari 15.4 · Firefox 98**

This is the template for every "this could have been a div" demo: a tiny component, dropped in, using only the platform. Click the button and a real native modal opens — focus trap, ESC-to-close, `::backdrop`, all free. The only JavaScript is one method call.

```jsx
import { useRef } from 'react'

/**
 * A real, live, native <dialog>. Click the button on stage and the actual
 * platform modal opens — focus trap, ESC-to-close, ::backdrop, all free.
 *
 * This is the template for every "this could have been a div" demo:
 * a tiny self-contained component using only the platform, dropped into a slide.
 */
export function DialogDemo() {
  const ref = useRef(null)

  return (
    <>
      <button className="btn" onClick={() => ref.current?.showModal()}>
        Open modal
      </button>

      <dialog ref={ref} className="native-dialog">
        <h3>I&rsquo;m a native &lt;dialog&gt;</h3>
        <p>Focus trap, ESC to close, a real backdrop — zero dependencies.</p>
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </dialog>
    </>
  )
}
```

```css
/* Modals/drawers use showModal() → they're promoted to the top layer, which is
   NOT affected by the stage transform, so they size against the real viewport.
   vmin keeps them scaling with resolution; a modal should cover the real screen. */
.native-dialog {
    max-width: min(90vw, 44vmin);
    min-width: 320px;
    padding: 3vmin 3.4vmin;
    border: none;
    border-radius: 1.6vmin;
    background: #0b1020;
    color: #e2e8f0;
    font-size: 1.7vmin;
}

.native-dialog h3 {
    margin-top: 0;
}

.native-dialog::backdrop {
    background: rgba(2, 6, 12, 0.6);
    backdrop-filter: blur(4px);
}
```

Note the `<form method="dialog">` — submitting it closes the dialog. No close handler.

### A drawer that slides in… and back out

**Chrome 117 · Safari 17.4/17.5 · Firefox 129**

The exit is the kill shot. Sliding *in* was always easy; the reason people reach for `vaul` is that animating *out* used to need JavaScript — wait for the animation to finish, THEN unmount. Now it's a native `<dialog>` plus a CSS `translate` transition: `@starting-style` handles the enter, and `transition-behavior: allow-discrete` on `display` and `overlay` keeps the dialog rendered and in the top layer long enough to play the slide-out. One line of JS to open it. Zero dependencies.

```jsx
import { useRef } from 'react'

/**
 * A drawer — slide-in panel, dimmed backdrop, focus trap, ESC-to-close,
 * click-outside dismiss — and it animates BOTH in and out.
 *
 * The exit is the kill shot. Sliding *in* was always easy; the reason people
 * reach for `vaul` is that animating *out* used to need JS (wait for the
 * animation to finish, THEN unmount). Now it's a native <dialog> + a CSS
 * `translate` transition: `@starting-style` handles the enter, and
 * `transition-behavior: allow-discrete` keeps it on screen long enough to
 * animate the exit. One line of JS to open it; zero dependencies.
 */
export function DrawerDemo() {
  const ref = useRef(null)

  return (
    <>
      <button className="btn" onClick={() => ref.current?.showModal()}>
        Open drawer
      </button>

      <dialog ref={ref} className="drawer">
        <h3>I slide in. I slide out.</h3>
        <p>
          Focus trapped, ESC closes me, the backdrop dims — and both the enter
          and the exit animate, in pure CSS. The part you used to install a
          library for.
        </p>
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </dialog>
    </>
  )
}
```

```css
/* The drawer: a modal <dialog> pinned to the right edge that animates both
   ways. translate moves it; allow-discrete on display/overlay keeps it in the
   top layer long enough to animate OUT (the part that used to need JS). */
.drawer {
    height: 100dvh;
    max-height: 100dvh;
    width: min(92vw, 40vmin);
    min-width: 300px;
    margin: 0 0 0 auto; /* pin to the right edge */
    padding: 3.4vmin 3.8vmin;
    border: none;
    border-radius: 1.6vmin 0 0 1.6vmin;
    background: #0b1020;
    color: #e2e8f0;
    font-size: 1.7vmin;

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

The plainest possible scroll-snap: a vertical, Instagram-reel feed. Each post is one viewport tall and the page snaps to it as you flick. Two CSS rules carry the entire gesture: the feed snaps on the y axis, and every post is a snap target. No carousel library, no JS, no state.

```jsx
/**
 * The plainest possible scroll-snap: a vertical, Instagram-reel feed. Each post
 * is one viewport tall and the page snaps to it as you flick — the full
 * full-screen-feed gesture with no carousel library, no JS, no state. Two CSS
 * rules carry it: the feed snaps on the y axis, every post is a snap target.
 */
const POSTS = [
  { handle: 'syntax', caption: 'this could have been a div' },
  { handle: 'sentry', caption: 'no library, just scroll-snap' },
  { handle: 'graffiti', caption: 'the platform already does this' },
  { handle: 'scott', caption: 'flick up — it snaps every time' },
]

export function ReelDemo() {
  return (
    <div className="reel">
      {POSTS.map((p, i) => (
        <div className="reel-post" style={{ '--i': i + 1 }} key={p.handle}>
          <span className="reel-play">▶</span>
          <div className="reel-meta">
            <b>@{p.handle}</b>
            <span>{p.caption}</span>
          </div>
          <div className="reel-rail">
            <span>♥</span>
            <span>💬</span>
            <span>↗</span>
          </div>
        </div>
      ))}
    </div>
  )
}
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

```jsx
import { useRef } from 'react'

/**
 * The multi-detent bottom sheet people reach for `vaul` to get: it rests at
 * three positions — peek, half, full — and drags smoothly between them with
 * real momentum. The trick is that those rest positions are just CSS
 * `scroll-snap` points, so the browser's native scrolling IS the gesture. No
 * drag handler, no spring physics library, no open/half/full state in JS. The
 * backdrop even dims on its own via a scroll-driven animation.
 *
 * The geometry below is derived from one rule: visible sheet height
 *   = deviceHeight − panelTop + scrollTop.
 * Pick the three heights you want to rest at (PEEK/HALF/FULL) and the snap
 * offsets fall out, so the CSS and the (optional) click-to-hop stay in sync.
 */
const W = 360 // device width  (1080p design px — the overlay is a scaled stage)
const H = 460 // device height
const PEEK = 96 //  sheet visible when closed
const HALF = 250 // sheet visible at the middle detent
const FULL = 430 // sheet visible when open

const PANEL_TOP = H - PEEK //            364 — panel offset so "closed" == scrollTop 0
const T_HALF = HALF - H + PANEL_TOP //   154 — scroll offset of the half detent
const T_FULL = FULL - H + PANEL_TOP //   334 — scroll offset of the full detent (== max scroll)
const DETENTS = [0, T_HALF, T_FULL]
// The three transparent "rungs" stacked above the panel; each one's top edge is
// a snap point, so their heights are the gaps between detents.
const ZONES = [T_HALF, T_FULL - T_HALF, PANEL_TOP - T_FULL] // [154, 180, 30]

const SHARE = ['Syntax', 'Sentry', 'Notes', 'Mail', 'More']
const ACTIONS = ['Copy link', 'Add to favorites', 'Edit details']

export function BottomSheetDemo() {
  const ref = useRef(null)

  // Optional stage convenience: click the grip to hop to the next detent.
  // The snapping itself is pure CSS — this just spares a trackpad drag on stage.
  const hop = () => {
    const el = ref.current
    if (!el) return
    const next = DETENTS.find((t) => t > el.scrollTop + 8) ?? 0
    el.scrollTo({ top: next, behavior: 'smooth' })
  }

  return (
    <div className="bs-device" style={{ '--bs-w': `${W}px`, '--bs-h': `${H}px` }}>
      {/* Decorative app sitting behind the sheet. */}
      <div className="bs-app">
        <div className="bs-app-bar">
          <span>9:41</span>
          <span>Library</span>
          <span>＋</span>
        </div>
        <div className="bs-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div className="bs-tile" style={{ '--i': n }} key={n} />
          ))}
        </div>
      </div>

      {/* The sheet: a scroll-snap container whose rungs are the rest positions. */}
      <div className="bs-scroller" ref={ref}>
        <div className="bs-dim" />
        {ZONES.map((h, i) => (
          <div className="bs-zone" style={{ height: `${h}px` }} key={i} />
        ))}
        <div className="bs-panel" style={{ height: `${FULL}px` }}>
          <button className="bs-grip" onClick={hop} aria-label="Expand sheet" />
          <h4>Share to…</h4>
          <div className="bs-share">
            {SHARE.map((name, i) => (
              <span className="bs-app-icon" style={{ '--i': i + 1 }} key={name}>
                <b>{name[0]}</b>
                {name}
              </span>
            ))}
          </div>
          <ul className="bs-list">
            {ACTIONS.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
```

```css
/* Multi-detent bottom sheet (the `vaul` job): the peek / half / full rest
   positions are CSS scroll-snap points, so native momentum scrolling IS the
   drag. The backdrop dims via a scroll-driven animation. No gesture library,
   no open/half/full state in JS. `timeline-scope` lets the dim (a sibling)
   read the scroller's named scroll-timeline. */
.bs-device {
    position: relative;
    width: var(--bs-w);
    height: var(--bs-h);
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
    padding: 12px 22px 24px;
    background: #141a2b;
    border-radius: 26px 26px 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 -18px 50px rgba(0, 0, 0, 0.5);
    color: #e8eefc;
}
.bs-grip {
    display: block;
    width: 44px;
    height: 5px;
    margin: 6px auto 18px;
    border: none;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.32);
    cursor: pointer;
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

```jsx
/**
 * Graffiti's `.swipe`, with ZERO JavaScript. Each row is a horizontal
 * `scroll-snap` container laid out `auto 1fr auto`, and the MIDDLE cell is sized
 * `100cqw` — exactly the row's width — so the two action buttons sit just
 * offscreen on either side. The browser's native horizontal scroll IS the swipe.
 *
 * This is the "swipe-back" version (Graffiti's default `.swipe`, not its `.stop`
 * modifier): the centered cell is the ONLY snap point, so a released swipe
 * always springs straight back to center. No drag handlers, no state, no spring
 * physics — and nothing to reset between runs. Swipe a row with a two-finger
 * trackpad gesture and the action peeks out, then snaps home on release.
 */
const ROWS = [
  { from: 'Syntax', subject: 'New episode just dropped', time: '9:41', hue: 45 },
  { from: 'Sentry', subject: 'Issue resolved in production', time: '8:12', hue: 265 },
  { from: 'Vercel', subject: 'Deployment is ready', time: 'Tue', hue: 200 },
  { from: 'GitHub', subject: 'Review requested on #482', time: 'Mon', hue: 150 },
]

export function SwipeActionsDemo() {
  return (
    <div className="swipe-inbox">
      <div className="swipe-bar">
        <span>Inbox</span>
        <span className="swipe-hint">‹ swipe ›</span>
      </div>
      <ul className="swipe-list">
        {ROWS.map((m) => (
          <li className="swipe" key={m.from}>
            {/* first child = left action */}
            <button className="swipe-act pin">Pin</button>

            {/* second child = the visible row, sized to 100cqw */}
            <div className="swipe-row">
              <span className="swipe-avatar" style={{ '--h': m.hue }}>
                {m.from[0]}
              </span>
              <span className="swipe-text">
                <b>{m.from}</b>
                <span>{m.subject}</span>
              </span>
              <span className="swipe-time">{m.time}</span>
            </div>

            {/* third child = right action */}
            <button className="swipe-act del">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
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
    color: var(--accent);
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

A carousel whose dot markers and prev/next buttons are **generated by the browser** — zero JS, zero extra markup. `::scroll-button()` makes the arrows, `::scroll-marker` makes the dots, and `:target-current` highlights the active one. Look at how little JSX there is.

```jsx
/**
 * A carousel with scroll-snap whose dot markers and prev/next buttons are
 * GENERATED BY THE BROWSER — zero JS. ::scroll-button() makes the arrows,
 * ::scroll-marker makes the dots, :target-current highlights the active one.
 */
const SLIDES = [1, 2, 3, 4, 5]

export function CarouselDemo() {
  return (
    <div className="carousel">
      {SLIDES.map((n) => (
        <div className="carousel-slide" style={{ '--i': n }} key={n}>
          {n}
        </div>
      ))}
    </div>
  )
}
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

```jsx
/**
 * A cover-flow gallery that scrubs as you scroll: each card scales up and turns
 * to face you as it passes center, then falls back as it leaves. The whole
 * effect is `animation-timeline: view()` — every card animates off its own
 * position in the scroller. No scroll listeners, no rAF, no library.
 */
const CARDS = [1, 2, 3, 4, 5, 6, 7]

export function ScrollScrubDemo() {
  return (
    <div className="scrubber">
      {CARDS.map((n) => (
        <div className="scrub-card" key={n} style={{ '--i': n }}>
          {n}
        </div>
      ))}
    </div>
  )
}
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

```jsx
/**
 * A sticky header that restyles itself the instant it sticks — pure CSS, via a
 * scroll-state() container query. Scroll the panel: the header compacts and
 * gains a shadow when stuck. No scroll listener anywhere.
 */
export function StickyDemo() {
  return (
    <div className="sticky-scroller">
      <div className="sticky-head">
        <span className="sticky-title">Scroll me ↓</span>
      </div>
      <div className="sticky-body">
        <p>Keep scrolling — watch the header above.</p>
        <p>
          The header is <code>position: sticky</code> and a
          <code> scroll-state</code> container. The moment it sticks to the top,
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
  )
}
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
        background: var(--accent);
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

A stat counting up from 0 to 1,000,000 with zero JavaScript. An `@property`-typed `<integer>` custom property is animated by keyframes; `counter()` prints it. No timer, no rAF. The entire React component is one line.

```jsx
/**
 * A stat counting up 0 → 1,000,000 with ZERO JavaScript. An @property-typed
 * <integer> is animated by keyframes; counter() prints it. No timer, no rAF.
 * (Re-runs every time you land on the slide, since the card remounts.)
 */
export function CounterDemo() {
  return <div className="counter" />
}
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
    /* Loops up → hold → down → hold, forever. 0.8s lead so it starts AFTER the
       card rises in (holds 0 during the delay via `both`); the holds at each end
       are the pause between counting in and back out. 8s round trip. */
    animation: count-loop 8s ease-in-out 0.8s infinite both;
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

```jsx
/**
 * A bar chart where every bar's height, hue, and animation delay come from
 * sibling-index() — no inline style="--i", no JS. Each element simply knows its
 * own position among its siblings, so it staggers in on its own.
 */
const BARS = Array.from({ length: 12 })

export function SiblingIndexDemo() {
  return (
    <div className="siblings">
      {BARS.map((_, i) => (
        <div className="sib" key={i} />
      ))}
    </div>
  )
}
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
       index so it ripples. 0.8s lead so the first wave starts after the card
       rises in (scaleY animates, not height, so keyframes stay index-free). */
    animation: sib-pulse 4s ease-in-out infinite both;
    animation-delay: calc(0.8s + sibling-index() * 70ms);
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

The job people install Floating UI / Popper.js / Tippy for: a menu anchored to a trigger that flips to the other side when it would run off-screen. Here the positioning is pure CSS — `position-anchor` ties the menu to the button, `position-area` puts it below, and `position-try-fallbacks` flips it above or to the side when there's no room.

The only JavaScript in this demo is the drag (pointer events moving the button) — and that's honest: dragging IS interactive. As you drag, the browser recomputes the menu's side every frame. The code never touches the menu.

```jsx
import { useRef, useState } from 'react'

/**
 * The job people install Floating UI / Popper.js / Tippy for: a menu anchored
 * to a trigger that FLIPS to the other side when it would run off-screen. Here
 * the positioning is pure CSS — `position-anchor` ties the menu to the button,
 * `position-area` puts it below, and `position-try-fallbacks` flips it above /
 * to the side when there's no room. Zero positioning JS.
 *
 * The only JavaScript is the drag (pointer events moving the button) — and
 * that's honest: dragging IS interactive. As you drag, the browser recomputes
 * the menu's side every frame. We never touch the menu.
 */
const STAGE_W = 560 // 1080p design px — the overlay is a scaled stage
const STAGE_H = 360 // tall enough that the menu has real room to flip above/below
const CHIP_W = 132
const CHIP_H = 46
const PAD = 8 // keep the trigger off the very edge so the flipped menu fits

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi)

export function AnchorFlipDemo() {
  const stageRef = useRef(null)
  const grab = useRef({ x: 0, y: 0 })
  const [pos, setPos] = useState({
    x: STAGE_W / 2 - CHIP_W / 2,
    y: STAGE_H / 2 - CHIP_H / 2,
  })

  // Map a pointer event to stage-local DESIGN px (the stage is CSS-scaled, so
  // we divide out the scale via the rendered vs. design width).
  const toLocal = (e) => {
    const r = stageRef.current.getBoundingClientRect()
    return {
      x: ((e.clientX - r.left) / r.width) * STAGE_W,
      y: ((e.clientY - r.top) / r.height) * STAGE_H,
    }
  }

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const p = toLocal(e)
    grab.current = { x: p.x - pos.x, y: p.y - pos.y }
  }

  const onPointerMove = (e) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    const p = toLocal(e)
    setPos({
      x: clamp(p.x - grab.current.x, PAD, STAGE_W - CHIP_W - PAD),
      y: clamp(p.y - grab.current.y, PAD, STAGE_H - CHIP_H - PAD),
    })
  }

  return (
    <div className="anchor-stage" ref={stageRef}>
      <button
        className="anchor-chip"
        style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        ⠿ Drag me
      </button>

      <menu className="anchor-pop">
        <li>Profile</li>
        <li>Settings</li>
        <li className="anchor-sep">Sign out</li>
      </menu>
    </div>
  )
}
```

```css
/* Anchor positioning (the Floating UI job): the menu is tied to the button with
   `position-anchor` and flips sides via `position-try-fallbacks` when it would
   run off the stage. The drag is JS; the positioning is 100% CSS. */
.anchor-stage {
    position: relative;
    width: 560px;
    height: 360px;
    border-radius: 18px;
    border: 1px dashed rgba(255, 255, 255, 0.18);
    background:
        radial-gradient(
            120% 120% at 50% 0%,
            rgba(56, 189, 248, 0.08),
            transparent 60%
        ),
        #0b1020;
    overflow: hidden;
}
.anchor-chip {
    position: absolute;
    anchor-name: --chip;
    width: 132px;
    height: 46px;
    border: none;
    border-radius: 12px;
    background: var(--accent);
    color: #04111b;
    font-size: 1.05rem;
    font-weight: 700;
    cursor: grab;
    touch-action: none; /* let the drag own the gesture, not the scroller */
    user-select: none;
    box-shadow: 0 8px 24px rgba(56, 189, 248, 0.35);
}
.anchor-chip:active {
    cursor: grabbing;
}
.anchor-pop {
    /* anchored to the button — no JS measures or positions this */
    position: absolute;
    position-anchor: --chip;
    position-area: block-end span-inline-end; /* below, left-aligned to the button */
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
.anchor-pop li {
    padding: 11px 14px;
    border-radius: 9px;
    font-size: 1.05rem;
}
.anchor-pop li:hover {
    background: rgba(255, 255, 255, 0.08);
}
.anchor-sep {
    margin-top: 6px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #fca5a5;
}
```

### Select lists no longer suck

**Chrome 135 · Safari Technology Preview (flag) · not yet in Firefox**

The styled dropdown everyone reaches for react-select / Radix Select / Headless UI Listbox to build: a trigger showing the picked option with an avatar, opening a popover of rich options. This is a **real native `<select>`** — keyboard, typeahead, form submission, and screen-reader semantics all free — opted into full styling with one declaration: `appearance: base-select` on the control AND its `::picker(select)` popover.

The custom trigger is a `<button>` holding a `<selectedcontent>` element, which the browser fills with a live clone of the chosen `<option>`'s markup. The option list is the picker popover; open state and the active row are plain CSS (`:open`, `option:checked`). Zero JS, zero dependency.

One heads-up for React folks: React's dev-only `validateDOMNesting` logs two warnings here — a `<button>` inside `<select>`, and elements inside `<option>`. Both are now valid HTML under the customizable-select spec (that's the whole point); React's check just predates it. The warnings are stripped from production builds and nothing is broken.

```jsx
/**
 * The styled dropdown everyone reaches for react-select / Radix Select /
 * Headless UI Listbox to build: a trigger that shows the picked option with an
 * avatar, opening a popover of RICH options (avatar + name + role).
 *
 * This is a REAL native <select> — keyboard, typeahead, form submission and
 * screen-reader semantics all free — opted into full styling with
 * `appearance: base-select`. The custom trigger is a <button> holding a
 * <selectedcontent>, which the browser fills with a live clone of the chosen
 * <option>'s markup. The option list is the ::picker(select) popover; the open
 * state and the active row are plain CSS (:open, option:checked). Zero JS,
 * zero dependency.
 *
 * Avatars are CSS-drawn (initials in a colored disc) so nothing is fetched —
 * offline-safe on conference wifi, like the swipe demo's avatars.
 *
 * NOTE: React's dev-only `validateDOMNesting` logs two warnings here — a
 * <button> inside <select>, and elements inside <option>. Both are now VALID
 * HTML under the customizable-select spec (that's the whole point); React's
 * check just predates it. The warnings are stripped from production builds and
 * nothing is broken — the control renders and behaves natively.
 */
const PEOPLE = [
  { id: 'maya', name: 'Maya R.', role: 'Frontend', initials: 'MR', hue: 200 },
  { id: 'owen', name: 'Owen B.', role: 'Platform', initials: 'OB', hue: 265 },
  { id: 'priya', name: 'Priya N.', role: 'Infrastructure', initials: 'PN', hue: 150 },
  { id: 'sana', name: 'Sana K.', role: 'Design', initials: 'SK', hue: 330 },
]

export function SelectDemo() {
  return (
    <div className="pick">
      <label htmlFor="reviewer">Assign reviewer</label>

      <select id="reviewer" className="pick-select" defaultValue="maya">
        {/* the custom trigger — <selectedcontent> mirrors the chosen option */}
        <button>
          <selectedcontent></selectedcontent>
          <span className="pick-caret" />
        </button>

        {PEOPLE.map((p) => (
          <option key={p.id} value={p.id}>
            <span className="pick-avatar" style={{ '--h': p.hue }}>
              {p.initials}
            </span>
            <span className="pick-meta">
              <span className="pick-name">{p.name}</span>
              <span className="pick-role">{p.role}</span>
            </span>
          </option>
        ))}
      </select>
    </div>
  )
}
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
    box-shadow: 0 0 0 2px var(--accent);
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
    background: color-mix(in srgb, var(--accent) 22%, transparent);
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

My wrapper component from the deck is below. One interesting platform-on-platform move: because her CSS targets bare `select` / `option` / `::picker(select)` (it's a standalone pen), I render it into a **shadow root** so those global selectors stay fully encapsulated and can't leak into the rest of the deck. Shadow DOM is itself the platform.

```jsx
import { useEffect, useRef } from 'react'

/**
 * "Emoji Picker with fallback" — by Una Kravets.
 * https://codepen.io/una/pen/RNaWYNK
 *
 * Used VERBATIM (her exact HTML + CSS, imported as the HTML and CSS strings
 * below — see the repo for the full source). The whole thing is one native
 * <select> opted into `appearance: base-select`, restyled into a round emoji
 * reaction button whose picker is a horizontal row — and wrapped in
 * `@supports (appearance: base-select)` so browsers without it just get a
 * normal, working <select>. A reaction picker that could have been a div.
 *
 * Because her CSS targets bare `select` / `option` / `::picker(select)` / `body`
 * (it's a standalone pen), we render it into a SHADOW ROOT so those global
 * selectors stay fully encapsulated and can't leak into the rest of the deck —
 * her source is reproduced unchanged. Shadow DOM is itself the platform.
 */
export function EmojiPickerDemo() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || host.shadowRoot) return
    const root = host.attachShadow({ mode: 'open' })
    root.innerHTML = `<style>${CSS}</style>${HTML}`
  }, [])

  return (
    <figure className="emoji-react">
      <div className="emoji-react-host" ref={hostRef} />
      <figcaption className="emoji-react-credit">
        Emoji picker by <strong>Una Kravets</strong> ·{' '}
        codepen.io/una/pen/RNaWYNK
      </figcaption>
    </figure>
  )
}
```

```css
/* Una Kravets' emoji reaction picker (EmojiPickerDemo). The control + its
   styling live in a shadow root; this just frames the host on the dark card and
   gives the bottom-opening picker some room, plus the visible credit line. */
.emoji-react {
    display: grid;
    justify-items: center;
    gap: 18px;
    margin: 0;
    padding: 18px 0 8px;
    min-height: 150px;
    place-content: center;
}
.emoji-react-host {
    display: grid;
    place-items: center;
    width: 78px;
    height: 78px;
    border-radius: 50%;
    /* a faint surface so her white-page design reads as a button on dark */
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.emoji-react-credit {
    margin: 0;
    font-size: 1rem;
    color: #94a3b8;
}
.emoji-react-credit strong {
    color: #e2e8f0;
    font-weight: 600;
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

A `<?start name>…<?end>` placeholder holds the spot, and each `<template for="…">` chunk fills its marker whenever it arrives. The deck demo simulates the fill with JS only because the real API needs the flag plus an actually-streamed response — the code above is the real platform syntax. Here's the full simulation component from the talk:

```jsx
import { useEffect, useRef, useState } from 'react'
import { CodeBlock } from '../../ui/CodeBlock.jsx'

/**
 * Out-of-order streaming — https://developer.chrome.com/blog/declarative-partial-updates
 *
 * LEFT (live, simulated): a results list whose SLOTS are reserved up front, in
 * document order (1–5), but whose CONTENT streams in OUT OF ORDER and still
 * lands in the right slot. That's the whole trick: a `<?start name>…<?end>`
 * placeholder holds the spot, and each `<template for="…">` chunk fills its
 * marker whenever it arrives — no fetch, no innerHTML, no hydration step.
 *
 * RIGHT: the real declarative source (Chrome 148, experimental flag).
 *
 * The fill order is FIXED (3,1,5,2,4) so it reads as deliberately out-of-order
 * on every loop — no random churn, calm motion. The mock is JS-simulated only
 * because the real API needs the flag + an actually-streamed response; the code
 * shown is the genuine platform syntax.
 */
const RESULTS = [
  'react.dev',
  'web.dev',
  'developer.mozilla.org',
  'caniuse.com',
  'html.spec.whatwg.org',
]
// Slots fill in THIS order — deliberately scrambled so "out of order" is obvious.
const ARRIVAL = [2, 0, 4, 1, 3]
const STEP = 720 // ms between arrivals
const LEAD = 650 // ms before the first one lands
const HOLD = 1800 // ms to admire the full list before it replays

const CODE = `<ul id="results">
  <?start name="results"> Loading… <?end>
</ul>

<!-- each chunk fills the slot the moment
     it arrives — in any order, no JS -->
<template for="results">
  <li>web.dev</li>
  <?marker name="results">
</template>`

export function StreamDemo() {
  const [filled, setFilled] = useState(() => RESULTS.map(() => false))
  const timers = useRef([])

  useEffect(() => {
    let cancelled = false
    const run = () => {
      setFilled(RESULTS.map(() => false))
      ARRIVAL.forEach((slot, i) => {
        const t = setTimeout(() => {
          if (cancelled) return
          setFilled((f) => f.map((v, j) => (j === slot ? true : v)))
        }, LEAD + i * STEP)
        timers.current.push(t)
      })
      const loop = setTimeout(run, LEAD + ARRIVAL.length * STEP + HOLD)
      timers.current.push(loop)
    }
    run()
    return () => {
      cancelled = true
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  return (
    <div className="stream">
      <section className="stream-panel">
        <div className="stream-bar">
          <span className="stream-dot" /> streaming response…
        </div>
        <ul className="stream-list">
          {RESULTS.map((r, i) => (
            <li key={i} className={`stream-row ${filled[i] ? 'is-filled' : ''}`}>
              <span className="stream-idx">{i + 1}</span>
              {filled[i] ? (
                <span className="stream-hit">
                  <span className="stream-url">{r}</span>
                  <span className="stream-check">✓</span>
                </span>
              ) : (
                <span className="stream-skel" />
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="stream-code-col">
        <CodeBlock>{CODE}</CodeBlock>
        <p className="stream-compat">Chrome 148 · experimental flag</p>
      </section>
    </div>
  )
}
```

```css
/* Out-of-order streaming: a results list whose SLOTS are reserved in document
   order (the numbered 1–5 boxes) but whose content streams in out of order and
   lands in the right slot anyway (left), beside the real declarative source
   (right). The slot index stays fixed; only the fill order scrambles — that's
   the feature. The fill is JS-simulated; the code shown is the genuine API. */
.stream {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: stretch;
    gap: 26px;
    width: 1040px;
}
.stream-panel,
.stream-code-col {
    padding: 22px 24px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #0b1020;
}
.stream-panel {
    border-color: color-mix(in srgb, var(--accent) 38%, transparent);
    background: linear-gradient(
        180deg,
        color-mix(in srgb, var(--accent) 8%, #0b1020),
        #0b1020 62%
    );
}
.stream-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
    font-size: 1rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #cbd5e1;
}
.stream-dot {
    width: 9px;
    height: 9px;
    border-radius: 999px;
    background: var(--accent);
    box-shadow: 0 0 12px var(--accent);
    animation: stream-pulse 1.4s ease-in-out infinite;
}
@keyframes stream-pulse {
    50% {
        opacity: 0.3;
    }
}
.stream-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.stream-row {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 52px;
    padding: 10px 14px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    font-size: 1.15rem;
}
.stream-idx {
    flex: none;
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.07);
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.95rem;
    color: #94a3b8;
}
.stream-skel {
    flex: 1;
    height: 12px;
    border-radius: 6px;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.14),
        rgba(255, 255, 255, 0.05)
    );
    background-size: 200% 100%;
    animation: stream-shimmer 1.4s linear infinite;
}
@keyframes stream-shimmer {
    to {
        background-position: -200% 0;
    }
}
.stream-row.is-filled {
    background: color-mix(
        in srgb,
        var(--accent) 12%,
        rgba(255, 255, 255, 0.03)
    );
}
.stream-row.is-filled .stream-idx {
    background: color-mix(in srgb, var(--accent) 32%, transparent);
    color: #04111b;
}
.stream-hit {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    color: #e2e8f0;
    animation: stream-land 0.45s ease both;
}
@keyframes stream-land {
    from {
        opacity: 0;
        transform: translateY(7px);
        filter: blur(4px);
    }
}
.stream-check {
    color: var(--accent);
    font-weight: 700;
}
.stream-code-col {
    display: flex;
    flex-direction: column;
}
.stream-code-col .code {
    flex: 1;
    margin: 0;
    font-size: 1.05rem;
}
.stream-compat {
    margin: 14px 0 0;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #fca5a5;
}
```

### Draw live HTML into a canvas

**Chrome 148 · `drawElementImage` · experimental flag**

The finale's setup. For years, getting DOM into a canvas or WebGL meant a screenshot (html2canvas) or a separate CSS3D layer that can't composite with the scene. The new [html-in-canvas](https://github.com/WICG/html-in-canvas) API — `ctx.drawElementImage()` — rasterizes a **live, interactive** element straight into a 2D context. Real fonts, real inputs, real CSS.

The core API:

```html
<canvas layoutsubtree>
  <MyComponent />   <!-- live, interactive -->
</canvas>
```

```javascript
canvas.onpaint = () =>
  ctx.drawElementImage(component, 0, 0)

// it's a texture now — feed it to the GPU
material.map = new CanvasTexture(canvas)
```

Drawing DOM that looks like DOM is a parlor trick; the point is that once it's a texture, the whole GPU is yours. In the talk, this is how the deck's own title card became a particle field that dissolved into a galaxy — the slide was rendered with the very API it was demonstrating.

Here's the full helper module from the deck. Note how it's written to degrade: the flag is off by default, so when the API is missing it hand-draws a faithful copy of the card with plain Canvas 2D:

```javascript
/**
 * html-in-canvas (WICG) helpers — https://github.com/WICG/html-in-canvas
 *
 * The new `CanvasRenderingContext2D.drawElementImage(element, …)` rasterizes a
 * LIVE DOM element (the element must be a child of a `<canvas layoutsubtree>`)
 * into the 2D context — real fonts, form controls, CSS, all of it. Pair that
 * canvas with a THREE.CanvasTexture and your actual component becomes a texture
 * in the WebGL scene: it blooms, and a planet can occlude it. A drei <Html>
 * overlay — what this whole deck floats over — can do neither.
 *
 * Ships in Chrome 148+ behind chrome://flags/#canvas-draw-element (origin trial
 * 148–150). It is OFF by default, so everything here is written to degrade: when
 * the API is missing we hand-draw a faithful copy of the card with plain Canvas
 * 2D (`drawTalkCardFallback`). That keeps the demo alive on a flag-off projector
 * and lets us author it locally — same move StreamDemo makes for declarative
 * streaming. On stage, flip the flag and the 3D panel renders the genuine DOM.
 */

export const HTML_IN_CANVAS_FLAG = "chrome://flags/#canvas-draw-element";

/** True only when the real drawElementImage API is present (flag enabled). */
export const HTML_IN_CANVAS_SUPPORTED =
    typeof CanvasRenderingContext2D !== "undefined" &&
    typeof CanvasRenderingContext2D.prototype.drawElementImage === "function";

/**
 * Rasterize a live element into a 2D context with the real API. `el` MUST be a
 * descendant of a `<canvas layoutsubtree>` (typically the very canvas we draw
 * into). Returns true on success; false if the API threw or is unavailable, so
 * callers can fall back without a black frame.
 */
export function paintElement(ctx, el, w, h) {
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

And the full demo component — a live card you type into on the left, and that same card as a GPU texture made of particles on the right, with a slider that scatters it into space:

```jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { CodeBlock } from '../../ui/CodeBlock.jsx'
import { DissolveCard } from '../../scene/DissolveCard.jsx'
import {
  HTML_IN_CANVAS_SUPPORTED,
  drawTalkCardFallback,
} from '../../lib/htmlInCanvas.js'

/**
 * html-in-canvas, on the flat card — the SETUP, now with the actual payoff.
 *
 * LEFT: a real, live, interactive component — type in it, pick a theme.
 * RIGHT: that component drawn into a <canvas> via `drawElementImage`, then handed
 * to the GPU. Drag the slider and every pixel becomes a star that scatters into
 * space (DissolveCard). Drawing DOM that looks like DOM is a parlor trick; the
 * point is that once it's a texture, the whole GPU is yours. The 3D reveal next
 * does it in the universe itself.
 *
 * The texture is hand-drawn here (like StreamDemo simulates) so it works with the
 * flag off and authors locally; the CODE is the genuine API, and the 3D reveal
 * (HtmlPanel) uses the real drawElementImage when the flag is on.
 */
const THEMES = ['Aurora', 'Sentry', 'Syntax', 'Graffiti']

const CODE = `<canvas layoutsubtree>
  <MyComponent />   <!-- live, interactive -->
</canvas>

canvas.onpaint = () =>
  ctx.drawElementImage(component, 0, 0)

// it's a texture now — feed it to the GPU
material.map = new CanvasTexture(canvas)`

const TEX_W = 1024
const TEX_H = 640
const CARD_W = 9.2
const CARD_H = CARD_W * (TEX_H / TEX_W)

function readAccent(el) {
  const v = getComputedStyle(el).getPropertyValue('--accent').trim()
  return v.startsWith('#') ? v : '#f5d0fe'
}

export function HtmlInCanvasDemo() {
  const [text, setText] = useState('Hello from the DOM')
  const [theme, setTheme] = useState('Aurora')
  const [dissolve, setDissolve] = useState(0)
  const wrapRef = useRef(null)
  const dissolveRef = useRef(0)
  const live = useRef({ text, theme })
  live.current = { text, theme }
  dissolveRef.current = dissolve / 100

  // One CanvasTexture, backed by an offscreen 2D canvas we redraw from state.
  const texture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = TEX_W
    c.height = TEX_H
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.minFilter = THREE.LinearFilter
    t.magFilter = THREE.LinearFilter
    t.generateMipmaps = false
    return t
  }, [])

  useEffect(() => {
    const canvas = texture.image
    const ctx = canvas.getContext('2d')
    const accent = readAccent(wrapRef.current)
    let raf = 0
    const t0 = performance.now()
    const tick = (now) => {
      drawTalkCardFallback(ctx, TEX_W, TEX_H, {
        accent,
        text: live.current.text || ' ',
        theme: live.current.theme,
        time: (now - t0) / 1000,
      })
      texture.needsUpdate = true
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      texture.dispose()
    }
  }, [texture])

  return (
    <div className="hic" ref={wrapRef}>
      {/* LEFT — the real, interactive component */}
      <section className="hic-live">
        <span className="hic-eyebrow">Bleeding edge</span>
        <div className="hic-title">This Component Could Have Been A Div</div>
        <label className="hic-field">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Card text"
            spellCheck={false}
          />
        </label>
        <select
          className="hic-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          aria-label="Theme"
        >
          {THEMES.map((th) => (
            <option key={th} value={th}>
              {th}
            </option>
          ))}
        </select>
      </section>

      {/* RIGHT — the same component, now a GPU texture made of stars */}
      <section className="hic-stage">
        <div className="hic-canvas3d">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0, 10.5], fov: 50 }}
            gl={{ antialias: true }}
          >
            <color attach="background" args={['#050710']} />
            <DissolveCard
              texture={texture}
              width={CARD_W}
              height={CARD_H}
              cols={176}
              rows={110}
              spread={9}
              size={2.2}
              intensity={0.7}
              dissolveRef={dissolveRef}
            />
            <EffectComposer>
              <Bloom
                intensity={0.5}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.7}
                mipmapBlur
                radius={0.6}
              />
            </EffectComposer>
          </Canvas>
        </div>
        <div className="hic-scrub">
          <span>Solid</span>
          <input
            className="hic-range"
            type="range"
            min="0"
            max="100"
            value={dissolve}
            onChange={(e) => setDissolve(+e.target.value)}
            aria-label="Dissolve into space"
          />
          <span>Scatter&nbsp;into&nbsp;space</span>
        </div>
        <CodeBlock>{CODE}</CodeBlock>
        <p className="hic-compat">
          {HTML_IN_CANVAS_SUPPORTED
            ? 'Live · Chrome 148 · drawElementImage'
            : 'Chrome 148 · drawElementImage · experimental flag'}
        </p>
      </section>
    </div>
  )
}
```

The `drawTalkCardFallback` hand-drawn Canvas 2D fallback and the `DissolveCard` particle shader live in the repo — [`src/lib/htmlInCanvas.js`](https://github.com/stolinski/react-summit-talk-2026/blob/main/src/lib/htmlInCanvas.js) and [`src/scene/DissolveCard.jsx`](https://github.com/stolinski/react-summit-talk-2026/blob/main/src/scene/DissolveCard.jsx) — they're three.js scenery rather than platform demos, but they're worth a read if you want the full picture.

```css
/* html-in-canvas (the finale's setup): a live interactive card (left) rasterized
   into a <canvas> via drawElementImage (right). Type on the left → the pixels on
   the right update. The right panel is JS-simulated (hand-drawn) so it works with
   the flag off; the code shown is the genuine API. See HtmlInCanvasDemo. */
.hic {
    display: grid;
    grid-template-columns: 1fr 1.06fr;
    align-items: stretch;
    gap: 30px;
    width: 1120px;
    max-width: 100%;
}
.hic-live {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    padding: 30px 30px;
    border-radius: 22px;
    border: 1px solid color-mix(in srgb, var(--accent) 42%, transparent);
    background: linear-gradient(
        180deg,
        color-mix(in srgb, var(--accent) 10%, rgba(10, 13, 22, 0.96)),
        rgba(8, 11, 20, 0.96) 46%
    );
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 24px 60px -28px color-mix(in srgb, var(--accent) 50%, transparent);
}
.hic-eyebrow {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--accent);
}
.hic-title {
    font-family: "Newake", ui-sans-serif, system-ui, sans-serif;
    font-size: 1.7rem;
    line-height: 1.06;
    font-weight: 800;
    color: #f8fafc;
}
.hic-field input {
    width: 100%;
    padding: 13px 16px;
    border-radius: 13px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.05);
    color: #e8eefc;
    font-size: 1.15rem;
    font-family: inherit;
}
.hic-field input:focus-visible {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 45%, transparent);
}
.hic-controls {
    display: flex;
    align-items: center;
    gap: 14px;
}
.hic-select {
    flex: 0 0 auto;
    padding: 11px 14px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: #0b1020;
    color: #e8eefc;
    font: inherit;
    font-size: 1.05rem;
    cursor: pointer;
}
.hic-range {
    flex: 1;
    accent-color: var(--accent);
    cursor: pointer;
}
.hic-stage {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
}
/* The embedded WebGL canvas where the component dissolves into stars. */
.hic-canvas3d {
    position: relative;
    width: 100%;
    aspect-ratio: 1.6;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: #050710;
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.06),
        0 18px 44px -20px color-mix(in srgb, var(--accent) 55%, transparent);
}
/* R3F mounts a <canvas> here; override the global full-bleed `canvas` rule so it
   fills this box instead of the viewport. */
.hic-canvas3d canvas {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
}
.hic-scrub {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 0.92rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--accent) 75%, #cbd5e1);
}
.hic-stage .code {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
}
.hic-compat {
    margin: 0;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: center;
    color: color-mix(in srgb, var(--accent) 70%, #cbd5e1);
}
```

### Proof it scales: Graffiti

The credibility payoff capping the tour: none of this is toys. [Graffiti](https://graffiti-ui.com/) is my platform-only component library — HTML and CSS, no JS framework required — built entirely on the techniques above. In the talk it was embedded live, full screen, inside a faux desktop browser frame (which is itself just an `<iframe>` dressed up):

```jsx
/**
 * A live site embedded full-bleed inside a faux browser window — the credibility
 * payoff: "this isn't toys, here's a whole real library." It's just an <iframe>,
 * but dressed as a desktop browser (traffic lights + URL pill) so it reads as a
 * real product, not a demo. Sized large and at a desktop width so the embedded
 * site renders its DESKTOP layout (no mobile breakpoint) and the room can read it.
 *
 * Used on a `bare: true` slide so it plays on the stage with no card around it.
 */
const SITE = 'https://graffiti-ui.com/'
const LABEL = 'graffiti-ui.com'

export function SiteFrameDemo() {
  return (
    <div className="siteframe">
      <div className="siteframe-bar">
        <span className="siteframe-dots" aria-hidden="true">
          <i style={{ background: '#ff5f57' }} />
          <i style={{ background: '#febc2e' }} />
          <i style={{ background: '#28c840' }} />
        </span>
        <span className="siteframe-url">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 0 1 6 0v3Z"
            />
          </svg>
          {LABEL}
        </span>
      </div>
      <iframe
        className="siteframe-frame"
        src={SITE}
        title="Graffiti — a platform-only UI library"
        loading="eager"
      />
    </div>
  )
}
```

```css
/* Faux desktop browser window around an embedded live site. Big and at a desktop
   width so the site renders its DESKTOP layout (no mobile breakpoint). */
.siteframe {
    width: 1680px;
    height: 912px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 18px;
    overflow: hidden;
    background: #0b0e16;
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.08),
        0 50px 120px -30px rgba(0, 0, 0, 0.8),
        0 0 0 1px rgba(255, 255, 255, 0.03),
        /* accent halo so it sits in the scene, not on top of it */
        0 30px 110px -40px color-mix(in srgb, var(--accent) 60%, transparent);
}
.siteframe-bar {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 18px;
    height: 52px;
    padding: 0 20px;
    background: linear-gradient(180deg, #161b27, #0e121c);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.siteframe-dots {
    display: flex;
    gap: 9px;
}
.siteframe-dots i {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    display: block;
}
.siteframe-url {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 18px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #cbd5e1;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.01em;
}
.siteframe-url svg {
    color: #34d399;
}
.siteframe-frame {
    flex: 1;
    width: 100%;
    border: 0;
    background: #fff;
    display: block;
}
```

## The close: your agents can write this too

The reason this all matters more than ever: agents write a huge share of UI code now, and left to their average, they default to div soup plus a dependency. Your platform knowledge is the ceiling on what they ship.

### The same menu, two supply chains

Every import is a trust decision. The talk put two ways to get the exact same dropdown side by side:

```jsx
/**
 * Two ways to get the same dropdown — framed as two supply chains.
 *
 * Left: the install. One package drags in its dependency tree; all of it is
 * code you didn't write, shipped to every user, with its own update churn and
 * attack surface. Right: the platform. The anchor-positioning CSS we already
 * use elsewhere in this deck — zero packages, nothing to trust, nothing to pin.
 *
 * The package tree is real (Floating UI pulls react-dom → dom → core → utils);
 * the figures are illustrative.
 */
const TREE = [
  ['@floating-ui/react', 0],
  ['@floating-ui/react-dom', 1],
  ['@floating-ui/dom', 2],
  ['@floating-ui/core', 3],
  ['@floating-ui/utils', 4],
]

export function DependencyContrastDemo() {
  return (
    <div className="dep">
      <section className="dep-col dep-col--lib">
        <h3 className="dep-head">The usual way</h3>
        <code className="dep-cmd">$ npm i @floating-ui/react</code>
        <ul className="dep-tree">
          {TREE.map(([name, depth]) => (
            <li key={name} style={{ '--depth': depth }}>
              {name}
            </li>
          ))}
        </ul>
        <p className="dep-foot dep-foot--bad">
          5 packages you didn’t write — shipped to every user, forever yours to
          patch
        </p>
      </section>

      <div className="dep-vs">vs</div>

      <section className="dep-col dep-col--web">
        <h3 className="dep-head">The platform</h3>
        <pre className="dep-code">{`.menu {
  position-anchor: --btn;
  position-try-fallbacks: flip-block;
}`}</pre>
        <p className="dep-foot dep-foot--good">
          0 packages · 0 kB shipped · audited by the browser vendors
        </p>
      </section>
    </div>
  )
}
```

```css
.dep {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 26px;
}
.dep-col {
    align-self: stretch;
    padding: 24px 26px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #0b1020;
}
.dep-col--lib {
    border-color: rgba(248, 113, 113, 0.35);
    background: linear-gradient(180deg, rgba(248, 113, 113, 0.08), #0b1020 60%);
}
.dep-col--web {
    border-color: rgba(56, 189, 248, 0.4);
    background: linear-gradient(180deg, rgba(56, 189, 248, 0.08), #0b1020 60%);
}
.dep-head {
    margin: 0 0 16px;
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #cbd5e1;
}
.dep-cmd {
    display: block;
    margin-bottom: 16px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 1.1rem;
    color: #f8fafc;
}
.dep-tree {
    margin: 0 0 18px;
    padding: 0;
    list-style: none;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 1.05rem;
    color: #94a3b8;
}
.dep-tree li {
    padding: 4px 0;
    padding-left: calc(var(--depth) * 22px);
}
.dep-tree li::before {
    content: "└─ ";
    color: #64748b;
}
.dep-tree li:first-child {
    color: #e2e8f0;
}
.dep-tree li:first-child::before {
    content: "";
}
.dep-code {
    margin: 0 0 18px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 1.1rem;
    line-height: 1.5;
    color: #7dd3fc;
    white-space: pre;
}
.dep-foot {
    margin: 0;
    font-size: 1rem;
    line-height: 1.4;
}
.dep-foot--bad {
    color: #fca5a5;
}
.dep-foot--good {
    color: #7ee7c7;
}
.dep-vs {
    font-size: 1.3rem;
    font-weight: 700;
    color: #64748b;
}
```

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
