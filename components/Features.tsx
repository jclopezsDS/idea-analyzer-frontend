import { FeatureCard } from "./FeatureCard"
import type { FeatureData } from "@/lib/types"

const features: FeatureData[] = [
  {
    icon: "/assets/icons/Insight.svg",
    title: "Identifica tus 3 riesgos más críticos",
    description: "Sabe exactamente qué puede matar tu startup antes de que te des cuenta"
  },
  {
    icon: "/assets/icons/Estrategias.svg",
    title: "Sabe qué le falta a tu deck",
    description: "Te dice los slides que debes agregar, cambiar o eliminar para convencer"
  },
  {
    icon: "/assets/icons/Crecer.svg",
    title: "Benchmark vs startups exitosas",
    description: "Compara tu idea con las que sí levantaron capital en tu industria"
  },
  {
    icon: "/assets/icons/Network.svg",
    title: "Predice tu probabilidad de levantar",
    description: "Score basado en data real de +$500M en rondas exitosas"
  },
  {
    icon: "/assets/icons/Tacticas.svg",
    title: "Detecta red flags que espantan VCs",
    description: "Esas cosas que hacen que un inversionista cierre tu deck en 30 segundos"
  },
  {
    icon: "/assets/icons/Duracion.svg",
    title: "Resultados en menos de 90 segundos",
    description: "Más rápido que leer un artículo. Más valioso que un call con advisor"
  }
]

export function Features() {
  return (
    <section className="py-32 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            ¿Qué hace pitch-analyzer que otros no?
          </h2>
          <p className="text-lg text-gray/80 max-w-2xl mx-auto">
            No es feedback genérico. Es análisis basado en data real de rondas exitosas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

