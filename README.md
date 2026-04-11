# Personal Site

A personal portfolio and blog site built with Astro and Tailwind CSS.

## Architecture

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── BlogCard.astro
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── content/        # Content collections (markdown)
│   │   └── blog/
│   ├── layouts/         # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/          # Routes (Astro files = pages)
│   │   ├── index.astro
│   │   └── blog/
│   └── styles/
└── astro.config.mjs
```

## Tech Stack

- **Astro** - Static site generator with zero-JS by default
- **Tailwind CSS** - Utility-first CSS framework
- **Content Collections** - Type-safe content management for markdown files

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                         |
| `npm run dev`      | Start dev server at `localhost:4321`        |
| `npm run build`    | Build for production to `./dist/`          |
| `npm run preview`  | Preview production build locally            |
