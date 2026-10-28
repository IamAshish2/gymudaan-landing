import Link from "next/link"

import CopyrightYear from "@/components/landing/layout/CopyrightYear"
import SocialIcon, {
  type SocialNetwork,
} from "@/components/landing/layout/SocialIcon"
import Container from "@/components/landing/primitives/Container"
import Typography from "@/components/ui/Typography"
import { footer, footerColumns } from "@/lib/landing/content"
import { ROUTES } from "@/lib/routes"
import { SITE } from "@/lib/site"

const SOCIAL_LABELS: Record<SocialNetwork, string> = {
  x: "X",
  github: "GitHub",
  linkedin: "LinkedIn",
  youtube: "YouTube",
}

const linkClass =
  "rounded-badge text-body text-white/70 transition-colors duration-300 ease-standard outline-none hover:text-white focus-visible:ring-[3px] focus-visible:ring-brand/60"

// Rebuilt from the flat Figma footer image (node 1:257). `id="contact"` is
// the target for every "Contact Us" / "Request a demo" link until a contact
// page exists.
const LandingFooter = () => (
  <footer id="contact" className="relative bg-surface-dark text-white">
    {/* Watermark, cut off by the footer rule like the Figma reference. */}
    <div
      aria-hidden
      className="flex h-[clamp(5rem,18.8vw,20.3rem)] items-end justify-center overflow-hidden select-none"
    >
      <span className="translate-y-[29%] text-watermark font-semibold tracking-tighter text-ghost">
        {footer.watermark}
      </span>
    </div>

    <div className="relative border-t border-white/10 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-40 before:bg-[radial-gradient(ellipse_45%_100%_at_50%_0%,rgb(255_255_255/0.07),transparent)]">
      <Container className="relative pt-16 pb-10 lg:pt-24">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-[2fr_repeat(4,1fr)] lg:gap-8">
          <div className="col-span-2 flex flex-col gap-6 md:col-span-4 lg:col-span-1">
            <Link
              href={ROUTES.home}
              aria-label={`${SITE.name} home`}
              className="w-fit rounded-badge outline-none focus-visible:ring-[3px] focus-visible:ring-brand/60"
            >
              <Typography as="span" variant="title" className="font-semibold">
                GYM <span className="text-brand">UDAAN.</span>
              </Typography>
            </Link>
            <Typography
              variant="body"
              className="-mt-4 max-w-[17em] text-white/80"
            >
              {SITE.tagline}
            </Typography>
            <Typography
              as="address"
              variant="body"
              className="text-white/80 not-italic"
            >
              {SITE.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </Typography>

            <ul className="flex items-center gap-3" aria-label="Social media">
              {(Object.keys(SITE.socials) as SocialNetwork[]).map((network) => (
                <li key={network}>
                  <a
                    href={SITE.socials[network]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE.name} on ${SOCIAL_LABELS[network]}`}
                    className="flex size-10.5 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 ease-standard outline-none hover:border-white/25 hover:bg-white/10 focus-visible:ring-[3px] focus-visible:ring-brand/60"
                  >
                    <SocialIcon network={network} className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-badge">
              <span
                aria-hidden
                className="size-2.5 rounded-full bg-status-ok"
              />
              {footer.status}
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <Typography as="h2" variant="body" className="font-medium">
                {column.title}
              </Typography>
              <ul className="mt-6 flex flex-col gap-4 lg:mt-8">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/25 pt-8 text-badge text-white/70 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p>
            © <CopyrightYear /> {SITE.name}. All rights reserved.
          </p>
          <p>{footer.closing}</p>
        </div>
      </Container>
    </div>
  </footer>
)

export default LandingFooter
