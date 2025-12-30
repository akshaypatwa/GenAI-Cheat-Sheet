import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const generateAnalogy = async (conceptTitle: string, conceptDefinition: string): Promise<string> => {
  try {
    const client = getAiClient();
    const prompt = `
      You are an expert tech educator explaining complex GenAI concepts to a LinkedIn audience.
      
      Concept: ${conceptTitle}
      Definition: ${conceptDefinition}
      
      Please provide:
      1. A simple, relatable "Real World Analogy" (ELI5 style).
      2. A concise "Pro Tip" on how it is effectively used in industry.
      
      Keep it short, punchy, and engaging. Use emojis. Format with Markdown.
    `;

    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "Could not generate content at this time.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Unable to connect to AI service. Please ensure API Key is valid.";
  }
};
