# Verde &amp; Co. — Containerized Next.js + Bun Storefront

A small, intentionally‑designed e‑commerce **catalog** built with **Next.js (App Router)** and **Bun**, packaged to run **anywhere with Docker** — no local Node/Bun toolchain, no “works on my machine” dependency drift.

The product experience is deliberately scoped: browse the catalog, filter by collection, and open a product page. The **account** and **cart** icons are wired into the UI as placeholders for future work.

> The real goal of this project is to demonstrate clean **containerization**: build one image, run it on any machine (or push it to Docker Hub so anyone can pull and run it).

---

## ✨ What’s inside

- **Next.js 15** with the App Router and **professional file‑based routing**
  - `/` — home / landing
  - `/products` — full catalog
  - `/category/[slug]` — a collection (apparel, footwear, accessories, living)
  - `/product/[slug]` — product detail
  - `/cart`, `/account` — placeholders for future features
- **Bun** as the package manager **and** the runtime inside the container
- **Tailwind CSS** with a custom, hand‑picked palette (deep pine green · warm clay · paper cream) and an editorial type pairing (**Fraunces** display + **Manrope** text)
- **Multi‑stage Dockerfile** producing a small (~240&nbsp;MB) standalone image
- Graceful image fallbacks so the catalog never shows a broken image

---

## 🧩 Tech stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Framework    | Next.js 15 (App Router)         |
| Runtime / PM | Bun 1.x                         |
| Styling      | Tailwind CSS 3                  |
| Language     | TypeScript                      |
| Container    | Docker (multi‑stage, non‑root)  |

---

## 🖥️ Run locally (without Docker)

> Requires [Bun](https://bun.sh) installed.

```bash
# 1. Install dependencies
bun install

# 2. Start the dev server
bun run dev
```

Open <http://localhost:3000>.

To run a production build locally:

```bash
bun run build
bun run start
```

---

## 🐳 Run with Docker (recommended)

This is the part that matters: **anyone can run the app with only Docker installed** — no Bun, no Node, no dependency setup.

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine) installed and running.

### 1. Build the image

From the project root (where the `Dockerfile` lives):

```bash
docker build -t verde-store:latest .
```

### 2. Run the container

```bash
docker run -d --name verde-store -p 3000:3000 verde-store:latest
```

Open <http://localhost:3000>. Done.

Useful commands:

```bash
docker logs -f verde-store     # follow logs
docker stop verde-store        # stop
docker start verde-store       # start again
docker rm -f verde-store       # remove
```

### Or use Docker Compose

```bash
docker compose up --build      # build + run
docker compose down            # stop + remove
```

---

## ☁️ Push the image to Docker Hub

Once the image is built, publish it so **others can pull and run it without building anything**.

> Replace `YOUR_DOCKERHUB_USERNAME` with your Docker Hub username everywhere below.

### 1. Log in to Docker Hub

```bash
docker login
```

### 2. Tag the image for your account

```bash
docker tag verde-store:latest YOUR_DOCKERHUB_USERNAME/verde-store:latest
```

> Tip: it’s good practice to also tag a specific version, e.g. `:1.0.0`, alongside `:latest`.
>
> ```bash
> docker tag verde-store:latest YOUR_DOCKERHUB_USERNAME/verde-store:1.0.0
> ```

### 3. Push it

```bash
docker push YOUR_DOCKERHUB_USERNAME/verde-store:latest
# and, if you tagged a version:
docker push YOUR_DOCKERHUB_USERNAME/verde-store:1.0.0
```

Your image is now public at `https://hub.docker.com/r/YOUR_DOCKERHUB_USERNAME/verde-store`.

---

## ⬇️ Pull &amp; run on any other machine

On a completely fresh machine, the **only** requirement is Docker. No clone, no install:

```bash
# 1. Pull the published image
docker pull YOUR_DOCKERHUB_USERNAME/verde-store:latest

# 2. Run it
docker run -d --name verde-store -p 3000:3000 YOUR_DOCKERHUB_USERNAME/verde-store:latest
```

Open <http://localhost:3000> — the exact same app, byte‑for‑byte, with zero dependency errors. That’s the whole promise of containerization. 🚀

> Want it on a different port? Map any host port to the container’s `3000`:
> ```bash
> docker run -d -p 8080:3000 YOUR_DOCKERHUB_USERNAME/verde-store:latest
> ```
> Then open <http://localhost:8080>.

---

## 📁 Project structure

```
.
├── app/                    # App Router pages (routing lives here)
│   ├── layout.tsx          # Root layout: fonts, header, footer
│   ├── page.tsx            # Home
│   ├── products/           # /products — full catalog
│   ├── category/[slug]/    # /category/:slug — a collection
│   ├── product/[slug]/     # /product/:slug — product detail
│   ├── cart/               # placeholder
│   ├── account/            # placeholder
│   └── not-found.tsx       # 404
├── components/             # Header, footer, product card/grid, hero, icons
├── lib/                    # Product data, types, helpers
├── public/                 # Static assets
├── Dockerfile              # Multi-stage build (Bun → standalone)
├── docker-compose.yml      # One-command run
├── next.config.mjs         # output: "standalone" + remote images
└── package.json
```

---

## 🎨 Design notes

- **Palette:** deep pine green for ink, warm clay as the accent, and a paper‑cream canvas — chosen to feel calm and editorial rather than generic.
- **Type:** `Fraunces` (an expressive display serif) paired with `Manrope` (a clean geometric sans), loaded via `next/font` for zero layout shift.
- **Imagery:** product photography is pulled from [Unsplash](https://unsplash.com) (free to use). Each card degrades to a branded gradient if an image can’t be reached, so the layout never breaks.

---

## 🔭 Roadmap (intentionally out of scope for now)

- Functional cart &amp; checkout
- User accounts &amp; authentication
- Search &amp; real product data / CMS

---

## 📝 License

For demonstration purposes. Product imagery courtesy of Unsplash contributors.
