const express = require("express");
const router = express.Router();
const Equipment = require("../models/equipment");
const Reserve = require("../models/reserve");
const verifyToken = require("../auth/auth").verifyToken;


router.get("/", verifyToken, async (req, res) => {
  try {
    const equipments = await Equipment.find();
    if (equipments) {
      res.status(200).json({
        success: true,
        data: {
          equipments
        }
      })
    } else {
      res.status(404).json({
        success: false,
        message: "Equipments not Found"
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
    const equipment = await Equipment.findById(req.params._id);
    if (equipment) {
      res.status(200).json({
        success: true,
        data: {
          equipment
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Equipment not found."
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
    const newEquipment = new Equipment({
      ...req.body
    });
    await newEquipment.save();
    res.status(200).json({
      success: true,
      message: "Equipment has created",
      data: {
        equipment: newEquipment
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
    const equipment = await Equipment.findById(req.params._id);
    if (equipment) {
      await equipment.update({
        ...req.body
      });
      res.status(200).json({
        success: true,
        message: 'Equipment has updated',
        data: {
          equipment
        }
      });
    } else {
      req.status(404).json({
        success: false,
        message: "Equipment not found"
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
    const equipment = await Equipment.findById(req.params._id);
    if (equipment) {
      await Equipment.deleteOne({
        _id: equipment._id
      });
      res.status(200).json({
        success: true,
        message: "Equipment has been deleted",
        data: {
          equipment
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Equipment not found."
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