const agendaController = require('../controllers/agenda.controller');
const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.middleware')

router.post('/', authMiddleware.authenticateToken, agendaController.create);
router.get('/', authMiddleware.authenticateToken, agendaController.findAll);
router.put('/:id', authMiddleware.authenticateToken, agendaController.update);
router.delete('/:id', authMiddleware.authenticateToken, agendaController.delete);
router.get('/:id', authMiddleware.authenticateToken, agendaController.findOne);

module.exports = router;