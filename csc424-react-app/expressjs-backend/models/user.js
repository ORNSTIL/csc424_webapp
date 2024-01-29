
const { mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
	password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    token: {
      type: String,
      trim: true,
    },
  },
  { collection: "users_list" }
);

module.exports = mongoose.model("User", UserSchema);