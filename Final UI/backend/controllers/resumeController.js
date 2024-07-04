import { processFiles } from "../methods/Extraction.js"; // Added .js extension
import { retrieveEmails } from "../methods/Retrieve_emails.js"; // Added .js extension
import { chat_complete } from "../methods/Chat_System.js"; // Added .js extension

export const Query = async (req, res) => {
    try {
        // Retrieve inputData from the request body
        const inputData = req.body.inputData;
        console.log('Input Data:', inputData);

        // Retrieve emails
        const list = await retrieveEmails();
        console.log('Email List:', list);

        const resume_list = [];
        
        // Process files for each email
        for (const email of list) {
            const resume = await processFiles(email);
            console.log(resume);
            resume_list.push(resume);
        }

        // Construct query
        const query = `${inputData} from the following resumes -----> ${resume_list}. No need to bold anything`;
        console.log('Constructed Query:', query);

        const msg = await chat_complete(query);
        console.log('Chat Message:', msg);

        const finalText = msg.replace(/[*#]/g, "");
        console.log('Final Text:', finalText);

        res.json({ message: finalText });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
