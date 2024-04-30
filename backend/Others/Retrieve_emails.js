const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://shuvrocadet:xzSgLNfWlctcKzOm@cluster0.l2bvgvl.mongodb.net/';
const dbName = 'test';
const collectionName = 'employees';

async function retrieveEmails() {
    const client = new MongoClient(uri);
  
    try {
        await client.connect();
  
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
  
        // Retrieve all documents from the collection
        const cursor = collection.find({});
  
        // Initialize an empty list to store emails
        const emailList = [];
  
        await cursor.forEach(doc => {
            // Extract the email field from each document and push it to the list
            if(doc.email) emailList.push(doc.email);
        });
        const list = [...new Set(emailList)]
        return list;
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }
}
module.exports = retrieveEmails;
