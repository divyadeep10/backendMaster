const express = require('express');
const app = express();

// Example route
app.get('/', (req, res) => {
  res.json({ message: 'Hello, Vercel!' });
});

// Define the port (Vercel automatically assigns a port)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
