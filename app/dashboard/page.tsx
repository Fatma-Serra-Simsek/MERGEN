'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState('Kullanıcı')

  useEffect(() => {
    // Giriş kontrolü ve kullanıcı adını al
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const storedUserName = localStorage.getItem('userName')
    
    if (!isLoggedIn) {
      router.push('/login')
    } else if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userName')
    router.push('/')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-100 via-pink-100 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-teal-800">Hoş geldin, {userName}! 👋</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-4">Günlük Hedefler</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Egzersiz yap</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Kitap oku</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Meditasyon yap</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-4">İstatistikler</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Tamamlanan Hedefler</p>
                <p className="text-3xl font-bold text-teal-600">12</p>
              </div>
              <div>
                <p className="text-gray-600">Başarı Oranı</p>
                <p className="text-3xl font-bold text-teal-600">%75</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-teal-800 mb-4">Günün Motivasyonu</h2>
            <p className="text-gray-700 italic">
              "Her yeni gün, yeni bir başlangıçtır. Bugün, dünden daha iyi olmak için bir fırsattır."
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  )
} 