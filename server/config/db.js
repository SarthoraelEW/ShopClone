const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.y5hrz.mongodb.net/shop-clone",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connection to Database is successful'));
  
module.exports = conn;