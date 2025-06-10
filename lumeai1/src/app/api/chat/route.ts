import { NextResponse } from 'next/server';
// import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Basit yanıt sistemi
const responses = {
  greeting: [
    "Merhaba! Size nasıl yardımcı olabilirim?",
    "Hoş geldiniz! Bugün size nasıl yardımcı olabilirim?",
    "Selam! LumeAI asistanınız burada, size nasıl yardımcı olabilirim?"
  ],
  default: [
    "Bu konuda size yardımcı olmak isterim. Biraz daha detay verebilirsiniz?",
    "İlginç bir soru! Bunu biraz daha açabilir misiniz?",
    "Bu konuyu daha iyi anlayabilmem için biraz daha bilgi verebilir misiniz?"
  ],
  farewell: [
    "Görüşmek üzere! İyi günler dilerim.",
    "Tekrar görüşmek üzere! Başka bir sorunuz olursa buradayım.",
    "İyi günler! Yardıma ihtiyacınız olursa yine beklerim."
  ]
};

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('merhaba') || lowerMessage.includes('selam') || lowerMessage.includes('hey')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  }
  
  if (lowerMessage.includes('güle güle') || lowerMessage.includes('hoşça kal') || lowerMessage.includes('görüşürüz')) {
    return responses.farewell[Math.floor(Math.random() * responses.farewell.length)];
  }
  
  return responses.default[Math.floor(Math.random() * responses.default.length)];
}

export async function POST(request: Request) {
  try {
    console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY ? 'Loaded' : 'Not Loaded'); // Check if API key is loaded
    const { message } = await request.json();

    console.log('Received message:', message); // Log received message

    let systemMessage = "Sen LumeAI asistanısın. Kullanıcılara yardımcı olmak için buradasın. Türkçe yanıt ver.";
    let userMessage = message;

    // Planlama isteği kontrolü
    if (message.toLowerCase().includes('plan yap') || message.toLowerCase().includes('günlük plan')) {
      systemMessage = "Sen bir planlama koçusun. Kullanıcının isteklerine göre detaylı bir günlük plan oluştur. Kullanıcının ilgi alanlarını, mevcut zamanını ve önceliklerini dikkate al. Planı madde madde sun.";
    }

    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: systemMessage
    //     },
    //     {
    //       role: "user",
    //       content: userMessage
    //     }
    //   ],
    //   temperature: 0.7,
    //   max_tokens: 500,
    // });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

    console.log('Sending to Gemini...', {systemMessage, userMessage}); // Log before sending
    const result = await model.generateContent(systemMessage + "\nKullanıcı: " + userMessage);
    console.log('Received from Gemini:', result); // Log received result

    const response = result.response.text();
    console.log('Generated response:', response); // Log final response

    // const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat route:', error); // Improved error logging
    // Try to get more details from the error object
    if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        // You might need to inspect the specific error object structure for more details
        // console.error('Full error object:', JSON.stringify(error, null, 2));
    } else if (typeof error === 'object' && error !== null && 'status' in error) {
         console.error('Error status:', (error as any).status);
         console.error('Error data:', (error as any).data);
    }

    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
} 