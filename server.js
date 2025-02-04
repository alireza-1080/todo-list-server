import app from './app.js';
import connectDB from './configs/db.js';
import 'dotenv/config';

const PORT = process.env.PORT;

//! Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
