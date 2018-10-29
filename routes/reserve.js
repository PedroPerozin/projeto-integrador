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

router.get("/from-user", verifyToken, async (req, res) => {
    try {
        let reserves;

        if (req.query.status == "all") {
            reserves = await Reserve.find({
                user: req.decoded.user._id
            });
        } else {
            reserves = await Reserve.find({
                user: req.decoded.user._id,
                status: req.query.status
            });
        }

        if (!reserves) {
            res.status(404).json({
                success: false,
                message: "Reserves not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Reserves has found.",
            data: {
                reserves
            }
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
})


router.put("/cancel/:_id", verifyToken, async (req, res) => {
    try {

        const reserve = await Reserve.findById(req.params._id);

        if (!reserve) {
            res.status(404).json({
                success: false,
                message: "Reserve not found"
            })
        }

        reserve.status = 'cancelada';
        await reserve.save();

        res.status(200).json({
            success: true,
            message: "Reserve has been canceled.",
            data: {
                reserve
            }
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
})

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
        const room = await Room.findOne({
            cod: req.params._roomname
        });
        if (!room) {
            res.status(400).json({
                success: false,
                message: "Sala não encontrada"
            })
            return
        }
        const reserve = await Reserve.find({
            room: room.id
        }).populate({
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
                status: 'aceita',
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
    try {

        const roomCod = await Room.findOne({
            cod: req.body.room
        });
        if (!roomCod) {
            res.status(400).json({
                sucess: false,
                message: "Sala não encontrada"
            });
            return
        }

        const userId = await User.findOne({
            email: req.body.user
        });
        if (!userId) {
            res.status(400).json({
                sucess: false,
                message: "Usuário não encontrado"
            });
            return
        }

        const roomReserves = await Reserve.find({ room: roomCod.id }).populate({
            path: "date",
            model: "Date"
        });

        conflictingDates = [];

        for(i = 0;i < roomReserves.length;i++){
            for(j = 0;j < roomReserves[i].date.length;j++){
                for(h = 0;h < req.body.date.length;h++){
                    if(roomReserves[i].date[j].day_begin <= new Date(req.body.date[h].day_end) && roomReserves[i].date[j].day_end >= new Date(req.body.date[h].day_begin)){
                            if(roomReserves[i].date[j].day == req.body.date[h].day){
                                if(roomReserves[i].date[j].hour.some( r => req.body.date[h].hour.includes(r))){
                                    conflictingDates.push(roomReserves[i].date[j]);
                                    break;
                                }
                            }
                    }
                }
            }
        }

        if(conflictingDates.length){
            res.status(400).json({
                success: false,
                message: "Conflito de datas",
                data: {
                    conflitos: conflictingDates
                }
            });
            return;
        }


        var dateid = [];
        for (i = 0; i < req.body.date.length; i++) {
            dateid.push(new ObjectID());
            var newDate = new DateModel({
                _id: dateid[i],
                ...req.body.date[i]
            });
            await newDate.save();
        }

        const newReserve = new Reserve({
            user: userId._id,
            room: roomCod._id,
            status: req.body.status,
            justification: req.body.justification,
            date: dateid
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
        console.log(error);
        res.status(400).json({
            sucess: false,
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
