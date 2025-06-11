import { NextResponse } from 'next/server';
import { readUsers } from '../data-handler';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('Giriş isteği alındı:', { email });

    const users = await readUsers();

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log('Giriş başarılı:', user.email);
      return NextResponse.json({
        success: true,
        message: 'Giriş başarılı',
      });
    }

    console.log('Giriş başarısız: Kullanıcı bulunamadı veya şifre yanlış', email);
    return NextResponse.json(
      {
        success: false,
        message: 'Geçersiz e-posta veya şifre',
      },
      { status: 401 }
    );
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Bir hata oluştu',
      },
      { status: 500 }
    );
  }
} 