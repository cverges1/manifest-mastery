const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = "some secret";

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    console.log('Received token:', token);

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, process.env.SECRET, {
        maxAge: process.env.EXPIRATION,
      });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },
  signToken: function ({ firstName, lastName, email, _id }) {
    const payload = { firstName, lastName, email, _id };

    console.log('auth',process.env.SECRET)

    return jwt.sign({ data: payload }, secret, {
      expiresIn: '2h',
    });
  },
};
