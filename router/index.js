var passport = require('passport')
    , log = require("./../common/log")

module.exports = function (app) {


    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/', function (req, res) {

        //log.info("app.get('/'=>req: ", req)
        log.info("app.get('/'=>req.user: ", req.user)

        res.render('home', { user: req.user });
    });


    app.get('/login', function (req, res) {
        res.render('login', { user: req.user });
    });

    app.use(require('morgan')('combined'));

    function ensureAuthenticated(req, res, next) {

        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }

    app.get('/profile', ensureAuthenticated, function (req, res) {
        log.info(JSON.stringify(req.body))

        res.render('profile', { user: req.user });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    require('./../lib/oauth2/oauth2_facebook')({ app, passport })
    require("./../lib/oauth2/oauth2_google")({ app, passport })
}