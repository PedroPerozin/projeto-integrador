const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config/database");

const verifyToken = require("../auth/auth").verifyToken;

const nodemailer = require('nodemailer');
const configNodemailer = require("../config/nodemailer")
const transporter = nodemailer.createTransport(configNodemailer);


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

router.post('/signup', async (req, res) => {
  try {
    const newUser = await new User({
      ...req.body
    });

    let hash = await bcrypt.hashSync(req.body.password, 10);
    newUser.password = hash;

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User has created",
      data: {
        newUser
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    })

    const match = await bcrypt.compareSync(req.body.password, user.password);

    const token = jwt.sign({
      user: {
        _id: user._id,
        email: user.email,
        admin: user.admin
      }
    }, config.secret);

    if (match) {
      res.status(200).json({
        success: true,
        message: "User password match",
        data: {
          token
        }
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User password not found"
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
})

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

router.post("/send-email", verifyToken, async (req, res) => {
  try {

    const mailOptions = {
      from: configNodemailer.auth.user, // sender address
      to: req.body.email, // list of receivers
      subject: 'Serviço de reservas de salas UTFPR.', // Subject line
      html: req.body.message // plain text body
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "the email has been sended"
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error
    })
  }
})


module.exports = router;