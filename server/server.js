// server/server.js
const express = require('express');

const db = require('./connection/databaseconnection'); // Adjust the path as needed
const  cors=require('cors');
const app = express();
// Add this line to parse JSON bodies
app.use(express.json());
const port = 3001;

// Set up routes...
// server/server.js
// ...
// Example in server.jsnode
app.use(cors({
  origin: 'http://localhost:3000',
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
app.use('/users',usersRoutes);
app.use('/experiences',experiencesRoutes);
app.use('/placements', placementsRoutes);
app.get('/', (req, res) => {
    res.send('Hello, this is the root path!');
  });
  


  
  // ...
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
