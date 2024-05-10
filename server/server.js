// server/server.js
const express = require('express');
const db = require('./connection/databaseconnection'); // Adjust the path as needed
const  cors=require('cors');
const app = express();
// Add this line to parse JSON bodies
app.use(express.json());


const netlifyDomain = 'https://main--legendary-madeleine-b1810c.netlify.app'; // Update with your Netlify domain
app.use(cors({
  origin: netlifyDomain,
  credentials: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const usersRoutes = require('./routes/users.js');
const experiencesRoutes = require('./routes/experiences.js');
const placementsRoutes= require( './routes/placements.js' );
const extractQuestions= require('./routes/extract_questions.js')
app.use('/users',usersRoutes);
app.use('/experiences',experiencesRoutes);
app.use('/placements', placementsRoutes);
app.use('/extract-questions', extractQuestions);
app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
  });
  


  
  // ...
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
