const OpenAI = require('openai');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { processFiles } = require('./Extraction'); 
const anyscale = new OpenAI({
  baseURL: "https://api.endpoints.anyscale.com/v1",
  apiKey: "esecret_rbf677i4byyhcxll6ueqe829p2",
});

async function chat_complete(prompt) {
  const completion = await anyscale.chat.completions.create({
    model: "google/gemma-7b-it",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.1,
  });
  return (completion.choices[0]?.message?.content); // Logging instead of using process.stdout.write
}

function questionAsync(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

// async function main() {
//   try {
//     const email = await questionAsync('Enter email: ');
//     const textToSummarize = await processFiles(email); 
//     console.log(textToSummarize); 
    
//   } catch (error) {
//     console.error('Error:', error.message);
//   } finally {
//     rl.close();
//   }
// }
module.exports = chat_complete
