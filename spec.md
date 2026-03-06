# Specification

## Summary
**Goal:** Extend SpiritualConnect with a Bhajan Library, Holy Books Audio section, Vrat Katha section, Admin CMS, new Spiritual Shop product categories, and additional devotional mantras.

**Planned changes:**

### Backend (Motoko)
- Add stable storage and CRUD operations for three new content types: `BhajanEntry`, `VratKathaEntry`, and `HolyBookEntry` (each with base64 audio field)
- Expose query functions: `getBhajans()`, `getVratKathas()`, `getHolyBookEntries(bookTitle)`
- Expose update functions: `addBhajan`, `updateBhajan`, `deleteBhajan`, `addVratKatha`, `updateVratKatha`, `deleteVratKatha`, `addHolyBookEntry`, `deleteHolyBookEntry`
- Seed at least 12 mock bhajan entries, 10 vrat katha entries, and 12 holy book entries (with chapters/tracks)
- Add four new Spiritual Shop product categories: Rudraksha (individual bead types), Nav Grah Murti (9 planetary idols), Nav Grah Yatra (9 temple photo prints), Devi Devta Yatra (10 deity yatra photos) — at least 20 new products total
- Seed 9 Nav Grah mantras and at least 10 Devi-Devta mantras into the devotional content store

### Frontend
- Add `/bhajan-library` page (BhajanLibrary.tsx) with full music player UI (play/pause, next, prev, repeat, shuffle), playlist of 12+ mock bhajans, typing search, and voice search via Web Speech API
- Add `/vrat-katha` page (VratKatha.tsx) with card grid of 10+ katha entries; clicking a card shows full story text and an audio player bar (play/pause)
- Add `/holy-books` page (HolyBooksAudio.tsx) with sidebar/accordion book list, chapter selection, central player panel (play/pause, next/prev chapter), and shloka text display
- Add `/admin-cms` page (AdminCMS.tsx) with hardcoded password gate and three tabs: Bhajan Library Management, Vrat Katha Management, Holy Books Management — each supporting add/edit/delete and audio file upload (stored as base64)
- Add four new category filter tabs to the Spiritual Shop page (Rudraksha, Nav Grah Murti, Nav Grah Yatra, Devi Devta Yatra)
- New Nav Grah and Devi-Devta mantras appear in the existing Devotional Content Library under the Mantras tab
- Add React Query hooks for all new backend endpoints in `useQueries.ts`
- Register all four new routes in `App.tsx`
- Update `Layout.tsx` header nav and footer with links for Bhajan Library, Vrat Katha, Holy Books, and Admin CMS
- Update `Home.tsx` landing page features section with CTA cards for Bhajan Library, Vrat Katha, and Holy Books

**User-visible outcome:** Users can browse and play bhajans with a full music player, read and listen to Vrat Kathas, explore Holy Books audio by chapter, shop for Rudraksha beads and Nav Grah/Devi-Devta items, and view expanded mantra collections. An admin can manage all audio content via a password-protected CMS.
