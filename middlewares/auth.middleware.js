const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/db');

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || null;

  if (token) {
    try {
      let decoded = jwt.verify(token, secretKey);

      if (decoded.userID) {
        if (req.body.userID) {
          if (req.body.userID === decoded.userID) return next();
          return res.status(400).send({
            error: 'Access denied!',
            description: 'You are not authorized to perform the operation.'
          });
        }
        req.body.userID = decoded.userID;
        return next();
      }
      return res.status(400).send({
        error: 'Access denied!',
        description: 'Invalid credentials provided.'
      });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  }
  return res
    .status(400)
    .send({ error: 'Access denied!', description: 'Please login first.' });
};

module.exports = { auth };
