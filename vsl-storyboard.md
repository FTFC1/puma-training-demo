# FORJE Retail Training — VSL Storyboard

**Duration:** 30-45 seconds
**Format:** Vertical (9:16) for mobile/social
**Audience:** Retail brand managers (Adedolapo, PUMA Lekki)

---

## SCENE 1: Hook (0-3s)
**Visual:** Phone screen, finger taps "Build the Basket" game tile
**Text overlay:** "Your staff could sell 15% more."
**Audio:** Subtle tap sound

---

## SCENE 2: Problem (3-8s)
**Visual:** Static slide, dark background
**Text overlay:**
```
"Would you like socks with that?"
— Every untrained sales rep
```
**Audio:** Silence or subtle tension tone

---

## SCENE 3: Solution Intro (8-12s)
**Visual:** Landing page scrolls into view, shows 4 game tiles
**Text overlay:** "Training that actually works."
**Audio:** Upbeat subtle music starts

---

## SCENE 4: Game Highlight 1 — Customer Says (12-18s)
**Visual:** Quick gameplay montage
- Customer quote appears: "I want to start running"
- Finger taps "ACTIVITY BUYER"
- Green checkmark, confetti
**Text overlay:** "Learn to read customers"
**Audio:** Music continues, tap sounds

---

## SCENE 5: Game Highlight 2 — Build the Basket (18-26s)
**Visual:** Gameplay
- Customer type badge: "GUIDED BUYER"
- Products being added to basket
- Basket total climbing: ₦45,000 → ₦52,000 → ₦58,500
- "15% add-on rate" achievement
**Text overlay:** "Practice real cross-sells"
**Audio:** Satisfying "cha-ching" on basket additions

---

## SCENE 6: Credibility (26-32s)
**Visual:** Fade to dark, quote appears
**Text overlay:**
```
"Based on interviews with Nigerian
retail experts at global sports brands"
```
**Audio:** Music softens

---

## SCENE 7: CTA (32-40s)
**Visual:** Phone with landing page, QR code beside it
**Text overlay:**
```
Try the demo →
forje.co/puma-demo
```
**Audio:** Music resolves

---

## PRODUCTION NOTES

### Screenshots Needed (Playwright captures)
1. `landing.png` — Full landing page
2. `game-tile-tap.png` — Finger on Build the Basket tile
3. `customer-says-question.png` — A question in Customer Says game
4. `customer-says-correct.png` — Correct answer with confetti
5. `basket-empty.png` — Basket game start state
6. `basket-building.png` — Mid-selection, some items checked
7. `basket-complete.png` — Final basket with 15% add-on rate
8. `results-screen.png` — Game completion with score

### Remotion Composition Structure
```
src/
├── Video.tsx           # Main composition
├── scenes/
│   ├── Hook.tsx        # Scene 1
│   ├── Problem.tsx     # Scene 2
│   ├── Solution.tsx    # Scene 3
│   ├── GameDemo.tsx    # Scenes 4-5 (reusable)
│   ├── Credibility.tsx # Scene 6
│   └── CTA.tsx         # Scene 7
├── components/
│   ├── PhoneFrame.tsx  # iPhone mockup frame
│   ├── TextOverlay.tsx # Animated text
│   └── ScreenCapture.tsx # Screenshot with animations
└── assets/
    └── screenshots/    # Playwright captures
```

### Animations
- **PhoneFrame:** Slight float/bob, 3D perspective tilt
- **Screenshots:** Slide in, subtle zoom on key moments
- **Text:** Fade up, slight blur-to-sharp
- **Transitions:** Quick cuts (0.3s), no slow fades

### Color Palette (from FORJE brand)
- Background: #1a1a1a (dark)
- Accent: #8b6914 (gold)
- Text: #ffffff
- Success: #2d5a3d (green from games)

---

## REVERSE ENGINEERING CHECKLIST

To build this, we need:

- [ ] Remotion project initialized
- [ ] Playwright screenshots captured
- [ ] PhoneFrame component (iPhone mockup)
- [ ] Scene components built
- [ ] Timing/transitions tuned
- [ ] Audio (optional, can add later)
- [ ] Render to MP4
