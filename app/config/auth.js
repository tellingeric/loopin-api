// config/auth.js

module.exports = {

    'facebookAuth' : {
        'clientID'      : '1485383391487124', // your App ID
        'clientSecret'  : 'ac6e77e6ce2f212e770195e89fef49dd', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '576379790336-11ek65qq2hrvq9fpnblmfbobc0v0ofsf.apps.googleusercontent.com',
        'clientSecret'  : 'nW7gmf4h1cvBaavieZ9u_noB',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
};