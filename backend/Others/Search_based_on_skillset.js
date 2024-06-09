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

        const query = `Here you will give me the email address for those only who doesn't have software engineering background. You will find them from the following resumes ${resume_list}. No need any introductory sentence, just give me emails. Give me in normal text format. No need to use bold or next line (\n)`;
        const msg = await chat_complete(query); 
        console.log(msg);

        let finalText = msg.replace(/(\*\*|\n+)/g, " ");
        finalText = finalText.replace(/\*/g, " ");

        // Use a regular expression to extract email addresses
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emailArray = finalText.match(emailRegex);

        console.log(emailArray); // Log the array of emails

        res.json(emailArray); // Respond with the array of emails
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { Traverse };
