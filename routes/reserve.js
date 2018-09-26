const express = require("express");
const router = express.Router();
const Reserve = require("../models/reserve");
const verifyToken = require("../auth/auth").verifyToken;
const csv = require("csvtojson");
const User = require("../models/user");
const Room = require("../models/room");
const DateModel = require("../models/date");


router.get("/", verifyToken, async (req, res) => {
  try {
    const reserves = await Reserve.find().populate({
      path: "user",
      model: "User",
    }).populate({
      path: "room",
      model: "Room"
    }).populate({
      path: "equipments",
      model: "Equipment"
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
      user = await User.create({
        email: "sistema_academico@email.com",
        name: "Sistema Acadêmico",
        password: "sistemaacademico"
      })
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

router.get('/:_id', verifyToken, async (req, res) => {
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

router.post('/', verifyToken, async (req, res) => {
  try {
    const newReserve = new Reserve({
      ...req.body
    })
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
      success: false,
      message: error.message
    });
  }
});

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