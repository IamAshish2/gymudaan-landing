import Image from "next/image"

import type { Feature } from "@/lib/landing/types"
import { cn } from "@/lib/utils"

type FeatureArtProps = {
  feature: Feature
  sizes: string
}

const FeatureArt = ({ feature, sizes }: FeatureArtProps) => (
  <Image
    src={feature.image}
    alt={feature.imageAlt}
    fill
    sizes={sizes}
    className={cn(
      feature.imageCrop ? "object-cover object-right" : "object-contain"
    )}
  />
)

export default FeatureArt
