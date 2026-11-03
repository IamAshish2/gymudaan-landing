import LandingFooter from "@/components/landing/layout/LandingFooter"
import LandingHeader from "@/components/landing/layout/LandingHeader"
import ActionLinks from "@/components/landing/primitives/ActionLinks"
import PageIntro from "@/components/landing/primitives/PageIntro"
import { notFoundPage } from "@/lib/landing/content"
import { SITE } from "@/lib/site"

// Every unknown URL lands here, so it wears the marketing shell: visitors keep
// the header to find their way, and the page matches the rest of the site.
// Only global-not-found may export `metadata`, so the title is set inline
// (React hoists it into <head>).
const NotFound = () => (
  <div className="flex min-h-svh flex-col bg-surface-dark text-white">
    <title>{`${notFoundPage.title} | ${SITE.name}`}</title>
    <LandingHeader />
    <main className="flex flex-1 flex-col pb-section">
      <PageIntro
        badge={notFoundPage.badge}
        title={notFoundPage.heading}
        description={notFoundPage.description}
        titleClassName="text-balance"
        descriptionClassName="max-w-[30em] text-pretty"
      >
        <ActionLinks actions={notFoundPage.actions} className="mt-8" />
      </PageIntro>
    </main>
    <LandingFooter />
  </div>
)

export default NotFound
