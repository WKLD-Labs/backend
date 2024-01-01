const {jadwal: Jadwal} = require("../models");

exports.create = async (req, res) => {
    try {
        const {name, start_date, end_date} = req.body;
        console.log(name, start_date, end_date);
        const newJadwal = await Jadwal.create({
            name,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
            description
        });
        res.status(201).json(newJadwal);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.findAll = async (req, res) => {
    try {
        const jadwal = await Jadwal.findAll();
        res.status(200).json(jadwal);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.findOne = async (req, res) => {
    try {
        const {id} = req.params;
        const jadwal = await Jadwal.findOne({
            where: {id: id}
        });
        if (!jadwal) {
            return res.status(404).json({ error: "Schedule not found" });
        }
        return res.status(200).json(jadwal);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Schedule .destroy({
      where: { id },
    })
      .then((num) => {
        if (num == 1) {
          res.json({
            message: "Schedule deleted successfully.",
            data: req.body,
          });
        } else {
          res.json({
            message: `Cannot delete Schedule with id=${id}. Maybe Schedule was not found!`,
            data: req.body,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || "Some error occurred while deleting the Schedule .",
          data: null,
        });
      });
  };

// exports.findAll = async (req, res) => {
//     try {
//         let roomSchedules;
//         const {month, year} = req.query;
//         if (month && year) {
//             // Find room schedules where the start_date or end_date is in the given month and year
//             roomSchedules = await RoomSchedule.findAll({
//                 where: {
//                     [Op.or]: [
//                         {
//                             start_date: {
//                                 [Op.and]: [
//                                     {[Op.gte]: new Date(year, month-1, 1)},
//                                     {[Op.lte]: new Date(year, month, 0)}
//                                 ]
//                             }
//                         },
//                         {
//                             end_date: {
//                                 [Op.and]: [
//                                     {[Op.gte]: new Date(year, month-1, 1)},
//                                     {[Op.lte]: new Date(year, month, 0)}
//                                 ]
//                             }
//                         },
//                         {
//                             [Op.and]: [
//                                 {start_date: {[Op.lte]: new Date(`${year}-${month}-01`)}},
//                                 {end_date: {[Op.gte]: new Date(`${year}-${month}-01`)}}
//                             ]
//                         }
//                     ]
//                 }
//             });
//         } else {
//             roomSchedules = await RoomSchedule.findAll();
//         }
        
//         return res.status(200).json(roomSchedules);
//     } catch (e) {
//         res.status(500).json({ error: e.message });
//     }
// }

