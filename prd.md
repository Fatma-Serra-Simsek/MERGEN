# Ürün Gereksinim Dokümanı (PRD) - AI Destekli Zaman Yönetimi Uygulaması

## 1. Proje Genel Bakış
"Zamanınızı Değerli Kılın" sloganıyla hareket eden bu uygulama, kullanıcılara yapay zeka destekli kişisel zaman yönetimi, planlama ve motivasyon aracı sunmayı amaçlamaktadır. Uygulama, farklı kullanıcı profillerine (öğrenciler, çalışanlar, girişimciler) hizmet verecek şekilde tasarlanmıştır.

## 2. Yapıldı

### 2.1 Gereksinim Analizi
- Kullanıcıların zaman yönetimini iyileştirmelerine yardımcı olma amacı belirlenmiştir
- Hedef kullanıcı grupları ve senaryoları tanımlanmıştır
- Temel özellikler listelenmiştir

### 2.2 Kullanıcı Arayüzü - Giriş Sayfası
- "Zamanınızı Değerli Kılın" başlıklı karşılama ekranı tasarlanmıştır
- Ana kategoriler (Planlama, Hobiler, Rutinler) ve açıklamaları eklenmiştir
- "Hemen Başla" butonu yerleştirilmiştir
- "Günlük Motivasyon" bölümü ve motivasyonel kartlar tasarlanmıştır
- Placeholder görseller ile desteklenen motivasyonel mesajlar eklenmiştir

### 2.3 Ana Sayfa Arayüzü
- Üst navigasyon çubuğu tasarımı
  - Logo ve marka alanı
  - Ana menü linkleri
  - Profil bölümü ve ayarlar
  - Bildirim ikonu ve sayacı

- Dashboard ana bölümü
  - Hoş geldin mesajı ve günün özeti
  - Hızlı eylem butonları (Yeni görev ekle, Plan oluştur, Hedef Belirle, İstatistikler)
  - İlerleyiş özeti ve başarı yüzdesi

- Günün planı bileşeni
  - Zaman çizelgesi görünümü
  - Saat bazlı görevler listesi
  - Tamamlanma durumu göstergeleri

- Yapılacaklar listesi komponenti
  - Öncelik işaretleyicileri
  - Checkbox ile tamamlama
  - Yeni görev ekleme alanı

- Yapay zeka önerileri widget'ı
  - Kişiselleştirilmiş günlük ipuçları
  - Verimlilik önerileri
  - Yenilenme butonu

- İstatistikler ve grafikler
  - Haftalık verimlilik grafikleri
  - Tamamlanan görevler daire grafiği

- Yaklaşan hatırlatıcılar
  - Önümüzdeki 24 saat içindeki etkinlikler
  - Önemli tarihler ve görevler

- Alt bilgi (footer) bölümü
  - Telif hakkı bilgileri
  - Yardım ve destek linkleri

- Duyarlı (Responsive) tasarım
  - Mobil, tablet ve masaüstü görünümler için optimize edilmiş tasarım

### 2.4 Teknik Yapılandırma
- Next.js App Router yapısı kuruldu
- Tailwind CSS ve Shadcn/Radix UI entegrasyonu yapıldı
- React bileşenleri ve sayfa yapısı oluşturuldu
- React Hooks (useState) kullanıldı
- Recharts ile grafik bileşenleri entegre edildi
- date-fns ile tarih/saat işlemleri yapılandırıldı
- Lucide Icons ile ikonlar entegre edildi
- Next.js yapılandırma dosyası (next.config.js) oluşturuldu

### 2.5 Uzaktan Erişim Desteği
- Geliştirme sunucusu tüm ağ arayüzlerine açıldı (`-H 0.0.0.0` ile)
- Mobil cihazlardan yerel ağ üzerinden erişim sağlandı
- Package.json dosyası güncellendi
- Bilgisayarın IP adresi (192.168.1.142) üzerinden mobil erişim yapılandırıldı

## 3. Teknik Notlar ve Sorun Çözümleri

### 3.1 Port Yapılandırması
- Uygulama otomatik olarak uygun bir portta çalışmaktadır (3000, 3001, 3002 veya 3003)
- Port kullanımda olduğunda otomatik olarak bir sonraki porta geçilmektedir

### 3.2 Görsel Kaynakları
- Harici görseller için next.config.js dosyasında remotePatterns yapılandırması yapıldı
- Görsel kaynaklarında sorun yaşanması durumunda placeholder metin gösterimi eklendi

### 3.3 Navigasyon
- Next.js navigation yapısı ile sayfa yönlendirmeleri yapılandırıldı
- "Hemen Başla" butonu HTML <a> etiketi ile dashboard sayfasına yönlendirme sağlanmaktadır

### 3.4 Mobil Erişim
- Next.js geliştirme sunucusu varsayılan olarak sadece localhost'a erişim verir
- `-H 0.0.0.0` parametresi ile tüm ağ arayüzlerine açıldı
- Mobil cihazdan bilgisayarın IP adresine bağlanılarak uygulama test edilebilir
- Erişim formatı: `http://[BILGISAYAR-IP]:[PORT]` (örn: http://192.168.1.142:3000)

## 4. Teknik Gereksinimler

### 4.1 Front-end
- Next.js ile modern web uygulaması yapısı
- Tailwind CSS ve Stylus kullanılarak özelleştirilmiş UI
- Zustand ile state yönetimi (temel yapı hazırlandı)
- Radix UI ve Shadcn UI bileşen kütüphaneleri
- Responsive tasarım ve erişilebilirlik standartları

## 5. Çalıştırma Talimatları

### 5.1 Geliştirme Ortamı
- Bağımlılıkları yüklemek için: `npm install`
- Geliştirme sunucusunu başlatmak için: `npm run dev`
- Tarayıcıda açmak için: `http://localhost:PORT` (PORT, konsolda gösterilen port numarasıdır)

### 5.2 Mobil Test için Erişim
- Geliştirme bilgisayarı ve mobil cihazın aynı Wi-Fi ağında olduğundan emin olun
- Mobil cihazdan şu adrese erişin: `http://192.168.1.142:PORT` (PORT konsolda gösterilen port)
- Port numarası genellikle 3000, 3001, 3002 veya 3003 olabilir
- Bilgisayarın IP adresi değişebilir, güncel IP için ipconfig komutunu çalıştırın

### 5.3 Kullanılabilen Sayfalar
- Ana Sayfa: `/`
- Dashboard: `/dashboard`

## 6. Performans Hedefleri
- Sayfa yükleme süresi 2 saniyeden az
- LCP (Largest Contentful Paint) < 1.5s
- CLS (Cumulative Layout Shift) < 0.1
- FID (First Input Delay) < 100ms

## 7. Ölçme ve Değerlendirme
- Kullanıcı arayüzü kullanılabilirlik testleri
- Görsel tutarlılık kontrolleri
- Hız ve performans testleri
- Tarayıcı uyumluluk kontrolleri

---

Bu PRD, yapay zeka destekli zaman yönetimi uygulamasının geliştirilmesi sürecini dokümante etmektedir. Geliştirme süreci tamamlandı ve temel özellikler uygulandı. Mobil erişim desteği de eklenerek farklı cihazlardan test yapılabilir.