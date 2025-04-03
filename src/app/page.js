import Link from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-8 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                Zamanınızı Değerli Kılın
              </h1>
              <p className="max-w-[42rem] text-lg text-muted-foreground sm:text-xl">
                "Her yeni gün, yeni bir başlangıçtır. Bugün, hayallerinize bir adım daha yaklaşın."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-brand">Planlama</CardTitle>
                    <CardDescription>
                      Gününüzü organize edin, hedeflerinize ulaşın
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-rose-500">Hobiler</CardTitle>
                    <CardDescription>
                      Kendinizi keşfedin, yeni yetenekler geliştirin
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-500">Rutinler</CardTitle>
                    <CardDescription>
                      Sağlıklı alışkanlıklar oluşturun
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Button size="lg" className="gap-2 bg-brand hover:bg-brand-dark">
                <a href="/dashboard" className="flex items-center">
                  Hemen Başla
                  <ArrowRightIcon className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12">Günlük Motivasyon</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden bg-muted/20">
                <div className="aspect-video relative bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <p>Sahil manzarası</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-center font-medium">
                    Her yeni gün, yeni bir başlangıçtır. Bugün, hayallerinize bir adım daha yaklaşın.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-muted/20">
                <div className="aspect-video relative bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <p>Dağ manzarası</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-center font-medium">
                    Başarı, her gün küçük adımlar atmaktır.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden bg-muted/20">
                <div className="aspect-video relative bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <p>Göl manzarası</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-center font-medium">
                    İnanmak, başarmanın yarısıdır.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Zaman Yönetimi. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Hakkımızda
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              İletişim
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Gizlilik
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage 