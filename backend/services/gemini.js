const{GoogleGenerativeAI} = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function generateQuestion(language, difficulty) {
    const prompt = `You are a coding challenge generator.
        Generate a ${difficulty} ${language} coding challenge.
    Respond ONLY with JSON in this format:
    {
    "prompt": "the challenge description",
    "topic": "topic name",
    "expectedOutput": "what the code should output",
    "sampleSolution": "the correct code"
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);

}

async function checkCode(question, playerCode, language, expectedOutput){
    const prompt = `You are a code judge. 
    The player was given this challenge: "${question}" 
    Expected ouput: "${expectedOutput}" 
    The player submitted this ${language} code: ${playerCode}
    Respond Only with JSON in this format:
    {
        "correct": true or false,
        "partialScore": a nuber from 0 to 100,
        "feedback": "one or two sentences about their code",
        "hint": "one sentence nudge if they were wrong"
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
}

async function generateMatchFeedback(question, winnerCode, loserCode, language, winner, loser){
    const prompt = `You are a coding mentor.
    The challenge was: "${question}"
    ${winner}'s winning code ${winnerCode}
    ${loser}'s code: ${loserCode}
    Language: ${language}

    Respond ONLY with JSON in this format:
    {
    "winnerNote": "two sentences praising the winner",
    "loserNote": "two sentences encouraging the loser",
    "keyLesson": "one sentences takeaway for both player"
    }`

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
}

module.exports = { generateQuestion, checkCode, generateMatchFeedback };
generateQuestion("python", "easy").then(console.log).catch(console.error);