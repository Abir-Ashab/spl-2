const fs = require('fs');
const PDFParser = require('pdf-parse');
const readline = require('readline');
const getFilePathByEmail = require('./path');

// Create readline interface for reading input from terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define an async function to use async/await
async function processFiles() {
  try {
    // Prompt the user to enter an email address
    rl.question('Enter email address: ', async (email) => {
      try {
        // Call the function and log the result
        const pdfPath = await getFilePathByEmail(email);
        console.log(pdfPath);

        // Call the function to extract text from PDF
        const text = await extractTextFromPDF(pdfPath);
        console.log('Text extracted from PDF:');
        console.log(text);
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        // Close readline interface
        rl.close();
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Call the async function
processFiles();

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
