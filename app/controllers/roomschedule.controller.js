const {roomschedule: RoomSchedule} = require("../models");

exports.create = async (req, res) => {
    try {
        const {name, start_date, end_date} = req.body;
        console.log(name, start_date, end_date);
        const newRoomSchedule = await RoomSchedule.create({
            name,
            start_date: new Date(start_date),
            end_date: new Date(end_date)
        });
        res.status(201).json(newRoomSchedule);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.findOne = async (req, res) => {
    try {
        const {id} = req.params;
        const roomSchedule = await RoomSchedule.findOne({
            where: {id: id}
        });
        // Handle if roomSchedule not found
        if (!roomSchedule) {
            return res.status(404).json({ error: "Room Schedule not found" });
        }
        res.status(200).json(roomSchedule);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const roomSchedules = await RoomSchedule.findAll();
        res.status(200).json(roomSchedules);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, start_date, end_date} = req.body;
        const roomSchedule = await RoomSchedule.findOne({
            where: {id: id}
        });
        // Handle if roomSchedule not found
        if (!roomSchedule) {
            return res.status(404).json({ error: "Room Schedule not found" });
        }
        roomSchedule.name = name;
        roomSchedule.start_date = new Date(start_date);
        roomSchedule.end_date = new Date(end_date);
        await roomSchedule.save();
        res.status(200).json(roomSchedule);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const roomSchedule = await RoomSchedule.findOne({
            where: {id: id}
        });
        // Handle if roomSchedule not found
        if (!roomSchedule) {
            return res.status(404).json({ error: "Room Schedule not found" });
        }
        await roomSchedule.destroy();
        res.status(200).json({message: "Room Schedule deleted successfully"});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

