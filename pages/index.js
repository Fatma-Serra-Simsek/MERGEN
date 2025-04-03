export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = {
      event_title: formData.get('event_title'),
      start_time: formData.get('start_time'),
      end_time: formData.get('end_time'),
      event_type: formData.get('event_type')
    };

    try {
      const response = await fetch('/api/schedule/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Etkinlik başarıyla oluşturuldu!');
        e.target.reset();
        // Başarılı oluşturmadan sonra liste sayfasına yönlendir
        window.location.href = '/schedule/list';
      } else {
        alert('Hata: ' + result.error);
      }
    } catch (error) {
      alert('Bir hata oluştu: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Yeni Etkinlik Oluştur</h1>
        <a
          href="/schedule/list"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        >
          Etkinlikleri Görüntüle
        </a>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="event_title">Etkinlik Başlığı:</label>
          <input
            type="text"
            id="event_title"
            name="event_title"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div>
          <label htmlFor="start_time">Başlangıç Zamanı:</label>
          <input
            type="datetime-local"
            id="start_time"
            name="start_time"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div>
          <label htmlFor="end_time">Bitiş Zamanı:</label>
          <input
            type="datetime-local"
            id="end_time"
            name="end_time"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        
        <div>
          <label htmlFor="event_type">Etkinlik Tipi:</label>
          <select
            id="event_type"
            name="event_type"
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="class">Ders</option>
            <option value="meeting">Toplantı</option>
            <option value="exam">Sınav</option>
            <option value="personal">Kişisel</option>
          </select>
        </div>
        
        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Etkinlik Oluştur
        </button>
      </form>
    </div>
  );
} 