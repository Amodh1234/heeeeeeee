const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

const secretKey = process.env.JWT_SECRET_KEY || 'abcd1234';

dotenv.config({ path: './dotenv.config' });

console.log(process.env.NODE_ENV);

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception 💥');
  console.log(err.name);

  process.exit(1);
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB database');
});

const server = app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection 💥');
  console.log(err.name, err.message);

  server.close(() => process.exit(1));
});
