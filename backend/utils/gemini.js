const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getSymptomAnalysis = async (symptomsText) => {
  try {
    const prompt = `A patient reports the following symptoms: ${symptomsText}. List possible medical conditions in bullet points.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // ✅ use supported model

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "⚠️ Gemini returned no diagnosis. Try again with more detailed symptoms.";
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Gemini AI symptom analysis failed.");
  }
};

module.exports = { getSymptomAnalysis };
