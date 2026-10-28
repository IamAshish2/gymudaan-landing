---
name: frontend-design-system
description: Token-driven design process for frontend UI work. Use BEFORE building any new interface, page, surface, or visual redesign — it forces a deliberate visual direction and a complete semantic design-token system before any component code is written. Triggers on "build a page/UI", "design a landing page", "new surface", "redesign", "make it look better", "style this", or any greenfield frontend work. Not needed for small tweaks inside an already-tokenized system.
---

# Frontend Design System

Transform frontend design work from ad-hoc styling into a deliberate, token-driven design system process. Every UI implementation must begin with a unique visual direction and must encode that direction into reusable design tokens before writing components.

This skill is inspired by high-end design studio practices. The goal is to avoid generic AI-generated interfaces and create interfaces with a distinct visual identity, consistent rules, and scalable implementation.

## Integration with existing projects

If the project already has a design system (tokens, a `design-system.md`, a shadcn/Tailwind theme, brand guidelines), that system is the source of truth: run every phase below **within** it — extend its tokens rather than creating a parallel token tree, and express new tokens in the project's existing mechanism (e.g. Tailwind v4 `@theme` / CSS custom properties instead of new `tokens/*.ts` files). The phases, naming rules, and self-critique loop still apply in full.

## Core principle

Never write UI code directly from inspiration alone.

Before building any interface:

1. Understand the subject, audience, and single most important user action.
2. Create a unique visual direction.
3. Define a complete design token system.
4. Validate that the token system reflects the product identity.
5. Build all components exclusively using those tokens.

No arbitrary values are allowed in production UI code.

## Design process

Always work in these phases.

### Phase 1 — Design discovery

Before coding, define:

- Product subject:
- Target audience:
- Primary user goal:
- Emotional direction:
- Visual references:
- What makes this design different from common AI-generated designs:

Reject generic directions such as:

- cream background + serif + terracotta by default
- black background + neon accent by default
- newspaper layout by default
- excessive gradients
- excessive rounded cards
- meaningless numbered sections
- decorative animations without purpose

If using any of these, justify why they belong specifically to the product.

### Phase 2 — Create design tokens

Before creating components, generate a complete token system.

Tokens must be grouped into:

1. Color tokens
2. Typography tokens
3. Spacing tokens
4. Layout tokens
5. Border/radius tokens
6. Shadow/elevation tokens
7. Motion tokens
8. Component tokens
9. Responsive tokens

Example structure (for a project without an existing token mechanism):

```
tokens/
 ├── colors.ts
 ├── typography.ts
 ├── spacing.ts
 ├── motion.ts
 ├── layout.ts
 ├── components.ts
 └── index.ts
```

The token system must include semantic naming.

Bad:

```
--blue-500
--gray-200
--padding-16
```

Good:

```
--color-brand-primary
--color-surface-muted
--space-component-gap
--text-display-title
--radius-card-default
```

## Color token rules

Create a palette of 4–8 intentional colors.

Every color must have:

- name
- hex value
- purpose

Example:

```
Primary:  --color-brand-primary
Surface:  --color-background-primary
Text:     --color-content-primary
Accent:   --color-interactive-accent
```

Never place raw colors directly inside components.

Bad:

```css
color: #ff6633;
```

Good:

```css
color: var(--color-brand-primary);
```

## Typography token rules

Define typography roles:

- **Display** — used sparingly for identity.
- **Heading** — for hierarchy.
- **Body** — for readability.
- **Utility** — for labels, metadata, navigation.

Every typography token must define:

- font family
- size
- weight
- line height
- letter spacing

Example:

```
--font-display-family
--font-display-size-xl
--font-display-weight
```

Never randomly choose fonts inside components.

## Spacing token rules

Use a spacing scale.

Example:

```
--space-1
--space-2
--space-3
--space-4
--space-5
--space-6
```

Components must consume spacing tokens.

Never write:

```css
padding: 37px;
```

unless there is a documented design reason.

## Layout token rules

Define:

- max content width
- page gutters
- grid columns
- section spacing
- container behavior

Example:

```
--layout-content-width
--layout-page-padding
--layout-section-gap
```

## Component token rules

Components must use semantic tokens.

Example — Button:

```
--button-height
--button-padding
--button-radius
--button-primary-background
--button-primary-hover
```

Example — Card:

```
--card-background
--card-border
--card-radius
--card-padding
```

Never allow components to invent their own styling values.

## Motion rules

Motion must communicate meaning.

Define durations:

```
--motion-fast
--motion-standard
--motion-slow
```

Define easing:

```
--ease-standard
--ease-emphasized
```

Avoid:

- constant bouncing
- unnecessary scroll animations
- excessive hover effects

Prefer:

- meaningful transitions
- state changes
- intentional entrances

Respect `prefers-reduced-motion`.

## Layout design requirements

Every page must have a clear visual thesis.

The hero section must communicate:

- what this product is
- who it is for
- why it matters

Avoid generic hero patterns:

- giant headline
- three stats
- gradient background
- floating cards

unless they are genuinely appropriate.

## Implementation rules

When generating frontend code:

1. Create tokens first.
2. Import tokens into components.
3. Use semantic variables everywhere.
4. Avoid duplicated values.
5. Avoid CSS specificity conflicts.
6. Keep components clean.
7. Make responsive behavior token-driven.
8. Support keyboard accessibility.
9. Support reduced motion.
10. Maintain consistency across pages.

## Self-critique loop

Before finalizing any UI, review:

1. Does this look like it could belong to any random SaaS startup?
   - If yes, redesign.
2. Is there one memorable signature element?
   - If no, introduce one.
3. Are tokens meaningful?
   - If a token only represents a raw value, rename it.
4. Are components using tokens?
   - If no, refactor.
5. Are there unnecessary decorations?
   - Remove one.

## Deliverable format

For every new frontend project, output:

1. Design direction summary
2. Token architecture
3. Complete token definitions
4. Component styling rules
5. Implementation plan
6. Final UI code

The final implementation must feel like a designed product, not a collection of generated components.

The design system is the source of truth.
Components are only consumers of the system.
