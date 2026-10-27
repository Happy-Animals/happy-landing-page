# Happy Animals — Landing 2026 🐾

Official [Happy Animals](https://happyanimals.xyz/) landing for NFT collections, wildlife conservation and community information.

## Products

- **Happy Animals NFTs:** collections, conservation and prize draws. Chain-specific NFT applications and backend remain independent of this static landing.
- **HappySwaps by Happy Animals:** separate DeFi app at [happyswaps.happyanimals.xyz](https://happyswaps.happyanimals.xyz/). The landing links to it from its header and footer without modifying NFT logic. **Do not publish the links until the destination is actually deployed with valid HTTPS.**

The landing retains its existing story: introduction → about → collections → lottery → conservation → contact. No additional full-screen DEX section.

## Tech

Static HTML5, CSS and JavaScript, no `npm run dev` at repository root. `index.html` is the NFT landing; `token.html` is the separate historical token page. `landing-config.js` is only for NFT network configuration, not the DEX.

Fourteen translations in `languages/`, loaded by `i18n.js`. Selection uses `happy_animals_lang` in localStorage, browser language then English. HappySwaps translations: `landing.happySwapsExplore`, `landing.happySwapsOpen`.

## Local preview

```bash
git clone git@github.com:Happy-Animals/happy-landing-page.git
cd happy-landing-page
git switch reboot/landing-2026
python -m http.server 8000
```

Open http://localhost:8000.

Optional local build/deploy tools live under `tools/` and are intentionally excluded by `.gitignore`. Never overwrite local tools, `.env` or other ignored files by replacing the project folder. Pushing to GitHub does not itself publish this landing.

## Branches

- `main`: historical landing until the reviewed 2026 upgrade is fast-forwarded.
- `reboot/landing-2026`: current 2026 working branch.
- Feature branches target `reboot/landing-2026` for review before merging.

## Contact

[dev@happyanimals.xyz](mailto:dev@happyanimals.xyz) · [Twitter/X](https://x.com/happyanimalsxyz) · [Discord](https://discord.gg/hSGmJdRweD)

## License

MIT, see [LICENSE](LICENSE).

## HappySwaps explainer

`happyswaps.html` is a public-facing introduction, not the DEX itself. It uses the original Happy Animals typography, background palette and 14-language selector; it describes testnet-only capabilities and marks future Earn/Perps as planned. Its draft logo currently points to the existing image in the HappySwaps GitHub repository; before production, copy and optimize the same original image under the landing's `assets/` and update the link to avoid an external runtime dependency. No wallets, NFT contracts, RPC or backend are shared.

## HappySwaps design comparison — experimental, not deployed

Two standalone static design studies have been added to this feature branch; neither replaces the existing NFT landing or the first HappySwaps explainer:

- `happyswaps1.html` — immersive 2026-style, dark gradients, large typography, responsive bento layout, testnet-only illustrative preview with selectable Swap/Pools/Rewards panels. No wallet connection or live market data.
- `happyswaps2.html` — reuses the original Happy Animals landing stylesheet, full-screen section structure, backgrounds, typographic hierarchy, responsive layout and three Lottie animation files, but switches to HappySwaps content and violet/rose accents.

To compare locally with the repo's existing files: `python -m http.server 8000`, then open `http://localhost:8000/happyswaps1.html` and `http://localhost:8000/happyswaps2.html`. The official HappySwaps bear logo is loaded from the public HappySwaps GitHub repository for **preview only**. Self-host an optimized checked copy before publishing; the pages also use Google Fonts and page 2 uses the same external DotLottie library as the NFT landing.

Neither page is the DEX or enables mainnet. No `index.html`, `landing-config.js`, NFT payouts, RPC, routes, domains, or production deployment are altered in this comparison phase.


### Concept 03 — Habitat Bento (candidate preview)

- `happyswaps3.html`: blends the lightweight lavender aesthetics of concept 02 with concept 01's modern Bento feature cards and test-only interactive swap panel.
- Reuses the genuine **12 habitat file names + CSS palettes** from `src/components/Habitats.tsx` / `habitatThemes.json` in the HappySwaps codebase, with 30-second rotation, a 2.4-second crossfade, tab visibility and reduced-motion support. Scenery can be changed or paused from the on-page controls.
- Reuses the genuine HappySwaps layered logo (base + two individually animated arrows on hover) and the application's fonts: Luckiest Guy, DynaPuff and Roboto.
- The preview loads the official logo and habitat pictures from the public HappySwaps GitHub raw asset URLs. If a habitat fails to load, it falls back to one of the original landing backgrounds. **Self-host optimized copies in `assets/` before publishing**, so this does not become a GitHub-hosted asset dependency.
- New `swaps3.*` copy has Spanish and Catalan translations. English remains available as HTML fallback; other 11 language catalogs currently fall back to English for the new concept-specific copy (existing `swaps.*` translations continue to work). Complete the remaining locales before replacing the production explainer.
- Preview locally with `http://localhost:8000/happyswaps3.html` after updating the Worktree. This page **does not activate DEX trading, wallet connections, real quotes, or mainnet**.
- No changes to the NFT application, original landing routing, DNS or production deployment from concept 03.
