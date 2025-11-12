import { z } from "zod"

// Personal Info Schema
export const personalInfoSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefono: z.string().min(10, "Teléfono inválido").max(20),
})

// Idea Analysis Schema
export const ideaSchema = z.object({
  ...personalInfoSchema.shape,
  nombreProyecto: z.string().min(2, "El nombre es requerido"),
  idea: z.string().min(50, "Mínimo 50 caracteres").max(500),
  problema: z.string().min(50, "Mínimo 50 caracteres").max(500),
  targetUser: z.string().min(50, "Mínimo 50 caracteres").max(500),
  diferenciacion: z.string().min(50, "Mínimo 50 caracteres").max(500),
  validacion: z.string().min(50, "Mínimo 50 caracteres - sé específico con números").max(500),
  modeloNegocio: z.string().min(50, "Mínimo 50 caracteres").max(500),
})

// Deck Analysis Schema
export const deckSchema = z.object({
  ...personalInfoSchema.shape,
  nombreStartup: z.string().min(2, "El nombre de la startup es requerido"),
  montoLevantar: z.string().min(1, "Selecciona un monto"),
  yaLevanto: z.enum(["si", "no"]),
  montoLevantado: z.string().optional(),
  paraQueCapital: z.string().min(50, "Mínimo 50 caracteres").max(500),
  deck: z.instanceof(File, { message: "El deck es requerido" })
    .refine((file) => file.size <= 10 * 1024 * 1024, "El archivo debe ser menor a 10MB")
    .refine((file) => file.type === "application/pdf", "Solo se aceptan archivos PDF"),
})

// Types
export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type IdeaForm = z.infer<typeof ideaSchema>
export type DeckForm = z.infer<typeof deckSchema>

