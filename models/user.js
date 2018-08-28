const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  admin: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);