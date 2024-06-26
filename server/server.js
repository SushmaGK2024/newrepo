const express = require('express');
const cors = require('cors');
const db = require('./connection/databaseconnection');
const app = express();
const port = 3001;

// Add this line to parse JSON bodies
app.use(express.json());



app.use(cors({
  origin: 'https://majortrail1.netlify.app/',
  credentials: true
}));


// Define routes...
const usersRoutes = require('./routes/users.js');
const experiencesRoutes = require('./routes/experiences.js');
const placementsRoutes = require('./routes/placements.js');
const extractQuestions = require('./routes/extract_questions.js');

app.use('/users', usersRoutes);
app.use('/experiences', experiencesRoutes);
app.use('/placements', placementsRoutes);
app.use('/extract-questions', extractQuestions);

app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
