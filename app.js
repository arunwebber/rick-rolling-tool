const express = require('express');
const path = require('path');
const shortid = require('shortid');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up Pug as the templating engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// In-memory store for shortened URLs
const urlStore = {};

// Serve the main page where users input the title and description
app.get('/', (req, res) => {
  res.render('index');
});

// Handle form submission and redirect to the generated URL
app.post('/generate', (req, res) => {
  const { title, description } = req.body;
  const shortId = shortid.generate();
  urlStore[shortId] = { title, description };
  const shortUrl = `${req.protocol}://${req.get('host')}/page/${shortId}`;
  res.render('result', { shortUrl });
});


// Serve dynamically generated pages
app.get('/page/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = urlStore[id] || { title: 'Default Title', description: 'Default Description' };
  res.render('page', { title, description });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
