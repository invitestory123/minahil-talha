# Customer Editing Guide — Dr. Minahil & Muhammad Talha (Ruby Velvet Royal Barat Invitation)

This luxury royal Pakistani wedding invitation is customized for the **Barat Ceremony** of **Dr. Minahil Mahmmood** (Daughter of Mr. & Mrs. Mahmood Ul Hassan) and **Muhammad Talha Sajid** (Son of Mr. & Mrs. Sajid Hussain) on **January 11, 2027** at **Marquesina by TOPAZ, Lahore, Pakistan**.

The invitation seamlessly integrates:
1. **Interactive Burgundy Wax Seal Intro**:
   - Features the customer's authentic deep red shield wax seal with the royal interwoven **TM** monogram and gold rope border (`editable/assets/tm-shield-seal.png` & `editable/assets/envelope-cover.png`).
   - Pure CSS/JS opening sequence (no video): tap the seal to press it, a golden light blooms outward from the monogram, and the cover dissolves into the first page.
   - "Tap to Open" pulsing golden indicator with audio trigger, floating gold dust and halo rings over the seal.
   - Quick "Skip" button for instant viewing (`?opened=true` also bypasses the intro).
2. **First Page / Hero (Modest Royal Couple Portrait)**:
   - Features the royal couple embracing on the palace terrace at sunset (`editable/assets/modest-couple-hero.jpg`).
   - Respectfully depicts the bride in 100% modest Pakistani bridal attire (the bare midriff/waist has been meticulously covered in matching royal red bridal fabric with intricate gold zardozi embroidery).
   - Golden Bismillah calligraphy (`بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ`) and translation.
   - Regal typography for **Dr. Minahil & Muhammad Talha**, Barat Ceremony tag, and date (**11 January 2027**).
   - Floating music player with animated equalizer bars.
3. **Ruby Velvet Luxury Sections (`https://www.invitestory.in/previews/ruby/`)**:
   - **Welcome Card**: Formal parental invitation from Mr. & Mrs. Mahmood Ul Hassan.
   - **Interactive Scratch-to-Reveal Date Card**: Guests use their finger or cursor to scratch off the gold foil and unveil the date, with an instant "Add to Calendar" button.
   - **Moments Gallery**: Imperial arched gallery card with romantic couple moments.
   - **Live Countdown Timer**: Days, hours, minutes, and seconds counting down to the Barat Ceremony in PKT.
   - **Celebration Timeline**: Barat arrival (6:30 PM), Nikah & rings (7:30 PM), dinner feast (8:30 PM), Rukhsati (10:00 PM).
   - **Venue Card (Marquesina by TOPAZ, Lahore)**: Direct Google Maps navigation link and instant "Copy Address" utility.
   - **Dress Code**: Royal Formal / Traditional Barat Attire with interactive velvet palette swatches.
   - **Pre-Wedding Festivities**: Dholki/Mehndi, Barat Ceremony, and Walima Reception.
   - **Quranic Blessing & Duas**: Surah Ar-Rum (30:21) Arabic calligraphy and translation, with warmest duas from the Hassan and Hussain families.

---

## Customer Configuration

All routine customer edits are configured in:
→ [editable/wedding-data.js](file:///c:/invitestory/week12/minahil-talha/editable/wedding-data.js)  
and  
→ [assets/js/config.js](file:///c:/invitestory/week12/minahil-talha/assets/js/config.js)

### Couple & Parents
Edit `couple`:
- `bride`: `"Dr. Minahil Mahmmood"`
- `brideParents`: `"Mr. & Mrs. Mahmood Ul Hassan"`
- `groom`: `"Muhammad Talha Sajid"`
- `groomParents`: `"Mr. & Mrs. Sajid Hussain"`
- `brideFirst`: `"Minahil"`
- `groomFirst`: `"Talha"`
- `initials`: `"TM"`

### Barat Ceremony Date & Time
Edit `ceremony` / `wedding`:
- `title`: `"Barat Ceremony"`
- `date`: `"11 January 2027"`
- `day`: `"Monday"`
- `time`: `"6:30 PM Onwards"`
- `isoDate`: `"2027-01-11T18:30:00+05:00"` (PKT timezone offset, drives the live countdown timer)

### Venue Details
Edit `venue`:
- `name`: `"Marquesina by TOPAZ"`
- `hall`: `"Hall No. 18, 19"`
- `complex`: `"Garrison Marriage Halls Complex"`
- `address`: `"Lieutenant Saadat Farooq Shaheed Road, Saddar Town, Cantonment Lahore, Punjab, Pakistan"`
- `mapsUrl`: `"https://maps.app.goo.gl/c8RdE5n5LQKWovwKA?g_st=ic"`

### Media & Assets
Configured under `editable/assets/`:
- `envelope-cover.png`: Authentic burgundy envelope with TM shield wax seal.
- `tm-shield-seal.png`: Transparent cut-out of the TM crest wax seal.
- `modest-couple-hero.jpg`: Modest royal bridal couple portrait on the first page.
- `bgm.mp3`: Instrumental soundtrack.
- `floral-divider-v2.webp`: Ruby velvet floral dividers.
- `scratch-frame-v2.webp`: Interactive scratch card frame.

---

## Local Verification
To preview locally:
1. Run a local static server: `python -m http.server 8089`
2. Open `http://localhost:8089/` in your browser.
3. To jump straight past the envelope intro to the first page, append `?opened=true`: `http://localhost:8089/?opened=true`.
