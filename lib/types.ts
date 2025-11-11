export type AnalysisType = "idea" | "deck"

export interface FeatureData {
  icon: string
  title: string
  description: string
}

export interface FormState {
  analysisType: AnalysisType
  isLoading: boolean
  error: string | null
}

