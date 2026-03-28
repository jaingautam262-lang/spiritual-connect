# Spiritual Connect

## Current State
- StutiLibrary.tsx has stutis: Kamala, Kameshwari Devi, Kaal Bhairav, Kali, Ganesh, Chinnamasta, Tara, Tripura Bhairavi, Durga, Dhumavati (10 stutis)
- stotraData.ts has stotras batch 1 (Navagraha, Shiva Ashtakam, Ram Raksha, Mahalakshmi Ashtakam, Rudra Ashtakam)
- part12Stotras.ts and part13Stotras.ts have more stotras
- Stotra.tsx page displays all stotras from stotraData + part12 + part13
- All content is static frontend data (no backend needed)

## Requested Changes (Diff)

### Add
1. **Part 29 — Two new stotras** in a new file `src/frontend/src/data/part14Stotras.ts`:
   - Durga Saptashloki (7 shlokas, Hindi text)
   - Kaal Bhairav Ashtak (8 verses, Hindi text)
2. **Stutis Batch 2** — Add 15 more stutis to StutiLibrary.tsx stutis array:
   - नवनाथ स्तुति
   - बगलामुखी स्तुति
   - ब्रह्म स्तुति पंचकम
   - भगवत् स्तुति
   - भुवनेश्वरी स्तुति
   - भैरव स्तुति
   - मंगल गौरी स्तुति
   - महाविद्या स्तुति
   - मातंगी स्तुति
   - राधा स्तुति
   - राम स्तुति
   - लक्ष्मी स्तुति
   - विष्णु स्तुति
   - शिव स्तुति
   - साई स्तुति

### Modify
- stotraData.ts: import and spread part14Stotras into allStotras export
- StutiLibrary.tsx: add 15 new stutis to the stutis array

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/data/part14Stotras.ts` with Durga Saptashloki and Kaal Bhairav Ashtak full Hindi text
2. Update `src/frontend/src/data/stotraData.ts` to import and include part14Stotras
3. Update `src/frontend/src/pages/StutiLibrary.tsx` to add 15 new stutis with full Hindi text, meaning, benefits, deityInfo
4. Validate build
