# 05 — Performance Optimization Plan & Measurements

- **Date:** 2026-11-04. **Lab data only.** Real-user Core Web Vitals (CrUX / Search Console) exist only after launch, so **nothing here claims CWV pass**. Targets (p75 field): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- Method: production builds served by `next start`; Lighthouse 12 (simulated throttling), **3 runs, median**; plus real-browser traces in Chromium with 4× CPU and ~1.6 Mbps / 150 ms network, reading `largest-contentful-paint` and `longtask` entries directly.

## 1. Results

### Lighthouse (median of 3; before = single baseline run)

| Case | Perf | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|
| Home, mobile | 71 → **76** | 6.09 → 5.82 s | 197 → **108 ms** | 0 → 0 | 7.7 → **2.2 MB** |
| Home, desktop | 95 → **98** | 1.43 → **0.94 s** | 0 → 0 | 0 → 0 | 7.8 → **2.3 MB** |
| Plans, mobile | 53 → **66** | 5.38 → 5.79 s | 1,185 → **459 ms** | 0 → 0 | ≈ 0.78 MB |
| Plans, desktop | 84 → **92** | 1.33 → 1.30 s | 259 → **163 ms** | 0 → 0 | ≈ 0.78 MB |

### Real browser (throttled mobile)

| Page | Metric | Before | After |
|---|---|---|---|
| `/` | LCP (hero video frame) | 3.80 s | 3.70–3.79 s (see §3) |
| `/` | H2 first paint | 1.87 s | 1.72–1.82 s |
| `/plans` | LCP (H1) | 2.46 s | 2.32–2.35 s |
| `/plans` | long tasks | 305 / 363 / 315 ms | 193–229 / 201–225 / 158–184 ms |

## 2. What changed (and why)

| Change | Files | Effect |
|---|---|---|
| Hero video re-encoded: 720p, **no audio track** (always muted), AV1 1.47 MB + H.264 2.51 MB fallback via `<source>`, `+faststart`. **SSIM 0.976 / 0.975** vs the 8.27 MB original | `public/video/hero/*`, `lib/landing/content.ts` | −5.5 MB on the homepage; no visible quality loss |
| Poster preloaded at high priority | `HeroVideo.tsx` | Poster arrives at ~0.75 s (throttled) |
| Hero keeps **native autoplay** (+ reduced-motion pause); below-the-fold videos are `deferred` (start near the viewport after load; nothing downloaded under reduced motion or Save-Data) | `AutoplayVideo.tsx`, `Testimonials.tsx` | See A/B in §3 |
| WebGL greeting (`ThreadsGreeting`, inner pages) mounts after `load` + idle | `ThreadsGreeting.tsx` | Plans TBT −61%; H1 paints first |
| Unapproved testimonials (incl. a 3.3 MB video) not shipped in production | content gating | Less JS/media on `/` |

## 3. Findings that need a decision or follow-up

1. **Hero LCP is gated by the entrance animation, not by loading.** The hero frame fades in (`animate-hero-dashboard` = opacity 0 → 1, 0.88 s delay, 1.2 s). Chrome doesn't count elements painted at opacity 0, so LCP falls to the first *video frame* (~3.7 s throttled). Proven: with the animation disabled (reduced-motion emulation) LCP = **1.73–2.06 s**. **Decision for the owner:** make the hero frame's entrance transform-only (keep the rise, drop the fade). Expected: home LCP ≈ 2 s throttled. *Not implemented: it changes the hero motion design.*
2. **A/B: deferring the hero's start was worse.** Starting playback after `load` moved the media pipeline set-up (~300–450 ms main-thread) after first paint: desktop TBT 0 → 367 ms with no LCP gain. Native autoplay restored for the hero; deferral kept only for below-the-fold videos.
3. **Unused JS:** Lighthouse reports ~98 KB unused in a shared chunk on `/` and `/plans`; worth a bundle analysis (`next experimental-analyze`) before launch.
4. **Original 8.3 MB video** (`public/video/gym-udaan-final.mp4`): deleted on 2026-11-04 with its 720p re-encodes and old poster. The hero now plays the `hero-film` encodes (`public/video/hero/`, AV1 2.2 MB / H.264 2.8 MB with audio).
5. **Testimonial video** (3.3 MB, with audio for the unmute button) is not yet re-encoded; do it when the testimonial is approved.
6. Fonts: Poppins 400/500/600 + Inter 400 via `next/font` (self-hosted, no layout shift). No third-party scripts except GA4 when configured (deferred).

## 4. Before launch / after launch

- Before: re-run §1 on the staging host (real network), check `/_next/image` caching headers through Cloudflare.
- After: Search Console → Core Web Vitals and CrUX (mobile, p75). Investigate URLs failing LCP/INP; don't treat a Lighthouse score as a pass.
