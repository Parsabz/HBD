import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Amirhosein's Surprise",
  description: 'A cyberpunk-themed interactive surprise website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-cyan-500 min-h-screen">
        {children}
      </body>
    </html>
  )
} 