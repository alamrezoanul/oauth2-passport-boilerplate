var GoogleStrategy = require('passport-google-oauth2').Strategy
  , config = require('./../../common/config')
  , log = require('./../../common/log');

module.exports = function (ctx) {
  var app = ctx.app
    , passport = ctx.passport;

  log.info(JSON.stringify(config.oauth2.google))

  
  passport.use(new GoogleStrategy(config.oauth2.google,
    function (request, accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Google profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Google account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
));
  
  app.get('/auth/google', passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read']
  }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));


}