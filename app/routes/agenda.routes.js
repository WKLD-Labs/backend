const agendaController = require('../controllers/agenda.controller');
const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.middleware')

router.post('/', authMiddleware.authenticateToken, agendaController.create);
router.put('/:id', authMiddleware.authenticateToken, agendaController.update);
router.delete('/:id', authMiddleware.authenticateToken, agendaController.delete);

module.exports = router;