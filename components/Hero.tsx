"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToForm = () => {
    const element = document.getElementById("form-section")
    element?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-cream relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <div className="mb-16 w-16 h-16 relative">
          <Image
            src="/assets/logos/logo.svg"
            alt="30x"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center max-w-4xl mb-6 tracking-tight leading-[1.05]">
          Descubre si tu startup tiene{" "}
          <span className="text-primary relative">
            futuro.
            <span className="absolute bottom-0 left-0 right-0 h-[0.15em] bg-green"></span>
          </span>
          <br />
          <span className="text-gray/90">Ahora mismo.</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray text-center max-w-2xl mb-12">
          IA entrenada en +$500M de rondas analiza tu deck en 90 segundos
        </p>

        <Button
          onClick={scrollToForm}
          size="lg"
          className="bg-primary text-green hover:bg-primary/90 px-8 py-6 text-lg group transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(238,255,141,0.3)]"
        >
          Ver mi score en 60 segundos
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowDown className="ml-2 w-5 h-5" />
          </motion.div>
        </Button>
      </motion.div>

      <div className="absolute bottom-12 left-0 right-0">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-12 md:gap-16 text-center text-sm text-gray/60"
          >
            <div>
              <p className="text-2xl font-bold text-primary">2,847</p>
              <p>Startups analizadas</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">$420M+</p>
              <p>Levantado por usuarios</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">&lt; 90s</p>
              <p>Tiempo promedio</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

