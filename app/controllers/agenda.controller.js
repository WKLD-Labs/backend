const db = require("../models");
const {Op} = db.Sequelize;
const Agenda = db.agenda;

async function checkOverlap(start_date, end_date, excludeId = null) {
    let agenda = await Agenda.findAll({
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
        agenda = agenda.filter(agenda => agenda.dataValues.id !== +excludeId);
    }
    console.log(agenda)
    return agenda.length > 0;
}

exports.create = async (req, res) => {
    try {
        const {name, start_date, end_date} = req.body;
        console.log("req body: ", req.body);
        if (!name || !start_date || !end_date) {
            return res.status(400).json({ error: "name, start date, end date are required" });
        }
        if (isNaN(Date.parse(start_date)) || isNaN(Date.parse(end_date))) {
            return res.status(400).json({ error: "start date and end date must be valid date" });
        }

        if (await checkOverlap(start_date, end_date)) {
            return res.status(400).json({ error: "Agenda is overlapping with existing agenda" });
        }
        const newAgenda = await Agenda.create({
            name,
            start_date: new Date(start_date),
            end_date: new Date(end_date)
        });
        return res.status(201).json(newAgenda);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}


exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, start_date, end_date} = req.body;
        if (!name || !start_date || !end_date) {
            return res.status(400).json({ error: "name, start date, end date are required" });
        }
        if (isNaN(Date.parse(start_date)) || isNaN(Date.parse(end_date))) {
            return res.status(400).json({ error: "start date and end date must be valid date" });
        }
        const agenda = await Agenda.findOne({
            where: {id: id}
        });
        if (await checkOverlap(start_date, end_date, id)) {
            return res.status(400).json({ error: "Agenda is overlapping with existing agenda" });
        }
        if (!agenda) {
            return res.status(404).json({ error: "Agenda not found" });
        }
        agenda.name = name;
        agenda.start_date = new Date(start_date);
        agenda.end_date = new Date(end_date);
        await agenda.save();
        return res.status(200).json(agenda);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const {id} = req.params;
        const agenda = await Agenda.findOne({
            where: {id: id}
        });
        if (!agenda) {
            return res.status(404).json({ error: "Agenda not found" });
        }
        await roomSchedule.destroy();
        return res.status(200).json({message: "Agenda deleted successfully"});
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}