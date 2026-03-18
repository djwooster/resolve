# Resolve — Claude Code Guide

## What this is
Resolve is a revenue enforcement SaaS. It monitors leads in a connected CRM (GoHighLevel) in real time, flags slow follow-up and missed contacts, and surfaces the dollar value at risk. Target users: sales managers, agency owners, service businesses.

## Stack
- **Next.js 15** App Router, TypeScript, Tailwind CSS 4
- **Framer Motion** for all animations
- **shadcn/ui** + Radix primitives
- **GoHighLevel API** for live CRM data (`lib/use-resolve-data.ts`)
- **Twilio** for browser-based calling (`lib/call-provider.tsx`)

## Route structure
```
app/
  layout.tsx              # Minimal root — no sidebar, no providers
  (marketing)/
    layout.tsx            # Passthrough
    page.tsx              # Marketing homepage (/)
  (app)/
    layout.tsx            # Sidebar + CallProvider + CallWidget
    dashboard/page.tsx    # /dashboard
    violations/page.tsx
    leads/page.tsx
    rules/page.tsx
    settings/page.tsx
```

## Design system

**Inspired by Linear's dark mode.** Mostly black, white, and grey — color used only to communicate meaning.

| Token | Value | Use |
|---|---|---|
| Page bg | `#0A0A0B` | Base background |
| Card bg | `#0D0D0F` | Elevated surfaces |
| Border | `border-white/[0.06]` | Default |
| Border (emphasis) | `border-white/[0.1]` | Featured cards |
| Red | `text-red-400` | Risk, violations, critical |
| Emerald | `text-emerald-400` | Recovery, success, positive |
| Amber | `text-amber-400` | Warnings, stars |
| Blue | `text-blue-400` | Info, escalated, coming soon |

**Typography**
- Section labels: `text-xs text-zinc-600 uppercase tracking-widest font-medium`
- Two-tone headlines: `<span className="text-white">First phrase</span> <span className="text-zinc-600">second phrase.</span>`
- Heading size: `text-[clamp(1.5rem,2.5vw,2.25rem)] font-semibold tracking-tighter leading-[1.1]`

**Components**
- Metric cards: left-border accent only, no colored backgrounds or glows
- Badges/pills: colored text + low-opacity border + matching bg tint (e.g. `text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.06]`)
- Icons: Lucide, `w-4 h-4`, `strokeWidth={1.5}`

## Animations
All variants live in `lib/motion.ts`. Always import from there — don't define inline variants.
```ts
import { fadeUp, fadeIn, staggerContainer, slideFromLeft, slideFromRight } from '@/lib/motion';
```
Use `whileInView` + `viewport={{ once: true, margin: '-80px' }}` for scroll-triggered sections.

## Key rules
- **No layout changes without explicit ask** — reskins only touch color, spacing, typography
- **No emoji in UI** — use colored dots, left-border accents, or SVG icons instead
- **No colored card backgrounds** — color belongs on text and borders, not `bg-*`
- **Clear `.next` cache** after any route restructure before running `tsc --noEmit`
