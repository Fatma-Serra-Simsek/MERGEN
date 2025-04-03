'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentQuote, setCurrentQuote] = useState(0)

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

  useEffect(() => {
    const lastUpdate = localStorage.getItem('lastQuoteUpdate')
    const today = new Date().toDateString()

    if (lastUpdate !== today) {
      const newIndex = Math.floor(Math.random() * dailyQuotes.length)
      setCurrentQuote(newIndex)
      localStorage.setItem('lastQuoteUpdate', today)
      localStorage.setItem('currentQuoteIndex', newIndex.toString())
    } else {
      const savedIndex = localStorage.getItem('currentQuoteIndex')
      if (savedIndex) {
        setCurrentQuote(parseInt(savedIndex))
      }
    }
  }, [])

  const dailyQuotes = [
    {
      text: "Her yeni gün, yeni bir başlangıçtır. Bugün, hayallerinize bir adım daha yaklaşın.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60"
    },
    {
      text: "Başarı, her gün küçük adımlar atmaktır. Her adım, hedefinize yaklaşmanızı sağlar.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60"
    },
    {
      text: "İnanmak, başarmanın yarısıdır. Kendinize inanın, başaracaksınız!",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60"
    },
    {
      text: "Bugün dünden daha güçlüsün. Her gün, bir önceki günden daha iyi olmak için bir fırsat.",
      image: "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=800&auto=format&fit=crop&q=60"
    },
    {
      text: "Hayallerinizin peşinden gidin. Başarı, cesaretin çocuğudur.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60"
    },
    {
      text: "Her başarı, küçük adımlarla başlar. Bugün, o adımları atmaya başlayın.",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60"
    }
  ]

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <main className="min-h-screen relative">
      {/* Arka plan deseni */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-100 via-pink-100 to-blue-100" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Arka plan emojileri */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl opacity-10 animate-float">📚</div>
        <div className="absolute top-20 right-20 text-4xl opacity-10 animate-float-delayed">✏️</div>
        <div className="absolute bottom-20 left-1/4 text-4xl opacity-10 animate-float">🎨</div>
        <div className="absolute bottom-10 right-1/3 text-4xl opacity-10 animate-float-delayed">🎵</div>
        <div className="absolute top-1/3 left-1/2 text-4xl opacity-10 animate-float">⚽</div>
        <div className="absolute bottom-1/3 right-1/4 text-4xl opacity-10 animate-float-delayed">🎮</div>
        <div className="absolute top-2/3 left-1/3 text-4xl opacity-10 animate-float">🎭</div>
        <div className="absolute bottom-2/3 right-1/2 text-4xl opacity-10 animate-float-delayed">🎪</div>
      </div>
      
      {/* İçerik */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-6 text-teal-800"
          >
            LumeAl
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-700 mb-8"
          >
            {dailyQuotes[currentQuote].text}
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-teal-700 mb-3">Planlama</h3>
              <p className="text-gray-600">Gününüzü organize edin, hedeflerinize ulaşın</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-pink-700 mb-3">Hobiler</h3>
              <p className="text-gray-600">Kendinizi keşfedin, yeni yetenekler geliştirin</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-3">Rutinler</h3>
              <p className="text-gray-600">Sağlıklı alışkanlıklar oluşturun</p>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition duration-300 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Hemen Başla
            </motion.button>
          </div>

          {/* Günün Motivasyon Görseli */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 relative h-[400px] rounded-lg overflow-hidden shadow-xl mx-auto max-w-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Image
              src={dailyQuotes[currentQuote].image}
              alt="Günün Motivasyonu"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
              <p className="text-2xl font-medium">{dailyQuotes[currentQuote].text}</p>
            </div>
          </motion.div>

          {/* By Mergen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-gray-600 font-medium"
          >
            By Mergen
          </motion.div>
        </div>
      </div>
    </main>
  )
}
