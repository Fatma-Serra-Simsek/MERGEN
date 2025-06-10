"use client";
import React, { useState } from "react";
import ChatBot from "./components/ChatBot";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';

// DailyPlan bileşenini dinamik olarak içe aktar
const DailyPlan = dynamic(() => import('@/components/DailyPlan'), {
  ssr: false
});

type Task = {
  id: number;
  text: string;
  category: string;
  completed: boolean;
};

// Kategori bazlı istatistik hesaplama fonksiyonu
function getCategoryStats(tasks: Task[], category: string) {
  const filtered = tasks.filter(t => t.category === category);
  if (filtered.length === 0) return 0;
  const completed = filtered.filter(t => t.completed).length;
  return Math.round((completed / filtered.length) * 100);
}
// Toplam istatistik
function getTotalStats(tasks: Task[]) {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.completed).length;
  return Math.round((completed / tasks.length) * 100);
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dailyPlanTasksForStats, setDailyPlanTasksForStats] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (newTaskText.trim() && selectedCategory) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        category: selectedCategory,
        completed: false
      };
      setTasks([newTask, ...tasks]);
      setNewTaskText("");
      setSelectedCategory("");
      setShowAddTask(false);
    }
  };

  const handleToggleTask = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* İçerik */}
      <div className="flex-1 flex flex-col gap-6 p-6 pt-20 max-w-screen-lg mx-auto w-full">
        {/* Resim Alanı - En üstte tam genişlikte */}
        <div className="w-full h-40 bg-very-light-grey-beige rounded-xl flex items-center justify-between text-gray-600 text-lg border border-light-purplish-grey relative overflow-hidden px-8 shadow-md">
          <img src="/girisresmi.jpg" alt="Banner" className="w-full h-full object-cover object-center absolute left-0 top-0 z-10 rounded-xl" />
          <span className="relative z-20 italic text-white text-5xl drop-shadow-md">
            LumeAI
          </span>
          <div className="relative z-20 flex flex-col items-center gap-1">
            <span className="italic text-white text-3xl drop-shadow-md">
              Hoş Geldiniz!
            </span>
            <span className="text-white text-base drop-shadow-sm">
              "Kendini geliştirmek, hayatın en büyük yatırımıdır"
            </span>
          </div>
        </div>
        
        {/* Alt Kısım - Yan yana kutular */}
        <div className="flex gap-6">
          {/* Sol Taraf - Günün Planı */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Günün Planı Başlığı */}
            <div className="italic text-white text-4xl drop-shadow-md bg-dark-grey-blue p-2 rounded-xl text-center">Günün Planı</div>
            {/* Günün Planı Bloğu */}
            <div className="bg-white rounded-lg shadow-md w-full mb-8">
              <DailyPlan onTasksUpdate={setDailyPlanTasksForStats} />
            </div>
            {/* Günlük İstatistikler */}
            <div className="bg-very-light-grey-beige rounded-2xl p-4 border border-light-purplish-grey">
              <div className="font-bold text-xl text-dark-grey-blue mb-4">Günlük İstatistik</div>
              <div className="flex flex-row gap-8">
                {/* Hobi */}
                <div className="flex flex-col items-center gap-2">
                  <div className="font-semibold">Hobi</div>
                  <div className="w-full bg-light-purplish-grey rounded-4 h-2 overflow-hidden">
                    <div className="bg-dark-grey-blue h-2 rounded-4" style={{ width: `${getCategoryStats(dailyPlanTasksForStats, 'Hobi')}%` }}></div>
                  </div>
                  <div className="text-sm">%{getCategoryStats(dailyPlanTasksForStats, 'Hobi')}</div>
                </div>
                {/* Kişisel Gelişim */}
                <div className="flex flex-col items-center gap-2">
                  <div className="font-semibold">Kişisel Gelişim</div>
                  <div className="w-full bg-light-purplish-grey rounded-4 h-2 overflow-hidden">
                    <div className="bg-dark-grey-blue h-2 rounded-4" style={{ width: `${getCategoryStats(dailyPlanTasksForStats, 'Kişisel Gelişim')}%` }}></div>
                  </div>
                  <div className="text-sm">%{getCategoryStats(dailyPlanTasksForStats, 'Kişisel Gelişim')}</div>
                </div>
                {/* Ders */}
                <div className="flex flex-col items-center gap-2">
                  <div className="font-semibold">Ders</div>
                  <div className="w-full bg-light-purplish-grey rounded-4 h-2 overflow-hidden">
                    <div className="bg-dark-grey-blue h-2 rounded-4" style={{ width: `${getCategoryStats(dailyPlanTasksForStats, 'Ders')}%` }}></div>
                  </div>
                  <div className="text-sm">%{getCategoryStats(dailyPlanTasksForStats, 'Ders')}</div>
                </div>
                {/* Toplam */}
                <div className="flex flex-col items-center gap-2">
                  <div className="font-semibold">Toplam</div>
                  <div className="w-full bg-light-purplish-grey rounded-4 h-2 overflow-hidden">
                    <div className="bg-dark-grey-blue h-2 rounded-4" style={{ width: `${getTotalStats(dailyPlanTasksForStats)}%` }}></div>
                  </div>
                  <div className="text-sm">%{getTotalStats(dailyPlanTasksForStats)}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Sağdaki Boş Kutu - Artık ChatBot'u içerecek */}
          <div className="flex-1 h-[600px]">
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
}