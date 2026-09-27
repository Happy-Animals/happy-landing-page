# HAPPY ANIMALS — Landing 2026

This folder is the clean 2026 landing baseline recovered from `LANDING_PAGE_E44_OTHER_DEPLOY`.
Legacy development-only material (`.git`, `OPENSEA`, `DONT_DEPLOY`, `slugs`, `index.txt`) is intentionally not copied here.

## i18n

The landing now uses the same language contract as the 2026 React app:

- storage key: `happy_animals_lang`
- first choice: saved language
- second choice: browser language
- fallback: English (`en`)
- HTML `lang` is updated automatically
- Arabic (`ar`) switches the document to RTL
- same 14 public languages as the app
- language selector keeps the visual style of `frontend/src/components/LanguageSelector.css`
- animal names reuse the existing `animal.name.*` translation keys

The landing has its own deployable copy of the language catalogs under `landing/languages/`. Each catalog contains the 292 app keys plus 91 landing/token keys and the legacy `animal.name.owl` compatibility key (384 total).

## Files added for i18n

- `i18n.js`: standalone browser i18n runtime
- `language-selector.css`: selector styling shared visually with the React app
- `languages/*.json`: 14 complete catalogs

Both `index.html` and `token.html` use the same selector and persisted language.

## Known legacy business-logic issues kept out of this i18n change

The E44 landing still contains 2025 launch dates and legacy blockchain availability logic. Because those dates are already in the past, the page can present old chains as available. The 2026 frontend also contains Robinhood configuration, while the recovered E44 landing does not. Those network/launch rules should be handled as a separate Phase 6 cleanup so i18n can be validated independently.
