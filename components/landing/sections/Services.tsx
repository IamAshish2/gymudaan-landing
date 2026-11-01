import Image from "next/image"
import Link from "next/link"

import Section from "@/components/landing/primitives/Section"
import SnapCarousel from "@/components/landing/primitives/SnapCarousel"
import Typography from "@/components/ui/Typography"
import { services } from "@/lib/landing/content"
import type { Service } from "@/lib/landing/types"
import { linkTarget } from "@/lib/site"
import arrowContact from "@/public/landing/services/arrow-contact.svg"

const ServiceCard = ({ service }: { service: Service }) => (
  // Slides after the active one shrink to 88% (Figma's peeking card) and
  // grow back as they snap into place.
  <article className="flex h-full origin-left flex-col rounded-tile border border-line-dark p-3 transition-transform duration-500 ease-emphasized group-data-[active=false]/slide:scale-[0.883] motion-reduce:transition-none sm:p-4 lg:p-6">
    <div className="relative aspect-[1188/706] overflow-hidden rounded-panel bg-surface-raised">
      {service.image ? (
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1728px) 1188px, 80vw"
          className="object-cover"
        />
      ) : null}
    </div>

    <div className="flex flex-1 flex-col gap-6 px-1 pt-6 pb-2 sm:px-2 lg:flex-row lg:items-end lg:justify-between lg:px-3 lg:pt-14 lg:pb-6">
      <div className="flex max-w-173 flex-col gap-3 lg:gap-4">
        <Typography variant="titleLg">{service.title}</Typography>
        <Typography variant="bodyLg" className="opacity-80">
          {service.description}
        </Typography>
      </div>

      <Link
        href={service.cta.href}
        {...linkTarget(service.cta.href)}
        className="group/cta flex shrink-0 items-center gap-3 self-start rounded-badge text-title-sm font-medium transition-opacity outline-none hover:opacity-80 focus-visible:ring-[3px] focus-visible:ring-brand/60 lg:self-auto"
      >
        {service.cta.label}
        <span className="sr-only">about {service.title}</span>
        <Image
          src={arrowContact}
          alt=""
          className="h-auto w-5 transition-transform duration-300 ease-standard group-hover/cta:translate-x-1 motion-reduce:transition-none lg:w-6"
        />
      </Link>
    </div>
  </article>
)

const Services = () => (
  <Section id="services" labelledBy="services-title">
    <SnapCarousel
      intro={services}
      titleId="services-title"
      id="services-track"
      label="services"
      arrows="dark"
      trackClassName="-mr-gutter gap-4 pr-gutter sm:gap-8 lg:gap-15"
      slideClassName="basis-[90%] md:basis-[81%]"
    >
      {services.items.map((service) => (
        <ServiceCard key={service.title} service={service} />
      ))}
    </SnapCarousel>
  </Section>
)

export default Services
