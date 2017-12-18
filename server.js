var http = require('http')
    , express = require('express')
    , session = require('express-session')
    , RedisStore = require('connect-redis')(session)
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , router = require('./router')
    , passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth2').Strategy

var config = require('./common/config')
var log = require('./common/log')

var app = express();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(session({
//     secret: 'cookie_secret',
//     name: 'hccbd.net',
//     store: new RedisStore({
//         host: '127.0.0.1',
//         port: 6379
//     }),
//     proxy: true,
//     resave: true,
//     saveUninitialized: true
// }));
//Above doesn't work! Strugled a lot to make that work but couldn't

app.use(session({ secret: 'anything' }));


app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router(app)

const port = config.app.port
var server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
    log.info(`listening to port ${port}`);
});
