"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileUpload } from "./FileUpload"
import { ideaSchema, deckSchema, type IdeaForm, type DeckForm } from "@/lib/validations"
import type { AnalysisType } from "@/lib/types"
import { cn } from "@/lib/utils"

export function AnalysisForm() {
  const router = useRouter()
  const [analysisType, setAnalysisType] = useState<AnalysisType>("idea")
  const [isLoading, setIsLoading] = useState(false)

  const ideaForm = useForm<IdeaForm>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      nombreProyecto: "",
      idea: "",
      problema: "",
      targetUser: "",
      diferenciacion: "",
      validacion: "", // Ahora es requerido
      modeloNegocio: "",
    },
  })

  const deckForm = useForm<DeckForm>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      nombreStartup: "",
      montoLevantar: "",
      yaLevanto: "no",
      montoLevantado: "",
      paraQueCapital: "",
    },
  })

  const onSubmitIdea = async (data: IdeaForm) => {
    setIsLoading(true)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002'
      const response = await fetch(`${apiUrl}/analyze/idea`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (!response.ok) {
        throw new Error('Error en el análisis')
      }
      
      const result = await response.json()
      
      // Guardar report_id para descarga
      localStorage.setItem('report_id', result.report_id)
      localStorage.setItem('report_data', JSON.stringify(result.report))
      
      router.push("/success")
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al analizar. Por favor intenta de nuevo.")
      setIsLoading(false)
    }
  }

  const onSubmitDeck = async (data: DeckForm) => {
    setIsLoading(true)
    
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value)
        }
      })
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002'
      const response = await fetch(`${apiUrl}/analyze/deck`, {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) {
        throw new Error('Error en el análisis')
      }
      
      const result = await response.json()
      
      // Guardar report_id para descarga
      localStorage.setItem('report_id', result.report_id)
      localStorage.setItem('report_data', JSON.stringify(result.report))
      
      router.push("/success")
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al analizar. Por favor intenta de nuevo.")
      setIsLoading(false)
    }
  }

  const currentForm = analysisType === "idea" ? ideaForm : deckForm

  return (
    <section id="form-section" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-beige rounded-2xl p-12 shadow-sm"
          >
            {/* Analysis Type Toggle */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setAnalysisType("idea")}
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200",
                  analysisType === "idea"
                    ? "bg-primary text-green shadow-md"
                    : "bg-cream text-gray hover:bg-beige"
                )}
              >
                Analizar Startup
              </button>
              <button
                onClick={() => setAnalysisType("deck")}
                className={cn(
                  "flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200",
                  analysisType === "deck"
                    ? "bg-primary text-green shadow-md"
                    : "bg-cream text-gray hover:bg-beige"
                )}
              >
                Analizar Deck
              </button>
            </div>

            {/* Idea Form */}
            {analysisType === "idea" && (
              <Form {...ideaForm}>
                <form onSubmit={ideaForm.handleSubmit(onSubmitIdea)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-primary">Información personal</h3>
                    
                    <FormField
                      control={ideaForm.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Tu nombre" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="tu@email.com" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+57 300 123 4567" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t border-beige pt-6 space-y-4">
                    <h3 className="font-semibold text-lg text-primary">Tu startup</h3>

                    <FormField
                      control={ideaForm.control}
                      name="nombreProyecto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Mi Startup" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="idea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Qué hace tu startup?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe qué problema resuelves y cómo lo haces..."
                              className="min-h-[100px] resize-none transition-all duration-200 focus:translate-y-[-1px]"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-xs text-gray/60">
                              {field.value.length}/500
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="problema"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Qué problema resuelves?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe el problema específico..."
                              className="min-h-[100px] resize-none transition-all duration-200 focus:translate-y-[-1px]"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-xs text-gray/60">
                              {field.value.length}/500
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="targetUser"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Quién es tu target user?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Define tu público objetivo..."
                              className="min-h-[80px] resize-none transition-all duration-200 focus:translate-y-[-1px]"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-xs text-gray/60">
                              {field.value.length}/300
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="diferenciacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Qué te hace diferente?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Explica tu propuesta de valor única..."
                              className="min-h-[100px] resize-none transition-all duration-200 focus:translate-y-[-1px]"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-xs text-gray/60">
                              {field.value.length}/500
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="validacion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Qué tracción tienes?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Usuarios, revenue, growth rate, NPS, testimonios de clientes... Sé específico con números."
                              className="min-h-[80px] resize-none transition-all duration-200 focus:translate-y-[-1px]"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-xs text-gray/60">
                              {field.value?.length || 0}/500
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={ideaForm.control}
                      name="modeloNegocio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Cómo piensas monetizar?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe tu modelo de negocio..."
                              className="min-h-[100px] resize-none transition-all duration-200 focus:translate-y-[-1px]"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-xs text-gray/60">
                              {field.value.length}/500
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-green hover:bg-primary/90 py-6 text-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analizando tu startup...
                      </>
                    ) : (
                      "Ver mi análisis ahora →"
                    )}
                  </Button>
                </form>
              </Form>
            )}

            {/* Deck Form */}
            {analysisType === "deck" && (
              <Form {...deckForm}>
                <form onSubmit={deckForm.handleSubmit(onSubmitDeck)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-primary">Información personal</h3>
                    
                    <FormField
                      control={deckForm.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre completo</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Tu nombre" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={deckForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="tu@email.com" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={deckForm.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+57 300 123 4567" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="border-t border-beige pt-6 space-y-4">
                    <h3 className="font-semibold text-lg text-primary">Tu pitch deck</h3>

                    <FormField
                      control={deckForm.control}
                      name="nombreStartup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de la startup</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Mi Startup" 
                              {...field}
                              className="transition-all duration-200 focus:translate-y-[-1px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={deckForm.control}
                      name="montoLevantar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Cuánto esperas levantar?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-200 focus:translate-y-[-1px]">
                                <SelectValue placeholder="Selecciona el monto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pre-seed">Pre-seed ($50k - $500k)</SelectItem>
                              <SelectItem value="seed">Seed ($500k - $2M)</SelectItem>
                              <SelectItem value="series-a">Series A ($2M - $10M)</SelectItem>
                              <SelectItem value="series-b">Series B ($10M+)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={deckForm.control}
                      name="yaLevanto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Ya has levantado capital?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="transition-all duration-200 focus:translate-y-[-1px]">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="si">Sí</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {deckForm.watch("yaLevanto") === "si" && (
                      <FormField
                        control={deckForm.control}
                        name="montoLevantado"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>¿Cuánto has levantado?</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="ej: $500k" 
                                {...field}
                                className="transition-all duration-200 focus:translate-y-[-1px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={deckForm.control}
                      name="paraQueCapital"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>¿Para qué necesitas el capital?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Desarrollo de producto, contratación, marketing..."
                              className="min-h-[100px] resize-none transition-all duration-200 focus:translate-y-[-1px]"
                              {...field}
                            />
                          </FormControl>
                          <div className="flex justify-between items-center">
                            <FormMessage />
                            <span className="text-xs text-gray/60">
                              {field.value.length}/500
                            </span>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={deckForm.control}
                      name="deck"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Sube tu pitch deck (PDF)</FormLabel>
                          <FormControl>
                            <FileUpload
                              onFileSelect={(file) => onChange(file)}
                              error={deckForm.formState.errors.deck?.message}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-green hover:bg-primary/90 py-6 text-lg transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analizando tu startup...
                      </>
                    ) : (
                      "Ver mi análisis ahora →"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

