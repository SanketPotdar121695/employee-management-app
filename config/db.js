require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const secretKey = process.env.secretKey;

const connection = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log({ error: err.message });
  }
  console.log(`App is running on port ${PORT}`);
};

module.exports = { connection, PORT, secretKey };
