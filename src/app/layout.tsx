import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 't-shirt-customization',
  description: 't-shirt-customization using nextjs, tailwindcss, konva, react-konva, canvas',
  keywords: 't-shirt-customization, nextjs, tailwindcss, konva, react-konva, canvas',
  authors: [
    {
      name: 'Saurav Htahi',
      url: 'https://github.com/sauravhathi',
    },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://t-shirt-customization.vercel.app/',
    title: 't-shirt-customization',
    description: 't-shirt-customization using nextjs, tailwindcss, konva, react-konva, canvas',
    images: [
      {
        url: './t-shirt-customization.png',
        width: 1200,
        height: 630,
        alt: 't-shirt-customization',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
