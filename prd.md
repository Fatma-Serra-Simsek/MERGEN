# Takvim Uygulaması - Proje Gereksinim Dokümanı (PRD)

## Amaç
Kullanıcının farklı ay ve yıllar arasında geçiş yapabildiği, her gün için plan ekleyebileceği, pastel yeşil tonlarında modern bir takvim arayüzü geliştirmek.

---

## Özellikler

- **Dinamik Takvim**
  - Ay ve yıl seçimi yapılabilir.
  - Takvim 7 sütundan oluşur: Pazartesi'den Pazar'a.
  - Ay başlangıcına göre günler hizalanır.
  - Ay/yıl değiştiğinde günler otomatik güncellenir.

- **Gün Kartları**
  - Her gün pastel yeşil tonlarında bir kart olarak görünür.
  - Her karta tıklandığında plan ekleme/modifiye etme için modal pencere açılır.
  - Günlük planlar localStorage'da saklanır.

- **Notlar Bölümü**
  - Sayfanın en altında genel bir "Notlar" alanı bulunur.
  - Notlar da localStorage'da saklanır.

- **Navigasyon**
  - Ay ve yıl değiştirme butonları (← May, June →).

---

## İsteğe Bağlı Geliştirmeler

- Günlük planlarda yapılacaklar listesi (checkbox).
- Planları localStorage yerine ileride veritabanına taşıyacak API yapısı için temel hazırlık.
---

## Yapılanlar

- [x] Proje gereksinim dokümanı (PRD) hazırlandı.
- [x] Temel dosya ve klasör yapısı oluşturuldu.
- [x] Takvim arayüzü için temel tasarım referansı belirlendi.
- [x] Node.js projesi başlatıldı (npm init).
- [x] Vite + React frontend projesi kuruldu.
- [x] TypeScript ve React tip paketleri yüklendi.
- [x] tsconfig.json dosyası React/JSX ile uyumlu hale getirildi.
- [x] main.ts dosyası ReactDOM ile App bileşenini render edecek şekilde düzenlendi.
- [x] İlk App.tsx dosyası oluşturuldu.
- [x] Responsive, pastel yeşil tonlarında aylık takvim arayüzü geliştirildi.
- [x] Ay ve yıl seçici, gün isimleri ve gün kartları dinamik olarak eklendi.
- [x] Her gün kartına tıklanınca günlük plan modalı açılıyor.
- [x] Modalda yapılacaklar, alışveriş listesi ve not alanı eklendi.
- [x] Günlük yapılacaklar için checkbox ve görev ekleme işlevi eklendi.
- [x] Görevler tamamlandıkça işaretlenebiliyor, görev sayısı ve tamamlananlar takvimde gösteriliyor.
- [x] Ay ismine tıklanınca açılır ay seçici ile ay değiştirilebiliyor.
- [x] Notlar kutusu (en altta) yazılabilir ve localStorage'da saklanıyor.
- [x] Tüm planlar ve notlar localStorage'da saklanıyor.
- [x] Modal başlığı olarak seçilen günün tarihi ve ismi gösteriliyor.

---

## Yapılacaklar

- [ ] (İsteğe Bağlı) API entegrasyonu için temel hazırlık
- [ ] (İsteğe Bağlı) Karanlık mod desteği

---

## Öneriler (Daha Sonra Yapılabilecekler)

- Kullanıcı hesabı ve bulut senkronizasyonu (planların farklı cihazlarda saklanması)
- Günlük planlar için etiket/renk/öncelik sistemi
- Bildirim ve hatırlatıcı entegrasyonu (push notification)
- Takvimde haftalık/günlük görünüm seçenekleri
- Planlar için arama ve filtreleme
- Planları dışa aktarma (PDF/Excel)
- Mobil uyumlu ve PWA (Progressive Web App) desteği
- Takvimde sürükle-bırak ile görev taşıma
- Çoklu dil desteği
- Erişilebilirlik (a11y) iyileştirmeleri

---

## Notlar

- Tasarımda pastel yeşil tonları kullanılacak.
- Kodda component bazlı yapı tercih edilecek (örn. React ile).
- Kodun ileride backend'e taşınmasına uygun şekilde yazılması önerilir. 