import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set. Gemini features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBirthdayWish = async (name: string, age: number): Promise<string> => {
  const client = getClient();
  
  // Fallback message in Indonesian
  const fallbackMessage = "Semoga di usia 18 tahun ini, kamu menjadi pribadi yang lebih dewasa, selalu bahagia, tercapai semua cita-citamu, dan selalu dalam lindungan Tuhan. Happy Birthday!";

  if (!client) {
    return fallbackMessage;
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, poetic, and very touching birthday wish in Bahasa Indonesia (Indonesian Language) for a girl named ${name} who is turning ${age} today. 
      It should be warm, aesthetic, and suitable for a best friend. 
      Do not translate "Happy Birthday", keep that phrase in English.
      Keep it under 40 words.`,
    });

    return response.text || fallbackMessage;
  } catch (error) {
    console.error("Error generating wish:", error);
    return fallbackMessage;
  }
};