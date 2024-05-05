const { processFiles } = require("./Extraction");
const retrieveEmails = require("./Retrieve_emails");
const chat_complete = require("./Chat_System");

const Traverse = async (req, res) => {
    try {
        const list = await retrieveEmails();
        const resume_list = [];
        for (const email of list) {
            const resume = await processFiles(email);
            resume_list.push(resume);
        }
        console.log(resume_list);
        const query = `Here you will only write partcipants name, email and contact for those who have software engineering background from the following resumes, don't write the name and email who doesn't have this ${resume_list}`;
        const msg = await chat_complete(query); 
        console.log(msg);
        let finalText = msg.replace(/(\*\*|\n+)/g, " ");
        finalText = finalText.replace(/\*/g, ' ');
        res.json(finalText); 
    } catch (error) {
        console.error('Error:', error.message);
        // Send an error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { Traverse };
