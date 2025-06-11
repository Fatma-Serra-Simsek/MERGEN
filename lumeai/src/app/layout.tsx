"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./login/style.css";
import { usePathname, useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "LumeAI - Yapay Zeka Çözümleri",
//   description: "LumeAI ile işinizi bir üst seviyeye taşıyın. Yapay zeka destekli çözümler ve otomatik optimizasyon araçları.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
      setLoading(false);

      // Eğer kullanıcı giriş yapmadıysa ve giriş sayfasında değilse, giriş sayfasına yönlendir
      if (!loggedIn && pathname !== '/login') {
        router.push('/login');
      }
      // Eğer kullanıcı giriş yaptıysa ve giriş sayfasındaysa, ana sayfaya yönlendir
      else if (loggedIn === 'true' && pathname === '/login') {
        router.push('/');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  if (loading) {
    return null;
  }

  return (
    <html lang="tr">
      <body className={inter.className}>
        <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button className="text-white mr-4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="text-2xl font-bold text-white">LumeAI</div>
              <div className="hidden md:flex flex-grow justify-center space-x-8">
                <a href="/" className="text-gray-300 hover:text-white transition-colors">Ana Sayfa</a>
                <Link href="/calendar" className="text-gray-300 hover:text-white transition-colors">
                  Takvim
                </Link>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">İstatistikler</a>
                <Link href="/planning" className="text-gray-300 hover:text-white transition-colors">Planlama</Link>
              </div>
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors">Çıkış Yap</button>
                ) : (
                  <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Giriş</Link>
                )}
              </div>
              <div className="w-6 h-6 md:hidden"></div>
            </div>
          </div>
        </nav>
        {/* Sidebar */}
        <div className={`fixed top-0 left-0 h-full bg-gray-800 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
          <div className="p-4">
            <button className="text-white mb-4" onClick={() => setIsSidebarOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors block" onClick={() => setIsSidebarOpen(false)}>Ana Sayfa</Link>
              </li>
              <li>
                <Link href="/calendar" className="text-gray-300 hover:text-white transition-colors block" onClick={() => setIsSidebarOpen(false)}>
                  Takvim
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors block" onClick={() => setIsSidebarOpen(false)}>İstatistikler</a>
              </li>
              <li>
                <Link href="/planning" className="text-gray-300 hover:text-white transition-colors block" onClick={() => setIsSidebarOpen(false)}>Planlama</Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <button onClick={() => { handleLogout(); setIsSidebarOpen(false); }} className="text-gray-300 hover:text-white transition-colors block">Çıkış Yap</button>
                ) : (
                  <Link href="/login" className="text-gray-300 hover:text-white transition-colors block" onClick={() => setIsSidebarOpen(false)}>Giriş</Link>
                )}
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-white transition-colors block" onClick={() => setIsSidebarOpen(false)}>Profilim</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        {children}
        <footer className="bg-gray-900 text-gray-300 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">LumeAI</h3>
                <p className="text-sm">Geleceğin teknolojisi bugün başlıyor</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Ürün</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Özellikler</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Fiyatlandırma</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Entegrasyonlar</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Şirket</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Hakkımızda</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Kariyer</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">İletişim</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">Destek</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">İletişim</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sosyal Medya</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p>&copy; 2024 LumeAI. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
