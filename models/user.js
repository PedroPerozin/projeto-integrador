const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  admin: {
    type: Schema.Types.Boolean,
    required: true,
    default: false
  },
  reserves: [{
    type: Schema.Types.ObjectId,
    ref: "Reserve"
  }]
});

module.exports = mongoose.model('User', UserSchema);