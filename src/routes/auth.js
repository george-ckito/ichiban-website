const passport = require("passport");

const router = require("express").Router();

router.get("/", passport.authenticate("discord"));
router.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/forbidden",
    successRedirect: "/dashboard",
  }),
  (req, res) => {
    res.send(req.user);
  }
);
router.get("/logout", (req, res, next) => {
  if (req.user) {
    req.logout({}, (err) => console.log(err));
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
