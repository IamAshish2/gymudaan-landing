import AutoplayVideo from "@/components/landing/primitives/AutoplayVideo"
import { hero } from "@/lib/landing/content"
import poster from "@/public/landing/hero/video-poster.webp"

// The product video in the hero frame: muted, looping, with a pause button.
const HeroVideo = () => (
  <div className="relative">
    <AutoplayVideo
      src={hero.video.src}
      poster={poster}
      label={hero.video.label}
      className="aspect-video h-auto w-full object-cover"
    />
  </div>
)

export default HeroVideo
