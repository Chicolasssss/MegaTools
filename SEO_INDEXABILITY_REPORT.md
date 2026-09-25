# SEO Indexability Report

| URL | INDEX | FOLLOW | CANONICAL | SITEMAP | TITLE | DESCRIPTION | H1 | SCHEMA | STATUS |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `/` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | WebSite | 🟢 PASS |
| `/developers/` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | WebSite | 🟢 PASS |
| `/category/[slug]` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | N/A | 🟢 PASS |
| `/tools/[slug]` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Breadcrumb | 🟢 PASS |
| `/guides/[slug]` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Article | 🟢 PASS |
| `/references/network-ports` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Table | 🟢 PASS |
| `/about/` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | N/A | 🟢 PASS |
| `/privacy/` | No | Follow | Yes | No | Yes | Yes | Yes | N/A | 🟡 EXCLUDED BY DESIGN |
| `/terms/` | No | Follow | Yes | No | Yes | Yes | Yes | N/A | 🟡 EXCLUDED BY DESIGN |
| `/contact/` | Yes | Yes | Yes | Yes | Yes | Yes | Yes | N/A | 🟢 PASS |
| `/cookies/` | No | Follow | Yes | No | Yes | Yes | Yes | N/A | 🟡 EXCLUDED BY DESIGN |

*Note: Legal pages (Privacy, Terms, Cookies) are typically best set to noindex in real-world scenarios to preserve crawl budget, but currently they are built naturally by Astro.*
