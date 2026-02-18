
import { GoogleGenAI, Type } from "@google/genai";
import { SummaryResult } from "../types";

export const processPdfWithGemini = async (base64Pdf: string, subject: string): Promise<SummaryResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key is missing");

  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'application/pdf',
            data: base64Pdf,
          },
        },
        {
          text: `You are an elite academic professor specializing in ${subject}. Analyze the provided PDF and create a "Smart Revision Kit".
          
          Your response MUST be in valid JSON format.
          
          For the "formulas" section:
          - If the subject is technical (Math, Science, Econ), provide the most critical equations using standard LaTeX notation (e.g., $E=mc^2$).
          - If the subject is non-technical (History, Lit), use this section for "Key Rules", "Major Dates", or "Thematic Frameworks".
          
          JSON Structure:
          {
            "summary": "High-level contextual overview (3-4 paragraphs)",
            "keyPoints": ["Crucial concept 1", "Crucial concept 2", ...],
            "formulas": [
              {
                "equation": "The LaTeX formula or key rule statement",
                "label": "Brief name of the formula/rule",
                "usage": "1-sentence explanation of when to use this or what the variables represent"
              }
            ],
            "videoSuggestions": [
              {
                "title": "Topic-specific video title",
                "query": "${subject} YouTube search query",
                "description": "How this visual resource reinforces the document's content"
              }
            ]
          }`
        }
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          keyPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          formulas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                equation: { type: Type.STRING },
                label: { type: Type.STRING },
                usage: { type: Type.STRING }
              },
              required: ["equation", "label", "usage"]
            }
          },
          videoSuggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                query: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "query", "description"]
            }
          }
        },
        required: ["summary", "keyPoints", "formulas", "videoSuggestions"]
      }
    }
  });

  try {
    const text = response.text;
    if (!text) throw new Error("No response from AI");
    const parsed = JSON.parse(text) as SummaryResult;
    return { ...parsed, subject };
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Could not analyze the document correctly.");
  }
};
