"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { FeatureData } from "@/lib/types"

interface FeatureCardProps {
  feature: FeatureData
  index: number
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group p-8 rounded-2xl bg-white border border-beige hover:border-green/30 transition-all duration-300"
    >
      <div className="w-10 h-10 relative mb-4 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={feature.icon}
          alt={feature.title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-primary">
        {feature.title}
      </h3>
      <p className="text-sm text-gray/80">
        {feature.description}
      </p>
    </motion.div>
  )
}

