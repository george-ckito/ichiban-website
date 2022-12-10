require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const session = require("express-session");
const passport = require("passport");
const database = require("./database/database");
const dashboardRouter = require("./routes/dashboard");
const authRouter = require("./routes/auth");
const DiscordStrategy = require("./strategies/discordstrategy");
const path = require("path");
const { default: mongoose } = require("mongoose");
const mongoStore = require("connect-mongo");
app.use(
  session({
    secret: "abcdabcd",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
    resave: false,
    name: "discord.oauth2",
    store: mongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

database.then(() => console.log("Connected to the database  ✅"));

const isAuthenticated = (req, res, next) => {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}  ✅`);
});

app.get("/", (req, res, next) => {
  res.status(200).render("home", {user: req.user});
});
