import connectDB from '../../../utils/db';
import Schedule from '../../../models/Schedule';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST metodu destekleniyor' });
  }

  try {
    await connectDB();

    // Geçici bir kullanıcı ID'si oluştur
    const tempUserId = new mongoose.Types.ObjectId();

    const schedule = new Schedule({
      user_id: tempUserId,
      event_title: req.body.event_title,
      start_time: new Date(req.body.start_time),
      end_time: new Date(req.body.end_time),
      event_type: req.body.event_type
    });

    await schedule.save();
    res.status(201).json({ message: 'Etkinlik başarıyla oluşturuldu', schedule });
  } catch (error) {
    res.status(500).json({ error: 'Etkinlik oluşturulurken hata: ' + error.message });
  }
} 