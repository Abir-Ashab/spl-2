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
        const query = `give me the email of participants who has strong competitive programming background ${resume_list}`;
        await chat_complete(query); 
        return resume_list; 
    } catch (error) {
        console.error('Error:', error.message);
    }
}
Traverse();
