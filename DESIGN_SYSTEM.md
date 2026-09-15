# JADMAA Varmakalai — Design System Documentation

## 1. Color Palette

### Core Brand Colors

| Token               | Hex       | Usage                                                               |
| ------------------- | --------- | ------------------------------------------------------------------- |
| `jadmaa-red`        | `#B12B2B` | Primary brand color — buttons, links, active states, icons, accents |
| `jadmaa-redDark`    | `#8C1E1E` | Hover state for primary buttons/links                               |
| `jadmaa-charcoal`   | `#2B2521` | Headings, dark text, footer background                              |
| `jadmaa-cream`      | `#FAF6F0` | Page background, section backgrounds, navbar background             |
| `jadmaa-creamLight` | `#FFFDF9` | Lighter cream variant                                               |
| `jadmaa-border`     | `#E8DDD0` | Borders, dividers, card outlines                                    |
| `jadmaa-accentBlue` | `#046BD2` | Secondary accent (unused in current pages)                          |
| `jadmaa-textMuted`  | `#5C5148` | Body text, muted paragraphs                                         |
| `jadmaa-cardBg`     | `#FFFFFF` | Card backgrounds                                                    |
| `jadmaa-gold`       | `#D4AF37` | Gold accent (used in certificate cards)                             |

### Semantic Colors

| Color          | Hex                   | Usage                                   |
| -------------- | --------------------- | --------------------------------------- |
| Emerald        | `#10B981` / `#059669` | Success states, free badges, checkmarks |
| Amber          | `#F59E0B`             | Star ratings, certificate accents       |
| WhatsApp Green | `#25D366`             | Floating WhatsApp button                |
| Gray           | `#6B7280` / `#9CA3AF` | Secondary text, placeholders, icons     |

---

## 2. Typography

### Font Families

| Role                 | Font                    | Fallback   |
| -------------------- | ----------------------- | ---------- |
| Headings (`h1`–`h6`) | **Bricolage Grotesque** | sans-serif |
| Body                 | **Work Sans**           | sans-serif |

### Font Weights

- **Headings**: `400`, `600`, `700`, `800` (extrabold used for most headings)
- **Body**: `300`, `400`, `500`, `600`, `700`, italic `400`

### Type Scale (Tailwind Classes)

| Element    | Class                                 | Size               |
| ---------- | ------------------------------------- | ------------------ |
| Page H1    | `text-4xl`                            | 36px               |
| Hero H1    | `text-3xl sm:text-5xl lg:text-[54px]` | 30px → 48px → 54px |
| Section H2 | `text-3xl sm:text-4xl`                | 30px → 36px        |
| Card H3    | `text-lg` / `text-xl`                 | 18px / 20px        |
| Card H4    | `text-base`                           | 16px               |
| Body text  | `text-sm` / `text-base`               | 14px / 16px        |
| Small text | `text-xs`                             | 12px               |
| Micro text | `text-[10px]` / `text-[11px]`         | 10px / 11px        |

### Text Patterns

- **Section eyebrow labels**: `text-xs font-bold text-jadmaa-red uppercase tracking-wider`
- **Body paragraphs**: `text-sm text-jadmaa-textMuted leading-relaxed`
- **Links**: `font-bold text-sm text-jadmaa-red hover:text-jadmaa-redDark`
- **Muted labels**: `text-xs text-jadmaa-textMuted`

---

## 3. Buttons

### Primary Button (`.btn-jadmaa-primary`)

```css
background: #b12b2b;
color: #ffffff;
font-family: "Work Sans", sans-serif;
font-weight: 600;
font-size: 15px;
padding: 12px 28px;
border-radius: 6px;
border: 1px solid #b12b2b;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
transition: all 0.25s ease;
```

**Hover**: `background: #8C1E1E; transform: translateY(-2px); box-shadow: 0 8px 18px rgba(177,43,43,0.22);`

### Outline Button (`.btn-jadmaa-outline`)

```css
background: transparent;
color: #b12b2b;
font-family: "Work Sans", sans-serif;
font-weight: 600;
font-size: 15px;
padding: 12px 28px;
border-radius: 6px;
border: 1px solid #b12b2b;
transition: all 0.25s ease;
```

**Hover**: `background: #B12B2B; color: #ffffff; transform: translateY(-2px);`

### Inline Text Link

```css
font-weight: bold;
font-size: 14px;
color: #B12B2B;
hover: color: #8C1E1E;
```

Often paired with `ArrowRight` icon.

### Small Action Buttons (Cards, Forms)

- **Solid**: `px-4 py-2.5 bg-jadmaa-red hover:bg-jadmaa-redDark text-white font-bold text-xs rounded-xl shadow`
- **Outline**: `px-4 py-2 bg-white border border-jadmaa-border hover:border-jadmaa-red text-jadmaa-charcoal hover:text-jadmaa-red text-xs font-bold rounded-lg`
- **Category tabs**: `px-4 py-2 rounded-xl text-xs font-bold` — active: `bg-jadmaa-red text-white shadow`; inactive: `bg-white text-jadmaa-charcoal hover:bg-jadmaa-cream hover:text-jadmaa-red border border-jadmaa-border`

---

## 4. Cards

### Standard Card (`.jd-card`)

```css
background: #ffffff;
border: 1px solid #e8ddd0;
border-radius: 12px;
transition:
  transform 0.35s ease,
  box-shadow 0.35s ease,
  border-color 0.35s ease;
```

**Hover**: `transform: translateY(-5px); box-shadow: 0 14px 34px rgba(43,37,33,0.10); border-color: #E0CDB8;`

### Card Variants

| Type             | Classes                                                                |
| ---------------- | ---------------------------------------------------------------------- |
| Course card      | `jd-card overflow-hidden flex flex-col h-full group`                   |
| Info card        | `bg-jadmaa-cream/60 p-6 rounded-2xl border border-jadmaa-border`       |
| Testimonial card | `bg-white rounded-lg border border-jadmaa-border p-5 shadow-sm`        |
| Branch card      | `bg-jadmaa-cream rounded-lg border border-jadmaa-border p-5`           |
| Wellness card    | `p-4 bg-white rounded-xl border border-jadmaa-border`                  |
| Certificate card | `bg-white border-2 border-jadmaa-border rounded-2xl p-6 shadow-jadmaa` |

### Card Image Hover

```css
transition: transform 0.5s ease;
group-hover: scale(105);
```

---

## 5. Layouts

### Page Structure Pattern

Every page follows the same structure:

1. **Page Banner** — `bg-jadmaa-cream py-12 border-b border-jadmaa-border`
   - Eyebrow label (red uppercase)
   - H1 heading (charcoal, extrabold)
   - Description paragraph (muted)
2. **Content Section** — `py-16 bg-white border-b border-jadmaa-border`
3. **Alternating backgrounds**: cream → white → cream → white

### Grid System

- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **2-column split**: `grid grid-cols-1 lg:grid-cols-12 gap-12` with `lg:col-span-7` / `lg:col-span-5` or `lg:col-span-6` / `lg:col-span-6`
- **3-column grid**: `grid grid-cols-1 md:grid-cols-3 gap-8`
- **4-column grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- **Course grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`

### Navbar

- **Background**: `#FAF6F0` (cream)
- **Sticky**: `sticky top-0 z-50`
- **Border**: `border-b border-jadmaa-border`
- **Padding**: `py-4` normal, `py-3` when scrolled (with `shadow-sm`)
- **Logo**: Image + "JADMAA" (charcoal) + "VARMAKALAI" (red)
- **Nav links**: `text-sm font-semibold` — active: red with 2px red underline; inactive: muted with red hover
- **Mobile**: Hamburger menu with slide-down drawer

### Footer

- **Background**: `bg-jadmaa-charcoal text-white`
- **Top border**: `border-t-4 border-jadmaa-red`
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10`
- **Social icons**: `w-9 h-9 rounded-full bg-gray-800 hover:bg-jadmaa-red`
- **Copyright bar**: `text-xs text-gray-400`

---

## 6. Animations & Transitions

### Hero Float Animation

```css
@keyframes jdHeroFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-jadmaa-float {
  animation: jdHeroFloat 4s ease-in-out infinite;
}
```

Applied to hero practitioner image. Disabled for `prefers-reduced-motion`.

### Scroll Reveal (`.jd-reveal-child`)

```css
@keyframes jdPop {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.jd-reveal-child {
  animation: jdPop 0.65s cubic-bezier(0.22, 0.61, 0.36, 1) both;
}
```

Staggered delays: 0.05s, 0.15s, 0.25s, 0.35s.

### Card Hover

- **Lift**: `transform: translateY(-5px)` over 0.35s
- **Shadow**: `0 14px 34px rgba(43,37,33,0.10)`
- **Border**: `#E0CDB8`

### Button Hover

- **Lift**: `transform: translateY(-2px)` over 0.25s
- **Color shift**: red → dark red

### Image Zoom

- **Course card thumbnails**: `scale(105)` over 0.5s on group hover

### WhatsApp Button

- **Fixed position**: `bottom-24px right-24px z-99999`
- **Size**: 50×50px circle
- **Hover**: `scale(1.08)` with green shadow

### Pulse Animation

- **Live class badge**: `animate-pulse` with red dot indicator

### Progress Bars

- **Transition**: `transition-all duration-500`
- **Fill**: `bg-jadmaa-red`

---

## 7. Forms

### Input Fields

```css
w-full px-3.5 py-2.5 rounded-xl border border-jadmaa-border bg-white text-xs text-jadmaa-charcoal focus:border-jadmaa-red outline-none
```

### Form Labels

```css
text-xs font-bold text-jadmaa-charcoal
```

### Form Layout

- **2-column**: `grid grid-cols-1 sm:grid-cols-2 gap-4`
- **Full width**: `space-y-5` on form container

### Submit Buttons

```css
w-full py-3.5 px-6 bg-jadmaa-red hover:bg-jadmaa-redDark text-white font-bold text-sm rounded-xl shadow-lg transition-all
```

### Success State

- **Icon**: `w-16 h-16 rounded-full bg-emerald-100 text-emerald-600` with `CheckCircle2`
- **Heading**: `font-heading font-extrabold text-2xl text-jadmaa-charcoal`

---

## 8. Icons

- **Library**: `lucide-react`
- **Common icons**: `CheckCircle2`, `ArrowRight`, `Star`, `MapPin`, `Clock`, `Phone`, `Mail`, `ShieldCheck`, `Award`, `HeartPulse`, `Users`, `BookOpen`, `PlayCircle`, `ChevronRight`, `ChevronDown`, `ChevronUp`, `Search`, `Filter`, `Send`, `Menu`, `X`, `User`, `LogOut`, `Lock`, `Eye`, `EyeOff`, `Video`, `Calendar`, `ExternalLink`, `Download`, `GraduationCap`, `Layers`, `Settings`, `ShieldAlert`, `CheckSquare`, `HelpCircle`, `Play`, `UserPlus`, `ArrowLeft`
- **Icon color**: `text-jadmaa-red` for brand accents
- **Icon size**: `w-4 h-4` (small), `w-5 h-5` (medium), `w-6 h-6` (large), `w-10 h-10` (hero)

---

## 9. Page-Specific Findings

### About Page

- **Banner**: Standard page banner with "Our Organization" eyebrow
- **History section**: 2-column with image right (`lg:col-span-6` each)
- **Core values**: 3-column grid of cream cards with icon boxes (`w-10 h-10 rounded-lg bg-jadmaa-red/10 text-jadmaa-red`)
- **Guru spotlight**: `bg-jadmaa-cream rounded-3xl p-8` with logo image left, text right

### Courses Page

- **Banner**: Standard page banner with "Academy Curriculum" eyebrow
- **Filter bar**: `bg-jadmaa-cream/60 p-4 rounded-2xl border border-jadmaa-border`
  - Search input with `Search` icon
  - Level dropdown select
  - Category tabs (All, Varmakalai, Self Defence, Kids, Wellness)
- **Results grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Empty state**: `py-16 text-center bg-jadmaa-cream/40 rounded-2xl border border-dashed border-jadmaa-border` with `BookOpen` icon

### Contact Page

- **Banner**: Standard page banner with "Admissions & Enquiries" eyebrow
- **Form card**: `lg:col-span-7 bg-jadmaa-cream/60 p-8 rounded-3xl border border-jadmaa-border shadow-sm`
- **Info column**: `lg:col-span-5` with contact cards (`p-4 bg-jadmaa-cream rounded-2xl border border-jadmaa-border flex items-start space-x-3`)
- **Branch cards**: `p-3.5 bg-white rounded-xl border border-jadmaa-border text-xs`

### Blog

- **Data exists** in `src/data/blog.ts` (3 posts with full content, categories, tags)
- **No Blog page component** exists in routes — blog data is currently unused
- Blog post type: `BlogPost` in `src/types/index.ts`

### Careers

- **No dedicated Careers page** — nav item "Careers" points to `/contact`
- Careers content is referenced in the Home page "Growth & Leadership" section
- Footer links to Contact for career inquiries

### FAQ Page

- **Banner**: Standard page banner with "Help Center" eyebrow
- **Category tabs**: Same pattern as Courses page
- **Accordion**: `border border-jadmaa-border rounded-2xl bg-white overflow-hidden shadow-sm` with `HelpCircle` icon, `ChevronDown`/`ChevronUp` toggles

### Course Details Page

- **Hero banner**: `bg-jadmaa-charcoal text-white py-12 border-b-4 border-jadmaa-red`
- **Enrollment card**: `bg-white rounded-2xl p-6 text-jadmaa-charcoal shadow-2xl border border-jadmaa-border`
- **Tabs**: `border-b border-jadmaa-border` with active tab having `border-jadmaa-red text-jadmaa-red`

### Dashboard Pages

- **Header**: `bg-jadmaa-cream py-8 border-b border-jadmaa-border` with badge `bg-jadmaa-red text-white`
- **Progress bars**: `bg-jadmaa-red h-2.5 rounded-full` on `bg-gray-100` track
- **Live class card**: White card with `animate-pulse` red badge
- **Certificate card**: White card with gold gradient top bar (`from-jadmaa-red via-amber-500 to-jadmaa-red`)

### Auth Pages

- **Centered card**: `max-w-md w-full bg-white p-8 rounded-2xl border border-jadmaa-border shadow-md`
- **Inputs with icons**: `relative` wrapper with icon positioned `absolute left-3.5 top-3`
- **Submit buttons**: Full-width red with icon

---

## 10. Shadow System

| Token                | Value                                 | Usage               |
| -------------------- | ------------------------------------- | ------------------- |
| `shadow-jadmaa`      | `0 4px 20px rgba(43, 37, 33, 0.08)`   | Default card shadow |
| `shadow-jadmaaHover` | `0 10px 30px rgba(177, 43, 43, 0.12)` | Hover shadow        |
| `shadow-sm`          | Tailwind default                      | Subtle elevation    |
| `shadow-md`          | Tailwind default                      | Medium elevation    |
| `shadow-lg`          | Tailwind default                      | Large elevation     |
| `shadow-xl`          | Tailwind default                      | Extra large         |
| `shadow-2xl`         | Tailwind default                      | Max elevation       |

---

## 11. Border Radius Scale

| Radius         | Usage                              |
| -------------- | ---------------------------------- |
| `rounded`      | Small badges, tags                 |
| `rounded-lg`   | Inputs, small cards                |
| `rounded-xl`   | Cards, buttons, inputs             |
| `rounded-2xl`  | Cards, containers, images          |
| `rounded-3xl`  | Large containers, feature sections |
| `rounded-full` | Icons, avatars, social buttons     |

---

## 12. Spacing System

- **Section padding**: `py-12`, `py-16`
- **Container padding**: `px-4 sm:px-6 lg:px-8`
- **Card padding**: `p-4`, `p-5`, `p-6`, `p-8`
- **Grid gaps**: `gap-4`, `gap-6`, `gap-8`, `gap-10`, `gap-12`
- **Vertical rhythm**: `space-y-2`, `space-y-3`, `space-y-4`, `space-y-5`, `space-y-6`, `space-y-8`, `space-y-10`, `space-y-12`, `space-y-16`

---

## 13. Responsive Breakpoints

| Breakpoint | Prefix    | Usage                                 |
| ---------- | --------- | ------------------------------------- |
| Mobile     | (default) | Single column layouts                 |
| Small      | `sm:`     | 2-column grids, larger text           |
| Medium     | `md:`     | 3-column grids, desktop nav           |
| Large      | `lg:`     | 12-column grids, multi-column layouts |

---

## 14. Key Findings & Gaps

### Missing Pages

1. **Blog page** — Data exists (`src/data/blog.ts`) but no page component or route
2. **Careers page** — Nav item exists but points to `/contact`; no dedicated page

### Design Consistency

- All pages follow the same banner → content → alternating background pattern
- All buttons use the same red/outline style system
- All cards use the same border/radius/shadow system
- Typography is consistent across all pages
- Color usage is strictly controlled to the jadmaa palette

### Notable Patterns

- **Section eyebrows**: Every section has a small red uppercase label above the heading
- **Learn More links**: Red text with `ArrowRight` icon, hover to darker red
- **Checkmark lists**: `CheckCircle2` icon in red with muted text
- **Image treatment**: Rounded corners (`rounded-2xl`), border, shadow on all content images
