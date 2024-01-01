const db = require("../models");
const {Op} = db.Sequelize;
const RoomSchedule = db.roomschedule;

async function checkOverlap(start_date, end_date, excludeId = null) {
    let roomSchedules = await RoomSchedule.findAll({
        where: {
            [Op.or]: [
                {
                    start_date: {
                        [Op.and]: [
                            {[Op.gte]: new Date(start_date)},
                            {[Op.lte]: new Date(end_date)}
                        ]
                    }
                },
                {
                    end_date: {
                        [Op.and]: [
                            {[Op.gte]: new Date(start_date)},
                            {[Op.lte]: new Date(end_date)}
                        ]
                    }
                },
                {
                    [Op.and]: [
                        {start_date: {[Op.lte]: new Date(start_date)}},
                        {end_date: {[Op.gte]: new Date(end_date)}}
                    ]
                }
            ]
        }
    });
    if (excludeId) {
        roomSchedules = roomSchedules.filter(roomSchedule => roomSchedule.dataValues.id !== +excludeId);
    }
    return roomSchedules.length > 0;
}

exports.create = async (req, res) => {
    try {
        const {name, start_date, end_date} = req.body;
        // validate, name, start_date, end_date required, start_date and end_date must be valid date
        if (!name || !start_date || !end_date) {
            return res.status(400).json({ error: "name, start date, end date are required" });
        }
        if (isNaN(Date.parse(start_date)) || isNaN(Date.parse(end_date))) {
            return res.status(400).json({ error: "start date and end date must be valid date" });
        }
        // Check to make sure the end_date is not before start_date
        if (new Date(end_date) < new Date(start_date)) {
            return res.status(400).json({ error: "end date must be after start date" });
        }

        // Check if this new schedule is not overlapping with existing schedules
        if (await checkOverlap(start_date, end_date)) {
            return res.status(400).json({ error: "Schedule is overlapping with existing schedule" });
        }
        const newRoomSchedule = await RoomSchedule.create({
            name,
            start_date: new Date(start_date),
            end_date: new Date(end_date)
        });
        return res.status(201).json(newRoomSchedule);
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
        return res.status(200).json(roomSchedule);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        let roomSchedules;
        const {month, year} = req.query;
        if (month && year) {
            // Find room schedules where the start_date or end_date is in the given month and year
            roomSchedules = await RoomSchedule.findAll({
                where: {
                    [Op.or]: [
                        {
                            start_date: {
                                [Op.and]: [
                                    {[Op.gte]: new Date(year, month-1, 1)},
                                    {[Op.lte]: new Date(year, month, 0)}
                                ]
                            }
                        },
                        {
                            end_date: {
                                [Op.and]: [
                                    {[Op.gte]: new Date(year, month-1, 1)},
                                    {[Op.lte]: new Date(year, month, 0)}
                                ]
                            }
                        },
                        {
                            [Op.and]: [
                                {start_date: {[Op.lte]: new Date(`${year}-${month}-01`)}},
                                {end_date: {[Op.gte]: new Date(`${year}-${month}-01`)}}
                            ]
                        }
                    ]
                }
            });
        } else {
            roomSchedules = await RoomSchedule.findAll();
        }
        
        return res.status(200).json(roomSchedules);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, start_date, end_date} = req.body;
        // validate, name, start_date, end_date required, start_date and end_date must be valid date
        if (!name || !start_date || !end_date) {
            return res.status(400).json({ error: "name, start date, end date are required" });
        }
        if (isNaN(Date.parse(start_date)) || isNaN(Date.parse(end_date))) {
            return res.status(400).json({ error: "start date and end date must be valid date" });
        }
        const roomSchedule = await RoomSchedule.findOne({
            where: {id: id}
        });
        // Check to make sure the end_date is not before start_date
        if (new Date(end_date) < new Date(start_date)) {
            return res.status(400).json({ error: "end date must be after start date" });
        }
        if (await checkOverlap(start_date, end_date, id)) {
            return res.status(400).json({ error: "Schedule is overlapping with existing schedule" });
        }
        // Handle if roomSchedule not found
        if (!roomSchedule) {
            return res.status(404).json({ error: "Room Schedule not found" });
        }
        roomSchedule.name = name;
        roomSchedule.start_date = new Date(start_date);
        roomSchedule.end_date = new Date(end_date);
        await roomSchedule.save();
        return res.status(200).json(roomSchedule);
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
        return res.status(200).json({message: "Room Schedule deleted successfully"});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

