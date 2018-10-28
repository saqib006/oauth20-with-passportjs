const express = require('express');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const passportSetup = require('./config/passport');
const mongoose = require('mongoose')
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')
const PORT = process.env.PORT | 5000;

const app = express();

app.set('view engine', 'ejs')
app.use(cookieSession({
    maxAge:24 * 60 * 60 * 1000,
    keys:[keys.session.cookieKey]
}));
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongodb.dbURl, ()=>{
    console.log('mongo conected')
})
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.get('/', (req, res)=>{
    res.render('index', {user:req.user})
})


app.listen(PORT)

