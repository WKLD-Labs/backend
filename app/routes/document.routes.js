const documentController = require('../controllers/document.controller');
const router = require('express').Router();

router.post('/', documentController.create);

module.exports = router;
