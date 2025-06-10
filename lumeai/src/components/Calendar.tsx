"use client";
import React, { useState } from 'react';

const pastelGreens = [
  '#dbe6c4', '#c9d6b6', '#b5c7a7', '#a7c7b7', '#b7c7a7', '#c7c7a7', '#d7e6c4',
  '#e6e6c4', '#e6d7c4', '#c4e6d7', '#c4d7e6', '#c4e6c7', '#d7c4e6', '#e6c4d7',
];

const monthNames = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  // Pazartesi=0, Pazar=6 olacak şekilde ayarlıyoruz
  const jsDay = new Date(year, month, 1).getDay();
  return (jsDay + 6) % 7;
}
function getDayName(year: number, month: number, day: number) {
  const jsDay = new Date(year, month, day).getDay();
  return dayNames[(jsDay + 6) % 7];
}

// LocalStorage anahtarı
const STORAGE_KEY = 'calendarPlansV2';

// Günlük plan tipi
interface DayPlan {
  todos: { text: string; done: boolean; category: string }[];
  shopping: string[];
  note: string;
}

function getPlanKey(year: number, month: number, day: number) {
  return `${year}-${month + 1}-${day}`;
}

// Renk paleti
const palette = {
  dark: '#4d516d',
  pink: '#a8868c',
  lilac: '#b5a4b4',
  beige: '#d3bcb6',
  light: '#dddad5',
};

const Calendar: React.FC = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  // Yeni görev eklemek için state'ler
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Ders'); // Varsayılan kategori

  // Tüm planlar (localStorage ile senkronize)
  const [plans, setPlans] = useState<{ [key: string]: DayPlan }>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  });
  // Modal aç/kapa
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = (day: number) => {
    setSelectedDay(day);
    setNewTaskText(''); // Modalı açtığında görev metnini sıfırla
    setSelectedCategory('Ders'); // Modalı açtığında kategoriyi sıfırla
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Modalda seçili günün planı
  let planKey = '';
  let plan: DayPlan = { todos: [], shopping: Array(8).fill(''), note: '' }; // Varsayılan boş plan
  if (selectedDay) {
    planKey = getPlanKey(year, month, selectedDay);
    plan = plans[planKey] || { todos: [], shopping: Array(8).fill(''), note: '' };
  }

  // Yeni görev ekleme
  const handleAddTask = () => {
    if (newTaskText.trim() && selectedCategory) {
      const newTodo = { text: newTaskText.trim(), done: false, category: selectedCategory };
      updatePlan({ ...plan, todos: [...plan.todos, newTodo] });
      setNewTaskText('');
      setSelectedCategory('Ders');
    }
  };

  // Görev tamamlama/tamamlamayı geri alma
  const handleToggleTask = (index: number) => {
    const newTodos = plan.todos.map((todo, i) => 
      i === index ? { ...todo, done: !todo.done } : todo
    );
    updatePlan({ ...plan, todos: newTodos });
  };

  // Görev metnini güncelleme
  const handleUpdateTaskText = (index: number, text: string) => {
    const newTodos = plan.todos.map((todo, i) =>
      i === index ? { ...todo, text: text } : todo
    );
    updatePlan({ ...plan, todos: newTodos });
  };

  // Görev silme
  const handleDeleteTask = (index: number) => {
    const newTodos = plan.todos.filter((_, i) => i !== index);
    updatePlan({ ...plan, todos: newTodos });
  };

  // Modal başlığı için gün adı ve tarih
  let modalTitle = '';
  if (selectedDay) {
    modalTitle = `${selectedDay} ${monthNames[month]} - ${getDayName(year, month, selectedDay)}`;
  }

  // Plan güncelleme fonksiyonu
  function updatePlan(newPlan: DayPlan) {
    if (!selectedDay) return;
    const newPlans = { ...plans, [planKey]: newPlan };
    setPlans(newPlans);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlans));
  }

  // Seçilen günün geçmiş bir tarih olup olmadığını kontrol et
  const isPastDate = selectedDay ? new Date(year, month, selectedDay).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) : false;

  // Takvimdeki günleri oluştur
  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null); // Boş kutucuk
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  // Her gün için görev sayısı ve tamamlanan görev sayısı
  function getTodoStats(day: number) {
    const key = getPlanKey(year, month, day);
    const p = plans[key];
    if (!p) return { total: 0, done: 0 };
    const total = p.todos.filter(t => t.text.trim()).length;
    const done = p.todos.filter(t => t.text.trim() && t.done).length;
    return { total, done };
  }

  // En alt notlar kutusu için state
  const [footerNote, setFooterNote] = useState(() => localStorage.getItem('footerNote') || '');
  function handleFooterNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFooterNote(e.target.value);
    localStorage.setItem('footerNote', e.target.value);
  }

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', background: '#fafafa', margin: 0, padding: 0, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {/* Üstte ay/yıl seçici */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '2rem 0 1rem 0', position: 'relative' }}>
        <button onClick={() => setMonth(m => m === 0 ? 11 : m - 1)} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', color: palette.dark }}>{'<'}</button>
        <span style={{ fontSize: 36, color: palette.dark, fontWeight: 700, letterSpacing: 2, cursor: 'pointer' }} onClick={() => setShowMonthSelect(v => !v)}>{monthNames[month]}</span>
        {showMonthSelect && (
          <div style={{ position: 'absolute', top: '3.5rem', left: '50%', transform: 'translateX(-50%)', background: palette.light, border: `1px solid ${palette.lilac}` , borderRadius: 8, zIndex: 10, boxShadow: '0 2px 12px #bbb', padding: 8, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {monthNames.map((m, idx) => (
              <div key={m} style={{ padding: 6, cursor: 'pointer', color: idx === month ? palette.light : palette.dark, background: idx === month ? palette.dark : 'transparent', borderRadius: 6, textAlign: 'center', fontWeight: 600 }} onClick={() => { setMonth(idx); setShowMonthSelect(false); }}>{m}</div>
            ))}
          </div>
        )}
        <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} style={{ width: 70, fontSize: 24, marginLeft: 12, border: 'none', borderBottom: `2px solid ${palette.lilac}` , background: 'transparent', color: palette.dark, textAlign: 'center' }} />
        <button onClick={() => setMonth(m => m === 11 ? 0 : m + 1)} style={{ fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', color: palette.dark }}>{'>'}</button>
      </div>
      {/* Gün isimleri */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', maxWidth: 1100, width: '100%', margin: '0 auto', marginBottom: 8 }}>
        {dayNames.map(day => (
          <div key={day} style={{ textAlign: 'center', fontWeight: 600, fontSize: 18, padding: 8, fontFamily: 'monospace', color: palette.dark }}>{day}</div>
        ))}
      </div>
      {/* Takvim grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: 'minmax(90px, 1fr)', gap: 18, maxWidth: 1100, width: '100%', margin: '0 auto', marginBottom: 24 }}>
        {calendarDays.map((day, i) => {
          const bgColor = day === null ? 'transparent' : [palette.lilac, palette.pink, palette.beige, palette.light, palette.dark][i % 5];
          return (
            <div key={i} style={{
              background: bgColor,
              borderRadius: 24,
              minHeight: 90,
              minWidth: 60,
              boxShadow: day === null ? 'none' : `0 2px 8px ${palette.lilac}33`,
              position: 'relative',
              cursor: day ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: 12,
              transition: 'box-shadow 0.2s',
              flexDirection: 'column',
            }} onClick={() => day && openModal(day)}>
              {day && (
                <>
                  <div style={{
                    width: 18,
                    height: 18,
                    background: palette.light,
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    border: `1px solid ${palette.lilac}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    color: palette.dark,
                    fontWeight: 700,
                  }}>{day}</div>
                  {/* Görev istatistikleri */}
                  <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 13, color: palette.dark, background: `${palette.light}cc`, borderRadius: 8, padding: '1px 6px', fontWeight: 600 }}>
                    {(() => {
                      const stats = getTodoStats(day);
                      if (stats.total === 0) return null;
                      const percent = Math.round((stats.done / stats.total) * 100);
                      return <span>{percent}% | {stats.done}/{stats.total}</span>;
                    })()}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      {/* Notlar kutusu */}
      <div style={{ background: palette.beige, borderRadius: 18, minHeight: 60, padding: '0.7rem 1.2rem', color: palette.dark, width: '100%', maxWidth: 900, margin: '0 auto 2rem auto', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
        <span style={{ background: palette.light, borderRadius: 8, padding: '0.1rem 0.5rem', marginRight: 8, fontSize: '1rem', fontFamily: 'monospace', color: palette.dark }}>notes</span>
        <textarea
          value={footerNote}
          onChange={handleFooterNoteChange}
          placeholder="Notunuzu buraya yazın..."
          style={{
            width: '100%',
            minHeight: 40,
            border: 'none',
            background: 'transparent',
            color: palette.dark, // Footer not metin rengi
          }}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(77,81,109,0.18)', // Resimdeki gibi daha koyu, hafif şeffaf arka plan
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={closeModal}>
          <div style={{ background: palette.light, borderRadius: 18, padding: 24, minWidth: 400, maxWidth: 500, width: '90%', boxShadow: `0 8px 32px ${palette.lilac}99`, position: 'relative', display: 'flex', flexDirection: 'column', gap: 12 }} onClick={e => e.stopPropagation()}>
            <button onClick={closeModal} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: palette.pink }}>×</button>
            <h2 style={{ color: palette.pink, fontFamily: 'serif', fontWeight: 700, fontSize: 26, margin: '0 auto 12px auto', textAlign: 'center' }}>{modalTitle}</h2>

            {/* YAPILACAKLAR */}
            <div style={{ border: `1px solid ${palette.lilac}`, borderRadius: 8, background: palette.beige, padding: 8, marginBottom: 4 }}>
              <div style={{ color: palette.dark, fontWeight: 700, fontSize: 18, marginBottom: 4, textAlign: 'center' }}>YAPILACAKLAR</div>
              
              {plan.todos.filter(t => t.text.trim()).map((todo, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <input type="checkbox" checked={todo.done} onChange={() => handleToggleTask(i)} style={{ accentColor: palette.pink, marginLeft: 4 }} disabled={isPastDate} />
                  <input type="text" value={todo.text} onChange={(e) => handleUpdateTaskText(i, e.target.value)} placeholder="Görev..." style={{ flex: 1, border: 'none', borderBottom: `1px solid ${palette.lilac}`, background: 'transparent', fontSize: 15, color: palette.dark }} disabled={isPastDate} />
                  <span style={{ fontSize: 12, color: palette.dark, marginLeft: 'auto' }}>{todo.category}</span> {/* Kategori gösterimi */}
                  <button onClick={() => handleDeleteTask(i)} style={{ background: 'none', border: 'none', color: palette.pink, cursor: 'pointer', fontSize: '18px', marginLeft: '5px' }} disabled={isPastDate}>×</button>
                </div>
              ))}

              <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: `1px solid ${palette.lilac}`, outline: 'none', background: palette.lilac, color: 'white', marginTop: '8px' }}>
                <option value="Ders">Ders</option>
                <option value="Hobi">Hobi</option>
                <option value="Kişisel Gelişim">Kişisel Gelişim</option>
              </select>
              <textarea
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Yeni görev ekle..."
                style={{ width: '100%', minHeight: '40px', border: `1px solid ${palette.lilac}`, background: palette.lilac, fontSize: '15px', resize: 'vertical', outline: 'none', padding: '8px', borderRadius: '4px', color: 'white', marginTop: '8px' }}
              />
              <button onClick={handleAddTask} style={{ padding: '8px 12px', background: palette.pink, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '8px' }}>Görev Ekle</button>
            </div>

            {/* ALIŞVERİŞ LİSTESİ */}
            <div style={{ border: `1px solid ${palette.lilac}`, borderRadius: 8, background: palette.beige, padding: 8, marginBottom: 4 }}>
              <div style={{ color: palette.dark, fontWeight: 700, fontSize: 18, marginBottom: 4, textAlign: 'center' }}>ALIŞVERİŞ LİSTESİ</div>
              {plan.shopping.map((item, i) => (
                <input
                  key={i}
                  type="text"
                  value={item}
                  onChange={e => {
                    const newShopping = plan.shopping.map((t, idx) => idx === i ? e.target.value : t);
                    updatePlan({ ...plan, shopping: newShopping });
                  }}
                  placeholder="..."
                  style={{ flex: 1, border: 'none', borderBottom: `1px solid ${palette.lilac}`, background: 'transparent', fontSize: 15, color: palette.dark, marginBottom: '8px' }}
                  disabled={isPastDate}
                />
              ))}
            </div>

            {/* NOT */}
            <div style={{ border: `1px solid ${palette.lilac}`, borderRadius: 8, background: palette.beige, padding: 8, marginBottom: 4 }}>
              <div style={{ color: palette.dark, fontWeight: 700, fontSize: 18, marginBottom: 4, textAlign: 'center' }}>NOT</div>
              <textarea
                value={plan.note}
                onChange={e => updatePlan({ ...plan, note: e.target.value })}
                style={{ width: '100%', minHeight: 40, border: 'none', background: 'transparent', fontSize: 15, resize: 'vertical', borderBottom: `1px solid ${palette.lilac}`, color: palette.dark }}
                placeholder="Not..."
                disabled={isPastDate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 