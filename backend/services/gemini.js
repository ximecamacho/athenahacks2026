const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateQuestion(language, difficulty) {
  const difficultyGuide = {
    easy: "Basic syntax only: printing a string, declaring a variable, simple output. No math, no logic, no functions.",
    medium: "Simple arithmetic: write a function that adds, subtracts, multiplies or divides two numbers and prints the result.",
    hard: "Algorithms: find the minimum or maximum in a list, count occurrences, or reverse a string using loops."
  };

  const prompt = `You are a coding challenge generator.
Generate a ${language} coding challenge at ${difficulty} difficulty.

Difficulty rule: ${difficultyGuide[difficulty] || difficultyGuide.easy}

Respond ONLY with JSON in this format:
{
  "prompt": "the challenge description",
  "topic": "topic name",
  "expectedOutput": "what the code should output",
  "sampleSolution": "the correct code"
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
  });

  const text = response.text;
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

async function checkCode(playerCode, question, language) {
  const prompt = `You are a code judge.
The player was given this challenge: "${question.prompt}"
Expected output: "${question.expectedOutput}"
The player submitted this ${language} code: ${playerCode}

Respond ONLY with JSON in this format:
{
  "correct": true,
  "partialScore": 0,
  "feedback": "one or two sentences about their code",
  "hint": "one sentence nudge if they were wrong"
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
  });

  const text = response.text;
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

async function generateMatchFeedback(winnerCode, loserCode, question) {
  const prompt = `You are a coding mentor.
The challenge was: "${question.prompt}"
Winner's code: ${winnerCode}
Loser's code: ${loserCode}

Respond ONLY with JSON in this format:
{
  "winnerNote": "two sentences praising the winner",
  "loserNote": "two sentences encouraging the loser",
  "keyLesson": "one sentence takeaway for both players"
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt,
  });

  const text = response.text;
  const cleaned = text.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

module.exports = { generateQuestion, checkCode, generateMatchFeedback };