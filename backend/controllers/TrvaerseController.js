// TraverseController.js

const { processFiles } = require("../Others/Extraction");
const retrieveEmails = require("../Others/Retrieve_emails");
const chat_complete = require("../Others/Chat_System");

const Traverse = async (req, res) => {
    try {
        // Retrieve inputData from the request body
        const inputData = req.body.inputData;

        // Retrieve emails
        const list = await retrieveEmails();
        const resume_list = [];
        
        // Process files for each email
        for (const email of list) {
            const resume = await processFiles(email);
            resume_list.push(resume);
        }

        // Construct query
        const query = `${inputData} from the following resmues -----> ${resume_list}`;
        console.log(inputData);
        const msg = await chat_complete(query);  
        let finalText = msg.replace(/(\*\*|\n+)/g, " ");
        finalText = finalText.replace(/\*/g, " ");
        console.log(finalText);
        res.json({ message: finalText });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { Traverse };
