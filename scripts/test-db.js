// Quick connectivity check for MongoDB using the MONGODB_URI env var.
require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is not set. Set it and rerun the test.');
    process.exit(1);
  }

  try {
    const connection = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    await connection.connection.db.admin().command({ ping: 1 });
    console.log('MongoDB connection is healthy. Ping succeeded.');
  } catch (err) {
    console.error('MongoDB connection failed:', err?.message || err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
})();
