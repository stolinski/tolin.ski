---
title: If You're Building Agents, Make Them Durable
date: '2026-10-15'
tags:
  - agents
  - ai
  - javascript
category: posts
status: LIVE
---

**Try it on your own agent.** Paste this into your coding agent from your project:

```text
Read the Pi Durable README and every example in
https://github.com/earendil-works/pi/tree/main/packages/durable
(the examples are in test/examples).

Then look at how this project runs its agents and tell me what I'd gain
by moving to Pi Durable:
- Which code it would replace: message storage, queues, streaming to the UI,
  steering mid-run, approvals, retries, summarizing old messages, keeping
  app state in sync with what the agent did.
- What happens today when the process crashes mid-task, and what would
  happen with Pi Durable. Which of my tools are safe to run twice, and
  which aren't.
- What the move would take, step by step, and what's risky about it.

Point to the example that backs up each claim. Don't change any code.
```

<iframe class="youtube" width="100%" src="https://www.youtube.com/embed/BLRReTwV8Fc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Last night, my code fixed itself.

An error landed in Sentry. An agent picked it up, worked out the root cause, wrote a fix, ran the tests, and opened a pull request. Nobody typed anything to start it.

That agent runs on a library called **Pi Durable**, and so does a lot of other stuff I'm excited about:

- An agent that runs entirely in the browser, on IndexedDB and JavaScript, with no server.
- An agent that runs directly on an Android phone.
- An agent that starts work on my real-life to-dos without me asking, running on SQLite and Node.

I think this is how you should be building agents of any kind, so let me show you why.

## How we use agents today

Think about how you use an agent right now. You start it, and you watch it. Maybe it stalls. Maybe you notice. Maybe you stopped the process, and now you have to go back in and type, "Keep going. You can do it."

(I've heard you're not supposed to be mean to Claude anymore, so I've switched to positive reinforcement.)

Sometimes when things fail, it runs something twice, or goes back and redoes work. Maybe your laptop sleeps and the session dies. And that's all fine, because you're sitting right there, typing, going back and forth. You get distracted, come back, notice it died, and get it going again.

For a lot of tasks, that's no big deal. But two things are changing.

### Agents run longer, and do more

Agentic tasks and workflows are running longer than ever, and they're doing more. They open pull requests. They send emails. Maybe they check your bank account so they can share it in the company Slack. (I'm not doing that. But someone is.)

And if you're building agents into apps, they need to be long-running, and they need to keep working even after they crash.

### Agents start themselves

Agents are also starting on their own more and more. Some action, automation, or trigger kicks one off, and it gets to work on several steps. People do this all the time with automations in Claude Code, cron jobs that pick up a task, or webhooks.

So a webhook hits your agent, it starts some work, and it crashes. How does it pick that work back up? You have to go in and check: did anything break overnight when that webhook hit?

If an agent is going to run for an hour, start on its own, and do things that can't happen twice, it needs to be **durable**. It needs to keep working. It needs to be resumable. It needs to know exactly which step it was on, so it doesn't repeat steps.

What if your agent sends an email, and then the whole process starts over? Now you've sent two emails. Or two pull requests. Who knows what. This is where durable agents really shine.

## The plumbing everyone writes

If you've ever put an agent into an app (a support bot, an assistant, a Slack bot, an internal tool), you've probably written a lot of the same code. I feel like I've written all of these at some point:

- A table to save messages.
- A queue for work to get done.
- A socket that streams to the UI.
- Something for when the user prompts in the middle, so you can steer, or fork the conversation.
- A way to pause for approval and pick it back up.
- Retries for things that should be repeated, and not for things that shouldn't.
- Summaries of old messages.
- App state kept in sync with what the agent actually did.

That's a lot of connective tissue, and when it fails, it's super annoying to debug. There's a lot of stopping and starting. And right now, a lot of people are hand-writing their own version of all of this.

My own agent app, Prompt Boy, was built on a custom agent setup like that. Honestly, it was a pain. It took a long time, and it was super brittle. So when Pi Durable came out, I made the jump. The move added 1,919 lines and deleted 7,983 (tests included), and I got a much better system basically for free.

## Pi Durable

If you haven't heard of Pi, it's an awesome, extendable agent harness from [Earendil](https://github.com/earendil-works/pi). It powers things like OpenClaw and a ton of developers' agentic coding setups, mine included. I've been using Pi for a long time, both a minimal setup and a custom one. I like tweaking it, I like not tweaking it, I just like using Pi.

So it's no surprise that Pi Durable is really cool too. It's a library from the same team for building your own durable agents. That could be a coding agent, a support bot, a Slack bot, whatever. Any agentic system you have, you can build on Pi Durable.

The way it works is pretty simple: Pi Durable saves everything into storage as it goes. Mine saves to a SQLite file. What was said, the tool call, what it's waiting on. If the process dies, a new one opens the file and keeps going. And anything I connect to it, whether that's my phone, my browser, or Slack, is looking at the exact same agent.

On top of that, every tool says whether it's safe to run again. A search is harmless to run twice, so you mark it safe (`replay: "safe"`), and after a crash it just reruns. Sending an email isn't, so instead the model is told the call was interrupted, and it checks before it sends anything.

Some things are safe to rerun and some aren't, and this gives you control over that. If the agent is interrupted at any point, it picks up where it left off without repeating things it shouldn't. A crash can never leave the agent claiming it did something your app doesn't show.

Here's roughly what it looks like:

```ts
const harness = await Harness.open(
  await openNodeSqliteStorage("./agent.sqlite"),
  { models, registry },
  context,
);
const chat = await harness.root(context);

// The request ID makes this exactly-once, even if the client retries.
await chat.submit(
  { type: "input", content: "Refund order 1234", requestId: "support:1234" },
  context,
);

// Any screen: where it is right now, then every change.
const view = await chat.viewState(context);
view.subscribe(render);
```

A database file, a conversation, a submit with an ID, and your tools are just plain functions. Super simple.

### Isn't this just chat history?

You might look at this and think, "I already have chat history. I open my agent, run `/resume`, and keep prompting." And sometimes that's totally fine, especially for coding.

But this is more than the text that goes in with your prompt. It's every tool call, every tool call the agent was about to make, an approval it's waiting on, whether the deploy already happened. Everything it did or didn't do is in that storage. So when you come back to a Pi Durable conversation, the work just picks up where it was. Or it already resumed and finished while you were gone.

That's the dream. Sometimes you just want things to work, and if they fail, pick back up.

### Why not a workflow engine?

You could reach for a workflow engine too. But workflow engines are usually tightly controlled steps. Here, the agent decides what to do next with the tools it has. That plays to the agent's strengths, instead of a rigid workflow that's versioned against the exact code it runs.

## What you get for free

Because it's all built this way, you get a bunch of great stuff without writing it yourself:

- **Every screen is a client.** Your phone, a terminal, your laptop. Any way you interact with a durable agent, you can jump into the middle of the process, steer it, and keep working on the exact same run with the exact same history.
- **Multiplayer comes free.** If people have access to the same agent, they can work on it together, even with more than one person steering at once.
- **You can change it while it runs.** Steering, forking, and subagents are all easy to build. You can even swap the model or take a tool away mid-conversation, and the next call just uses the new setup.
- **Waiting is just saved state.** Whether it's waiting on an approval or a timer, it's the same for everyone using it.

You might be thinking: durable agents, Durable Objects, this must be a Cloudflare thing. It's not. It runs anywhere JavaScript runs. Mine runs on Node on my Mac mini. It also runs on Bun, in a Durable Object, or in [celld](https://celld.dev), Deno's open-source daemon for running Durable Objects on your own machines. It ships with SQLite storage, and there's already a community Postgres backend.

And you can hook it up to any model you want, OpenAI or something local. If you're building an agent system, you're not locked into one provider's way of doing things.

## Code that fixes itself

Okay, now for the fun part: my self-healing setup.

A few weeks ago, I built a pretty naive version of this. Every six hours, a cron job checked Sentry for new issues, asked Sentry's Seer agent for the root cause, fixed the issue in a Git worktree, ran the checks, and put the fix straight onto main. It closed 43 Sentry issues that way.

It worked really well. It used all my local tools and my whole setup. But it broke occasionally, and when it did, I'd have unfinished worktrees sitting around on my computer. Or I wouldn't know it broke at all, because I didn't have proper alerts set up. I'd end up asking my agent, "Hey, how are the Sentry tasks going?"

If it died halfway through, I had to pick it up myself, or send another agent in to recover it. There was no resume, and definitely no automatic resume. If I wanted that, I'd have to build all of it myself. And a lot of the rules were just text in a prompt rather than an actual system.

My personal agent is built around to-dos: I create a to-do, put an agent on it, and it gets to work. It writes research docs, it codes, it does all kinds of stuff. Once I moved the whole thing to Pi Durable, self-healing fit in really nicely. Here's the flow:

```text
Sentry: a new issue
   │  signed webhook
   ▼
1  Cloudflare Tunnel: only Sentry's one path gets through to the Mac mini
   ▼
2  Prompt Boy's server: check the signature, store the issue once
   by its Sentry ID, answer right away
   ▼
3  Should it be a job? Find the project's checkout on this Mac, then the
   rules: a code error, in production, within the limits
   ▼
4  Pi Durable: a conversation, in its own Git worktree
   ▼
5  Agent asks Seer for the root cause
   ▼
6  Agent fixes it, adds a test, runs the project's tests, commits
   ▼
7  Push, then one pull request: "Fixes <issue>"
   ▼
   I merge ──▶ Sentry resolves the issue ──▶ the job's last step lights up
```

### It starts itself

I have a little test shop app with a bug in it (let's face it, I've got bugs). When I hit the bug, the error goes to Sentry, and Sentry sends a webhook through a Cloudflare Tunnel to my setup.

A few plain rules decide whether it's something to fix: it's a real code error, it happened in production, and it isn't one of my own smoke tests. If it passes, the agent gets to work. I didn't type anything to start it. The error in Sentry did.

### Stop it, then resume it

You can watch the job as it goes. First, it works out the root cause, straight from Seer. Then I stopped it, right in the middle.

By then it had finished the root cause analysis and started on the fix. The root cause was right there on the job: the cart total reads `item.discount.percent` unconditionally, but full-price items, like the link cable in the checkout cart, have no discount, so `discount` is undefined.

Then I hit resume, and it picked up exactly where it was. It went on to the fix, tested it, followed my normal flow, and opened a pull request.

### One pull request

The pull request shows up in GitHub with exactly what changed, the checks, and the commit. You can open the file and see exactly what it did. A nice, easy little fix.

I gave it a very thorough review (I did not) and clicked merge.

You don't have to go through pull requests, either. For software only my family and I use, I'm adding a mode that merges and deploys on its own. But for most things, this flow is what you want.

A minute or two after the merge, Sentry marks the issue resolved, and so does my system, so I get a full trail of exactly what happened.

### Talk to the agent that did the work

Because this is a whole agent run, I can always go back and message the agent that did the work, right in that flow, with the exact record of everything that happened. I'm not spinning up a new agent with fresh context and asking, "Hey, what happened? Why didn't this work?" or "I don't like this fix."

I can come back after a code review and say, "I don't like this," and keep building on the work inside the exact run that did it. (I don't have it wired up to take comments from GitHub yet.) And I have a log of every one of these jobs, so I can go back and chat with any of those agents too.

### It's not tied to one screen

I could have done this exact same thing from my phone. The agent lives on my Mac mini, and if it lived in the cloud, it'd live in the cloud. As long as you can connect to it, you can step in and do whatever you want.

And this is just one small demo. My whole system, documents, chats, to-dos, all of it, runs on Pi Durable agents on that machine. I can reference to-dos, documents, and errors, connect them together, and work from any device I have. It works so well, and it's way less buggy than anything I cobbled together myself.

### What I glossed over

I skipped a lot here: checks for whether something is real work the agent should do, whether the issue is on software I'm tracking in this setup, and guards that make sure one Sentry issue only ever gets one pull request, even if it comes in more than once. There's a ton of stuff there.

But that's not really the point. The point is how much you can do once your agents are durable.

## Everyone's heading here

It's not just me. A lot of people are now talking about durable agents.

[OpenCode 2](https://anoma.ly/notes/opencode-2-0/) just came out, and one of the big changes is that you can run it as a library, on a server or inside a Durable Object, and connect to it from any OpenCode client. Cloudflare's Agents SDK already has a harness that runs Pi Durable inside a Durable Object.

And again, it's not just a Cloudflare thing. Deno's celld runs Durable Objects on your own machines (which, funnily enough, makes it a Cloudflare thing now too, since Deno just joined Cloudflare).

Mario, who made Pi, built a multiplayer agent app on Pi Durable that runs directly on his Android phone. The model calls go out over the network, obviously, but the agent itself and Pi Durable run right on the phone. That's super sick. Next, I'm going to see if I can get an agent running entirely on a photo frame.

So if you're building agents, make them durable. You can write all of this yourself, or you can use Pi Durable and get it for free.

## Where to start

The [README](https://github.com/earendil-works/pi/tree/main/packages/durable) is a good place to start, but I'd argue the better place is the [examples folder](https://github.com/earendil-works/pi/tree/main/packages/durable/test/examples). It has everything: reload and restart, tool overrides, compaction, child tasks. I pointed an agent at that folder, and it did such a good job, because those are verifiable examples straight from the source that it can build off of.

If you already have an agent system, point your agent at those examples and ask what you'd gain from moving to Pi Durable. If you're building agents of any kind, I think it's worth a look.

I'm also experimenting with durable agents for creative labs and for the Syntax team's Slack bot. If you want to hear more about my personal agent, my setup, or self-healing software, let me know. It's a really cool system, and it keeps getting cooler.

Have you tried Pi Durable yet? I think it's sick.
