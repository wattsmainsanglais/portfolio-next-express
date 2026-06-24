---
title: "Factur-X explained: what it is, how it works, and what building it taught me"
description: A practical look at France's mandatory electronic invoice format - what Factur-X is, how the hybrid PDF/XML format works, and what implementing it actually involves.
date: 2026-06-24
slug: facturx-explained
readTime: 4 min read
---

France is mandating structured electronic invoicing for all businesses from September 2026. If you're building anything that touches invoicing for French or European clients, you're going to need to know about Factur-X. Here's what it actually is, because there's a lot of confusion around it.

Factur-X is a hybrid invoice format. On the surface it looks like a normal PDF, something you can open, read and print like any other document. But embedded inside the PDF file is a structured XML document containing all the same invoice data in machine-readable form. The format is built on PDF/A-3, which is an ISO standard for archival PDFs, and the XML follows the Cross Industry Invoice (CII) schema.

The PDF part is for humans. The XML part is for machines. Both live in the same file, which is what makes it a hybrid.

This is actually a clever solution to a real problem. An invoice needs to be sent once and handled differently depending on who receives it. A small supplier with no automation can open the PDF and read it. A large organisation with accounting software can extract the XML and process it directly. You don't need two separate files or two separate workflows, one file does both jobs.

Factur-X comes in several profiles, each one requiring a different amount of data in the XML. The MINIMUM profile requires almost nothing, just identifiers and totals. The EN16931 profile follows the European standard and requires a full breakdown of line items, VAT rates, payment terms, buyer and seller details and more. Which profile you need depends on who you're invoicing and what their systems expect.

This is where it gets complicated in practice. The XML schema sounds straightforward until you start implementing it. The field names are not obvious, the nesting structure takes some getting used to, and there are validation rules that aren't clearly documented in one place. I spent a lot of time on things like the correct structure for a VAT breakdown, which fields are required at which profile level, and why a file that looked correct to me kept failing validation.

The PDF generation side has its own challenges. You need to produce a valid PDF/A-3, which is stricter than a regular PDF. Fonts need to be embedded, certain features are not allowed, and the file metadata needs to follow specific conventions. If you get any of that wrong, the output won't pass validation even if the XML inside it is perfect.

If you want to validate a Factur-X file yourself, the FNFE validator (FNFE-MPE is the French association behind the standard) is the most reliable tool I found. The official specification documents are freely available too, though they assume some familiarity with XML and the UN/CEFACT CII schema.

I built Factur-X generation into Einvoicer as part of getting it ready for the September 2026 compliance deadline. The Factur-X part sits alongside Peppol BIS 3.0 output and integration with the Super PDP network, which handles the actual submission infrastructure for France. That's a separate topic, but worth knowing that Factur-X is the document format and Peppol is the delivery network. They're related but not the same thing.

If you're building invoicing software for the French market, Factur-X is not optional from September 2026. For business-to-government invoicing it's already required. For B2B it rolls out by company size, with larger businesses going first.

The good news is that the hybrid approach means you don't need to throw away your existing PDF generation. If you're already producing invoices as PDFs, you're partway there. The main work is generating valid CII XML, embedding it correctly into a PDF/A-3 container, and validating the output. Once that pipeline is in place, the format itself is not as intimidating as the documentation makes it look.

Happy to answer questions if you're working on something similar.

*Andrew Watts, full stack developer based in Nouvelle-Aquitaine, France.*
