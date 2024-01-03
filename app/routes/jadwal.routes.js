const jadwalController = require('../controllers/jadwal.controller');
const router = require('express').Router();


router.post('/', jadwalController.create);
router.get('/', jadwalController.findAll);
router.delete('/:id', jadwalController.delete);

module.exports = router;