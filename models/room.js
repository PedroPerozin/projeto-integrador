const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  cod: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  type: {
    type: Schema.Types.String,
    required: true
  },
  capacity: {
    type: Schema.Types.Number,
  },
  reserves: [{
    type: Schema.Types.ObjectId,
    ref: "Reserve"
  }]
});

module.exports = mongoose.model('Room', RoomSchema);
