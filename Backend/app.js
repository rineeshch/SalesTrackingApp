const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = 'mongodb://localhost:27017'; // Update with your connection string

// Database Name
const dbName = 'mydatabase'; // Update with your database name

// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB');

    // Use the specified database
    const db = client.db(dbName);

    // Perform operations on the database
    // For example, you can insert a document
    const collection = db.collection('documents');
    await collection.insertOne({ name: 'Rineesh' });

    console.log('Document inserted');

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Close the client
    await client.close();
    console.log('Connection to MongoDB closed');
  }
}

// Call the connectToMongoDB function
connectToMongoDB();
