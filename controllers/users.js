const User = require("../models/user");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup = async(req,res)=>{
    try {
        let {email,username,password} = req.body;
        const newUser = new User({email,username});
        let registerdUser = await User.register(newUser,password);
        console.log(registerdUser);
        req.login(registerdUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
       
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async(req,res)=>{
    req.flash("success","Welcome Back");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout  = (req,res)=>{
    req.logout((err,next)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success","You are logged Out!");
            res.redirect("/listings");
        }
    });
};