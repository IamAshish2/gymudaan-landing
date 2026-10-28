"use client"

import * as React from "react"

import type { TImageElement } from "platejs"
import type { PlateElementProps } from "platejs/react"

import Image from "next/image"
import { PlateElement } from "platejs/react"

// Uploaded images carry no known width/height (the upload API returns just a
// URL), so next/image's `fill` needs a sized wrapper — start at a 16/9 guess
// and snap to the real ratio once the image loads, to avoid stretching/
// distorting non-16/9 photos.
export function ImageElement(props: PlateElementProps<TImageElement>) {
  const [aspectRatio, setAspectRatio] = React.useState(16 / 9)

  return (
    <PlateElement {...props} className="py-2">
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-md"
        style={{ aspectRatio }}
        contentEditable={false}
      >
        <Image
          src={props.element.url}
          alt=""
          fill
          sizes="(min-width: 640px) 36rem, 100vw"
          className="object-contain"
          onLoad={(event) => {
            const { naturalWidth, naturalHeight } = event.currentTarget

            if (naturalWidth && naturalHeight) {
              setAspectRatio(naturalWidth / naturalHeight)
            }
          }}
        />
      </div>
      {props.children}
    </PlateElement>
  )
}
