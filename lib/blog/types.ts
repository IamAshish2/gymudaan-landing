import type { StaticImageData } from "next/image"

export type BlogPost = {
  id: string
  title: string
  category: string
  author: string
  date: string
  image?: {
    src: StaticImageData
    /** Crop from Figma, as classes on the image. Defaults to object-cover. */
    cropClassName?: string
  }
}
