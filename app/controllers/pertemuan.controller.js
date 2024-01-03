const db = require('../models');
const DaftarPertemuan = db.daftarPertemuan;

exports.create = async (req, res) => {
  try {
    const { meetingname, speaker, datetime, meetinglink, description } = req.body;
    console.log(meetingname, speaker, datetime, meetinglink, description);
    if(!meetingname || !speaker || !datetime || !meetinglink || !description){
      return res.status(400).json({error: "Inputan belum lengkap"})
    }
    const newDaftarPertemuan = await DaftarPertemuan.create({
      meetingname: meetingname,
      speaker: speaker,
      datetime: new Date(datetime),
      meetinglink: meetinglink,
      description: description
    });
    res.status(201).json(newDaftarPertemuan);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.findAll = async (req, res) => {
  try {
    const daftarpertemuan = await DaftarPertemuan.findAll();
    res.status(200).json(daftarpertemuan);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

exports.delete = (req, res) => {
  const id = req.params.id;
  DaftarPertemuan.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Data deleted successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot delete data with id=${id}. Maybe member was not found!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while deleting the member.",
        data: null,
      });
    });
};



