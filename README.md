# Embera

A cinematic, interactive storefront for a luxury candle atelier. Embera combines
scroll-driven storytelling, atmospheric sound, and a complete shopping flow in a
responsive React experience.

![Embera candle collection](public/assets/collection-embera.png)

## Features

- Scroll-driven candle story with animated scene transitions
- Four-candle fragrance collection: Embera, Solis, Velour, and Nocturne
- Individual product pages with vessel, scent, ingredient, and size options
- Persistent shopping cart powered by browser local storage
- Cart and checkout experiences
- About, contact, and custom 404 pages
- Optional ambient audio controls
- Responsive layout with reduced-motion support
- Smooth scrolling and polished page transitions

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS 4
- Motion
- GSAP
- Lenis

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm before running the project.

### Installation

```bash
git clone https://github.com/toka09/Embera.git
cd Embera
npm install
```

### Development

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Type-check and create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Project Structure

```text
Embera/
|-- public/
|   |-- assets/       # Product and storytelling imagery
|   `-- audio/        # Ambient sound and music
|-- src/
|   |-- components/   # Pages and reusable interface sections
|   |-- hooks/        # Custom React hooks
|   |-- App.tsx       # Client-side page routing and main layout
|   |-- cart.tsx      # Cart state and local-storage persistence
|   |-- index.css     # Global styles
|   `-- main.tsx      # Application entry point
|-- index.html
`-- package.json
```

