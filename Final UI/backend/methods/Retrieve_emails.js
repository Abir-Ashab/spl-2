import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://shuvrocadet:WuMwMvBNh5sKtbF4@cluster0.gkqwt8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'test';
const collectionName = 'applications';

export async function retrieveEmails() {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Retrieve all documents from the collection and project only the email field
        const cursor = collection.find({}, { projection: { email: 1 } });

        // Initialize an empty list to store emails
        const emailList = [];

        await cursor.forEach(doc => {
            // Extract the email field from each document and push it to the list
            if (doc.email) emailList.push(doc.email);
        });
        // Remove duplicates by converting to a Set and back to an array
        const list = [...new Set(emailList)];
        return list;
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await client.close();
    }
}

