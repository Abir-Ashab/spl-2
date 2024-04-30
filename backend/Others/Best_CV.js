const { processFiles } = require("./Extraction");
const retrieveEmails = require("./Retrieve_emails");
const chat_complete = require("./Chat_System");

async function Traverse() {
    try {
        const list = await retrieveEmails();
        const resume_list = [];
        for (const item of list) {
            const resume = await processFiles(item);
            resume_list.push(resume);
        }
        console.log(resume_list);
        const query = `find the best CV from below resumes and tell me why it is best in paragraph format: ${resume_list}`;
        await chat_complete(query); 
        return resume_list; 
    } catch (error) {
        console.error('Error:', error.message);
    }
}
Traverse();
