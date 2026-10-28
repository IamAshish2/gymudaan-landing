import Section from "@/components/landing/primitives/Section"
import SectionHeader from "@/components/landing/primitives/SectionHeader"
import ControlTabs from "@/components/landing/sections/ControlTabs"
import { control } from "@/lib/landing/content"

const Control = () => (
  <Section
    id="control"
    labelledBy="control-title"
    tone="light"
    className="pt-0 lg:pt-0"
  >
    <SectionHeader
      intro={control}
      titleId="control-title"
      tone="light"
      className="lg:px-5"
    />
    <ControlTabs tabs={control.tabs} />
  </Section>
)

export default Control
