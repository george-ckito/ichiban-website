const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const discordUser = require("../models/discordUser");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await discordUser.findById(id);
  if (user) done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify", "guilds", "guilds.join", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await discordUser.findOne({ discordId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await discordUser.create({
            discordId: profile.id,
            username: profile.username,
            guilds: profile.guilds,
          });
          const savedUser = await newUser.save();
          done(null, savedUser);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
