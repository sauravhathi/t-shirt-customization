import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import Socials from '@/components/Socials'

export const metadata: Metadata = {
  title: 't-shirt-customization',
  description: 't-shirt-customization using nextjs, tailwindcss, konva, react-konva, canvas',
  keywords: 't-shirt-customization, nextjs, tailwindcss, konva, react-konva, canvas',
  authors: [{ name: 'Saurav Hathi' }, { name: 'Saurav Hathii', url: 'https://github.com/sauravhathi' }],
  creator: 'Saurav Hathi',
  publisher: 'Saurav Hathi',
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
  category: 'technology',
  verification: {
    google: 'Mhqin_KJc0Ex78bttodON9iLf1_SfKRIa3LrCcKsMcQ',

  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        {children}
        <div
          className="fixed sm:top-0 bottom-0 right-2 z-50 flex flex-col items-center gap-2"
        >
          <Link
            title="Made by Saurav Hathi"
            href="https://github.com/sauravhathi"
            className="p-2 m-2 rounded-md cursor-pointer text-sm flex items-center gap-2 group"
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.9)'
            }}
          >
            <img src="https://avatars.githubusercontent.com/u/61316762" alt="github" className="w-10 h-10 rounded-full group-hover:scale-110 transform transition-all" />
            <p className="flex items-center gap-2" title="Made by Saurav Hathi">
              <span>
                Made by
              </span>
              <span className="underline">
                Saurav Hathi
              </span>
            </p>
          </Link>
        </div>
        <Socials />
      </body>
    </html>
  )
}
