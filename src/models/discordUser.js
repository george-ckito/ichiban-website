const { default: mongoose } = require("mongoose");
const reqString = { type: String, required: true };
const userSchema = new mongoose.Schema({
  discordId: reqString,
  username: reqString,
  guilds: { type: Array, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
