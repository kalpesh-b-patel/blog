require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const publicKey = path.join(__dirname, '..', 'jwtRS256.key.pub');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: fs.readFileSync(publicKey, 'utf8'),
  issuer: process.env.ISSUER,
  audience: process.env.AUDIENCE,
  expiresIn: process.env.EXPIRES_IN,
  algorithm: process.env.ALGORITHM
};

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
  return done(null, {
    email: 'kp@crayonbox.io'
  });
  // const query = 'SELECT * FROM user WHERE id = ?';
  // db.query(query, [jwtPayload.id], (err, payload) => {
  //   if(err) {
  //     return done(err, false);
  //   } else if(payload.length > 0) {
  //     return done(null, payload);
  //   } else {
  //     return done(null, false);
  //   }
  // });
}));
