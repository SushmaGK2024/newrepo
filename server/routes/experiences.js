const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const db = require('../connection/databaseconnection');

// Use the authentication middleware for protected routes
router.use(authenticate);

router.get('/experience', (req, res) => {
  db.query('SELECT * FROM experiences ', (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
      } else {
      //  console.log("results : ",results);
        res.json(results);
      }
    });
});

router.get('/experience/:rollno', (req, res) => {
  const rollno = req.params.rollno;

  db.query('SELECT * FROM experiences WHERE rollno = ?', [rollno], (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log("results : ",results);
        res.json(results);
      }
    });
});

router.get('/getexperience/:id', (req, res) => {
  const expid = req.params.id;

  db.query('SELECT * FROM experiences WHERE experience_id = ?', [expid], (error, results) => {
      if (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log("results : ",results);
        res.json(results);
      }
    });
});

router.post('/add-experience', (req, res) => {
  const userId = req.body.userId;
  const rollno =req.body.rollno;
  const companyName= req.body.company;
  const batch = req.body.batch;
  const educational_criteria= req.body.educationalCriteria;
  const overallExperience=req.body.overallExperience;
  const tips=req.body.tips;
  const role_offered=req.body.roleOffered;

  db.query(
    'INSERT INTO experiences (user_id,rollno, company_name,batch, role_offered, educational_criteria, overall_experience, tips) VALUES (?, ?, ?, ?,?,?,?,?)',
    [userId,rollno, companyName,batch,role_offered, educational_criteria, overallExperience, tips],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Experience added successfully');
        res.json({ message: 'Experience added successfully' });
      }
    }
  );
});
router.get('/search', (req, res) => {
  const query = req.query.query;
  const company_name = req.query.filters?.company_name || '';
  const role_offered = req.query.filters?.role_offered || '';
  const year = req.query.filters?.year || '';
  const sortby = req.query?.sortBy || 'created_at'; // default sort by created_at
  const sortorder = req.query?.sortOrder || 'desc'; // default sort order descending
  
  console.log("search params filters: ", req.query);
 // console.log("company name : ", company_name);

  let queryStr = 'SELECT * FROM experiences WHERE 1=1';

  if (query) {
    queryStr += ` AND (company_name LIKE '%${query}%' OR role_offered LIKE '%${query}%')`;
  }

  if (company_name) {
    queryStr += ` AND company_name = '${company_name}'`;
  }

  if (role_offered) {
    queryStr += ` AND role_offered = '${role_offered}'`;
  }

  if (year) {
    queryStr += ` AND created_at LIKE '%${year}%'`;
  }

  // Add sorting
  queryStr += ` ORDER BY ${sortby} ${sortorder}`;

  db.query(queryStr, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log("results : ", results);
      res.json(results);
    }
  });
});


router.get('/company_names', (req, res) => {
  db.query('SELECT DISTINCT company_name FROM experiences', (error, results) => {
    if (error) {
      console.error('Error fetching company names:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log("company names : ", results);
      res.json(results);
    }
  });
});

router.get('/years', (req, res) => {
  db.query('SELECT DISTINCT YEAR(created_at) AS year FROM experiences', (error, results) => {
    if (error) {
      console.error('Error fetching years:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log("years : ", results);
      res.json(results);
    }
  });
});


router.get('/roles', (req, res) => {
  db.query('SELECT DISTINCT role_offered FROM experiences', (error, results) => {
    if (error) {
      console.error('Error fetching roles:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log("roles : ", results);
      res.json(results);
    }
  });
});
// PUT request to update specific experience by ID
router.put('/experiences/:id', async (req, res) => {
  try {
      const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedExperience);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
