import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a minimalist floral line art image using Gemini.
 */
export const generateFloralArt = async (flowerName: string): Promise<string | null> => {
  if (!apiKey) {
    console.warn("No API Key provided. Returning null.");
    return null;
  }

  try {
    const prompt = `
      Create a simple, minimalist, continuous line drawing of a single ${flowerName} flower.
      Style: Elegant, hand-drawn ink illustration.
      Background: Pure white.
      Details: No shading, just black outlines. No text, no signature.
      Framing: Centered.
    `;

    // Using gemini-2.5-flash-image (Nano Banana) as per instructions for image generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      }
    });

    // Check parts for the image
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

/**
 * Generates an illustration for a specific date or event.
 */
export const generateDateIllustration = async (context: string, isHistorical: boolean): Promise<string | null> => {
  if (!apiKey) return null;

  try {
    let prompt;
    if (isHistorical) {
      prompt = `
        Create an artistic, aesthetic digital illustration representing this historical context: "${context}".
        Style: Soft, elegant, watercolor or ink wash style. Not too realistic, more artistic and evocative to fit a minimalist calendar.
        Colors: Muted, vintage, or soft tones.
        Aspect Ratio: Square.
        No text in the image.
      `;
    } else {
      prompt = `
        Create a serene, peaceful, and calming abstract digital art piece.
        Context: ${context}.
        Theme: Peace, tranquility, mindfulness.
        Style: Soft pastel colors, watercolor texture, dreamy, minimalist, ethereal.
        Content: Nature elements like clouds, water ripples, flowers, or soft gradients. 
        Aspect Ratio: Square.
        No text.
      `;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });

    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Error generating date illustration:", error);
    return null;
  }
};

/**
 * Generates a calming quote.
 */
export const generatePeaceQuote = async (): Promise<string | null> => {
  if (!apiKey) return null;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a short, soothing, original affirmation or quote about finding peace and calmness in the present moment. Max 20 words. No quotation marks.',
    });
    return response.text;
  } catch (error) {
    console.error("Error generating quote:", error);
    return null;
  }
};