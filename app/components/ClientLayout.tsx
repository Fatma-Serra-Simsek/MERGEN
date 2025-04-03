'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    
    // Giriş yapmamış kullanıcılar için kontrol
    if (!isLoggedIn && (pathname === '/' || pathname === '/dashboard')) {
      router.push('/login')
    }
    
    // Giriş yapmış kullanıcılar için kontrol
    if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
      router.push('/dashboard')
    }
  }, [pathname, router])

  return <>{children}</>
} 