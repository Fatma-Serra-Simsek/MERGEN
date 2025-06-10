'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Gerçek bir uygulamada burada kimlik doğrulama API çağrısı olurdu
    // Başarılı giriş durumunu simüle edelim
    if (email === 'user@example.com' && password === 'password') {
      alert('Giriş başarılı!');
      router.push('/'); // Anasayfaya yönlendir
    } else {
      alert('Geçersiz e-posta veya şifre.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/register'); // Kayıt sayfasına yönlendir
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            LumeAI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Hoş geldin!
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">E-posta adresi</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-posta adresi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Şifre</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Şifremi Unuttum
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Giriş Yap
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Hesabınız yok mu? {' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Kayıt Ol
            </Link>
          </p>
        </div>

        {/* Motive Edici Resim ve Metin */}
        <div className="mt-8 p-4 bg-gray-200 rounded-lg text-center">
          <img src="/placeholder-motivation.jpg" alt="Motive Edici Resim" className="mx-auto rounded-md mb-4" />
          <p className="text-gray-800 font-semibold italic">
            "Başarı, her gün küçük adımlar atmaktır. Her adım, hedefinize yaklaşmanızı sağlar."
          </p>
        </div>
      </div>
    </div>
  );
} 