import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { getFilePathByEmail } from './path.js';
import pkg from 'pdf.js-extract';
const { PDFExtract } = pkg;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function processFiles(email) {
  try {
    console.log("Hunululu email is : " + email);
    const relativePath = await getFilePathByEmail(email);
    console.log("hunululu relative path is: " + relativePath);
    const pdfPath = path.join("D:", "spl-2", "Final UI", "backend", relativePath);
    console.log("HUNULULU " + pdfPath);

    const text = await extractTextFromPDF(pdfPath);
    console.log('Text extracted from PDF:');
    return text;
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
    console.log("Attempting to read file at:", pdfPath);
    
    if (!fs.existsSync(pdfPath)) {
      console.log("File does not exist");
      reject(new Error("File not found"));
      return;
    }
    
    console.log("File exists");
    
    const pdfExtract = new PDFExtract();
    pdfExtract.extract(pdfPath, {})
      .then(data => {
        const text = data.pages.map(page => 
          page.content.map(item => item.str).join(' ')
        ).join('\n');
        resolve(text);
      })
      .catch(err => reject(err));
  });
}

export { extractTextFromPDF, processFiles };