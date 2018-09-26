const express = require("express");
const router = express.Router();
const Reserve = require("../models/reserve");
const Room = require("../models/room");
const User = require("../models/user");
const verifyToken = require("../auth/auth").verifyToken;
var ObjectID = require('mongodb').ObjectID;
const csv = require("csvtojson");
const DateModel = require("../models/date");

router.get("/", async (req, res) => {
    try {
        const reserves = await Reserve.find().populate({
            path: "room",
            model: "Room"
        }).populate({
            path: "equipments",
            model: "Equipment"
        }).populate({
            path: "date",
            model: "Date"
        });
        if (reserves) {
            res.status(200).json({
                success: true,
                data: {
                    reserves
                }
            })
        } else {
            res.status(404).json({
                success: false,
                message: "Reserves not Found"
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const reserve = await Reserve.findById(req.params._id).populate({
            path: "room",
            model: "Room"
        }).populate({
            path: "equipments",
            model: "Equipment"
        }).populate({
            path: "date",
            model: "Date"
        });
        if (reserve) {
            res.status(200).json({
                success: true,
                data: {
                    reserve
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Reserve not found."
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/roomname/:_roomname', async (req, res) => {
    try {
        const room = await Room.findOne({ cod:req.params._roomname });
        if( !room ){
            res.status(400).json({
                success: false,
                message: "Sala não encontrada"
            })
            return
        }
        const reserve = await Reserve.find({ room: room.id }).populate({
            path: "room",
            model: "Room"
        }).populate({
            path: "equipments",
            model: "Equipment"
        }).populate({
            path: "date",
            model: "Date"
        });
        if (reserve) {
            res.status(200).json({
                success: true,
                data: {
                    reserve
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Reserve not found."
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/from-csv", async (req, res) => {
  try {
    const csvFilePath = req.body.path;

    const jsonReserves = await csv({
      headers: ['room_cod', 'room_type', 'room_capacity', 'schedule', 'course_cod', 'class_cod', 'course_name', 'professor'],
      delimiter: ';',
      ignoreEmpty: true
    }).fromFile(csvFilePath);

    console.log(jsonReserves);

    const user = await User.findOne({
      email: "sistema_academico@email.com"
    });

    if (!user) {
        res.status(400).json({
            success: false,
            message: "Usuário do sistema academico não encontrado",
        });
        return;
    }

    await Reserve.deleteMany({
      _id: user._id
    })

    const half = new Date()
    let day_begin;
    let day_end;
    if (half.getMonth() < 7) {
      day_begin = new Date(half.getFullYear(), 0)
      day_end = new Date(half.getFullYear(), 6)
    } else {
      day_begin = new Date(half.getFullYear(), 7)
      day_end = new Date(half.getFullYear(), 11)
    }

    jsonReserves.forEach(async jsonReserve => {
      const newDate = await DateModel.create({
        day_begin,
        day_end,
        day: jsonReserve.schedule[0],
        hour: jsonReserve.schedule[1] + jsonReserve.schedule[2]
      })

      let room = await Room.findOne({
        cod: jsonReserve.room_cod
      });

      if (!room) {
        room = await Room.create({
          cod: jsonReserve.room_cod,
          type: jsonReserve.room_type,
          capacity: jsonReserve.room_capacity
        });
      }

      let reserve = await Reserve.findOne({
        room,
        day: jsonReserve.schedule[0],
      })

      reserve = await Reserve.create({
        user,
        room,
        status: "accept",
        date: newDate
      })

      if (reserve) {
        room.reserves.push(reserve);
        newDate.reserve = reserve;
        await newDate.save();
        await room.save();
      }

    })

    res.status(200).json({
      success: true,
      message: "The reserves from csv has been formated to json and saved.",
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

router.post('/', verifyToken, async (req, res) => {
    try{
        dateid = new ObjectID();
        const newDate = new DateModel({
            _id:dateid,
            ...req.body.date[0]
        });
        await newDate.save();
        const roomCod = await Room.findOne({ cod: req.body.room });
        const userId = await User.findOne({ email:req.body.user });
        if( !roomCod ){
            res.status(400).json({
                sucess:false,
                message:"Sala não encontrada"
            });
            return
        }
        if( !userId ){
            res.status(400).json({
                sucess:false,
                message:"Usuário não encontrado"
            });
            return
        }
        const newReserve = new Reserve({
            user:userId._id,
            room:roomCod._id,
            staus:req.body.status,
            date:dateid
        });
        await newReserve.save();
        res.status(200).json({
            success: true,
            message: "Reserve has created",
            data: {
                reserve: newReserve
            }
        });
    } catch (error) {
        res.status(400).json({
            sucess:false,
            message:error.message
        });
    }
}
);

router.put('/:_id', verifyToken, async (req, res) => {
    try {
        const reserve = await Reserve.findById(req.params._id).populate({
            path: "professor",
            model: "User"
        }).populate({
            path: "room",
            model: "Room"
        }).populate({
            path: "equipments",
            model: "Equipment"
        });
        if (reserve) {
            await reserve.update({
                ...req.body
            });
            res.status(200).json({
                success: true,
                message: 'Reserve has updated',
                data: {
                    reserve
                }
            });
        } else {
            req.status(404).json({
                success: false,
                message: "Reserve not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.delete("/:_id", verifyToken, async (req, res) => {
    try {
        const reserve = await Reserve.findById(req.params._id);
        if (reserve) {
            await Reserve.deleteOne({
                _id: reserve._id
            });
            res.status(200).json({
                success: true,
                message: "Reserve has been deleted",
                data: {
                    reserve
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Reserve not found."
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;
