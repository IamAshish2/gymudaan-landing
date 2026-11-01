import Container from "@/components/landing/primitives/Container"
import RichTextLine from "@/components/landing/primitives/RichTextLine"
import ClientLogoList from "@/components/landing/sections/ClientLogoList"
import Typography from "@/components/ui/Typography"
import { clients } from "@/lib/landing/content"

const ClientLogos = () => (
  <section
    aria-labelledby="clients-title"
    className="pt-16 text-white lg:pt-26"
  >
    <Container>
      <Typography variant="display" id="clients-title" className="max-w-[28em]">
        <RichTextLine text={clients.title} />
      </Typography>

      <ClientLogoList className="mt-8 lg:mt-10" />
    </Container>
  </section>
)

export default ClientLogos
