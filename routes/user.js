const express = require('express');
const router = express.Router();
const User = require("../models/user")

router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    if (users) {
      res.status(200).json({
        success: true,
        data: {
          users
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Users not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
});

router.get('/:_id', async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (user) {
      res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found."
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      ...req.body
    })
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User has created",
      data: {
        user: newUser
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.put('/:_id', async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (user) {
      await user.update({
        ...req.body
      });
      res.status(200).json({
        success: true,
        message: 'User has updated',
        data: {
          user
        }
      });
    } else {
      req.status(404).json({
        success: false,
        message: "User not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (user) {
      await User.deleteOne({
        _id: user._id
      })
      res.status(200).json({
        success: true,
        message: "User has been deleted.",
        data: {
          user
        }
      });
    } else {
      res.status(404).json({
        success: false,
        messsage: "User not found"
      });
    }

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;