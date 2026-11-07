# La mulți ani, Dumi! · 21

An interactive, animated birthday website made for Dumi's 21st birthday. It runs entirely in the browser — no backend, no API keys, no external image assets.

## The three scenes

1. **Scratch card** — falling confetti, rising balloons and a pastel scratch layer. Scratch at least 70% of the card (mouse, finger or pen) to reveal the birthday message. The site moves on automatically a moment after the reveal.
2. **Birthday cake** — a hand-drawn SVG cake drops in with the candles `2` and `1`. A lighter floats in and lights them one by one, then you blow the candles out with the **Suflă!** button. Wind, flicker, smoke, sparkles and a wish caption follow.
3. **Galaxy finale** — a 3D starfield, a slowly approaching pastel galaxy, birthday wishes in many languages and a central dedication. A replay button brings you back to the scratch card.

There is no way to skip the scratch or the candles: the story only moves forward through those interactions.

## Tech

- React 19 + TypeScript + Vite 7
- Tailwind CSS 3.4 (used alongside hand-written CSS)
- Framer Motion 12 for scene transitions and micro-animations
- Canvas 2D for the scratch layer, confetti and the galaxy starfield
- Web Audio API for optional, synthesized sound effects
- Fonts: Fredoka, Nunito and Caveat via Fontsource

All illustrations (cake, candles, lighter, balloons, galaxy) are custom CSS/SVG.

## Local development

```bash
npm install
npm run dev
```

Open the printed local URL. The dev server serves the site from `/`.

## Production build

```bash
npm run build
npm run preview
```

The production build lives in `dist/`. By default it is built for a GitHub Pages project site at `/happybirthday/`. Override the path with `VITE_BASE_PATH`:

```bash
VITE_BASE_PATH=/my-repo/ npm run build
```

On PowerShell:

```powershell
$env:VITE_BASE_PATH="/my-repo/"; npm run build
```

## Deploying to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create a GitHub repository and push this project to it.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow derives the Vite base path from the repository name, so no path needs to be edited. If the repository is named `<user>.github.io`, it uses `/` automatically.

## Customizing

- **Name and age** — `src/App.tsx`, `src/components/ScratchCard.tsx` and the copy in the scenes.
- **Wishes and their positions** — `src/components/WishField.tsx`.
- **Colors, spacing and layout** — `src/styles/global.css`.
- **Keyframes** — `src/styles/animations.css`.
- **Sound effects** — `src/hooks/useAudio.ts`.

Sound is off until the first interaction (browser autoplay rules). The speaker button in the top-right corner mutes or unmutes it at any time.

## Optional visual smoke tests

The repository includes a few Playwright scripts used to verify the experience at desktop, portrait and landscape sizes. They expect a local Chrome installation and a running server.

```bash
# Terminal 1
npm run dev

# Terminal 2
node scripts/visual-check.mjs   # screenshots of every scene at 1440×900, 390×844 and 360×640
node scripts/final-check.mjs    # also checks landscape, the replay button and horizontal overflow
```

For the production build:

```bash
npm run build
npm run preview
node scripts/production-check.mjs
```

Set `CHROME_PATH` if Chrome is installed somewhere else. The screenshots are written to `screenshots/`, which is ignored by git.

## Accessibility and responsiveness

- Responsive from 360 px wide up, in portrait and landscape, with no horizontal scrolling.
- Pointer, touch and pen support for scratching.
- Respects `prefers-reduced-motion` for most decorative animations.
- Buttons have visible labels and the scenes expose Romanian `aria-label`s.
