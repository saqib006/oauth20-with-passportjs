const routes = require('express').Router();

const authVerify = (req, res, next)=>{
    if(!req.user){
        res.redirect('/auth/login');
    }
    else{
        next()
    }
}

routes.get('/', authVerify, (req,res)=>{
    res.render('profile', {user:req.user})
})

module.exports = routes;