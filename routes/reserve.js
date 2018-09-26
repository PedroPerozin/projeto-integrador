const express = require("express");
const router = express.Router();
const Reserve = require("../models/reserve");
const Room = require("../models/room");
const User = require("../models/user");
const ReserveDate = require("../models/date");
const verifyToken = require("../auth/auth").verifyToken;
var ObjectID = require('mongodb').ObjectID;

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

router.post('/', verifyToken, async (req, res) => {
    try{
        dateid = new ObjectID();
        const newDate = new ReserveDate({
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
