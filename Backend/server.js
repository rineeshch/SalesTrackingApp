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
  dateKey: String,
  record: {
    customerCount: Number,
    itemPurchased: String,
    purchaseAmount: Number,
    paymentMode: String,
    dateTime: String,
  },
});

const SalesRecord = mongoose.model('SalesRecord', salesRecordSchema);


app.post('/api/addSalesRecord', async (req, res) => {
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

app.get('/api/getSalesRecords', async (req, res) => {
  try {
    const salesRecords = await SalesRecord.find();
    res.status(200).json(salesRecords);
  } catch (err) {
    console.error('Error retrieving sales records:', err);
    res.status(500).json({ error: 'Failed to retrieve sales records' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
