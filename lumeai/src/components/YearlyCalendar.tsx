"use client";
import React, { useState, useEffect } from 'react';

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
const dayNames = ['P', 'S', 'Ç', 'P', 'C', 'Ct', 'Pz']; // Haftanın günleri kısaltılmış

interface CalendarMonth {
  name: string;
  days: number[];
  firstDay: number;
}

interface SpecialDay {
  date: string;
  color: string;
  title: string;
}

const specialDays: SpecialDay[] = [
  { date: '2024-1-1', color: '#FF0000', title: 'Yılbaşı' },
  { date: '2024-4-23', color: '#FF0000', title: 'Ulusal Egemenlik ve Çocuk Bayramı' },
  { date: '2024-5-1', color: '#FF0000', title: 'Emek ve Dayanışma Günü' },
  { date: '2024-5-19', color: '#FF0000', title: 'Gençlik ve Spor Bayramı' },
  { date: '2024-7-15', color: '#FF0000', title: 'Demokrasi ve Milli Birlik Günü' },
  { date: '2024-8-30', color: '#FF0000', title: 'Zafer Bayramı' },
  { date: '2024-10-29', color: '#FF0000', title: 'Cumhuriyet Bayramı' }
];

const getDayClass = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateStr = `${year}-${month + 1}-${day}`;
  const specialDay = specialDays.find(d => d.date === dateStr);
  
  return `p-2 text-center relative ${
    specialDay ? 'cursor-pointer hover:bg-gray-100' : ''
  }`;
};

const getDayStyle = (date: Date): React.CSSProperties => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dateStr = `${year}-${month + 1}-${day}`;
  const specialDay = specialDays.find(d => d.date === dateStr);
  
  if (specialDay) {
    return {
      backgroundColor: specialDay.color,
      color: '#fff',
      borderRadius: '4px'
    };
  }
  return {};
};

const YearlyCalendar: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [inputYear, setInputYear] = useState(String(new Date().getFullYear()));
  const [selectedDay, setSelectedDay] = useState<SpecialDay | null>(null);
  const [calendarData, setCalendarData] = useState<CalendarMonth[]>([]);

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const res = await fetch(`/api/calendar-data?year=${year}`);
        const data = await res.json();
        setCalendarData(data.calendar);
      } catch (error) {
        console.error("Takvim verileri çekilirken hata oluştu:", error);
      }
    };

    fetchCalendarData();
  }, [year]);

  const handleYearChange = () => {
    const parsedYear = parseInt(inputYear, 10);
    if (!isNaN(parsedYear)) {
      setYear(parsedYear);
    }
  };

  const onDayClick = (specialDay: SpecialDay) => {
    setSelectedDay(specialDay);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{selectedDay.title}</h3>
            <p className="text-gray-600">{selectedDay.date}</p>
            <button
              onClick={() => setSelectedDay(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center mb-8">
        <span className="mr-2 text-lg">Yıl:</span>
        <input
          type="number"
          value={inputYear}
          onChange={(e) => setInputYear(e.target.value)}
          className="border p-2 rounded-md w-24 text-center"
        />
        <button
          onClick={handleYearChange}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Git
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-10">{year}</h1>

      <div className="grid grid-cols-4 gap-8 w-full max-w-6xl">
        {calendarData.map((monthData, monthIndex) => {
          const calendarDays = [];

          for (let i = 0; i < monthData.firstDay; i++) {
            calendarDays.push(null);
          }
          monthData.days.forEach(day => {
            calendarDays.push(day);
          });

          return (
            <div key={monthIndex} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold text-center mb-4">{monthNames[monthIndex]}</h2>
              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
                {dayNames.map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="p-2" />;
                  }
                  const date = new Date(year, monthIndex, day);
                  const dateStr = `${year}-${monthIndex + 1}-${day}`;
                  const specialDay = specialDays.find(d => d.date === dateStr);
                  
                  return (
                    <div
                      key={index}
                      className={getDayClass(date)}
                      style={getDayStyle(date)}
                      onClick={() => specialDay && onDayClick(specialDay)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default YearlyCalendar;