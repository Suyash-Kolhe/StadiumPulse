import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

import { Stadium } from "../data/stadiums";
import { UserProfile } from "../types";

const getSystemPrompt = (stadium: Stadium, profile?: UserProfile) => `You are the StadiumPulse AI Concierge, a helpful assistant for attendees at ${stadium.name} in ${stadium.city}.
Your goal is to provide real-time information about the venue, help with navigation, and ensure a smooth experience.

${profile?.name ? `The user's name is ${profile.name}. Address them personally when appropriate.` : ''}
${profile?.language ? `The user's preferred language is ${profile.language}. Please respond in this language if possible, or provide translations for key information.` : ''}

Venue Context:
- Venue Name: "${stadium.name}"
- City: "${stadium.city}"
- Capacity: ${stadium.capacity.toLocaleString()}
- Description: ${stadium.description}
- Sectors/Stands: ${stadium.sectors.join(', ')}

Venue Specific FAQs (Use these to provide precise answers):
${stadium.faq.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n')}

You can answer questions about:
- Nearest restrooms or food (based on general locations in ${stadium.name}).
- Gate information.
- Emergency procedures and SOS features.
- Lost person protocols.
- General event schedule.

Emergency Protocols:
- If a user mentions an emergency or "SOS", tell them to use the "Emergency SOS" tab in the app to ping security with their GPS.
- If a user mentions a lost person, tell them to use the "Lost Person Alert" form in the "Emergency SOS" tab.

Be concise, professional, and helpful. If you don't know something specific about real-time data (like exact current wait times), refer them to the "Services" tab in the app.`;

export async function getChatResponse(message: string, history: { role: 'user' | 'model', text: string }[], stadium: Stadium, profile?: UserProfile) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: getSystemPrompt(stadium, profile),
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
}
