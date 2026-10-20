---
title: Something Kept Stealing My AirPods. Here's How I Caught It.
date: '2026-10-20'
tags:
  - apple
  - debugging
  - ai
category: posts
status: LIVE
---

I'd be listening to a podcast on my phone, and my AirPods would just drop. No banner, no warning. The podcast would keep going out of my phone speaker, or just stop. A few seconds later, sometimes a few minutes, they'd come back.

Something was taking my AirPods, and I had no idea what. So I went digging through my iPhone's logs, and the logs told me exactly which device it was, down to the second.

<!-- excerpt -->

## 1. Turn on Bluetooth logging on your iPhone

You need to do this part first, whether you do the rest yourself or hand it to an AI.

Your iPhone already keeps logs, but by default they're pretty thin on Bluetooth, and the device addresses are hidden. Apple has a free Bluetooth logging profile that turns on the detailed version.

On your iPhone, go to [Apple's Profiles and Logs page](https://developer.apple.com/bug-reporting/profiles-and-logs/), find **Bluetooth** for iOS, and install the profile. You sign in with your normal Apple Account. You don't need a paid developer account.

Then just use your phone like normal and wait for it to happen. The logging runs in the background the whole time, so you don't have to catch it in the act. Just jot down roughly when it happened.

The profile expires on its own after a while, and you can remove it any time in **Settings → General → VPN & Device Management**.

**Want your AI agent to do the rest?** Once the profile is installed and your AirPods have dropped again, plug your iPhone into your Mac and paste this into Claude Code, Codex, Pi, or whatever you use:

```text
My AirPods keep randomly disconnecting from my iPhone, and I want to find
out which device is taking them. My iPhone is plugged into this Mac and
has Apple's Bluetooth logging profile installed. The drops happened at
roughly these times: [TIMES].

1. Pull the iPhone's logs: sudo log collect --device --output ~/iphone.logarchive
   (I'll type my password).
2. In that archive, look at the audioaccessoryd process. Find
   "Updating Wx ownership <AirPods address> yes -> no". That's the moment
   the iPhone lost the AirPods. In the same instant, there's a
   "TipiTableEvent" line with "IsMe no" and "Ownership yes". Its
   TipiDevice is the Bluetooth address of the device that took them.
3. List every takeover with its time and the address that took it, and
   check the times against mine.
4. Check whether that address belongs to this Mac
   (system_profiler SPBluetoothDataType) or any Mac I can SSH into.
5. Tell me where to look up the Bluetooth address on my other devices
   so I can match it.

Only read logs. Don't change any settings.
```

Or do it yourself. It's two more steps.

## 2. Pull the logs onto your Mac

The same day it happens, plug your iPhone into your Mac with a cable, unlock it, and tap **Trust** if it asks. Then, in Terminal:

```bash
sudo log collect --device --output ~/iphone.logarchive
```

It takes a few minutes and looks stuck the whole time. Let it finish. You'll end up with a few gigabytes of logs.

## 3. Find the thief

AirPods can be connected to more than one of your Apple devices at once, but only one of them "owns" the audio. When another device takes ownership, your iPhone logs it, and right next to that it logs a table of every device connected to the AirPods. The one that isn't your phone (`IsMe no`) and now has ownership (`Ownership yes`) is the thief.

This pulls out just those lines:

```bash
log show ~/iphone.logarchive --info --style compact \
  --predicate 'process == "audioaccessoryd" AND (eventMessage CONTAINS "Updating Wx ownership" OR eventMessage CONTAINS "TipiTableEvent: Wx")' \
  | grep -E "yes -> no|IsMe no.*Ownership yes" | grep -A1 "yes -> no"
```

Each `yes -> no` line is a moment your iPhone lost the AirPods. The line right under it names the device that took them. Here's what mine said, trimmed down:

```text
13:32:02.432 Updating Wx ownership 74:77:86:7C:CE:50 yes -> no
13:32:02.432 TipiTableEvent: Wx 74:77:86:7C:CE:50 TipiDevice 94:0B:CD:84:24:9D ... IsMe no ... Ownership yes
--
13:35:20.990 Updating Wx ownership 74:77:86:7C:CE:50 yes -> no
13:35:20.991 TipiTableEvent: Wx 74:77:86:7C:CE:50 TipiDevice 94:0B:CD:84:24:9D ... IsMe no ... Ownership yes
--
13:38:18.839 Updating Wx ownership 74:77:86:7C:CE:50 yes -> no
13:38:18.839 TipiTableEvent: Wx 74:77:86:7C:CE:50 TipiDevice 94:0B:CD:84:24:9D ... IsMe no ... Ownership yes
```

`74:77:86:7C:CE:50` is my AirPods. `94:0B:CD:84:24:9D` is the thief. Those times lined up exactly with the drops I'd noticed. One device, three times in six minutes.

Right after, the iPhone logged the request as a `FakeHijack`, decided it `should not route`... and let it happen anyway. That's also why there was never a "Moved to…" banner. As far as the phone was concerned, the AirPods were still connected the whole time. It just wasn't the one playing through them anymore.

## Match the address to a device

Now you have a Bluetooth address, and you just need to find the device that has it:

- **Apple Watch, iPhone, iPad, Vision Pro:** Settings → General → About → Bluetooth
- **Mac:** System Information → Bluetooth, or `system_profiler SPBluetoothDataType | grep -m1 Address`

Mine was my **Apple Watch**. It wasn't even on my wrist or being used, and it was sitting in another room.

No more guessing. The logs know exactly what took your AirPods. You just have to ask.
