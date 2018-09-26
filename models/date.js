const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schedule = Object.freeze({
  '07:30 - 08:20': 'm1',
  '08:20 - 09:10': 'm2',
  '09:10 - 10:00': 'm3',
  '10:20 - 11:10': 'm4',
  '11:10 - 12:00': 'm5',
  '12:00 - 12:50': 'm6',
  '13:00 - 13:50': 't1',
  '13:50 - 14:40': 't2',
  '14:40 - 15:30': 't3',
  '15:50 - 16:40': 't4',
  '16:40 - 17:30': 't5',
  '17:30 - 18:20': 't6',
  '18:40 - 19:30': 'n1',
  '19:30 - 20:20': 'n2',
  '20:20 - 21:10': 'n3',
  '21:20 - 22:10': 'n4',
  '22:10 - 23 h00': 'n5'
})

const days = Object.freeze({
  Segunda: '1',
  Terça: '2',
  Quarta: '3',
  Quinta: '4',
  Sexta: '5',
  Sábado: '6',
  Domingo: '7',
})

const DateSchema = new Schema({
  day_begin: {
    type: Schema.Types.Date
  },
  day_end: {
    type: Schema.Types.Date
  },
  day: {
    type: Schema.Types.String,
    required: true,
    enum: Object.values(days),
  },
  // Before script
  hour: {
    type: Schema.Types.String,
    required: true,
    enum: Object.values(schedule),
  },
  // After script
  // hour: [{
  //   type: Schema.Types.String,
  //   required: true,
  //   enum: Object.values(schedule),
  // }],
  reserve: {
    type: Schema.Types.ObjectId,
    ref: "Reserve"
  }
})

Object.assign(DateSchema.statics, {
  schedule,
  days,
});

module.exports = mongoose.model('Date', DateSchema)