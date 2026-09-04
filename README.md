# KRK Catalog

Build KRK Furniture, a catalog website for a furniture showroom in India.

Customers browse and enquire — there is no cart, checkout, or payment

anywhere in this app. Every product leads to a WhatsApp conversation, not

a purchase flow. This should feel like a well-run local showroom's own

site: warm, tactile, unhurried — not a generic e-commerce template.

TECHNICAL CONSTRAINTS

Do not connect Supabase, Firebase, or any other backend/database service —

decline if suggested. Build entirely against local mock data and local

component state for now; real auth and database wiring happen separately,

outside of Lovable, afterward. Structure the mock data to exactly match

this shape, since it needs to map cleanly onto a real database later:

product: { id, name, price (nullable — see pricing behavior below),

             category, image_url }

wishlist item: { product_id, saved_at }

Seed mock data with two categories only — "Chairs" and "Sofas" — using

4-6 plausible placeholder products per category (e.g. "Marlow Wingback

Chair", "Teakwood Accent Chair", "Bramwell 3-Seater Sofa", "Verona

L-Shaped Sofa"). Build the category system as a dynamic filter driven by

the category field, not hardcoded to two tabs — more categories get added

later and the UI shouldn't need rework when they do. Use reasonable

furniture stock/placeholder images; real photos get swapped in later.

DESIGN DIRECTION

Palette (5 colors, named):

Teak Bark #2A211C — deep structural neutral: header, footer, body text

Canvas #EDE6DA — warm light background and card surfaces

Ivory #F5F1E8 — lightest layer, slightly lifted off Canvas

Rust Velvet #8C4A3A — primary accent: active wishlist heart, category

              tags, links, hover states

Brass #B08D57 — secondary accent: dividers, small details, icons

Reserve WhatsApp's own green (#25D366) only for the WhatsApp button

itself, so it reads as its own distinct, recognizable action rather than

competing with the site's accent.

Type (3 roles):

Display — Fraunces, for headlines and product names: warm and a little

            hand-carved, not a cold luxury-brand serif

Body — Work Sans, clean and humanist, for everything readable

Utility — IBM Plex Mono, for prices and small reference labels — gives

            product cards a "catalog tag" feel

Layout concept: header with wordmark + the two category names as nav (no

hamburger-hidden nav on desktop, there's little to hide yet) + a sign-in

control + a wishlist icon. Hero is one large, characterful product photo

with a short, confident headline over it — not a stat callout, not a

gradient panel. Below the hero, Chairs and Sofas each get a large, equal-

weight editorial tile (not a small pill filter) — with only two

categories, give each one real presence. The catalog grid below that uses

product cards: photo, name, a small "Ref. ___" style code (styled in the

utility mono face, like an actual catalog reference), price or "Enquire

for price," a wishlist heart, and the WhatsApp button.

Signature element: fine-line technical elevation sketches — blueprint-

style silhouette line art of a chair or sofa profile, brass-colored —

used behind the hero headline at low opacity, as the category tile

graphics, and as the empty-wishlist illustration. This is the one

memorable, repeated motif; keep everything else around it disciplined.

Motion: restrained. A soft rise/fade on scroll for product cards, a

gentle image shift on card hover. No page-load sequences, no scattered

micro-animations — furniture retail should feel calm, not flashy.

PAGES

- Home: hero, the two category tiles, a short "why KRK" section, a small

  set of featured products, footer with WhatsApp number, address

  placeholder, and social links placeholder.

- Catalog: full grid, filterable by category, sorts by newest by default.

- Product detail: large image, name, Ref. code, price/enquire-for-price,

  a short description, prominent WhatsApp button, wishlist toggle, and

  3-4 "you might also like" items from the same category.

- Sign in: a "Sign in with Google" button that, for now, just toggles a

  local signed-in mock state — this becomes real authentication later,

  don't build a form-based email/password flow.

- Wishlist / profile: shows saved items for the mock signed-in state;

  signed-out visitors see a prompt to sign in instead of the page.

KEY BEHAVIORS

- WhatsApp button: opens https://wa.me/91XXXXXXXXXX?text=<message>, where

  91XXXXXXXXXX is a clearly marked placeholder number and the message is

  URL-encoded and includes the product name, e.g. "Hi, I'm interested in

  the Marlow Wingback Chair."

- Wishlist heart: toggles on/off, persists only in local state for now,

  reflected immediately on both the card and the detail page.

- Pricing: some products show a real price, some show "Enquire for

  price" instead — build both states, driven by whether price is set.

VOICE

Plain and specific, active voice. Buttons say what they do: "Enquire on

WhatsApp," not "Contact Us." Empty wishlist state: "Nothing saved yet —

tap the heart on any piece to add it here," not a generic "No items

found." No filler copy, no exclamation marks doing the enthusiasm's job

for you.

OUT OF SCOPE FOR THIS BUILD

No cart, checkout, or payment anywhere. No admin dashboard — that's a

separate, later addition. No real backend connections of any kind.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5062cbd1-9d90-495c-a3be-d4e8772db737).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
