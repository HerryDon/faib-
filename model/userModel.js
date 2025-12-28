const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
});


// Hash password before saving
UserSchema.pre("save", async function (next) {
      if (!this.isModified("password")) return next();
      this.password = await bcrypt.hash(this.password, 12);
      next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password) {
      return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema)

module.exports = {
      User,
};