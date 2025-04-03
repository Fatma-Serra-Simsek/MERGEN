import connectDB from '../../utils/db';

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({ message: 'MongoDB bağlantısı başarılı!' });
  } catch (error) {
    res.status(500).json({ error: 'Veritabanı bağlantısı başarısız: ' + error.message });
  }
} 