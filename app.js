const express = require('express');
const app = express();
const port = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Render the index page with the message input form
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submission and generate the Rickroll link
app.post('/generate', (req, res) => {
    const userMessage = req.body.message;
    const rickrollUrl = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`; // Hardcoded Rickroll URL
    res.render('result', { message: userMessage, rickrollUrl });
});

// Start the server
app.listen(port, () => {
    console.log(`Rickroll tool is running at http://localhost:${port}`);
});
