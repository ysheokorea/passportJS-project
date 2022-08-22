const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("Login is required");
  }
};

const isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else{
        const msg = encodeURIComponent("Already Logged In")
        res.redirect(`/?error=${msg}`);
    }
}

module.exports ={
    isLoggedIn, isNotLoggedIn
}


