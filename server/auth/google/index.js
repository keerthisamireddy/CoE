//'use strict';
//
//var express = require('express');
//var passport = require('passport');
//var auth = require('../auth.service');
//
//var router = express.Router();
//
//router
//    .get('/', passport.authenticate('google', {
//        failureRedirect: '/signup',
//        scope: [
////            'https://www.googleapis.com/auth/userinfo.profile',
////            'https://www.googleapis.com/auth/userinfo.email'.
//            'https://www.googleapis.com/auth/plus.login',
//            'https://www.googleapis.com/auth/plus.profile.emails.read'
//        ],
//        session: false
//    }))
//
//    .get('/callback', passport.authenticate('google', {
//        failureRedirect: '/signup',
//        session: false
//    }), auth.setTokenCookie);
//
//module.exports = router;


'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var router = express.Router();
var request = require('request');
router
    .get('/', passport.authenticate('google', {
        failureRedirect: '/login',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        session: false
    }))
    .get('/callback', passport.authenticate('google', { failureRedirect: '/login', session: false}), auth.setTokenCookie,  function(req, res) {
        res.redirect('/main');
    });
//router.get('/callback', function(req, res, next) {
//    passport.authenticate('google', function (err, user, info) {
//        var error = err || info;
//        if (error) {
//            return res.redirect('/login');
//        }
//        if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});
//        return res.redirect('/main');
//    })(req, res, next)
//}, auth.setTokenCookie);
module.exports = router;