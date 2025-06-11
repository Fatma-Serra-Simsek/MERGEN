import fs from 'fs/promises';
import path from 'path';

interface User {
  email: string;
  password: string;
  name?: string;
  username?: string;
}

const usersFilePath = path.resolve(process.cwd(), 'src/app/api/auth/users.json');

export async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // Dosya yoksa boş bir dizi döndür
      return [];
    }
    console.error('Kullanıcılar okunurken hata oluştu:', error);
    throw error;
  }
}

export async function writeUsers(users: User[]): Promise<void> {
  try {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (error) {
    console.error('Kullanıcılar yazılırken hata oluştu:', error);
    throw error;
  }
} 