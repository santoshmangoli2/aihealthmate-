const axios = require('axios');
const { GEMINI_API_KEY, GEMINI_API_URL } = require('../config/gemini');

const getSymptomAnalysis = async (symptomsText) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: `What could be the diagnosis for: ${symptomsText}` }] }]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No suggestions available.';
  } catch (error) {
    console.error('Gemini AI error:', error);
    throw new Error('Gemini AI symptom analysis failed');
  }
};

module.exports = { getSymptomAnalysis };