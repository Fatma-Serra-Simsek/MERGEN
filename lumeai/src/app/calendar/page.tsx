"use client";
import React, { useState, useEffect } from 'react';

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
const dayNames = ['P', 'S', 'Ç', 'P', 'C', 'Ct', 'Pz']; // Haftanın günleri kısaltılmış

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  // Pazartesi=0, Pazar=6 olacak şekilde ayarlıyoruz
  const jsDay = new Date(year, month, 1).getDay();
  return (jsDay + 6) % 7;
}

interface Holiday {
  date: string;
  localName: string;
  name: string;
}

export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [inputYear, setInputYear] = useState(String(new Date().getFullYear()));
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/TR`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Holiday[] = await response.json();
        setHolidays(data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setHolidays([]);
      }
    };

    fetchHolidays();
  }, [year]);

  const handleYearChange = () => {
    const parsedYear = parseInt(inputYear, 10);
    if (!isNaN(parsedYear)) {
      setYear(parsedYear);
    }
  };

  const isHoliday = (date: Date) => {
    const holidayDateString = date.toISOString().split('T')[0];
    return holidays.some(holiday => holiday.date === holidayDateString);
  };

  const getHolidayName = (date: Date) => {
    const holidayDateString = date.toISOString().split('T')[0];
    const holiday = holidays.find(holiday => holiday.date === holidayDateString);
    return holiday ? holiday.localName : '';
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-gray-800 pt-20">
      <h1 className="text-4xl font-bold text-center mt-8">Yıllık Takvim</h1>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="number"
          value={inputYear}
          onChange={(e) => setInputYear(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-center"
          placeholder="Yıl Girin"
        />
        <button
          onClick={handleYearChange}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Yılı Güncelle
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 p-8 max-w-7xl w-full">
        {monthNames.map((monthName, monthIndex) => {
          const daysInMonth = getDaysInMonth(year, monthIndex);
          const firstDayOfWeek = getFirstDayOfWeek(year, monthIndex);
          const monthDays = [];

          for (let i = 0; i < firstDayOfWeek; i++) {
            monthDays.push(<div key={`empty-${monthIndex}-${i}`} className="text-center p-2"></div>);
          }

          for (let i = 1; i <= daysInMonth; i++) {
            const currentDate = new Date(year, monthIndex, i);
            const holidayClass = isHoliday(currentDate) ? 'bg-red-200 font-bold' : '';
            const holidayName = getHolidayName(currentDate);

            monthDays.push(
              <div
                key={`${monthIndex}-${i}`}
                className={`text-center p-2 border border-gray-300 rounded-md relative ${holidayClass}`}
                title={holidayName}
              >
                {i}
                {holidayName && (
                  <span className="absolute bottom-0 left-0 right-0 text-xs bg-red-500 text-white p-0.5 rounded-b-md">
                    {holidayName}
                  </span>
                )}
              </div>
            );
          }

          return (
            <div key={monthName} className="border border-gray-300 rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold text-center mb-4">{monthName} {year}</h2>
              <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="p-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7">
                {monthDays}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 