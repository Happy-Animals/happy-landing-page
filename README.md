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
