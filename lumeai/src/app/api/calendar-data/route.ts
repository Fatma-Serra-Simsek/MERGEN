export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const year = yearParam ? parseInt(yearParam, 10) : new Date().getFullYear();

  // Takvim verisi oluşturucu
  function getCalendar(year: number) {
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    const calendar = [];
    for (let m = 0; m < 12; m++) {
      // Pazartesi=0, Pazar=6 olacak şekilde ayarlıyoruz
      const jsDay = new Date(year, m, 1).getDay();
      const firstDay = (jsDay + 6) % 7;
      const daysInMonth = new Date(year, m + 1, 0).getDate();
      calendar.push({
        name: months[m],
        days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
        firstDay
      });
    }
    return calendar;
  }

  const calendarData = getCalendar(year);

  return Response.json({ year, calendar: calendarData });
} 