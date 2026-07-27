# Design System: FeminaCare Enterprise Healthcare Platform

## 1. Brand & Aesthetic Overview
The **FeminaCare Enterprise Healthcare Platform** design system is engineered for a premium enterprise healthcare environment, specifically tailored for gynecological practices and female patient care. 
- **Brand Personality**: Empathetic, authoritative, and sophisticated.
- **Design Style**: Modern Minimalist with Soft Elevation. It balances clinical precision with a warm, welcoming aesthetic to reduce patient anxiety while maintaining professional rigor for practitioners.

---

## 2. Color Palette

### Core Brand Colors
- **Primary (`#b5106a`)**: A vibrant magenta used for key actions, brand moments, and active states. Represents vitality and specialized care.
- **Primary Container (`#d63384`)**: Vibrant accent container background.
- **Secondary (`#712ae2`)**: A deep violet used for secondary actions and data visualization, providing a regal, professional counterpoint.
- **Secondary Container (`#8a4cfc`)**: Bright violet container.
- **Tertiary (`#006e08`)**: Deep emerald for positive states and subtle clinical highlights.
- **Tertiary Container (`#008a0d`)**: Emerald green container.

### Surface & Background Tokens
- **Background (`#fff8f8`)**: Warm, soft tinted background.
- **Surface (`#fff8f8`)**: Base surface color matching background.
- **Surface Dim (`#ecd4da`)**: Dimmed surface tone for depth contrast.
- **Surface Bright (`#fff8f8`)**: Bright surface tone.
- **Surface Container Lowest (`#ffffff`)**: Pure white card/container surface.
- **Surface Container Low (`#fff0f3`)**: Very soft pink container background.
- **Surface Container (`#ffe8ee`)**: Default surface container background.
- **Surface Container High (`#fbe2e8`)**: High-contrast surface container background.
- **Surface Container Highest (`#f5dce3`)**: Highest surface container background.
- **Surface Tint (`#b5106b`)**: Primary tint for elevated surfaces.

### Text & On-Colors
- **On Background / On Surface (`#25181c`)**: Dark neutral text color for high legibility.
- **On Surface Variant (`#584048`)**: Medium neutral for secondary text, labels, and icons.
- **On Primary (`#ffffff`)**: Pure white text on primary buttons and indicators.
- **On Primary Container (`#ffffff`)**: White text on primary containers.
- **On Secondary (`#ffffff`)**: Pure white text on secondary actions.
- **On Tertiary (`#ffffff`)**: Pure white text on tertiary actions.

### Outline & Interactive Boundaries
- **Outline (`#8b7078`)**: Medium border and divider color.
- **Outline Variant (`#dfbec8`)**: Subtle border and divider color.

### Inverse Tokens
- **Inverse Surface (`#3b2c31`)**: Dark background surface for snackbars, toasts, or dark elements.
- **Inverse On Surface (`#ffecf0`)**: Soft light text on inverse surface.
- **Inverse Primary (`#ffb0cc`)**: Light magenta for dark-mode primary accents.

### Fixed Color Tokens
- **Primary Fixed (`#ffd9e4`)** | **Primary Fixed Dim (`#ffb0cc`)** | **On Primary Fixed (`#3e0020`)** | **On Primary Fixed Variant (`#8d0051`)**
- **Secondary Fixed (`#eaddff`)** | **Secondary Fixed Dim (`#d2bbff`)** | **On Secondary Fixed (`#25005a`)** | **On Secondary Fixed Variant (`#5a00c6`)**
- **Tertiary Fixed (`#88fc77`)** | **Tertiary Fixed Dim (`#6cdf5e`)** | **On Tertiary Fixed (`#002201`)** | **On Tertiary Fixed Variant (`#005304`)**

### Status & Feedback Colors
- **Error (`#ba1a1a`)**: Standard healthcare alert red.
- **On Error (`#ffffff`)**: White text on error surfaces.
- **Error Container (`#ffdad6`)**: Light pinkish-red background for alert banners.
- **On Error Container (`#93000a`)**: Deep red text for alert banners.

---

## 3. Typography

### Font Families
- **Display & Headline Font**: **Manrope** (geometric, modern, rounded aesthetic for approachable authority)
- **Body & Label Font**: **Inter** (highly legible, systematic workhorse for dense tables, dashboards, and medical records)

### Typography Scale

#### Display
- **Display Large**:
  - `font-family`: `Manrope`, sans-serif
  - `font-size`: `48px`
  - `font-weight`: `700`
  - `line-height`: `1.2`
  - `letter-spacing`: `-0.02em`

#### Headlines
- **Headline Large**:
  - `font-family`: `Manrope`, sans-serif
  - `font-size`: `32px`
  - `font-weight`: `600`
  - `line-height`: `1.3`
  - `letter-spacing`: `-0.01em`
- **Headline Large (Mobile)**:
  - `font-family`: `Manrope`, sans-serif
  - `font-size`: `28px`
  - `font-weight`: `600`
  - `line-height`: `1.3`
- **Headline Medium**:
  - `font-family`: `Manrope`, sans-serif
  - `font-size`: `24px`
  - `font-weight`: `600`
  - `line-height`: `1.4`
- **Headline Small**:
  - `font-family`: `Manrope`, sans-serif
  - `font-size`: `20px`
  - `font-weight`: `600`
  - `line-height`: `1.4`

#### Body Copy
- **Body Large**:
  - `font-family`: `Inter`, sans-serif
  - `font-size`: `18px`
  - `font-weight`: `400`
  - `line-height`: `1.6`
- **Body Medium**:
  - `font-family`: `Inter`, sans-serif
  - `font-size`: `16px`
  - `font-weight`: `400`
  - `line-height`: `1.6`
- **Body Small**:
  - `font-family`: `Inter`, sans-serif
  - `font-size`: `14px`
  - `font-weight`: `400`
  - `line-height`: `1.5`

#### Labels & Buttons
- **Label Medium**:
  - `font-family`: `Inter`, sans-serif
  - `font-size`: `14px`
  - `font-weight`: `600`
  - `line-height`: `1`
  - `letter-spacing`: `0.01em`
- **Label Small**:
  - `font-family`: `Inter`, sans-serif
  - `font-size`: `12px`
  - `font-weight`: `500`
  - `line-height`: `1`
  - `letter-spacing`: `0.02em`

---

## 4. Spacing & Radius Tokens

### Spacing Scale
- **Base Grid**: `4px`
- **xs**: `0.25rem` (`4px`)
- **sm**: `0.5rem` (`8px`)
- **md**: `1.0rem` (`16px`)
- **lg**: `1.5rem` (`24px`)
- **xl**: `2.5rem` (`40px`)
- **2xl**: `4.0rem` (`64px`)
- **Gutter**: `1.5rem` (`24px`)
- **Margin Mobile**: `1.0rem` (`16px`)
- **Margin Desktop**: `3.0rem` (`48px`)

### Corner Radius
- **sm**: `0.25rem` (`4px`)
- **DEFAULT**: `0.5rem` (`8px`)
- **md**: `0.75rem` (`12px`)
- **lg**: `1.0rem` (`16px`) - Used for standard containers, cards, and modal dialogs.
- **xl**: `1.5rem` (`24px`) - Used for hero cards and major section blocks.
- **full**: `9999px` - Used for pills, status badges, and rounded action buttons.
