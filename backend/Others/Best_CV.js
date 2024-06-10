const { processFiles } = require("./Extraction");
const retrieveEmails = require("./Retrieve_emails");
const chat_complete = require("./Chat_System");
const {inputData} = require('../controllers/EmployeeController')
const Traverse = async (req, res) => {
    try {
        const list = await retrieveEmails();
        const resume_list = [];
        for (const email of list) {
            const resume = await processFiles(email);
            resume_list.push(resume);
        }
        console.log(resume_list);
        console.log("resumes koi?????");
        console.log(inputData);
        const query = `${inputData} from the following resumes: ${resume_list}, no need to bold`;
        const msg = await chat_complete(query);  
        let finalText = msg.replace(/(\*\*|\n+)/g, " ");
        finalText = finalText.replace(/\*/g, " ");
        // console.log(finalText);
        res.json(msg); 
    } catch (error) {
        console.error('Error:', error.message);
        // Send an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { Traverse };
