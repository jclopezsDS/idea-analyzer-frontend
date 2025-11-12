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
    <section className="relative min-h-screen flex flex-col items-center justify-between py-16 md:py-20 px-6 bg-cream">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-20 h-20 md:w-24 md:h-24 relative"
      >
        <Image
          src="/assets/logos/logo.svg"
          alt="30x"
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Main Content - Centrado verticalmente */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-5xl -mt-12"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 tracking-tight leading-[1.05]">
          Descubre si tu startup tiene{" "}
          <span className="text-primary relative inline-block">
            futuro.
            <span className="absolute -bottom-0.5 md:bottom-0 left-0 right-0 h-[0.15em] bg-green"></span>
          </span>
          <br />
          <span className="text-gray/90 text-3xl md:text-5xl lg:text-6xl">Ahora mismo.</span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-gray/80 max-w-2xl mb-9 leading-relaxed">
          IA entrenada en +$500M de rondas analiza tu deck en 90 segundos
        </p>

        <Button
          onClick={scrollToForm}
          size="lg"
          className="bg-primary text-cream hover:bg-primary/95 px-9 py-6 text-base md:text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
        >
          Ver mi score en 60 segundos
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowDown className="ml-3 w-5 h-5" />
          </motion.div>
        </Button>
      </motion.div>

      {/* Stats - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-wrap justify-center gap-14 md:gap-20 text-center">
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold text-primary mb-1">2,847</p>
            <p className="text-xs md:text-sm text-gray/70">Startups analizadas</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold text-primary mb-1">$420M+</p>
            <p className="text-xs md:text-sm text-gray/70">Levantado por usuarios</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold text-primary mb-1">&lt; 90s</p>
            <p className="text-xs md:text-sm text-gray/70">Tiempo promedio</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

