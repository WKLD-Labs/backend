const {jadwal: Jadwal} = require("../models");

exports.create = async (req, res) => {
    try {
        const {activity, participant,date, status, start_date, end_date} = req.body;
        console.log(activity, participant, date, status, start_date, end_date);
        const newJadwal = await Jadwal.create({
            activity,
            participant,
            date: new Date(date),
            status: true,
            start_date: new Date(start_date),
            end_date: new Date(end_date),
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

exports.delete = (req, res) => {
    const id = req.params.id;
    Jadwal .destroy({
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

