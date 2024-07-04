import { MongoClient } from 'mongodb';

// Connection URI
const uri = 'mongodb+srv://shuvrocadet:WuMwMvBNh5sKtbF4@cluster0.gkqwt8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'test';
const collectionName = 'applications';

// Define function to get file path based on email
export async function getFilePathByEmail(email) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to the database');

    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    
    console.log(email);
    console.log('Type of email:', typeof email);  // Log the type of email

    const employee = await collection.findOne({ email });
    console.log(employee);
    if (!employee) {
      throw new Error('Employee not found');
    }

    // Extract specific file path based on email
    const filePath = employee.resume;
    console.log("file path is : "+ filePath);

    return filePath;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}
