const express = require("express");
const router = express.Router();
const Reserve = require("../models/reserve");
const verifyToken = require("../auth/auth").verifyToken;

router.get("/", verifyToken, async (req, res) => {
  try {

    //code here

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error
    })
  }
})

router.post("/", verifyToken, async (req, res) => {
  try {

    //code here

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error
    })
  }
})

router.put("/", verifyToken, async (req, res) => {
  try {

    //code here

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error
    })
  }
})

router.delete("/", verifyToken, async (req, res) => {
  try {

    //code here

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error
    })
  }
})