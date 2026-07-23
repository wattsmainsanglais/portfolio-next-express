---
title: The Bug That Only Shows Up on Touch-Screen Laptops
description: A hover-only dropdown menu that worked everywhere except one specific kind of device, and what it taught me about CSS media queries.
date: 2026-07-23
slug: touch-screen-laptop-nav-bug
readTime: 3 min read
---

I launched a site a few days ago for a client who runs an animal communication and holistic wellbeing practice. Fully bilingual, English and French, built from scratch, tested on my phone, tested on a tablet, tested on my desktop with a mouse. Everything worked. Then she messaged me. The menu wouldn't open. Not on her phone, she said. Just on her laptop.

That sentence alone should have told me something was odd, because a laptop should be the easiest device to get right. It's not a phone with a tiny screen, it's not a tablet you're guessing about, it's just a browser with a mouse or trackpad like the one I build everything on. So my first thought was that she meant her phone after all, or that she'd cleared cache wrong, or something equally boring. I asked her to send a screen recording.

She had a touch screen laptop. One of those Windows convertibles you can tap directly on the display, but she was also using the trackpad most of the time like anyone would. And that's where it went wrong.

The dropdown menus on the site only opened on hover, a fairly normal choice for a desktop nav. To decide whether to show a hover menu or a tap-friendly one, I'd used a CSS media query that checks the type of pointer a device has, pointer: fine for a mouse or trackpad, pointer: coarse for a finger on a touchscreen. It's the standard way to tell the two apart without guessing from screen width, which breaks constantly on tablets and now, apparently, laptops too.

The problem is a touch screen laptop reports pointer: fine, because it has a trackpad, even though the person using it might be tapping the screen directly half the time. The browser has no way of knowing which input she actually used in that moment. So my hover menu correctly identified her device as having a precise pointer and never considered that she might tap the screen with a finger instead of clicking with the trackpad.

The fix was simple once I understood it. Stop relying on hover to open the menu at all. Make it open on click or tap instead, and let hover be a bonus for mouse users rather than the only way in. It took about twenty minutes to change once I knew what was actually happening, which is usually how these things go. The hard part isn't the fix, it's realising that a device you'd never think to test on exists and behaves differently to what the spec assumes.

If you're building anything with a hover menu, it's worth asking yourself the same question I should have asked earlier. Are you assuming mouse or touch based on the device type, or are you actually handling both regardless of what the browser tells you it thinks it has? Touch screen laptops aren't rare. I just hadn't built for one before.

*Andrew Watts, web developer based in Nouvelle-Aquitaine, France.*
