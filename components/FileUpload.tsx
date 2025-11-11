"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, File, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  error?: string
}

export function FileUpload({ onFileSelect, error }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)
      onFileSelect(selectedFile)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  })

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(null)
    onFileSelect(null)
  }

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-12 transition-all duration-200 cursor-pointer",
          isDragActive ? "border-green bg-green/5 scale-[1.02]" : "border-beige hover:border-gray/40",
          error && "border-red-400"
        )}
      >
        <input {...getInputProps()} />
        
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <File className="w-8 h-8 text-green" />
              <div>
                <p className="font-medium text-primary">{file.name}</p>
                <p className="text-sm text-gray/60">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-red-500" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload
              className={cn(
                "w-12 h-12 mx-auto mb-4 transition-all duration-200",
                isDragActive ? "text-green scale-110" : "text-gray/40"
              )}
            />
            <p className="text-primary font-medium mb-1">
              {isDragActive ? "Suelta tu archivo aquí" : "Arrastra tu pitch deck aquí"}
            </p>
            <p className="text-sm text-gray/60">
              o haz clic para seleccionar (PDF, máx. 10MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-500 flex items-center gap-1"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.p>
      )}
    </div>
  )
}

