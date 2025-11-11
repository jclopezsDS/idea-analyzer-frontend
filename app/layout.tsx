import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "pitch-analyzer | Descubre si tu startup tiene futuro",
  description: "IA entrenada en +$500M de rondas analiza tu pitch deck en 90 segundos. Identifica riesgos críticos y predice tu probabilidad de levantar capital.",
  keywords: ["pitch deck", "startup", "fundraising", "validación", "IA", "análisis", "inversionistas", "VCs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
