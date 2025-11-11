# pitch-analyzer (Frontend)

Frontend world-class para análisis de startups con IA.

## Stack

- Next.js 14 (App Router)
- Tailwind CSS v4  
- shadcn/ui + Framer Motion
- React Hook Form + Zod

## Paleta 30x

```css
Primary: #010101   (Negro potencia)
Green:   #eeff8d   (Verde X)
Cream:   #f2f2f2   (Crema movimiento)
Beige:   #dcd5c3   (Beige crecimiento)
Gray:    #414242   (Gris vibración)
Orange:  #ffa46f   (Naranja impacto)
```

## Quick Start

```bash
npm install
npm run dev
```

**URL:** http://localhost:3000

## Features

- Copy top 1%: "Descubre si tu startup tiene futuro"
- Form dual (Idea/Deck) con validación Zod
- File upload drag & drop
- Micro-interacciones sutiles
- Success page con download PDF
- Mobile-first responsive

## Estructura

```
/app              Pages y layout
/components       Hero, Form, Features, Footer
/lib              Validations (Zod) y types
/public/assets    Logos e iconos 30x
```

## Conectar con Backend

Ya está conectado a `http://localhost:8002`. Para cambiar:

```typescript
// components/AnalysisForm.tsx línea 71
const response = await fetch('TU_API_URL/analyze/idea', ...)
```

Ver `/docs` en el root para specs completas.
