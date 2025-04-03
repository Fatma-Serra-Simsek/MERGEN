import connectDB from '../../../utils/db';
import Schedule from '../../../models/Schedule';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Sadece GET metodu destekleniyor' });
  }

  try {
    await connectDB();
    const schedules = await Schedule.find({}).sort({ start_time: 1 });
    
    // Tarihleri Türkiye formatına çevir
    const formattedSchedules = schedules.map(schedule => ({
      id: schedule._id,
      event_title: schedule.event_title,
      start_time: new Date(schedule.start_time).toLocaleString('tr-TR'),
      end_time: new Date(schedule.end_time).toLocaleString('tr-TR'),
      event_type: schedule.event_type
    }));

    res.status(200).json(formattedSchedules);
  } catch (error) {
    res.status(500).json({ error: 'Etkinlikler listelenirken hata: ' + error.message });
  }
} 