var jwt = require('jsonwebtoken');
var config = require('../config/database');

exports.verifyToken = async (req, res, next) => {
  try {

    var token = req.headers['x-access-token'];

    if (token) {
      const decoded = await jwt.verify(token, config.secret);
      req.userId = decoded.id;
      next();
    } else {
      return res.status(403).send({
        auth: false,
        message: 'No token provided.'
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
};