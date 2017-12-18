let NODE_ENV = process.env.NODE_ENV || 'development';
let NODE_HOST = process.env.NODE_HOST || 'localhost';
let NODE_PORT = process.env.NODE_PORT || 3001;
let LOG_LEVEL = process.env.LOG_LEVEL || 'info';


let APP_NAME = 'oauth2-passport-boilerplate';

const APP_VERSION = "1.0.0"

const ClientId_Google = "252948611350-5utoa3n9tg0vrpbcjfbstq6mb7jjlklr.apps.googleusercontent.com";
const ClientSecret_Google = "JY8xmWDbXaykEgxitRXd6DQ4";

const ClientId_Facebook = "1608007612611387";
const ClientSecret_Facebook = "82d192403648f6b5e2a7fca8f6ab312a";

const _oauth2 = {
    facebook: {
        clientID: ClientId_Facebook,
        clientSecret: ClientSecret_Facebook,
        callbackURL: `http://${NODE_HOST}:${NODE_PORT}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link'],
    },
    google: {
        clientID: ClientId_Google,
        clientSecret: ClientSecret_Google,
        callbackURL: `http://${NODE_HOST}:${NODE_PORT}/auth/google/callback`,
        passReqToCallback: true,
    },
};

let config = {

    development: {
        env: NODE_ENV,
        app: {
            name: APP_NAME + NODE_ENV,
            version: APP_VERSION,
            address: NODE_HOST,
            port: NODE_PORT
        },
        api: {
            URL: {
                base: "http://localhost:3000"
            }
        },
        log: {
            name: APP_NAME + NODE_ENV,
            level: LOG_LEVEL
        },
        oauth2: _oauth2,
    },
    test: {
        env: NODE_ENV,
        app: {
            name: APP_NAME + NODE_ENV,
            version: APP_VERSION,
            address: NODE_HOST,
            port: NODE_PORT
        },
        api: {
            URL: {
                base: "http://localhost:3000"
            }
        },
        log: {
            name: APP_NAME + NODE_ENV,
            level: LOG_LEVEL
        },
        oauth2: _oauth2,
    },
    production: {
        env: NODE_ENV,
        app: {
            name: APP_NAME + NODE_ENV,
            version: APP_VERSION,
            address: NODE_HOST,
            port: NODE_PORT
        },
        api: {
            URL: {
                base: "http://localhost:3000"
            }
        },
        log: {
            name: APP_NAME + NODE_ENV,
            level: LOG_LEVEL
        },
        oauth2: _oauth2,
    }
};

module.exports = config[NODE_ENV];