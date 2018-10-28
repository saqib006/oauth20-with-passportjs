const passport = require('passport');
const googleSt = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    })
    
})

passport.use(
    new googleSt({
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
},(accessToken, refreshToken, profile, done)=>{
    console.log('passport callback')
    console.log(profile)

    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            console.log('user already exits', currentUser)
            done(null, currentUser);
        }

        else{
            new User({
                username:profile.displayName,
                googleId:profile.id
            }).save().then((newUser)=>{
                console.log('new user', newUser)
                done(null, newUser);
            });
        }
    })

   
})
)