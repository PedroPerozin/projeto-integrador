const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const status = {
  pendente: "pendente",
  aceito: "aceito",
  cancelado: "cancelado",
  finalizado: "finalizado"
}

const ReserveSchema = new Schema({
  professor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  equipments: [{
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  }],
  status: {
    type: Schema.Types.String,
    required: true,
    default: status.pendente
  },
  date: {
    type: Schema.Types.String,
    required: true,
  },
  hour: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = mongoose.model('Reserve', ReserveSchema)