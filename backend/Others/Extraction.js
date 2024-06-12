const fs = require('fs');
const PDFParser = require('pdf-parse');
const readline = require('readline');
const getFilePathByEmail = require('./path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define an async function to use async/await
async function processFiles(email) {
      try {
        // Call the function and log the result
        console.log(email);
        const pdfPath = "E:/spl-2/Final UI/backend/" + await getFilePathByEmail(email);
        console.log(pdfPath);

        // Call the function to extract text from PDF
        const text = await extractTextFromPDF(pdfPath);
        console.log('Text extracted from PDF:');
        return text
      } catch (error) {
        console.error('Error:', error.message); 
      } finally {
        // Close readline interface
        rl.close();
      }
}

function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
    // Read the PDF file
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Parse the PDF content
    PDFParser(pdfBuffer)
      .then(data => {
        // Extracted text
        const text = data.text + ' ';
        resolve(text);
      })
      .catch(error => {
        reject(error);
      });
  });
}
module.exports = {extractTextFromPDF, processFiles};