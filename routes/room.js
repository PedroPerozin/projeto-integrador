const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const verifyToken = require("../auth/auth").verifyToken;
const csv = require("csvtojson");




router.get("/", verifyToken, async (req, res) => {
  try {
    const rooms = await Room.find();
    if (rooms) {
      res.status(200).json({
        success: true,
        data: {
          rooms
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Rooms not Found"
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

    const rooms = await csv({
      noheader: false,
      headers: ['cod', 'num', 'type', 'capacity'],
      delimiter: ";",
      ignoreEmpty: true
    }).fromFile(csvFilePath);

    rooms.forEach(room => {
      Room.create({
        cod: room.cod,
        type: room.type,
        capacity: room.capacity
      })
    })

    if (rooms) {
      res.status(200).json({
        success: true,
        message: "The rooms from csv has been formated to json and saved.",

      })
    } else {
      res.status(404).json({
        success: false,
        message: "Something is wrong."
      })
    }


  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.get('/:_id', verifyToken, async (req, res) => {
  try {
    const room = await Room.findById(req.params._id);
    if (room) {
      res.status(200).json({
        success: true,
        data: {
          room
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Room not found."
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
    const newRoom = new Room({
      ...req.body
    });
    await newRoom.save();
    res.status(200).json({
      success: true,
      message: "Room has created",
      data: {
        room: newRoom
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
    const room = await Room.findById(req.params._id);
    if (room) {
      await room.update({
        ...req.body
      });
      res.status(200).json({
        success: true,
        message: 'Room has updated',
        data: {
          room
        }
      });
    } else {
      req.status(404).json({
        success: false,
        message: "Room not found"
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
    const room = await Room.findById(req.params._id);
    if (room) {
      await Room.deleteOne({
        _id: room._id
      });
      res.status(200).json({
        success: true,
        message: "Room has been deleted",
        data: {
          room
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Room not found."
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