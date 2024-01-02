const jadwalController = require('../controllers/jadwal.controller');
const router = require('express').Router();


router.post('/', jadwalController.create);
router.get('/', jadwalController.findAll);
// router.put('/:id', jadwalController.update);
router.delete('/:id', jadwalController.delete);

module.exports = router;