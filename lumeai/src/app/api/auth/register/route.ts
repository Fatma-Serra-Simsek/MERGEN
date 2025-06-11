import { NextResponse } from 'next/server';
import { readUsers, writeUsers } from '../data-handler';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name, username } = body;

    console.log('Kayıt isteği alındı:', { email, name, username });

    const users = await readUsers();

    // E-posta zaten kayıtlı mı kontrol et
    if (users.some(user => user.email === email)) {
      console.log('Kayıt hatası: E-posta zaten kayıtlı', email);
      return NextResponse.json(
        { success: false, message: 'Bu e-posta adresi zaten kayıtlı.' },
        { status: 409 } // Conflict
      );
    }

    // Yeni kullanıcıyı ekle
    const newUser = { email, password, name, username };
    users.push(newUser);
    await writeUsers(users);
    
    console.log('Kayıt başarılı:', newUser.email);

    return NextResponse.json({ 
      success: true,
      message: 'Kayıt başarılı'
    });
  } catch (error) {
    console.error('Kayıt hatası:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Bir hata oluştu'
      },
      { status: 500 }
    );
  }
} 