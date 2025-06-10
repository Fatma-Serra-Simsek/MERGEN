"use client";
import React, { useState, useEffect } from 'react';

// Reusing types and constants from Calendar.tsx
const STORAGE_KEY = 'calendarPlansV2';

interface DayPlan {
  todos: { text: string; done: boolean; category: string }[];
  shopping: string[];
  note: string;
}

function getPlanKey(year: number, month: number, day: number) {
  return `${year}-${month + 1}-${day}`;
}

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

const dayNames = [
  'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
];

// Renk paleti (Calendar.tsx ile aynı)
const palette = {
  dark: '#4d516d',
  pink: '#a8868c',
  lilac: '#b5a4b4',
  beige: '#d3bcb6',
  light: '#dddad5',
};

const DailyPlan: React.FC = ({ onTasksUpdate }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const [dailyPlan, setDailyPlan] = useState<DayPlan | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPlans = localStorage.getItem(STORAGE_KEY);
      if (storedPlans) {
        const plans = JSON.parse(storedPlans);
        const todayKey = getPlanKey(currentYear, currentMonth, currentDay);
        const currentDailyPlan = plans[todayKey] || null;
        setDailyPlan(currentDailyPlan);

        // Eğer görevler varsa, ana bileşene gönder
        if (currentDailyPlan && currentDailyPlan.todos) {
          onTasksUpdate(currentDailyPlan.todos.map(todo => ({
            id: Date.now() + Math.random(), // Geçici ID
            text: todo.text,
            category: todo.category,
            completed: todo.done
          })));
        }
      }
    }
  }, [currentYear, currentMonth, currentDay, onTasksUpdate]);

  // Görev tamamlama/tamamlamayı geri alma
  const handleToggleTask = (index: number) => {
    if (dailyPlan) {
      const newTodos = dailyPlan.todos.map((todo, i) => 
        i === index ? { ...todo, done: !todo.done } : todo
      );
      const newPlan = { ...dailyPlan, todos: newTodos };
      setDailyPlan(newPlan);

      // localStorage'ı güncelle
      const planKey = getPlanKey(currentYear, currentMonth, currentDay);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const plans = JSON.parse(raw);
        plans[planKey] = newPlan;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
      }

      // Ana bileşene güncel görevleri gönder
      onTasksUpdate(newTodos.map(todo => ({
        id: Date.now() + Math.random(), // Geçici ID
        text: todo.text,
        category: todo.category,
        completed: todo.done
      })));
    }
  };

  if (!dailyPlan || (!dailyPlan.todos.some(t => t.text.trim()) && !dailyPlan.shopping.some(s => s.trim()) && !dailyPlan.note.trim())) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: palette.dark, fontFamily: 'serif' }}>
        Bugün için henüz bir plan yok. Planlama sayfasından ekleyebilirsiniz.
      </div>
    );
  }

  return (
    <div style={{ background: palette.beige, borderRadius: '12px', padding: '20px' }}>
      <h3 style={{ color: palette.dark, fontSize: '20px', marginBottom: '15px', textAlign: 'center', fontWeight: '500' }}>
        {currentDay} {monthNames[currentMonth]} {dayNames[today.getDay()]}
      </h3>
      {dailyPlan.todos.some(t => t.text.trim()) && (
        <div style={{ marginBottom: '15px' }}>
          <div className="space-y-2">
            {dailyPlan.todos.filter(t => t.text.trim()).map((todo, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', padding: '4px 0' }}>
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleToggleTask(index)}
                  style={{ accentColor: palette.pink, width: '18px', height: '18px' }}
                />
                <span style={{
                  flex: 1,
                  fontSize: '15px',
                  color: todo.done ? '#777' : palette.dark,
                  textDecoration: todo.done ? 'line-through' : 'none',
                }}>
                  {todo.text}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: palette.dark,
                    padding: '2px 8px',
                    borderRadius: '10px',
                    border: `1px solid ${palette.lilac}`,
                    backgroundColor: `transparent`,
                  }}
                >
                  {todo.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Alışveriş listesi ve not kısmı boşsa gösterme */}
      {dailyPlan.shopping.some(s => s.trim()) && (
        <div style={{ marginBottom: '15px' }}>
          <h4 style={{ color: palette.dark, fontSize: '18px', marginBottom: '10px', fontWeight: '500' }}>Alışveriş Listesi</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {dailyPlan.shopping.filter(s => s.trim()).map((item, index) => (
              <li key={index} style={{ marginBottom: '5px', color: palette.dark, fontSize: '15px' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {dailyPlan.note.trim() && (
        <div>
          <h4 style={{ color: palette.dark, fontSize: '18px', marginBottom: '10px', fontWeight: '500' }}>Not</h4>
          <p style={{ whiteSpace: 'pre-wrap', color: palette.dark, fontSize: '15px' }}>{dailyPlan.note}</p>
        </div>
      )}
    </div>
  );
};

export default DailyPlan; 