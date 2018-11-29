const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true
  }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);