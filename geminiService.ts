
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCropAdvisory = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: `You are AgriSmart AI, an expert agricultural scientist. 
      Your goal is to provide specific, actionable advice to farmers.
      For every crop diagnosis query, provide:
      1. Diagnosis: What is likely wrong with the plant.
      2. Immediate Action: 2-3 steps to take right now.
      3. Treatment: Recommended organic or safe chemical treatments.
      4. Precautions: How to prevent this in the future.
      Keep the tone helpful, professional, and simple for non-experts.`,
    },
  });
  return response.text;
};

export const getWeatherRecommendation = async (lat: number, lon: number, weatherContext: string) => {
  const prompt = `Location: ${lat}, ${lon}. Weather context: ${weatherContext}. 
  Provide a specific "Farmer's Recommendation" for this weather. 
  E.g., if it's rainy, suggest postponing pesticide spraying. If it's hot and dry, suggest specific irrigation times.
  Keep it under 3 sentences.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are a specialized agricultural weather consultant.",
    }
  });
  return response.text;
};

export const getMarketInsights = async (commodity?: string) => {
  const query = commodity 
    ? `Current Mandi prices and market strategy for ${commodity} in India.`
    : `Summary of current major agricultural commodity price trends in Indian markets.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      tools: [{ googleSearch: {} }],
      systemInstruction: "You are a market analyst specializing in Indian Agriculture (Mandis). Provide current price ranges and selling strategies (hold vs sell). List sources used.",
    }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(c => c.web?.uri).filter(Boolean) || []
  };
};

export const getSchemeGuidance = async (query: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: query,
    config: {
      systemInstruction: "You are a social worker helping farmers understand Indian government schemes like PM-KISAN, PMFBY, etc. Simplify the complex jargon into benefits and application steps.",
    }
  });
  return response.text;
};
