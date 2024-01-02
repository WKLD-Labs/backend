const pertemuanController = require('../controllers/pertemuan.controller');
const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.middleware')

router.post('/', authMiddleware.authenticateToken, pertemuanController.create);
router.get('/', authMiddleware.authenticateToken, pertemuanController.findAll);
router.delete('/:id', authMiddleware.authenticateToken, pertemuanController.delete);

module.exports = router;