---
title: "SumUp and e-reporting: who reports your till takings in 2027?"
description: "SumUp isn't an approved platform and doesn't send your sales data to the tax office. Here's what that means for card sales with no invoice, and what I'm building to fill the gap."
date: 2026-09-28
slug: sumup-e-reporting-2027
readTime: 4 min read
---

Back in June I was running one of my IT support sessions at my local cafe and got chatting to the owners, who I know well. I'm building einvoicer, an e-invoicing platform for small French businesses, and they use SumUp as their card provider, so I asked the obvious question: what is SumUp doing about the e-invoicing reform? They didn't know, and neither did I, but we both assumed a payment provider that size would have something in place. So I started digging there and then. SumUp isn't handling it themselves. They're partnering with an approved platform, Indy. That struck me as a little strange, but on the face of it the problem is solved, even if it isn't a very flexible solution for their customers.

Since then I've spent a few months digging into what that actually means for the people using those little card readers, because there's a gap here that I don't think many merchants know about yet. Especially if, like a lot of us running businesses out here, French is your second language and most of what's written about the reform is in French.

First, the short version of the reform. Since 1 September 2026, every business in France has to be able to receive electronic invoices through an approved platform, a plateforme agréée (PA). From 1 September 2027, small businesses and micro-entreprises also have to start sending their invoices electronically, and at the same time a second obligation kicks in that gets far less attention: e-reporting.

E-invoicing covers sales between businesses. E-reporting covers everything else, and the big one for a lot of small traders is sales to the public. If you run a cafe, a market stall or a small shop, most of your sales don't have an invoice at all. Someone taps their card, gets a receipt, and walks off with a coffee. From September 2027 the tax office wants to know about those sales too, sent through a PA as structured data, with your takings broken down by VAT rate, on a regular schedule that depends on your VAT regime.

So where does SumUp sit in all this? As of September 2026, SumUp is not a PA and hasn't announced plans to become one. Its invoicing tool, SumUp Factures, produces ordinary PDF invoices rather than the structured Factur-X format the reform requires, and SumUp doesn't send your sales data to the tax office. You can keep using the card reader, nothing changes there, but the reporting has to happen somewhere else.

As mentioned above, the somewhere else SumUp points people towards is mainly Indy, and to be fair to Indy, it's a solid option. It's a registered PA, and e-reporting is included in its free plan. For invoices you create in Indy, the reporting happens automatically.

The bit that caught my attention is what happens to the card sales that never had an invoice. As far as I could find, Indy doesn't connect directly to SumUp. Their shopkeeper pages talk about entering your daily till totals, your tickets Z, by hand, alongside a bank feed. The direct integrations Indy lists are Stripe, Shopify, Amazon and PayPal. SumUp isn't one of them.

That matters more than it sounds. A bank feed shows you the lump sum SumUp pays into your account, minus fees. It doesn't show you how much of that was sold at 5.5%, 10% or 20% VAT, which is exactly the breakdown e-reporting needs. So you're either typing your till totals in every day, or someone is working it out later from paperwork. For a busy cafe owner, that's one more job at the end of a long day, every day, forever.

The frustrating part is that the data already exists. SumUp has a proper API, and provided you've set VAT rates on your products in the SumUp app, every sale that goes through it carries the VAT breakdown by rate. It's sitting there. It just isn't being sent anywhere.

That's the piece I'm building into einvoicer. The idea is simple: you connect your SumUp account once, einvoicer pulls your transactions in automatically, groups them by VAT rate, and submits the e-reporting to the tax office through our approved platform partner. No daily totals to type in, no separate app to remember.

I'm not writing this to tell anyone Indy is wrong for them. If you already issue most of your sales as invoices, it may be all you need. But if you take a lot of card payments for small everyday sales, and SumUp has sent you off to set up another platform, it's worth asking a simple question before you commit: how are my till takings going to get reported? If the answer is "I type them in", there's a better way coming.

A year sounds like plenty of time, but September 2027 will come around quickly, and the businesses that sort this out early are the ones that won't be scrambling in August. If you're a SumUp user and want to be one of the first to try the automatic connection, get in touch. I'm happy to answer questions either way.

*Andrew Watts, builder of einvoicer, based in Nouvelle-Aquitaine, France.*
