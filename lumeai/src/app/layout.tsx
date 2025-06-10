import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LumeAI - Yapay Zeka Çözümleri",
  description: "LumeAI ile işinizi bir üst seviyeye taşıyın. Yapay zeka destekli çözümler ve otomatik optimizasyon araçları.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button className="text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              <div className="text-2xl font-bold text-white">LumeAI</div>
              <div className="hidden md:flex flex-grow justify-center space-x-8">
                <a href="/" className="text-gray-300 hover:text-white transition-colors">Ana Sayfa</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Takvim</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">İstatistikler</a>
                <a href="/calendar" className="text-gray-300 hover:text-white transition-colors">Planlama</a>
              </div>
              <div className="w-6 h-6 md:hidden"></div>
            </div>
          </div>
        </nav>
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
