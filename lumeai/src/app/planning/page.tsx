"use client";
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('../../components/Calendar'), {
  ssr: false
});

export default function PlanningPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 pt-20">
      <Calendar />
    </div>
  );
}