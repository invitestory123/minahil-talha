# Customer Editing Guide — Dr. Minahil & Muhammad Talha (Barat Ceremony Invitation)

This invitation is a luxury royal Pakistani wedding invitation customized for the **Barat Ceremony** of **Dr. Minahil Mahmmood** (Daughter of Mr. & Mrs. Mahmood Ul Hassan) and **Muhammad Talha Sajid** (Son of Mr. & Mrs. Sajid Hussain) on **January 11, 2027** at **Marquesina by TOPAZ, Lahore, Pakistan**.

It features:
1. **Interactive Burgundy Envelope Opener**:
   - Features the customer's authentic deep red shield wax seal with the gold interwoven **TM** monogram (`editable/assets/envelope-cover.png`).
   - "Tap Seal to Open" pulsing golden indicator with sound trigger.
   - Quick "Skip" button for instant viewing.
2. **First Page / Main Royal Card**:
   - The **TM Gold Wax Seal Crest** (`editable/assets/tm-seal.png`) embossed at the header.
   - Golden Bismillah calligraphy (`بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ`) and English translation.
   - **Modest Bride & Groom Portrait** (`editable/assets/photo1.jpg`):
     - Displayed front-and-center inside an imperial arched Mughal gold filigree frame.
     - Respectfully depicts the bride in 100% modest Pakistani bridal attire (full sleeves, high modest neckline, draped bridal dupatta, zero skin exposure).
   - Formal parental invitation from **Mr. & Mrs. Mahmood Ul Hassan** for the **Barat Ceremony** with **Muhammad Talha Sajid** (Son of Mr. & Mrs. Sajid Hussain).
3. **Date, Time & Live Countdown Card**:
   - Monday, 11th January 2027 · 6:30 PM Onwards (PKT).
   - Real-time countdown timer (Days, Hours, Minutes, Seconds).
   - Add to Calendar (`.ics` / Google Calendar download).
4. **Venue & Navigation Card**:
   - **Marquesina by TOPAZ**
   - Hall No. 18, 19 Garrison Marriage Halls Complex, Lieutenant Saadat Farooq Shaheed Road, Saddar Town, Cantonment Lahore.
   - Direct Google Maps Navigation (`https://maps.app.goo.gl/c8RdE5n5LQKWovwKA?g_st=ic`).
   - Instant "Copy Address" utility.
5. **Quranic Blessing & Duas**:
   - Surah Ar-Rum (30:21) Arabic calligraphy and English translation.
   - Warmest duas and compliments from the Hassan and Hussain families.
6. **Ambient Soundtrack**:
   - Background music track (*Leo Twins: Sanson Ki Mala Violin Cover*) (`editable/assets/bgm.mp3`).
   - Floating music player with live equalizer bars.

---

## Customer Configuration

All routine customer edits are configured in:
→ [editable/wedding-data.js](file:///c:/invitestory/week11/minahil-talha/editable/wedding-data.js)

### Couple & Parents
Edit `couple` in `editable/wedding-data.js`:
- `bride`: `"Dr. Minahil Mahmmood"`
- `brideParents`: `"Mr. & Mrs. Mahmood Ul Hassan"`
- `groom`: `"Muhammad Talha Sajid"`
- `groomParents`: `"Mr. & Mrs. Sajid Hussain"`
- `initials`: `"TM"`

### Barat Ceremony Date & Time
Edit `ceremony` in `editable/wedding-data.js`:
- `title`: `"Barat Ceremony"`
- `date`: `"11th January 2027"`
- `day`: `"Monday"`
- `time`: `"6:30 PM"`
- `isoDate`: `"2027-01-11T18:30:00+05:00"` (PKT timezone offset, drives the live countdown timer)

### Venue Details
Edit `venue` in `editable/wedding-data.js`:
- `name`: `"Marquesina by TOPAZ"`
- `hall`: `"Hall No. 18, 19"`
- `complex`: `"Garrison Marriage Halls Complex"`
- `address`: `"Lieutenant Saadat Farooq Shaheed Road, Saddar Town, Cantonment Lahore, Punjab, Pakistan"`
- `mapsUrl`: `"https://maps.app.goo.gl/c8RdE5n5LQKWovwKA?g_st=ic"`

### Media & Assets
Configured under `media` in `editable/wedding-data.js`:
- `envelopeCover`: `editable/assets/envelope-cover.png` (Burgundy envelope with custom TM wax seal)
- `seal`: `editable/assets/tm-seal.png` (Transparent gold TM shield wax seal crest)
- `photo`: `editable/assets/photo1.jpg` (Modest bridal couple portrait in royal Barat attire)
- `music`: `editable/assets/bgm.mp3` (Instrumental soundtrack)
