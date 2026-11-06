import { preload } from "react-dom"

import AutoplayVideo from "@/components/landing/primitives/AutoplayVideo"
import { hero } from "@/lib/landing/content"
import poster from "@/public/video/hero/hero-story-poster.webp"

// The product film in the hero frame: looping, with pause and sound buttons
// (it has a voiceover and soundtrack; browsers only autoplay it muted). It
// plays while on screen and pauses when scrolled away (playInView).
// The poster is the homepage's largest above-the-fold paint, so it is
// preloaded at high priority; the clip itself loads after the page.
// Note: Chrome only counts it for LCP once the frame's opacity entrance
// (animate-hero-dashboard) has finished; see docs/seo/05.
const HeroVideo = () => {
  preload(poster.src, { as: "image", fetchPriority: "high" })

  return (
    <div className="relative">
      <AutoplayVideo
        src={hero.video.sources}
        poster={poster}
        label={hero.video.label}
        sound
        playInView
        className="aspect-video h-auto w-full object-cover"
      />
    </div>
  )
}

export default HeroVideo
