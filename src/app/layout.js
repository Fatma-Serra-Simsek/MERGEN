import '@/styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zamanınızı Değerli Kılın | AI Destekli Zaman Yönetimi',
  description: 'Yapay zeka destekli kişisel zaman yönetimi ve planlama aracı',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 