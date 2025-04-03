import { useEffect, useState } from 'react';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/schedule/list')
      .then(res => res.json())
      .then(data => {
        setSchedules(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'class':
        return '#4CAF50'; // Yeşil
      case 'meeting':
        return '#2196F3'; // Mavi
      case 'exam':
        return '#f44336'; // Kırmızı
      case 'personal':
        return '#9C27B0'; // Mor
      default:
        return '#757575'; // Gri
    }
  };

  const getEventTypeName = (type) => {
    switch (type) {
      case 'class':
        return 'Ders';
      case 'meeting':
        return 'Toplantı';
      case 'exam':
        return 'Sınav';
      case 'personal':
        return 'Kişisel';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        Yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        Hata: {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Etkinlikler</h1>
        <a
          href="/"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          Yeni Etkinlik Ekle
        </a>
      </div>

      {schedules.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
          Henüz etkinlik bulunmuyor.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                border: '1px solid #eaeaea'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0 0 10px 0' }}>{schedule.event_title}</h3>
                <span
                  style={{
                    backgroundColor: getEventTypeColor(schedule.event_type),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  {getEventTypeName(schedule.event_type)}
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#666' }}>
                <div>
                  <strong>Başlangıç:</strong> {schedule.start_time}
                </div>
                <div>
                  <strong>Bitiş:</strong> {schedule.end_time}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 