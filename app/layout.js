import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SessionProvider from '@/components/SessionProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'Handy Owl — DIY Home Guides for Every Homeowner',
  description: 'Learn to fix, maintain, and improve your home with expert video guides and interactive checklists. Stop paying contractors for jobs you can do yourself.',
  openGraph: {
    title: 'Handy Owl',
    description: 'DIY home guides for every homeowner.',
    url: 'https://handyowl.net',
    siteName: 'Handy Owl',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  const isDashboard = false // server-side check would go here

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased text-gray-900 bg-white">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
