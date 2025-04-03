'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Kayıtlı kullanıcı bilgisini al
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.length > 0) {
      setUserName(users[0].name)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Kullanıcıları localStorage'dan al
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    // Şifre kontrolü
    if (users.length > 0 && users[0].password === password) {
      // Giriş başarılı
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('currentUser', JSON.stringify({ name: users[0].name, email: users[0].email }))
      router.push('/dashboard')
    } else {
      setError('Şifre hatalı')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-pink-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-80 p-8 rounded-lg shadow-xl backdrop-blur-sm w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-teal-800">LumeAl</h1>
        
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">Hoş geldin, {userName}!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            Giriş Yap
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Hesabınız yok mu?{' '}
            <Link href="/register" className="text-teal-600 hover:text-teal-700 font-medium">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  )
} 