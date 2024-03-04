const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

mongoose.connect('mongodb://localhost:27017/salesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const salesRecordSchema = new mongoose.Schema({
  customerCount: Number,
  itemPurchased: String,
  purchaseAmount: Number,
  paymentMode: String,
  dateTime: String,
});

const SalesRecord = mongoose.model('SalesRecord', salesRecordSchema);


app.post('/api/addSalesRecord', async (req, res) => {
  console.log('Received request to add sales record:', req.body);

  const { customerCount, itemPurchased, purchaseAmount, paymentMode, dateTime } = req.body;
  const newRecord = new SalesRecord({ customerCount, itemPurchased, purchaseAmount, paymentMode, dateTime });
  try {
    await newRecord.save();
    res.status(200).json({ message: 'Sales record added successfully' });
  } catch (err) {
    console.error('Error saving sales record:', err);
    res.status(500).json({ error: 'Failed to add sales record' });
  }
});

app.get('/api/test', (req, res) => {
  const testData = {
    message: 'This is a test message',
    data: {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3'
    }
  };

  res.status(200).json(testData);
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are correct
  const user = await db.collection('userrecords').findOne({ username, password });
  if (user) {
    // Authentication successful
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Authentication failed
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.get('/api/getSalesRecords', async (req, res) => {
  try {
    const salesRecords = await SalesRecord.find();
    res.status(200).json(salesRecords);
  } catch (err) {
    console.error('Error fetching sales records:', err);
    res.status(500).json({ error: 'Failed to fetch sales records' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
