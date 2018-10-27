const routes = require('express').Router();
const passport = require('passport');

// auth login

routes.get('/login', (req, res)=>{
    res.render('login')
})


// auth logout

routes.get('/logout', (req, res)=>{
    // handle with passport
    res.send('logout')
})


// auth with google

routes.get('/google', passport.authenticate('google', {
    scope:['profile']
}))


// callback route for google to redirect

routes.get('/google/redirect', passport.authenticate('google'),(req, res)=>{
    res.send(req.user)
})

module.exports = routes;