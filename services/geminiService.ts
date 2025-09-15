
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface GenerateNicknamesParams {
  keyword: string;
  symbol: string;
  count: number;
  platform: string;
}

export const generateNicknames = async ({
  keyword,
  symbol,
  count,
  platform,
}: GenerateNicknamesParams): Promise<string[]> => {
  try {
    const prompt = `You are an expert in creating cool, stylish, and unique nicknames for gamers and social media users.
      Generate 5 distinct nicknames based on the following criteria:
      - Main Keyword: "${keyword}"
      - Symbol to incorporate: "${symbol}"
      - Number of times to use the symbol per nickname: ${count}
      - Target Platform: "${platform}"
      
      Instructions:
      1. Creatively integrate the symbol into and around the keyword.
      2. The style should be modern and fitting for the platform.
      3. Avoid simply adding the symbol at the beginning or end. Be artistic.
      4. Ensure the output is only a JSON array of strings.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
            description: "A unique and stylish nickname"
          }
        },
        temperature: 0.9,
      },
    });
    
    const jsonString = response.text.trim();
    const generatedNames = JSON.parse(jsonString);
    
    if (Array.isArray(generatedNames) && generatedNames.every(item => typeof item === 'string')) {
        return generatedNames;
    } else {
        throw new Error("Invalid response format from API.");
    }

  } catch (error) {
    console.error("Error generating nicknames:", error);
    throw new Error("Failed to generate nicknames. Please check your API key and try again.");
  }
};
