const router = require("express").Router();
const isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/");
  }
};

router.get("/", isAuthenticated, (req, res) => {
  const user = req.user;
  res.render("dashboard", { user });
});

module.exports = router;
