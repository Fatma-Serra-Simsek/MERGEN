const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Takvim verisi oluşturucu
function getCalendar(year) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const calendar = [];
  for (let m = 0; m < 12; m++) {
    const firstDay = new Date(year, m, 1).getDay();
    const daysInMonth = new Date(year, m + 1, 0).getDate();
    calendar.push({
      name: months[m],
      days: Array.from({ length: daysInMonth }, (_, i) => i + 1),
      firstDay
    });
  }
  return calendar;
}

app.get('/', (req, res) => {
  const year = parseInt(req.query.year) || new Date().getFullYear();
  const calendar = getCalendar(year);
  res.render('calendar', { year, calendar });
});

app.listen(PORT, () => {
  console.log(`Takvim uygulaması http://localhost:${PORT} adresinde çalışıyor.`);
}); 