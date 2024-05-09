// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Authentication failed' });

    jwt.verify(token.replace('Bearer ', ''), 'bf3ab437d9c353bc4dc2d3f2cce44c096f17ed57792e58bd09640c89f6376c7b', (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Authentication failed' });

      req.userId = decoded.userId;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = authenticate;
