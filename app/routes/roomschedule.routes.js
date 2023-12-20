const roomScheduleController = require('../controllers/roomschedule.controller');
const router = require('express').Router();
const authMiddleware = require('../Middleware/auth.middleware')

router.post('/', authMiddleware.authenticateToken, roomScheduleController.create);
router.get('/', authMiddleware.authenticateToken, roomScheduleController.findAll);
router.put('/:id', authMiddleware.authenticateToken, roomScheduleController.update);
router.delete('/:id', authMiddleware.authenticateToken, roomScheduleController.delete);
router.get('/:id', authMiddleware.authenticateToken, roomScheduleController.findOne);

module.exports = router;