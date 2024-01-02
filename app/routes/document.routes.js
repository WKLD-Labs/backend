const documentController = require('../controllers/document.controller');
const router = require('express').Router();

router.get('/', documentController.findAll);
router.get('/:id', documentController.findOne);
router.post('/', documentController.create);
router.put('/:id', documentController.update);
router.delete('/:id', documentController.delete);

module.exports = router;
