---
title: Utility Sprinkles ✨
date: '2024-07-26'
tags:
  - css
  - utility-css
category: posts
status: LIVE
---

Utility CSS has been around forever, but more recently people have been using utilities for everything. What if we sprinkled utilities instead of only using them.

<!-- excerpt -->

## Atomic and Utility CSS

Note: This post will not be covering every little nuance of this discussion.

When I first started CSS, there was a sense of just sprinkling classes all over until you had a massive rats nest of redundant, overlapping and non-optimized classes that are tightly coupled to the thing they are styling. We were all looking for a better way, which is why many people landed on things like BEM (Block Element Modifier) where you had a system to organize your classes. While BEM, OOCSS and the like were extremely popular, there were always other strategies as well.

In 2013, Thierry Koblenz coined the term Atomic CSS to refer to css that uses small atoms to define styles. This could be something like, `.bg-red { background-color: red; }`. This gave you a system of pre-defined properties that you could apply to anything by combining a ton of classes instead of a single class with many properties.

At this time the term "Utility CSS" was reserved for things that were actually considered utilities like `.visually-hidden` or even the classic `.clearfix`. At the same time, grid systems were all the rage and adding a host of utility layout grid classes gave you the layout grid of your dreams with little effort.

In that regard, you would ✨sprinkle✨ utility classes throughout your CSS when you needed them instead of writing your entire app with a ton of atomic classes.

## Enter Components

After Angular hit the scene and then React after, developers started to think almost entirely in a component based mindset. You could argue that partials before this were also "components" but in JS Framework land, the component was often being critised initially for not separating concerns. This wasn't universal or anything, but there was a shift in what a single unit of a website actually did and that became the component. 

Components allow you to wrap up a handful of things into a nice little composable and reusable package, this includes often times the CSS. Regardless of how you chose to write your CSS to this component, there were a ton of different solutions for scoping your CSS to a component. At first many people were still just writing global CSS, but tons of people picked up CSS in JS just to solve the scoping problem. 

One massively popular solution to solve having a re-usable system while scoping those styles was with the emergence of utility first or sometimes only CSS, where you apply tons of classes to html instead of writing traditional CSS. This gives you a system to standardize on, an easy way to make things look nice, and an interface to accomplish most things you'd want to do with CSS. Like a modern version of Bootstrap, this gave you nice looking apps with less pain. Unlike Bootstrap, it didn't completely take over your styling in a way that made every website look the same as Bootstrap was much more macro in the properties applied rather than atomic.

## Ok, get to the point

My biggest beefs with utility only CSS are the following, feel free to disagree, I don't mind.

### Wet code

You end up writing the same classes over and over, many times adding 5+ classes to every html element.

### Subset of CSS

Some things are just hard to do with only classes and because of that you don't get all of CSS by only using utilities. 

### You have to know a DSL

Most utility based CSS uses a system of shorthand properties for their classnames. This is something you have to learn on top of CSS.

## How Sprinkles Fixes This

My favorite way to write CSS is to direclty scope to the component. As in, no CSS written inside that component leaks outside.

### What about a system?

I use CSS vaiables for nearly all values, specifically color, font-size, colors ect but base most spacing things on 1rem. This allows you to do things like 0.5rem, 1rem, 2rem to get standardized spacing without much thought. This strategy gives you a full system to standarize your app on.

If you want something pre-made, https://open-props.style/ is an incredible choice.

### The Sprinkles

Now, here is where I sprinkle in my utilities. I keep utilities reserved for my global CSS as actual utilities. Things like .h1 .small, .center, .grid ect. 

This gives me the ability to customize excatly what my utilties are. I can have my own custmoized grid wrapped up into a single .grid instead of using several classes to accomplish a more generic grid.

So how exactly does this solve the problems with utility first or only CSS?

### Wet code

You encapsulate your re-usable code under classes the way that we did it in the past. We don't need things like BEM for scoping since the CSS is scoped directly to that component.

### Subset of CSS

You are primarily writing CSS, you don't have to re-invent the wheel by just using classes.

### You have to know a DSL

You write your own utilities or use someone elses, but since you aren't trying to re-create CSS properties directly with classes, the classes you have in your CSS are your own instead of having a system.

## If you disagree with this

Like Eminem in 8 Mile, I've had enough people argue with me about Utility first CSS that I know all of the pros for it and many of those pros are very good. But, I still don't prefer it for many reasons, some of which are outline in this post. I wrote this to let people know that you can use utility sprinkles while writing CSS and get the best of both worlds. 

Also, as I mentioned off the jump, this post isn't getting into all of the nuance this discussion requires, so don't @ me about it.active

- Scott