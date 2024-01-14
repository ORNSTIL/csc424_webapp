const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// Sample user credentials for testing (you can replace this with a proper authentication mechanism)
const sampleUser = {
  username: 'bj',
  password: 'pass424',
};

const jwt = require('jsonwebtoken');
const secretKey = 'csc424';

app.post('/account/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the provided username and password match the sampleUser credentials
  if (username === sampleUser.username && password === sampleUser.password) {
    // Generate a token (for simplicity, you can use a library like jsonwebtoken for a real-world scenario)
    const token = jwt.sign({ username }, secretKey);

    // Return the token in the response
    res.json({ token });
  } else {
    // If the login fails, return an error message
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
