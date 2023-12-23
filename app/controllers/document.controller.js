const db = require("../models");
const doc = db.document;

// CREATE: untuk enambahkan data kedalam tabel Doc
exports.create = (req, res) => {
    // validate request
    if (!req.body.title) {
      return res.status(400).send({
        message: "Title can not be empty",
      });
    }
  
    // daya yang didapatkan dari inputan oleh pengguna
    const document = {
      title: req.body.title,
      writer: req.body.writer,
    };
  
    // proses menyimpan kedalam database
    doc.create(document)
      .then((data) => {
        res.json({
          message: "Document created successfully.",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message || "Some error occurred while creating the Document.",
          data: null,
        });
      });
  };

