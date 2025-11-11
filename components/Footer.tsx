import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-beige bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 relative opacity-80">
            <Image
              src="/assets/logos/logo.svg"
              alt="30x"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray/60">
            Valida tu startup con inteligencia artificial
          </p>
          <p className="text-xs text-gray/40">
            © {new Date().getFullYear()} 30x. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

