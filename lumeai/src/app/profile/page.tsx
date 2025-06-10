'use client';

import { useState } from 'react';

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('melisa kahraman');
  const [email, setEmail] = useState('melisakahrraman2005@gmail.com');
  const [dob, setDob] = useState('2005-03-21'); // Date of Birth

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = () => {
    // Burada profil bilgilerini kaydetme mantığı olacak (örneğin API çağrısı)
    alert('Profil bilgileri kaydedildi!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            LumeAI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Profilim
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
            {profileImage ? (
              <img src={profileImage} alt="Profil Resmi" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-6xl">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
            <label htmlFor="profile-image-upload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
              Resmi Yükle
              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-800">{username}</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta</label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
            <input
              type="date"
              id="dob"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ayarlar</h2>
            <ul className="space-y-2">
              <li className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
                <span className="text-gray-700">Şifre Değiştir</span>
                <button className="text-indigo-600 hover:text-indigo-900 font-medium">Değiştir</button>
              </li>
              <li className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
                <span className="text-gray-700">Bildirim Ayarları</span>
                <button className="text-indigo-600 hover:text-indigo-900 font-medium">Ayarlar</button>
              </li>
              <li className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
                <span className="text-gray-700">Gizlilik Ayarları</span>
                <button className="text-indigo-600 hover:text-indigo-900 font-medium">Ayarlar</button>
              </li>
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kaydet
            </button>
          </div>
        </div>

        {/* Motive Edici Resim ve Metin */}
        <div className="mt-8 p-4 bg-gray-200 rounded-lg text-center">
          <img src="/placeholder-motivation.jpg" alt="Motive Edici Resim" className="mx-auto rounded-md mb-4" />
          <p className="text-gray-800 font-semibold italic">
            "Başarı, her gün küçük adımlar atmaktır. Her adım, hedefinize yaklaşmanızı sağlar."
          </p>
        </div>
      </div>
    </div>
  );
}
