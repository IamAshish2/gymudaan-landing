import RichTextLine from "@/components/landing/primitives/RichTextLine"
import Section from "@/components/landing/primitives/Section"
import StatsRow from "@/components/landing/sections/StatsRow"
import Typography from "@/components/ui/Typography"
import { stats } from "@/lib/landing/content"

const Stats = () => (
  <Section labelledBy="stats-title" tone="light" className="pt-0 lg:pt-0">
    <Typography variant="display" id="stats-title" className="text-center">
      <RichTextLine text={stats.title} />
    </Typography>
    <StatsRow stats={stats.items} />
  </Section>
)

export default Stats
