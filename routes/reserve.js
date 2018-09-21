const express = require("express");
const router = express.Router();
const Reserve = require("../models/reserve");
const verifyToken = require("../auth/auth").verifyToken;
const csv = require("csvtojson");
const User = require("../models/user");
const Room = require("../models/room");


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

    console.log(user)

    console.log(jsonReserves[0].schedule[0])
    console.log(typeof jsonReserves[0].schedule[0])

    // const room = await Room.findOne({
    //   cod: jsonReserves[0].room_cod
    // })

    // const reserve = await Reserve.create({
    //   room,
    //   user,
    //   day: jsonReserves[0].schedule[0],
    //   hour: jsonReserves[0].schedule[1] + jsonReserves[0].schedule[2],
    // })



    jsonReserves.forEach(async jsonReserve => {
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

      let reserve = await Reserve.create({
        user: user._id,
        room: room._id,
        day: jsonReserve.schedule[0],
        hour: jsonReserve.schedule[1] + jsonReserve.schedule[2]
      })

      if (reserve) {
        room.reserves.push(reserve);
        await room.save()
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