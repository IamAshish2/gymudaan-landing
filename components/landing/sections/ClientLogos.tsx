import Image from "next/image"

import Container from "@/components/landing/primitives/Container"
import RichTextLine from "@/components/landing/primitives/RichTextLine"
import Typography from "@/components/ui/Typography"
import { clients } from "@/lib/landing/content"
import { cn } from "@/lib/utils"

const ClientLogos = () => (
  <section
    aria-labelledby="clients-title"
    className="pt-16 text-white lg:pt-26"
  >
    <Container>
      <Typography variant="display" id="clients-title" className="max-w-[28em]">
        <RichTextLine text={clients.title} />
      </Typography>

      <ul className="mt-8 grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:mt-10 lg:flex lg:justify-between lg:gap-4">
        {clients.logos.map((logo) => (
          <li
            key={logo.name}
            className={cn(
              "flex justify-center lg:block",
              !logo.image && "col-span-full sm:col-span-1"
            )}
          >
            {logo.image ? (
              <Image
                src={logo.image}
                alt={logo.name}
                sizes="(min-width: 1024px) 170px, 30vw"
                className="h-16 w-auto object-contain sm:h-20 lg:h-26"
              />
            ) : (
              <Typography
                as="span"
                variant="title"
                className="whitespace-nowrap"
              >
                {logo.name}
              </Typography>
            )}
          </li>
        ))}
      </ul>
    </Container>
  </section>
)

export default ClientLogos
