const documentController = require('../controllers/member.controller');
const router = require('express').Router();

router.post('/', documentController.create);

module.exports = router;
