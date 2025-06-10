"use client";
import dynamic from 'next/dynamic';

// Takvim bileşenini dinamik olarak import ediyoruz
const Calendar = dynamic(() => import('../../components/Calendar'), {
  ssr: false
});

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20">
      <Calendar />
    </div>
  );
} 