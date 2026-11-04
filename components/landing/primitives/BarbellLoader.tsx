import Typography from "@/components/ui/Typography"
import { cn } from "@/lib/utils"

type BarbellLoaderProps = {
  label?: string
  className?: string
}

// Gym-style loading state: the plates slide onto the bar, then the bar does
// slow reps while its floor shadow shrinks and grows. Pure SVG + CSS (see
// `.barbell-*` in globals.css), so it costs no JS. With reduced motion it
// shows a still, loaded bar.
const BarbellLoader = ({
  label = "Loading the bar…",
  className,
}: BarbellLoaderProps) => (
  <div
    role="status"
    aria-live="polite"
    className={cn("flex flex-col items-center gap-6", className)}
  >
    <svg
      aria-hidden
      viewBox="0 0 160 84"
      className="barbell w-36 overflow-visible sm:w-44"
    >
      <ellipse
        className="barbell-shadow fill-line-strong"
        cx="80"
        cy="78"
        rx="56"
        ry="3"
      />
      <g className="barbell-lift">
        {/* Bar and collars */}
        <rect
          className="fill-nav-muted"
          x="6"
          y="38"
          width="148"
          height="4"
          rx="2"
        />
        <rect
          className="fill-nav-muted"
          x="44"
          y="34"
          width="4"
          height="12"
          rx="1"
        />
        <rect
          className="fill-nav-muted"
          x="112"
          y="34"
          width="4"
          height="12"
          rx="1"
        />

        {/* Left plates, heaviest innermost */}
        <g className="barbell-plate barbell-plate-left [--plate:0]">
          <rect
            className="fill-brand"
            x="32"
            y="18"
            width="10"
            height="44"
            rx="3"
          />
        </g>
        <g className="barbell-plate barbell-plate-left [--plate:1]">
          <rect
            className="fill-hero-fg"
            x="22"
            y="26"
            width="8"
            height="28"
            rx="2.5"
          />
        </g>

        {/* Right plates */}
        <g className="barbell-plate barbell-plate-right [--plate:0]">
          <rect
            className="fill-brand"
            x="118"
            y="18"
            width="10"
            height="44"
            rx="3"
          />
        </g>
        <g className="barbell-plate barbell-plate-right [--plate:1]">
          <rect
            className="fill-hero-fg"
            x="130"
            y="26"
            width="8"
            height="28"
            rx="2.5"
          />
        </g>
      </g>
    </svg>

    <Typography variant="body" className="opacity-60">
      {label}
    </Typography>
  </div>
)

export default BarbellLoader
