var Strategy = require('passport-facebook').Strategy
  , config = require('./../../common/config')
  , log = require('./../../common/log')

module.exports = function (ctx) {
  var passport = ctx.passport
    , app = ctx.app;

  log.info(JSON.stringify(config.oauth2.facebook))

  passport.use(new Strategy(config.oauth2.facebook,

    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }));


  app.get('/auth/facebook',
  passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['user_friends', 'email', 'public_profile'],
    }
  ))
    // passport.authenticate('facebook'));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    });

  //?redirect_uri=http://localhost:3001/login/facebook/return&client_id=1608007612611387
}