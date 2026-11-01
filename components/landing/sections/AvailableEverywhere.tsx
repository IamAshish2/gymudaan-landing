import { Fragment } from "react"
import Image from "next/image"

import Container from "@/components/landing/primitives/Container"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import Typography from "@/components/ui/Typography"
import { everywhere } from "@/lib/landing/content"
import devices from "@/public/landing/everywhere/devices.webp"
import glow from "@/public/landing/everywhere/glow.webp"

// The device render and the orange horizon behind it run edge to edge, so
// only the heading and the captions sit in the page container. Both images
// use the crops from Figma (nodes 1:719, 1:720).
const AvailableEverywhere = () => (
  <section
    id="everywhere"
    aria-labelledby="everywhere-title"
    className="relative py-section text-white"
  >
    <Container>
      <SectionHeader
        intro={everywhere}
        titleId="everywhere-title"
        titleClassName="max-w-[14.3em]"
      />
    </Container>

    <div className="relative mx-auto mt-section-content aspect-1725/634 w-full max-w-page">
      <div
        aria-hidden
        className="absolute inset-x-0 top-[81.5%] h-[8.5%] overflow-hidden"
      >
        <Image
          src={glow}
          alt=""
          sizes="112vw"
          className="absolute top-[-748.46%] left-[-6.66%] h-[937.65%] w-[112.45%] max-w-none"
        />
      </div>
      <div className="absolute inset-y-0 left-[10.72%] w-[78.55%] overflow-hidden">
        <Image
          src={devices}
          alt={everywhere.imageAlt}
          sizes="(min-width: 1728px) 1452px, 84vw"
          className="absolute top-[-8.49%] left-[-3.17%] h-[116.97%] w-[107.14%] max-w-none"
        />
      </div>
    </div>

    <Container>
      <ul className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between lg:mt-15 lg:px-6.5">
        {everywhere.tiers.map((tier, index) => (
          <Fragment key={tier.title}>
            {index > 0 ? (
              <li
                aria-hidden
                className="hidden h-18.5 w-px bg-white sm:block"
              />
            ) : null}
            <li className="flex items-center gap-4 lg:gap-7">
              <span className="flex w-12 shrink-0 justify-center lg:w-18">
                <Image
                  src={tier.icon}
                  alt=""
                  className="h-auto max-h-14 w-auto lg:max-h-none"
                />
              </span>
              <span className="flex flex-col gap-1">
                <Typography as="span" variant="titleSm" className="font-normal">
                  {tier.title}
                </Typography>
                <Typography as="span" variant="bodyLg">
                  {tier.caption}
                </Typography>
              </span>
            </li>
          </Fragment>
        ))}
      </ul>
    </Container>
  </section>
)

export default AvailableEverywhere
