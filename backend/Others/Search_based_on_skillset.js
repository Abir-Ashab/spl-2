const { processFiles } = require("./Extraction");
const retrieveEmails = require("./Retrieve_emails");
const chat_complete = require("./Chat_System");
const getFilePathByEmail = require('./path');

const Traverse = async (req, res) => {
    try {
        const list = await retrieveEmails();
        const resume_list = [];
        for (const email of list) {
            const resume = await processFiles(email);
            resume_list.push(resume);
        }
        console.log(resume_list);

        const query = `Here you will give me the email address for those only who studied/studies software engineering.I repeat only software engineering graduates or students.You will find them from the following resumes ${resume_list}. No need any introductory sentence, just give me emails. Give me in normal text format. No need to use bold or next line (\n)`;
        const msg = await chat_complete(query); 
        console.log(msg);

        let finalText = msg.replace(/(\*\*|\n+)/g, " ");
        finalText = finalText.replace(/\*/g, " ");

        // Use a regular expression to extract email addresses
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emailArray = finalText.match(emailRegex);

        console.log(emailArray); // Log the array of emails
        const emails = await retrieveEmails();
        const pdfPaths = [];
        for (const email of emailArray) {
            for (const email2 of emails) {
                const trimmedEmail2 = email2.trim();  // Trim the email from the list
                const trimmedEmail = email.trim();    // Trim the email to compare
                if (trimmedEmail2 === trimmedEmail) {
                    const relativePdfPath = await getFilePathByEmail(email2);
                    // http://127.0.0.1:5500/backend/uploads/Resume_Niloy-1717927928687-435225432.pdf
                    const pdfPath = `http://127.0.0.1:5500/backend/${relativePdfPath}`; // Adjusted path
                    console.log(pdfPath);
                    pdfPaths.push(pdfPath);
                }
            }
        }

        // Generate HTML response
        let htmlResponse = `
        <html>
        <head>
        <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
            text-align: center;
            background: #abdbb2;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(200, 205, 144, 0.1);
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: #aae4c0;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        a {
            text-decoration: none;
            color: #0e0e0e;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
        
        </style>
        </head>
        <body>
            <h1>SOFTWARE ENGINEERING GRADUATES</h1>
            <ul>
        `;
        
        for (let i = 0; i < emailArray.length; i++) {
            htmlResponse += `
                <li>
                    <span>Email : ${emailArray[i]}</span>
                    <a href="${pdfPaths[i]}" target="_blank">RESUME</a>
                </li>
            `;
        }
        
        htmlResponse += `
            </ul>
        </body>
        </html>
        `;

        res.send(htmlResponse);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const CP = async (req, res) => {
    try {
        const list = await retrieveEmails();
        const resume_list = [];
        for (const email of list) {
            const resume = await processFiles(email);
            resume_list.push(resume);
        }
        console.log(resume_list);

        const query = `Here you will give me the email address for those only who have competitive programming background and done well in codeforces and codechef or others online judge.I repeat only competitive programming background.You will find them from the following resumes ${resume_list}. No need any introductory sentence, just give me emails. Give me in normal text format. No need to use bold or next line (\n)`;
        const msg = await chat_complete(query); 
        console.log(msg);

        let finalText = msg.replace(/(\*\*|\n+)/g, " ");
        finalText = finalText.replace(/\*/g, " ");

        // Use a regular expression to extract email addresses
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emailArray = finalText.match(emailRegex);

        console.log(emailArray); // Log the array of emails
        const emails = await retrieveEmails();
        const pdfPaths = [];
        for (const email of emailArray) {
            for (const email2 of emails) {
                const trimmedEmail2 = email2.trim();  // Trim the email from the list
                const trimmedEmail = email.trim();    // Trim the email to compare
                if (trimmedEmail2 === trimmedEmail) {
                    const relativePdfPath = await getFilePathByEmail(email2);
                    // http://127.0.0.1:5500/backend/uploads/Resume_Niloy-1717927928687-435225432.pdf
                    const pdfPath = `http://127.0.0.1:5500/backend/${relativePdfPath}`; // Adjusted path
                    console.log(pdfPath);
                    pdfPaths.push(pdfPath);
                }
            }
        }

        // Generate HTML response
        let htmlResponse = `
        <html>
        <head>
        <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
            text-align: center;
            background: #abdbb2;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(200, 205, 144, 0.1);
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: #aae4c0;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        a {
            text-decoration: none;
            color: #0e0e0e;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
        
        </style>
        </head>
        <body>
            <h1>COMPETITIVE PROGRAMMERS</h1>
            <ul>
        `;
        
        for (let i = 0; i < emailArray.length; i++) {
            htmlResponse += `
                <li>
                    <span>Email : ${emailArray[i]}</span>
                    <a href="${pdfPaths[i]}" target="_blank">RESUME</a>
                </li>
            `;
        }
        
        htmlResponse += `
            </ul>
        </body>
        </html>
        `;

        res.send(htmlResponse);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const CG = async (req, res) => {
    try {
        const list = await retrieveEmails();
        const resume_list = [];
        for (const email of list) {
            const resume = await processFiles(email);
            resume_list.push(resume);
        }
        console.log(resume_list);

        const query = `Here you will give me the email address for those only who have high CGPA. Write the email of them in descending order. I repeat, in descending order. If possible, mention the CGPA along with the email. You will find them from the following resumes ${resume_list}. No need for any introductory sentence, just give me emails. Give me in normal text format. No need to use bold or next line (\n)`;
        const msg = await chat_complete(query); 
        console.log(msg);
        
        let finalText = msg.replace(/(\*\*|\n+)/g, " ");
        finalText = finalText.replace(/\*/g, " ");
        
        // Regular expression to extract emails
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const emailArray = finalText.match(emailRegex);
        
        // Regular expression to extract CGPAs
        const cgpaRegex = /CGPA: ([0-9.]+)/g;
        let match;
        const cgpaArray = [];
        
        while ((match = cgpaRegex.exec(finalText)) !== null) {
            cgpaArray.push(parseFloat(match[1]));  // Convert CGPA to a float for numerical operations
        }
        
        console.log("Emails:", emailArray); // Log the array of emails
        console.log("CGPAs:", cgpaArray);   // Log the array of CGPAs
    
        const emails = await retrieveEmails();
        const pdfPaths = [];
        for (const email of emailArray) {
            for (const email2 of emails) {
                const trimmedEmail2 = email2.trim();  // Trim the email from the list
                const trimmedEmail = email.trim();    // Trim the email to compare
                if (trimmedEmail2 === trimmedEmail) {
                    const relativePdfPath = await getFilePathByEmail(email2);
                    // http://127.0.0.1:5500/backend/uploads/Resume_Niloy-1717927928687-435225432.pdf
                    const pdfPath = `http://127.0.0.1:5500/backend/${relativePdfPath}`; // Adjusted path
                    console.log(pdfPath);
                    pdfPaths.push(pdfPath);
                }
            }
        }

        // Generate HTML response
        let htmlResponse = `
        <html>
        <head>
        <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 0;
            background-color: #f0f0f0;
        }
        h1 {
            color: #333;
            text-align: center;
            background: #abdbb2;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(200, 205, 144, 0.1);
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            background: #aae4c0;
            margin: 10px 0;
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        a {
            text-decoration: none;
            color: #0e0e0e;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
        
        </style>
        </head>
        <body>
            <h1>CGPA</h1>
            <ul>
        `;
        
        for (let i = 0; i < emailArray.length; i++) {
            htmlResponse += `
                <li>
                    <span>Email : ${emailArray[i]} (CGPA : ${cgpaArray[i]})</span>
                    <a href="${pdfPaths[i]}" target="_blank">RESUME</a>
                </li>
            `;
        }
        
        htmlResponse += `
            </ul>
        </body>
        </html>
        `;

        res.send(htmlResponse);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = { Traverse, CP, CG };