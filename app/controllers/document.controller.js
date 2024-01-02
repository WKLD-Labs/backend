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
      description: req.body.description,
      status: true,
      return: null,
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

// READ: menampilkan atau mengambil semua data sesuai model dari database
exports.findAll = (req, res) => {
  doc.findAll()
    .then((document) => {
      res.json({
        message: "Document retrieved successfully.",
        data: document,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving document.",
        data: null,
      });
    });
};

// Get a specific member by ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
      const document = await doc.findByPk(id);
      if (document) {
          res.json(document);
      } else {
          res.status(404).json({ message: 'Document not found' });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params
exports.update = (req, res) => {
  const id = req.params.id;
  doc.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Document updated successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot update document with id=${id}. Maybe document was not found or req.body is empty!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while updating the document.",
        data: null,
      });
    });
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
  const id = req.params.id;
  doc.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Document deleted successfully.",
          data: req.body,
        });
      } else {
        res.json({
          message: `Cannot delete document with id=${id}. Maybe document was not found!`,
          data: req.body,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while deleting the document.",
        data: null,
      });
    });
};
