
import { GoogleGenAI } from "@google/genai";

export const getPsychologicalCoaching = async (usageContext: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${usageContext}. 
                Behavior: User is exceeding digital usage limits. 
                Task: Generate a 1-sentence motivational psychological message as a security AI. 
                Tone: Stern, professional, cyber-security oriented.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Cognitive boundaries reached. Restricting access to optimize productivity cycles.";
  }
};
