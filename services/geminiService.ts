import { GoogleGenAI, Modality, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function dressInWinterOutfit(imagePart: Part): Promise<string | null> {
  const textPart: Part = {
    text: "Analyze the person in this image. Edit the image to dress them in a stylish and warm winter outfit. The outfit should be a complete set, including a cozy jacket or coat, winter pants or trousers, a beanie or winter hat, and a scarf. The generated clothing should look realistic and fit the person's pose and body shape. Do not change the person's face, hair, or the background of the image.",
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          imagePart,
          textPart,
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });
    
    // Find the image part in the response
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image with Gemini API.");
  }
}