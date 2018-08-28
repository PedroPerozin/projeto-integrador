const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EquipmentSchema = new Schema({
  description: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);