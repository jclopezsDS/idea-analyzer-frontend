"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Mail, ArrowLeft, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function SuccessPage() {
  const [reportId, setReportId] = useState<string | null>(null)
  const [reportData, setReportData] = useState<any>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  
  useEffect(() => {
    // Leer report_id de localStorage
    const id = localStorage.getItem('report_id')
    const data = localStorage.getItem('report_data')
    
    if (id) setReportId(id)
    if (data) {
      try {
        setReportData(JSON.parse(data))
      } catch (e) {
        console.error("Error parsing report data:", e)
      }
    }
  }, [])
  
  const handleDownload = async () => {
    if (!reportId) {
      alert("No se encontró el reporte")
      return
    }
    
    setIsDownloading(true)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002'
      const response = await fetch(`${apiUrl}/reports/${reportId}`)
      
      if (!response.ok) {
        throw new Error("Error al descargar el reporte")
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Analisis_Startup_${reportId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al descargar el reporte")
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <main className="min-h-screen bg-cream flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-2xl w-full bg-white rounded-2xl border border-beige p-12 text-center shadow-lg"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8"
        >
          <CheckCircle className="w-20 h-20 text-green mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="w-12 h-12 relative mx-auto mb-6 opacity-80">
            <Image
              src="/assets/logos/logo.svg"
              alt="30x"
              fill
              className="object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold mb-4 text-primary">
            ¡Tu análisis está listo!
          </h1>

          <p className="text-lg text-gray mb-8">
            Hemos analizado tu startup y generado tu reporte con insights accionables
          </p>

          {reportData && (
            <div className="bg-green/10 border border-green/30 rounded-xl p-6 mb-6">
              <p className="font-semibold text-primary mb-2">
                Score Global: {reportData.score_global}/10
              </p>
              <p className="text-sm text-gray/80">
                {reportData.insight_principal}
              </p>
            </div>
          )}

          <div className="bg-cream rounded-xl p-6 mb-8 space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-primary mb-1">
                  Análisis completado en menos de 90 segundos
                </p>
                <p className="text-sm text-gray/80">
                  Tu reporte incluye score, riesgos críticos y próximos pasos
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-primary mb-1">
                  Reporte listo para descargar
                </p>
                <p className="text-sm text-gray/80">
                  Análisis detallado con acciones específicas y timelines
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleDownload}
              disabled={!reportId || isDownloading}
              className="w-full bg-primary text-green hover:bg-primary/90 mb-3 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(238,255,141,0.3)]"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Descargando...
                </>
              ) : (
                <>
                  <Download className="mr-2 w-5 h-5" />
                  Descargar reporte completo (PDF)
                </>
              )}
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full border-beige hover:border-green/40 hover:bg-green/5"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Analizar otra startup
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}

