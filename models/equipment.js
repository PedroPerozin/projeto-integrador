const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  available: {
    type: Schema.Types.Boolean,
    required: true,
    default: true
  },
  description: {
    type: Schema.Types.String
  }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);