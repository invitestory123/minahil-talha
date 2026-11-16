# Customer Editing Guide — Dr. Minahil & Muhammad Talha (wax-seal-royale)

This template is a luxury royal Pakistani wedding invitation (wax-seal-royale) customized for the **Barat Ceremony** of **Dr. Minahil Mahmmood** (Daughter of Mr. & Mrs. Mahmood Ul Hassan) and **Muhammad Talha Sajid** (Son of Mr. & Mrs. Sajid Hussain) on **January 11, 2027** at **Marquesina by TOPAZ, Lahore, Pakistan**.

It features an interactive wax-seal envelope overlay with the custom **TM** crimson and gold crest seal, opening animation video, ambient background video, classical soundtrack (*Einaudi: Divenire*), first-page royal wax seal badge, golden Bismillah calligraphy, first-page modest bridal couple portrait, live countdown timer, Barat Ceremony celebration card, Marquesina by TOPAZ venue card with Google Maps & Calendar integration, dress code etiquette, and an affectionate closing portrait section with family prayers.

---

## Normal Customer Changes

All routine customer edits are configured in:
→ [editable/wedding-data.js](file:///c:/invitestory/week11/minahil-talha/editable/wedding-data.js)

### Couple Information
Edit `couple` in `editable/wedding-data.js`:
- `bride`: `"Dr. Minahil"`
- `groom`: `"Muhammad Talha"`
- `brideFull`: `"Dr. Minahil Mahmmood"`
- `groomFull`: `"Muhammad Talha Sajid"`
- `brideParents`: `"Mr. & Mrs. Mahmood Ul Hassan"`
- `groomParents`: `"Mr. & Mrs. Sajid Hussain"`
- `monogram`: `"TM"`
- `order`: `"bride-first"`
- `subtitle`: Islamic Bismillah and Quranic verse (Surah Ar-Rum 30:21)

### Wedding Date & Welcome Message
Edit `wedding` in `editable/wedding-data.js`:
- `eventName`: Header monogram (`"TM"`)
- `dateLabel`: Date string for hero banner (`"January 11, 2027"`)
- `dateISO`: Event start ISO timestamp with timezone offset (`"2027-01-11T18:30:00+05:00"` for PKT). Drives live countdown timer and Google Calendar link.
- `invitationNote`: Formal invitation text from Mr. & Mrs. Mahmood Ul Hassan.

### Barat Ceremony Celebration
Edit `celebration` in `editable/wedding-data.js`:
- `title`: `"Barat Ceremony"`
- `date`: `"Monday, January 11, 2027"`
- `time`: `"6:30 PM Onwards"`
- `description`: `"An evening of celebratory bliss, royal hospitality, heartfelt prayers, and sumptuous dinner."`

### Venue & Location
Edit `venue` in `editable/wedding-data.js`:
- `name`: `"Marquesina by TOPAZ"`
- `address`: `"Hall No. 18, 19, Garrison Marriage Halls Complex, Lieutenant Saadat Farooq Shaheed Road, Saddar Town, Cantonment Lahore, Punjab, Pakistan"`
- `mapsUrl`: `"https://maps.app.goo.gl/c8RdE5n5LQKWovwKA?g_st=ic"`

### Dress Code
Edit `details` in `editable/wedding-data.js`:
- `dressCode`: `"Traditional Formal / Festive Wedding Attire"`

### Closing Message
Edit `closing` in `editable/wedding-data.js`:
- `message`: `"We look forward to welcoming you and celebrating this joyous occasion with you!"`
- `salutation`: `"With warmest regards & prayers,"`
- `couple`: `"Mahmood Ul Hassan & Sajid Hussain Families"`

### Media & Assets
Replace files directly in `editable/assets/` or update `media` in `wedding-data.js`:
- `photo1`: Couple photograph (`editable/assets/photo1.jpg`)
- `overlayImage`: Custom wax-seal envelope graphic (`editable/assets/envelope-cover.png`)
- `sealImage`: Transparent wax seal emblem (`editable/assets/tm-seal.png`)
- `sealVideo`: Wax-seal breaking/opening MP4 (`editable/assets/1782224012851.mp4`)
- `heroVideo`: Ambient background video (`editable/assets/Swans2.mov`)
- `audio`: Background soundtrack (`editable/assets/Einaudi_ Divenire (1) (1).mp3`)

---

## Verification & Deployment
- Check JavaScript syntax: `node --check editable/wedding-data.js`
- Test locally with any static HTTP server.
- Push changes to remote: `git push -u origin main` (or `master`).
