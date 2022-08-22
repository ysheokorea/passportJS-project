const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const { isLoggedIn, isNotLoggedIn } = require("../utils/middleware");
const bcrypt = require("bcrypt");

const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  
  req.logout();
  res.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/kakao", passport.authenticate("kakao", { scope: ["profile_nickname"] }));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const preUser = await User.findOne({ where: { username } });

    if (preUser) {
      res.status(200).json("already exist user");
    } else {
      const hash = await bcrypt.hash(password, 12);

      await User.create({
        username: username,
        password: hash,
      });
      res.status(200).json({ message: "ok" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/local", (req, res, next) => {
  console.log(req.isAuthenticated());
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      res.status(401).json(info);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      res.json({
        success: true,
        message: info,
        user: req.user,
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

module.exports = router;
