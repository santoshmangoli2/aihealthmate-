// testGemini.mjs
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main() {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Explain how AI works in a few words");
    const response = await result.response;
    const text = response.text();

    console.log("✅ Gemini response:\n", text);
  } catch (err) {
    console.error("❌ Gemini SDK error:", err);
  }
}

main();
