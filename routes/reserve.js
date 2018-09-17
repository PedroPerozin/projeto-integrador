const express = require("express");
const router = express.Router();
const Reserve = require("../models/reserve");
const verifyToken = require("../auth/auth").verifyToken;


router.get("/", verifyToken, async (req, res) => {
  try {
    const reserves = await Reserve.find().populate({
      path: "professor",
      model: "User"
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