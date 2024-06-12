const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://shuvrocadet:xzSgLNfWlctcKzOm@cluster0.l2bvgvl.mongodb.net/';
const dbName = 'test';
const collectionName = 'employees';

// Define function to get file path based on email
async function getFilePathByEmail(email) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    console.log(email);
    console.log('Type of email:', typeof email);  // Log the type of email

    const employee = await collection.findOne({ email });

    if (!employee) {
      throw new Error('Employee not found');
    }

    // Extract specific file path based on email
    const filePath = employee.file;

    return filePath;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

module.exports = getFilePathByEmail;