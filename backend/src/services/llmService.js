import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Very strict system prompt for safety
const SYSTEM_PROMPT = `
You are a cautious health information assistant.
You ONLY provide:
- General, high-level educational information about POSSIBLE CAUSES or categories (e.g., "respiratory infections", "muscle strain").
- Practical next steps like "see a doctor", "keep a symptom diary", or "ask about X".
- Red-flag symptoms that should prompt urgent medical care.

SAFETY RULES (must ALWAYS follow):
- Do NOT give diagnoses or rule diseases in/out.
  - Never say "you have", "you don't have", "this is not", "this rules out".
- Do NOT give medication names, dosages, or treatment plans.
- Do NOT give instructions that replace emergency services.
- ALWAYS say: "This is NOT medical advice or a diagnosis. Always consult a doctor or qualified health professional."

OUTPUT FORMAT:
Return JSON with this shape:
{
  "possibleCauses": ["string", "..."],
  "nextSteps": ["string", "..."],
  "redFlags": ["string", "..."],
  "disclaimer": "string"
}
Use clear, simple English.
`;

export const analyzeSymptomsWithLLM = async (symptomsText) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  // NEW: use text.format instead of response_format
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: `Symptoms (user words): ${symptomsText}`,
      },
    ],
    text: {
      // Turn on JSON mode for Responses API
      format: {
        type: "json_object",
      },
    },
  });

  // The Responses API exposes the main text as output_text (string)
  const jsonStr = response.output_text;

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse LLM JSON:", e.message, jsonStr);
    throw new Error("Model returned invalid JSON");
  }

  return {
    possibleCauses: parsed.possibleCauses || [],
    nextSteps: parsed.nextSteps || [],
    redFlags: parsed.redFlags || [],
    disclaimer:
      parsed.disclaimer ||
      "This is NOT medical advice or a diagnosis. Always consult a doctor.",
    rawText: jsonStr,
  };
};
