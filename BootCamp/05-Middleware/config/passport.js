/** JWT Strategy
 * @module strategy/jwt
 */

/**
 * @namespace jwtStrategy
 */

/**
 * Requiring JWTStrategy from passport
 * @const
 */
const JwtStrategy = require("passport-jwt").Strategy;
/**
 * Function which returns the JWT
 */
const ExtractJwt = require("passport-jwt").ExtractJwt;

/**
 * Requiring passport
 * @const
 */
const passport = require("passport");

/**
 * Importing mongoose connection
 */
const mongoose = require("mongoose");

/**
 * Fetching the Login Model
 */
const Login = mongoose.model("login");

/**
 * Importing the secret Key
 */
const keys = require("../dbconfig/config");

const opts = {};

/**
 * @typedef {Object} options
 * @property {function} ExtractJWT - Function which returns JWT
 * @property {string} secretOrKey - JWT secret
 */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  /**
   * Adding JWT Strategy
   * @name use
   * @function
   * @memberof module:strategy/jwt~jwtStrategy
   * @inner
   * @param {Object} JWTStrategyOptions - JWT Strategy Options
   */
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      /**
       * Callback Function
       * @function
       * @inner
       * @param {object} jwtPayload - Decrypted JWT payload
       * @param {callback} done - Next function
       */
      Login.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
