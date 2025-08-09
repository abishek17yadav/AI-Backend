require('dotenv').config();
const connectDB = require('./src/config/db');
const app = require('./src/app');

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log('server is running on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error("Failed to connect to DB, server not started", err);
  });
