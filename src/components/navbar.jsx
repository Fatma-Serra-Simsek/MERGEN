import Link from 'next/link'
import { BellIcon, MenuIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-brand"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-bold">Zaman Yönetimi</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
          <Link href="/planlama" className="text-sm font-medium">
            Planlama
          </Link>
          <Link href="/hobiler" className="text-sm font-medium">
            Hobiler
          </Link>
          <Link href="/rutinler" className="text-sm font-medium">
            Rutinler
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-brand" />
          </Button>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>KU</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export { Navbar } 