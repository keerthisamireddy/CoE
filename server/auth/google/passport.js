//var passport = require('passport');
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
//exports.setup = function (User, config) {
//    passport.use(new GoogleStrategy({
//            clientID: config.google.clientID,
//            clientSecret: config.google.clientSecret,
//            callbackURL: config.google.callbackURL
//        },
//        function (accessToken, refreshToken, profile, done) {
//            User.findOne({
//                'google.id': profile.id
//            }, function (err, user) {
//                if (!user) {
//                    user = new User({
//                        name: profile.displayName,
//                        email: profile.emails[0].value,
//                        role: 'user',
//                        username: profile.username,
//                        provider: 'google',
//                        google: profile._json
//                    });
//                    user.save(function (err) {
//                        if (err) done(err);
//                        return done(err, user);
//                    });
//                } else {
//                    return done(err, user);
//                }
//            });
//        }
//    ));
//};



var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var request = require('request');
var flash = require('connect-flash');

exports.setup = function (User, config) {
    passport.use(new GoogleStrategy({
            clientID: "819851225510-qkuq5o6u2aid8mbr7g729bt0pvd0f13k.apps.googleusercontent.com",
            clientSecret:"Zr1P819rNcW1Up1ThvsWhjtC",
            callbackURL: "http://localhost:9000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {

            if(profile._json.domain === "paradigmcreatives.com"){
                console.log(profile._json);
                User.findOne({
                    'google.id': profile.id
                }, function(err, user) {
                    if (!user) {
                        user = new User({
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            role: 'user',
                            username: profile.username,
                            provider: 'google',
                            google: profile._json
                        });
                        user.save(function(err) {
                            if (err) done(err);
                            return done(err, user);
                        });
                    } else {
                        return done(err, user);
                    }
                });
            }
            else {
                console.log("fail");
                return done(null, false, { message: 'Invalid host Domain.' });
            }
        }
    ));
};