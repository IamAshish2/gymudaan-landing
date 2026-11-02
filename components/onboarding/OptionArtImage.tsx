import Image from "next/image"

import type { OptionArt } from "@/lib/onboarding/types"

// One crop of a sprite sheet. Preloading renders this too, so the browser
// fetches exactly the URL the card asks for.
const OptionArtImage = ({ art }: { art: OptionArt }) => {
  const { crop, slotWidth } = art

  return (
    <Image
      src={art.src}
      alt=""
      width={art.sheetWidth}
      height={art.sheetHeight}
      loading="eager"
      sizes={`${Math.ceil((slotWidth * crop.width) / 100)}px`}
      className="absolute max-w-none"
      style={{
        width: `${crop.width}%`,
        height: `${crop.height}%`,
        left: `${crop.left}%`,
        top: `${crop.top}%`,
      }}
    />
  )
}

export default OptionArtImage
