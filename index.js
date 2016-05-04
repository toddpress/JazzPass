var config = require('./oauth.config.js');
var express = require('express');
var passport = require('passport');
var app = express();
var OAuthStrategy = require('passport-oauth').OAuthStrategy;

var app = express();

passport.use('jazz', new OAuthStrategy({
        requestTokenURL:      config.rtc.requestTokenURL,
        accessTokenURL:       config.rtc.accessTokenURL,
        userAuthorizationURL: config.rtc.userAuthorizationURL,
        consumerKey:          config.rtc.consumerKey,
        consumerSecret:       config.rtc.consumerSecret,
        callbackURL:          config.rtc.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        return done(null, profile);
    }
))

app.get('/', function (req, res) {
  res.render('index', {
    user: req.user
  })
})

app.get('/auth/jazz', passport.authenticate('jazz'));
app.get('/callback',
  passport.authenticate('jazz', {
    successRedirect: '/',
    failureRedirect: '/auth/jazz'
  }
))

app.listen(3000, function() {
  console.log('example appl is listening on port 3000');
})