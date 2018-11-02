const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const status = Object.freeze({
  Pendente: 'pendente',
  Aceita: 'aceita',
  Cancelada: 'cancelada'
})

const ReserveSchema = new Schema({
  user: {
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
  }],
  status: {
    type: Schema.Types.String,
    required: true,
    enum: Object.values(status),
    default: status.Pendente
  },
  date: [{
    type: Schema.Types.ObjectId,
    ref: "Date"
  }],
  justification: {
    type: Schema.Types.String
  }
});

Object.assign(ReserveSchema.statics, {
  status
});

module.exports = mongoose.model("Reserve", ReserveSchema)
