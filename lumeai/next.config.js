/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY, // Gemini API Key
  },
  async rewrites() {
    return [
    ];
  },
};

module.exports = nextConfig; 